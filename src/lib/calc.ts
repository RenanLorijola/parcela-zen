export type CalcInput = {
  total: number; // total price to pay
  installments: number; // number of installments
  annualRate?: number; // annual nominal rate (e.g., 0.06 for 6%)
  selicTrend?: 'stable' | 'falling' | 'rising'; // tendência da Selic
  safetyMargin?: boolean; // margem de segurança de 5%
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
}: CalcInput) {
  if (installments <= 0 || total <= 0) return 0;
  
  const installmentValue = total / installments;
  
  let totalPV = 0;
  
  // Para cada parcela, calculamos quanto precisamos investir hoje
  // considerando o IR sobre o rendimento e a variação da Selic
  for (let i = 0; i < installments; i++) {
    // Parcela i+1 será paga no mês (i+1) + 1 (delay do IOF)
    const monthsUntilPayment = i + 2; // +2 porque começa no mês 2
    const daysUntilPayment = monthsUntilPayment * 30;
    
    // Calcula a taxa ajustada pela tendência da Selic
    // Queda/aumento de 0.25% a cada 90 dias (3 meses)
    let adjustedAnnualRate = annualRate;
    if (selicTrend === 'falling') {
      const quarters = Math.floor(monthsUntilPayment / 3);
      adjustedAnnualRate = Math.max(0, annualRate - (quarters * 0.0025));
    } else if (selicTrend === 'rising') {
      const quarters = Math.floor(monthsUntilPayment / 3);
      adjustedAnnualRate = annualRate + (quarters * 0.0025);
    }
    
    const monthlyRate = adjustedAnnualRate / 12;
    
    // Taxa de IR aplicável para este prazo
    const irRate = getIRRate(daysUntilPayment);
    
    // Valor futuro bruto que precisamos ter (a parcela)
    const futureValue = installmentValue;
    
    // Calculamos o valor presente necessário considerando IR
    // FV = PV * (1 + r)^n
    // Mas o rendimento será: (FV - PV)
    // IR = (FV - PV) * irRate
    // Então: FV = PV * (1 + r)^n - (PV * (1 + r)^n - PV) * irRate
    // FV = PV * (1 + r)^n * (1 - irRate) + PV * irRate
    // FV = PV * [(1 + r)^n * (1 - irRate) + irRate]
    // PV = FV / [(1 + r)^n * (1 - irRate) + irRate]
    
    if (monthlyRate === 0) {
      totalPV += futureValue;
    } else {
      const grossMultiplier = Math.pow(1 + monthlyRate, monthsUntilPayment);
      const netMultiplier = grossMultiplier * (1 - irRate) + irRate;
      const pvForThisInstallment = futureValue / netMultiplier;
      
      totalPV += pvForThisInstallment;
    }
  }
  
  // Aplica margem de segurança de 5% se ativada
  if (safetyMargin) {
    totalPV *= 1.05;
  }
  
  return totalPV;
}

export default presentValueOfInstallments;
