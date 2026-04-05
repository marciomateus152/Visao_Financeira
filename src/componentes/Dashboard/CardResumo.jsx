import React from 'react';

export default function CardResumo({ titulo, valor, icone, corTexto, corFundo }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{titulo}</span>
        <h2 className={`text-3xl font-black mt-2 ${corTexto}`}>
          R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h2>
      </div>
      <div className={`p-4 rounded-2xl ${corFundo} ${corTexto}`}>
        {React.cloneElement(icone, { size: 28 })}
      </div>
    </div>
  );
}