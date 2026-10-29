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

## 12. Ludmila — referências de imagem externas (29/10/2026)

Atualização exclusivamente visual sobre a trilogia v1.25. As três vinhetas SVG locais permanecem no repositório como *fallback* caso uma fonte externa esteja indisponível. As ilustrações principais são **referências de obras publicadas por terceiros**, não arte oficial nem representação literal da personagem.

| Seção | Referência visual e crédito |
|---|---|
| Maestria I — Artesã das Folhas | Bancada de sobrevivência em mata, imagem de *Metro Exodus* (4A Games), publicada por Playground.ru |
| Maestria II — Tecelã do Vivo | Corpo, raízes e tecnologia, imagem publicada em *História Demais para um Corpo Só* (Zarak Krumfort / Substack) |
| Segunda Anatomia | Prótese entre flores e raízes, fotografia promocional do braço de Malenia (*Elden Ring*) publicada pela PureArts |
| Maestria III — Caçadora Silenciosa | Cavaleira com rifle em floresta, *Lone Guardian* — Shay Vision |

Cada cartão contém legenda descritiva e link à página de origem, mantendo proporção da obra, layout lateral em telas largas e empilhamento em telas pequenas. O clique abre o lightbox existente, e o hover mostra uma ampliação quando disponível. Não sobrepor o botão "Ampliar". Se o servidor da obra externa bloquear o arquivo, exibir a vinheta local correspondente; não remover o link para a publicação original.

Não redistribuir as imagens externas como arquivos próprios do repositório sem autorização/licença aplicável. A disponibilidade remota, a compatibilidade com hotlink e os direitos sobre as obras permanecem sob responsabilidade das respectivas fontes. Nenhuma mecânica, custo, requisito ou texto normativo foi alterado.

## 13. Ludmila — ilustrações distribuídas por técnica

A trilogia de Ludmila não deve exibir ilustrações **somente nas aberturas**. A revisão de 29/10/2026 mantém as quatro imagens anteriores (aberturas das três Maestrias e Segunda Anatomia) e acrescenta **15 painéis de referência visual**, diretamente relacionados ao primeiro trecho explicativo de cada técnica:

- **Maestria I:** Oficina da Folha (artífice no trabalho), Engenhos da Araucária (mecanismos), Ciclo Arboriano (instrumentos médicos), Projétil Aplicador (modelo fictício de instrumento), Socorro de Emergência (socorro com preparados).
- **Maestria II:** Engenharia de Simbiose (estufa e cultivo), Companheiros de Oficina (fiação e fibras), Farmácia de Campo Equina (preparações), Treinamento de Campeiros (cuidados), Cirurgia de Reconstrução (atendimento veterinário) e Excisão Equina (exame especializado).
- **Maestria III:** Pontaria de Galope (atiradora a cavalo), Interdição Cirúrgica (tiro preciso), Tocaia Perfeita (cobertura e mira) e Caçada Sem Rastros (camuflagem).

São **19 figuras** no total, sem transformar as imagens em regras. Novos painéis usam `lud-tech-visual`, com **introdução ao lado da imagem** e **tabelas mecânicas fora do layout de colunas**, garantindo leitura do custo integral. Em celulares, imagem e explicação empilham. Proporção original: `object-fit:contain`. Sem botão visual sobreposto de ampliar; permanecem hover, modal, descrição acessível, crédito e URL da origem. Fontes externas não são copiadas para o repositório; mantêm fallback para as vinhetas vetoriais locais em caso de bloqueio de hotlink.

Todas as 27 seções e 20 tabelas foram conservadas, bem como os 130 marcadores mecânicos preexistentes.

## 14. Ludmila — correção da estrutura editorial (29/10/2026)

O dossiê consolidado da personagem deixa de apresentar 27 folhas como unidades visuais desconectadas. **Três capítulos editoriais de Maestria** envolvem, respectivamente, as folhas 1–8, 9–19 e 20–27. A paginação antiga e todos os links individuais continuam válidos.

Padrão adotado, em consonância com os dossiês de Apolo, Aruana e José:

