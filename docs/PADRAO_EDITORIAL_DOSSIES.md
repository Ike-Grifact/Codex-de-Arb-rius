# Padrão editorial dos dossiês de jogadores — Codex de Árborius

**Referências de apresentação:** dossiês publicados de Apolo Hellman e Aruana. O nome, os símbolos e a cor de destaque variam por personagem; a legibilidade das regras não.

## 1. Contraste e identidade visual

- Texto das Maestrias deve permanecer escuro (#40392f ou equivalente), sobre fundo de pergaminho claro (#f1e7d4 ou equivalente). Contraste mínimo 4,5:1; objetivo recomendado 7:1.
- Verde, azul, vermelho e dourado servem como cores de destaque em títulos e separadores. Evitar painéis escuros para custos e efeitos quando o corpo da página usa texto escuro.
- Preferir separadores horizontais e subtítulos nítidos, como em Apolo e Aruana, a cartões de cores fortes para cada parágrafo.
- Manter comportamento responsivo e impressão legível; nunca contar apenas com cor para identificar efeito ou recurso.

## 2. Organização de cada habilidade

1. Nome da habilidade, número e Maestria;
2. descrição narrativa curta;
3. requisitos/desbloqueio;
4. gatilho, quem age e momento da ação;
5. custo e teste;
6. efeito e duração;
7. limites, frequência, consequências e exemplo quando relevante.

Não inserir regras inteiras dentro de títulos. Requisitos, custos e efeitos precisam ser consultáveis sem reler parágrafos extensos. Usar ícones /symbols/ acompanhados de legenda textual. Distinguir [BASE], [HOMEBREW] e [TESTE]; jamais atualizar conteúdo mecânico apenas por refatoração visual.

## 3. Componente recomendado para campos mecânicos

```html
<p class="dossier-rule">
  <strong class="dossier-rule__label">Custo</strong>
  <span class="dossier-rule__value">Valor e condição de pagamento.</span>
</p>
```

```css
.dossier-rule {
  display:grid;grid-template-columns:minmax(98px,130px) minmax(0,1fr);
  gap:11px 16px;padding:11px 5px 14px;
  border-bottom:1px solid #baa887;
  background:transparent;color:#40392f;
}
.dossier-rule__label { color:#345241; font-weight:700; }
.dossier-rule__value { color:#40392f; min-width:0; }
@media(max-width:730px) { .dossier-rule {grid-template-columns:1fr;} }
```

## 4. Validação obrigatória

- Conferir visualmente desktop e celular, com campos longos de custo e de efeito.
- Testar cores calculadas e regras CSS com especificidade maior que a regra geral do pergaminho.
- Revisar todos os tipos de bloco: introdução, requisitos, custos, testes, efeitos, tabelas, notas e créditos.
- Garantir a impressão em PDF, texto alternativo nas ilustrações, acesso ao zoom com teclado e links corretos.
- Validar texto de regras frente ao SRD vigente, sem alterar custos, instintos, reserva, progressão ou economia de ações.

## 5. Aplicação

Correção introduzida inicialmente no dossiê de Brandon em 27 de outubro de 2026, inspirada no modelo editorial de Apolo e Aruana. Reutilizar este padrão na criação de todos os próximos dossiês dos jogadores.


## 6. Ícones, custos simbólicos e quebras de linha

O ícone de cada Maestria deve utilizar a mesma espessura de linha, escala e forma de apresentação dos demais personagens. Em Brandon: vínculo (Ressonância), espada longa (Lâmina Hemática) e silhueta dracônica (Dragoaria). O desenho nunca substitui os símbolos oficiais.

Para custos longos de cartas, apresentar **um símbolo por tipo com sua contagem**, sem fileiras ilegíveis: `BBBBB` pode aparecer como **5B**, `BBBBAA` como **4B + 2A** e `BBC` como **2B + 1C**. Preservar a notação original em `title` e disponibilizar uma descrição acessível em `aria-label`. É apenas abreviação visual: custo e ordem dos símbolos continuam os mesmos.

Na tabela de marcos, separar requisitos de Aptidões dos nomes das mutações. Manter nome da carta e seu custo **no mesmo grupo** (com `inline-flex` e `white-space:nowrap`). Em tela estreita, preferir rolagem horizontal da tabela à quebra no meio do custo de uma carta. Não partir símbolos mecânicos, contagens de dados ou as abreviaturas oficiais entre linhas.

Usar negritos com parcimônia para identificar **requisitos, gatilhos, custos, testes, efeitos, limites e exceções decisivas**. Não destacar parágrafos inteiros nem mudar a natureza mecânica do que está descrito.

## 7. Revisão textual e iconografia contextual

- Cada regra deve separar **gatilho, custo, efeito, duração e limite**, sem repetir a mesma explicação no mesmo capítulo.
- Evitar títulos seguidos de parágrafo colado (por exemplo, "Infectados Infectados") e cabeçalhos que em cópia de texto apareçam sem espaço. No HTML, separar `</small>` do título principal e os dois metadados de cada folha.
- **Não dividir uma frase ou uma tabela entre folhas**. Reunir custos das cartas oficiais numa única tabela, incluindo cartas já adquiridas, com anotação clara do estado de aquisição.
- As tabelas de consulta rápida não substituem as descrições mecânicas completas; devem preservar recursos, limites, requisitos e condições de uso.
- Ilustrações devem ficar junto à técnica representada: abertura, mutação, ativação ofensiva, consequência ou marco narrativo. Cada imagem recebe descrição acessível, legenda e crédito da URL de origem.
- Imagens hospedadas fora do Codex podem bloquear incorporação. O visualizador deve manter alternativa para abrir o endereço original se a imagem falhar. Não afirmar que um recurso remoto foi carregado sem verificar no navegador.
- Distinguir sempre **texto oficial**, **homebrew de campanha** e **resumo editorial**. Melhorar a concisão não autoriza alterar cálculos ou custos.

## 8. Aplicação a Vespasiano Varotto (27/10/2026)

A página de Vespasiano segue o mesmo fundo de pergaminho e contraste alto dos dossiês de Apolo, Aruana e Brandon. A navegação conserva o verde-escuro; cada Maestria usa uma cor de destaque, sem fundo escuro atrás dos textos: **Engenharia Biológica** (verde-petróleo), **Visão Horrenda** (vinho) e **Gênese Assimilada** (oliva).

As ilustrações fornecidas pelo Assimilador ficam junto às técnicas correspondentes, conforme o mapeamento mais recente da seção 9. Cada uma tem moldura, legenda, link de origem, alternativa de imagem indisponível e ampliação ao clique quando carregada. Nunca usar `object-fit:cover` para cortar o conteúdo; preferir `object-fit:contain` e altura máxima.

A revisão é editorial. O conteúdo mecânico (15 tabelas, símbolos, custos e regras do SRD) não foi alterado. Referências externas podem bloquear incorporação; conferi-las visualmente após a publicação.

## 9. Vespasiano — arte lateral e identidade de cada cena

A revisão de 27/10/2026 posiciona ilustrações de Vespasiano ao lado de um trecho narrativo/mecânico claramente delimitado, sem quebrar tabelas ou parágrafos de regras. A proporção original é preservada (`object-fit:contain`), com coluna de texto mais larga e empilhamento vertical no celular.

O mapeamento editorial atualizado das **dez ilustrações** inclui:

- **Engenharia Biológica** (folha 2): Dariusz Zawadzki
- **Sutura Assimilada** (folha 3): equipamento orgânico com fios da Stegi Radio, anteriormente em Coro Interior
- **Núcleo I.A.** (folha 3): imagem indicada do Pinterest
- **Visão Horrenda** (folha 8): Max Ernst
- **Rosto Emprestado** (folha 9): Doppelganger de Arkane Atlas
- **Olhos de Dentro / Intrusão Mental** (folha 9): imagem indicada do TCGplayer
- **Combate Perturbador** (folha 11): imagem indicada do Reddit
- **Zangão** (folha 14): criatura verde anteriormente ilustrando Combate Perturbador (TMDB)
- **Homúnculo de Vigília** (folha 15): *Stranger*
- **Casulo Primordial** (folha 16): paisagem orgânica Zerg de ArtistMonkeys

As antigas imagens da Sutura (Pikabu) e de Rosto Emprestado (st-note) foram substituídas nesta versão, para evitar figuras redundantes. A seção Coro Interior permanece com texto e sem ilustração própria, pois a imagem foi transferida para Sutura.

Não sobrepor o botão decorativo **Ampliar** à arte. Manter interação por mouse (prévia), clique (visualização integral), teclado e link de origem, além de mensagem de fallback se houver bloqueio da imagem externa. Os títulos e créditos devem refletir a imagem atual, não sua antiga posição.

Uma mudança meramente editorial não pode alterar textos mecânicos, custos, ações, dados ou tabelas.

## 10. Ludmila — Maestrias I e II na mesma página (28/10/2026)

A Maestria I — Artesã das Folhas v1.3 permanece com suas oito seções originais. A **Maestria II — Tecelã do Vivo v1.2** foi acrescentada em 11 seções, preservando integralmente o conteúdo normativo do dossiê enviado e separando Segunda Anatomia, Engenharia de Simbiose e Cirurgia de Reconstrução.

- Tema de pergaminho claro e texto escuro; navegação lateral verde-escura, análoga às páginas dos demais jogadores.
- Requisitos de desbloqueio, próteses, coleta, cultivo, companheiros, adaptação de preparados, treinamento, excisão e consulta rápida distribuídos em tabelas e parágrafos de mesa.
- Símbolos oficiais das pastas `/symbols/` para A, B, C, Saúde máxima e E mínimo. Contagens e recursos continuam escritos junto aos ícones, nunca substituídos apenas por imagem.
- Nenhuma capacidade é concedida sem seus requisitos, tempo, materiais, instalações e custos.
- Documentação de origem v1.2 declara a versão *Codex v1.23* e está marcada **[HOMEBREW] [TESTE]**. A base v1.18 disponível localmente não contém essa nova Maestria; não alegar validação cruzada com o texto integral da v1.23 sem consultar a versão vigente.
- Ícones e títulos devem respeitar quebra de linha: contagem + glifo sempre no mesmo bloco, tabelas com rolagem horizontal em tela pequena.

## 11. Ludmila — trilogia consolidada v1.0 / SRD v1.25 (29/10/2026)

O dossiê público da personagem formaliza a ordem **I — Artesã das Folhas v1.3 → II — Tecelã do Vivo v1.2 → III — Caçadora Silenciosa v1.0**. As capacidades de cada Maestria são conhecimentos após seu desbloqueio; o documento não concede progresso, Características, animais, armas, próteses ou materiais gratuitamente. **[HOMEBREW] [TESTE]**.

- **Maestria I:** preserva as oito folhas; a designação vigente, conforme SRD v1.21, é **Engenhos da Araucária**, substituindo editorialmente a denominação histórica “Engenhos da Restinga”, sem mudar a mecânica.
- **Maestria II:** conserva as onze folhas e as capacidades já publicadas. As referências de precedência usam agora **SRD v1.25**, retirando a nota desatualizada que tratava v1.18 como última consolidação.
- **Maestria III:** acrescenta oito folhas completas (20–27): visão geral, requisitos, Pontaria de Galope, Interdição Cirúrgica, Tocaia Perfeita, Caçada Sem Rastros, exemplos fechados, limites e consulta rápida. Preserva os custos/limites do documento consolidado v1.0 e o funcionamento independente dos Campeiros.
- Ícones de capacidade distintos nas nove técnicas e recursos mecânicos legíveis com os SVG oficiais para A/B/C, Saúde e Determinação; números e texto acessível preservados junto do símbolo.
- Três vinhetas editoriais SVG próprias hospedadas em `public/dossies/assets/ludmila/`, uma por Maestria. Molduras em pergaminho, legendas, proporção preservada, prévia centralizada no hover, ampliação por clique e navegação por teclado. São **artes vetoriais editoriais**, não ilustrações mecânicas oficiais nem substitutas das imagens originais do guia.
- Mantém índice lateral, paginação completa, contraste do pergaminho, tabelas com rolagem horizontal no celular e impressão legível.
- Nenhuma alteração de regra no Foundry; prevalece a trilogia fornecida e SRD v1.25 para esta formalização.

A revisão mantém a página pública antiga para não quebrar os links de jogadores.
