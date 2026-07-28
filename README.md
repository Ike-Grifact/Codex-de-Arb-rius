# Codex de Árborius — Portal público

Portal estático da campanha, construído com Astro, MDX e CSS próprio. A primeira edição reúne a Biblioteca, o leitor de guias, o Compêndio inicial, estruturas para Mundo, Quests e Crônicas, Laboratório beta, busca local e exportações.

## Segurança editorial

O portal só gera páginas para conteúdo com `visibility: "publico"` e `status: "publicado"`.

- O Guia Lucker possui apenas um stub de metadados em `src/content/guias/guia-lucker.md`; o texto integral permanece fora do repositório público, e o stub continua `reservado` e `rascunho`.
- O SRD, relatórios de balanceamento, notas internas, bestiário oculto e quests secretas não foram copiados para este projeto.
- Não há login, senha no JavaScript, hash de senha, criptografia no frontend, banco de dados, servidor ou API externa.
- Nunca coloque arquivos privados em `public/`: tudo nessa pasta é publicado sem proteção.

## Requisitos

- Node.js 24 ou versão compatível com a versão de Astro registrada no lockfile;
- pnpm 11.9.0 por meio de Corepack, ou uma instalação equivalente.

## Instalação e uso local

```bash
corepack enable
pnpm install
pnpm run dev
```

O terminal exibirá o endereço local. Para validar e compilar:

```bash
pnpm run validate
pnpm run build
pnpm run preview
```

Depois de `pnpm install`, os scripts também podem ser chamados com `npm run dev` e `npm run build` em ambientes que forneçam npm.

## Conteúdo e fonte única

- `src/content/guias/`: guias completos e seus metadados;
- `src/content/materiais/`: os cinco Materiais Assimilados;
- `src/content/itens/`: equipamentos e provisões iniciais;
- `src/content/lore/`, `quests/`, `sessoes/` e `bestiario/`: infraestrutura editorial;
- `public/symbols/`: cópia preservada dos símbolos reais fornecidos;
- `public/downloads/markdown/`: cópias públicas geradas por script.

Materiais e itens existem uma única vez como conteúdo estruturado. Os mesmos arquivos alimentam o guia de materiais, o Compêndio, a busca, os cards e as exportações.

### Publicar ou reservar um conteúdo

Use estes metadados:

```yaml
visibility: "publico"
status: "publicado"
```

Para bloquear publicação e busca:

```yaml
visibility: "reservado"
status: "rascunho"
```

Execute `pnpm run validate` antes de enviar alterações.

## Exportações

- **PDF:** o botão `Exportar / PDF` usa a caixa de impressão do navegador e `src/styles/print.css`.
- **Markdown:** `scripts/build-downloads.mjs` gera cópias limpas apenas de conteúdo público.
- **HTML offline:** a interface indica que a função está planejada. Ela não foi implementada nesta entrega para preservar a fundação do conteúdo como fonte única.

## GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` instala dependências, valida conteúdo, compila, envia o artefato e publica no Pages.

1. Crie um repositório no GitHub e envie o conteúdo desta pasta para a branch `main`.
2. Em **Settings → Pages**, escolha **GitHub Actions** como fonte.
3. Execute o workflow ou faça push na branch `main`.

`astro.config.mjs` lê `GITHUB_REPOSITORY` automaticamente:

- em `https://usuario.github.io/`, usa `base: "/"` quando o repositório se chama `usuario.github.io`;
- em `https://usuario.github.io/arborius-portal/`, usa `base: "/arborius-portal"` quando esse é o nome do repositório.

Todos os links e ativos de interface usam `import.meta.env.BASE_URL`. Para outro host, defina opcionalmente:

```bash
SITE_URL=https://exemplo.com
PUBLIC_BASE=/subpasta
```

Para alterar o nome do repositório, basta renomeá-lo no GitHub: o workflow infere o novo `base`. Em compilação fora do GitHub, ajuste `PUBLIC_BASE` manualmente.

## Repositório privado do SRD

Mantenha o SRD em outro repositório chamado `arborius-srd` e configure-o como **privado**. O repositório público deve conter somente o portal.

Para mostrar um botão na Área do Assimilador, crie no GitHub uma variável de repositório chamada `PUBLIC_SRD_REPOSITORY_URL` com a URL da página do repositório privado. A URL não concede acesso; as permissões continuam sendo controladas pelo GitHub. Não use essa variável para segredos.

Localmente, copie `.env.example` para `.env` e ajuste a URL. O arquivo `.env` é ignorado pelo Git.

## Scripts

- `pnpm run migrate`: verifica os HTMLs prioritários contra suas fontes Markdown e regenera os dois guias de linhagem com metadados.
- `pnpm run validate`: verifica fontes, símbolos, slugs, metadados e ausência de arquivos reservados em `public/`.
- `pnpm run downloads`: gera as exportações Markdown públicas.
- `pnpm run build`: valida, gera downloads, compila o Astro e inspeciona o resultado.

## Conteúdo demonstrativo

A página inicial e as áreas de Mundo, Quests e Crônicas usam modelos explicitamente marcados como **Exemplo** ou estados vazios. Substitua-os somente por registros públicos confirmados da campanha.

## Relatório

Consulte `MIGRATION_REPORT.md` para o inventário migrado, decisões, pendências e problemas observados.