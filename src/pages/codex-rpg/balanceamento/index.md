---
layout: ../../../layouts/CodexRpgLayout.astro
title: Codex RPG — Estudo de balanceamento v0.18
description: Retenção por Coragem, dados de armas e eficácia de monstros e ações conjuntas.
---

# Balanceamento v0.18 — Retenção, peso e Líder

**ESTUDO EXPERIMENTAL.** Este capítulo apresenta hipóteses de simulação e **não cria regras novas**. Consulte o [Livro do Jogador v0.3](../livro-do-jogador/) e o [SRD v0.18](../srd/) para as regras definidas.

## 1. Metodologia

Simulação computacional de **100.000 rolagens independentes por configuração**, com as faces atuais de d4, d6, d10, d12 e d20, conversão de 2 Antecipar em 1 Êxito, crítico (+1E quando dois dados mantidos mostram a face máxima), até nove dados rolados e até quatro mantidos. Pelo menos um dado mantido deve vir de Atributo.

Para estimar a **chance máxima de acerto**, foram comparadas todas as seleções válidas de até 2, 3 ou 4 dados, escolhendo a que mais alcança Êxito + Pavor não anulado + Êxitos convertidos. Nos empates, prefere-se menos Pavor. É uma estratégia agressiva; **chance de acerto não é chance de acerto limpo**. Bônus especiais, equipamentos defensivos, custos e saúde não estão incluídos. Erro amostral aproximado máximo: **±0,31 ponto percentual (95%)**.

## 2. O quarto dado pago com Coragem

**DEFINIDO:** níveis 1–5 mantêm dois dados naturalmente, ou três pagando 1 Coragem. A partir do nível 6, mantêm três naturalmente, ou quatro pagando 1 Coragem.

| Pilha hipotética | Mantidos | Atinge DE 7 | Atinge DE 10 |
|---|---:|---:|---:|
| 3d6 + 3d10 | 3 | 8,16% | 0,00% |
| 3d6 + 3d10 | 4 | **27,58%** | 1,14% |
| 3d6 + 6d10 | 3 | 26,26% | 0,00% |
| 3d6 + 6d10 | 4 | **64,69%** | **10,39%** |
| 3d10 + 6d12 | 3 | 67,87% | 1,93% |
| 3d10 + 6d12 | 4 | **92,36%** | **38,35%** |

Essas pilhas ilustram **fontes com XP investido**, não são fornecidas automaticamente no nível 6. O quarto dado pode melhorar o acerto dramaticamente, mas precisa competir por Coragem com outros usos.

**Custo de risco:** para 3d6 + 6d10, uma seleção que maximize a DE mantém algum Pavor em aproximadamente **91,35%** das rolagens com três dados e **95,64%** com quatro. Isso não torna todos os acertos limpos; pode aumentar a Coragem entregue ao lado inimigo e permitir oportunidades adversárias. Recomenda-se medir a taxa real de recuperação da Coragem dos jogadores.

## 3. Composição das armas: muitos d4 ou poucos dados grandes

**DEFINIDO:** d4 = peso 0,5; d6 = 1; d10 = 2; d12 = 3; **d20 = 6**. Arma pesada grau 2 tem peso 3; grau 3 tem 5; grau 4 tem 7. Equipamento pode fornecer diversos dados rolados, mas a pilha da ação não passa de **nove**.

Com a mesma base de **3d10 de Atributo** e **quatro dados mantidos**, duas armas de peso 3 produzem:

| Pilha | Rolados | Atinge DE 7 | Atinge DE 10 | Pavor médio na melhor DE |
|---|---:|---:|---:|---:|
| 3d10 + **6d4** | 9 | **51,26%** | 2,66% | **3,04P** |
| 3d10 + **1d12** | 4 | 27,39% | 2,19% | **2,17P** |

A arma de d4 obtém mais opções, mas mantém **mais Pavor** numa escolha agressiva e ocupa mais espaço do limite global de nove dados. Uma arma de poucos dados grandes permite agregar fontes que não caberiam numa pilha cheia. O equilíbrio não pode ser medido por chance de acerto isolada; avaliar também dano, proteção, Pavor e disponibilidade de fontes.

