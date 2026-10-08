# Atlas Vivo público — edição sem instalação

Este módulo complementa o portal Astro existente. Ele não executa Foundry nem hospeda notas do Assimilador.

## Fonte dos dados

- `src/content/atlas/*.md`: fichas públicas de personagens, localidades, facções e mapas.
- `src/content/sessoes/*.md`: resumos públicos de sessões.
- `src/content/eventos/*.md`: acontecimentos e mudanças por sessão.
- `public/`: apenas imagens otimizadas e arquivos explicitamente públicos.

Os originais de imagens e os materiais internos ficam fora deste repositório, no armazenamento privado/Obsidian. Nunca publique no GitHub informações confidenciais: o próprio repositório é público, inclusive arquivos não renderizados pelo Astro.

## Edição 100% online

Entre com sua conta do GitHub. No portal, use **Nova ficha**, **Nova sessão** ou **Registrar acontecimento** para abrir o editor do GitHub no navegador. Crie um arquivo Markdown, preencha as propriedades e faça o commit na branch `main` (ou via pull request). O workflow existente de GitHub Pages recompila o portal.

**Limitação desta etapa:** a edição acontece no editor do GitHub, não dentro do formulário da página. Para salvar diretamente de um formulário do portal será necessária integração autenticada, sem expor tokens no navegador.

## Modelo: ficha

```yaml
---
title: "Nome público"
slug: "nome-publico"
description: "Resumo para listagem."
type: "registro-atlas"
kind: "personagem" # personagem | localidade | faccao | mapa
visibility: "publico"
status: "publicado"
updated: 2026-10-08
tags: []
relations: []
currentState: "Estado atual conhecido pelos jogadores."
---
```

Escreva a biografia em Markdown após o frontmatter.

## Modelo: evento

```yaml
---
title: "Encontro na fronteira"
slug: "encontro-na-fronteira"
description: "Resumo público"
type: "evento"
visibility: "publico"
status: "publicado"
updated: 2026-10-08
tags: []
session: 1
order: 1
impacts:
  - target: "nome-publico"
    description: "O que mudou nesta ficha, conforme conhecido pelos jogadores."
---
```

**Atenção:** o número da sessão deve corresponder a um arquivo em `src/content/sessoes/`, cujo campo `number` identifica a sessão. `target` deve corresponder ao slug de uma ficha pública do Atlas. Eventos não reescrevem automaticamente o campo `currentState`; registram a evolução histórica. Atualize o estado atual manualmente na ficha ao incorporar as consequências.

## Separação de ferramentas

- **Foundry:** jogo, automações e mecânica em sessão.
- **Site/Atlas:** conhecimento público, fichas e memória histórica.
- **Obsidian privado:** notas internas, segredos, planos e elaboração.
- **GitHub:** arquivos públicos, edição no navegador, histórico de versões e publicação.

Os exemplos `modelo-*` não são canônicos e podem ser removidos após o cadastro das primeiras fichas reais.
