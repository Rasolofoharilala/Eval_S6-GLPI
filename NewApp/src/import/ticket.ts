import {ref} from "vue";
import type {IParsedTicket, IItemTicketCreateInput} from "@/types/import.ts";
import type {ITicketCreateInput} from "@/types/ticket.ts";
import {apiService} from "@/api/api-service.ts";
import {apiServiceV1} from "@/api/clientV1.ts";
import {runInChunks} from "@/utils/chunk.ts";

export function useTicketImport() {
    const loading = ref(false);
    const error = ref<string | null>(null);

    const priorityMap: Record<string, number> = {
        "Low": 2,
        "Medium": 3,
        "High": 4,
        "Very High": 5
    };

    const statusMap: Record<string, number> = {
        "New": 1,
        "Processing": 2,
        "Pending": 4,
        "Solved": 5,
        "Closed": 6,
        "Validation": 10
    };

    const ticketTypeMap: Record<string, number> = {
        "Incident": 1,
        "Request": 2,
        "incident": 1,
        "demande": 2,
        "Demande": 2,
        "Request/Demande": 2
    };

    const ticketRegistry: Record<string, number> = {};

    const importTicket = async (listTicket: IParsedTicket[], assetsRegistry: Record<string, { id: number; type: string }>) => {
        loading.value = true;
        error.value = null;

        try {
            await runInChunks(listTicket, 30, async (ticket) => {
                const payload: ITicketCreateInput = {
                    external_id: ticket.refTicket,
                    name: ticket.title,
                    content: ticket.description,
                    date: ticket.date,
                    status: statusMap[ticket.status] || 1,
                    priority: priorityMap[ticket.priority] || 3,
                    type: ticketTypeMap[ticket.type] || 1,
                };

                try {
                    const res = await apiService.post<{ id: number }>('Assistance/Ticket', payload);
                    ticketRegistry[ticket.refTicket] = res.id;

                    const linkPromises = ticket.itemNames.map(async (itemName) => {
                        const asset = assetsRegistry[itemName];
                        if (asset) {
                            const linkPayload: IItemTicketCreateInput = {
                                input: {
                                    tickets_id: res.id,
                                    items_id: asset.id,
                                    itemtype: asset.type
                                }
                            };
                            await apiServiceV1.post('/Item_Ticket', linkPayload);
                        }
                    });

                    await Promise.all(linkPromises);
                } catch (err) {
                    console.error(`Erreur d'importation pour le ticket ${ticket.title}`, err);
                }
            });

            return ticketRegistry;
        } catch (err: any) {
            error.value = err.message || "Échec de l'importation des tickets";
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        error,
        importTicket,
        ticketRegistry
    };
}