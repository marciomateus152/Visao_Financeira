import { useState, useMemo } from 'react';

export function useGestaoFinanceira() {
  const [transacoes, setTransacoes] = useState([]);
  const [limiteMensal] = useState(5000);
  const [filtroMes, setFiltroMes] = useState('Todos');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');

  const adicionarTransacao = (novaTransacao) => {
    setTransacoes((listaAnterior) => [
      { ...novaTransacao, id: Date.now() },
      ...listaAnterior
    ]);
  };

  const excluirTransacao = (id) => {
    setTransacoes(transacoes.filter((t) => t.id !== id));
  };

  const transacoesFiltradas = useMemo(() => {
    return transacoes.filter((t) => {
      const mesTransacao = t.data.split('-');
      const atendeMes = filtroMes === 'Todos' || mesTransacao === filtroMes;
      const atendeCategoria = filtroCategoria === 'Todas' || t.categoria === filtroCategoria;
      return atendeMes && atendeCategoria;
    });
  }, [transacoes, filtroMes, filtroCategoria]);

  const metricas = useMemo(() => {
    const receitas = transacoesFiltradas
      .filter((t) => t.tipo === 'Receita')
      .reduce((total, t) => total + t.valor, 0);
    
    const despesas = transacoesFiltradas
      .filter((t) => t.tipo === 'Despesa')
      .reduce((total, t) => total + t.valor, 0);

    const porCategoria = transacoesFiltradas
      .filter((t) => t.tipo === 'Despesa')
      .reduce((acumulador, t) => {
        acumulador[t.categoria] = (acumulador[t.categoria] || 0) + t.valor;
        return acumulador;
      }, {});

    const dadosGraficoPizza = Object.keys(porCategoria).map((nome) => ({
      name: nome,
      value: porCategoria[nome]
    }));

    const dadosGraficoBarra = [
      { nome: 'Comparativo', receitas, despesas }
    ];

    return {
      receitas,
      despesas,
      saldo: receitas - despesas,
      porcentagemUso: Math.min((despesas / limiteMensal) * 100, 100),
      dadosGraficoPizza,
      dadosGraficoBarra,
      lista: transacoesFiltradas
    };
  }, [transacoesFiltradas, limiteMensal]);

  return {
    metricas,
    adicionarTransacao,
    excluirTransacao,
    limiteMensal,
    filtroMes,
    setFiltroMes,
    filtroCategoria,
    setFiltroCategoria
  };
}