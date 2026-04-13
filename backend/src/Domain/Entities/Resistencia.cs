using ElectronicSystem.Domain.Enums;

namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Resistencia con información de bandas de color y tolerancia.
/// </summary>
public class Resistencia : BaseEntity
{
    // Bandas de color (4 o 5 bandas)
    public BandaColor Banda1 { get; set; }
    public BandaColor Banda2 { get; set; }
    public BandaColor? Banda3 { get; set; }    // Solo en resistencias de 5 bandas
    public BandaColor Multiplicador { get; set; }
    public BandaColor Tolerancia { get; set; }

    // Valor calculado
    public double ValorOhms { get; set; }
    public string ToleranciaTexto { get; set; } = string.Empty;   // "±5%", "±1%", etc.
    public string ValorFormateado { get; set; } = string.Empty;   // "10 kΩ", "4.7 MΩ", etc.

    // Metadatos
    public string Descripcion { get; set; } = string.Empty;
    public string? CodigoParte { get; set; }
}
