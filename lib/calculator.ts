/**
 * Motor de Cálculo Financiero y Actuarial Oficial:
 * REINVENTORS PAD (UIDE × Diners Club del Ecuador × Raúl Coka Barriga)
 * 
 * Basado estrictamente en los modelos de:
 * 1. Calculadora_Ahorro_Seguro (version 2).xlsx
 * 2. Propuesta Comercial PAD Agosto 2026.pptx
 * 3. Contrato de Depósito a Plazo Banco Diners Club del Ecuador S.A.
 */

export const TASA_NOMINAL_ANUAL = 0.034; // 3.40% tasa nominal preferencial Diners Club
export const RETENCION_SRI = 0.02; // 2.00% retención fiscal en la fuente sobre rendimientos financieros (SRI Ecuador)
export const SEGURO_RCB_MENSUAL = 25.0; // $25.00 USD/mes fija prima de protección estudiantil Raúl Coka Barriga
export const MAX_CARGO_MENSUAL = 4999.0; // Límite operacional de cargo recurrente mensual a tarjeta Diners Club
export const PLAZO_MINIMO_MESES = 12; // Plazo forzoso contractual mínimo de 12 meses

// Tasa mensual equivalente neta de retención tributaria
export const TASA_MENSUAL_NETA = (TASA_NOMINAL_ANUAL / 12) * (1 - RETENCION_SRI); // 0.0027766667 (0.27767% mensual)

export interface CalculationResult {
  metaAhorro: number;
  childAge: number;
  plazoMeses: number;
  plazoAnos: number;
  aportePad: number;
  seguroRcb: number;
  cuotaTotal: number;
  esfuerzoDiario: number;
  totalAportadoAhorro: number;
  totalSeguro: number;
  interesesBrutos: number;
  retencionTotal: number;
  interesesNetos: number;
  saldoFinal: number;
  sumaAsegurada: number;
  clubMiles: number;
  excedeLimiteBancario: boolean;
}

export interface AmortizationRow {
  mes: number;
  saldoInicial: number;
  aportePad: number;
  saldoAcumulado: number;
  interesMes: number;
  retencionMes: number;
  saldoFinal: number;
  seguroMensual: number;
  cuotaTotalMes: number;
  seguroAcumulado: number;
}

/**
 * Calcula la cuota mensual requerida y desglose financiero a partir de la Meta de Ahorro y Edad del beneficiario.
 */
export function calculatePadQuote(metaAhorro: number, childAge: number): CalculationResult {
  const safeAge = Math.min(16, Math.max(0, childAge));
  const rawMonths = (18 - safeAge) * 12;
  const plazoMeses = Math.max(PLAZO_MINIMO_MESES, rawMonths);
  const plazoAnos = plazoMeses / 12;

  // Fórmula PMT neta para valor futuro (Fondo acumulado al vencimiento)
  // Aporte = (Meta * i_net) / ((1 + i_net)^n - 1)
  const compoundFactor = Math.pow(1 + TASA_MENSUAL_NETA, plazoMeses);
  const aportePad = compoundFactor > 1 
    ? (metaAhorro * TASA_MENSUAL_NETA) / (compoundFactor - 1)
    : metaAhorro / plazoMeses;

  const seguroRcb = SEGURO_RCB_MENSUAL;
  const cuotaTotal = aportePad + seguroRcb;
  const esfuerzoDiario = cuotaTotal / 30;

  const totalAportadoAhorro = aportePad * plazoMeses;
  const totalSeguro = seguroRcb * plazoMeses;

  // Simulación paso a paso para cuadre exacto con tabla de amortización de Excel
  let saldo = 0;
  let totalInteresBruto = 0;
  let totalRetencion = 0;

  for (let m = 1; m <= plazoMeses; m++) {
    const acum = saldo + aportePad;
    const intM = acum * (TASA_NOMINAL_ANUAL / 12);
    const retM = intM * RETENCION_SRI;
    saldo = acum + intM - retM;
    totalInteresBruto += intM;
    totalRetencion += retM;
  }

  const interesesNetos = totalInteresBruto - totalRetencion;
  const sumaAsegurada = metaAhorro;
  const clubMiles = Math.round(totalAportadoAhorro);
  const excedeLimiteBancario = cuotaTotal > MAX_CARGO_MENSUAL;

  return {
    metaAhorro,
    childAge: safeAge,
    plazoMeses,
    plazoAnos,
    aportePad: Math.round(aportePad * 100) / 100,
    seguroRcb,
    cuotaTotal: Math.round(cuotaTotal * 100) / 100,
    esfuerzoDiario: Math.round(esfuerzoDiario * 100) / 100,
    totalAportadoAhorro: Math.round(totalAportadoAhorro * 100) / 100,
    totalSeguro: Math.round(totalSeguro * 100) / 100,
    interesesBrutos: Math.round(totalInteresBruto * 100) / 100,
    retencionTotal: Math.round(totalRetencion * 100) / 100,
    interesesNetos: Math.round(interesesNetos * 100) / 100,
    saldoFinal: Math.round(saldo * 100) / 100,
    sumaAsegurada,
    clubMiles,
    excedeLimiteBancario,
  };
}

