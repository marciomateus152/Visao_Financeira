# 📊 Visão Financeira

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

Uma Single Page Application (SPA) moderna e responsiva focada no gerenciamento inteligente e visual de finanças pessoais. O sistema permite entrada real de receitas e despesas com atualização instantânea de estado usando React, monitoramento de orçamento e geração de relatórios formatados nativamente.

## 🏗️ Arquitetura e Fluxo de Dados

O diagrama abaixo ilustra como a informação transita pelo sistema, desde o input do usuário até a renderização visual e exportação:

```mermaid
graph TD
    A([👤 Usuário]) -->|Insere Dados| B[📝 Formulário de Transações]
    
    B -->|Valida e Envia| C{⚡ Estado Global React}
    
    C -->|Alimenta em Tempo Real| D[📊 Dashboard Principal]
    C -->|Filtra Dados| E[📋 Tabela de Lançamentos]
    
    D --> D1[💳 Cards de Resumo Saldo/Receitas]
    D --> D2[📈 Gráficos Chart.js / Recharts]
    D --> D3[⚠️ Alertas de Orçamento]
    
    E --> F[📥 Módulo de Exportação ExcelJS]
    F -->|Gera e Baixa| G([📄 Relatório .xlsx Formatado])

    %% Estilização do Fluxograma
    classDef user fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff;
    classDef state fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff;
    classDef ui fill:#1f2937,stroke:#111827,stroke-width:2px,color:#fff;
    classDef excel fill:#059669,stroke:#047857,stroke-width:2px,color:#fff;

    class A user;
    class C state;
    class B,D,D1,D2,D3,E ui;
    class F,G excel;
