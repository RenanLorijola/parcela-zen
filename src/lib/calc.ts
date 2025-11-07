export type CalcInput = {
  total: number; // total price to pay
  installments: number; // number of installments
  annualRate?: number; // annual nominal rate (e.g., 0.06 for 6%)
  selicTrend?: 'stable' | 'falling' | 'rising'; // tendência da Selic
  safetyMargin?: boolean; // margem de segurança de 5%
  exemptIR?: boolean; // isento de IR (LCI/LCA)
};

/**
 * Retorna a alíquota de IR aplicável baseada nos dias de aplicação
 * Tabela regressiva de IR para renda fixa:
 * - Até 180 dias: 22.5%
 * - De 181 a 360 dias: 20%
 * - De 361 a 720 dias: 17.5%
 * - Acima de 720 dias: 15%
 */
function getIRRate(days: number): number {
  if (days <= 180) return 0.225;
  if (days <= 360) return 0.20;
  if (days <= 720) return 0.175;
  return 0.15;
}

/**
 * Calculate the present lump-sum amount you need to save today so that,
 * after investing it at a given annual return (considering IR tax), you can 
 * pay the installments as they come due.
 *
 * Assumptions:
 * - Installments are paid monthly starting TWO months from now (to avoid IOF)
 * - Returns compound monthly
 * - IR tax is applied on each withdrawal based on the investment period
 * - Each installment is withdrawn from a separate investment made today
 * - Optional: Selic trend (falling 0.25% every 3 months or rising 0.25% every 3 months)
 * - Optional: Safety margin of 5% for unexpected rate drops
 */
export function presentValueOfInstallments({
  total,
  installments,
  annualRate = 0.06,
  selicTrend = 'stable',
  safetyMargin = false,
  exemptIR = false,
}: CalcInput) {
  if (installments <= 0 || total <= 0) return 0;
  
  const installmentValue = total / installments;
  
  // Aplica margem de segurança reduzindo a taxa de rendimento em 5%
  let baseAnnualRate = annualRate;
  if (safetyMargin) {
    baseAnnualRate = annualRate * 0.95; // Reduz 5% da taxa
  }
  
  let totalPV = 0;
  
  // Para cada parcela, calculamos quanto precisamos investir hoje
  // considerando o IR sobre o rendimento e a variação da Selic
  for (let i = 0; i < installments; i++) {
    // Parcela i+1 será paga no mês (i+1) + 1 (delay do IOF)
    const monthsUntilPayment = i + 2; // +2 porque começa no mês 2
    const daysUntilPayment = monthsUntilPayment * 30;
    
    // Calcula a taxa ajustada pela tendência da Selic
    // Queda/aumento de 0.25% a cada 90 dias (3 meses)
    let adjustedAnnualRate = baseAnnualRate;
    if (selicTrend === 'falling') {
      const quarters = Math.floor(monthsUntilPayment / 3);
      adjustedAnnualRate = Math.max(0, baseAnnualRate - (quarters * 0.0025));
    } else if (selicTrend === 'rising') {
      const quarters = Math.floor(monthsUntilPayment / 3);
      adjustedAnnualRate = baseAnnualRate + (quarters * 0.0025);
    }
    
    const monthlyRate = adjustedAnnualRate / 12;
    
    // Taxa de IR aplicável para este prazo (0 se isento de IR)
    const irRate = exemptIR ? 0 : getIRRate(daysUntilPayment);
    
    // Valor futuro bruto que precisamos ter (a parcela)
    const futureValue = installmentValue;
    
    // Calculamos o valor presente necessário considerando IR
    // Se investimos PV hoje:
    // - Após n meses teremos: PV * (1 + r)^n (valor bruto)
    // - Rendimento bruto: PV * (1 + r)^n - PV
    // - IR sobre rendimento: [PV * (1 + r)^n - PV] * irRate
    // - Valor líquido disponível: PV * (1 + r)^n - [PV * (1 + r)^n - PV] * irRate
    // 
    // Simplificando:
    // Líquido = PV * (1 + r)^n - PV * (1 + r)^n * irRate + PV * irRate
    // Líquido = PV * (1 + r)^n * (1 - irRate) + PV * irRate
    // Líquido = PV * [(1 + r)^n - (1 + r)^n * irRate + irRate]
    // Líquido = PV * [(1 + r)^n * (1 - irRate) + irRate]
    //
    // Queremos que Líquido = FV, então:
    // FV = PV * [(1 + r)^n * (1 - irRate) + irRate]
    // PV = FV / [(1 + r)^n * (1 - irRate) + irRate]
    
    if (monthlyRate === 0) {
      totalPV += futureValue;
    } else {
      const grossMultiplier = Math.pow(1 + monthlyRate, monthsUntilPayment);
      // Valor líquido após rendimento e IR
      const netMultiplier = grossMultiplier * (1 - irRate) + irRate;
      const pvForThisInstallment = futureValue / netMultiplier;
      
      totalPV += pvForThisInstallment;
    }
  }
  
  return totalPV;
}

