(function boot(){
  "use strict";
  const groups=["Clima e ambiente","Terreno e exploração","Personagens e grupos","Rumores e boatos","Fauna e flora assimiladas","Complicações em conflito","Objetos, relíquias e itens","Efeitos mentais","Eventos da Assimilação"];
  const entries=[
    "Ar quente sobre o vale|Névoa fria no caminho|Chuva arrastada pelo vento|Nuvens carregadas no horizonte|Céu sem nuvens ao amanhecer|Granizo sobre área descoberta",
    "Brilho distante na mata|Luz que pulsa no céu|Sombra fora do lugar|Som metálico impossível|Fumaça na linha das árvores|Vento com cheiro incomum",
    "Pegadas na trilha úmida|Marcas recentes de arrasto|Galhos quebrados em sequência|Cheiro desconhecido na rota|Silêncio de pássaros|Movimento fugaz entre as folhas",
    "Barqueiros mudam a rota|Colheita adiada pelo clima|Mercado esvazia cedo|Guardas reforçam uma passagem|Moradores recolhem animais|Peregrinos solicitam abrigo",
    "Torre de observação vazia|Escadaria tomada por musgo|Fundação de casa soterrada|Ponte parcialmente consumida|Oficina antiga sem ocupantes|Sinal de caminho apagado",
    "Leito de rio obstruído|Inclinação instável da encosta|Troncos cruzados sobre a trilha|Vegetação fechando passagem|Pedras soltas perto do declive|Trecho alagado sem saída aparente",
    "Raízes que avançaram pelo caminho|Fungo espalhado numa superfície|Esporos imóveis no ar|Secreção brilhante em rochas|Carapaça abandonada no solo|Plantas reagindo ao movimento",
    "Ferramenta esquecida entre pedras|Caderno molhado e incompleto|Símbolo entalhado na casca|Abrigo de caça desocupado|Bolsa perdida na vegetação|Mapa feito à mão",
    "Alguém sempre desconfiado|Pessoa cordial e reservada|Orador expansivo|Viajante avesso a perguntas|Artesã orgulhosa do trabalho|Figura calma e observadora",
    "Procura alguém desaparecido|Precisa voltar para casa|Deseja ocultar uma dívida|Protege um segredo coletivo|Busca reconhecimento público|Quer afastar um adversário",
    "Sem alimento há muitos dias|Em processo de recuperação|Carregando suprimentos valiosos|Sob forte vigilância|Sem equipamento adequado|Vinda de longa viagem",
    "Aborda o grupo com cautela|Pede ajuda antes de explicar|Desafia a autoridade dos viajantes|Tenta contratar um serviço|Reconhece símbolo de um deles|Evita o contato direto",
    "Uma região está interditada|Um posto foi abandonado|Alguém regressou após anos|Uma criatura cruzou a serra|Um acordo teria sido rompido|Um velho mapa reapareceu",
    "Revela um caminho oculto|Expõe um conflito entre vizinhos|Leva a um objeto disputado|Aproxima facções rivais|Mostra que o relato foi exagerado|Confirma apenas parte da história",
    "Comerciante que volta do interior|Sentinela exausta|Pescadora de outra comunidade|Ajudante de curandeiro|Peregrino recém-chegado|Criança que ouviu uma conversa",
    "Relato confiante e direto|Sussurros em local público|Tom de advertência|Descrença diante do próprio relato|Narração emotiva|História repetida por terceiros",
    "Fungo disperso na madeira|Inseto com forma incomum|Herbívoro alterado|Predador de comportamento raro|Planta de crescimento veloz|Ave que acompanha a estrada",
    "Observa à distância antes de reagir|Segue trilhas repetidas|Defende uma fonte de água|Evita luz direta|Aparece somente ao anoitecer|Desloca-se em grupos pequenos",
    "Tecidos de cor instável|Órgão luminoso à noite|Espinhos que vibram|Membrana transparente|Secreção viscosa persistente|Estrutura óssea externa",
    "Mudança no ciclo das flores|Pequenos animais abandonam a área|Riacho apresenta odor novo|Vegetação altera a própria cor|Inquietação de moradores|Solo reage ao contato",
    "Um terceiro grupo se aproxima|Sinais de fogo em outro ponto|Alguém tenta negociar cessar-fogo|Viajante atravessa a disputa|Aliado oferece cobertura|Animal inesperado entra na área",
    "Visibilidade cai durante a cena|Estrutura ameaça desabar|Ruído torna comando difícil|Abrigo disponível é destruído|Um recurso se torna escasso|A saída principal fica bloqueada",
    "Uma rajada move objetos soltos|Torrente atinge a passagem|Sinal de alarme soa próximo|Armadilha antiga reage à movimentação|Chuva repentina dificulta visão|Passos são ouvidos fora de cena",
    "Terreno amolece sob os pés|Arbustos ocupam a rota|Pedras rolam encosta abaixo|Água invade a área baixa|Fumaça obscurece posições|Poeira levanta durante o confronto",
    "Equipamento mecânico pequeno|Objeto cerimonial de madeira|Peça de vestuário incomum|Mapa protegido em tecido|Ferramenta de oficina antiga|Recipiente de material desconhecido",
    "Seu dono ainda está procurando|Uma comunidade o reconhece|Contém sinal de fabricação rara|Pode abrir uma nova negociação|Aponta para uma rota antiga|Tem uso inesperado em reparo",
    "Produzido antes do Colapso|Encontrado em uma expedição|Pertenceu a uma guilda|Passou por vários proprietários|Foi modificado após acidente|É parte de um conjunto maior",
    "Conservado e bem cuidado|Enferrujado em pontos críticos|Com marcas de reparo|Incompleto, porém funcional|Rachado e frágil|Alterado por exposição ambiental",
    "Sonho com lugar não visitado|Lembrança de alguém ausente|Visão de travessia interrompida|Símbolo repetido em paredes|Sensação de voltar ao mesmo ponto|Figura desconhecida pedindo auxílio",
    "Dúvida sobre antiga decisão|Dificuldade de confiar num vínculo|Medo ligado a uma experiência|Recordação recorrente de perda|Conflito entre promessa e necessidade|Resistência em falar sobre evento",
    "Desejo de verificar cada objeto|Busca por um sinal recorrente|Insistência em uma rota|Apego a um objeto encontrado|Necessidade de repetir uma pergunta|Tendência a observar portas e saídas",
    "Interrupção súbita de uma conversa|Momento de imobilidade diante de risco|Confusão causada por falta de descanso|Discussão sobre memória incerta|Urgência em deixar um lugar|Silêncio inesperado depois de uma notícia",
    "Raiz emerge do piso antigo|Fungos aparecem sobre a pedra|Cheiro vegetal cresce no ar|Animais mudam trajetória|Névoa orgânica cobre terreno|Vibração acompanha o vento",
    "Pele temporariamente pigmentada|Sensação incomum nos membros|Audição alterada por instantes|Pequena alteração na textura da pele|Mudança discreta na temperatura corporal|Crescimento passageiro de tecido superficial",
    "Sabor mineral na água|Cheiro doce sem origem evidente|Sombra parece alongada|Estalos surgem em intervalos|Luz difusa modifica as cores|Silêncio produz sensação de distância",
    "Lideranças discutem a ocorrência|Vizinhos organizam vigília|Comunidade evita uma passagem|Viajantes mudam seus relatos|Circulam diferentes explicações|Um grupo pede estudo do fenômeno"
  ].map(s=>s.split("|"));
  const columnModifiers=[
    ["ao amanhecer","antes de uma travessia","perto de um refúgio","em área sem moradores","sob clima incomum","depois de um sinal estranho"],
    ["junto de rastros recentes","num limite de território","próximo a uma ruína","sem marcas de manutenção","sob raízes antigas","onde um caminho desapareceu"],
    ["com uma informação incompleta","sem que todos concordem","enquanto tenta proteger alguém","ao perceber sinais de perigo","diante de uma oportunidade","depois de uma perda recente"],
    ["que só alguns acreditam","mas contém uma pista","e pode ter sido alterado","cuja fonte é contestada","que afeta um acordo","e aponta para outra comunidade"],
    ["que se aproxima lentamente","cujas necessidades são desconhecidas","ao proteger o território","reagindo a uma presença humana","que muda seus hábitos","na proximidade de um recurso raro"],
    ["enquanto o Conflito continua","com impacto sobre a posição","dando chance de adaptação","e exigindo nova decisão","afetando ambos os lados","com custo de oportunidade"],
    ["que guarda uma marca","e precisa de reparo","protegido por alguém","sem explicação evidente","que pode ser trocado","com história contraditória"],
    ["cujo sentido depende do personagem","após uma cena difícil","sem equivaler a previsão certa","associado a lembranças pessoais","que exige autoconsciência","sem penalidade automática"],
    ["com reação de testemunhas","na proximidade da flora local","afetando o ambiente imediato","por um curto intervalo","com risco ainda indeterminado","abrindo um novo mistério"]
  ];
  let imported=null;
  const key="codex-arborius-oraculos-licenciados-v1";
  function valid(data){return Array.isArray(data)&&data.length===36&&data.every(x=>x&&typeof x.title==="string"&&Array.isArray(x.cells)&&x.cells.length===6&&x.cells.every(row=>Array.isArray(row)&&row.length===6&&row.every(v=>typeof v==="string"&&v.length>0)))}
  try{const stored=localStorage.getItem(key);if(stored){const p=JSON.parse(stored);if(valid(p))imported=p}}catch(e){}
  function sourceStatus(){const node=document.getElementById("source-status");if(node)node.textContent=imported?"Modo atual: 1.296 resultados do arquivo do livro, guardados somente neste navegador.":"Modo atual: propostas narrativas originais de Árborius."}
  const titleTexts=[...document.querySelectorAll("#table-select option")].map(o=>o.textContent);
  const sel=document.getElementById("table-select"),rs=document.getElementById("row-select"),cs=document.getElementById("col-select"),result=document.getElementById("oracle-result"),heading=document.getElementById("oracle-heading"),cat=document.getElementById("oracle-category"),coord=document.getElementById("oracle-coord"),grid=document.getElementById("oracle-matrix"),wrap=document.getElementById("matrix-wrap"),toggle=document.getElementById("toggle-matrix");
  const labels=["0–1","2","3","4","5","6+"];
  function makeResult(i,r,c){return imported?imported[i].cells[r][c]:entries[i][r]+"; "+columnModifiers[Math.floor(i/4)][c]+"."}
  function render(){
    const i=Number(sel.value),r=Number(rs.value),c=Number(cs.value);
    heading.textContent=imported?imported[i].title.replace("*",""):titleTexts[i];cat.textContent=groups[Math.floor(i/4)]+(imported?" · livro p. "+imported[i].page:" · propostas Árborius");result.textContent=makeResult(i,r,c);coord.textContent="Tabela "+(i+1)+" de 36 · linha "+labels[r]+" · coluna "+labels[c];
    grid.replaceChildren();const head=document.createElement("thead"),hrow=document.createElement("tr");
    ["","0–1","2","3","4","5","6+"].forEach(x=>{const th=document.createElement("th");th.textContent=x;hrow.append(th)});head.append(hrow);grid.append(head);
    const tbody=document.createElement("tbody");
    for(let ir=0;ir<6;ir++){const tr=document.createElement("tr");const th=document.createElement("th");th.textContent=labels[ir];tr.append(th);for(let ic=0;ic<6;ic++){const td=document.createElement("td");td.textContent=makeResult(i,ir,ic);if(ir===r&&ic===c)td.className="picked";td.addEventListener("click",()=>{rs.value=String(ir);cs.value=String(ic);render()});tr.append(td)}tbody.append(tr)}grid.append(tbody);
    document.querySelectorAll(".oracle-index button").forEach((b,j)=>b.classList.toggle("active",j===Math.floor(i/4)));
  }
  const fileInput=document.getElementById("import-source");
  fileInput.addEventListener("change",async()=>{const file=fileInput.files&&fileInput.files[0];if(!file)return;try{const data=JSON.parse(await file.text());if(!valid(data))throw new Error("O arquivo precisa ter 36 matrizes com 6 linhas e 6 colunas de texto.");imported=data;try{localStorage.setItem(key,JSON.stringify(imported))}catch(e){}sourceStatus();render()}catch(e){alert("Não foi possível importar as tabelas: "+e.message)}fileInput.value=""});
  document.getElementById("clear-source").addEventListener("click",()=>{imported=null;try{localStorage.removeItem(key)}catch(e){}sourceStatus();render()});
  sourceStatus();
  function rnd(n){const x=new Uint32Array(1);crypto.getRandomValues(x);return x[0]%n}
  [sel,rs,cs].forEach(el=>el.addEventListener("change",render));
  document.getElementById("generate-oracle").addEventListener("click",()=>{rs.value=String(rnd(6));cs.value=String(rnd(6));render()});
  toggle.addEventListener("click",()=>{wrap.hidden=!wrap.hidden;toggle.setAttribute("aria-expanded",String(!wrap.hidden));toggle.textContent=wrap.hidden?"Ver 6×6":"Ocultar 6×6"});
  document.getElementById("copy-oracle").addEventListener("click",async()=>{const value=heading.textContent+": "+result.textContent;if(navigator.clipboard){try{await navigator.clipboard.writeText(value);return}catch(e){}}window.prompt("Copie o resultado:",value)});
  document.querySelectorAll(".oracle-index button").forEach((b,i)=>b.addEventListener("click",()=>{sel.value=String(i*4);render();document.getElementById("oraculos").scrollIntoView({behavior:"smooth"})}));
  const starts=["As Cinzas","O Eco","A Vigília","O Segredo","A Sombra","O Último Rastro","A Memória","Os Herdeiros","A Voz"];
  const ends=["das Raízes","do Vale","do Horto","da Serra","do Refúgio","dos Errantes","da Fronteira","das Águas","da Mata"];
  const epithets=["Esquecidas","Silencioso","Velado","de Ferro","Sem Nome","Partido","do Poente","do Primeiro Sol"];
  document.getElementById("generate-name").addEventListener("click",()=>{document.getElementById("name-result").textContent=starts[rnd(starts.length)]+" "+ends[rnd(ends.length)]+" "+epithets[rnd(epithets.length)]});
  const search=document.getElementById("search"),sheets=[...document.querySelectorAll(".sheet")];
  search.addEventListener("input",()=>{const s=search.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");sheets.forEach(p=>{const text=p.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");p.classList.toggle("hidden-search",!text.includes(s))})});
  let zoom=1;const updateZoom=()=>document.documentElement.style.setProperty("--zoom",String(zoom));
  document.getElementById("zoom-out").addEventListener("click",()=>{zoom=Math.max(.7,+(zoom-.1).toFixed(1));updateZoom()});
  document.getElementById("zoom-in").addEventListener("click",()=>{zoom=Math.min(1.4,+(zoom+.1).toFixed(1));updateZoom()});
  document.getElementById("print").addEventListener("click",()=>window.print());
  window.addEventListener("beforeprint",()=>sheets.forEach(s=>s.classList.remove("hidden-search")));
  window.addEventListener("afterprint",()=>search.dispatchEvent(new Event("input")));
  render();
})();