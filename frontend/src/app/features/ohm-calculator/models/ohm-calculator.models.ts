export interface OhmCalculationRequest {
  voltage: number | null;
  current: number | null;
  resistance: number | null;
}

export interface OhmCalculationResponse {
  voltage: number;
  current: number;
  resistance: number;
  power: number;
  formulaApplied: string;
}
