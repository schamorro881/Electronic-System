namespace ElectronicSystem.Application.Services;

using System;
using System.Threading.Tasks;
using ElectronicSystem.Application.DTOs.OhmCalculator;

public interface IOhmCalculatorService
{
    Task<OhmCalculationResponse> CalculateAsync(OhmCalculationRequest request);
}

public class OhmCalculatorService : IOhmCalculatorService
{
    public Task<OhmCalculationResponse> CalculateAsync(OhmCalculationRequest request)
    {
        var response = new OhmCalculationResponse();

        // Si tenemos V e I, calculamos R y P
        if (request.Voltage.HasValue && request.Current.HasValue)
        {
            if (request.Current.Value == 0) throw new ArgumentException("La corriente no puede ser cero.");
            
            response.Voltage = request.Voltage.Value;
            response.Current = request.Current.Value;
            response.Resistance = request.Voltage.Value / request.Current.Value;
            response.Power = request.Voltage.Value * request.Current.Value;
            response.FormulaApplied = "R = V / I";
        }
        // Si tenemos V y R, calculamos I y P
        else if (request.Voltage.HasValue && request.Resistance.HasValue)
        {
            if (request.Resistance.Value == 0) throw new ArgumentException("La resistencia no puede ser cero.");

            response.Voltage = request.Voltage.Value;
            response.Resistance = request.Resistance.Value;
            response.Current = request.Voltage.Value / request.Resistance.Value;
            response.Power = Math.Pow(request.Voltage.Value, 2) / request.Resistance.Value;
            response.FormulaApplied = "I = V / R";
        }
        // Si tenemos I y R, calculamos V y P
        else if (request.Current.HasValue && request.Resistance.HasValue)
        {
            response.Current = request.Current.Value;
            response.Resistance = request.Resistance.Value;
            response.Voltage = request.Current.Value * request.Resistance.Value;
            response.Power = Math.Pow(request.Current.Value, 2) * request.Resistance.Value;
            response.FormulaApplied = "V = I x R";
        }
        else
        {
            throw new ArgumentException("Debe proporcionar exactamente dos parámetros para realizar el cálculo.");
        }

        return Task.FromResult(response);
    }
}
