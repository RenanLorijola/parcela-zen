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
    question: "Qual a diferença entre SELIC, CDB e LCI/LCA?",
    answer: (
      <div className="space-y-3">
        <p>
          Você pode escolher entre três tipos de investimentos, cada um com características específicas:
        </p>
        <div className="space-y-3">
          <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-3">
            <h4 className="font-semibold text-sm mb-1">SELIC (Tesouro Selic)</h4>
            <p className="text-sm text-muted-foreground">
              Investimento que acompanha a taxa básica de juros. Insira a taxa anual diretamente
              (por exemplo, 11,75%). <strong>Possui tributação de IR sobre os rendimentos.</strong>
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-accent bg-accent/5 p-3">
            <h4 className="font-semibold text-sm mb-1">CDB (Certificado de Depósito Bancário)</h4>
            <p className="text-sm text-muted-foreground">
              Título emitido por bancos que geralmente paga um percentual do CDI.
              O CDI fica sempre cerca de 0,1% abaixo da Selic. Insira o percentual
              oferecido (por exemplo, 100% ou 110% do CDI). <strong>Possui tributação de IR.</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>Exemplo:</strong> Com Selic em 11,75%, um CDB de 100% do CDI rende ~11,65% a.a.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-3">
            <h4 className="font-semibold text-sm mb-1">LCI/LCA (Letras de Crédito)</h4>
            <p className="text-sm text-muted-foreground">
              Títulos ligados ao setor imobiliário (LCI) ou agronegócio (LCA).
              Também pagos em percentual do CDI. <strong className="text-primary">
              Isentos de Imposto de Renda para pessoa física!</strong> Isso significa
              que você precisa de menos capital inicial comparado a CDB/SELIC.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>Exemplo:</strong> Uma LCI de 90% do CDI (sem IR) pode render mais
              que um CDB de 100% do CDI (com IR) no mesmo prazo.
            </p>
          </div>
        </div>
        <p className="text-sm font-medium text-primary">
          💡 Dica: LCI/LCA são ideais para este tipo de planejamento pela isenção de IR,
          mas geralmente exigem aplicação mínima mais alta.
        </p>
      </div>
    ),
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
            <h4 className="font-semibold text-sm mb-1">🛡️ Margem de Segurança (-5%)</h4>
            <p className="text-sm text-muted-foreground">
              Reduz a taxa de rendimento esperada em 5% para calcular quanto guardar.
              Por exemplo, se a Selic está em 15% a.a., o cálculo considera apenas 14,25% a.a.
              Isso significa que você guarda um pouco mais de dinheiro, protegendo-se contra
              quedas inesperadas na taxa de juros ou variações não previstas. É sempre melhor
              ter uma margem de segurança do que correr o risco de não conseguir pagar as parcelas.
            </p>
          </div>
        </div>
        <p className="text-sm font-medium text-primary">
          💡 Dica: Para compras parceladas de longo prazo (12+ meses), recomendamos
          manter a margem de segurança ativada e considerar o cenário de queda da Selic.
        </p>
      </div>
    ),
  },
  {
    question: "Como interpretar o gráfico de evolução do investimento?",
    answer: (
      <div className="space-y-3">
        <p>
          O gráfico mostra duas linhas importantes que revelam como seu dinheiro trabalha para você:
        </p>
        <div className="space-y-3">
          <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-3">
            <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-[#22C55E]"></span>
              Linha Verde (Saldo Disponível)
            </h4>
            <p className="text-sm text-muted-foreground">
              Representa o dinheiro que ainda está investido rendendo juros. No início,
              você tem todo o capital investido. A cada mês, o saldo rende e depois
              é usado para pagar a parcela. Note que o saldo diminui gradualmente
              até chegar próximo de zero no final do parcelamento.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-accent bg-accent/5 p-3">
            <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-[#ef4444]"></span>
              Linha Vermelha (Total Pago)
            </h4>
            <p className="text-sm text-muted-foreground">
              Mostra o acumulado de quanto você já pagou em parcelas. Começa em zero
              e cresce linearmente a cada mês, até atingir o valor total da compra.
              É o &ldquo;espelho&rdquo; do seu progresso no pagamento.
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-sm">
            <strong>💡 Insight importante:</strong> A diferença entre o que você guardou
            inicialmente e o total que vai pagar vem dos <strong className="text-primary">rendimentos
            do investimento</strong>. Quanto melhor a taxa de juros, menor o capital inicial necessário!
          </p>
        </div>
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
