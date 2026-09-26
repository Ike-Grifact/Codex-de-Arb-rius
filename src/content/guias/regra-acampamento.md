---
title: "Regra de Campanha — Acampamento"
slug: "regra-acampamento"
description: "Especificação consolidada do módulo de Acampamento: sessão física, estruturas, refeição, segurança, Medicina, Repouso e Recuperação."
type: "guia"
status: "publicado"
visibility: "publico"
order: 6
tags:
  - acampamento
  - homebrew
  - playtest
  - medicina
  - saude
  - campeiros
updated: 2026-09-25
version: "SRD v1.10 — Parte XVIII"
origin: "homebrew-arborius"
exports:
  pdf: true
  markdown: true
  html: false
---

# REGRA DE CAMPANHA — ACAMPAMENTO
## Arquitetura, montagem, repouso e recuperação

> **Estado:** Acampamento é **homebrew em playtest**. Repouso Completo, Determinação, Tratamento Médico e Tempo de Recuperação preservam a base do Assimilação RPG onde indicado. Decisões específicas do Codex permanecem identificadas como tais.

> **Princípio:** o mapa é onde o Acampamento acontece. O painel resume e resolve decisões; ele não substitui a Scene.

Esta página complementa o [Guia do Jogador — Acampamento](/biblioteca/guia-jogador-acampamento/). Para Fome, Sede e Fadiga, consulte o [Guia do Jogador — Necessidades de Sobrevivência](/biblioteca/guia-necessidades-sobrevivencia/). O módulo de Acampamento não cria uma segunda trilha dessas necessidades.

---

# 1. Duas camadas de regra

O módulo reúne duas camadas:

- **Base:** Tratamento Médico, Repouso Completo, recuperação de Determinação e Tempo de Recuperação de Saúde;
- **Homebrew em playtest:** `campSession`, Tenda Arborizada, montagem coletiva, estruturas, alimentação proporcional, cuidado de Campeiros e integração com a Scene.

Acampamento cria condições para repousar e sobreviver. Ele **não concede Recuperação automaticamente**.

---

# 2. Grupo, Acampamento e Item-fonte

## Grupo

A Ficha de Grupo continua responsável por membros, Campeiros vinculados, Jornada, logística agregada, visão de inventários e lista de Acampamentos ativos.

Ela **não possui** as estruturas, ingredientes ou ocupantes do Acampamento.

## `campSession`

Cada Acampamento é uma sessão própria, aqui chamada de `campSession`.

Ela registra Scene, ponto físico, participantes, Campeiros presentes, abrigos, estruturas, preparação, alimentos e água comprometidos, estado de refeição, horas de repouso e condições para Recuperação.

Um mesmo Grupo pode manter **mais de um Acampamento ativo na mesma Scene**.

## Item-fonte

Equipamentos e alimentos continuam pertencendo aos Actors que realmente os carregam.

O Acampamento **referencia o Item original**. Não duplica Tendas, ferramentas, alimentos, itens Medicinais ou equipamentos de Campeiro.

---

# 3. Criando um Acampamento na Scene

Fluxo padrão:

1. o Infectado escolhe uma Tenda elegível;
2. posiciona o ícone de Tenda na Scene;
3. o sistema cria ou associa uma `campSession`;
4. o ponto colocado se torna a âncora clicável do Acampamento;
5. clicar no ponto abre a Ficha de Acampamento.

Ao posicionar uma nova Tenda, escolha:

- **Unir a um Acampamento existente**; ou
- **Criar Acampamento separado**.

Sessões separadas mantêm preparação, Fogueira, refeição, segurança, abrigo, cuidado de Campeiros e conclusão próprios.

Estruturas de sessões diferentes não são compartilhadas automaticamente.

---

# 4. Tenda Arborizada e abrigo

Cada Tenda possui:

> **2 vagas de abrigo**

Cada corpo ocupa 1 vaga:

- Infectado = 1;
- Campeiro = 1.

A Tenda exige **{{sucesso:1}} para ser montada**.

Duas ou mais Tendas podem formar um **Abrigo Conjunto**, somando vagas sem fundir os Items-fonte.

A Tenda não é obrigatória em toda situação. Quando clima, exposição ou terreno tornarem abrigo materialmente necessário, uma solução adequada pode ser Tenda, construção, ruína segura, abrigo natural ou outra solução aceita pelo Assimilador.

---

# 5. Montagem mínima

Defina:

> **N = número de Infectados participantes da sessão**

O Acampamento se torna **Funcional** quando o grupo investe:

> **N {{sucesso}} em elementos concretos**

Campeiros **não aumentam N**.

Conta em N todo Infectado participante que pretende permanecer, repousar ou ser sustentado naquele Acampamento, inclusive se estiver ferido, exausto, sendo tratado ou incapaz de contribuir normalmente.

Não existe cota individual. Os Sucessos são coletivos.

Cada {{sucesso}} válido precisa ser investido em algo real, como Tenda, Fogueira/Refeição, Leitos, Perímetro + Camuflagem, Cuidado dos Campeiros ou Abrigo de Campeiros.

