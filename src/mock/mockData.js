export const mockDosGastos = [
  {
    id: 1,
    descricao: 'Salário',
    categoria: 'Renda Fixa',
    valor: 4500.00,
    data: new Date().toISOString(),
    tipo: 'receita'
  },
  {
    id: 2,
    descricao: 'Almoço Restaurante',
    categoria: 'Alimentação',
    valor: 45.90,
    data: new Date().toISOString(),
    tipo: 'despesa'
  },
  {
    id: 3,
    descricao: 'Uber para o trabalho',
    categoria: 'Transporte',
    valor: 15.50,
    data: new Date(Date.now() - 86400000).toISOString(),
    tipo: 'despesa'
  },
  {
    id: 4,
    descricao: 'Conta de Luz',
    categoria: 'Contas Domésticas',
    valor: 180.00,
    data: new Date(Date.now() - 172800000).toISOString(),
    tipo: 'despesa'
  },
];

let gastosNaMemoria = [...mockDosGastos];
let proximoId = 5;

export const mockColocarGasto = (gasto) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const gastoNovo = {
        ...gasto,
        id: proximoId++,
      };
      gastosNaMemoria.unshift(gastoNovo);
      resolve(gastoNovo);
    }, 500);
  });
};

export const mockPuxarTodosGastos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...gastosNaMemoria]);
    }, 500);
  });
};

export const mockDeletarGasto = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      gastosNaMemoria = gastosNaMemoria.filter((g) => g.id !== id);
      resolve(true);
    }, 300);
  });
};
