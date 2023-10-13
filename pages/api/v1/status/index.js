function status(request, response) {
  response.status(200).json({ chave: "Alunos do curso sao acima da media" });
}

export default status;
