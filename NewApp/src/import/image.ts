import { ref } from "vue";
import { apiServiceV1 } from "@/api/clientV1.ts";
import type { IDocumentItemCreateInput } from "@/types/import.ts";
import { runInChunks } from "@/utils/chunk.ts";

export function useImageImport() {
    const loading = ref(false);
    const error = ref<string | null>(null);

    const importImages = async (assetsRegistry: Record<string, { id: number; type: string }>, images: Record<string, Blob>) => {

        loading.value = true;
        error.value = null;

        try {
            const registryEntries = Object.entries(assetsRegistry);
            await runInChunks(registryEntries, 20, async ([assetName, assetInfo]) => {
                const matchedKey = Object.keys(images).find(key => {
                    const keyWithoutExt = key.substring(0, key.lastIndexOf('.'));
                    const ext = key.substring(key.lastIndexOf('.')).toLowerCase();
                    
                    return keyWithoutExt.toLowerCase() === assetName.toLowerCase() && 
                           ['.png', '.jpg', '.jpeg'].includes(ext);
                });

                if (matchedKey) {
                    const imageBlob = images[matchedKey];
                    
                    const formData = new FormData();
                    formData.append('uploadManifest', JSON.stringify({
                        input: {
                            name: assetName,
                            _filename: [matchedKey]
                        }
                    }));
                    formData.append('filename[0]', imageBlob, matchedKey);

                    try {
                        const docRes = await apiServiceV1.post<{ id: number }>('/Document', formData);

                        if (docRes && docRes.id > 0) {
                            const linkPayload: IDocumentItemCreateInput = {
                                input: {
                                    documents_id: docRes.id,
                                    items_id: assetInfo.id,
                                    itemtype: assetInfo.type
                                }
                            };
                            
                            await apiServiceV1.post('/Document_Item', linkPayload);
                            console.log(`Image ${matchedKey} liée avec succès à l'actif ${assetName}`);
                        }
                    } catch (docErr: any) {
                        console.error(`Échec de l'import de l'image pour l'actif ${assetName} :`, docErr.message || docErr);
                    }
                }
            });
        } catch (err: any) {
            error.value = err.message || "Échec de l'importation des images";
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        error,
        importImages
    };
}
