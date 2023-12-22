import { Query } from "pg";
import database from "../../../../infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseConnMaxResult = await database.query("SHOW max_connections;");
  const databaseConnMaxValue = databaseConnMaxResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseConnUsoResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseConnUsoValue = databaseConnUsoResult.rows[0].count;

  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseConnMaxValue),
        uso_connections: databaseConnUsoValue,
        opened_connections: databaseConnUsoValue,
      },
    },
  });
}

export default status;
