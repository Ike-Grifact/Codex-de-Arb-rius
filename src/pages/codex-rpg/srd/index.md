---
layout: ../../../layouts/CodexRpgLayout.astro
title: Codex RPG — SRD de Continuidade v0.22
description: Regras recentes de d20, sete graus, Coragem e PP, dano elemental, XP e estudos de armaduras e conflitos.
---

# SRD de Continuidade v0.22 — resumo normativo

*9 de novembro de 2026 · decisões confirmadas e parâmetros experimentais separados.*

[**Baixar o SRD v0.22 integral em Markdown**](../../downloads/codex-rpg/Codex_RPG_SRD_Continuidade_v0.22_2026-11-09.md) — seção 0-F atual com as decisões recentes, estudos de integridade/XP e o histórico integral das versões anteriores.

[Consultar a versão anterior v0.21](../../downloads/codex-rpg/Codex_RPG_SRD_Continuidade_v0.21_2026-11-09.md).

**Precedência:** decisão recente do autor → **seção 0-F da v0.22** → seção 0-E histórica → histórico anterior. O Livro do Jogador v0.5 ainda possui trechos desatualizados; **não foi alterado nesta publicação**.

| Estado | Significado |
|---|---|
| **DEFINIDO** | Decisão expressa do autor |
| **EXPERIMENTAL** | Número, composição ou procedimento em playtest |
| **PROPOSTO** | Alternativa apresentada, ainda não aprovada |
| **PENDENTE** | Requisito ou interpretação a finalizar |

## 1. Progressão, Graus e acesso aos d20

**DEFINIDO:** Armas e Conjuração possuem **sete Graus de acesso**, e **Grau 7** libera fontes extraordinárias de d20 mediante os requisitos de compra. O equipamento não entrega dados gratuitamente. Os graus intermediários 1–6 e seus níveis exatos ainda exigem a tabela definitiva.

| Marco | PP máximos | Capacidade extraordinária |
|---|---:|---|
| Nível 1–4 | 0 | Formação e especialização inicial |
| **Nível 5** | **1** | Primeiros usos especiais |
| **Nível 10** | **2** | **Primeiro d20** via arma, punhos especializados ou magia de Grau 7; Talento Perícia em Coragem |
| **Nível 20** | **3** | **Segundo d20** por conversão de um dado de Atributo, mediante Maestria de 100 XP e **2 PP** |

**Seis Maestrias de conversão:** uma para cada Atributo (Força, Agilidade, Destreza, Inteligência, Influência, Vigor). Requerem **100 XP já investidos em Perícias**, Atributo-chave em **grau 6**, requisitos de especialização e **mais 100 XP para adquirir cada Maestria**. Os 100 XP prévios são requisito acumulado, não taxa repetida. Pode comprar várias Maestrias, mas **somente uma conversão de Atributo por ação**. Jogadores regulares mantêm no máximo **2d20 na mesma ação**; carregar várias armas não multiplica esse limite. **Três d20 pós-Desafio Divino** mediante Maestria de Conhecimento/Prática permanecem **PROPOSTOS**.

**Composição:** **d12 = 3 pontos**, **d20 = 10 pontos**. Assim, **3d12 = 9 pontos**; **1d20 = 10 pontos**. Arma com 3d12 ou 1d20 ocupa **3 unidades Alto** no inventário. Golpes de Monge compram seus dados e exigências corporais, mas não ocupam carga como arma física. Focos físicos de magias contam na carga quando utilizados; elementos provenientes do ambiente não exigem o foco correspondente.

**Capacidade em Altos:** 1 + piso(Força/3) + piso(Vigor/3) + piso(Armas/3) + piso(Atletismo/3). Peso de composição não é automaticamente peso real. As cinco **categorias de armadura** são independentes dos sete Graus de Armas/Conjuração.

## 2. Coragem, PP e Cavaleiro do Terror

**DEFINIDO:** o Talento passivo **Perícia em Coragem** é recebido automaticamente no nível 10 e permite converter **2 Coragens em 1 PP**, no máximo **uma conversão por turno**, sem elevar a reserva máxima. Coragem continua servindo para **manter mais um dado** ou **elevar passo permitido**, além das aplicações defensivas; **1A**, não Coragem, anula normalmente 1P próprio. O teto geral permanece **nove dados rolados e quatro mantidos** (sempre ao menos um de Atributo).

