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
 console.log("[Apolo editorial] OK: 15 técnicas, 3 capítulos, ícones, chips, ordem de leitura, acessibilidade e guia.");
}
