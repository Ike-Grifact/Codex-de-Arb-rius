---
layout: ../../../layouts/CodexRpgLayout.astro
title: Codex RPG — Construção de Monstros e Encontros
description: Guia de consulta dos graus, Pavor, dados, XP e ranks de desafio.
---

# Bestiário — construção de monstros e encontros

**Guia do Narrador · continuidade v0.19.** As regras definidas são apresentadas separadamente dos custos de teste e dos orçamentos ainda pendentes.

## Identidade das ameaças

Um humanoide adversário pode usar XP, Atributos, Conhecimentos, Práticas, Perícias e equipamento pelas mesmas regras de um personagem jogador. Um monstro não humanoide utiliza Atributos, características naturais e Pavor, podendo ter capacidades próprias sem simular uma árvore humana de Perícias.

**O tamanho máximo da pilha é SEMPRE nove dados rolados.** Um monstro grau 6 com quatro Atributos desenvolvidos pode escolher dados pertinentes de até quatro Atributos, mas não rola 12 ou 18 dados na mesma ação.

| Grau | Máximo de Atributos usados na ativação | Dados rolados | Dados mantidos | Reserva local |
|---:|---:|---:|---:|---:|
| 1 | Em definição | 9 | 3 | 1P |
| 2 | Em definição | 9 | 3 | 2P |
| 3 | Em definição | 9 | 3 | 3P |
| 4 | Em definição | 9 | 3 | 4P |
| **5** | **3** | **9** | **4** | **5P** |
| **6** | **4** | **9** | **4** | **6P** |

**DEFINIDO:** monstros compram **d10 diretamente** nos Atributos a partir do grau 1 e seguem a **tabela de XP de Conhecimentos e Práticas**, sem usar a progressão humana de d6. O grau da ameaça não determina automaticamente seu XP.

| Grau do Atributo | Dados | XP acumulado |
|---:|---|---:|
| 0 | 1d4 | 0 |
| 1 | **1d10** | **2** |
| 2 | **2d10** | **8** |
| 3 | **3d10** | **20** |
| 4 | **2d10 + 1d12** | **38** |
| 5 | **1d10 + 2d12** | **66** |
| 6 | **3d12** | **102** |

Quatro Atributos grau 6 custam **408 XP**, antes do d20 permanente de **100 XP**; juntos, **508 XP**. **PENDENTE:** orçamento de XP total por grau da ameaça.

**DEFINIDO:** monstros têm **armadura natural**. **PENDENTE:** valores de integridade, multiplicadores por grau e se ela forma uma reserva corporal integrada ou separada. Não atribuir automaticamente uma barra de Vida extra de valor arbitrário. Para uma criatura que priorize esquiva, investir em Agilidade e Destreza.

## Exemplo de monstro para playtest nível 1 [EXPERIMENTAL]

**18 XP investidos em Atributos:** Força 2 (2d10; 8 XP), Agilidade 2 (2d10; 8 XP), Vigor 1 (1d10; 2 XP). Tem **Vida 5**, **DE 2** antes de modificadores e, numa investida pertinente de Força + Agilidade, pode **rolar 4d10 e manter dois dados naturalmente**.

| Defesa do jogador | Chance de acerto com Pavor permitido | Chance de acerto limpo |
|---|---:|---:|
| DE 3 | **83,11%** | **36,68%** |
| DE 4 | **56,95%** | **5,23%** |
| DE 5 | **24,84%** | **0%** |

Os valores são exatos para 4d10 com dois mantidos, crítico e uso de Antecipar. **A criatura precisa receber uma oportunidade de ataque**, e o Narrador pode escolher não manter Pavor para evitar conceder Coragem. O terceiro dado exige gasto e habilitação que podem não caber no teto local de **1P de um monstro grau 1**: não considerá-lo automático.

**Vida 5 não garante cinco ataques para morrer:** a integridade natural e a quantidade de Vida perdida por golpe ainda precisam de uma ficha fechada. Uma criatura pode sobreviver a muitos golpes fracos ou sucumbir antes sob danos corporais altos.

## D20 de monstruosidade permanente

**DEFINIDO:** uma criatura **de grau 6**, após alcançar pelo menos **um Atributo grau 6**, pode pagar **100 XP** para **converter permanentemente um dos d12 desse Atributo em d20**.

