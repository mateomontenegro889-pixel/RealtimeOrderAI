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
        duration TEXT NOT NULL
      );
    `);
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
      'INSERT INTO orders (id, audioUri, transcribedText, staffName, timestamp, duration) VALUES (?, ?, ?, ?, ?, ?)',
      [order.id, order.audioUri, order.transcribedText, order.staffName, order.timestamp, order.duration]
    );
  } catch (error) {
    console.error('Failed to add order:', error);
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
