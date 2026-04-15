using ElectronicSystem.Application.DTOs.Resistencia;
using ElectronicSystem.Domain.Interfaces;

namespace ElectronicSystem.Application.Services;

/// <summary>
/// Implementación stub de IResistenciaService.
/// </summary>
public sealed class ResistenciaService(IResistenciaRepository repository) : IResistenciaService
{
    public Task<IEnumerable<ResistenciaResponse>> GetAllAsync(CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<ResistenciaResponse?> GetByIdAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<IEnumerable<ResistenciaResponse>> SearchByColorAsync(int banda1, int banda2, int multiplicador, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<ResistenciaResponse> CreateAsync(CreateResistenciaRequest request, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task DeleteAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<ColorCodeCalculationResponse> CalculateColorCodeAsync(ColorCodeCalculationRequest request, CancellationToken ct = default)
    {
        int digit1 = GetDigitValue(request.Band1Hex);
        int digit2 = GetDigitValue(request.Band2Hex);
        double multiplier = GetMultiplierValue(request.MultiplierHex);
        double tolerance = GetToleranceValue(request.ToleranceHex);

        double resistanceValue;
        if (request.BandCount == 4)
        {
            resistanceValue = (digit1 * 10 + digit2) * multiplier;
        }
        else
        {
            int digit3 = GetDigitValue(request.Band3Hex);
            resistanceValue = (digit1 * 100 + digit2 * 10 + digit3) * multiplier;
        }

        string formattedResistance = FormatResistance(resistanceValue);
        string formattedTolerance = $"±{tolerance}%";

        string mainValueDisplay = $"{resistanceValue.ToString("#,##0.##", new System.Globalization.CultureInfo("en-US"))} Ω";
        string extraValueDisplay = $"{formattedResistance} {formattedTolerance}";

        double minRange = resistanceValue * (1 - tolerance / 100.0);
        double maxRange = resistanceValue * (1 + tolerance / 100.0);
        string minRangeDisplay = FormatResistance(minRange);
        string maxRangeDisplay = FormatResistance(maxRange);

        var recommendedUses = GetRecommendedUses(resistanceValue);

        var response = new ColorCodeCalculationResponse
        {
            ResistanceValue = resistanceValue,
            FormattedResistance = formattedResistance,
            FormattedTolerance = formattedTolerance,
            MainValueDisplay = mainValueDisplay,
            ExtraValueDisplay = extraValueDisplay,
            MinRangeDisplay = minRangeDisplay,
            MaxRangeDisplay = maxRangeDisplay,
            RecommendedUses = recommendedUses
        };

        return Task.FromResult(response);
    }

    private static List<string> GetRecommendedUses(double ohms)
    {
        var uses = new List<string>();

        if (ohms < 10)
        {
            uses.Add("🔌 Shunt de sensor de corriente");
            uses.Add("🔥 Fusible resistivo");
            uses.Add("⚙️ Carga de baja impedancia");
        }
        else if (ohms >= 10 && ohms < 330)
        {
            uses.Add("💡 Limitador de corriente para LED");
            uses.Add("🛡️ Terminación de líneas de datos");
            uses.Add("🔊 Divisor de audio genérico");
        }
        else if (ohms >= 330 && ohms < 1000)
        {
            uses.Add("💡 LEDs de alta tensión");
            uses.Add("⚡ Protección base de transistores (BJT)");
            uses.Add("📡 Acoplamiento de señal de bus");
        }
        else if (ohms >= 1000 && ohms < 10000)
        {
            uses.Add("⚡ Pull-up / Pull-down I2C/SPI");
            uses.Add("🎚️ Divisor de tensión general");
            uses.Add("📻 Circuitos de polarización básica");
        }
        else if (ohms >= 10000 && ohms < 100000)
        {
            uses.Add("🔌 Entradas digitales MCU (Arduino/ESP)");
            uses.Add("⏱️ Temporizadores tipo 555");
            uses.Add("〰️ Filtros pasa-bajos/altos (RC)");
        }
        else if (ohms >= 100000 && ohms < 1000000)
        {
            uses.Add("🧠 Ganancia de Amp. Operacional");
            uses.Add("📉 Divisor sensor resistivo (LDR, Termistor)");
            uses.Add("🔇 Circuitos de bajo consumo eléctrico");
        }
        else
        {
            uses.Add("⚡ Bleeder (Descarga segura de capacitores HV)");
            uses.Add("📡 Entradas lógicas CMOS sensibles");
            uses.Add("⚙️ Acoplamientos de altísima impedancia");
        }

        return uses;
    }

    public Task<ReverseCalculationResponse> ReverseCalculateColorCodeAsync(ReverseCalculationRequest request, CancellationToken ct = default)
    {
        double? parsed = ElectronicSystem.Application.Utils.UnitParser.Parse(request.InputValue);
        double value = parsed ?? 0;
        
        if (value <= 0)
            return Task.FromResult(new ReverseCalculationResponse());

        int precisionDigits = request.BandCount == 4 ? 2 : 3;

        double exp = Math.Floor(Math.Log10(value));
        double shift = Math.Pow(10, precisionDigits - 1 - exp);
        double sigFigs = Math.Round(value * shift);
        
        if (sigFigs >= Math.Pow(10, precisionDigits)) {
            sigFigs /= 10;
            exp += 1;
        }

        int digits = (int)sigFigs;
        int multValue = (int)Math.Round(exp - (precisionDigits - 1));

        int d1 = digits / (precisionDigits == 3 ? 100 : 10);
        int d2 = (digits / (precisionDigits == 3 ? 10 : 1)) % 10;
        int d3 = precisionDigits == 3 ? (digits % 10) : 0;

        var response = new ReverseCalculationResponse
        {
            Band1Hex = GetHexFromDigit(d1),
            Band2Hex = GetHexFromDigit(d2),
            Band3Hex = request.BandCount > 4 ? GetHexFromDigit(d3) : string.Empty,
            MultiplierHex = GetMultiplierHexFromExp(multValue),
            ToleranceHex = request.BandCount == 4 ? "#d4af37" : "#8b4513",
            PpmHex = request.BandCount == 6 ? "#8b4513" : string.Empty
        };

        return Task.FromResult(response);
    }

    private static string GetHexFromDigit(int digit) => digit switch
    {
        0 => "#000000",
        1 => "#8b4513",
        2 => "#ff0000",
        3 => "#ff8c00",
        4 => "#ffd700",
        5 => "#008000",
        6 => "#0000ff",
        7 => "#8a2be2",
        8 => "#808080",
        9 => "#ffffff",
        _ => "#000000"
    };

    private static string GetMultiplierHexFromExp(int exp) => exp switch
    {
        0 => "#000000",
        1 => "#8b4513",
        2 => "#ff0000",
        3 => "#ff8c00",
        4 => "#ffd700",
        5 => "#008000",
        6 => "#0000ff",
        7 => "#8a2be2",
        8 => "#808080",
        9 => "#ffffff",
        -1 => "#d4af37",
        -2 => "#c0c0c0",
        _ => "#000000"
    };

    private static int GetDigitValue(string hex) => hex?.ToLowerInvariant() switch
    {
        "#000000" => 0,
        "#8b4513" => 1,
        "#ff0000" => 2,
        "#ff8c00" => 3,
        "#ffd700" => 4,
        "#008000" => 5,
        "#0000ff" => 6,
        "#8a2be2" => 7,
        "#808080" => 8,
        "#ffffff" => 9,
        _ => 0
    };

    private static double GetMultiplierValue(string hex) => hex?.ToLowerInvariant() switch
    {
        "#000000" => 1,
        "#8b4513" => 10,
        "#ff0000" => 100,
        "#ff8c00" => 1000,
        "#ffd700" => 10000,
        "#008000" => 100000,
        "#0000ff" => 1000000,
        "#8a2be2" => 10000000,
        "#808080" => 100000000,
        "#ffffff" => 1000000000,
        "#d4af37" => 0.1,
        "#c0c0c0" => 0.01,
        _ => 1
    };

    private static double GetToleranceValue(string hex) => hex?.ToLowerInvariant() switch
    {
        "#8b4513" => 1,
        "#ff0000" => 2,
        "#008000" => 0.5,
        "#0000ff" => 0.25,
        "#8a2be2" => 0.1,
        "#808080" => 0.05,
        "#d4af37" => 5,
        "#c0c0c0" => 10,
        _ => 0
    };

    private static string FormatResistance(double val)
    {
        var culture = new System.Globalization.CultureInfo("en-US");
        if (val >= 1000000)
            return $"{(val / 1000000).ToString("0.##", culture)} MΩ";
        if (val >= 1000)
            return $"{(val / 1000).ToString("0.##", culture)} kΩ";
        return $"{val.ToString("0.##", culture)} Ω";
    }
}
