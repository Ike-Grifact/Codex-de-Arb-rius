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

As seis ilustrações fornecidas pelo Assimilador estão distribuídas em técnicas/contextos relacionados. Cada uma tem moldura, legenda, link de origem, alternativa de imagem indisponível e ampliação ao clique quando carregada. Nunca usar `object-fit:cover` para cortar o conteúdo; preferir `object-fit:contain` e altura máxima.

A revisão é editorial. O conteúdo mecânico (15 tabelas, símbolos, custos e regras do SRD) não foi alterado. Referências externas podem bloquear incorporação; conferi-las visualmente após a publicação.