**Cavaleiro do Terror:** pode converter **2P da própria reserva de Pavor em 1 PP**, uma vez por turno. **Transfere exatamente 2P** pelo gasto, **nunca 4P**. Os Pavor que mantiver e não anular na rolagem são contabilizados **à parte**. Mantém reserva própria até 10P e limite pessoal de Coragem 1. Ordem precisa e momento da transferência são PENDENTES de redação operacional.

Outras recuperações de PP aprovadas continuam: Perícia de troca válida de tipos diferentes de armas (até três vezes por combate), Conjurador Versátil (três magias diferentes bem-sucedidas) e Sorte Mágica (crítico mágico bem-sucedido). Recuperações respeitam os tetos de PP.

## 3. Êxitos de Perícias, Pavor e dano

**DEFINIDO:** cada Perícia que acrescente E concede **no máximo +1E**, mediante sua condição; o **teto é +2E acumulados de Perícias por ação**, mesmo com três ou mais Perícias elegíveis. Os E adicionados **contam para DE e dano**, salvo texto especial que restrinja uso. Êxitos rolados ou gerados por 2A→1E não são cortados por esse teto.

**Dano básico:** E total + piso(P não anulado/2). Pavor residual ainda circula às reservas inimigas mesmo quando não entra no dano. **Acerto Puro** alcança DE com zero P residual; **Acerto Normal** com P residual ≤E; **Acerto com Pavor predominante** quando P>E. Um ataque com Pavor não equivale a um acerto sem risco.

## 4. Elementos e conjuração combinada

**DEFINIDO:** a **ordem dos dois elementos define o principal e o secundário**. Para adicionar o segundo elemento, com a Perícia/habilitação apropriada, é necessário **gastar 1A**, consumindo-o sem reutilização; máximo de **dois elementos na mesma magia**. Mestre Elementalista continua concedendo +1A e habilitando criar segundo elemento conscientemente. Improviso Mágico depende da fonte elemental existente na cena.

| Defesa/vulnerabilidade do alvo | Dano por Êxitos | Dano de Pavor |
|---|---|---|
| Sem defesa específica | Normal | Normal |
| Resistente somente ao secundário, principal sem defesa | Normal | Normal |
| Resistente **aos dois elementos** | **Metade** | **Ignorado** |
| Imune **ao elemento principal**, não ao secundário | **Metade** | **Ignorado** |
| Imune **aos dois elementos** | **Zero** | **Zero** |
| Vulnerabilidade válida e explorada | **Dobro** | Normal, salvo outra regra |

O dobro **não aumenta Êxitos para superar DE**. O arredondamento da metade e casos de resistência só ao principal ou sobreposições com vulnerabilidade permanecem PENDENTES.

**Identidade dos elementos:** não existe cancelamento natural universal entre opostos. Elementais podem ser imunes ao próprio elemento, e fraquezas naturais requerem misturas apropriadas: exemplos autorais incluem **Fogo + Ar/Terra contra Água**; **Água + Ar/Terra contra Fogo**; **Água + Terra contra Ar**. Relações completas com Terra e Raio ainda PENDENTES. **Sagrado ↔ Trevas** têm vulnerabilidade mútua, com dobro do dano de E; **Veneno e Psique** não têm fraqueza universal.

**Magia Grau 7 com um d20:** pode ser acessada no nível 10 mediante requisitos. No nível 20, **2 PP** convertem um dado de Inteligência para o segundo d20. **Sem ativar Especialidade Elemental**, a conjuração combinada pode ser um ataque de **alvo único com dano básico**, sem efeitos especiais. **+1 PP na Especialidade**, totalizando **3 PP com conversão**, ativa efeitos habilitados como dano especial, alcance em área e movimento, que podem atingir aliados. Um exemplo é a grande tempestade de **Fogo + Ar**; a dimensão de “16 × 16” citada no design **não está homologada como raio**. **Tecelão Arcano foi descartado**. Exigir a Especialidade para a vulnerabilidade ×2 de misturas naturais ainda é PENDENTE.

**Fogo avançado** pode atingir integridade e Vida, com o limite geral de **até 3 Vida por ataque não colossal**. O processamento de dano misto (físico + elemental ou integridade + Vida) ainda necessita procedimento final.

## 5. Tabela de XP — EXPERIMENTAL

**XP livre e sem reset da build**: evolução futura pode corrigir escolhas; d20 não é obrigatório para participar do jogo. **19 XP de criação** ainda são hipótese. Para testes, a curva **EXPERIMENTAL** considera **235 XP acumulados no nível 10 e 664 XP no nível 20** (substitui como hipótese de trabalho a referência histórica de 561 XP).

