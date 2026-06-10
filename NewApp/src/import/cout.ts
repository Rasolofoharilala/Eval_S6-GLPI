import { ref } from "vue";
import type { IParsedTicketCost, ITicketCostCreateInput } from "@/types/import.ts";
import { apiService } from "@/api/api-service.ts";
import { runInChunks } from "@/utils/chunk.ts";

export function useCoutImport() {
    const loading = ref(false);
    const error = ref<string | null>(null);

    const importCout = async (listCout: IParsedTicketCost[], ticketRegistry: Record<string, number>) => {
        loading.value = true;
        error.value = null;

        try {
            await runInChunks(listCout, 30, async (cost) => {
                const ticketId = ticketRegistry[cost.numTicket];

                if (!ticketId) {
                    console.warn(`Le ticket de référence ${cost.numTicket} n'a pas été trouvé.`);
                    return;
                }

                const payload: ITicketCostCreateInput = {
                    name: "Coût d'importation",
                    duration: cost.durationSecond,
                    cost_time: cost.timeCost,
                    cost_fixed: cost.fixedCost
                };

                try {
                    await apiService.post(`Assistance/Ticket/${ticketId}/Cost`, payload);
                } catch (err) {
                    console.error(`Échec d'import du coût pour le ticket #${ticketId}`, err);
                }
            });
        } catch (err: any) {
            error.value = err.message || "Échec de l'importation des coûts";
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        error,
        importCout
    };
}