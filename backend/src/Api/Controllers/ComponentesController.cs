using ElectronicSystem.Application.DTOs.Componente;
using ElectronicSystem.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ElectronicSystem.Api.Controllers;

/// <summary>
/// CRUD de Componentes electrónicos.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
public sealed class ComponentesController(IComponenteService componenteService) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<ComponenteResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<ComponenteResponse>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] int? categoriaId,
        CancellationToken ct)
    {
        var result = string.IsNullOrWhiteSpace(search)
            ? await componenteService.GetAllAsync(ct)
            : await componenteService.SearchAsync(search, categoriaId, ct);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ComponenteResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ComponenteResponse>> GetById(int id, CancellationToken ct)
    {
        var result = await componenteService.GetByIdAsync(id, ct);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ComponenteResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ComponenteResponse>> Create(
        [FromBody] CreateComponenteRequest request,
        CancellationToken ct)
    {
        var result = await componenteService.CreateAsync(request, ct);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ComponenteResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ComponenteResponse>> Update(
        int id,
        [FromBody] UpdateComponenteRequest request,
        CancellationToken ct)
    {
        var result = await componenteService.UpdateAsync(id, request, ct);
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        await componenteService.DeleteAsync(id, ct);
        return NoContent();
    }
}
