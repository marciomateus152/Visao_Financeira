import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function FormularioTransacao({ aoEnviar }) {
  const [estado, setEstado] = useState({
    descricao: '',
    valor: '',
    tipo: 'Receita',
    categoria: 'Salário',
    data: new Date().toISOString().split('T')
  });

  const lidarComSubmissao = (e) => {
    e.preventDefault();
    if (!estado.descricao || !estado.valor) return;
    aoEnviar({ ...estado, valor: parseFloat(estado.valor) });
    setEstado({ ...estado, descricao: '', valor: '' });
  };

  return (
    <form onSubmit={lidarComSubmissao} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
      <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-2">
        <PlusCircle className="text-blue-600" size={24} /> Registrar Transação
      </h3>
      
      <div>
        <label className="block text-sm font-bold text-slate-500 mb-1">Descrição</label>
        <input
          type="text"
          className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={estado.descricao}
          onChange={(e) => setEstado({...estado, descricao: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-1">Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={estado.valor}
            onChange={(e) => setEstado({...estado, valor: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-1">Tipo</label>
          <select
            className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
            value={estado.tipo}
            onChange={(e) => setEstado({...estado, tipo: e.target.value})}
          >
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-1">Categoria</label>
          <select
            className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={estado.categoria}
            onChange={(e) => setEstado({...estado, categoria: e.target.value})}
          >
            <option value="Salário">Salário</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-1">Data</label>
          <input
            type="date"
            className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={estado.data}
            onChange={(e) => setEstado({...estado, data: e.target.value})}
          />
        </div>
      </div>

      <button className="w-full py-4 mt-2 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all text-lg">
        Lançar no Sistema
      </button>
    </form>
  );
}