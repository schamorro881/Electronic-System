namespace ElectronicSystem.Application.Services;

using System;
using System.Threading.Tasks;
using ElectronicSystem.Application.DTOs.OhmCalculator;

public interface IOhmCalculatorService
{
    Task<OhmCalculationResponse> CalculateAsync(OhmCalculationRequest request);
    Task<OhmCalculationResponse> CalculateLedAsync(LedCalculationRequest request);
}

public class OhmCalculatorService : IOhmCalculatorService
{
    public Task<OhmCalculationResponse> CalculateAsync(OhmCalculationRequest request)
    {
        var response = new OhmCalculationResponse();

        double? vParsed = ElectronicSystem.Application.Utils.UnitParser.Parse(request.Voltage);
        double? iParsed = ElectronicSystem.Application.Utils.UnitParser.Parse(request.Current);
        double? rParsed = ElectronicSystem.Application.Utils.UnitParser.Parse(request.Resistance);
        double? pParsed = ElectronicSystem.Application.Utils.UnitParser.Parse(request.Power);

        double? v = vParsed, i = iParsed, r = rParsed, p = pParsed;

        int presentCount = (v.HasValue ? 1 : 0) + (i.HasValue ? 1 : 0) + 
                           (r.HasValue ? 1 : 0) + (p.HasValue ? 1 : 0);

        if (presentCount != 2)
        {
            throw new ArgumentException("Debe proporcionar exactamente dos parámetros para realizar el cálculo.");
        }

        // Combinations
        if (v.HasValue && i.HasValue)
        {
            if (i.Value == 0) throw new ArgumentException("La corriente no puede ser cero.");
            r = v.Value / i.Value;
            p = v.Value * i.Value;
            response.FormulaApplied = "R = V / I | P = V × I";
        }
        else if (v.HasValue && r.HasValue)
        {
            if (r.Value == 0) throw new ArgumentException("La resistencia no puede ser cero.");
            i = v.Value / r.Value;
            p = Math.Pow(v.Value, 2) / r.Value;
            response.FormulaApplied = "I = V / R | P = V² / R";
        }
        else if (v.HasValue && p.HasValue)
        {
            if (v.Value == 0) throw new ArgumentException("El voltaje no puede ser cero.");
            i = p.Value / v.Value;
            r = Math.Pow(v.Value, 2) / p.Value;
            response.FormulaApplied = "I = P / V | R = V² / P";
        }
        else if (i.HasValue && r.HasValue)
        {
            v = i.Value * r.Value;
            p = Math.Pow(i.Value, 2) * r.Value;
            response.FormulaApplied = "V = I × R | P = I² × R";
        }
        else if (i.HasValue && p.HasValue)
        {
            if (i.Value == 0) throw new ArgumentException("La corriente no puede ser cero.");
            v = p.Value / i.Value;
            r = p.Value / Math.Pow(i.Value, 2);
            response.FormulaApplied = "V = P / I | R = P / I²";
        }
        else if (r.HasValue && p.HasValue)
        {
            if (r.Value == 0) throw new ArgumentException("La resistencia no puede ser cero.");
            v = Math.Sqrt(p.Value * r.Value);
            i = Math.Sqrt(p.Value / r.Value);
            response.FormulaApplied = "V = √(P × R) | I = √(P / R)";
        }

        response.Voltage = v!.Value;
        response.Current = i!.Value;
        response.Resistance = r!.Value;
        response.Power = p!.Value;

        ApplySafetyHeuristics(response, vParsed.HasValue, iParsed.HasValue, rParsed.HasValue);

        return Task.FromResult(response);
    }

    public Task<OhmCalculationResponse> CalculateLedAsync(LedCalculationRequest request)
    {
        double vs = ElectronicSystem.Application.Utils.UnitParser.Parse(request.SourceVoltage) ?? 0;
        double vf = ElectronicSystem.Application.Utils.UnitParser.Parse(request.LedForwardVoltage) ?? 0;
        double @if = ElectronicSystem.Application.Utils.UnitParser.Parse(request.LedForwardCurrent) ?? 0;

        if (@if <= 0) throw new ArgumentException("La corriente del LED debe ser mayor a cero.");
        if (vs <= vf) throw new ArgumentException("El voltaje de fuente debe ser mayor al voltaje del LED.");

        double r = (vs - vf) / @if;
        double p = (vs - vf) * @if;

        var response = new OhmCalculationResponse
        {
            Voltage = vs - vf,
            Current = @if,
            Resistance = r,
            Power = p,
            FormulaApplied = "R = (V_fuente - V_led) / I_led"
        };

        ApplySafetyHeuristics(response, true, true, false); // Vs y Vf son voltajes, If es corriente
        return Task.FromResult(response);
    }

    private static void ApplySafetyHeuristics(OhmCalculationResponse res, bool hadV, bool hadI, bool hadR)
    {
        string pFormatted = res.Power.ToString("F3");
        double targetSafePower = 0.25; 
        
        if (res.Power < 0.125)
        {
            res.SafetyAdvice = $"Disipación segura ({pFormatted}W). Compatible con componentes SMD estándar.";
            res.ComponentRecommendation = "Resistencia estándar (1/8W o 1/4W)";
        }
        else if (res.Power < 0.25)
        {
            res.SafetyAdvice = $"Carga optimizada ({pFormatted}W). Operando al {(res.Power / 0.25 * 100):F0}% de un componente de 1/4W.";
            res.ComponentRecommendation = "Resistencia de 1/4W (Carbono/Metal)";
        }
        else
        {
            string optimizationAdvice = "";
            
            if (res.Power > targetSafePower) {
                // Sugerencias basadas en qué introdujo el usuario
                if (hadV && hadI) {
                    optimizationAdvice = $" [TIP]: Reduce Voltaje a {(targetSafePower/res.Current):F2}V o Corriente a {(targetSafePower/res.Voltage):F3}A.";
                } else if (hadV && hadR) {
                    optimizationAdvice = $" [TIP]: Reduce Voltaje a {Math.Sqrt(targetSafePower * res.Resistance):F2}V o aumenta Resistencia a {(Math.Pow(res.Voltage, 2)/targetSafePower):F1}Ω.";
                } else if (hadI && hadR) {
                    optimizationAdvice = $" [TIP]: Reduce Corriente a {Math.Sqrt(targetSafePower / res.Resistance):F3}A o reduce Resistencia a {(targetSafePower/Math.Pow(res.Current, 2)):F1}Ω.";
                }
            }

            if (res.Power < 0.5)
            {
                res.SafetyAdvice = $"Calentamiento notable ({pFormatted}W). Supera el límite de 1/4W.{optimizationAdvice}";
                res.ComponentRecommendation = "Resistencia de 1/2W";
            }
            else if (res.Power < 2)
            {
                double safeWattage = Math.Ceiling(res.Power * 2);
                res.SafetyAdvice = $"ALTA POTENCIA ({pFormatted}W). El componente quemará al tacto.{optimizationAdvice}";
                res.ComponentRecommendation = $"Resistencia de {safeWattage}W (Cerámica)";
            }
            else
            {
                double safeWattage = Math.Ceiling(res.Power * 1.5);
                res.SafetyAdvice = $"RIESGO TÉRMICO CRÍTICO ({pFormatted}W).{optimizationAdvice}";
                res.ComponentRecommendation = $"Resistencia de Potencia ({safeWattage}W+) + Disipador";
            }
        }

        if (res.Current > 5)
        {
            res.SafetyAdvice += " [AVISO]: Corriente > 5A requiere cables AWG 16+ para evitar incendios.";
        }
    }
}