/**
 * Calcula el fondo acumulado a partir de un aporte mensual fijo deseado.
 */
export function calculatePadFutureValue(aportePad: number, childAge: number): CalculationResult {
  const safeAge = Math.min(16, Math.max(0, childAge));
  const rawMonths = (18 - safeAge) * 12;
  const plazoMeses = Math.max(PLAZO_MINIMO_MESES, rawMonths);
  const plazoAnos = plazoMeses / 12;

  let saldo = 0;
  let totalInteresBruto = 0;
  let totalRetencion = 0;

  for (let m = 1; m <= plazoMeses; m++) {
    const acum = saldo + aportePad;
    const intM = acum * (TASA_NOMINAL_ANUAL / 12);
    const retM = intM * RETENCION_SRI;
    saldo = acum + intM - retM;
    totalInteresBruto += intM;
    totalRetencion += retM;
  }

  const seguroRcb = SEGURO_RCB_MENSUAL;
  const cuotaTotal = aportePad + seguroRcb;
  const esfuerzoDiario = cuotaTotal / 30;
  const totalAportadoAhorro = aportePad * plazoMeses;
  const totalSeguro = seguroRcb * plazoMeses;
  const interesesNetos = totalInteresBruto - totalRetencion;
  const metaAhorro = Math.round(saldo);
  const sumaAsegurada = metaAhorro;
  const clubMiles = Math.round(totalAportadoAhorro);
  const excedeLimiteBancario = cuotaTotal > MAX_CARGO_MENSUAL;

  return {
    metaAhorro,
    childAge: safeAge,
    plazoMeses,
    plazoAnos,
    aportePad: Math.round(aportePad * 100) / 100,
    seguroRcb,
    cuotaTotal: Math.round(cuotaTotal * 100) / 100,
    esfuerzoDiario: Math.round(esfuerzoDiario * 100) / 100,
    totalAportadoAhorro: Math.round(totalAportadoAhorro * 100) / 100,
    totalSeguro: Math.round(totalSeguro * 100) / 100,
    interesesBrutos: Math.round(totalInteresBruto * 100) / 100,
    retencionTotal: Math.round(totalRetencion * 100) / 100,
    interesesNetos: Math.round(interesesNetos * 100) / 100,
    saldoFinal: Math.round(saldo * 100) / 100,
    sumaAsegurada,
    clubMiles,
    excedeLimiteBancario,
  };
}

/**
 * Genera la tabla de amortización idéntica a la hoja 'Amortización' del Excel oficial.
 * Por optimización de renderizado, permite limitar las filas devueltas (o devolver hitos clave).
 */
export function generateAmortizationSchedule(
  metaAhorro: number,
  childAge: number,
  limitRows: number = 12
): { rows: AmortizationRow[]; totalRows: number } {
  const result = calculatePadQuote(metaAhorro, childAge);
  const rows: AmortizationRow[] = [];
  let saldoInicial = 0;

  for (let m = 1; m <= result.plazoMeses; m++) {
    const saldoAcumulado = saldoInicial + result.aportePad;
    const interesMes = saldoAcumulado * (TASA_NOMINAL_ANUAL / 12);
    const retencionMes = interesMes * RETENCION_SRI;
    const saldoFinal = saldoAcumulado + interesMes - retencionMes;
    const seguroAcumulado = SEGURO_RCB_MENSUAL * m;

    if (m <= limitRows || m === result.plazoMeses || m % 12 === 0) {
      rows.push({
        mes: m,
        saldoInicial: Math.round(saldoInicial * 100) / 100,
        aportePad: result.aportePad,
        saldoAcumulado: Math.round(saldoAcumulado * 100) / 100,
        interesMes: Math.round(interesMes * 100) / 100,
        retencionMes: Math.round(retencionMes * 100) / 100,
        saldoFinal: Math.round(saldoFinal * 100) / 100,
        seguroMensual: SEGURO_RCB_MENSUAL,
        cuotaTotalMes: result.cuotaTotal,
        seguroAcumulado: Math.round(seguroAcumulado * 100) / 100,
      });
    }

    saldoInicial = saldoFinal;
  }

  return { rows, totalRows: result.plazoMeses };
}
