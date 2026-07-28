export const symbols = {
  sucesso: { file: "sucesso.svg", label: "Sucesso", plural: "Sucessos" },
  adaptacao: { file: "adaptacao.svg", label: "Adaptação", plural: "Adaptações" },
  pressao: { file: "pressao.svg", label: "Pressão", plural: "Pressões" },
  niveldedeterminacao: {
    file: "niveldedeterminacao.svg",
    label: "Nível de Determinação",
    plural: "Níveis de Determinação"
  },
  pontodedeterminacao: {
    file: "pontodedeterminacao.svg",
    label: "Ponto de Determinação",
    plural: "Pontos de Determinação"
  },
  niveldeassimilacao: {
    file: "niveldeassimilacao.svg",
    label: "Nível de Assimilação",
    plural: "Níveis de Assimilação"
  },
  pontodeassimilacao: {
    file: "pontodeassimilacao.svg",
    label: "Ponto de Assimilação",
    plural: "Pontos de Assimilação"
  },
  niveldesaude: {
    file: "niveldesaude.svg",
    label: "Nível de Saúde",
    plural: "Níveis de Saúde"
  },
  pontodesaude: {
    file: "pontodesaude.svg",
    label: "Ponto de Saúde",
    plural: "Pontos de Saúde"
  },
  d6: { file: "d6.svg", label: "d6", plural: "d6" },
  d10: { file: "d10.svg", label: "d10", plural: "d10" },
  d12: { file: "d12.svg", label: "d12", plural: "d12" }
};

export const isGameSymbol = (type) =>
  Object.prototype.hasOwnProperty.call(symbols, type);

export const gameSymbolText = (type, count) => {
  const symbol = symbols[type];
  if (!symbol) return type;

  if (type === "d6" || type === "d10" || type === "d12") {
    return count === undefined ? symbol.label : `${count}${symbol.label}`;
  }

  if (count === undefined) return symbol.label;
  return `${count} ${count === 1 ? symbol.label : symbol.plural}`;
};
