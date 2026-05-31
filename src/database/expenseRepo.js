import { Platform } from 'react-native';
import { getDb } from './databaseInit';
import { mockPuxarTodosGastos, mockColocarGasto, mockDeletarGasto } from '../mock/mockData';

export const puxarTodosGastos = async () => {
  if (Platform.OS === 'web') {
    return await mockPuxarTodosGastos();
  }

  const db = getDb();
  if (!db) throw new Error('Banco de dados não inicializado');

  try {
    const allRows = await db.getAllAsync('SELECT * FROM expenses ORDER BY id DESC;');
    return allRows;
  } catch (error) {
    console.error('Erro ao buscar gastos:', error);
    return [];
  }
};

export const ColocarGastoNoBanco = async (gasto) => {
  if (Platform.OS === 'web') {
    return await mockColocarGasto(gasto);
  }

  const db = getDb();
  if (!db) throw new Error('Banco de dados não inicializado');

  try {
    const result = await db.runAsync(
      'INSERT INTO expenses (descricao, categoria, valor, data, tipo) VALUES (?, ?, ?, ?, ?);',
      [gasto.descricao, gasto.categoria, gasto.valor, gasto.data, gasto.tipo]
    );
    return { ...gasto, id: result.lastInsertRowId };
  } catch (error) {
    console.error('Erro ao inserir gasto:', error);
    throw error;
  }
};

export const deletarGastoDoBanco = async (id) => {
  if (Platform.OS === 'web') {
    return await mockDeletarGasto(id);
  }

  const db = getDb();
  if (!db) throw new Error('Banco de dados não inicializado');

  try {
    await db.runAsync('DELETE FROM expenses WHERE id = ?;', [id]);
    return true;
  } catch (error) {
    console.error('Erro ao deletar gasto:', error);
    return false;
  }
};
