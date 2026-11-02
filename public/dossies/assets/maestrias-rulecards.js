/* Cartões de Maestria do Codex de Árborius — conteúdo extraído do próprio guia. */
(() => {
  "use strict";

  // O script está em /dossies/assets/; o emblema é armazenado em /symbols/.
  const emblem = new URL("../../symbols/maestria-araucaria-coroa.svg", document.currentScript?.src || location.href).href;
  const apolo = location.pathname.includes("apolo-hellman");
  const mode = window.matchMedia("(hover: hover) and (pointer: fine)");
  const pop = document.createElement("aside");
  pop.id = "codex-rule-popover";
  pop.className = "codex-rule-popover";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-label", "Consulta rápida de Maestria");
  pop.setAttribute("aria-modal", "false");
  pop.setAttribute("aria-hidden", "true");
  pop.innerHTML = '<div class="codex-rule-popover__header"><img class="codex-rule-popover__emblem" alt="" src="' + emblem + '"><div class="codex-rule-popover__meta"><span class="codex-rule-popover__eyebrow">Codex de Árborius · Maestrias</span><h2 class="codex-rule-popover__title"></h2><span class="codex-rule-popover__cost"></span></div><button class="codex-rule-popover__close" type="button" aria-label="Fechar consulta">×</button></div><div class="codex-rule-popover__body"></div><div class="codex-rule-popover__footer"><small></small><a href="#" class="codex-rule-popover__read">Ler seção completa →</a></div>';
  document.body.appendChild(pop);
  const title = pop.querySelector(".codex-rule-popover__title");
  const cost = pop.querySelector(".codex-rule-popover__cost");
  const body = pop.querySelector(".codex-rule-popover__body");
  const note = pop.querySelector(".codex-rule-popover__footer small");
  const read = pop.querySelector(".codex-rule-popover__read");
  const close = pop.querySelector(".codex-rule-popover__close");
  let current = null, hideTimer = null, pinned = false;

  const apoloSummary = {
    adaptativa: [
      "<p><strong>Reserva ao adquirir: 2 PM.</strong> Observação Recorrente e proposta de plano válido não custam PM. Análise Imediata e Antecipação gastam 1 PM, além dos símbolos em Conflito; o jogador não paga para deduzir algo que viu.</p>",
      "<p><strong>Vínculo Tático:</strong> 1 PM para conceder +1B em um teste pertinente por rodada ao aliado vinculado. <strong>Golpe de Ruptura:</strong> 1 PM, 1A próprio e destruição de arma de Qualidade 2+, com +2A exclusivos no Objetivo Secundário.</p>"
    ],
    bencao: [
      "<p><strong>Reserva total ao adquirir: 4 PM.</strong> Criação artística e ritos podem conceder XP pelas condições registradas no guia. Julgamento Solar continua uma terceira Origem especial, noturna, 1 vez por sessão.</p>",
      "<p><strong>Convergência dos Gêmeos:</strong> 0 PM, 1 vez por Conflito, +1A ao mesmo Objetivo se Apolo e Aruana investirem pelo menos 1A próprio cada na mesma rodada. Herança Compartilhada transfere XP na razão 2:1.</p>"
    ],
    sangue: [
      "<p><strong>Reserva total ao adquirir: 6 PM.</strong> Percepção Hemática é passiva. Marca Sanguínea custa 1 PM e substitui o antigo 1e; dura até o próximo repouso completo e alcança 1 km por Nível de Assimilação.</p>",
      "<p><strong>Controle Hemorrágico:</strong> mantém 2e sem PM adicional, com limites de recuperação próprios. Duelo Hemático e Herança de Batalha dependem de Marca e condições específicas, sem custo de PM para declarar o duelo ou colher a recompensa.</p>"
    ]
  };

  // O resumo do cartão nasce do texto integral e VIVO da página: uma fonte só.
  // O SRD continua a fonte normativa; a ficha objetiva é consulta complementar.
  function apoloFeatureCard(parent) {
    const wrap=document.createElement("div");
    wrap.className="codex-rule-summary";
    const lead=document.createElement("p");
    lead.className="codex-rule-summary__lead";
    lead.textContent=parent.querySelector(".apolo-tech-teaser")?.textContent?.trim() || "";
    wrap.appendChild(lead);
    const sections=[...parent.querySelectorAll(".apolo-rule-part")];
    const samples=sections.length<=4 ? sections : [...sections.slice(0,3),sections.at(-1)];
    for(const section of samples) {
      const entry=document.createElement("div");
      entry.className="codex-rule-summary__rule";
      const heading=document.createElement("strong");
      heading.className="codex-rule-summary__rule-title";
      heading.textContent=section.querySelector("h4")?.textContent || "Regra";
      const paragraph=document.createElement("p");
      const original=section.querySelector("p");
      if(original)paragraph.innerHTML=original.innerHTML;
      entry.append(heading,paragraph);
      wrap.appendChild(entry);
    }
    const costField=parent.querySelector(".tech-cost");
    return {
      heading:parent.querySelector(".tech-head h3")?.textContent?.trim() || parent.dataset.ruleSlug,
      cost:costField?.dataset.costSource || costField?.textContent?.trim() || "",
      html:wrap,full:false,concise:true,
      href:"#"+parent.id
    };
  }

  const normalize = (value) => (value || "").replace(/\s+/g, " ").trim();
  function cleanFragment(source, maxChars = 12500) {
    const wrapper = document.createElement("div");
    if (!source) return wrapper;
    const clone = source.cloneNode(true);
    clone.querySelectorAll("script,style,figure,dialog,iframe,video,audio,canvas,button,form,.codex-rule-trigger,.lud-illustration,.lud-hover-layer,.apolo-art,.aru-art,.vespa-art").forEach(el => el.remove());
    clone.querySelectorAll("img").forEach(img => {
      if (!img.closest(".sym,.mechanic,.reference-resource,.cost-glyph,.codex-symbol-token")) img.remove();
    });
    if (clone.innerHTML.length > maxChars) {
      let used = 0;
      const iter = [...clone.querySelectorAll("p,li,tr")];
      for (const el of iter) {
        if (used > maxChars) { el.remove(); continue; }
        used += el.textContent?.length || 0;
      }
    }
    if (clone.matches("p,li,table,ul,ol,blockquote")) wrapper.append(clone);
    else wrapper.append(...clone.childNodes);
    return wrapper;
  }

  function collectFollowing(node, maxNodes = 8) {
    const div = document.createElement("div");
    let next = node?.nextElementSibling;
    let count = 0, chars = 0;
    while (next && count < maxNodes && chars < 3500) {
      if (/^H[1-4]$/.test(next.tagName) || next.matches(".chapter-divider,.section-header,.subsection-title")) break;
      if (next.matches("p,ul,ol,table,blockquote,.rule-note,.rules-scroll,.tech-content,.brandon-book-spread,.vespa-editorial-spread,.lud-tech,.feature")) {
        const child = cleanFragment(next, 4500);
        div.append(...child.childNodes);
        chars += normalize(next.textContent).length;
        count++;
      }
      next = next.nextElementSibling;
    }
    return div;
  }

  function fromSection(target) {
    if (!target) return document.createElement("div");
    if (/^H[1-4]$/.test(target.tagName)) return collectFollowing(target);
    const div = document.createElement("div");
    const first = target.querySelector(".requirements,.section-intro,.section-quote,.tech-content,.body-copy,.lead,.prose > p,p");
    if (first) {
      const cloned = cleanFragment(first, 3600);
      div.append(...cloned.childNodes);
    }
    if (div.textContent.trim().length < 45) {
      const p = [...target.querySelectorAll("p")].slice(0, 3);
      p.forEach(el => { const clone=cleanFragment(el, 2700); div.append(...clone.childNodes); });
    }
    return div;
  }

  function resolve(node) {
    const maestriaSection = node.matches(".section-header h2") ? node.closest(".ability-section[id]") : null;
    if (maestriaSection) {
      if (apolo && apoloSummary[maestriaSection.id]) {
        const div = document.createElement("div");
        div.innerHTML = apoloSummary[maestriaSection.id].join("");
        return {heading:normalize(node.textContent),cost:"Trilogia PO/PM · campanha em teste",html:div,full:false,href:"#" + maestriaSection.id};
      }
      return {heading:normalize(node.textContent),cost:"Resumo do dossiê",html:fromSection(maestriaSection),full:false,href:"#" + maestriaSection.id};
    }
    const parent = node.closest(".technique");
    const heading = normalize(node.textContent.replace("⌕", ""));
    if (parent) {
      if (apolo && parent.dataset.ruleSlug && parent.querySelector(".apolo-rule-part")) {
        return apoloFeatureCard(parent);
      }
      const rich = parent.querySelector(".tech-content");
      return { heading:normalize(parent.querySelector("h3")?.textContent || heading),cost:normalize(parent.querySelector(".tech-cost")?.textContent),html:cleanFragment(rich),full:true,href:"#" + (parent.closest("section[id]")?.id || "inicio") };
    }
    if (node.matches("a[href^='#']")) {
      const id = decodeURIComponent(node.hash.slice(1));
      if (apoloSummary[id]) {
        const div=document.createElement("div");div.innerHTML=apoloSummary[id].join("");
        return {heading:normalize(node.textContent),cost:"Trilogia PO/PM · campanha em teste",html:div,full:false,href:"#" + id};
      }
      const target = document.getElementById(id);
      if (!target) return null;
      return {heading:normalize(node.textContent),cost:"Trecho do dossiê",html:fromSection(target),full:false,href:"#" + id};
    }
    let rich = collectFollowing(node);
    if (!rich.textContent.trim()) {
      const feature = node.closest(".feature,.lud-tech,.ability,.card,.prose");
      if (feature) rich = cleanFragment(feature, 4500);
    }
    return {heading,cost:"Trecho do dossiê",html:rich,full:false,href:"#" + (node.closest("[id]")?.id || "inicio")};
  }

  function hide() {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = null;
    pop.setAttribute("aria-hidden", "true");
    if (current?.button) current.button.setAttribute("aria-expanded", "false");
    current = null; pinned = false;
  }
  function scheduleHide() {
    if (pinned) return;
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, 240);
  }
  function position(anchor) {
    if (window.innerWidth <= 640) { pop.style.left = "10px"; pop.style.top="auto"; return; }
    const rect = anchor.getBoundingClientRect();
    const width = Math.min(490, window.innerWidth - 24);
    const right = rect.right + 12;
    const left = rect.left - width - 12;
    const x = (right + width <= window.innerWidth - 12) ? right : ((left >= 12) ? left : Math.max(12, window.innerWidth - width - 12));
    const top = Math.max(12, Math.min(rect.top - 6, window.innerHeight - pop.offsetHeight - 12));
    pop.style.left = x + "px";
    pop.style.top = top + "px";
  }
  function show(item, lock=false) {
    const result=resolve(item.node);
    if (!result) return;
    if (hideTimer) clearTimeout(hideTimer);
    if (current?.button && current.button !== item.button) current.button.setAttribute("aria-expanded","false");
    title.textContent=result.heading;
    cost.replaceChildren();
    if (result.costs) {
      for (const c of result.costs) {
        const chip = document.createElement("span");
        chip.className="codex-rule-mini-cost codex-rule-mini-cost--"+c.type;
        // Custos passam por uma única camada de notação compartilhada com o livro.
        // Não anexar SVG aqui: o renderizador converte "1 PM" em "1 × [símbolo]".
        const v=document.createElement("strong");v.textContent=c.value;
        const label=document.createElement("small");label.textContent=c.label;
        chip.append(v,label);
        cost.appendChild(chip);
      }
    } else cost.textContent=result.cost;
    body.replaceChildren(result.html);
    if (apolo) window.CodexSymbolNotation?.enhance(pop);
    if (!body.textContent.trim()) body.textContent="Consulte a seção completa para os detalhes desta capacidade.";
    body.scrollTop = 0;
    note.textContent = result.concise ? "Resumo editorial · SRD v1.29 [TESTE]" : (result.full ? "Regra completa deste bloco · Dossiê do jogador" : "Prévia do texto existente · Consulte a seção integral");
    read.textContent = result.concise ? "Ir à regra integral nesta página →" : "Ler seção completa →";
    read.href=result.href;
    pop.setAttribute("aria-hidden","false");
    item.button?.setAttribute("aria-expanded","true");
    current=item;pinned=lock;
    position(item.button || item.node);
  }
  pop.addEventListener("pointerenter",()=>{if(hideTimer)clearTimeout(hideTimer)});
  pop.addEventListener("pointerleave",scheduleHide);
  pop.addEventListener("focusin",()=>{if(hideTimer)clearTimeout(hideTimer)});
  pop.addEventListener("focusout",e=>{if(!pop.contains(e.relatedTarget))scheduleHide()});
  close.addEventListener("click",hide);
  read.addEventListener("click",hide);
  window.addEventListener("keydown",e=>{if(e.key==="Escape"&&current){hide()}});
  window.addEventListener("scroll",e=>{if(e.target===document||e.target===window)hide()},{passive:true});
  document.addEventListener("pointerdown",e=>{if(current&&!pop.contains(e.target)&&!current.node.contains(e.target))hide()});

  const used=new Set();
  function connect(node, withButton) {
    if (!node || used.has(node)) return;
    const sample=resolve(node);
    if (!sample||normalize(sample.html.textContent).length<24) return;
    used.add(node);
    const item={node,button:null};
    if (withButton) {
      const btn=document.createElement("button");
      btn.type="button";btn.className="codex-rule-trigger";btn.title="Consultar regra de Maestria";
      btn.setAttribute("aria-label","Consultar regra: " + sample.heading);
      btn.setAttribute("aria-controls",pop.id);btn.setAttribute("aria-expanded","false");
      const img=document.createElement("img");img.src=emblem;img.alt="";img.setAttribute("aria-hidden","true");btn.appendChild(img);
      node.appendChild(btn);item.button=btn;
      btn.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();if(current?.node===node&&pinned)hide();else show(item,true)});
    }
    node.addEventListener("pointerenter",()=>{if(mode.matches)show(item,false)});
    node.addEventListener("pointerleave",scheduleHide);
    node.addEventListener("focusin",()=>{if(!pinned)show(item,false)});
    node.addEventListener("focusout",e=>{if(!node.contains(e.relatedTarget))scheduleHide()});
  }

  // Navegador lateral (inspirado na consulta hierárquica de livros de regras).
  document.querySelectorAll(".side-nav a[href^='#'],.page-nav a[href^='#'],.lore-mobile-nav a[href^='#'],.codex-rule-direct-link").forEach(node=>connect(node,false));
  // Cada técnica aparece em um cartão com o próprio texto da habilidade, sem criar regras novas.
  const headings=[
    ".technique .tech-head h3",
    "h3.brandon-tech-heading",
    ".feature h3",
    ".feature h2",
    ".lud-tech h3",
    ".lud-tech h2",
    "h3.section-heading",
    ".lore-section h3"
  ];
  document.querySelectorAll(headings.join(",")).forEach(node=>connect(node,true));

  {
    document.querySelectorAll(".section-header h2").forEach(heading=>{
      const mark=document.createElement("span");mark.className="codex-maestria-inline";mark.setAttribute("aria-hidden","true");
      const icon=document.createElement("img");icon.src=emblem;icon.alt="";mark.appendChild(icon);heading.prepend(mark);
      connect(heading,true);
    });
  }
})();
