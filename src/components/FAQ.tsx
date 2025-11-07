"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const faqs = [
  {
    question: "O que essa calculadora busca resolver?",
    answer:
      "Essa calculadora busca estimar, com margem de segurança, qual é o valor que deve ser guardado ao fazer uma aquisição no crédito de forma consciente. Considerando que seu dinheiro irá render no período, você não precisa guardar exatamente o valor total da compra — apenas o suficiente para que os rendimentos cubram as parcelas futuras. Isso permite um uso mais inteligente do seu capital.",
  },
  {
    question: "Qual é a tabela regressiva do Imposto de Renda?",
    answer: (
      <div className="space-y-3">
        <p>
          O Imposto de Renda incide sobre os rendimentos de investimentos de renda fixa
          com alíquotas regressivas conforme o prazo:
        </p>
        <div className="rounded-lg border border-primary/20 bg-muted/50 p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/20">
                <th className="pb-2 text-left font-semibold">Prazo de Aplicação</th>
                <th className="pb-2 text-right font-semibold">Alíquota de IR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              <tr>
                <td className="py-2">Até 180 dias (6 meses)</td>
                <td className="py-2 text-right font-medium">22,5%</td>
              </tr>
              <tr>
                <td className="py-2">De 181 a 360 dias (6 meses a 1 ano)</td>
                <td className="py-2 text-right font-medium">20,0%</td>
              </tr>
              <tr>
                <td className="py-2">De 361 a 720 dias (1 a 2 anos)</td>
                <td className="py-2 text-right font-medium">17,5%</td>
              </tr>
              <tr>
                <td className="py-2">Acima de 720 dias (mais de 2 anos)</td>
                <td className="py-2 text-right font-medium">15,0%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground">
          O IR é descontado automaticamente na fonte apenas sobre o rendimento, nunca
          sobre o valor principal investido.
        </p>
      </div>
    ),
  },
  {
    question: "Quais são as opções avançadas?",
    answer: (
      <div className="space-y-3">
        <p>
          As opções avançadas permitem simular diferentes cenários econômicos para proteger
          seu planejamento financeiro:
        </p>
        <div className="space-y-3">
          <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-3">
            <h4 className="font-semibold text-sm mb-1">📉 Cenário de Queda da Selic</h4>
            <p className="text-sm text-muted-foreground">
              Simula uma redução gradual de 0,25% a cada 3 meses na taxa de juros.
              Quando a Selic cai, seus investimentos rendem menos, então você precisa
              guardar mais dinheiro hoje para garantir o pagamento das parcelas futuras.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-accent bg-accent/5 p-3">
            <h4 className="font-semibold text-sm mb-1">📈 Cenário de Aumento da Selic</h4>
            <p className="text-sm text-muted-foreground">
              Simula um aumento gradual de 0,25% a cada 3 meses. Com taxas maiores,
              você precisa de menos capital inicial, pois os rendimentos serão maiores.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-3">
            <h4 className="font-semibold text-sm mb-1">🛡️ Margem de Segurança (+5%)</h4>
            <p className="text-sm text-muted-foreground">
              Adiciona uma reserva extra de 5% ao valor calculado. Recomendado para se
              proteger contra quedas bruscas e inesperadas na taxa de juros, emergências
              ou variações não previstas. É sempre melhor ter um pouco mais guardado do
              que correr o risco de não conseguir pagar as parcelas.
            </p>
          </div>
        </div>
        <p className="text-sm font-medium text-primary">
          💡 Dica: Para compras parceladas de longo prazo (12+ meses), recomendamos
          ativar a margem de segurança e considerar o cenário de queda da Selic.
        </p>
      </div>
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">Perguntas Frequentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border border-muted-foreground/20 bg-card"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-start justify-between gap-3 p-4 text-left transition-colors hover:bg-muted/50 cursor-pointer"
            >
              <span className="font-semibold text-sm md:text-base">{faq.question}</span>
              <span className="text-muted-foreground shrink-0 text-lg">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="border-t border-muted-foreground/20 p-4 pt-3 text-sm text-muted-foreground">
                {typeof faq.answer === "string" ? <p>{faq.answer}</p> : faq.answer}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
