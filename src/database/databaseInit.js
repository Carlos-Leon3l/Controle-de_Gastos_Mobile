import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let db = null;

export const initDatabase = async () => {
  if (Platform.OS === 'web') {
    console.log('Plataforma Web detectada, pulando inicialização do SQLite. Usando dados mockados.');
    return;
  }
  
  try {
    db = await SQLite.openDatabaseAsync('gastos.db');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        categoria TEXT NOT NULL,
        valor REAL NOT NULL,
        data TEXT NOT NULL,
        tipo TEXT NOT NULL DEFAULT 'despesa'
      );
    `);
        try {
      await db.execAsync(`ALTER TABLE expenses ADD COLUMN tipo TEXT NOT NULL DEFAULT 'despesa';`);
    } catch (e) {
    }

    console.log('Banco de dados inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
  }
};

export const getDb = () => db;
