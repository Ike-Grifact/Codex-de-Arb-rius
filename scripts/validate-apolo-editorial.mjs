/* Garante que a leitura de Maestrias de Apolo não regrida.
   Executar: npm run validate:apolo (também no prebuild). */
import {readFileSync,existsSync} from "node:fs";
import {join} from "node:path";

const root=process.cwd();
const file=(p)=>readFileSync(join(root,p),"utf8");
const html=file("public/dossies/apolo-hellman-f943e1efaaa2.html");
const icons=file("public/dossies/assets/codex-symbol-notation.js");
const cards=file("public/dossies/assets/maestrias-rulecards.js");
const css=file("public/dossies/assets/apolo-editorial-playerbook.css");
const guide=file("docs/padroes/maestrias-redacao-e-iconografia.md");

const issues=[];
const check=(label,condition)=>{if(!condition)issues.push(label);};
const count=(s,re)=>(s.match(re)||[]).length;
const ids=new Set([...html.matchAll(/<article id="(habilidade-[^"]+)"/g)].map(x=>x[1]));
const links=[...html.matchAll(/href="#(habilidade-[^"]+)"/g)].map(x=>x[1]);
const files=["sucesso.svg","adaptacao.svg","pressao.svg","maestria-araucaria-coroa.svg","pontodedeterminacao.svg","pontodeassimilacao.svg"];

check("15 técnicas no dossiê",ids.size===15);
check("15 corpos de regra visíveis",count(html,/class="tech-content apolo-rule-body"/g)===15);

check("53 subseções de regras legíveis",count(html,/class="apolo-rule-part"/g)===53&&count(html,/<h4 id="regra-/g)===53);
check("índice de características por caminho",count(html,/class="apolo-feature-table"/g)===3&&count(html,/class="apolo-reader-map__item /g)===3);
check("custo original preservado para o card",count(html,/data-cost-source="/g)===15);
check("resumo da técnica deriva da própria regra",cards.includes("function apoloFeatureCard(parent)")&&cards.includes('parent.querySelectorAll(".apolo-rule-part")')&&cards.includes("costField?.dataset.costSource")&&!cards.includes('resumos.json'));
check("renderizador alcança mapa de Maestrias",icons.includes(".apolo-reader-map,.apolo-linked-intro"));
check("HTML semântico de tabelas e capítulos",count(html,/<article\b/g)===count(html,/<\/article>/g)&&count(html,/<section\b/g)===count(html,/<\/section>/g)&&count(html,/<table\b/g)===count(html,/<\/table>/g));
const ruleText=(slug)=>{
 const start=html.indexOf('<article id="habilidade-'+slug+'"');
 const end=start<0?-1:html.indexOf("</article>",start);
 return start>=0&&end>=0?html.slice(start,end):"";
};
check("Leitura conserva custos A/B e pistas",ruleText("leitura-de-partitura").includes("1 PM e 1A ou 1B")&&ruleText("leitura-de-partitura").includes("1A + 1B ou 2A"));
check("Vínculo não recebe custo por rodada",ruleText("vinculo-tatico").includes("Não há manutenção de PM por rodada")&&ruleText("vinculo-tatico").includes("+1B no resultado de um teste pertinente por rodada"));
check("Golpe conserva sacrifício e destino de A",ruleText("golpe-de-ruptura").includes("Qualidade anterior 2 ou superior")&&ruleText("golpe-de-ruptura").includes("+2A exclusivamente ao mesmo Objetivo Secundário"));
check("Controle Hemorrágico não cobra PM",ruleText("controle-hemorragico").includes("2 Pontos de Assimilação (2e)")&&ruleText("controle-hemorragico").includes("sem cobrança adicional de PM"));
check("Marca não cobra 1e antigo",ruleText("marca-sanguinea").includes("substitui")&&ruleText("marca-sanguinea").includes("o custo anterior de 1e"));
check("Origem noturna não custa PM",ruleText("julgamento-solar").includes("uma vez por sessão")&&ruleText("julgamento-solar").includes("não gasta PM"));
check("Convergência é compartilhada",ruleText("convergencia-dos-gemeos").includes("mesmo Objetivo e na mesma rodada")&&ruleText("convergencia-dos-gemeos").includes("compartilhada pelos irmãos"));
check("guia registra método de classes sem importar D&D",guide.includes("Aplicação editorial comprovada no dossiê de Apolo (v2)")&&guide.includes("não fonte normativa"));

check("3 índices de capítulos",count(html,/class="apolo-ability-index"/g)===3);
check("15 referências internas para técnicas",links.length===15&&links.every(id=>ids.has(id)));
check("sem regras essenciais recolhidas",!html.includes("class=\"apolo-tech-expand\""));
check("renderizador carregado",html.includes('src="assets/codex-symbol-notation.js"'));
check("renderizador carrega antes dos cartões",html.indexOf('src="assets/codex-symbol-notation.js"')<html.indexOf('src="assets/maestrias-rulecards.js"'));
check("renderizador restringe-se a Apolo",icons.includes('location.pathname.includes("apolo-hellman")'));
check("cartões usam o mesmo renderizador",cards.includes("CodexSymbolNotation?.enhance(pop)"));
check("renderizador acessível",icons.includes('span.setAttribute("role","img")')&&icons.includes('span.setAttribute("aria-label"'));
check("ícones oficiais mapeados",files.every(name=>icons.includes(name)&&existsSync(join(root,"public/symbols",name))));
check("notação N × ícone",icons.includes('count.textContent=n+" ×"')&&icons.includes("makeToken"));
check("quantidade fora da moldura",icons.includes('glyph.className="codex-symbol-token__glyph"')&&icons.includes("glyph.append(img)")&&icons.includes("span.append(glyph)")&&css.includes(".codex-symbol-token__glyph{"));
check("moldura somente no glifo",css.includes(".codex-symbol-token {")&&css.includes("background:transparent!important")&&css.includes("border:0!important"));
check("badges antigos sem duplicação de ícones",icons.includes("function enhanceLegacy(root)")&&icons.includes("old.replaceWith(makeToken(type,match[2],match[1]))"));
check("todas as famílias de referência com cores corretas",css.includes('a.apolo-ref-chip[data-codex-kind="A"]')&&css.includes('a.apolo-ref-chip[data-codex-kind="B"]')&&css.includes('a.apolo-ref-chip[data-codex-kind="C"]')&&css.includes('a.apolo-ref-chip[data-codex-kind="PM"]'));
check("card não envolve número em moldura duplicada",css.includes("A linha de custo do cartão NÃO é outra moldura"));

check("paleta do livro A vermelha B amarela C azul",css.includes("--codex-symbol-a:#922e39")&&css.includes("--codex-symbol-b:#7a580e")&&css.includes("--codex-symbol-c:#235e86"));
check("determinação vermelha e assimilação azul",css.includes("--codex-symbol-d:#922e39")&&css.includes("--codex-symbol-e:#235e86"));
check("PM com moldura cinza clara",css.includes(".codex-symbol-token--PM .codex-symbol-token__glyph")&&css.includes("background:#eceeed"));
check("link da barra escura legível",css.includes("body .apolo-quicknav > a.codex-rule-collection-link")&&css.includes("color:#f4e5bd!important"));
check("paleta escrita no guia",guide.includes("A = vermelho, B = amarelo, C = azul")&&guide.includes("PM = cinza-claro"));

check("chips com ícones de referência",icons.includes("enhanceRefs(root)")&&css.includes(".apolo-ref-chip[data-codex-kind="));
check("imagens ficam abaixo da regra",css.includes("order:0!important")&&css.includes("order:1!important")&&css.includes("display:flex!important"));
check("guia normativo com precedência e direitos",guide.includes("Precedência")&&guide.includes("D&D Beyond")&&guide.includes("SRD"));
check("CSS com chaves balanceadas",count(css,/\{/g)===count(css,/\}/g));

if(issues.length){
 console.error("[Apolo editorial] Falha de validação:\n"+issues.map(s=>"- "+s).join("\n"));
 process.exitCode=1;
}else{
 console.log("[Apolo editorial] OK: 15 técnicas, 53 subseções, 3 tabelas, 3 caminhos, SRD, ícones, cards derivados, acessibilidade e guia.");
}
