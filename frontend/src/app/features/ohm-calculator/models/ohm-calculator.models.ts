export interface OhmCalculationRequest {
  voltage: string | null;
  current: string | null;
  resistance: string | null;
  power: string | null;
}

export interface LedCalculationRequest {
  sourceVoltage: string | null;
  ledForwardVoltage: string | null;
  ledForwardCurrent: string | null;
}

export interface OhmCalculationResponse {
  voltage: number;
  current: number;
  resistance: number;
  power: number;
  formulaApplied: string;
  safetyAdvice: string;
  componentRecommendation: string;
}
