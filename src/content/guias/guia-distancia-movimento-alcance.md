---
title: "Guia do Jogador — Distância, Movimento e Alcance"
slug: "guia-distancia-movimento-alcance"
description: "Playtest de posição tática, deslocamento, corrida, movimento montado e faixas de alcance das armas."
type: "guia"
status: "publicado"
visibility: "publico"
order: 4
tags:
  - exploracao
  - armas
  - montaria
  - campeiros
  - playtest
  - viagem
updated: 2026-09-21
version: "Playtest 1.0"
origin: "homebrew-arborius"
exports:
  pdf: true
  markdown: true
  html: false
---

# Assimilação RPG — Distância, Movimento e Alcance
## Guia rápido para Jogadores — v1.0 de playtest

Estas regras serão usadas quando a posição no mapa realmente importar: perseguições, fugas, ataques à distância, cargas montadas e outros Conflitos de escala tática.

Elas não transformam todo Conflito em combate por quadrículas. Em Assimilação, um turno pode representar tempos diferentes conforme a cena.

---

# 1. Como ler as distâncias

| Distância | Nome |
|---:|---|
| 0–2 m | Corpo a Corpo |
| >2–6 m | Perto |
| >6–15 m | Distante |
| >15–30 m | Longe |
| >30–60 m | Muito Longe |
| >60 m | Extremo |

Esses nomes ajudam a entender a cena.

**Eles não dizem sozinhos se algo está ao alcance.**

---

# 2. Movimento normal do Infectado

Em uma cena tática, seu deslocamento gratuito no turno é:

**4 + Potência + Atletismo metros**

Exemplo:

- Potência 3;
- Atletismo 2;
- deslocamento passivo: **9 m**.

Você pode dividir esses metros durante o turno, mas o total não reinicia.

---

# 3. Quero correr mais

Para ultrapassar seu deslocamento normal, a corrida normalmente usa:

**Potência + Atletismo**

Cada **{{sucesso}} investido em correr** acrescenta:

**+3 m**

Exemplo:

- Passivo: 9 m;
- precisa chegar a 15 m;
- investe {{sucesso:2}};
- ganha +6 m;
- total: 15 m.

{{adaptacao}} normalmente serve para adaptar o movimento: pular algo, mudar rota, contornar ameaça, vencer terreno ruim etc.

{{pressao}} pode gerar queda, ruído, exposição, colisão, perda de cobertura ou outra consequência adequada.

---

# 4. Movimento dentro do Conflito

Durante um Conflito tático:

- você move voluntariamente seu Token no seu turno;
- o movimento usado é descontado do total daquele turno;
- correr além do Passivo exige a resolução apropriada.

O Assimilador ainda pode mover seu Token como consequência.

Exemplos:

- ser empurrado;
- cair;
- ser arremessado;
- ser arrastado;
- ser levado por correnteza.

Esse movimento forçado **não consome seu deslocamento voluntário**.

---

# 5. Campeiros se movem muito mais

O Campeiro usa outra fórmula:

**10 + (2 × Potência) + (2 × Atletismo) metros**

Exemplo:

- Potência 3;
- Atletismo 3;
- Passivo do Campeiro: **22 m**.

Se estiver montado, esse é o deslocamento básico da dupla.

Não somamos o movimento do cavalo com o do cavaleiro.

---

# 6. Disparada do Campeiro

Quando o Campeiro precisa passar do seu deslocamento normal:

**Potência + Atletismo**

Cada **{{sucesso}} investido na disparada** acrescenta:

**+5 m**

Exemplo:

- Passivo do Campeiro: 22 m;
- {{sucesso:3}} investidos;
- +15 m;
- total: **37 m**.

Carga, terreno, medo, Esforço e Alarme podem alterar o que é seguro ou possível.

---

# 7. Mega corrida montada

Se cavalo e cavaleiro estão realmente trabalhando juntos para extrair o máximo da disparada, pode existir uma **Ação Conjunta Montada**.

Os dois contribuem para um único Objetivo.

Não são dois turnos.

O cavalo fornece a base do deslocamento, e os resultados mantidos podem ser investidos na mesma ação.

---

# 8. Atacar enquanto o Campeiro se move

Uma ação montada pode combinar movimento e ataque quando os dois fazem parte da mesma intenção.

Exemplos:

- avançar disparando;
- recuar enquanto usa o arco;
- contornar para abrir linha de tiro;
- correr para entrar em Corpo a Corpo.

Os {{sucesso}} ainda precisam ser distribuídos.

