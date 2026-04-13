using ElectronicSystem.Application.DTOs.OhmCalculator;
using ElectronicSystem.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ElectronicSystem.Api.Controllers;

/// <summary>
/// Endpoints para cálculos de la Ley de Ohm.
/// </summary>
[ApiController]
[Route("api/ohm-calculator")]
[AllowAnonymous]
public sealed class OhmCalculatorController(IOhmCalculatorService ohmCalculatorService) : ControllerBase
{
    [HttpPost("calculate")]
    [ProducesResponseType(typeof(OhmCalculationResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<OhmCalculationResponse>> Calculate([FromBody] OhmCalculationRequest request)
    {
        try
        {
            var result = await ohmCalculatorService.CalculateAsync(request);
            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error interno al realizar el cálculo.", details = ex.Message });
        }
    }
}
