import { ref } from "vue";
import type { IParsedAsset } from "@/types/import.ts";
import { apiServiceV1 } from "@/api/clientV1.ts";
import apiClient from "@/api/client.ts";
import { runInChunks } from "@/utils/chunk.ts";
import {apiService} from "@/api/api-service.ts";

export function useInventaire() {
    const loading = ref(false);
    const error = ref<string | null>(null);

    const importAssets = async (listInventaire: IParsedAsset[]) => {
        const manufacturersCache: Record<string, number> = {};
        const locationsCache:     Record<string, number> = {};
        const statesCache:        Record<string, number> = {};
        const modelsCache:        Record<string, number> = {};
        const usersCache:         Record<string, number> = {};

        const createdAssetsRegistry: Record<string, { id: number; type: string }> = {};

        loading.value = true;
        error.value   = null;

        const normalize = (s: string) => s.toLowerCase().trim();

        async function loadCache(endpoint: string, cache: Record<string, number>) {
            try {
                const list = await apiService.get<any[]>(`${endpoint}?range=0-9999`);
                list.forEach(item => {
                    const key = normalize(item.username || item.name || '');
                    if (key) cache[key] = item.id;
                });
            } catch (e) {
                console.warn(`${endpoint} non chargé`, e);
            }
        }


        async function syncMissingV1(uniqueItems: string[], cache: Record<string, number>, endpoint: string, payloadMapper: (name: string) => Record<string, any> = (name) => ({ name })): Promise<void> {
            const missing = uniqueItems.filter(item => !cache[normalize(item)]);
            if (missing.length === 0) return;
            try {
                const res = await apiServiceV1.post<{ id: number }[] | { id: number }>(endpoint, {
                    input: missing.map(payloadMapper)
                });
                const resArray = Array.isArray(res) ? res : [res];
                resArray.forEach((item, index) => {
                    cache[normalize(missing[index])] = item.id;
                });
            } catch (e) {
                console.warn(`Erreur bulk ${endpoint}`, e);
            }
        }



        const modelMap: Record<string, { v1Endpoint: string; relationField: string; skipModel?: boolean }> = {
            Computer:           { v1Endpoint: '/ComputerModel',           relationField: 'model' },
            Monitor:            { v1Endpoint: '/MonitorModel',            relationField: 'model' },
            NetworkEquipment:   { v1Endpoint: '/NetworkEquipmentModel',   relationField: 'model' },
            Printer:            { v1Endpoint: '/PrinterModel',            relationField: 'model' },
            Phone:              { v1Endpoint: '/PhoneModel',              relationField: 'model' },
            Peripheral:         { v1Endpoint: '/PeripheralModel',         relationField: 'model' },
            Rack:               { v1Endpoint: '/RackModel',               relationField: 'model' },
            Enclosure:          { v1Endpoint: '/EnclosureModel',          relationField: 'model' },
            PDU:                { v1Endpoint: '/PduModel',                relationField: 'model' },
            PassiveDCEquipment: { v1Endpoint: '/PassiveDCEquipmentModel', relationField: 'model' },
            Cable:              { v1Endpoint: '/CableType',               relationField: 'type' },
            Appliance:          { v1Endpoint: '/ApplianceType',           relationField: 'type' },
            Certificate:        { v1Endpoint: '/CertificateType',         relationField: 'type' },
            SoftwareLicense:    { v1Endpoint: '/SoftwareLicenseType',     relationField: 'type' },
            Software:           { v1Endpoint: '/SoftwareCategory',        relationField: 'category' },
            Cartridge:          { v1Endpoint: '/CartridgeItem',           relationField: 'cartridge_item' },
            Consumable:         { v1Endpoint: '/ConsumableItem',          relationField: 'consumable_item' },
            Socket:             { v1Endpoint: '/Glpi%5CSocketModel', relationField: 'model' },
        };

        try {
            // ──────────────────────────────────────────────────────────────────
            // 1. Charger les caches via V1
            // ──────────────────────────────────────────────────────────────────
            await Promise.all([
                loadCache('Dropdowns/Manufacturer', manufacturersCache),
                loadCache('Dropdowns/Location',     locationsCache),
                loadCache('Dropdowns/State',        statesCache),
                loadCache('Administration/User',         usersCache),
            ]);


            const uniqueMfgs   = [...new Set(listInventaire.map(i => i.manufacturer).filter(Boolean))] as string[];
            const uniqueLocs   = [...new Set(listInventaire.map(i => i.location).filter(Boolean))]     as string[];
            const uniqueStates = [...new Set(listInventaire.map(i => i.status).filter(Boolean))]       as string[];
            const uniqueUsers  = [...new Set(listInventaire.map(i => i.user).filter(Boolean))]         as string[];

            await Promise.all([
                syncMissingV1(uniqueMfgs,   manufacturersCache, '/Manufacturer'),
                syncMissingV1(uniqueLocs,   locationsCache,     '/Location'),
                syncMissingV1(uniqueStates, statesCache,        '/State'),
                syncMissingV1(uniqueUsers,  usersCache,         '/User', (name) => ({ name, login: name })),
            ]);


            const modelsToCreateByEndpoint: Record<string, { modelName: string; cacheKey: string }[]> = {};

            listInventaire.forEach(i => {
                if (!i.model || !i.itemType) return;
                const def = modelMap[i.itemType];
                if (!def || def.skipModel) return;

                const cacheKey = `${i.itemType}_${normalize(i.model)}`;
                if (modelsCache[cacheKey]) return;

                if (!modelsToCreateByEndpoint[def.v1Endpoint]) {
                    modelsToCreateByEndpoint[def.v1Endpoint] = [];
                }
                const already = modelsToCreateByEndpoint[def.v1Endpoint].some(
                    x => normalize(x.modelName) === normalize(i.model!)
                );
                if (!already) {
                    modelsToCreateByEndpoint[def.v1Endpoint].push({ modelName: i.model, cacheKey });
                }
            });

            await Promise.all(Object.entries(modelsToCreateByEndpoint).map(async ([endpoint, items]) => {
                try {
                    const res = await apiServiceV1.post<{ id: number }[] | { id: number }>(endpoint, {
                        input: items.map(x => ({ name: x.modelName }))
                    });
                    const resArray = Array.isArray(res) ? res : [res];
                    resArray.forEach((resItem, index) => {
                        modelsCache[items[index].cacheKey] = resItem.id;
                    });
                } catch (e) {
                    console.warn(`Erreur bulk modèle ${endpoint}`, e);
                }
            }));


            const assetsByType: Record<string, { parsed: IParsedAsset; payload: any }[]> = {};

            listInventaire.forEach(inventaire => {
                if (!inventaire.itemType || !inventaire.name) return;

                const mfgKey   = normalize(inventaire.manufacturer || '');
                const locKey   = normalize(inventaire.location || '');
                const stateKey = normalize(inventaire.status || '');
                const userKey  = normalize(inventaire.user || '');


                const payload: any = {
                    name:   inventaire.name,
                    serial: inventaire.inventoryNumber,
                    otherserial: inventaire.inventoryNumber
                };

                if (manufacturersCache[mfgKey]) payload.manufacturer = { id: manufacturersCache[mfgKey] };
                if (locationsCache[locKey])      payload.location     = { id: locationsCache[locKey] };
                if (statesCache[stateKey])       payload.status       = { id: statesCache[stateKey] };
                if (statesCache[stateKey])       payload.state       = { id: statesCache[stateKey] };
                if (usersCache[userKey])         payload.user         = { id: usersCache[userKey] };

                // Liaison modèle/type/catégorie
                if (inventaire.model) {
                    const def = modelMap[inventaire.itemType];
                    if (def && !def.skipModel) {
                        const cacheKey = `${inventaire.itemType}_${normalize(inventaire.model)}`;
                        const modelId  = modelsCache[cacheKey];
                        if (modelId) {
                            payload[def.relationField] = { id: modelId };
                        }
                    }
                }

                if (!assetsByType[inventaire.itemType]) assetsByType[inventaire.itemType] = [];
                assetsByType[inventaire.itemType].push({ parsed: inventaire, payload });
            });

            // Certains types ont un nom de classe PHP différent de la clé itemType
            // ex: Socket → Glpi\Socket (requis par Item_Ticket.itemtype en V1)
            const glpiClassMap: Record<string, string> = {
                Socket: 'Glpi\\Socket',
            };


            await Promise.all(Object.entries(assetsByType).map(async ([itemType, items]) => {
                await runInChunks(items, 15, async (x) => {
                    try {
                        const res = await apiClient.post<{ id: number }>(`/Assets/${itemType}`, x.payload);
                        if (res.data?.id) {
                            createdAssetsRegistry[x.parsed.name] = {
                                id:   res.data.id,
                                type: glpiClassMap[itemType] ?? itemType,
                            };
                        }
                    } catch (err) {
                        console.error(`Échec création asset "${x.parsed.name}" (${itemType})`, err);
                    }
                });
            }));

            return createdAssetsRegistry;

        } catch (err: any) {
            error.value = err.response?.data?.message || err.message || "Erreur lors de l'importation";
            return null;
        } finally {
            loading.value = false;
        }
    };

    return { importAssets, loading, error };
}