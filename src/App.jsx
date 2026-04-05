import React from 'react';
import { useGestaoFinanceira } from './ganchos/useGestaoFinanceira';
import { gerarRelatorioExcel } from './utilitarios/exportadorExcel';
import FormularioTransacao from './componentes/Transacoes/FormularioTransacao';
import Filtros from './componentes/Dashboard/Filtros';
import { Wallet, TrendingUp, TrendingDown, Download, Trash2, LayoutDashboard } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const CORES_PIZZA = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#64748b'];

export default function App() {
  const { 
    metricas, adicionarTransacao, excluirTransacao, limiteMensal,
    filtroMes, setFiltroMes, filtroCategoria, setFiltroCategoria
  } = useGestaoFinanceira();

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
              <LayoutDashboard size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Visão Financeira</h1>
              <p className="text-slate-500 font-medium">Gestão de Fluxo de Caixa</p>
            </div>
          </div>
          <button onClick={() => gerarRelatorioExcel(metricas.lista)} className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 rounded-xl font-bold text-white hover:bg-slate-800 transition-all">
            <Download size={20} /> Exportar XLSX
          </button>
        </header>

        <Filtros filtroMes={filtroMes} setFiltroMes={setFiltroMes} filtroCategoria={filtroCategoria} setFiltroCategoria={setFiltroCategoria} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardResumo titulo="Saldo" valor={metricas.saldo} icone={<Wallet />} corTexto="text-blue-600" corFundo="bg-blue-50" />
          <CardResumo titulo="Entradas" valor={metricas.receitas} icone={<TrendingUp />} corTexto="text-emerald-600" corFundo="bg-emerald-50" />
          <CardResumo titulo="Saídas" valor={metricas.despesas} icone={<TrendingDown />} corTexto="text-rose-600" corFundo="bg-rose-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <FormularioTransacao aoEnviar={adicionarTransacao} />
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <h3 className="font-black text-slate-800 mb-4">Uso do Orçamento</h3>
              <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden border">
                <div className={`h-full transition-all duration-1000 ${metricas.porcentagemUso > 85 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${metricas.porcentagemUso}%` }} />
              </div>
              <p className="mt-2 font-bold text-slate-500">{metricas.porcentagemUso.toFixed(1)}%</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[350px]">
                <h3 className="font-black text-slate-800 mb-6 text-center">Fluxo</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metricas.dadosGraficoBarra}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="nome" hide />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="receitas" fill="#10b981" />
                    <Bar dataKey="despesas" fill="#f43f5e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[350px]">
                <h3 className="font-black text-slate-800 mb-6 text-center">Categorias</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={metricas.dadosGraficoPizza} innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
                      {metricas.dadosGraficoPizza.map((_, i) => <Cell key={i} fill={CORES_PIZZA[i % CORES_PIZZA.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-black">
                  <tr>
                    <th className="px-6 py-5">Data</th>
                    <th className="px-6 py-5">Descrição</th>
                    <th className="px-6 py-5 text-right">Valor</th>
                    <th className="px-6 py-5 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {metricas.lista.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">{t.data.split('-').reverse().join('/')}</td>
                      <td className="px-6 py-4 font-bold">{t.descricao}</td>
                      <td className={`px-6 py-4 text-right font-black ${t.tipo === 'Receita' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        R$ {t.valor.toLocaleString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => excluirTransacao(t.id)} className="text-slate-300 hover:text-rose-500"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardResumo({ titulo, valor, icone, corTexto, corFundo }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase">{titulo}</span>
        <h2 className={`text-3xl font-black ${corTexto}`}>R$ {valor.toLocaleString('pt-BR')}</h2>
      </div>
      <div className={`p-4 rounded-2xl ${corFundo} ${corTexto}`}>{React.cloneElement(icone, { size: 28 })}</div>
    </div>
  );
}