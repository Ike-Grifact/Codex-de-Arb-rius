---
layout: ../../../layouts/CodexRpgLayout.astro
title: Codex RPG — Estudo de balanceamento v0.18
description: Retenção por Coragem e curvas de DE 3 a DE 30: acertos limpos, Pavor, monstros e cooperação.
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

## 6. Análise multiescala: DE 3 até DE 30

**Extensão EXPERIMENTAL da simulação:** o cenário de DE 7 era insuficiente para calibrar o Codex, porque personagens e monstros enfrentam DE muito distintas. Recalculamos **100.000 rolagens por pilha** nas DE 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25 e 30. A seleção considera de 1 até o máximo de dados mantidos, ao menos um de Atributo, crítico +1E e conversão de 2A em 1E. As porcentagens abaixo são **limites de possibilidade após observar os dados**, não decisões obrigatórias dos jogadores nem de um Narrador inteligente.

### Acertos limpos e arriscados são resultados diferentes

**Acerto limpo** é possível quando existe uma seleção que cumpre a DE e termina com **zero Pavor não anulado**, podendo gastar Antecipar próprio para anulá-lo. **Acerto possível** considera também seleções que conservam Pavor; não é necessariamente a escolha que a criatura fará.

| Pilha (quatro mantidos) | DE 5: limpo/total | DE 7: limpo/total | DE 9: limpo/total | DE 10: limpo/total | DE 11: limpo/total | DE 12: limpo/total |
|---|---:|---:|---:|---:|---:|---:|
| Humano híbrido 3d10+6d12 | 65,4/99,6% | 11,4/92,4% | 0/62,2% | **0/38,4%** | 0/17,6% | 0/5,2% |
| Monstro 9d12 | 67,1/99,8% | 10,1/95,0% | 0/70,7% | **0/47,6%** | 0/22,7% | 0/4,3% |
| Monstro 1d20+8d12 | 70,6/99,8% | 17,7/95,6% | 1,8/75,2% | **0,1/56,0%** | ~0/34,8% | ~0/17,1% |
| Monstro 3d20+6d12 | 76,8/99,8% | 31,4/96,7% | 7,3/82,4% | **2,2/69,1%** | 0,9/53,7% | 0,6/38,0% |

**Interpretação:** um monstro 9d12 pode alcançar DE 10 em **47,6%** das rolagens, mas esses acertos **exigem conservar Pavor** na hipótese simulada. Esse Pavor ajuda a atingir a DE e a causar dano, mas gera Coragem aos jogadores. Assim, uma criatura que evita Pavor pode procurar outro alvo, agir de outra maneira ou aceitar uma falha limpa em vez de sempre tentar acertar.

As pilhas de 9d12 e de d20 são **condicionais**: pressupõem XP, fontes, manutenção dos quatro dados e custos de Pavor já disponíveis. A compra permanente de **um d20 por 100 XP** não torna gratuitos os outros dois.

### Quatro desfechos — seleção tática do inimigo

Um inimigo pode priorizar **acerto limpo**, depois **acerto com Pavor**, depois **falha limpa** e só por último **falha com Pavor inevitável**. Para DE 10, esse procedimento produz:

| Monstro | Acerto limpo | Acerto com Pavor | Falha limpa | Falha com Pavor inevitável |
|---|---:|---:|---:|---:|
| 9d12, mantém 4 | **0%** | **47,6%** | **51,8%** | **0,6%** |
| 1d20+8d12, mantém 4 | **0,1%** | **55,9%** | **43,6%** | **0,4%** |
| 3d20+6d12, mantém 4 | **2,2%** | **66,9%** | **30,7%** | **0,2%** |

São resultados **possíveis** sob essa prioridade, não decisões obrigatórias. Um inimigo cauteloso pode inclusive preferir **falhar sem Pavor** a executar um **acerto com Pavor**, evitando dar Coragem ao alvo ou ao aliado próximo. Um inimigo desesperado pode escolher o oposto para causar dano antes de cair. Esse dilema deve entrar no balanceamento de chefes e lacaios.

### Gastar Coragem agora ou sofrer penalidades depois

Para o humano híbrido **3d10+6d12**, mantendo quatro dados e tentando alcançar DE 10:

| Estado de Saúde | Penalidade | Acerto possível |
|---|---:|---:|
| Saudável | 0E | **38,4%** |
| Machucado | −1E | **17,6%** |
| Incapacitado | −2E | **5,2%** |

O gasto de Coragem para manter o quarto dado pode evitar dano e a perda futura de eficiência. Não é necessário enfraquecer esse gasto antes de medir a taxa real de recuperação de Coragem e a frequência de ferimentos; o sistema incentiva uma decisão tática relevante.