| Condição | Regra |
|---|---|
| Grau da ameaça | **6** |
| Pré-requisito de Atributo | Pelo menos **um grau 6** |
| Custo | **100 XP** |
| Compras permanentes | **Uma por monstro** |
| Resultado | **Substitui 1d12 por 1d20**, não adiciona dado |
| Teto por ativação | **3d20**, sendo só um comprado |

Os outros dois d20 possíveis na ativação dependem de elevações pagas com Pavor e de capacidades extraordinárias. A compra permanente **não** dispensa custos de ativação, dados mantidos, novos Atributos ou movimento.

**Exemplo:** um grau 6 desenvolve um Atributo com 3d12 pela tabela monstruosa definida (102 XP). Após a compra de 100 XP, a fonte oferece 1d20 + 2d12. O monstro forma uma pilha de até nove dados com os Atributos relevantes à ação, seleciona até quatro para manter e resolve somente esses símbolos.

## Pavor de ativação

| Recurso | Custo de referência |
|---|---|
| Ativação aprimorada | **1P** |
| Manter terceiro dado | **1P** |
| Manter quarto dado | **+1P** |
| Elevar um passo de dado | **1P por passo** |
| Combinar Atributo extra além das duas fontes básicas | **1P [EXPERIMENTAL]** |

**Não cobrar duas vezes pela mesma finalidade:** custos de ataque à distância, movimento e área podem integrar o custo de ativação apropriado. Em caso de dúvida, as características da ameaça e as regras de cenário definidas pelo SRD prevalecem; tabelas completas de poderes ainda são **PENDENTES**.

**A reserva do Narrador é pública.** O limite anterior de gastar apenas 1P público por oportunidade foi **REVOGADO**. A reserva pública continua com teto de **2 + número de jogadores** e serve para iniciar conflitos após falhas sucessivas, além de custear ações conjuntas com um **Líder**. Pagar Pavor não concede oportunidades extras por si só.

## Ações conjuntas de monstros

**DEFINIDO:** no máximo **três monstros ou chefes** podem participar, e pelo menos um deve possuir a característica **Líder**. Somam os resultados pertinentes **e o dano num único ataque**. O Narrador paga **3P de sua reserva pública instantaneamente**, sem substituir os custos individuais aplicáveis. O ataque ainda pode falhar.

**PENDENTE:** detalhamento de compartilhamento de símbolos e custos individuais quando a ativação é coordenada. O pagamento público de 3P agora pode acontecer numa oportunidade só; não descreva ações conjuntas como sempre disponíveis ou morte garantida.

Dano colossal exige, num **único ataque que atravesse toda a armadura**, pelo menos **3 × a Vida máxima** do alvo, podendo provocar morte instantânea. Não é o mesmo que somar ataques separados ao longo de turnos.

## XP e rank de encontro

Compare o **XP total dos inimigos** ao **XP total de todo o grupo**:

| XP dos inimigos versus XP do grupo | Recompensa pelo enfrentamento |
|---|---|
| Inferior | **0 XP** |
| Igual | Recompensa-base (**PENDENTE**) |
| Superior | Recompensa aumentada (**fórmula PENDENTE**) |

Dez inimigos de 80 XP somam 800 XP; quatro jogadores de 200 XP somam 800 XP. A comparação é entre **800 e 800**, não entre 80 e 200.

| Rank | Perigo aproximado |
|---|---|
| Aprendiz | Desgaste relativamente baixo |
| Perito | Oposição equilibrada |
| Elite | Grande exigência tática e risco |
| Divino | Desvantagem clara e risco extremo; recompensa grandiosa em XP e ouro |

Os ranks **não são calculados por XP isoladamente**. A classificação definitiva deve considerar chance real de acerto, dano após proteção, ferimentos, resistência, oportunidade de agir, Pavor, posição, retirada e ações conjuntas. As faixas e multiplicadores numéricos estão **PENDENTES**.

---

[Livro do Jogador](../livro-do-jogador/) · [SRD v0.19](../srd/) · [Análise de balanceamento](../balanceamento/) · [Perícias e Maestrias](../maestrias/)
