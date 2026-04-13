using ElectronicSystem.Application.DTOs.Resistencia;
using ElectronicSystem.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ElectronicSystem.Api.Controllers;

/// <summary>
/// Endpoints para resistencias: CRUD y búsqueda por bandas de color.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
public sealed class ResistenciasController(IResistenciaService resistenciaService) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<ResistenciaResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<ResistenciaResponse>>> GetAll(CancellationToken ct)
    {
        var result = await resistenciaService.GetAllAsync(ct);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ResistenciaResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ResistenciaResponse>> GetById(int id, CancellationToken ct)
    {
        var result = await resistenciaService.GetByIdAsync(id, ct);
        return result is null ? NotFound() : Ok(result);
    }

    /// <summary>
    /// Busca resistencias por sus bandas de color (valores enteros según el enum BandaColor).
    /// </summary>
    [HttpGet("search")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<ResistenciaResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<ResistenciaResponse>>> SearchByColor(
        [FromQuery] int banda1,
        [FromQuery] int banda2,
        [FromQuery] int multiplicador,
        CancellationToken ct)
    {
        var result = await resistenciaService.SearchByColorAsync(banda1, banda2, multiplicador, ct);
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ResistenciaResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ResistenciaResponse>> Create(
        [FromBody] CreateResistenciaRequest request,
        CancellationToken ct)
    {
        var result = await resistenciaService.CreateAsync(request, ct);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        await resistenciaService.DeleteAsync(id, ct);
        return NoContent();
    }
}