### Composição de peso igual: a vantagem muda conforme a DE

Comparação de **arma pesada grau 2**, ambas de **peso 3**, com base igual de Atributo **3d10** e quatro dados mantidos:

| Composição total | DE 5 | DE 7 | DE 9 | DE 10 | DE 11 | DE 12 |
|---|---:|---:|---:|---:|---:|---:|
| **3d10+6d4** | 87,8% | **51,4%** | **10,8%** | 2,6% | 0,3% | 0% |
| **3d10+1d12** | 67,0% | 27,7% | 6,0% | 2,2% | **0,7%** | **0,2%** |

Muitos d4 melhoram a seleção em dificuldades acessíveis. Um d12 oferece maior potencial no extremo alto; a curva se inverte em **DE 11–12**. A análise de DE 7 isolada fazia parecer que a arma de seis d4 era simplesmente melhor. Ainda é preciso medir dano, Pavor mantido e a ocupação de espaço na pilha.

### DE 30 em ações conjuntas — não equivale a dano colossal

Com **três participantes** e até **quatro dados mantidos por integrante**, somando os resultados de DE de cada participante depois de suas próprias conversões de Antecipar:

| Cada integrante da ação conjunta | Atinge DE 20 | Atinge DE 30 | DE 30 sem Pavor |
|---|---:|---:|---:|
| 9d10 | 96,1% | **9,6%** | Próximo de 0% |
| 9d12 | 99,8% | **26,8%** | 0% |
| 1d20+8d12 | 99,9% | **47,7%** | 0% |
| 3d20+6d12 | 99,9% | **75,3%** | ~0,04% |

Os percentuais são **condicionais à execução da ação conjunta**. Para monstros, ainda exigem um **Líder**, pagamento de **3P públicos**, custos locais e participação efetiva; esses custos e a frequência das oportunidades não foram simulados.

No modelo puramente simbólico, **quatro d20 mantidos chegam no máximo a DE 24 sem bônus externos** (quatro resultados 19, somando a conversão de Antecipar); portanto, DE 30 é uma dificuldade de ação conjunta ou efeito extraordinário, não uma DE defensiva normal. A probabilidade **exata** de quatro d20 alcançarem DE 10, com crítico, é **32,87%**.

**DE 30 não é dano 30.** Dano usa **E + piso(P/2)**. Mesmo quando três monstros 9d12 somam DE 30, cada um possui no máximo **10 de dano individual** com quatro dados mantidos, e os três juntos não alcançam 36 de dano corporal num único ataque pela soma dos danos individuais. Já três monstros com 3d20+6d12 cada superaram **36 de dano bruto em aproximadamente 0,60% de 120 mil ofensivas simuladas** que maximizam dano; o resultado ainda precisa atravessar a armadura e pressupõe a cooperação autorizada.

A escolha de arredondar Pavor antes ou depois de reunir o dano da ação conjunta continua **PENDENTE** e pode alterar em até **1 ponto** o total com três participantes. Não transformar a porcentagem condicional de dano em probabilidade de morte instantânea no encontro.

**Conclusão do balanceamento:** avaliar pelo menos quatro desfechos — acerto limpo, acerto com Pavor, falha limpa e falha com Pavor — em várias DE. Acrescentar distribuição de Coragem, dano corporal, integridade, penalidades de Saúde e custo real da ação conjunta. Ações que alcançam a DE com Pavor não devem ser consideradas equivalentes a acertos limpos. Os intervalos de DE apresentados aqui são **instrumentos de estudo**, não uma nova tabela oficial.

---

## 7. Parecer e próximos testes

**Retenção e Coragem:** mecânica coerente, com aumento grande de eficácia. Monitorar a frequência real do quarto dado e sua recuperação de Coragem.

**Armas por peso:** criam uma escolha relevante entre mais dados disponíveis e dados mais poderosos. Muitas faces de d4 aumentam opções e Pavor; é preciso comparar dano e custo da pilha.

**Líder e 3P públicos:** habilitam ofensivas raras e fortes sem torná-las automáticas. Medir o tempo para acumular 3P e a capacidade dos jogadores de eliminar o Líder.

**Prioridade experimental:** três jogadores contra um chefe de grau 6, e depois contra três monstros com Líder; registrar acertos limpos, Pavor, Coragem, integridade de armadura, ataques conjuntos, Vida efetivamente perdida e duração do encontro. **Não alterar simultaneamente a esquiva das armaduras** antes desses testes.

---

[Livro do Jogador](../livro-do-jogador/) · [SRD v0.18](../srd/) · [Bestiário](../bestiario/)
