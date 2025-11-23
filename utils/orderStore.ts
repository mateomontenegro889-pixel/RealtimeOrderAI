import { Order } from "@/types/order";
import { getAllOrders, getOrderById, addOrder, searchOrders, initDatabase } from "./database";

export const orderStore = {
  init: async (): Promise<void> => {
    await initDatabase();
  },

  getAll: async (): Promise<Order[]> => {
    return await getAllOrders();
  },

  getById: async (id: string): Promise<Order | null> => {
    return await getOrderById(id);
  },

  add: async (order: Order): Promise<void> => {
    await addOrder(order);
  },

  search: async (query: string): Promise<Order[]> => {
    return await searchOrders(query);
  },
};
