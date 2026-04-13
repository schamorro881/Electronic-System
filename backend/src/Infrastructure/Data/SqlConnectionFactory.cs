using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace ElectronicSystem.Infrastructure.Data;

/// <summary>
/// Fábrica de conexiones Dapper para SQLite.
/// </summary>
public interface IDbConnectionFactory
{
    IDbConnection CreateConnection();
}

public sealed class SqlConnectionFactory(IConfiguration configuration) : IDbConnectionFactory
{
    private readonly string _connectionString =
        configuration.GetConnectionString("DefaultConnection")
        ?? "Data Source=ElectronicSystem.db"; // Fallback default

    public IDbConnection CreateConnection()
    {
        var connection = new SqliteConnection(_connectionString);
        // SQLite requiere activar explícitamente las FKs por conexión si no está en la cadena
        if (connection.State != ConnectionState.Open) connection.Open();
        using var command = connection.CreateCommand();
        command.CommandText = "PRAGMA foreign_keys = ON;";
        command.ExecuteNonQuery();
        return connection;
    }
}
