import * as SQLite from 'expo-sqlite';
import { Order } from '@/types/order';

let db: SQLite.SQLiteDatabase | null = null;

export async function initDatabase(): Promise<void> {
  try {
    db = await SQLite.openDatabaseAsync('orders.db');
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        audioUri TEXT NOT NULL,
        transcribedText TEXT NOT NULL,
        staffName TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        duration TEXT NOT NULL,
        tableNumber INTEGER,
        guestCount INTEGER,
        status TEXT DEFAULT 'open'
      );
    `);
    
    try {
      await db.execAsync(`ALTER TABLE orders ADD COLUMN tableNumber INTEGER;`);
    } catch (e) {}
    try {
      await db.execAsync(`ALTER TABLE orders ADD COLUMN guestCount INTEGER;`);
    } catch (e) {}
    try {
      await db.execAsync(`ALTER TABLE orders ADD COLUMN status TEXT DEFAULT 'open';`);
    } catch (e) {}
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export async function getAllOrders(): Promise<Order[]> {
  if (!db) await initDatabase();
  
  try {
    const result = await db!.getAllAsync<Order>(
      'SELECT * FROM orders ORDER BY timestamp DESC'
    );
    return result;
  } catch (error) {
    console.error('Failed to get all orders:', error);
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (!db) await initDatabase();
  
  try {
    const result = await db!.getFirstAsync<Order>(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    );
    return result || null;
  } catch (error) {
    console.error('Failed to get order by id:', error);
    return null;
  }
}

export async function addOrder(order: Order): Promise<void> {
  if (!db) await initDatabase();
  
  try {
    await db!.runAsync(
      'INSERT INTO orders (id, audioUri, transcribedText, staffName, timestamp, duration, tableNumber, guestCount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [order.id, order.audioUri, order.transcribedText, order.staffName, order.timestamp, order.duration, order.tableNumber || null, order.guestCount || null, order.status || 'open']
    );
  } catch (error) {
    console.error('Failed to add order:', error);
    throw error;
  }
}

export async function deleteOrder(id: string): Promise<void> {
  if (!db) await initDatabase();
  
  try {
    await db!.runAsync('DELETE FROM orders WHERE id = ?', [id]);
  } catch (error) {
    console.error('Failed to delete order:', error);
    throw error;
  }
}

export async function updateOrderStatus(id: string, status: 'open' | 'closed'): Promise<void> {
  if (!db) await initDatabase();
  
  try {
    await db!.runAsync('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
  } catch (error) {
    console.error('Failed to update order status:', error);
    throw error;
  }
}

export async function searchOrders(query: string): Promise<Order[]> {
  if (!db) await initDatabase();
  
  try {
    const lowerQuery = `%${query.toLowerCase()}%`;
    const result = await db!.getAllAsync<Order>(
      'SELECT * FROM orders WHERE LOWER(transcribedText) LIKE ? OR LOWER(staffName) LIKE ? ORDER BY timestamp DESC',
      [lowerQuery, lowerQuery]
    );
    return result;
  } catch (error) {
    console.error('Failed to search orders:', error);
    return [];
  }
}

export async function appendToOrder(id: string, additionalText: string): Promise<void> {
  if (!db) await initDatabase();
  
  try {
    const existingOrder = await getOrderById(id);
    if (!existingOrder) throw new Error('Order not found');
    
    const newText = existingOrder.transcribedText + '\n\n--- Added Items ---\n' + additionalText;
    await db!.runAsync('UPDATE orders SET transcribedText = ? WHERE id = ?', [newText, id]);
  } catch (error) {
    console.error('Failed to append to order:', error);
    throw error;
  }
}
