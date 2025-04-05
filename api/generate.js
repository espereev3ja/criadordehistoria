export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Método não permitido");

  const { genero, estilo, referencia, personagem1, personagem2 } = req.body;

  const prompt_base = `
Você é uma escritora de webnovels altamente eróticas e emocionantes. 
Escreva a história inteira diretamente em português brasileiro, com riqueza de detalhes, cenas quentes e envolventes, com diálogos intensos, foco nos sentimentos e tensão sexual. 
A protagonista é sempre uma mulher forte ou vulnerável, e o interesse amoroso pode ser dominante, sensual ou misterioso. 
Sempre termine com um final feliz, mesmo que dramático. Narração contínua, sem cortes abruptos.
`;

  const prompt = `${prompt_base}
Gênero: ${genero}
Estilo: ${estilo}
Protagonista: ${personagem1}
Interesse Amoroso: ${personagem2}
Referência: ${referencia}
Escreva uma história completa e envolvente.
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer SUA_API_KEY_AQUI",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const historia = data.choices?.[0]?.message?.content || "Erro ao gerar história";
    res.status(200).json({ historia });

  } catch (error) {
    res.status(500).json({ error: "Erro na geração: " + error.message });
  }
}
