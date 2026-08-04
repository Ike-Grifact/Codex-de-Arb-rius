---
title: "Guia do Jogador — Necessidades de Sobrevivência"
slug: "guia-necessidades-sobrevivencia"
description: "Regras de Fome, Sede e Fadiga ligadas ao relógio da campanha, à Saúde e à Recuperação."
type: "guia"
status: "publicado"
visibility: "publico"
order: 2
tags:
  - sobrevivencia
  - alimentacao
  - agua
  - playtest
  - regeneracao
  - campeiros
  - animais
updated: 2026-08-04
version: "Playtest 0.1"
origin: "homebrew-arborius"
exports:
  pdf: true
  markdown: true
  html: true
---

# NECESSIDADES DE SOBREVIVÊNCIA
## Guia do Jogador

**Playtest 0.1 — Fome, Sede e Fadiga**

**Codex de Árborius — Assimilação RPG**

*Material não oficial. Requer o livro-base de Assimilação RPG.*

Este guia apresenta as regras usadas para acompanhar alimentação, hidratação e repouso durante viagens, exploração, recuperação e períodos prolongados de perigo.

O módulo utiliza o **tempo transcorrido dentro da campanha**. O relógio do Foundry registra horas e dias; por isso, pequenas mudanças de mapa ou transições breves entre Narrativa Fluida e Conflito não aumentam as necessidades por si mesmas.

> **Estado da regra:** este módulo está em playtest. Os intervalos podem ser ajustados depois de experiências em mesa.

<!-- PAGEBREAK -->

# 1. AS TRÊS NECESSIDADES

Cada personagem possui três trilhas, variando de **0 a 3**:

| Trilha | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| **Fome** | Alimentado | Faminto | Privado | Inanição |
| **Sede** | Hidratado | Sedento | Desidratado | Desidratação crítica |
| **Fadiga** | Descansado | Cansado | Exausto | Colapso |

Quanto maior o valor, pior é a condição.

As trilhas são atualizadas conforme o tempo desde:

- a última alimentação adequada;
- a última hidratação adequada;
- o último repouso completo;
- o momento em que o personagem despertou.

Satisfazer uma necessidade interrompe seu avanço, mas não recupera automaticamente a Saúde já perdida.

# 2. FOME

A Fome avança em períodos de **24 horas** sem alimentação adequada.

| Tempo sem alimentação adequada | Fome |
|---:|---:|
| menos de 24 horas | 0 |
| 24 a 47 horas e 59 minutos | 1 |
| 48 a 71 horas e 59 minutos | 2 |
| 72 horas ou mais | 3 |

Ao alcançar Fome 3, o personagem entra em **Inanição**.

O dano não ocorre imediatamente. O primeiro Ponto de Saúde é perdido ao completar:

> **96 horas sem alimentação adequada.**

Depois disso, perde-se:

> **1 Ponto de Saúde a cada 24 horas adicionais.**

## 2.1. O que conta como alimentação adequada?

Uma refeição adequada precisa possuir quantidade e composição suficientes para sustentar o personagem.

Referências:

- uma refeição completa zera o relógio quando a Fome está em 0 ou 1;
- em Fome 2 ou 3, uma refeição completa reduz Fome em 1 e reinicia o relógio;
- um dia completo com alimentação adequada reduz Fome a 0;
- porções pequenas podem interromper temporariamente o relógio ou reduzir Fome em 1;
- alimentos impróprios, contaminados ou insuficientes podem não contar como refeição adequada.

Uma única porção não apaga imediatamente vários dias de privação.

# 3. SEDE

A Sede avança em períodos de **8 horas** sem hidratação adequada.

| Tempo sem hidratação adequada | Sede |
|---:|---:|
| menos de 8 horas | 0 |
| 8 a 15 horas e 59 minutos | 1 |
| 16 a 23 horas e 59 minutos | 2 |
| 24 horas ou mais | 3 |

Ao alcançar Sede 3, o personagem entra em **Desidratação crítica**.

O primeiro Ponto de Saúde é perdido ao completar:

> **32 horas sem hidratação adequada.**

Depois disso, perde-se:

> **1 Ponto de Saúde a cada 8 horas adicionais.**

## 3.1. Recuperando Sede

- uma porção suficiente de água reduz Sede em 1 e reinicia o relógio;
- acesso abundante a água segura durante algum tempo pode reduzir Sede a 0;
- água contaminada ou imprópria pode exigir teste ou produzir consequências;
- hidratar-se não recupera automaticamente a Saúde perdida.

## 3.2. Calor e esforço severo

Em calor intenso, febre, marcha forçada ou esforço prolongado, os intervalos podem ser reduzidos pela metade:

| Condição severa | Sede alcançada |
|---|---:|
| 4 horas | 1 |
| 8 horas | 2 |
| 12 horas | 3 |
| a cada 4 horas seguintes | 1 Ponto de Saúde |

O Assimilador informa quando o consumo acelerado está ativo.

