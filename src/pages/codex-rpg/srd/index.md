---
layout: ../../../layouts/CodexRpgLayout.astro
title: Codex RPG — SRD de Continuidade v0.20
description: Resumo normativo das decisões atuais, divergências históricas e pontos pendentes.
---

# SRD de Continuidade v0.20 — resumo normativo

*8 de novembro de 2026 · referência para o Livro do Jogador v0.5.*

[**Baixar o SRD v0.20 integral em Markdown**](../../downloads/codex-rpg/Codex_RPG_SRD_Continuidade_v0.20_2026-11-08.md) — inclui as decisões atuais e o histórico técnico preservado.

Este resumo serve para consultar **as mudanças aprovadas em relação às versões antigas**. A compilação técnica integral v0.20 preserva a v0.18 e as versões anteriores como histórico, sem torná-las novamente vigentes.

**Precedência:** decisão autoral mais recente → seção **0-D da v0.20** → seção **0-C da v0.19** → seção 0-B da v0.18 → atualização da v0.17 → histórico anterior.

| Estado | Significado |
|---|---|
| **DEFINIDO** | Regra explicitamente aprovada |
| **EXPERIMENTAL** | Valor ou procedimento adotado para playtest |
| **PROPOSTO** | Hipótese sob discussão |
| **PENDENTE** | Lacuna sem decisão autoral |

## Atualização de profissões e equipamentos [v0.20]

**DEFINIDO:** PP globais **0/1/2/3** nos níveis **1/5/10/20**; recuperam-se fora de combate na troca de cena. Ativações comuns **1 PP**, conversão extraordinária de Inteligência em d20 **2 PP**. Coragem não é substituída.

**DEFINIDO:** crítico exige **todas as faces máximas dos dados efetivamente mantidos**, convertendo seus símbolos em E. Efeitos de arma exigem acerto. Bônus antigo +1E/+1Coragem **PENDENTE**. Antecipar não concede turnos repetidos por rodada.

**DEFINIDO:** Cavaleiro do Terror absorve Pavor dos aliados (teto **10P**, Coragem própria **1**), gasta como Coragem e gera **+1P por ponto gasto após a rolagem**, sem conversão pelo crítico. Clérigo Acalmador reserva Êxitos para neutralizar consequências de Pavor de aliados próximos (**1E para 1P**, preservando P para DE); a proteção expira **ao fim da rodada**.

**DEFINIDO:** Ladino pode usar **1E de falha para fugir**; mais E melhoram fuga/ocultação. Busca ativa de oculto exige **todas as faces numéricas mantidas, inclusive repetições**; distância impõe desvantagem até **Absoluta**. Ocultação mágica depende de Inteligência, Conjuração e elemento disponível; nova ocultação por 1 PP na sequência **PROPOSTA**.

**DEFINIDO:** Sangramento é abertura para acesso ao sangue, **não dano por tempo**. Contenção Hemomântica **1 PP**, usa sangue do aliado e neutraliza **E/E, P/P, E convertido de 2A/E**, reduzindo o dano; cura especial **1 PP** testa DE correspondente ao dano. **Todo Pavor mantido em contenção, inclusive o gasto neutralizando, é transferido aos inimigos**, com tetos normais.

**DEFINIDO:** habilitações elementais **Sagrado 6 XP, Trevas 5 XP, Sangue 4 XP, Psique 3 XP**, separadas das Perícias e dos requisitos de grau. Magias maiores ocupam espaço proporcional ao grau; escala exata de slots **PROPOSTA**.

**DEFINIDO como direção:** cortantes causam Sangramento, perfurantes podem ignorar armadura atingindo até **3 Vida** em ataque não colossal, pesadas derrubam e longas oferecem Antecipar no crítico; dependem de acerto, Perícias e imunidades. **PROPOSTAS:** misturas de propriedades (machado, faca, lança pesada de duas mãos sem escudo com opção de empurrar/perfurar); armas de fogo ainda em concepção. Armaduras e XP por Marco **não foram recalculados**.

