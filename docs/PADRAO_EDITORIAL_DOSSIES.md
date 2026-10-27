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