export type ChartDataPoint = {
  month: number;
  balance: number;
  invested: number;
  withdrawn: number;
};

/**
 * Gera dados para o gráfico mostrando a evolução do saldo ao longo do tempo
 */
export function generateChartData({
  total,
  installments,
  annualRate = 0.06,
  selicTrend = 'stable',
  exemptIR = false,
}: Omit<CalcInput, 'safetyMargin'>): ChartDataPoint[] {
  if (installments <= 0 || total <= 0) return [];
  
  const installmentValue = total / installments;
  const data: ChartDataPoint[] = [];
  
  // Calcula o valor presente necessário para cada parcela
  let totalPV = 0;
  const pvPerInstallment: number[] = [];
  
  for (let i = 0; i < installments; i++) {
    const monthsUntilPayment = i + 2;
    const daysUntilPayment = monthsUntilPayment * 30;
    
    let adjustedAnnualRate = annualRate;
    if (selicTrend === 'falling') {
      const quarters = Math.floor(monthsUntilPayment / 3);
      adjustedAnnualRate = Math.max(0, annualRate - (quarters * 0.0025));
    } else if (selicTrend === 'rising') {
      const quarters = Math.floor(monthsUntilPayment / 3);
      adjustedAnnualRate = annualRate + (quarters * 0.0025);
    }
    
    const monthlyRate = adjustedAnnualRate / 12;
    const irRate = exemptIR ? 0 : getIRRate(daysUntilPayment);
    
    let pvForThisInstallment: number;
    if (monthlyRate === 0) {
      pvForThisInstallment = installmentValue;
    } else {
      const grossMultiplier = Math.pow(1 + monthlyRate, monthsUntilPayment);
      const netMultiplier = grossMultiplier * (1 - irRate) + irRate;
      pvForThisInstallment = installmentValue / netMultiplier;
    }
    
    pvPerInstallment.push(pvForThisInstallment);
    totalPV += pvForThisInstallment;
  }
  
  // Simula a evolução mês a mês
  let currentBalance = totalPV;
  const monthlyRate = annualRate / 12;
  
  // Mês 0: investimento inicial
  data.push({
    month: 0,
    balance: currentBalance,
    invested: totalPV,
    withdrawn: 0,
  });
  
  // Mês 1: primeiro mês, só rende
  let adjustedMonthlyRate = monthlyRate;
  if (selicTrend === 'falling') {
    const quarters = Math.floor(1 / 3);
    adjustedMonthlyRate = Math.max(0, monthlyRate - (quarters * 0.0025 / 12));
  } else if (selicTrend === 'rising') {
    const quarters = Math.floor(1 / 3);
    adjustedMonthlyRate = monthlyRate + (quarters * 0.0025 / 12);
  }
  
  const earnings1 = currentBalance * adjustedMonthlyRate;
  const daysInvested1 = 30;
  const irRate1 = exemptIR ? 0 : getIRRate(daysInvested1);
  const netEarnings1 = earnings1 * (1 - irRate1);
  currentBalance += netEarnings1;
  
  data.push({
    month: 1,
    balance: currentBalance,
    invested: totalPV,
    withdrawn: 0,
  });
  
  // Meses 2+: rende e paga parcelas
  for (let month = 2; month <= installments + 1; month++) {
    const installmentIndex = month - 2;
    
    // Ajusta taxa pela tendência
    let currentMonthlyRate = monthlyRate;
    if (selicTrend === 'falling') {
      const quarters = Math.floor(month / 3);
      currentMonthlyRate = Math.max(0, monthlyRate - (quarters * 0.0025 / 12));
    } else if (selicTrend === 'rising') {
      const quarters = Math.floor(month / 3);
      currentMonthlyRate = monthlyRate + (quarters * 0.0025 / 12);
    }
    
    // Rendimento do mês
    const earnings = currentBalance * currentMonthlyRate;
    const daysInvested = month * 30;
    const irRate = exemptIR ? 0 : getIRRate(daysInvested);
    const netEarnings = earnings * (1 - irRate);
    currentBalance += netEarnings;
    
    // Paga parcela
    if (installmentIndex < installments) {
      currentBalance -= installmentValue;
      
      data.push({
        month,
        balance: Math.max(0, currentBalance),
        invested: totalPV,
        withdrawn: (installmentIndex + 1) * installmentValue,
      });
    }
  }
  
  return data;
}

export default presentValueOfInstallments;
