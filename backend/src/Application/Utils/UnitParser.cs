using System.Globalization;
using System.Text.RegularExpressions;

namespace ElectronicSystem.Application.Utils;

public static class UnitParser
{
    public static double? Parse(string? input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return null;

        input = input.Trim().Replace(",", ".");
        
        // Remove common unit tails (case insensitive replacement)
        input = Regex.Replace(input, @"\s*(ohms|ohmios|ohm|Ω|volts|voltios|volt|v|amps|amperios|amp|a|watts|vatios|watt|w)$", "", RegexOptions.IgnoreCase);

        double multiplier = 1;

        if (input.Contains("p"))
        {
            multiplier = 1e-12;
            input = input.Replace("p", ".");
        }
        else if (input.Contains("n"))
        {
            multiplier = 1e-9;
            input = input.Replace("n", ".");
        }
        else if (input.Contains("u") || input.Contains("µ"))
        {
            multiplier = 1e-6;
            input = input.Replace("u", ".").Replace("µ", ".");
        }
        else if (input.Contains("m"))
        {
            multiplier = 1e-3;
            input = input.Replace("m", ".");
        }
        else if (input.Contains("k") || input.Contains("K"))
        {
            multiplier = 1e3;
            input = input.Replace("k", ".").Replace("K", ".");
        }
        else if (input.Contains("M")) // Mega (Must be uppercase to differentiate from milli)
        {
            multiplier = 1e6;
            input = input.Replace("M", ".");
        }
        else if (input.Contains("G") || input.Contains("g"))
        {
            multiplier = 1e9;
            input = input.Replace("G", ".").Replace("g", ".");
        }

        if (input.EndsWith("."))
            input = input.Substring(0, input.Length - 1);

        if (double.TryParse(input, NumberStyles.Any, CultureInfo.InvariantCulture, out double parsedValue))
        {
            return parsedValue * multiplier;
        }

        return null;
    }
}
