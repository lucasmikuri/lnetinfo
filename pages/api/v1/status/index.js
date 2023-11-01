import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT current_database();");
  console.log(result.rows);
  response.status(200).json({ chave: "Alunos do curso sao acima da media" });
}

export default status;
