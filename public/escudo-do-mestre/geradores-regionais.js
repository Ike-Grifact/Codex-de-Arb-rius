(()=>{
"use strict";
const rnd=n=>{const x=new Uint32Array(1);crypto.getRandomValues(x);return x[0]%n};
const one=arr=>arr[rnd(arr.length)];
const habitat={
 litoral:"Litoral, estuários e manguezais",
 serra:"Serra do Mar / Mata Atlântica",
 planalto:"Planalto / araucárias",
 campos:"Campos Gerais / banhados"
};
const fauna={
 litoral:[
 ["papagaio-da-cara-roxa","Amazona brasiliensis","Ave associada às florestas litorâneas e à região do Lagamar."],
 ["guará","Eudocimus ruber","Ave de zonas úmidas e estuários; sua presença pode marcar canais e ilhas."],
 ["mico-leão-da-cara-preta","Leontopithecus caissara","Primata raro da região de Superagui e Guaraqueçaba."],
 ["tamanduá-mirim","Tamandua tetradactyla","Mamífero que pode atravessar mata e bordas de trilhas."],
 ["cachorro-do-mato","Cerdocyon thous","Canídeo de hábitos discretos em ambientes variados."],
 ["boto-cinza","Sotalia guianensis","Mamífero aquático do complexo estuarino."],
 ["lontra","Lontra longicaudis","Mamífero semiaquático em rios e margens florestadas."],
 ["caranguejo-uçá","Ucides cordatus","Crustáceo associado a áreas de manguezal."]
 ],
 serra:[
 ["bugio-ruivo","Alouatta guariba","Seus chamados podem ser ouvidos à distância na mata."],
 ["jacutinga","Aburria jacutinga","Ave florestal dispersora de sementes."],
 ["jaguatirica","Leopardus pardalis","Felino discreto das florestas."],
 ["anta","Tapirus terrestris","Grande herbívoro, importante dispersor de sementes."],
 ["quati","Nasua nasua","Mamífero de florestas e bordas, frequentemente em grupos."],
 ["onça-parda","Puma concolor","Predador de grande área de vida, com ocorrência regional."],
 ["tamanduá-mirim","Tamandua tetradactyla","Insetívoro arborícola e terrestre."],
 ["jacu","Penelope sp.","Ave frugívora de áreas de mata."]
 ],
 planalto:[
 ["gralha-azul","Cyanocorax caeruleus","Ave associada às florestas com araucária e à dispersão de pinhões."],
 ["quati","Nasua nasua","Procura alimento no chão e nas árvores."],
 ["cutia","Dasyprocta sp.","Roedor que coleta e enterra frutos e sementes."],
 ["tatu-galinha","Dasypus novemcinctus","Escava o solo em busca de alimento."],
 ["veado-catingueiro","Subulo gouazoubira","Cervídeo discreto em mosaicos de matas e campos."],
 ["cachorro-do-mato","Cerdocyon thous","Canídeo encontrado em diferentes ambientes."],
 ["gralha-picaça","Cyanocorax chrysops","Ave social de áreas florestadas."],
 ["coruja-buraqueira","Athene cunicularia","Coruja comum em áreas abertas."]
 ],
 campos:[
 ["quero-quero","Vanellus chilensis","Ave territorial de campos abertos."],
 ["seriema","Cariama cristata","Ave terrestre de áreas abertas."],
 ["capivara","Hydrochoerus hydrochaeris","Mamífero associado a rios, banhados e lagoas."],
 ["lobo-guará","Chrysocyon brachyurus","Canídeo raro, historicamente registrado nos Campos Gerais."],
 ["tamanduá-bandeira","Myrmecophaga tridactyla","Mamífero de áreas abertas, historicamente registrado na região."],
 ["carcará","Caracara plancus","Ave de rapina oportunista de áreas abertas."],
 ["coruja-buraqueira","Athene cunicularia","Habita campos e terrenos abertos."],
 ["jaguatirica","Leopardus pardalis","Felino associado também a mosaicos de vegetação."]
 ]
};
const flora={
 litoral:[
 ["palmito-juçara","Euterpe edulis","Palmeira nativa da Mata Atlântica, importante para aves frugívoras."],
 ["guanandi","Calophyllum brasiliense","Árvore registrada na vegetação litorânea."],
 ["jerivá","Syagrus romanzoffiana","Palmeira de frutos consumidos por muitos animais."],
 ["mangue-vermelho","Rhizophora mangle","Árvore típica do manguezal."],
 ["mangue-branco","Laguncularia racemosa","Espécie de mangue nas formações flúvio-marinhas."],
 ["siriúba","Avicennia schaueriana","Árvore de manguezal do litoral paranaense."],
 ["caixeta","Tabebuia cassinoides","Árvore de áreas encharcadas e caxetais."],
 ["pitangueira","Eugenia uniflora","Frutífera nativa presente na região."]
 ],
 serra:[
 ["palmito-juçara","Euterpe edulis","Palmeira de sub-bosque da Mata Atlântica."],
 ["xaxim","Dicksonia sellowiana","Samambaia arborescente de florestas úmidas."],
 ["guapuruvu","Schizolobium parahyba","Árvore alta de florestas atlânticas."],
 ["figueira","Ficus sp.","Árvore cujo fruto alimenta diferentes espécies."],
 ["quaresmeira","Pleroma sp.","Árvore ou arbusto de flores roxas de mata atlântica."],
 ["pitangueira","Eugenia uniflora","Planta frutífera nativa."],
 ["guanandi","Calophyllum brasiliense","Árvore de formações úmidas."],
 ["caroba","Jacaranda puberula","Árvore nativa registrada no litoral."]
 ],
 planalto:[
 ["araucária","Araucaria angustifolia","Pinheiro-do-paraná, espécie emblemática das florestas do planalto."],
 ["erva-mate","Ilex paraguariensis","Planta nativa de formações florestais do Sul."],
 ["imbuia","Ocotea porosa","Árvore de florestas com araucárias."],
 ["bracatinga","Mimosa scabrella","Árvore pioneira de áreas frias e de altitude."],
 ["pinheiro-bravo","Podocarpus lambertii","Conífera nativa de regiões de altitude."],
 ["guabirobeira","Campomanesia xanthocarpa","Frutífera nativa do Sul."],
 ["cedro-rosa","Cedrela fissilis","Árvore florestal nativa."],
 ["butiá","Butia eriospatha","Palmeira nativa de regiões do Sul."]
 ],
 campos:[
 ["carqueja","Baccharis sp.","Arbusto comum em ambientes de campos."],
 ["butiá","Butia eriospatha","Palmeira que pode ocorrer em mosaicos de campos e mata."],
 ["guabirobeira","Campomanesia xanthocarpa","Frutífera encontrada em áreas de transição."],
 ["capim-barba-de-bode","Aristida sp.","Gramínea de vegetação campestre."],
 ["araucária","Araucaria angustifolia","Pode aparecer nos limites de fragmentos florestais."],
 ["pitangueira","Eugenia uniflora","Frutífera nativa de locais adequados."],
 ["bracatinga","Mimosa scabrella","Árvore pioneira de áreas abertas e de transição."],
 ["erva-mate","Ilex paraguariensis","Planta de capões e formações florestais."]
 ]
};
const personals=[
 ["João","Miguel","Bento","Vicente","Davi","Pedro","Luiz","Antônio","Rafael","Caio","Elias","Túlio","Mateus","Artur","Joaquim","Daniel"],
 ["Ana","Maria","Helena","Luísa","Cecília","Rosa","Lúcia","Clara","Juliana","Beatriz","Irene","Tereza","Lorena","Isadora","Marina","Ester"]
];
const surnames=["Silva","Santos","Oliveira","Souza","Almeida","Machado","Rosa","Moraes","Barros","Vieira","Ribeiro","Ferreira","Carvalho","Martins","Costa","Pereira","Lopes","Rodrigues","Bianchi","Kowalski","Zielinski","Schneider","Siqueira","Farias","Gonçalves","Pereira de Lima","Nogueira","Bortolotti"];
const roles={
 litoral:[["barqueiro","barqueira"],["pescador","pescadora"],["guia de trilhas","guia de trilhas"],["vigia do cais","vigia do cais"],["artesão de canoas","artesã de canoas"],["negociante de sal","negociante de sal"]],
 serra:[["mateiro","mateira"],["batedor","batedora"],["herbalista","herbalista"],["guarda de passagem","guarda de passagem"],["cartógrafo","cartógrafa"],["mensageiro","mensageira"]],
 planalto:[["criador de animais","criadora de animais"],["carpinteiro","carpinteira"],["guardião de sementes","guardiã de sementes"],["carreteiro","carreteira"],["agricultor","agricultora"],["ferreiro","ferreira"]],
 campos:[["rastreador","rastreadora"],["tropeiro","tropeira"],["vigia da campina","vigia da campina"],["curandeiro","curandeira"],["guarda de fronteira","guarda de fronteira"],["pastor","pastora"]]
};
const enemyRoles={
 litoral:[["saqueador de canoas","saqueadora de canoas"],["contrabandista","contrabandista"],["espião de porto","espiã de porto"],["capataz rival","capataz rival"]],
 serra:[["emboscador","emboscadora"],["mercenário de passagem","mercenária de passagem"],["caçador clandestino","caçadora clandestina"],["desertor armado","desertora armada"]],
 planalto:[["saqueador de depósitos","saqueadora de depósitos"],["desertor de patrulha","desertora de patrulha"],["comandante rival","comandante rival"],["cobrador de passagem","cobradora de passagem"]],
 campos:[["bandoleiro","bandoleira"],["batedor hostil","batedora hostil"],["capitão de patrulha rival","capitã de patrulha rival"],["caçador de recompensas","caçadora de recompensas"]]
};
const npcHooks=[
 "Carrega uma mensagem que ainda não entregou.",
 "Conhece uma rota esquecida, mas esconde o motivo.",
 "Procura ajuda para resgatar alguém.",
 "É responsável por suprimentos comunitários.",
 "Reconhece um símbolo usado pelo grupo.",
 "Busca reconciliar duas famílias.",
 "Precisa de proteção antes de revelar um achado.",
 "Guarda uma peça valiosa sem saber seu uso."
];
const enemyHooks=[
 "Prefere negociar se suas exigências forem reconhecidas.",
 "Defende um território que considera indispensável.",
 "Segue ordens contestadas dentro da própria facção.",
 "Procura uma pessoa que o grupo também deseja encontrar.",
 "Tenta capturar recursos sem danificar o local.",
 "Tem medo de uma ameaça maior que mantém em segredo.",
 "O conflito começou por um acordo quebrado.",
 "Pode recuar se uma alternativa de sobrevivência surgir."
];
const variants=[
 ["das raízes sonoras","Raízes ou nervuras vibram quando alguém se aproxima."],
 ["da névoa viva","Libera um vapor leve e incomum; sua função biológica ainda é incerta."],
 ["dos reflexos opacos","A superfície muda de aparência sob luz direta."],
 ["de casca pulsante","O revestimento ou a pele apresenta pulsos visíveis."],
 ["dos esporos brandos","Libera partículas que se prendem às superfícies próximas."],
 ["da marca azul","Exibe pigmentação localizada, cuja origem precisa ser investigada."]
];
const nameKind=document.getElementById("name-kind"),nameRegion=document.getElementById("name-region"),assimilated=document.getElementById("name-assimilated");
const titleNode=document.getElementById("name-result"),detailNode=document.getElementById("name-detail"),contextNode=document.getElementById("name-context"),categoryNode=document.getElementById("name-category");
function generateEncounter(){
 const kind=nameKind.value,region=nameRegion.value,kindText=({npc:"NPC",enemy:"Antagonista",fauna:"Fauna",flora:"Flora"})[kind];
 categoryNode.textContent=kindText+" · "+habitat[region];
 if(kind==="npc"||kind==="enemy"){
   const g=rnd(2),name=one(personals[g])+" "+one(surnames),job=one(kind==="enemy"?enemyRoles[region]:roles[region])[g];
   titleNode.textContent=name;
   detailNode.textContent=(kind==="enemy"?"Antagonista humano — ":"Personagem — ")+job+". "+one(kind==="enemy"?enemyHooks:npcHooks);
   contextNode.textContent=(assimilated.checked?"Hipótese narrativa: possui um sinal de contato com a Assimilação, ainda não revelado. ":"")+"Não há ficha, hostilidade inevitável nem nível de poder atribuído.";
 }else{
   const species=one(kind==="fauna"?fauna[region]:flora[region]),v=one(variants);
   titleNode.textContent=species[0]+(assimilated.checked?" "+v[0]:"");
   detailNode.textContent=species[1]+" · "+species[2];
   contextNode.textContent=assimilated.checked?"EXPANSÃO FICCIONAL: "+v[1]+" Não é propriedade real da espécie nem mutação oficial.":"Espécie de referência regional; sua presença no local específico depende do habitat e da história.";
 }
}
document.getElementById("generate-name").addEventListener("click",generateEncounter);
[nameKind,nameRegion,assimilated].forEach(el=>el.addEventListener("change",generateEncounter));
document.getElementById("copy-name").addEventListener("click",async()=>{
 const txt=[titleNode.textContent,categoryNode.textContent,detailNode.textContent,contextNode.textContent].join("\n");
 try{await navigator.clipboard.writeText(txt)}catch(e){window.prompt("Copie o resultado:",txt)}
});
const taskDefs=[
[15,60,"Montagem de pequena peça com materiais à mão.","Manufaturas; Engenharia pode ser relevante."],
[120,480,"Múltiplos componentes e verificações mecânicas.","Engenharia e Manufaturas; projetos complexos podem exigir etapas."],
[20,60,"Refeição simples com ingredientes já disponíveis.","Acampamento quando houver incerteza."],
[45,120,"Refeições de grupo, fogueira e organização.","Acampamento: alimentação e estrutura são resolvidas separadamente."],
[15,40,"Retirada inicial de pele sem curtimento ou secagem.","Sobrevivência, ferramentas e conservação posterior."],
[45,120,"Animal médio; conservação e secagem são etapas independentes.","Sobrevivência e condições sanitárias."],
[120,300,"Animal grande; exige local, tempo e manejo adequados.","A equipe só acelera trabalho realmente divisível."],
[30,120,"Conversa, escuta, discussão e negociação prolongadas.","O método pode usar Expressão, Erudição e Instintos distintos."],
[30,90,"Esboço com medidas e objetivos gerais.","Sagacidade + Engenharia."],
[120,360,"Projeto com desenhos, tolerâncias e revisão.","Engenharia; não se converte automaticamente em blueprint validado."],
[60,240,"Preparação alquímica comum com ingredientes disponíveis.","SRD: Oficina e dois Testes de Fabricação por lote. Reações posteriores podem adicionar dias."],
[20,60,"Abrigo e fogueira simples antes de repousar.","Módulo de Acampamento: progressos são registrados via A."],
[30,180,"Reparo comum com ferramentas e peças disponíveis.","Manufaturas; recuperação de Qualidade usa custos próprios."]
];
const taskEl=document.getElementById("time-task"),condEl=document.getElementById("time-conditions"),teamEl=document.getElementById("time-team");
const fmt=mins=>{const m=Math.max(5,Math.round(mins/5)*5);return m<60?m+" min":Math.floor(m/60)+" h"+(m%60?" "+m%60+" min":"")};
function renderTime(){
 const i=Number(taskEl.value),[lo,hi,context,rule]=taskDefs[i];
 const divisible=[0,1,2,3,4,5,6,11,12].includes(i);
 const factor=Number(condEl.value)*(divisible?Number(teamEl.value):1);
 document.getElementById("time-estimate").textContent=fmt(lo*factor)+" – "+fmt(hi*factor);
 document.getElementById("time-rationale").textContent=context;
 document.getElementById("time-source").textContent="Procedimento: "+rule+(teamEl.value!== "1"&&!divisible?" Participantes extras não reduzem automaticamente esta tarefa.":"");
}
[taskEl,condEl,teamEl].forEach(el=>el.addEventListener("change",renderTime));
renderTime();
generateEncounter();
})();