Consulte a **seção 0-D do SRD integral** e o Livro do Jogador v0.5 para procedimentos, limites e pendências.

## Atualização de criação e monstros [DEFINIDO]

**XP inicial de Perícias:** **5 XP**, substituindo a antiga referência de 3 XP. O exemplo de comparação com **14 XP de Base/Formação + 5 XP de Perícias = 19 XP por Aprendiz** é uma hipótese de orçamento para o playtest, ainda sujeita a validação quanto à adição ou redistribuição.

**Monstros não humanoides compram d10 diretamente nos seus Atributos** e seguem a tabela de Conhecimentos e Práticas:

| Grau | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| Dados | 1d4 | 1d10 | 2d10 | 3d10 | 2d10+1d12 | 1d10+2d12 | 3d12 |
| XP acumulado | 0 | 2 | 8 | 20 | 38 | 66 | **102** |

Quatro Atributos monstruosos no grau 6 custam **408 XP**; com o d20 comprado por 100 XP, **508 XP**. **A resistência natural dos monstros já está na Vida máxima [DEFINIDO]**, sem segunda barra de armadura ou multiplicador por grau. Criaturas não pequenas têm Vida-base 3, com `Vida = 3 + Vigor + ⌊Força/2⌋`. Com Vigor 6 e Força 6, são **12 Vida**; com a compra única de d20 permanente em Vigor, **13 Vida**. Os limiares de colossal são respectivamente **36** e **39 de dano corporal**. A Vida-base das criaturas pequenas permanece **PENDENTE**. **A DE natural também cresce com Agilidade e Destreza**, pela fórmula `Agilidade + ⌊Destreza/2⌋`. A faixa de XP por grau de ameaça também está pendente.

**Playtest inicial [ANÁLISE]:** um monstro de 18 XP (Força 2, Agilidade 2, Vigor 1) oferece **4d10**, Vida 5, DE natural 2. Mantendo dois dados, tem **56,95%** de acerto possível contra DE 4, mas só **5,23%** de acerto limpo. Isso não contabiliza oportunidades de ativação, Pavor local nem eventual armadura equipada.

## 1. Resolução e protagonistas

**DEFINIDO:** as runas representam **Êxito (E), Antecipar (A) e Pavor (P)**. Nenhum dado descartado gera símbolos ou consequências. Até nove dados podem ser rolados, e o limite absoluto de retenção é quatro. Antecipar: 1A anula 1P; 1A passa oportunidade ao aliado sem anular P; 2A viram 1E.

Pavor mantido não anulado pode integrar DE e dano **e ainda alimentar a reserva adversária**. Inimigos que mantêm Pavor geram Coragem **para o alvo atacado ou os aliados mais próximos**, inclusive quando acertam. A reserva do Narrador é pública e **não possui mais limite geral de 1P por oportunidade**.

### Marcos, Coragem e retenção [DEFINIDO]

Níveis 1–5 mantêm **2 dados naturalmente**, ou **3 pagando 1 Coragem**. A partir do nível 6, mantêm **3 naturalmente**, ou **4 pagando 1 Coragem**. Marcos III e IV representam avanço de poder e repertório, sem nova ampliação automática de retenção.

## 2. Equipes e combate

**DEFINIDO:** até três participantes por ação conjunta **dos dois lados**; símbolos pertinentes e **dano** compõem um único ataque. Jogadores cooperam sem pagar Pavor. A ação conjunta inimiga exige **ao menos um Líder participante** e o pagamento **instantâneo de 3P públicos do Narrador**. **PENDENTE:** detalhes de compartilhamento de símbolos e ativação.

