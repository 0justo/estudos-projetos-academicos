# Python

Notebooks Jupyter (feitos no Google Colab / VS Code).

| Projeto | Disciplina | O que faz | Bibliotecas |
|---|---|---|---|
| [`analise-de-vendas`](analise-de-vendas) | Linguagem de Programação (2º sem.) | Lê uma planilha de vendas, analisa faturamento e vendas por categoria, gera gráficos e monta um relatório em Word automaticamente ([relatório gerado](analise-de-vendas/relatorio-gerado.pdf)) | pandas, NumPy, Matplotlib, openpyxl, python-docx |
| [`projeto-comercial`](projeto-comercial) | Linguagem de Programação (2º sem.) | Lê e integra três bases (vendas, clientes, produtos), faz limpeza, análise exploratória básica e avançada, gráficos e conclusões | pandas, NumPy, Matplotlib |
| [`simulacao-teoria-das-filas`](simulacao-teoria-das-filas) | Cálculo (2º sem.) | Simulação de eventos discretos de uma fila M/M/1: varia a carga ρ = λ/μ de 0,1 a 0,99, compara o tempo de espera simulado com o teórico e mostra a fila "explodindo" quando ρ → 1 (o limite do pitch) ([slides](simulacao-teoria-das-filas/pitch-limites-e-teoria-das-filas.pdf)) | SimPy, NumPy, Matplotlib |

## Como rodar

```bash
pip install pandas numpy matplotlib openpyxl xlrd python-docx simpy jupyter
jupyter notebook
```

Os dados de entrada (`.xlsx` e `.csv`) estão na mesma pasta de cada notebook.