O mesmo {{sucesso}} conta uma única vez para o componente e para a montagem mínima até N.

Atingir N não garante automaticamente comida, água, abrigo, Leitos, segurança, Medicina, Repouso Completo ou Recuperação.

---

# 6. Rolagens de montagem

Quando houver incerteza real, o Acampamento usa o **pipeline normal de rolagem**.

A Aptidão depende da abordagem ficcional.

- {{sucesso}} representa progresso e concretização;
- {{adaptacao}} adapta material, posição, ferramenta, cobertura ou abordagem;
- {{pressao}} gera Pressão: atraso, ruído, desperdício, exposição, ferimento, instabilidade ou dano coerente.

{{pressao}} não danifica Equipamento automaticamente. Se a consequência atingir Equipamento, use Qualidade e Pressão pelas regras normais.

O sistema não deve criar um botão abstrato de “adicionar A”.

---

# 7. Componentes do Acampamento

| Elemento | Investimento | Benefício principal |
|---|---:|---|
| Tenda | {{sucesso:1}} por unidade | 2 vagas de abrigo |
| Leito improvisado | 1/2/3 {{sucesso}} | Funcional / Intermediário / Eficiente |
| Fogueira & Refeição | 1/2/3 {{sucesso}} | preparo / eficiência / segunda refeição |
| Perímetro + Camuflagem | 1/2/3 {{sucesso}} | proteção progressiva |
| Cuidado dos Campeiros | 1/2/3 {{sucesso}} | cuidado / bônus / benefício especial |
| Abrigo de Campeiros | {{sucesso:1}} por até 2 | proteção física |

## Leitos

Cada unidade atende até 2 corpos.

- **1A:** Leitos utilizáveis;
- **2A:** +{{sucesso:1}} na primeira rolagem de cada ocupante após Repouso Completo válido;
- **3A:** além do anterior, o primeiro gasto de 1 Ponto de Determinação de cada ocupante não consome o ponto.

## Perímetro + Camuflagem

- **1A:** aviso/cobertura básica;
- **2A:** aviso antecipado mais confiável;
- **3A:** pode dispensar revezamento de vigília para fins de Repouso Completo quando a ficção permitir.

Isso não impede invasões nem anula Ameaças.

## Cuidado dos Campeiros

- **1A:** cuidado adequado aos Campeiros efetivamente atendidos;
- **2A:** +{{sucesso:1}} na primeira rolagem própria após o Acampamento;
- **3A:** uma vez antes do próximo Acampamento, manter 1 dado adicional ou realizar 1 Rolagem Assimilada conforme a regra de campanha vigente.

Cuidado não substitui alimento, água ou abrigo.

---

# 8. Fogueira, refeição e comida preparada

A Fogueira pode existir como subobjeto da `campSession` e aceitar ingredientes por Drag & Drop.

Arrastar alimento **reserva** quantidade. Não consome imediatamente o Item.

Para uma refeição adequada de Repouso:

> **1 porção humana por Infectado alimentado**

mais:

> **2 ingredientes alimentares distintos**

Temperos, ervas e condimentos não substituem porção nem contam como um dos dois ingredientes mínimos.

## Graus

### 1A — Funcional

A refeição válida é preparada e consome normalmente seus ingredientes.

### 2A — Intermediária

Depois de validar todos os requisitos, **1 unidade elegível de ingrediente comprometido não é consumida**.

### 3A — Eficiente

Além da refeição atual, produz uma **segunda refeição preparada** em quantidade equivalente às porções efetivamente servidas.

Ela:

- não devolve ingredientes crus;
- não pode multiplicar recursivamente a receita;
- ocupa inventário;
- pode ser deixada no Acampamento;
- pode estragar quando a ficção justificar.

> **Pendente:** a quantidade exata de Determinação recuperada por Repouso Curto ainda não foi formalizada. O CAMP não cria esse valor.

---

# 9. Hidratação

Para fechar um Repouso Completo:

> **1 unidade de hidratação humana por Infectado**

A unidade é abstrata e pode vir de cantil, Item, reserva apropriada ou fonte local validada.

Investir {{sucesso}} na montagem não cria água.

---

# 10. Campeiros

Para Repouso Completo equino:

> **1 ração equina + 1 unidade de hidratação equina por Campeiro**

Quando possível, o Campeiro deve ser descarregado de carga pesada.

Ele pode ocupar vaga de Tenda, Abrigo Conjunto, Abrigo de Campeiros ou permanecer ao ar livre quando o clima permitir.

Repouso equino completo com alimento, água e descarga reduz **Esforço em 3**, salvo efeito específico.

---

# 11. Segurança, vigília e horas pessoais

Repouso Completo exige boas condições de segurança.

A segurança pode vir de local naturalmente seguro, Perímetro + Camuflagem, alarmes, vigília, abrigo defensável, controle da área ou outra solução ficcional.

Quando Perímetro + Camuflagem chega a **3A — Eficiente**, o grupo pode dispensar o revezamento de vigília se não houver Ameaça ativa ou condição que torne isso impossível.