- **Abertura do conjunto:** nome da personagem, resumo de três caminhos, navegação direta e nota de precedência com versões consolidadas e marca de homebrew em teste.
- **Abertura de cada Maestria:** título de capítulo, emblema, identidade narrativa e três capacidades em cartões de navegação. Não duplicar uma segunda lista de links para as mesmas três técnicas.
- **Capacidades:** ficha de técnica em papel claro, com cor de Maestria no filete lateral, títulos hierarquizados e rótulos Capacidade, Desdobramento e Consulta quando pertinente.
- **Mecânica:** custos e condições com negritos e símbolos mantidos; os 22 parágrafos com chave mecânica explícita na Maestria II foram reorganizados em linhas de *chave / descrição*, sem alterar o conteúdo. Tabelas ficam em largura integral, com cabeçalhos escuros e rolagem horizontal apenas quando necessária.
- **Ilustração:** 19 referências em moldura e ao lado do primeiro parágrafo de cada técnica ilustrada, com alternativa de empilhamento em telas estreitas. Não cortar imagens ou fragmentar uma tabela entre colunas.
- **Índice:** os três grupos aparecem também na navegação lateral, respeitando a ordem I→II→III. No celular o menu principal permanece simples, com navegação pelo resumo.
- **Impressão:** o capítulo começa em nova página, mas folhas internas não devem forçar quebra de página a cada pequena capacidade.

**Auditoria comparativa:** as 27 seções continuam contendo exatamente o mesmo texto de regras no corpo `page-copy` antes e depois da reorganização (27/27 comparações textuais idênticas, 7.569 palavras). Preservam-se 20 tabelas, 19 figuras, 130 marcações mecânicas e todos os 27 IDs de âncora. A apresentação em navegador precisa de conferência visual após o deploy.

## 15. Ludmila — aproveitamento de proporções nas 19 ilustrações

Na revisão de 29/10/2026, o dossiê deixa de usar indiscriminadamente a mesma coluna de aproximadamente 37% para retratos, pinturas quadradas e paisagens.

- **Medição por imagem:** quando uma arte realmente carrega, `naturalWidth / naturalHeight` determina o modo: panorama/paisagem (≥ 1,29), retrato (≤ 0,85) ou composição intermediária/quadrada. O mesmo processo se aplica às artes SVG locais usadas em fallback. Não atribuir orientação apenas pela URL ou pelo tema.
- **Paisagem:** apresentação ampliada, centralizada, com texto da introdução em largura útil logo abaixo; altura limitada sem recortar a composição. Desse modo uma paisagem não fica comprimida numa coluna estreita enquanto a descrição deixa um grande vazio.
- **Retrato:** coluna lateral proporcionalmente menor, altura disponível maior para aproveitar o formato vertical. Quando o parágrafo ao lado é curto, limitar a altura da figura para não abrir grande intervalo antes da regra seguinte.
- **Quadrada:** cartão lateral em proporção intermediária, preservando a imagem inteira.
- **Responsividade:** aplicar o critério de empilhamento à largura **da folha** com CSS container queries (≤ 560px), com fallback para largura de tela pequena. Não forçar todas as imagens para baixo simplesmente porque o viewport é inferior a 980px, desconsiderando a largura livre após a barra lateral.
- **Proteção do conteúdo:** textos, ícones, custos, notas e tabelas continuam fora de recortes e sobreposições; `object-fit:contain`. As colunas invertidas mantêm texto amplo, e a tabela não pode virar um bloco comum por uma regra de layout.
- **Impressão:** altura de imagem limitada e texto legível; manter proporções.

A auditoria compara integralmente o conteúdo das 27 folhas e confirma **27/27 textos idênticos**, as **19 figuras** com suas referências e SVGs alternativos, **20 tabelas**, **130 marcadores mecânicos**, HTML e CSS estruturais balanceados. A verificação final de carregamento e aparência das obras remotas exige navegação real: o código foi preparado para se adaptar a suas dimensões efetivas.

## 16. Ekhyos — trilogia consolidada no padrão editorial (29/10/2026)

Fonte primária: `Ekhyos_Trilogia_de_Maestrias_Consolidada_v1.0.docx`, versão de 29 de outubro de 2026, e **SRD Interno v1.26** (§214 e Parte XXVIII, §§232–239). Mantém três Maestrias distintas em **[HOMEBREW] [TESTE]**:

1. **I — Bardo de Batalha v3.2:** preserva integralmente as 11 seções que já estavam publicadas; o mesmo URL do dossiê permanece para não quebrar marcadores e histórico.
2. **II — Einherjar v1.0:** sete novas seções: identidade/requisitos, Despertar, Instinto Heroico e Ímpeto, Juramento da Vanguarda, O Último a Cair e Glória dos Feitos, economia e exemplo. A Característica oficial **Sacrifício Heroico** é requisito, não concessão gratuita.
3. **III — Saga dos Vivos v1.0:** seis novas seções com requisitos, Crônica da Jornada, Juramento do Presente, Fogo da Vigília, exemplos e limites/consulta. Não cria missões paralelas, personagens auxiliares, novos Objetivos nem bônus permanentes.