| Nível | XP acumulado | Nível | XP acumulado |
|---:|---:|---:|---:|
| 1 | 19 | 11 | 271 |
| 2 | 31 | 12 | 309 |
| 3 | 46 | 13 | 349 |
| 4 | 64 | 14 | 391 |
| 5 | 86 | 15 | 434 |
| 6 | 110 | 16 | 478 |
| 7 | 137 | 17 | 523 |
| 8 | 167 | 18 | 569 |
| 9 | 200 | 19 | 616 |
| 10 | 235 | 20 | 664 |

Atributo 6 custa **55 XP**; Conhecimento/Prática 6 custa **102 XP**, segundo tabelas de compras vigentes. **Os preços da composição de Grau 7 e as compras completas de especialidades permanecem PENDENTES**; estes XP ainda não demonstram que toda build de primeiro/segundo d20 cabe automaticamente no Marco desejado.

## 6. Integridade das armaduras — EXPERIMENTAL

A armadura absorve dano até esgotar sua **integridade própria**, então o excedente atinge a Vida; falhas **não desgastam** a armadura. A integridade **não é calculada pela DE da ficha**. Perfuração especial habilitada pode ignorar a integridade ao atingir a DE.

| Categoria | Básica | Aprimorada | Lendária | Propriedade |
|---|---:|---:|---:|---|
| Muito Leve | 0 | 0 | 0 | Mobilidade/DE |
| Leve | 0 | 0 | 0 | Mobilidade/DE — integridade zero ainda experimental |
| Média | 8 | 16 | 24 | Uma resistência |
| Pesada | 16 | 36 | 64 | Duas resistências |
| Extrema | 24 | 56 | 80 | Uma imunidade específica |

**Números não aprovados:** a categoria Leve poderia possuir integridade pequena conforme histórico, ainda divergente. Definir qualidade, custos, materiais e resistência efetiva por tipo exigirá confronto real com **1d20 e 2d20**, vulnerabilidade ×2, +2E condicionais, magias em área e perfuração.

**Vida:** o ataque não colossal retira no máximo **3 Vida**, após a proteção; o colossal exige **3 × Vida máxima** em dano corporal num único ataque após ultrapassar integridade. Ataque de área acertado contra alvos separados pode afetar cada ficha; contra monstro composto de ficha única, dano em área ocorre **uma vez**, não por cabeça.

## 7. Conflitos e próximos testes — EXPERIMENTAL

Não classificar confronto **somente por chance de acerto**. Medir os quatro dados mantidos mediante Coragem, elevação de passos, PP gastos/recuperados, riscos por Pavor, proteção, posicionamento e duração em rodadas:

| Faixa | Referência de pressão |
|---|---|
| Fácil | Poucos gastos de Coragem, risco baixo |
| Normal | Uso estratégico de Perícias e 1–3 Coragens em ações relevantes; ferimentos controláveis |
| Difícil | PP e Coragem frequentes, riscos significativos de incapacidade/morte |
| Extremo/Divino | Confronto potencialmente letal em poucos turnos; exige preparo, cooperação e uso intenso dos recursos |

Os custos **não são cobranças obrigatórias** por dificuldade. Comparar **Acerto Puro, Acerto Normal, Acerto com Pavor predominante, falhas, dano por alvo, Pavor gerado, recuperação líquida de Coragem/PP, sobrevivência, integridade restante e tempo para vitória**. Tabelas antigas baseadas em 3d20 mantidos por jogador não representam PJs normais de nível 20.

O **d20 reforçado, candidato G**, continua sendo a escolha **EXPERIMENTAL** para testes com **DE máxima 30**, não nova tabela oficial de faces. O [SRD v0.22 integral](../../downloads/codex-rpg/Codex_RPG_SRD_Continuidade_v0.22_2026-11-09.md) contém a tabela completa e a lista de pendências. Não consolidar integridades e probabilidades antes de cenários reproduzíveis.

## 8. Paleta de símbolos — DEFINIDO

| Símbolo | Runa | HEX |
|---|---|---|
| **Êxito** | ᛋ Sowilo | **#267A45** |
| **Antecipar** | ᚨ Ansuz | **#2369BB** |
| **Pavor** | ᚦ Thurisaz | **#542176** |

---

**Este resumo apresenta a seção 0-F da v0.22.** A v0.21 e as versões anteriores permanecem acessíveis como histórico; quando um texto antigo conflitar com o novo, vale a decisão autoral mais recente.
