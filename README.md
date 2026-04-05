# 📊 Visão Financeira

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

Uma Single Page Application (SPA) moderna e responsiva focada no gerenciamento inteligente e visual de finanças pessoais. O sistema permite entrada real de receitas e despesas com atualização instantânea de estado usando React, monitoramento de orçamento e geração de relatórios formatados nativamente.

## 🏗️ Arquitetura e Fluxo de Dados

O diagrama abaixo ilustra como a informação transita pelo sistema, desde o input do usuário até a renderização visual e exportação:

```mermaid
flowchart TD
    A((Usuário)) -->|Insere Lançamento| B[Formulário de Transações]
    B -->|Valida e Salva| C[(Estado Global - React)]
    
    subgraph Dashboard Dinâmico
        C --> D[Cards: Saldo e Resumo]
        C --> E[Gráficos: Distribuição e Tendência]
        C --> F[Barra de Progresso: Orçamento]
    end
    
    subgraph Módulo de Exportação
        C --> G[Tabela de Lançamentos]
        G -->|Processa via ExcelJS| H[Relatório Formatado .xlsx]
    end
