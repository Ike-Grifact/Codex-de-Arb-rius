# Relatório de migração — Portal Codex de Árborius

Data da migração: 28 de julho de 2026.

## Inventário de origem

A pasta original continha 94 arquivos, aproximadamente 19 MB:

- 10 HTML;
- 12 Markdown;
- 13 JavaScript;
- 4 JSON;
- 6 scripts MJS;
- 2 CSS;
- 16 SVG;
- 11 PNG;
- 20 WebP.

Foram detectadas duplicatas exatas entre `dados/` e `data/`, entre `foundry/` e a raiz e entre `instrucoes/` e a raiz. Nenhuma foi apagada. Todo o material original permanece fora de `arborius-portal/`.

## HTMLs migrados

1. `02_Guia_Jogador_Arboriano.html`
   - convertido em `src/content/guias/guia-arboriano.md`;
   - texto editável preservado a partir da fonte Markdown correspondente, após comparação do sumário com o HTML atual;
   - publicado na Biblioteca e no leitor.
2. `04_Guia_Materiais_Assimilados_Equipamentos_Partida.html`
   - identificado internamente como versão 4 e como arquivo mais recente, embora o nome atual não contenha `_v4`;
   - convertido em `src/content/guias/materiais-assimilados.mdx`;
   - cinco materiais e onze itens/provisões separados em fontes estruturadas;
   - detalhes incorporados ao guia por componentes, sem duplicar o texto-fonte.
3. `01_Guia_Jogador_Lucker.html`
   - convertido em `src/content/guias/guia-lucker.md`;
   - metadados `visibility: "reservado"` e `status: "rascunho"`;
   - nenhuma rota pública, resultado de busca ou download é gerado.

## Conteúdos convertidos para Markdown/MDX

### Guias

- Guia do Jogador — Linhagem Arboriana;
- Materiais Assimilados e Equipamentos de Partida v4;
- Guia do Jogador — Linhagem Lucker, somente estrutura reservada; o texto integral não foi copiado.

### Cinco Materiais Assimilados

- Lenho Regenerativo;
- Liga Escamosa;
- Seda Camaleônica;
- Fibra Tendínea, incluindo Tração Potente;
- Osso Alveolar.

### Equipamentos e provisões

- Vestimenta Acolchoada do Explorador;
- Projeto de Partida;
- Corda de exploração;
- Tenda de Seda Branca;
- Kit de Ferramentas Arboriano;
- Kit de Alimentação Arboriano;
- Provisões convencionais;
- Lagarta Nutritiva I;
- Sela Básica de Expedição;
- Ração equina de emergência;
- Reserva de água.

A montagem inicial preserva Sagacidade + Manufaturas, peças pré-fabricadas e o benefício de +1 de Durabilidade máxima e atual com um ou mais Sucessos. O estoque preserva três dias de provisões comuns por viajante e dez Lagartas Nutritivas adicionais.

## Componentes criados

- `AppHeader`, `AppSidebar` e `MobileNavigation`;
- `GuideCard`, `CompendiumCard`, `MaterialCard` e `ItemCard`;
- `QuestCard` e `SessionCard`;
- `GameSymbol` e `DicePool`;
- `RuleCard`, `ReaderControls`, `ExportControls` e `BetaBadge`;
- `MaterialsGuideSections`, responsável por incorporar fontes únicas no guia.

## Funcionalidades entregues

- página inicial narrativa com estados demonstrativos e vazios;
- Biblioteca e leitor com índice, progresso, fonte, tema e largura ajustáveis;
- preferências salvas em `localStorage`;
- Compêndio com filtros por tipo, categoria, disponibilidade e texto/tags;
- páginas individuais para todos os materiais e equipamentos migrados;
- busca local estática apenas de conteúdo público;
- impressão/PDF com CSS A4 específico;
- downloads Markdown limpos;
- estruturas de Mundo, Quests e Crônicas;
- Área do Assimilador separada e configurável;
- GitHub Actions e base automático para GitHub Pages;
- layout responsivo sem páginas A4 empilhadas no modo de tela.

## Funcionalidades beta

- Criação de fichas — somente estrutura e aviso local;
- Rolador de dados — somente estrutura e aviso local.

Não foram implementados VTT, conta, login, servidor, persistência remota, integração com Foundry ou ficha final.

## Arquivos mantidos fora do site público

- `03_SRD_Interno_Arborius.html`;
- `fontes/SRD_Assimilacao_Codex_Arborius_v1.5.md`;
- relatórios e justificativas de balanceamento;
- dados de Foundry e modelos de ficha antigos;
- texto integral do Guia Lucker no repositório e no build públicos;
- Material Sensitivo, regras secretas, bestiário oculto, quests secretas e notas internas.

Os arquivos de origem continuam preservados na pasta pai; não foram apagados nem substituídos.

## Decisões tomadas

- criação do projeto isolado em `arborius-portal/` para não alterar as fontes antigas;
- cópia, e não movimentação destrutiva, de `symbols/` para `public/symbols/`;
- uso dos nomes reais dos SVGs, incluindo `pontodedeterminacao.svg`;
- uso de Astro estático, MD/MDX, CSS próprio e JavaScript somente para preferências, filtros e busca;
- uso de marcadores tipográficos no lugar de capas inventadas;
- conteúdo de materiais e itens como fonte única;
- exemplos editoriais explicitamente identificados para evitar lore definitiva;
- HTML offline registrado como pendência para não comprometer a arquitetura inicial;
- `base` inferido do nome do repositório no GitHub Actions.

## Problemas encontrados

- o arquivo solicitado como `04_..._v4.html` existe com nome reduzido, mas o título interno confirma v4; foi usada a versão mais recente;
- havia duplicatas exatas em pastas antigas; foram mantidas intactas;
- a pasta original não era um repositório Git e não possuía configuração Astro ou de hospedagem;
- alguns ativos PNG/SVG auxiliares têm nomes com acentos ou grafia irregular; foram preservados sem renomear;
- a exportação HTML offline ainda exige uma etapa segura de empacotamento de estilos e SVGs.

## Pendências de conteúdo

- substituir os modelos por lore pública confirmada;
- registrar quests e sessões reais quando aprovadas;
- popular armas, armaduras, ferramentas, consumíveis, criaturas, NPCs, características e condições além do conjunto inicial;
- adicionar capas reais, mapas e imagens quando existirem;
- implementar HTML offline sem duplicar as fontes;
- decidir se e quando o Guia Lucker pode receber `visibility: "publico"` e `status: "publicado"`.

## Configuração do SRD privado

Crie um repositório privado chamado `arborius-srd`. No repositório público do portal, defina a variável `PUBLIC_SRD_REPOSITORY_URL` em **Settings → Secrets and variables → Actions → Variables**. O valor deve ser apenas a URL da página do repositório privado; não coloque tokens, senhas ou conteúdo do SRD.

## Alteração do repositório e do base

No GitHub Actions, `astro.config.mjs` lê `GITHUB_REPOSITORY`:

- repositório `usuario.github.io`: `base` igual a `/`;
- qualquer outro nome, como `arborius-portal`: `base` igual a `/<nome-do-repositorio>`.

Fora do GitHub, use `PUBLIC_BASE=/novo-caminho` e, se necessário, `SITE_URL=https://novo-host`.