**DEFINIDO:** Vida máxima = 3 + Vigor + piso(Força ÷ 2). DE defensiva = Agilidade + piso(Destreza ÷ 2). Armadura absorve sua integridade antes de qualquer dano corporal. Ataque não colossal retira **até 3 Vida**; **9 de dano corporal retiram 3 Vida**. Um único ataque com dano corporal **≥ 3 × Vida máxima** provoca **morte colossal instantânea**, mesmo existindo teto geral de 3 Vida.

**DEFINIDO:** dano calculado = **E + piso(P não anulado ÷ 2)**, e a distribuição das faixas de Saúde coloca sobras primeiro nas faixas mais saudáveis (**4 → 2/1/1**, **5 → 2/2/1**). **EXPERIMENTAL:** escala intermediária de perda de Vida; armaduras leve +1DE, média +0DE, pesada +0DE com Força+Vigor≥9 ou −2DE abaixo; proporção de integridade 1:2:4; Resistência maior. **PROPOSTO:** reforçar esquiva leve, adicionar esquiva a médias superiores e remover uma resistência média.

### Composição de dados [DEFINIDO]

Armas, ferramentas especiais e magias podem acrescentar dados rolados conforme seus tetos de **peso** (foco elemental não é dado). Toda a pilha continua limitada a **nove rolados**.

| Dado | d4 | d6 | d10 | d12 | d20 |
|---|---:|---:|---:|---:|---:|
| Peso | 0,5 | 1 | 2 | 3 | **6** |

**Armas pesadas:** grau 2 = **peso 3**, grau 3 = **5**, grau 4 = **7**. Para incluir d20 é necessário também estar habilitado a usá-lo.

## 3. Monstros, XP e equipamentos

**DEFINIDO:** grau 5 usa até **3 Atributos** na ativação, grau 6 até **4**, mas ninguém rola mais de **9 dados**. Graus 5/6 podem manter até quatro dados pagando os custos apropriados. Animal ou montaria com ficha pode equipar armadura.

**DEFINIDO:** monstro grau 6, com ao menos um Atributo no grau 6, pode gastar **100 XP** para converter permanentemente **1d12 desse Atributo em 1d20**. **Uma compra por criatura.** Até **3d20 por ativação**, dos quais no máximo um é comprado; demais exigem elevação e Pavor. **PENDENTE:** orçamento total por grau de monstro.

## 4. Magia e ritual

**DEFINIDO:** focos fornecem **elementos disponíveis, não dados extras**. Água ausente num vulcão impõe **Desvantagem Absoluta** à magia de Água; Sangramento disponibiliza sangue mesmo sem dano prévio à Vida.

Não há magia comum de cura de Vida; Hemomante é exceção especializada. Ressurreição exige **até 7 dias**, corpo vitalmente íntegro, **Trevas + Sagrado + Psíquico + Sangue**, três conjuradores, **2d20 por conjurador**, **4 dados mantidos por conjurador (12 no total)**, **DE 30** e **Êxitos maiores que Pavor**; Antecipar pode anular Pavor. **PENDENTE:** obtenção completa dos d20 e resolução de falhas repetidas.

## 5. Missões e recompensa

**DEFINIDO:** comparar **a soma de XP de todos os inimigos** à **soma de XP dos jogadores**. Se inimigos tiverem XP inferior, o enfrentamento não rende XP; igualdade dá elegibilidade à base; XP superior permite recompensa maior. **PENDENTE:** fórmulas de distribuição.

**DEFINIDO:** os ranks agora são **Aprendiz, Perito, Elite, Divino**; a missão Divina costuma colocar o grupo em clara desvantagem e admite recompensa extraordinária em ouro e XP. **PENDENTE:** limiares, multiplicadores e cálculo de risco real.

---

Este resumo **não substitui o Livro do Jogador como guia didático**. Consulte também o [estudo experimental de balanceamento](../balanceamento/). Consulte [Livro do Jogador v0.4](../livro-do-jogador/), [fichas de Perícias e Maestrias](../maestrias/) e [guia de monstros](../bestiario/).