**Padrão de apresentação:** três capítulos de pergaminho, navegação lateral integral com 24 âncoras, ícones de habilidades, tabelas de consulta e exemplos; 12 referências visuais da internet, cada uma com legenda, crédito e link de origem. Artes remotas são vinculadas, sem arquivar conteúdo de terceiros; três vinhetas locais SVG funcionam como fallback. O layout identifica proporção da imagem por `naturalWidth/naturalHeight`, limita a altura de retratos breves, usa área ampla para paisagens e alterna empilhamento conforme largura real da folha. Nunca inserir uma figura dentro da própria tabela de custos.

**Convenção de recursos:** `A` = Sucesso, `B` = Adaptação e `C` = Pressão, com símbolos oficiais do site. `d` = Ponto de Determinação **real**, também com o símbolo oficial. `a` = Ponto **Ancestral** do Einherjar, representado por selo próprio e legenda independente; não é Sucesso A, não altera D nem financia Cadência ou usos gerais de Determinação. Conservar o teto de quatro dados mantidos, o limite de uma ação comum por turno e a exclusividade entre o canto do Bardo e o estado Einherjar.

A trilogia publicada não concede automaticamente novos recursos, alterações no Cabo de Guerra, mutações, capacidades ou itens; nenhuma alteração no Foundry. A página deve ser testada visualmente no GitHub Pages após o deploy; fontes externas podem bloquear hotlinks.

## 17. Ekhyos — correção visual e redação de consulta (29/10/2026)

Esta revisão **substitui** no dossiê de Ekhyos a orientação gráfica de imagens do §16 deste guia, sem alterar o SRD v1.26 nem os textos normativos das técnicas.

**Diagnóstico:** foram herdadas classes genéricas de Ludmila que, conforme a largura da tela ou a proporção da imagem, colocavam paisagens sobre a explicação e às vezes deixavam grandes espaços vazios. As 12 ilustrações originais vinham de fontes muito heterogêneas, algumas com visuais repetidos e pouca relação concreta com o efeito da técnica; o SVG de fallback terminava substituindo a arte por desenhos abstratos quando havia bloqueio de hotlink.

**Correção adotada:**
- Reduz para **7 obras escolhidas**, ligadas à voz do skald, ao campo de batalha, à persistência, à defesa da vanguarda, ao preço de permanecer ferido e à preservação da memória. Preferir obras históricas e pintores conhecidos, com autor, título e endereço da fonte verificáveis em legenda compacta. Os três SVGs técnicos anteriores não são mais usados nas figuras de Ekhyos.
- Manter **imagem à direita** em composição de duas colunas para todas as proporções (incluindo paisagens). A largura da arte fica em torno de 28% da folha e sua altura é limitada, com `object-fit:contain`, sem cortes na obra. Nas larguras úteis inferiores a aproximadamente 590 px, empilhar em ordem **imagem, texto**, preservando legibilidade.
- Se uma fonte remota falhar, ocultar o cartão sem substituir por um SVG visualmente dissonante; o texto ocupa a largura da folha. O link original e sua autoria permanecem nas referências do arquivo HTML.
- Adicionar **9 painéis de consulta rápida** com 29 linhas de gatilho, teste, custo, efeito, frequência e limitação segundo a técnica respectiva. O documento conserva abaixo deles os **textos normativos integrais**, sem aumentar bônus nem eliminar exceções.
- Nos parágrafos curtos de *Juramento da Vanguarda* e *O Último a Cair*, aproximar o quadro normativo da descrição lateral, evitando a coluna de texto vazia e mantendo custos e limites na mesma unidade visual.
- Preservar ícones oficiais de Sucesso (A), Adaptação (B), Pressão (C) e Determinação real (d), além do selo específico dos Pontos Ancestrais (a), e nunca tratar a reserva ancestral como um segundo Cabo de Guerra.

**Conferência comparativa:** **24/24 seções** com texto normativo idêntico à versão anterior após remover apenas os painéis novos e arte; três Maestrias, 12 tabelas, sete figuras, sete créditos, links internos válidos e sem IDs duplicados. A inspeção visual das imagens renderizadas e dos servidores remotos só pode ser confirmada em navegador após o deploy.
