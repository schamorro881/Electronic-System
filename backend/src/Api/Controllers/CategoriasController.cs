using ElectronicSystem.Application.DTOs.Categoria;
using ElectronicSystem.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ElectronicSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public sealed class CategoriasController(ICategoriaService categoriaService) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<CategoriaResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<CategoriaResponse>>> GetAll(CancellationToken ct)
    {
        var result = await categoriaService.GetAllAsync(ct);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(CategoriaResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CategoriaResponse>> GetById(int id, CancellationToken ct)
    {
        var result = await categoriaService.GetByIdAsync(id, ct);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(CategoriaResponse), StatusCodes.Status201Created)]
    public async Task<ActionResult<CategoriaResponse>> Create(
        [FromBody] CreateCategoriaRequest request,
        CancellationToken ct)
    {
        var result = await categoriaService.CreateAsync(request, ct);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(CategoriaResponse), StatusCodes.Status200OK)]
    public async Task<ActionResult<CategoriaResponse>> Update(
        int id,
        [FromBody] UpdateCategoriaRequest request,
        CancellationToken ct)
    {
        var result = await categoriaService.UpdateAsync(id, request, ct);
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        await categoriaService.DeleteAsync(id, ct);
        return NoContent();
    }
}
