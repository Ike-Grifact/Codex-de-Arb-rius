# Fluxo de importação de conteúdo

Este fluxo recebe documentos preparados fora do Codex de Árborius e os converte em entradas das coleções públicas do portal. Ele não substitui `scripts/migrate-guides.mjs`, que permanece como compatibilidade para os dois guias históricos.

## Princípios

- O comando padrão é somente leitura: sem `--apply`, sempre produz um dry-run.
- Apenas conteúdo com `visibility: "publico"` pode entrar neste repositório público.
- O pacote é tratado como dado não confiável. Nenhum script, import, expressão MDX ou HTML ativo é executado.
- Arquivos existentes nunca são sobrescritos.
- Uma falha de cópia, validação ou build desfaz todos os arquivos da importação.
- O importador nunca executa Git, staging, commit, push ou merge.
- `_entrada-conteudo/` é local e ignorada pelo Git.

## Estrutura do pacote

```text
_entrada-conteudo/
└── pacote-arborius/
    ├── manifest.json
    ├── content/
    │   └── documento.md
    ├── assets/
    │   └── mapa.webp
    └── NOTAS-DE-IMPORTACAO.md
```

`NOTAS-DE-IMPORTACAO.md` é opcional e nunca é copiado para o portal. Arquivos não declarados produzem aviso e são ignorados; executáveis são recusados mesmo quando não declarados.

## Manifesto versão 1

```json
{
  "schemaVersion": 1,
  "collection": "guias",
  "title": "Guia de campo",
  "slug": "guia-de-campo",
  "status": "rascunho",
  "visibility": "publico",
  "tags": ["homebrew", "arborius"],
  "related": [],
  "source": "homebrew-arborius",
  "contentFile": "content/documento.md",
  "assets": [
    {
      "source": "assets/mapa.webp",
      "target": "mapa.webp"
    }
  ],
  "frontmatter": {
    "description": "Resumo editorial público do documento.",
    "updated": "2026-08-03",
    "order": 50,
    "exports": {
      "pdf": true,
      "markdown": true,
      "html": false
    }
  }
}
```

Campos comuns obrigatórios:

| Campo | Regra |
|---|---|
| `schemaVersion` | Deve ser exatamente `1`. |
| `collection` | `guias`, `materiais`, `itens`, `lore`, `quests`, `sessoes` ou `bestiario`. |
| `title` | Texto público não vazio. |
| `slug` | Letras ASCII minúsculas, números e hífens; deve ser único no portal. |
| `status` | `publicado` ou `rascunho`. |
| `visibility` | O schema reconhece três estados, mas o importador aceita somente `publico`. |
| `tags` | Lista de slugs já catalogados em `src/data/taxonomy.mjs`. |
| `related` | Lista de slugs; só é emitida nas coleções que possuem esse campo. |
| `source` | Origem pública já catalogada quando a coleção usa `origin` ou `sourceGuide`. |
| `contentFile` | Caminho relativo normalizado dentro de `content/`. |
| `assets` | Lista de imagens declaradas, todas dentro de `assets/`. |
| `frontmatter` | Campos editoriais específicos da coleção que não podem ser inferidos. |

Um asset também pode ser declarado pela forma curta `"assets/mapa.webp"`; nesse caso, o nome de destino será `mapa.webp`. A forma de objeto é recomendada por ser explícita.

## Campos por coleção

O importador espelha `src/content.config.ts`. Valores fixos, como `type: "guia"`, são derivados da coleção; valores editoriais não são inventados.

| Coleção | Extensões | `frontmatter` obrigatório | `frontmatter` opcional |
|---|---|---|---|
| `guias` | `.md`, `.mdx` seguro | `description`, `updated` | `order`, `cover`, `version`, `exports` |
| `materiais` | `.md` | `description`, `category`, `availability`, `updated` | — |
| `itens` | `.md` | `description`, `category`, `availability`, `updated` | `space` |
| `lore` | `.md` | `description`, `type`, `category`, `updated` | `order` |
| `quests` | `.md` | `description`, `type`, `state`, `updated` | `example` |
| `sessoes` | `.md` | `description`, `type`, `number`, `date`, `updated` | `participants`, `example` |
| `bestiario` | `.md` | `description`, `type`, `updated` | `example` |

O documento pode já possuir frontmatter. Nesse caso, os campos são validados e devem coincidir com o manifesto. Campos específicos podem estar no manifesto ou no documento, mas divergências são conflito e campos obrigatórios ausentes encerram a operação.

## Referências a assets

No documento do pacote, use o caminho declarado a partir da raiz do pacote:

