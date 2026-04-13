namespace ElectronicSystem.Application.DTOs.Resistencia;

public record ResistenciaResponse(
    int Id,
    double ValorOhms,
    string ToleranciaTexto,
    string ValorFormateado
);

public record CreateResistenciaRequest(
    double ValorOhms,
    string ToleranciaTexto
);
