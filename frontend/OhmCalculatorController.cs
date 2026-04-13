using ElectronicSystem.Application.DTOs.OhmCalculator;
using ElectronicSystem.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace ElectronicSystem.Api.Controllers;

[ApiController]
[Route("api/ohm-calculator")]
public class OhmCalculatorController : ControllerBase
{
    private readonly IOhmCalculatorService _calculatorService;

    public OhmCalculatorController(IOhmCalculatorService calculatorService)
    {
        _calculatorService = calculatorService;
    }

    [HttpPost("calculate")]
    public async Task<IActionResult> Calculate([FromBody] OhmCalculationRequest request)
    {
        try
        {
            var result = await _calculatorService.CalculateAsync(request);
            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Ocurrió un error inesperado al procesar el cálculo." });
        }
    }
}