Mover mais pode significar ter menos Sucessos disponíveis para outros efeitos.

---

# 9. Alcance das armas

Armas de distância possuem três faixas próprias:

- **Confortável:** sem custo extra pela distância;
- **Difícil:** {{sucesso:1}} adicional necessário;
- **Extremo:** {{sucesso:2}} adicionais necessários;
- além disso: fora do alcance.

Tabela atual de playtest:

| Arma | Confortável | Difícil | Extremo |
|---|---:|---:|---:|
| Revólver | 15 m | 30 m | 40 m |
| Espingarda / Escopeta | 10 m | 20 m | 30 m |
| Zarabatana | 8 m | 15 m | 20 m |
| Arco | 30 m | 50 m | 70 m |
| Carabina | 50 m | 80 m | 110 m |
| Rifle / Fuzil | 80 m | 140 m | 200 m |

Esses valores ainda estão em playtest.

### Carabina não é Espingarda

- **Revólver:** curta distância;
- **Espingarda/Escopeta:** curta distância;
- **Carabina:** arma longa mais curta e manejável;
- **Rifle/Fuzil:** longa distância.

---

# 10. Distância aumenta o custo em Sucessos

A distância não tira dados automaticamente.

Ela aumenta a quantidade de {{sucesso}} necessária para concretizar o tiro.

Exemplo com Arco:

- alvo a 25 m → Confortável → sem custo adicional;
- alvo a 40 m → Difícil → {{sucesso:1}} adicional;
- alvo a 60 m → Extremo → {{sucesso:2}} adicionais;
- alvo a 80 m → fora do alcance.

Esse custo é somado ao que a própria ação ou Conflito já exigir.

---

# 11. Movimento pode melhorar um disparo

Exemplo:

- alvo a 55 m;
- você está com um Arco;
- a 55 m o Arco está na faixa Extrema: {{sucesso:2}} adicionais.

Seu Campeiro possui Passivo de 22 m.

Se ele avançar 22 m antes do disparo:

- distância restante: 33 m;
- agora o alvo está na faixa Difícil;
- custo cai para {{sucesso:1}} adicional.

Se conseguir chegar a 28 m:

- o alvo entra na faixa Confortável;
- não há custo adicional de distância.

---

# 12. Corpo a Corpo

Corpo a Corpo significa aproximadamente:

**0–2 m**

Para atacar alguém corpo a corpo, você precisa terminar a aproximação nessa faixa.

---

# 13. “Fora do alcance” depende do que você está usando

Não existe uma distância única chamada “fora do alcance”.

Exemplo: alvo a 70 m.

- faca → fora do alcance;
- Revólver → fora do alcance;
- Arco → limite extremo;
- Carabina → alcance difícil;
- Rifle/Fuzil → alcance confortável;
- correr a pé → provavelmente impossível no mesmo turno;
- visão → depende de luz, paredes, névoa e outros fatores;
- sentidos especiais → usam seus próprios metros.

---

# 14. Sentidos também usam metros

Quando uma Assimilação ou outro efeito diz “10 m”, “30 m” ou outro valor, esse alcance será medido diretamente no mapa.

Visão normal continua dependendo de:

- paredes;
- cobertura;
- iluminação;
- fumaça;
- neblina;
- vegetação;
- posição.

Poder enxergar não significa automaticamente conseguir atacar.

---

# 15. O que ainda está em teste

Estas regras ainda podem ser ajustadas depois de uso real em mesa:

- movimento humano;
- movimento equino;
- metros por {{sucesso}};
- faixas das armas;
- efeito de carga pesada/sobrecarga;
- terreno extremo;
- mutações que aumentem velocidade ou alcance.

A ideia é fazer **posição e deslocamento importarem sem transformar Assimilação em um simulador de combate**.

---

# Resumo rápido

### Infectado
**Passivo:** `4 + Potência + Atletismo` m  
**Corrida:** +3 m por {{sucesso}}

### Campeiro
**Passivo:** `10 + 2×Potência + 2×Atletismo` m  
**Disparada:** +5 m por {{sucesso}}

### Montado
Usa o **Passivo do Campeiro**.

### Distância de tiro
- Confortável → sem custo adicional
- Difícil → {{sucesso:1}} adicional
- Extremo → {{sucesso:2}} adicionais
- além → fora do alcance

### No Conflito
- movimento voluntário: no seu turno;
- movimento forçado pelo Assimilador: pode acontecer como consequência e não consome seu Passivo.
