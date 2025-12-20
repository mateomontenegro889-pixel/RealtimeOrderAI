import { Order } from "@/types/order";
import { getAllOrders, getOrderById, addOrder, searchOrders, initDatabase, deleteOrder, updateOrderStatus, appendToOrder } from "./database";

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

  delete: async (id: string): Promise<void> => {
    await deleteOrder(id);
  },

  closeOrder: async (id: string): Promise<void> => {
    await updateOrderStatus(id, 'closed');
  },

  reopenOrder: async (id: string): Promise<void> => {
    await updateOrderStatus(id, 'open');
  },

  appendItems: async (id: string, additionalText: string): Promise<void> => {
    await appendToOrder(id, additionalText);
  },
};
