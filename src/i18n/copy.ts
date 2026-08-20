import type { Lang } from '../domain/types';

export interface Copy {
  title: string;
  subtitle: string;
  vehiclePrice: string;
  downPayment: string;
  rate: string;
  rateHint: string;
  installments: string;
  installmentsUnit: string;
  calculate: string;
  results: string;
  monthlyPayment: string;
  totalFinanced: string;
  totalInterest: string;
  totalPaid: string;
  effectiveRate: string;
  principal: string;
  interest: string;
  empty: string;
  errors: {
    required: string;
    downGteVehicle: string;
    ratePositive: string;
    installmentsRange: string;
  };
}

export const COPY: Record<Lang, Copy> = {
  en: {
    title: 'FinAuto',
    subtitle: 'Car financing calculator',
    vehiclePrice: 'Vehicle price',
    downPayment: 'Down payment',
    rate: 'Interest rate',
    rateHint: '%/month',
    installments: 'Installments',
    installmentsUnit: 'months',
    calculate: 'Calculate',
    results: 'Results',
    monthlyPayment: 'Monthly payment',
    totalFinanced: 'Total financed',
    totalInterest: 'Total interest',
    totalPaid: 'Total paid',
    effectiveRate: 'Effective annual rate (CET approx.)',
    principal: 'Principal',
    interest: 'Interest',
    empty: 'Fill in the form and press Calculate to see your results.',
    errors: {
      required: 'Required',
      downGteVehicle: 'Must be less than vehicle price',
      ratePositive: 'Must be greater than 0',
      installmentsRange: 'Enter 1–96 installments',
    },
  },
  pt: {
    title: 'FinAuto',
    subtitle: 'Calculadora de financiamento',
    vehiclePrice: 'Valor do veículo',
    downPayment: 'Valor de entrada',
    rate: 'Taxa de juros',
    rateHint: '%/mês',
    installments: 'Parcelas',
    installmentsUnit: 'meses',
    calculate: 'Calcular',
    results: 'Resultado',
    monthlyPayment: 'Valor da parcela',
    totalFinanced: 'Total financiado',
    totalInterest: 'Total de juros',
    totalPaid: 'Total pago',
    effectiveRate: 'Taxa efetiva anual (CET aprox.)',
    principal: 'Principal',
    interest: 'Juros',
    empty: 'Preencha o formulário e clique em Calcular para ver o resultado.',
    errors: {
      required: 'Obrigatório',
      downGteVehicle: 'Deve ser menor que o valor do veículo',
      ratePositive: 'Deve ser maior que 0',
      installmentsRange: 'Informe de 1 a 96 parcelas',
    },
  },
};
