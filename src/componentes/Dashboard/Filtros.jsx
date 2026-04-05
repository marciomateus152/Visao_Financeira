import React from 'react';
import { Filter } from 'lucide-react';

export default function Filtros({ filtroMes, setFiltroMes, filtroCategoria, setFiltroCategoria }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
      <div className="flex items-center gap-2 text-slate-500 font-bold">
        <Filter size={20} />
        <span>Filtros</span>
      </div>
      <select 
        value={filtroMes} 
        onChange={(e) => setFiltroMes(e.target.value)}
        className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto font-medium text-slate-700"
      >
        <option value="Todos">Todos os Meses</option>
        <option value="01">Janeiro</option>
        <option value="02">Fevereiro</option>
        <option value="03">Março</option>
        <option value="04">Abril</option>
        <option value="05">Maio</option>
        <option value="06">Junho</option>
        <option value="07">Julho</option>
        <option value="08">Agosto</option>
        <option value="09">Setembro</option>
        <option value="10">Outubro</option>
        <option value="11">Novembro</option>
        <option value="12">Dezembro</option>
      </select>
      <select 
        value={filtroCategoria} 
        onChange={(e) => setFiltroCategoria(e.target.value)}
        className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto font-medium text-slate-700"
      >
        <option value="Todas">Todas as Categorias</option>
        <option value="Salário">Salário</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
        <option value="Educação">Educação</option>
        <option value="Outros">Outros</option>
      </select>
    </div>
  );
}