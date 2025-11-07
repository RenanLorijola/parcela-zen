# 💳 Parcela Zen

> Planeje suas parcelas com inteligência

Calculadora inteligente que estima quanto você precisa guardar hoje para pagar compras parceladas, considerando que seu dinheiro irá render enquanto você aguarda as parcelas.

## 🎯 Objetivo

Fazer aquisições no crédito de forma consciente, sem precisar guardar 100% do valor total. Com seus investimentos rendendo, você precisa apenas do valor presente (PV) necessário para cobrir as parcelas futuras.

## ✨ Funcionalidades

### 📊 Cálculo Inteligente
- **Taxa Selic atualizada**: Busca automática da taxa atual via [BrasilAPI](https://brasilapi.com.br)
- **Três tipos de investimento**:
  - **SELIC**: Taxa absoluta (Tesouro Selic)
  - **CDB**: Percentual do CDI com tributação de IR
  - **LCI/LCA**: Percentual do CDI **isento de IR**
- **Imposto de Renda**: Tabela regressiva real (22,5% → 15%)
- **IOF**: Considera que parcelas começam no 2º mês para evitar IOF dos primeiros 30 dias
- **Capitalização mensal**: Cálculo preciso mês a mês
- **Gráfico interativo**: Visualize a evolução do seu investimento ao longo do tempo

### ⚙️ Opções Avançadas
- **📉 Cenário de Queda**: Simula queda de 0,25% na Selic a cada 3 meses
- **📈 Cenário de Aumento**: Simula aumento de 0,25% na Selic a cada 3 meses
- **🛡️ Margem de Segurança**: Reduz a taxa de rendimento em 5% para cálculo conservador (ativada por padrão)

### � Gráfico de Evolução
- Visualização clara da evolução do saldo ao longo do tempo
- Linha verde mostrando o saldo disponível diminuindo
- Linha vermelha mostrando o total pago acumulado
- Tooltip com valores formatados em BRL

### 📚 FAQ Integrado
- Explicação sobre SELIC, CDB e LCI/LCA
- Tabela completa do IR sobre investimentos
- Guia sobre cenários econômicos
- Como interpretar o gráfico de evolução

## 🚀 Como Usar

### Instalação

```bash
# Clone o repositório
git clone https://github.com/RenanLorijola/parcela-zen.git
cd parcela-zen

# Instale as dependências
pnpm install

# Execute o projeto
pnpm dev
```

Acesse http://localhost:3000

### Build para Produção

```bash
pnpm build
pnpm start
```

## 🧮 Como Funciona?

### Exemplo Prático

**Compra de R$ 10.000 em 6 parcelas:**

#### SELIC (15% a.a.)
- Taxa: 15% ao ano
- Com IR: ~22,5% nos primeiros 6 meses
- **Você precisa guardar**: ~R$ 9.700

#### CDB (100% do CDI = 14,9% a.a.)
- CDI = Selic - 0,1% = 14,9%
- Com IR: ~22,5% nos primeiros 6 meses
- **Você precisa guardar**: ~R$ 9.720

#### LCI/LCA (90% do CDI = 13,41% a.a.)
- 90% do CDI = 13,41%
- **SEM IR**: Isento!
- **Você precisa guardar**: ~R$ 9.740

*Valores aproximados considerando margem de segurança ativada*

### Por que LCI/LCA pode ser melhor?

Mesmo rendendo menos em percentual, a **isenção de IR** da LCI/LCA pode torná-la mais vantajosa que um CDB com rendimento maior. Por exemplo:

- CDB 100% CDI (14,9% bruto) → ~11,5% líquido após IR
- LCI 90% CDI (13,4% bruto) → **13,4% líquido** (sem IR)

## 🛠️ Tecnologias

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Estilo**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes**: [shadcn/ui](https://ui.shadcn.com/)
- **Gráficos**: [Recharts](https://recharts.org/)
- **TypeScript**: Tipagem completa
- **API**: [BrasilAPI](https://brasilapi.com.br/) para taxa Selic

## 📊 Tabela de IR

| Prazo | Alíquota | Aplica-se a |
|-------|----------|-------------|
| Até 180 dias | 22,5% | SELIC, CDB |
| 181 a 360 dias | 20,0% | SELIC, CDB |
| 361 a 720 dias | 17,5% | SELIC, CDB |
| Acima de 720 dias | 15,0% | SELIC, CDB |
| Qualquer prazo | **0%** | **LCI/LCA** |

*O IR incide apenas sobre o rendimento, nunca sobre o capital investido*

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 🙏 Agradecimentos

- [BrasilAPI](https://brasilapi.com.br/) pela API gratuita de taxas
- [shadcn/ui](https://ui.shadcn.com/) pelos componentes
- Comunidade Next.js

---

**Aviso Legal**: Esta é uma ferramenta educacional. Consulte um profissional financeiro antes de tomar decisões de investimento.
