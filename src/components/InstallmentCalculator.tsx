"use client";

import React from "react";
import presentValueOfInstallments, { generateChartData } from "../lib/calc";
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function InstallmentCalculator() {
  const { rate: selicRate, loading: loadingSelic } = useSelicRate();
  const [total, setTotal] = React.useState<string>("");
  const [installments, setInstallments] = React.useState<string>("6");
  const [annualRate, setAnnualRate] = React.useState<string>("");
  const [investmentType, setInvestmentType] = React.useState<'selic' | 'cdb' | 'lci-lca'>('selic');
  
  // Opções avançadas
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [selicTrend, setSelicTrend] = React.useState<'stable' | 'falling' | 'rising'>('stable');
  const [safetyMargin, setSafetyMargin] = React.useState(true);

  // Atualiza a taxa quando a Selic for carregada
  React.useEffect(() => {
    if (selicRate !== null && annualRate === "") {
      if (investmentType === 'selic') {
        setAnnualRate(selicRate.toFixed(2));
      } else {
        setAnnualRate("100");
      }
    }
  }, [selicRate, annualRate, investmentType]);

  const totalNum = parseFloat(total.replace(",", ".")) || 0;
  const installmentsNum = Math.max(1, parseInt(installments) || 0);
  
  // Calcula a taxa efetiva baseado no tipo de investimento
  let effectiveRate = parseFloat(annualRate.replace(",", ".")) || 0;
  if (investmentType === 'selic') {
    // SELIC: usa taxa absoluta
    effectiveRate = effectiveRate;
  } else if (investmentType === 'cdb' || investmentType === 'lci-lca') {
    // CDB/LCI-LCA: calcula baseado em % do CDI
    if (selicRate !== null) {
      const cdiRate = selicRate - 0.1;
      effectiveRate = (cdiRate * effectiveRate) / 100;
    }
  }
  const annualRateNum = effectiveRate / 100;

  const pv = presentValueOfInstallments({
    total: totalNum,
    installments: installmentsNum,
    annualRate: annualRateNum,
    selicTrend,
    safetyMargin,
    exemptIR: investmentType === 'lci-lca',
  });

  // Gera dados do gráfico
  const chartData = React.useMemo(() => {
    if (totalNum > 0 && installmentsNum > 0 && annualRateNum > 0) {
      return generateChartData({
        total: totalNum,
        installments: installmentsNum,
        annualRate: annualRateNum,
        selicTrend,
        exemptIR: investmentType === 'lci-lca',
      });
    }
    return [];
  }, [totalNum, installmentsNum, annualRateNum, selicTrend, investmentType]);

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
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
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
                max={99}
                value={installments}
                onChange={(e) => {
                  const value = Math.min(99, parseInt(e.target.value) || 0);
                  setInstallments(value.toString());
                }}
                className="text-lg"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de investimento</Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInvestmentType('selic')}
                  className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all cursor-pointer text-sm ${
                    investmentType === 'selic'
                      ? 'border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E] font-medium'
                      : 'border-border hover:border-[#22C55E]/50'
                  }`}
                >
                  SELIC
                </button>
                <button
                  type="button"
                  onClick={() => setInvestmentType('cdb')}
                  className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all cursor-pointer text-sm ${
                    investmentType === 'cdb'
                      ? 'border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E] font-medium'
                      : 'border-border hover:border-[#22C55E]/50'
                  }`}
                >
                  CDB
                </button>
                <button
                  type="button"
                  onClick={() => setInvestmentType('lci-lca')}
                  className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all cursor-pointer text-sm ${
                    investmentType === 'lci-lca'
                      ? 'border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E] font-medium'
                      : 'border-border hover:border-[#22C55E]/50'
                  }`}
                >
                  LCI/LCA
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rate">
                {investmentType === 'selic' ? 'Rendimento anual (%)' : 'Percentual do CDI (%)'}
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
                placeholder={investmentType === 'selic' ? '11.75' : '100'}
                className="text-lg"
              />
            </div>
          </div>
        </div>
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
              <div className="flex items-center justify-between space-x-2 rounded-md border border-primary/20 bg-primary/5 p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="safety-margin" className="text-sm font-medium">
                    🛡️ Margem de segurança (-5%)
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Reduz a taxa de rendimento em 5% para calcular com segurança
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
        {chartData.length > 0 && (
          <div className="space-y-3 rounded-lg border-2 border-primary/20 bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">
              📊 Evolução do seu investimento
            </h3>
            <p className="text-sm text-muted-foreground">
              Veja como seu dinheiro rende e é usado para pagar as parcelas ao longo do tempo
            </p>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    label={{ value: "Meses", position: "insideBottom", offset: -5 }}
                    stroke="#6b7280"
                  />
                  <YAxis
                    tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                    stroke="#6b7280"
                  />
                  <Tooltip
                    formatter={(value: number) => currency.format(value)}
                    labelFormatter={(label) => `Mês ${label}`}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #22C55E",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#22C55E"
                    strokeWidth={2}
                    name="Saldo disponível"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="withdrawn"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Total pago em parcelas"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-[#22C55E]"></div>
                <span>Saldo: dinheiro que ainda está investido</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-[#ef4444]"></div>
                <span>Pago: total já usado para pagar parcelas</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-2">
        <p className="text-sm text-muted-foreground">
          Este cálculo considera parcelas mensais começando somente no segundo mês.
        </p>
        {(selicTrend !== 'stable' || safetyMargin) && (
          <p className="text-xs text-primary font-medium">
            {selicTrend === 'falling' && '📉 Considerando queda gradual da taxa de juros. '}
            {selicTrend === 'rising' && '📈 Considerando aumento gradual da taxa de juros. '}
            {safetyMargin && '🛡️ Taxa de rendimento reduzida em 5% para margem de segurança.'}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
