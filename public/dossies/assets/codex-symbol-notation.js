/* Codex de Árborius — notação de símbolos (somente no dossiê de Apolo).
   Fonte visual única: /symbols/*.svg. Nunca altera regra/custo, apenas a apresentação. */
(() => {
  "use strict";
  if (!location.pathname.includes("apolo-hellman")) return;
  const base = new URL("../../symbols/", document.currentScript?.src || location.href);
  const symbols = Object.freeze({
    A: {name:"Sucesso (A)", plural:"Sucessos (A)", file:"sucesso.svg"},
    B: {name:"Adaptação (B)", plural:"Adaptações (B)", file:"adaptacao.svg"},
    C: {name:"Pressão (C)", plural:"Pressões (C)", file:"pressao.svg"},
    PM: {name:"Ponto de Maestria (PM)", plural:"Pontos de Maestria (PM)", file:"maestria-araucaria-coroa.svg"},
    d: {name:"Ponto de Determinação (d)", plural:"Pontos de Determinação (d)", file:"pontodedeterminacao.svg"},
    e: {name:"Ponto de Assimilação (e)", plural:"Pontos de Assimilação (e)", file:"pontodeassimilacao.svg"}
  });
  const tokenPattern=/(^|[^0-9A-Za-zÀ-ÿ_])([+\-−]?)(\d+)\s*(PM|[ABCde])(?=$|[^0-9A-Za-zÀ-ÿ_])/g;
  const ignoreSelector="script,style,noscript,textarea,code,pre,svg,.codex-symbol-token,.apolo-art,.apolo-book-media";

  function makeToken(symbol, quantity=null, modifier="") {
    const item=symbols[symbol];
    if (!item) return document.createTextNode(quantity==null ? symbol : String(quantity)+symbol);
    const span=document.createElement("span");
    span.className="codex-symbol-token codex-symbol-token--"+symbol;
    span.setAttribute("role","img");
    const n=quantity==null?null:Number(quantity);
    span.setAttribute("aria-label", (modifier==="+"?"mais ":modifier==="-"||modifier==="−"?"menos ":"")+
      (n===null?"":n+" ")+(n===1?item.name:item.plural));
    if (modifier) {
      const sign=document.createElement("span");
      sign.className="codex-symbol-token__modifier";
      sign.textContent=modifier==="−"?"−":modifier;
      span.append(sign);
    }
    if (n!==null) {
      const count=document.createElement("span");
      count.className="codex-symbol-token__count";
      count.textContent=n+" ×";
      span.append(count);
    }
    // A quantidade permanece FORA da caixa colorida; somente o emblema fica na caixa.
    // O agrupamento externo é único para leitores de tela e impede quebra entre N × e ícone.
    const glyph=document.createElement("span");
    glyph.className="codex-symbol-token__glyph";
    glyph.setAttribute("aria-hidden","true");
    const img=document.createElement("img");
    img.src=new URL(item.file,base).href;
    img.alt="";
    img.setAttribute("aria-hidden","true");
    img.decoding="async";
    glyph.append(img);
    span.append(glyph);
    return span;
  }
  function renderText(root) {
    const candidates=[];
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let node;
    while ((node=walker.nextNode())) {
      const parent=node.parentElement;
      if (!parent || parent.closest(ignoreSelector) || !node.nodeValue) continue;
      tokenPattern.lastIndex=0;
      if (tokenPattern.test(node.nodeValue)) candidates.push(node);
    }
    for (const textNode of candidates) {
      const text=textNode.nodeValue;
      tokenPattern.lastIndex=0;
      let match,last=0,changed=false;
      const out=document.createDocumentFragment();
      while ((match=tokenPattern.exec(text))) {
        changed=true;
        const start=match.index+match[1].length;
        if(start>last)out.append(document.createTextNode(text.slice(last,start)));
        out.append(makeToken(match[4],match[3],match[2]));
        last=tokenPattern.lastIndex;
      }
      if(!changed)continue;
      if(last<text.length)out.append(document.createTextNode(text.slice(last)));
      textNode.replaceWith(out);
    }
  }
  const categoryIcons={
    "acao-em-conflito":"acao",
    "acao-simples":"acao",
    "objetivo-secundario":"objetivo",
    "marco-de-debilitacao":"objetivo",
    "neutralizacao":"objetivo",
    "recuperacao-de-pm":"PM",
    "pontos-de-maestria":"PM",
    "pontos-de-determinacao":"d",
    "pontos-de-assimilacao":"e",
    "sucesso-a":"A",
    "adaptacao-b":"B",
    "pressao-c":"C"
  };
  function genericIcon(kind) {
    const ns="http://www.w3.org/2000/svg";
    const svg=document.createElementNS(ns,"svg");
    svg.setAttribute("viewBox","0 0 24 24");
    svg.setAttribute("fill","none");
    svg.setAttribute("stroke","currentColor");
    svg.setAttribute("stroke-width","1.9");
    svg.setAttribute("stroke-linecap","round");
    svg.setAttribute("stroke-linejoin","round");
    svg.setAttribute("aria-hidden","true");
    svg.classList.add("codex-ref-icon");
    const paths=kind==="acao"?["M4 12h15","m13 6 6 6-6 6"]:
      kind==="objetivo"?["M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0","M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0","M12 12h.01"]:
      kind==="procedimento"?["M21 11a9 9 0 0 0-16-5","M5 2v4h4","M3 13a9 9 0 0 0 16 5","M19 22v-4h-4"]:
      ["M12 6c-4-2-7-2-10-1v14c4-1 7-1 10 1 3-2 6-2 10-1V5c-3-1-6-1-10 1","M12 6v14"];
    for(const d of paths){
      const p=document.createElementNS(ns,"path");
      p.setAttribute("d",d);
      svg.append(p);
    }
    return svg;
  }
  function classifyRef(link) {
    let slug="";
    try { slug=new URL(link.href).pathname.match(/\/regras\/([^/]+)\//)?.[1]||""; }
    catch(_err){ /* URL inválida permanece uma referência genérica */ }
    const kind=categoryIcons[slug]||link.dataset.refType||"regra";
    return {slug,kind};
  }
  function enhanceRefs(root) {
    const links=root.querySelectorAll?.(".apolo-tech-references a.apolo-ref-chip")||[];
    for (const link of links) {
      if (link.dataset.codexIconReady==="true") continue;
      const {kind}=classifyRef(link);
      link.dataset.codexKind=kind;
      link.querySelectorAll("img.apolo-rule-symbol").forEach(img=>img.remove());
      const item=symbols[kind];
      let icon;
      if (item) {
        icon=document.createElement("img");
        icon.src=new URL(item.file,base).href;
        icon.className="codex-ref-icon";
        icon.alt="";
        icon.setAttribute("aria-hidden","true");
      } else icon=genericIcon(kind);
      link.prepend(icon);
      link.dataset.codexIconReady="true";
    }
  }
  function enhancePairs(root) {
    const chips=root.querySelectorAll?.(".codex-rule-mini-cost strong")||[];
    for (const field of chips) {
      const value=field.textContent.trim();
      if(!/^[ABC]\s*\/\s*[ABC]$/.test(value))continue;
      const parts=value.split(/\s*\/\s*/);
      field.replaceChildren(makeToken(parts[0]),document.createTextNode(" / "),makeToken(parts[1]));
    }
  }
  function enhanceLegacy(root) {
    // Exemplo antigo: <span class="sym sym-a"><img ...><span>3A</span></span>
    // Um único token evita o problema "ícone + 3A" e também mantém +2A como bônus.
    root.querySelectorAll?.(".sym.sym-a,.sym.sym-b,.sym.sym-c").forEach(old=>{
      const type=old.classList.contains("sym-a")?"A":old.classList.contains("sym-b")?"B":"C";
      const match=old.textContent.trim().match(/^([+\-−]?)(\d+)\s*([ABC])$/);
      if (!match || match[3]!==type) return;
      old.replaceWith(makeToken(type,match[2],match[1]));
    });
  }
  function enhance(root) {
    if(!root)return;
    // Símbolo antigo inserido antes de "1A" causa duplicidade na leitura visual.
    root.querySelectorAll?.("a.codex-linked-term:has(img.apolo-rule-symbol)").forEach(link=>{
      if(/\b\d+\s*[ABC]\b/.test(link.textContent)) {
        link.querySelectorAll("img.apolo-rule-symbol").forEach(img=>img.remove());
      }
    });
    enhanceLegacy(root);
    enhanceRefs(root);
    enhancePairs(root);
    renderText(root);
  }
  window.CodexSymbolNotation=Object.freeze({enhance,makeToken});
  function init() {
    document.querySelectorAll(".apolo-linked-intro,.apolo-linked-reading,.maestria-economia,.ability-section").forEach(enhance);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
