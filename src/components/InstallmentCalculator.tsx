"use client";

import React from "react";
import presentValueOfInstallments from "../lib/calc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSelicRate } from "@/hooks/useSelicRate";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function InstallmentCalculator() {
  const { rate: selicRate, loading: loadingSelic } = useSelicRate();
  const [total, setTotal] = React.useState<string>("");
  const [installments, setInstallments] = React.useState<string>("6");
  const [annualRate, setAnnualRate] = React.useState<string>("");
  
  // Opções avançadas
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [selicTrend, setSelicTrend] = React.useState<'stable' | 'falling' | 'rising'>('stable');
  const [safetyMargin, setSafetyMargin] = React.useState(true);

  // Atualiza a taxa quando a Selic for carregada
  React.useEffect(() => {
    if (selicRate !== null && annualRate === "") {
      setAnnualRate(selicRate.toFixed(2));
    }
  }, [selicRate, annualRate]);

  const totalNum = parseFloat(total.replace(",", ".")) || 0;
  const installmentsNum = Math.max(1, parseInt(installments) || 0);
  const annualRateNum = (parseFloat(annualRate.replace(",", ".")) || 0) / 100;

  const pv = presentValueOfInstallments({
    total: totalNum,
    installments: installmentsNum,
    annualRate: annualRateNum,
    selicTrend,
    safetyMargin,
  });

  const installmentValue =
    installmentsNum > 0 ? totalNum / installmentsNum : 0;

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-3xl">
          Calculadora de Parcelas
        </CardTitle>
        <CardDescription className="text-base">
          Descubra quanto você precisa guardar hoje considerando o rendimento do
          seu investimento
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="total">Valor total (R$)</Label>
            <Input
              id="total"
              inputMode="decimal"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="10.000"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="installments">Número de parcelas</Label>
            <Input
              id="installments"
              type="number"
              min={1}
              value={installments}
              onChange={(e) => setInstallments(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">
              Rendimento anual (%)
              {loadingSelic && (
                <span className="ml-2 text-xs text-muted-foreground">
                  carregando...
                </span>
              )}
            </Label>
            <Input
              id="rate"
              inputMode="decimal"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              placeholder="6"
              className="text-lg"
            />
            {selicRate !== null && (
              <p className="text-xs text-gray-500 font-medium">
                Selic atual: {selicRate.toFixed(2)}% a.a.
              </p>
            )}
          </div>
        </div>

        {/* Opções Avançadas */}
        <div className="space-y-4 rounded-lg border border-muted-foreground/20 bg-muted/30 p-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex w-full items-center justify-between text-sm font-medium cursor-pointer hover:text-primary transition-colors"
          >
            <span>⚙️ Opções Avançadas</span>
            <span className="text-muted-foreground">
              {showAdvanced ? "▼" : "▶"}
            </span>
          </button>

          {showAdvanced && (
            <div className="space-y-4 pt-2">
              {/* Tendência da Selic */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Cenário de taxa de juros
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="selic-trend"
                      checked={selicTrend === 'stable'}
                      onChange={() => setSelicTrend('stable')}
                      className="h-4 w-4 text-primary cursor-pointer"
                    />
                    <span className="text-sm">Estável (manter taxa atual)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="selic-trend"
                      checked={selicTrend === 'falling'}
                      onChange={() => setSelicTrend('falling')}
                      className="h-4 w-4 text-primary cursor-pointer"
                    />
                    <span className="text-sm">
                      📉 Queda (-0,25% a cada 3 meses)
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="selic-trend"
                      checked={selicTrend === 'rising'}
                      onChange={() => setSelicTrend('rising')}
                      className="h-4 w-4 text-primary cursor-pointer"
                    />
                    <span className="text-sm">
                      📈 Aumento (+0,25% a cada 3 meses)
                    </span>
                  </label>
                </div>
              </div>

              {/* Margem de Segurança */}
              <div className="flex items-center justify-between space-x-2 rounded-md border border-primary/20 bg-primary/5 p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="safety-margin" className="text-sm font-medium">
                    🛡️ Margem de segurança (+5%)
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Guarda 5% a mais para quedas inesperadas na taxa
                  </p>
                </div>
                <Switch
                  id="safety-margin"
                  checked={safetyMargin}
                  onCheckedChange={setSafetyMargin}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg border-2 border-primary/20 bg-linear-to-br from-primary/5 to-accent/5 p-6">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3">
            <span className="text-muted-foreground">Valor de cada parcela</span>
            <span className="text-2xl font-semibold">
              {currency.format(installmentValue || 0)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Você precisa guardar hoje
            </span>
            <span className="text-3xl font-bold text-primary drop-shadow-sm">
              {currency.format(pv)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2">
        <p className="text-sm text-muted-foreground">
          Este cálculo considera parcelas mensais começando no segundo mês (evitando IOF),
          rendimento com capitalização mensal e Imposto de Renda regressivo sobre os ganhos.
        </p>
        {(selicTrend !== 'stable' || safetyMargin) && (
          <p className="text-xs text-primary font-medium">
            {selicTrend === 'falling' && '📉 Considerando queda gradual da taxa de juros. '}
            {selicTrend === 'rising' && '📈 Considerando aumento gradual da taxa de juros. '}
            {safetyMargin && '🛡️ Margem de segurança de 5% ativada.'}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
