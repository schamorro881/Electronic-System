using ElectronicSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ElectronicSystem.Infrastructure.Data;

/// <summary>
/// ApplicationUser extendido con los campos de la tabla 'users' del esquema.
/// Usamos int como tipo para la PK de Identity para coincidir con el esquema.
/// </summary>
public class ApplicationUser : IdentityUser<int>
{
    public string Name { get; set; } = string.Empty;
    public string? IdentityId { get; set; } // Referencia al provider externo (Firebase, etc.)
    public string? AvatarUrl { get; set; }
    public long CreatedAt { get; set; }
    public long UpdatedAt { get; set; }
    
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiresAt { get; set; }
}

public class AppDbContext(DbContextOptions<AppDbContext> options)
    : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>(options)
{
    // Catálogo
    public DbSet<Categoria> Categorias => Set<Categoria>();
    public DbSet<Componente> Componentes => Set<Componente>();
    public DbSet<ComponentSpec> ComponentSpecs => Set<ComponentSpec>();
    public DbSet<ComponentTag> ComponentTags => Set<ComponentTag>();
    public DbSet<ComponentPinout> ComponentPinouts => Set<ComponentPinout>();
    
    // Calculadora
    public DbSet<ResistorColorBand> ResistorColorBands => Set<ResistorColorBand>();
    
    // Guías
    public DbSet<ImplementationGuide> ImplementationGuides => Set<ImplementationGuide>();
    public DbSet<GuideComponent> GuideComponents => Set<GuideComponent>();
    
    // Usuario / Personalización
    public DbSet<UserFavorite> UserFavorites => Set<UserFavorite>();
    public DbSet<UserNote> UserNotes => Set<UserNote>();
    public DbSet<CalculationHistory> CalculationHistories => Set<CalculationHistory>();
    
    // Simulador
    public DbSet<SavedCircuit> SavedCircuits => Set<SavedCircuit>();
    public DbSet<CircuitComponent> CircuitComponents => Set<CircuitComponent>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Mapeo de nombres de tablas según database_schema.md
        builder.Entity<ApplicationUser>().ToTable("users");
        builder.Entity<IdentityRole<int>>().ToTable("roles");
        builder.Entity<IdentityUserRole<int>>().ToTable("user_roles");
        builder.Entity<IdentityUserClaim<int>>().ToTable("user_claims");
        builder.Entity<IdentityUserLogin<int>>().ToTable("user_logins");
        builder.Entity<IdentityRoleClaim<int>>().ToTable("role_claims");
        builder.Entity<IdentityUserToken<int>>().ToTable("user_tokens");

        builder.Entity<Categoria>().ToTable("categories");
        builder.Entity<Componente>().ToTable("components");
        builder.Entity<ComponentSpec>().ToTable("component_specs");
        builder.Entity<ComponentTag>().ToTable("component_tags");
        builder.Entity<ComponentPinout>().ToTable("component_pinouts");
        builder.Entity<ResistorColorBand>().ToTable("resistor_color_bands");
        builder.Entity<ImplementationGuide>().ToTable("implementation_guides");
        builder.Entity<GuideComponent>().ToTable("guide_components");
        builder.Entity<UserFavorite>().ToTable("user_favorites");
        builder.Entity<UserNote>().ToTable("user_notes");
        builder.Entity<CalculationHistory>().ToTable("calculation_history");
        builder.Entity<SavedCircuit>().ToTable("saved_circuits");
        builder.Entity<CircuitComponent>().ToTable("circuit_components");

        // Configuraciones adicionales (Keys, Constraints)
        builder.Entity<ComponentTag>()
            .HasIndex(t => new { t.ComponentId, t.Tag }).IsUnique();

        builder.Entity<ComponentPinout>()
            .HasIndex(p => new { p.ComponentId, p.PinNumber }).IsUnique();

        builder.Entity<ResistorColorBand>()
            .HasIndex(b => b.ColorName).IsUnique();

        // Seeds
        SeedResistorColors(builder);
        SeedInitialCategories(builder);
    }

    private static void SeedResistorColors(ModelBuilder builder)
    {
        builder.Entity<ResistorColorBand>().HasData(
            new ResistorColorBand { Id = 1, ColorName = "black", HexCode = "#000000", DigitValue = 0, Multiplier = 1 },
            new ResistorColorBand { Id = 2, ColorName = "brown", HexCode = "#8B4513", DigitValue = 1, Multiplier = 10, TolerancePct = 1, TempCoeffPpm = 100 },
            new ResistorColorBand { Id = 3, ColorName = "red", HexCode = "#FF0000", DigitValue = 2, Multiplier = 100, TolerancePct = 2, TempCoeffPpm = 50 },
            new ResistorColorBand { Id = 4, ColorName = "orange", HexCode = "#FFA500", DigitValue = 3, Multiplier = 1000, TempCoeffPpm = 15 },
            new ResistorColorBand { Id = 5, ColorName = "yellow", HexCode = "#FFFF00", DigitValue = 4, Multiplier = 10000, TempCoeffPpm = 25 },
            new ResistorColorBand { Id = 6, ColorName = "green", HexCode = "#008000", DigitValue = 5, Multiplier = 100000, TolerancePct = 0.5 },
            new ResistorColorBand { Id = 7, ColorName = "blue", HexCode = "#0000FF", DigitValue = 6, Multiplier = 1000000, TolerancePct = 0.25 },
            new ResistorColorBand { Id = 8, ColorName = "violet", HexCode = "#EE82EE", DigitValue = 7, Multiplier = 10000000, TolerancePct = 0.1 },
            new ResistorColorBand { Id = 9, ColorName = "grey", HexCode = "#808080", DigitValue = 8, Multiplier = 100000000, TolerancePct = 0.05 },
            new ResistorColorBand { Id = 10, ColorName = "white", HexCode = "#FFFFFF", DigitValue = 9, Multiplier = 1000000000 },
            new ResistorColorBand { Id = 11, ColorName = "gold", HexCode = "#FFD700", Multiplier = 0.1, TolerancePct = 5 },
            new ResistorColorBand { Id = 12, ColorName = "silver", HexCode = "#C0C0C0", Multiplier = 0.01, TolerancePct = 10 }
        );
    }

    private static void SeedInitialCategories(ModelBuilder builder)
    {
        builder.Entity<Categoria>().HasData(
            new Categoria { Id = 1, Name = "Resistencias", Slug = "resistencias", Description = "Componentes limitadores de corriente", Icon = "resistor" },
            new Categoria { Id = 2, Name = "Capacitores", Slug = "capacitores", Description = "Almacenamiento de energía", Icon = "capacitor" },
            new Categoria { Id = 3, Name = "Semiconductores", Slug = "semiconductores", Description = "Diodos, Transistores e ICs", Icon = "ic" }
        );
    }
}
