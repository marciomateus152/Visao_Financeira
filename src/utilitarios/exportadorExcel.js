import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const gerarRelatorioExcel = async (transacoes) => {
  const pastaTrabalho = new ExcelJS.Workbook();
  pastaTrabalho.creator = 'Visão Financeira';

  const estilo = {
    cabecalhoFundo: 'FF1E293B',
    cabecalhoTexto: 'FFFFFFFF',
    receita: 'FF10B981',
    despesa: 'FFEF4444',
    borda: 'FFCBD5E1',
    fundoAlternado: 'FFF8FAFC'
  };

  const abaResumo = pastaTrabalho.addWorksheet('RESUMO', { views: [{ showGridLines: false }] });
  const abaReceitas = pastaTrabalho.addWorksheet('RECEITAS');
  const abaDespesas = pastaTrabalho.addWorksheet('DESPESAS');

  abaResumo.getColumn('B').width = 25;
  abaResumo.getColumn('C').width = 20;

  abaResumo.getCell('B2').value = 'RELATÓRIO FINANCEIRO CONSOLIDADO';
  abaResumo.getCell('B2').font = { name: 'Arial', size: 16, bold: true, color: { argb: estilo.cabecalhoFundo } };

  const configurarKpi = (linha, rotulo, formula, cor) => {
    const celRotulo = abaResumo.getCell(`B${linha}`);
    const celValor = abaResumo.getCell(`C${linha}`);

    celRotulo.value = rotulo;
    celRotulo.font = { bold: true };
    celRotulo.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: estilo.fundoAlternado } };
    
    celValor.value = { formula };
    celValor.font = { bold: true, color: { argb: cor }, size: 12 };
    celValor.numFmt = '"R$ "#,##0.00';
    celValor.alignment = { horizontal: 'right' };
    celValor.border = { bottom: { style: 'thin', color: { argb: estilo.borda } } };
  };

  configurarKpi(5, 'TOTAL DE ENTRADAS', "SUM('RECEITAS'!D:D)", estilo.receita);
  configurarKpi(6, 'TOTAL DE SAÍDAS', "SUM('DESPESAS'!D:D)", estilo.despesa);
  configurarKpi(7, 'SALDO LÍQUIDO', 'C5-C6', estilo.cabecalhoFundo);

  const prepararAbaDados = (aba, tipo) => {
    aba.columns = [
      { header: 'DATA', key: 'data', width: 15 },
      { header: 'CATEGORIA', key: 'categoria', width: 25 },
      { header: 'DESCRIÇÃO', key: 'descricao', width: 45 },
      { header: 'VALOR', key: 'valor', width: 20 }
    ];

    aba.getRow(1).eachCell((celula) => {
      celula.font = { bold: true, color: { argb: estilo.cabecalhoTexto } };
      celula.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: estilo.cabecalhoFundo } };
      celula.alignment = { horizontal: 'center' };
    });

    const filtrados = transacoes.filter(t => t.tipo === tipo);

    filtrados.forEach((t, index) => {
      const [ano, mes, dia] = t.data.split('-').map(Number);
      const novaLinha = aba.addRow({
        data: new Date(ano, mes - 1, dia),
        categoria: t.categoria.toUpperCase(),
        descricao: t.descricao,
        valor: Number(t.valor)
      });

      if (index % 2 === 0) {
        novaLinha.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: estilo.fundoAlternado } };
      }
    });

    aba.getColumn('valor').numFmt = '"R$ "#,##0.00';
    aba.getColumn('data').numFmt = 'dd/mm/yyyy';

    aba.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: 4 }
    };

    const linhaTotal = aba.rowCount + 2;
    aba.getCell(`C${linhaTotal}`).value = 'TOTAL ACUMULADO:';
    aba.getCell(`C${linhaTotal}`).font = { bold: true };
    aba.getCell(`D${linhaTotal}`).value = { formula: `SUM(D2:D${linhaTotal - 2})` };
    aba.getCell(`D${linhaTotal}`).font = { bold: true };
    aba.getCell(`D${linhaTotal}`).numFmt = '"R$ "#,##0.00';

    aba.views = [{ state: 'frozen', ySplit: 1 }];
  };

  prepararAbaDados(abaReceitas, 'Receita');
  prepararAbaDados(abaDespesas, 'Despesa');

  const buffer = await pastaTrabalho.xlsx.writeBuffer();
  const arquivo = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(arquivo, `Relatorio_Financeiro_${new Date().getTime()}.xlsx`);
};