# 4. FADIGA

A Fadiga mede quanto tempo o personagem permanece acordado sem repouso completo.

| Tempo acordado | Fadiga |
|---:|---:|
| menos de 16 horas | 0 |
| 16 a 23 horas e 59 minutos | 1 |
| 24 a 31 horas e 59 minutos | 2 |
| 32 horas ou mais | 3 |

Ao alcançar Fadiga 3, o personagem entra em **Colapso**.

O primeiro Ponto de Saúde é perdido ao completar:

> **40 horas acordado.**

Depois disso, perde-se:

> **1 Ponto de Saúde a cada 8 horas adicionais.**

## 4.1. Repouso

| Repouso | Efeito |
|---|---|
| menos de 2 horas | não reduz Fadiga |
| 2 a 3 horas e 59 minutos | adia o próximo intervalo, sem reduzir o nível |
| 4 a 7 horas e 59 minutos | reduz Fadiga em 1 |
| 8 horas completas e seguras | reduz Fadiga a 0 |

Sono interrompido, desconfortável ou realizado sob ameaça pode não contar como repouso completo.

Marcha forçada, trabalho extenuante ou sucessão de Conflitos podem acelerar o relógio de Fadiga. Quando isso acontecer, o Assimilador informa antes do avanço do tempo.

<!-- PAGEBREAK -->

# 5. EFEITOS DOS NÍVEIS

## Nível 0 — Suprido

O personagem está alimentado, hidratado ou descansado.

Não há efeito mecânico.

## Nível 1 — Necessidade

A privação começa a aparecer na ficção:

- fome;
- boca seca;
- irritação;
- sonolência;
- desconforto;
- perda de concentração;
- redução de disposição.

Não há penalidade automática.

## Nível 2 — Privação

Quando a necessidade interferir diretamente em uma ação, o teste deve usar **Resolução** no lugar do Instinto normalmente escolhido.

Exemplos:

- correr ou escalar desidratado;
- permanecer atento depois de uma noite sem dormir;
- carregar peso após dois dias sem comer;
- executar trabalho delicado durante exaustão;
- resistir ao frio sem energia suficiente.

A substituição não afeta testes sem relação concreta com a privação.

## Nível 3 — Crítico

Enquanto qualquer necessidade estiver em 3:

- a Recuperação natural de Saúde fica bloqueada;
- ações diretamente afetadas continuam usando Resolução;
- novos intervalos críticos podem causar perda de Saúde;
- a necessidade não aumenta além de 3;
- atender uma necessidade não resolve automaticamente as outras.

# 6. DANO POR PRIVAÇÃO

O dano causado por Fome, Sede ou Fadiga:

- não exige rolagem;
- ignora Protetivo, Armadura e cobertura;
- pode reduzir Níveis de Saúde;
- pode Incapacitar ou matar;
- não desaparece apenas porque o personagem comeu, bebeu ou dormiu.

## 6.1. Limite combinado

Quando várias necessidades estiverem críticas:

> **O personagem perde no máximo 1 Ponto de Saúde por bloco de 8 horas devido a todas as necessidades combinadas.**

Fome, Sede e Fadiga não causam três pontos ao mesmo tempo.

O relógio de cada necessidade continua sendo registrado normalmente.

# 7. RECUPERAÇÃO DE SAÚDE

As Necessidades de Sobrevivência também definem quando existem condições adequadas para a Recuperação natural.

## 7.1. Níveis de Saúde 6 e 5

Para ativar a Recuperação depois de 8 horas:

- o repouso precisa ser contínuo e seguro;
- Fome e Sede precisam estar em 0 ao final;
- Fadiga precisa estar em 0;
- nenhuma perda de Saúde por privação pode ocorrer durante o período.

## 7.2. Níveis de Saúde 4 e 3

A recuperação semanal exige:

> **168 horas em boas condições de alimentação, hidratação, repouso e segurança.**

Novo dano reinicia esse período.

Interrupções breves, sem novo dano, podem apenas pausar o relógio, conforme a situação.

## 7.3. Níveis de Saúde 2 e 1

Esses Níveis continuam exigindo tratamento médico ou regeneração específica.

Comer, beber e dormir impedem o agravamento, mas não substituem tratamento.

# 8. ASSIMILAÇÕES E CONDIÇÕES ESPECIAIS

Regras específicas prevalecem sobre este guia.

## 8.1. Assimilação Devoradora

A Assimilação Devoradora utiliza seus próprios intervalos e consequências.

Ela não sofre duas vezes pela mesma privação:

- use o efeito específico da Assimilação;
- não acumule o dano comum de Fome pelo mesmo período;
- a trilha ainda pode aparecer na interface apenas como referência narrativa.

A Devoradora é deliberadamente mais severa que a fome humana comum.

## 8.2. Consumo dobrado

Quando uma mutação dobrar o consumo de alimento ou água, os intervalos correspondentes são reduzidos pela metade.

## 8.3. Resistência prolongada

