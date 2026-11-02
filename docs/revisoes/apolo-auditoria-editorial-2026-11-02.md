# Auditoria editorial — Apolo Hellman como capítulo do Livro do Jogador

**Data:** 02/11/2026 · **Estado:** revisão editorial de campanha [HOMEBREW] [TESTE] · **Base:** SRD Assimilação v1.29.

## O que estudamos no D&D Beyond

Referências externas de **método de apresentação** (nunca fontes de mecânica de Assimilação):
- [Basic Rules 2024 — Character Classes](https://www.dndbeyond.com/sources/dnd/br-2024/character-classes): abertura de classe, tabela com traços/características, habilidades individuais com subtítulos para efeitos e limites.
- [Basic Rules 2024 — Rules Glossary](https://www.dndbeyond.com/sources/dnd/br-2024/rules-glossary): definições curtas, categorias de regras e referências cruzadas opcionais (*See Also*).

Essas páginas demonstram um **modo de consulta**: visão geral → progressão/índice → regra integral → glossário. Não reproduzimos texto, visual de marca, termos de classe ou mecânicas de D&D. Em especial, D&D trabalha com níveis de classe, o que não autoriza criar níveis para as Maestrias.

## Diagnóstico da versão anterior

- Havia três capítulos e 15 habilidades, mas o resumo de cada técnica reunia gatilho, custo e efeito na mesma linha e o corpo das regras usava rótulos embutidos em parágrafos.
- O índice listava apenas nomes, sem distinguir passiva, recurso consumido, técnica de Conflito ou recompensa.
- Os cards buscavam resumos em JSON independente do texto integral e poderiam ficar desatualizados após revisão.
- A barra de navegação inicial repetia parte do papel do índice; as três Maestrias não tinham um mapa claro da **reserva única 2 → 4 → 6 PM**.

## Padrão aplicado ao dossiê

1. **Mapa dos três caminhos:** apresenta I, II e III com foco e reserva máxima compartilhada, não somada.
2. **Quadro de características por Maestria:** habilidade, tipo, uso/custo e efeito breve; 6 + 4 + 5 linhas. Equivale editorialmente à tabela de progressão, mas respeita o modo de desbloqueio de Assimilação.
3. **Regra integral em fluxo contínuo:** 15 habilidades com 53 seções semânticas \`h4\` (observação, ativação, condição, efeito, limites etc.). Nenhuma técnica exige abrir um acordeão.
4. **Texto normativo direto e português consistente:** sujeito, momento de uso, custo, resultado, duração/frequência e limites; exemplos e comentários de contexto não se misturam a efeitos.
5. **Cartões de consulta derivados do conteúdo exibido:** \`maestrias-rulecards.js\` lê \`.apolo-rule-part\` e \`data-cost-source\` do HTML, não usa \`resumos.json\` como segunda cópia no dossiê.
6. **Imagens depois das regras:** mantém leitura linear no desktop, mobile e impressão. Notação visual N × ícone permanece a definida no padrão cromático anterior.
7. **Marcador de fonte por capítulo:** SRD v1.29, §§193 e Parte XXX, sempre identificado como conteúdo homebrew/teste.

## Verificações mecânicas contra Assimilação / SRD v1.29

| Tema | Restrição preservada |
|---|---|
| Reserva de PM | 2 / 4 / 6 é máximo conjunto, não três reservas somadas |
| Leitura | Observação gratuita após duas ocorrências; Análise 1 PM + 1A **ou** 1B; Antecipação 1 PM + (1A+1B **ou** 2A) em Conflito |
| Plano | Proposta plausível sem PM; Leitura especializada pode abrir na mesma ação sem segundo custo; símbolo pago não progride o Objetivo |
| Vínculo | 1 PM para estabelecer ou trocar; +1B pertinente a um aliado por rodada; nenhum PM de manutenção |
| Golpe | 1 PM + 1A próprio + arma Q2+ destruída; pré-requisito de metade do Secundário; +2A **só** naquele Objetivo, uma vez por Conflito |
| Origem solar | Terceira Origem noturna extra, 0 PM, uma vez por sessão; sem Agir por Instinto |
| Arte e herança de XP | Haicai 1 XP; desenho 2 XP sob tempo/realização; herança 2 XP de Apolo → 1 XP de Aruana |
| Convergência | Pelo menos 1A próprio de ambos, mesmo Objetivo/rodada, +1A único compartilhado, uma vez por Conflito |
| Controle Hemorrágico | 2e, sem PM, até S4 e somente uma vez entre repousos completos |
| Marca | 1 PM substitui 1e; contato com sangue próprio, alcance 1 km por Nível de Assimilação, uma marca ativa |
| Duelo e Herança | Declarado antes, risco real; interferência direta impede troféu; Herança anula apenas 1C do próximo Teste de Assimilação |

**Não se atribuiu nenhum novo benefício mecânico** a Alvorecer, Discernimento da Verdade, Julgamento dos Inimigos ou Convicção Solar.

## Orientação de manutenção

O padrão vinculante de escrita/UX está em [maestrias-redacao-e-iconografia.md](../padroes/maestrias-redacao-e-iconografia.md). Ao mudar números/efeitos, validar primeiro o livro e o SRD vigente; em mudanças somente editoriais, preservar literalmente o custo, a frequência e a economia das Partituras. Se houver divergência, não corrigir por analogia a D&D: marcar como questão de regra para decisão.

**Validação automatizada:** \`npm run validate:apolo\` (executada pelo prebuild); confere estrutura, recursos especiais e ícones. Não substitui inspeção visual em navegador real nem revisão de mesa.
