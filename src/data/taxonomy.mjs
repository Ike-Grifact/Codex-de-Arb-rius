export const tagLabels = {
  acampamento: "Acampamento",
  agua: "Água",
  alimentacao: "Alimentação",
  alimento: "Alimento",
  arborius: "Árborius",
  arcos: "Arcos",
  armas: "Armas",
  camaleonica: "Camaleônica",
  campeiro: "Campeiro",
  campeiros: "Campeiros",
  camuflagem: "Camuflagem",
  carga: "Carga",
  cidade: "Cidade",
  coletivo: "Coletivo",
  conhecimento: "Conhecimento",
  cozinha: "Cozinha",
  craft: "Fabricação",
  cultura: "Cultura",
  culturas: "Culturas",
  desafortunados: "Desafortunados",
  durabilidade: "Durabilidade",
  duravel: "Durável",
  emergencia: "Emergência",
  equipamentos: "Equipamentos",
  exemplo: "Exemplo",
  exclusao: "Exclusão",
  "exclusao-social": "Exclusão Social",
  exploracao: "Exploração",
  exploradores: "Exploradores",
  exterior: "Exterior",
  ferramentas: "Ferramentas",
  fibra: "Fibra",
  furtividade: "Furtividade",
  guildas: "Guildas",
  impacto: "Impacto",
  isolamento: "Isolamento",
  linhagem: "Linhagem",
  lucker: "Lucker",
  madeira: "Madeira",
  materiais: "Materiais",
  metal: "Metal",
  montaria: "Montaria",
  origens: "Origens",
  osso: "Osso",
  pessoal: "Pessoal",
  projeto: "Projeto",
  protecao: "Proteção",
  provisoes: "Provisões",
  regeneracao: "Regeneração",
  resgate: "Resgate",
  seda: "Seda",
  sobrevivencia: "Sobrevivência",
  tecido: "Tecido",
  tracao: "Tração",
  vestimenta: "Vestimenta",
  viagem: "Viagem",
  vinculo: "Vínculo",
  "velho-mundo": "Velho Mundo"
};

export const categoryLabels = {
  material: "Material Assimilado",
  arma: "Arma",
  armadura: "Armadura",
  ferramenta: "Ferramenta",
  consumivel: "Consumível",
  provisao: "Provisão",
  abrigo: "Abrigo",
  montaria: "Montaria",
  kit: "Kit",
  municao: "Munição",
  projeto: "Projeto",
  item: "Item",
  local: "Local",
  povo: "Povo",
  cultura: "Cultura",
  conhecimento: "Conhecimento",
  regiao: "Região"
};

export const availabilityLabels = {
  inicial: "Inicial"
};

export const originLabels = {
  "01_Guia_Jogador_Lucker.html": "Guia do Jogador — Linhagem Lucker",
  "02_Guia_Jogador_Arboriano.html": "Guia do Jogador — Linhagem Arboriana",
  "04_Guia_Materiais_Assimilados_Equipamentos_Partida.html":
    "Materiais Assimilados e Equipamentos de Partida",
  "guia-arboriano": "Guia do Jogador — Linhagem Arboriana"
};

export const typeLabels = {
  guia: "Guia",
  item: "Item",
  material: "Material Assimilado",
  local: "Local",
  povo: "Povo",
  cultura: "Cultura",
  conhecimento: "Conhecimento",
  quest: "Quest",
  sessao: "Sessão"
};

export const ptBrCollator = new Intl.Collator("pt-BR", {
  sensitivity: "base"
});

const labelFrom = (labels, id, fallback) =>
  labels[id] ?? fallback;

export const tagLabel = (id) =>
  labelFrom(tagLabels, id, "Tag não catalogada");

export const categoryLabel = (id) =>
  labelFrom(categoryLabels, id, "Categoria não catalogada");

export const availabilityLabel = (id) =>
  labelFrom(availabilityLabels, id, "Disponibilidade não catalogada");

export const originLabel = (id) =>
  labelFrom(originLabels, id, "Fonte pública");

export const typeLabel = (id) =>
  labelFrom(typeLabels, id, "Conteúdo");

export const sortLabels = (ids, labels) =>
  [...ids].sort((left, right) =>
    ptBrCollator.compare(labels[left] ?? "", labels[right] ?? "")
  );