```markdown
![Mapa de Árborius](assets/mapa.webp)
```

Não use `../assets/mapa.webp`, caminhos absolutos, letras de disco, `file://` ou barras invertidas. Durante a importação, a referência vira:

```markdown
![Mapa de Árborius](/images/content/guia-de-campo/mapa.webp)
```

O plugin `remark-content-assets.mjs` aplica o `BASE_URL` do Astro durante o build. O arquivo é copiado para `public/images/content/guia-de-campo/mapa.webp`.

Extensões aprovadas: PNG, JPEG, WebP, GIF, SVG e AVIF. Assinaturas binárias são verificadas. SVGs com scripts, eventos, `foreignObject`, entidades ativas ou caminhos locais são recusados.

## Dry-run

```bash
pnpm content:import "_entrada-conteudo/pacote-arborius"
```

Saída resumida:

```text
Importação de conteúdo — DRY-RUN
Pacote: .../_entrada-conteudo/pacote-arborius
Coleção: guias
Origem: .../content/documento.md
Destino: .../src/content/guias/guia-de-campo.md
Slug: guia-de-campo
Status: rascunho
Visibilidade: publico
Assets:
  - assets/mapa.webp -> .../public/images/content/guia-de-campo/mapa.webp
Conflitos:
  - nenhum
Avisos:
  - nenhum
Erros:
  - nenhum
Arquivos que seriam criados:
  - src/content/guias/guia-de-campo.md
  - public/images/content/guia-de-campo/mapa.webp

Dry-run concluído. Nenhum arquivo foi modificado.
```

Erros e conflitos fazem o comando terminar com código diferente de zero.

## Aplicação

Depois de revisar o dry-run:

```bash
pnpm content:import "_entrada-conteudo/pacote-arborius" --apply
```

A aplicação:

1. repete todas as verificações para evitar mudança entre conferência e escrita;
2. cria um lock local dentro da pasta ignorada;
3. monta conteúdo e assets em diretório temporário;
4. registra hashes SHA-256 e um plano de recuperação;
5. confirma novamente que nenhum destino existe;
6. copia usando modo exclusivo, que não permite sobrescrita;
7. executa `pnpm run validate`;
8. executa `pnpm run build`;
9. cria o relatório temporário somente após todas as etapas passarem.

Se qualquer etapa falhar, os arquivos criados são removidos e `public/downloads/` é restaurado a partir do backup temporário. A operação nunca altera arquivos de conteúdo que já existiam.

O relatório fica em `_entrada-conteudo/.relatorios/`, que é ignorada pelo Git. Ele contém data, pacote, hashes, arquivos criados, assets, reescritas, avisos, comandos executados e instruções manuais para desfazer. Se a aplicação falhar, o rollback também gera um relatório com `status: "revertida"`, os caminhos tentados e a confirmação de que `filesCreated` ficou vazio.

## Conteúdo recusado

O importador recusa:

- `visibility: "reservado"` ou `visibility: "oculto"`;
- caminhos absolutos, `..`, segmentos vazios, barras invertidas e nomes inseguros;
- links simbólicos e arquivos que resolvam fora do pacote;
- scripts ou executáveis em qualquer ponto do pacote;
- `<script>`, handlers HTML, `javascript:`, iframes, objects e embeds;
- import/export, componentes JSX e expressões JavaScript em MDX;
- assets não declarados ou com caminho local;
- referências para letras de disco, compartilhamentos UNC ou `file://`;
- extensão de imagem divergente de sua assinatura;
- slug, arquivo de conteúdo, pasta de assets ou asset já existente;
- tags, origens, categorias e disponibilidades incompatíveis com a taxonomia atual;
- frontmatter ausente, divergente ou incompatível com a coleção.

Trechos de código em blocos cercados podem documentar scripts, pois são texto e não são executados. Arquivos executáveis reais e MDX ativo continuam proibidos.

## Diagnóstico

Verifique a integração do importador com o repositório:

```bash
pnpm content:doctor
```

Execute também os três cenários de segurança em diretório temporário:

```bash
pnpm content:doctor -- --self-test
```

É possível diagnosticar um ou mais pacotes sem importá-los:

```bash
pnpm content:doctor -- "_entrada-conteudo/pacote-arborius"
```

## Revisão manual depois da aplicação

Mesmo após validação e build bem-sucedidos:

1. revise o relatório temporário;
2. execute `git status --short`;
3. revise individualmente o Markdown e os assets;
4. não use `git add .` nem `git add -A`;
5. selecione arquivos explicitamente somente depois da revisão humana;
6. faça commit ou push apenas em uma etapa separada e autorizada.