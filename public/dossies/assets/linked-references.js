/* Referências de Árborius: prévia contextual por tipo, link direto para página canônica. */
(()=>{
 "use strict";
 const links=[...document.querySelectorAll('a[data-codex-ref="true"]')];
 if(!links.length)return;
 const pop=document.createElement("aside");
 pop.className="rule-ref-popover";
 pop.id="rule-ref-popover";
 pop.setAttribute("role","tooltip");
 pop.setAttribute("aria-hidden","true");
 pop.innerHTML='<div class="rule-ref-popover__head"><span class="rule-kind"></span><strong></strong></div><div class="rule-ref-popover__body"><p></p><small></small></div><div class="rule-ref-popover__footer"><small>Consulta contextual · Codex de Árborius</small><a href="#">Abrir referência completa →</a></div>';
 document.body.appendChild(pop);
 const badge=pop.querySelector(".rule-kind"),title=pop.querySelector(".rule-ref-popover__head strong"),text=pop.querySelector(".rule-ref-popover__body p"),cost=pop.querySelector(".rule-ref-popover__body small"),open=pop.querySelector(".rule-ref-popover__footer a");
 let current=null,timeout=null;
 const fine=matchMedia("(hover:hover) and (pointer:fine)");
 function hide(){clearTimeout(timeout);pop.removeAttribute("data-open");pop.setAttribute("aria-hidden","true");current?.removeAttribute("aria-describedby");current=null;}
 function delay(){clearTimeout(timeout);timeout=setTimeout(hide,180);}
 function place(node){
   const rect=node.getBoundingClientRect();
   if(innerWidth<=690){pop.style.left="10px";pop.style.top="auto";return;}
   const w=Math.min(380,innerWidth-24);
   const x=rect.right+w+12<=innerWidth?rect.right+9:Math.max(12,rect.left-w-9);
   const y=Math.min(Math.max(12,rect.top-25),Math.max(12,innerHeight-pop.offsetHeight-12));
   pop.style.left=x+"px";pop.style.top=y+"px";
 }
 function show(node){
   clearTimeout(timeout);
   if(!node?.isConnected)return;
   current?.removeAttribute("aria-describedby");
   current=node;
   const kind=node.dataset.refType||"regra";
   badge.className="rule-kind rule-kind--"+kind;
   badge.textContent=node.dataset.refLabel||"Regra";
   title.textContent=node.dataset.refTitle||node.textContent.trim();
   text.textContent=node.dataset.refSummary||"Abra a referência para consultar as condições e o procedimento.";
   cost.textContent=node.dataset.refCost||"";
   open.href=node.href;
   open.textContent=kind==="habilidade"?"Abrir ficha de habilidade →":"Abrir "+(node.dataset.refLabel||"regra").toLowerCase()+" →";
   pop.setAttribute("data-open","true");
   pop.setAttribute("aria-hidden","false");
   node.setAttribute("aria-describedby",pop.id);
   place(node);
 }
 for(const a of links){
   a.addEventListener("pointerenter",()=>{if(fine.matches)show(a)});
   a.addEventListener("pointerleave",delay);
   a.addEventListener("focus",()=>show(a));
   a.addEventListener("blur",delay);
 }
 pop.addEventListener("pointerenter",()=>clearTimeout(timeout));
 pop.addEventListener("pointerleave",delay);
 pop.addEventListener("focusin",()=>clearTimeout(timeout));
 pop.addEventListener("focusout",delay);
 addEventListener("keydown",e=>{if(e.key==="Escape")hide()});
 addEventListener("scroll",hide,{passive:true});
 addEventListener("resize",hide,{passive:true});
 document.addEventListener("pointerdown",e=>{if(current&&!pop.contains(e.target)&&!current.contains(e.target))hide()});
})();
