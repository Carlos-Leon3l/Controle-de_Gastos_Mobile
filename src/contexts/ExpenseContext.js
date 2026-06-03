import React, { createContext, useState, useEffect, useContext } from 'react';
import { puxarTodosGastos, ColocarGastoNoBanco, deletarGastoDoBanco } from '../database/expenseRepo';
import dayjs from 'dayjs';

const ContextoDeGastos = createContext();

export const ExpenseProvider = ({ children }) => {
  const [Gastos, setGastos] = useState([]);
  const [Carregando, setCarregando] = useState(true);
  const [mesAnoAtual, setMesAnoAtual] = useState(dayjs().format('YYYY-MM'));

  const gastosDoMes = Gastos.filter(g => dayjs(g.data).format('YYYY-MM') === mesAnoAtual);
  const totalReceitas = gastosDoMes
    .filter(g => g.tipo === 'receita')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalDespesas = gastosDoMes
    .filter(g => g.tipo === 'despesa')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const saldoAtual = totalReceitas - totalDespesas;

  const carregarTudoDoBanco = async () => {
    setCarregando(true);
    try {
      const dados = await puxarTodosGastos();
      setGastos(dados);
    } catch (error) {
      console.error('Falha ao carregar os gastos', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarTudoDoBanco();
  }, []);

  const novoGasto = async (dadosDoGasto) => {
    try {
      const gastoNovo = await ColocarGastoNoBanco(dadosDoGasto);
      setGastos((gastosAnteriores) => [gastoNovo, ...gastosAnteriores]);
      return true;
    } catch (error) {
      console.error('Falha ao adicionar o gasto', error);
      return false;
    }
  };

  const removerGasto = async (id) => {
    try {
      const sucesso = await deletarGastoDoBanco(id);
      if (sucesso) {
        setGastos(gastosAtuais => gastosAtuais.filter(g => g.id !== id));
      }
      return sucesso;
    } catch (error) {
      console.error('Falha ao remover o gasto', error);
      return false;
    }
  };

  const mudarMes = (direcao) => {
    const atual = dayjs(`${mesAnoAtual}-01`);
    if (direcao === 'anterior') {
      setMesAnoAtual(atual.subtract(1, 'month').format('YYYY-MM'));
    } else {
      setMesAnoAtual(atual.add(1, 'month').format('YYYY-MM'));
    }
  };

  const definirMesAno = (novoMesAno) => {
    setMesAnoAtual(novoMesAno);
  };

  return (
    <ContextoDeGastos.Provider value={{ 
      Gastos: gastosDoMes, 
      novoGasto, 
      removerGasto,
      Carregando, 
      carregarTudoDoBanco,
      mesAnoAtual,
      mudarMes,
      definirMesAno,
      totalReceitas,
      totalDespesas,
      saldoAtual
    }}>
      {children}
    </ContextoDeGastos.Provider>
  );
};

export const usarGastos = () => useContext(ContextoDeGastos);
