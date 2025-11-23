import { Order } from "@/types/order";

let orders: Order[] = [];

export const orderStore = {
  getAll: (): Order[] => {
    return [...orders].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  getById: (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  },

  add: (order: Order): void => {
    orders = [order, ...orders];
  },

  search: (query: string): Order[] => {
    const lowerQuery = query.toLowerCase();
    return orders.filter(order =>
      order.transcribedText.toLowerCase().includes(lowerQuery) ||
      order.staffName.toLowerCase().includes(lowerQuery)
    ).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },
};