## 4. Monstruosidade de grau 6 e d20 por 100 XP

Um monstro de grau 6 com um Atributo no grau 6 pode pagar **100 XP** uma única vez para substituir um d12 por um d20 permanente. Demais d20 possíveis exigem Pavor e capacidades extraordinárias.

| Pilha hipotética | Mantidos | Atinge DE 10 | Atinge DE 12 |
|---|---:|---:|---:|
| 9d12 | 4 | 47,55% | 4,43% |
| **1d20 + 8d12** | 4 | **56,26%** | **17,15%** |

O impacto em DE 12 é bem maior do que em DE 10. Pela tabela de custo de Atributos, **quatro Atributos grau 6 = 220 XP** e a compra do d20 exigiria **mais 100 XP**, totalizando pelo menos **320 XP** em capacidades, antes de outras compras. O orçamento por grau de monstro ainda é **PENDENTE**.

## 5. Ação conjunta de três chefes e dano colossal

**DEFINIDO:** os monstros precisam de **ao menos um Líder participante**, até três participantes e **3P da reserva pública pagos imediatamente**. O pagamento não cria uma oportunidade extra, não garante acerto e não elimina custos individuais. Para um alvo com **12 de Vida máxima**, dano colossal exige **36 de dano corporal num único ataque**, após a armadura.

O dano máximo individual com quatro dados mantidos, conversão de Antecipar e crítico, é:

| Dados mantidos possíveis | Dano máximo individual |
|---|---:|
| 4d12 | 10 |
| 1d20 + 3d12 | 12 |
| 2d20 + 2d12 | 15 |
| 3d20 + 1d12 | 17 |

Assim, **três chefes só com d12 não podem produzir 36 de dano** por soma de três resultados individuais, mesmo na rolagem ideal. Com d20 a combinação volta a ser possível.

Em **250.000 ações conjuntas simuladas** com três chefes, nove dados disponíveis por chefe e seleção individual para dano máximo:

| Pilha de cada chefe | Soma de dano ≥ 36 |
|---|---:|
| 1d20 + 8d12 | **1 ocorrência em 250.000** (estimativa instável) |
| 3d20 + 6d12 | **0,59%** |

**Importante:** estes são **potenciais de dano**, **não chances de morte**. Não se verificou se os ataques conseguiriam atingir a DE coletiva com a mesma seleção, nem a armadura, resistências, disponibilidade de Pavor, sobrevivência do Líder ou possibilidade de intervenção dos jogadores. O arredondamento do Pavor da ação conjunta continua **PENDENTE**: aplicar piso(P/2) a cada participante antes de somar ou aplicar ao total pode produzir até **1 ponto de diferença** com três participantes.

A reserva pública com três jogadores chega a **5P**; pagar 3P representa **60% da reserva cheia**. Não é possível inferir a frequência da ação conjunta sem simular o fluxo de Pavor público e local.

## 6. Parecer e próximos testes

**Retenção e Coragem:** mecânica coerente, com aumento grande de eficácia. Monitorar a frequência real do quarto dado e sua recuperação de Coragem.

**Armas por peso:** criam uma escolha relevante entre mais dados disponíveis e dados mais poderosos. Muitas faces de d4 aumentam opções e Pavor; é preciso comparar dano e custo da pilha.

**Líder e 3P públicos:** habilitam ofensivas raras e fortes sem torná-las automáticas. Medir o tempo para acumular 3P e a capacidade dos jogadores de eliminar o Líder.

**Prioridade experimental:** três jogadores contra um chefe de grau 6, e depois contra três monstros com Líder; registrar acertos limpos, Pavor, Coragem, integridade de armadura, ataques conjuntos, Vida efetivamente perdida e duração do encontro. **Não alterar simultaneamente a esquiva das armaduras** antes desses testes.

---

[Livro do Jogador](../livro-do-jogador/) · [SRD v0.18](../srd/) · [Bestiário](../bestiario/)
