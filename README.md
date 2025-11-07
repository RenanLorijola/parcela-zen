# 💳 Parcela Zen

> Planeje suas parcelas com inteligência

Calculadora inteligente que estima quanto você precisa guardar hoje para pagar compras parceladas, considerando que seu dinheiro irá render enquanto você aguarda as parcelas.

## 🎯 Objetivo

Fazer aquisições no crédito de forma consciente, sem precisar guardar 100% do valor total. Com seus investimentos rendendo, você precisa apenas do valor presente (PV) necessário para cobrir as parcelas futuras.

## ✨ Funcionalidades

### 📊 Cálculo Inteligente
- **Taxa Selic atualizada**: Busca automática da taxa atual via [BrasilAPI](https://brasilapi.com.br)
- **Imposto de Renda**: Tabela regressiva real (22,5% → 15%)
- **IOF**: Considera que parcelas começam no 2º mês para evitar IOF dos primeiros 30 dias
- **Capitalização mensal**: Cálculo preciso mês a mês

### ⚙️ Opções Avançadas
- **📉 Cenário de Queda**: Simula queda de 0,25% na Selic a cada 3 meses
- **📈 Cenário de Aumento**: Simula aumento de 0,25% na Selic a cada 3 meses
- **🛡️ Margem de Segurança**: Adiciona 5% de proteção (ativada por padrão)

### 📚 FAQ Integrado
- Explicação detalhada sobre o objetivo da calculadora
- Tabela completa do IR sobre investimentos
- Guia sobre cenários econômicos

## 🚀 Como Usar

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/parcela-zen.git
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

**Compra de R$ 6.000 em 6 parcelas:**

1. **Sem investimento**: Você precisaria de R$ 6.000 guardados
2. **Com Parcela Zen**: 
   - Taxa Selic: 15% a.a.
   - IR considerado
   - IOF evitado
   - **Resultado**: ~R$ 5.850 (economiza R$ 150!)

## 🛠️ Tecnologias

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Estilo**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes**: [shadcn/ui](https://ui.shadcn.com/)
- **TypeScript**: Tipagem completa
- **API**: [BrasilAPI](https://brasilapi.com.br/) para taxa Selic

## 📊 Tabela de IR

| Prazo | Alíquota |
|-------|----------|
| Até 180 dias | 22,5% |
| 181 a 360 dias | 20,0% |
| 361 a 720 dias | 17,5% |
| Acima de 720 dias | 15,0% |

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