O Repouso Completo exige:

> **8 horas pessoais de repouso**

Portanto, atividade incompatível durante a sessão reduz as horas pessoais efetivamente descansadas.

Exemplo: sessão de 10h com 2h de vigília → 8h de repouso pessoal.

---

# 12. Tratamento Médico

**Regra-base resumida.**

Tratamento Médico usa Medicina com Instinto coerente e paciente declarado antes da resolução.

Tratamento não recupera Saúde imediatamente. Ele altera o Nível considerado **somente para Tempo de Recuperação**.

- cada {{sucesso}} melhora a categoria considerada em 1;
- cada {{pressao}} piora a categoria considerada em 1;
- {{adaptacao}} não possui efeito automático de Tratamento Médico na regra-base.

A ficha preserva separadamente:

- Nível real de Saúde;
- Nível efetivo para Tempo de Recuperação.

Novo dano real invalida o tratamento vigente.

S1 e S2 só entram em recuperação natural se o tratamento elevar o Nível efetivo a S3 ou superior.

Tratamentos sucessivos a partir do Nível efetivo atual são uma decisão **homebrew em playtest** do sistema.

---

# 13. Repouso Completo e Determinação

**Base preservada:**

Repouso Completo requer:

- 8 horas;
- boas condições de alimentação;
- hidratação;
- segurança.

Quando clima ou exposição tornarem abrigo necessário, ausência de proteção adequada impede condições ideais.

Ao completar Repouso em condições ideais:

> **recupere 1 + Resolução Pontos de Determinação**

sem ultrapassar o máximo atual.

Regras específicas de Linhagem prevalecem; o Lucker, por exemplo, usa sua Recuperação Predatória em vez da recuperação automática comum.

---

# 14. Recuperação de Saúde

| Nível considerado | Tempo |
|---|---|
| S6–S5 | Repouso Completo |
| S4–S3 | uma semana |
| S2–S1 | não se recupera naturalmente |

Para personagens tratados, use o Nível efetivo para Tempo de Recuperação.

## Quantidade recuperada

A decisão vigente do Codex/sistema é:

> **Potência + 1 Pontos de Saúde por ativação de Recuperação**

Essa decisão permanece **em revisão**, porque o livro-base contém texto conflitante em outro trecho.

Se o personagem possui Recuperação Rápida, recebe ainda **+2 Pontos de Saúde** quando a Recuperação é ativada.

O Acampamento pode registrar boas condições, mas não transforma uma única noite em Recuperação semanal para S4/S3.

---

# 15. Conclusão da `campSession`

Ao concluir a sessão, o Assimilador:

1. encerra novas alterações;
2. resolve refeições e consumos reservados;
3. confirma hidratação;
4. confirma segurança;
5. confirma abrigo quando necessário;
6. calcula horas pessoais de repouso;
7. resolve cuidado dos Campeiros;
8. aplica Recuperação de Determinação quando elegível;
9. chama Recuperação de Saúde quando elegível;
10. registra a sessão como concluída.

Múltiplos Acampamentos podem ocorrer no mesmo intervalo temporal. O relógio do mundo avança **uma única vez** para esse intervalo.

Nunca aplique `+8h` separadamente para cada `campSession` que aconteceu ao mesmo tempo.

---

# 16. Contrato conceitual para o VTT

O ponto principal da Scene usa o ícone de Tenda, abre a Ficha de Acampamento e referencia a `campSession` e o Item-fonte da Tenda quando houver.

A Fogueira pode ser colocável na Scene, pertencer à sessão, abrir diretamente o painel de refeição e aceitar Drag & Drop de ingredientes.

Drops devem referenciar a fonte original por identificadores como Actor/Item UUID e quantidade comprometida. **Reserva não é consumo.**

A construção continua usando o pipeline normal de rolagem com contexto de Acampamento. Não deve existir uma segunda engine de dados.

Estrutura conceitual mínima:

```text
campSession
  id
  sceneUuid
  groupUuid?
  anchorPlaceableUuid
  startedAt
  plannedDuration
  status

  participants[]
  campers[]
  shelterUnits[]
  assembly
  components[]
  meal
  hydration[]
  camperCare[]
  personalRestHours[]
```

A estrutura exata de dados deve seguir a implementação real do sistema; este bloco é contrato conceitual, não obrigação de nomes internos.

---

# 17. O que permanece pendente

Dois pontos continuam deliberadamente abertos:

1. **Repouso Curto:** a quantidade exata de Determinação recuperada ainda não foi formalizada; a Refeição Preparada apenas sustenta o requisito alimentar desse futuro subsistema.
2. **Quantidade de Saúde recuperada:** o Codex usa **Potência + 1** por ativação até errata ou decisão expressa, mantendo a marca de revisão.

Também permanece pendente de playtest o custo temporal/exaustivo para um mesmo Infectado realizar trabalho adicional além de sua contribuição normal. O sistema não deve permitir rolagens gratuitas infinitas para completar todos os componentes.