Quando uma mutação permitir permanecer certo período sem comer, beber ou dormir:

1. o relógio fica suspenso pelo período indicado;
2. depois disso, a contagem normal começa do nível 0;
3. não existem penalidades retroativas.

## 8.4. Fontes alternativas

Mutações podem permitir o consumo de água imprópria, matéria orgânica incomum ou outras fontes específicas. Essas fontes ampliam o que conta como atendimento adequado, conforme o texto da mutação.

# 9. CAMPEIROS E ANIMAIS

Campeiros não usam uma segunda trilha de Fadiga.

Para eles:

- alimento e água continuam necessários;
- marcha, exaustão e falta de repouso aumentam **Esforço**;
- medo e instabilidade usam **Alarme**;
- privação de alimento ou água pode produzir consequências quando for central para a viagem.

Animais passageiros não precisam de relógios individuais.

Animais recorrentes podem usar a regra quando sua sobrevivência e a logística do grupo forem relevantes.

<!-- PAGEBREAK -->

# 10. EXEMPLOS

## 10.1. Um dia de viagem

O grupo acorda às 6h, alimenta-se e abastece os cantis.

Às 14h, completa oito horas desde a última hidratação adequada. Um personagem que não bebeu água alcança Sede 1.

Às 18h, completa doze horas de atividade. Ele ainda está em Fadiga 0, pois não atingiu dezesseis horas acordado.

Às 22h, alcança Fadiga 1. Se o grupo descansar oito horas em segurança, a Fadiga volta a 0.

## 10.2. Viagem sob calor severo

O Assimilador declara que o calor reduz pela metade os intervalos de Sede.

Um personagem sem água:

- alcança Sede 1 em quatro horas;
- alcança Sede 2 em oito horas;
- alcança Sede 3 em doze horas;
- perde o primeiro Ponto de Saúde após dezesseis horas.

## 10.3. Dois dias sem alimentação

Depois de 24 horas, o personagem alcança Fome 1.

Depois de 48 horas, alcança Fome 2.

Enquanto a fome interferir em esforço físico, deve usar Resolução no lugar do Instinto habitual.

Ele ainda não perde Saúde. A perda só começa depois de 96 horas sem alimentação adequada.

## 10.4. Várias necessidades críticas

Um personagem está em Fome 3, Sede 3 e Fadiga 3.

Durante as próximas oito horas, os relógios de Sede e Fadiga atravessam gatilhos de dano.

Ele perde somente 1 Ponto de Saúde naquele bloco, não dois.

## 10.5. Recuperação interrompida

Um personagem em Nível de Saúde 4 inicia uma semana de recuperação.

Depois de três dias, o abrigo é atacado e ele sofre novo dano.

O relógio de 168 horas recomeça depois que o grupo alcança novamente condições adequadas.

# 11. DECISÕES DO JOGADOR

Antes de uma viagem, verifique:

- quantidade de água;
- quantidade e duração das rações;
- possibilidade de reabastecimento;
- duração prevista do trajeto;
- clima;
- abrigo;
- tempo de sono;
- condições para Recuperação;
- necessidades dos Campeiros;
- mutações que alterem consumo.

Durante uma expedição, manter todas as trilhas em 0 nem sempre será possível. O objetivo é reconhecer quando vale a pena continuar avançando, consumir reservas, procurar água, caçar, montar acampamento, aceitar Fadiga ou recuar.

As necessidades existem para produzir decisões, não para punir automaticamente o grupo.

# 12. REFERÊNCIA RÁPIDA

| Necessidade | Nível 1 | Nível 2 | Nível 3 | Primeiro dano | Dano posterior |
|---|---:|---:|---:|---:|---:|
| Fome | 24h | 48h | 72h | 96h | a cada 24h |
| Sede | 8h | 16h | 24h | 32h | a cada 8h |
| Fadiga | 16h | 24h | 32h | 40h | a cada 8h |

## Efeitos

| Nível | Efeito |
|---:|---|
| 0 | sem efeito |
| 1 | sinais narrativos |
| 2 | usa Resolução quando a privação interferir diretamente |
| 3 | bloqueia Recuperação natural e habilita dano por privação |

## Recuperação

| Ação | Efeito |
|---|---|
| refeição completa | zera Fome 0–1 ou reduz Fome 2–3 em 1 |
| um dia bem alimentado | Fome volta a 0 |
| água suficiente | reduz Sede em 1 |
| acesso abundante a água | Sede volta a 0 |
| 4–7h59 de sono | reduz Fadiga em 1 |
| 8h de repouso completo | Fadiga volta a 0 |

> **Limite:** no máximo 1 Ponto de Saúde por bloco de 8 horas devido a Fome, Sede e Fadiga combinadas.

---

**Base mecânica:** *Assimilação RPG* e SRD Interno do Codex de Árborius.

**Escopo:** guia público de jogador. Fórmulas de automação, auditoria matemática e critérios internos de balanceamento permanecem fora desta versão.
