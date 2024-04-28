import { Document } from "mongoose";

// Interfaz para representar un método de pago aceptado por el local
export interface IPaymentMethod extends Document {
  name: string; // Nombre del método de pago
  description: string; // Descripción del método de pago
}

/*

*** DESPUES SE IMPLEMENTARA MEJOR LOS METODOS DE PAGO ***


// Interfaz para representar un método de pago aceptado por el local
export interface IPaymentMethod extends Document {
  name: string; // Nombre del método de pago
  description: string; // Descripción del método de pago
  icon: string; // Icono del método de pago (por ejemplo, URL o nombre de icono)
  isEnabled: boolean; // Indica si el método de pago está habilitado o no
  feePercentage: number; // Porcentaje de comisión por usar este método de pago
  minAmount: number; // Monto mínimo permitido para este método de pago
  maxAmount: number; // Monto máximo permitido para este método de pago
  allowsInstallments: boolean; // Indica si el método de pago permite pagar en cuotas
  installmentPlans?: InstallmentPlan[]; // Planes de cuotas disponibles (si aplica)
  hasOffers: boolean; // Indica si el método de pago tiene ofertas disponibles
  offers?: Offer[]; // Ofertas disponibles (si aplica)
  hasDiscounts: boolean; // Indica si el método de pago tiene descuentos disponibles
  discounts?: Discount[]; // Descuentos disponibles (si aplica)
}

// Interfaz para representar un plan de cuotas
interface InstallmentPlan {
  months: number; // Número de cuotas
  interestRate: number; // Tasa de interés para las cuotas
}

// Interfaz para representar una oferta
interface Offer {
  title: string; // Título de la oferta
  description: string; // Descripción de la oferta
  discountPercentage: number; // Porcentaje de descuento de la oferta
}

// Interfaz para representar un descuento
interface Discount {
  code: string; // Código del descuento
  description: string; // Descripción del descuento
  amount: number; // Monto del descuento
}*/