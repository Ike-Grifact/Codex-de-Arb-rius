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
 ["pitangueira","Eugenia uniflora","Frutífera nativa presente na região."],
 ["erva-baleeira","Varronia curassavica","Arbusto medicinal nativo de formações atlânticas, associado a ambientes costeiros."],
 ["aroeira-vermelha","Schinus terebinthifolia","Árvore nativa de formações litorâneas, incluindo restinga."]
 ],
 serra:[
 ["palmito-juçara","Euterpe edulis","Palmeira de sub-bosque da Mata Atlântica."],
 ["xaxim","Dicksonia sellowiana","Samambaia arborescente de florestas úmidas."],
 ["guapuruvu","Schizolobium parahyba","Árvore alta de florestas atlânticas."],
 ["figueira","Ficus sp.","Árvore cujo fruto alimenta diferentes espécies."],
 ["quaresmeira","Pleroma sp.","Árvore ou arbusto de flores roxas de mata atlântica."],
 ["pitangueira","Eugenia uniflora","Planta frutífera nativa."],
 ["guanandi","Calophyllum brasiliense","Árvore de formações úmidas."],
 ["caroba","Jacaranda puberula","Árvore nativa registrada no litoral."],
 ["guaco","Mikania glomerata","Trepadeira de florestas úmidas do Sul e Sudeste."],
 ["erva-baleeira","Varronia curassavica","Arbusto aromático registrado na Mata Atlântica."]
 ],
 planalto:[
 ["araucária","Araucaria angustifolia","Pinheiro-do-paraná, espécie emblemática das florestas do planalto."],
 ["erva-mate","Ilex paraguariensis","Planta nativa de formações florestais do Sul."],
 ["imbuia","Ocotea porosa","Árvore de florestas com araucárias."],
 ["bracatinga","Mimosa scabrella","Árvore pioneira de áreas frias e de altitude."],
 ["pinheiro-bravo","Podocarpus lambertii","Conífera nativa de regiões de altitude."],
 ["guabirobeira","Campomanesia xanthocarpa","Frutífera nativa do Sul."],
 ["cedro-rosa","Cedrela fissilis","Árvore florestal nativa."],
 ["butiá","Butia eriospatha","Palmeira nativa de regiões do Sul."],
 ["espinheira-santa","Maytenus ilicifolia","Arbusto nativo da região Sul, documentado inclusive no Paraná."]
 ],
 campos:[
 ["carqueja-amarga","Baccharis trimera","Subarbusto típico de campos e áreas abertas do Sul."],
 ["butiá","Butia eriospatha","Palmeira que pode ocorrer em mosaicos de campos e mata."],
 ["guabirobeira","Campomanesia xanthocarpa","Frutífera encontrada em áreas de transição."],
 ["capim-barba-de-bode","Aristida sp.","Gramínea de vegetação campestre."],
 ["araucária","Araucaria angustifolia","Pode aparecer nos limites de fragmentos florestais."],
 ["pitangueira","Eugenia uniflora","Frutífera nativa de locais adequados."],
 ["bracatinga","Mimosa scabrella","Árvore pioneira de áreas abertas e de transição."],
 ["erva-mate","Ilex paraguariensis","Planta de capões e formações florestais."],
 ["macela","Achyrocline satureioides","Herbácea aromática associada a ambientes campestres."],
 ["espinheira-santa","Maytenus ilicifolia","Espécie nativa de matas e bordas florestais do Sul."]
 ]
};
const namePools={
 brasil:{label:"Brasil e lusofonia",given:[["João","Miguel","Bento","Vicente","Davi","Pedro","Luiz","Antônio","Rafael","Caio","Elias","Túlio","Mateus","Artur","Joaquim","Daniel","Iuri"],["Ana","Maria","Helena","Luísa","Cecília","Rosa","Lúcia","Clara","Juliana","Beatriz","Irene","Tereza","Lorena","Isadora","Marina","Tainá"]],surnames:["Silva","Santos","Oliveira","Souza","Almeida","Machado","Moraes","Barros","Vieira","Ribeiro","Ferreira","Carvalho","Martins","Costa","Pereira","Lopes","Rodrigues","Farias"]},
 hispanico:{label:"América Latina hispanofalante",given:[["Mateo","Diego","Santiago","Javier","Emilio","Andrés","Ignacio","Gabriel"],["Valentina","Lucía","Camila","Sofía","Isabela","Mariana","Jimena","Paloma"]],surnames:["García","Hernández","González","Ramírez","Fernández","Mendoza","Vargas","Navarro","Rojas","Salazar","Morales"]},
 africa:{label:"Repertórios africanos diversos",given:[["Kwame","Kofi","Amadou","Chinedu","Ibrahim","Boubacar","Tendai","Sibusiso"],["Amina","Fatou","Binta","Zainab","Ama","Nia","Thandiwe","Abena"]],surnames:["Diallo","Diop","Traoré","Mensah","Okafor","N'Diaye","Kamara","Mbeki","Osei","Bello"]},
 arabico:{label:"Árabe e Oriente Médio",given:[["Omar","Karim","Samir","Rami","Youssef","Nabil","Tariq","Zaid"],["Leila","Nour","Yasmin","Salma","Mariam","Hana","Dalia","Lina"]],surnames:["Haddad","Mansour","Khalil","Farah","Nasser","Rahman","Saleh","Habib","Darwish","Aziz"]},
 europeu:{label:"Europa ocidental e setentrional",given:[["Luca","Jonas","Emil","Hugo","Nicolas","Henrik","Leon","Theo"],["Ingrid","Elena","Clara","Astrid","Emma","Elise","Freya","Sophie"]],surnames:["Rossi","Bianchi","Schneider","Müller","Fischer","Dubois","Moreau","Lindberg","Andersen","Janssen"]},
 leste:{label:"Europa central e oriental",given:[["Marek","Aleksander","Ilya","Milan","Luka","Tomasz","Pavel","Viktor"],["Milena","Zofia","Nadia","Daria","Anja","Vera","Irina","Katarina"]],surnames:["Kowalski","Novak","Petrov","Horvat","Zielinski","Kovač","Nowak","Sokolov","Marković","Popescu"]},
 "sul-asia":{label:"Sul da Ásia",given:[["Ravi","Arjun","Aarav","Dev","Kabir","Rohan","Ishaan","Amir"],["Asha","Priya","Anaya","Meera","Nisha","Kiran","Diya","Leena"]],surnames:["Patel","Shah","Nair","Singh","Rao","Mehta","Khan","Das","Menon","Kapoor"]},
 japao:{label:"Japão",surnameFirst:true,given:[["Haruto","Ren","Kenji","Akira","Hiroshi","Takeshi","Sora","Yuto"],["Yui","Hana","Mei","Sakura","Aoi","Emi","Yuna","Rin"]],surnames:["Sato","Tanaka","Suzuki","Mori","Nakamura","Yamamoto","Ito","Kobayashi","Watanabe"]},
 china:{label:"China",surnameFirst:true,given:[["Wei","Jun","Hao","Ming","Lei","Tao","Qiang","Jian"],["Mei","Lin","Yan","Lian","Xiu","Yue","Na","Jing"]],surnames:["Wang","Chen","Li","Zhao","Huang","Zhang","Liu","Wu","Xu","Sun"]},
 coreia:{label:"Coreia",surnameFirst:true,given:[["Min-jun","Seo-jun","Ji-ho","Hyun-woo","Do-yun","Tae-hyun","Jun-seo"],["Ji-woo","Seo-yeon","Min-seo","Ha-eun","Su-bin","Yu-na","Ji-min"]],surnames:["Kim","Park","Lee","Choi","Jeong","Kang","Cho","Yoon","Han","Lim"]}
};
const namePoolKeys=Object.keys(namePools);
function humanName(preference,gender){
 const sourceKey=preference==="global"||preference==="livre"?one(namePoolKeys):preference;
 const source=namePools[sourceKey]||namePools.brasil;
 const target=preference==="livre"?namePools[one(namePoolKeys)]:source;
 const first=one(source.given[gender]);const last=one(target.surnames);
 return {value:preference==="livre"?(first+" "+last):(source.surnameFirst?(last+" "+first):(first+" "+last)),
 note:preference==="livre"?"Nome e sobrenome combinados livremente entre repertórios linguísticos.":("Repertório nominal: "+source.label+"."),
 source:sourceKey};
}
const medicineReference={
 "Maytenus ilicifolia":{basis:"Indicação fitoterápica registrada no SUS",info:"Espinheira-santa: produtos padronizados das folhas são usados para sintomas de dispepsia e como coadjuvantes em gastrite e úlcera gastroduodenal. Não é autorização para uso caseiro.",source:"Ministério da Saúde",url:"https://www.gov.br/saude/pt-br/composicao/sectics/plantas-medicinais-e-fitoterapicos/plantas-medicinais-e-fitoterapicos-no-sus/"},
 "Mikania glomerata":{basis:"Indicação fitoterápica registrada no SUS",info:"Guaco: uso fitoterápico expectorante e broncodilatador. Diferenciar produto regulamentado de identificação e preparo improvisados.",source:"Ministério da Saúde",url:"https://www.gov.br/saude/pt-br/composicao/sectics/plantas-medicinais-e-fitoterapicos/plantas-medicinais-e-fitoterapicos-no-sus/"},
 "Baccharis trimera":{basis:"Uso documentado em formulário farmacopéico",info:"Carqueja-amarga: uso antidispéptico registrado. Há advertências e interações possíveis; não presumir segurança só por ser planta.",source:"Formulário de Fitoterápicos (Ministério da Saúde)",url:"https://www.gov.br/saude/pt-br/acesso-a-informacao/acoes-e-programas/plantas-medicinais-e-fitoterapicos-2/arquivos/publicacoes/formulario-de-fitoterapicos-da-farmacopeia-brasileira-sem-marca"},
 "Varronia curassavica":{basis:"Uso tópico documentado",info:"Erva-baleeira: folhas e extratos estudados para ação anti-inflamatória, especialmente em aplicações tópicas para dor muscular. Não extrapolar para ingestão ou qualquer ferimento.",source:"CATI — extensão rural",url:"https://www.cati.sp.gov.br/Cati/_tecnologias/plantas_medicinais_aromaticas/erva_baleeira.php"},
 "Schinus terebinthifolia":{basis:"Indicação tópica em fitoterápicos do SUS",info:"Aroeira-vermelha: a casca integra fitoterápicos tópicos com indicação específica. Não supor uso oral seguro ou que toda a árvore seja medicinal.",source:"Ministério da Saúde",url:"https://www.gov.br/saude/pt-br/composicao/sectics/plantas-medicinais-e-fitoterapicos/plantas-medicinais-e-fitoterapicos-no-sus/"},
 "Eugenia uniflora":{basis:"Uso tradicional relatado (não equiparar a eficácia clínica)",info:"Pitangueira: folhas aparecem em relatos etnobotânicos como antidiarreicas; frutos são alimentares. A tradição não comprova que uma preparação seja segura ou eficaz.",source:"MDA — estudo etnobotânico",url:"https://www.gov.br/mda/pt-br/acervo-nucleo-de-estudos-agrarios/nead-outras-publicacoes-1/20-pescadores-artesanais-da-lagoa-mirim-etnoecologia-e-resiliencia.pdf"},
 "Achyrocline satureioides":{basis:"Uso tradicional registrado",info:"Macela: utilizada tradicionalmente em infusões para desconfortos digestivos. Atribuição etnobotânica, sem validação clínica automática.",source:"MDA — estudo etnobotânico",url:"https://www.gov.br/mda/pt-br/acervo-nucleo-de-estudos-agrarios/nead-outras-publicacoes-1/20-pescadores-artesanais-da-lagoa-mirim-etnoecologia-e-resiliencia.pdf"},
 "Ilex paraguariensis":{basis:"Uso alimentar e composto estimulante",info:"Erva-mate: folhas contêm cafeína, de efeito estimulante. É alimento/bebida, não uma indicação clínica para tratar doenças.",source:"Ministério da Saúde — definição de mate",url:"https://bvs.saude.gov.br/bvs/saudelegis/cnnpa/1978/res0012_30_03_1978.html"},
 "Araucaria angustifolia":{basis:"Valor alimentar e ecológico — sem indicação terapêutica neste acervo",info:"Araucária: o pinhão tem valor alimentar e a espécie é estrutural para a floresta. Não foi selecionada indicação clínica validada para cura.",source:"",url:""},
 "Euterpe edulis":{basis:"Valor alimentar e ecológico — sem indicação terapêutica neste acervo",info:"Juçara: os frutos têm uso alimentar e sustentam fauna frugívora. Não confundir alimento com medicamento; evitar coleta predatória de plantas nativas.",source:"",url:""}
};
const defaultMedicine={basis:"Sem indicação medicinal verificada nas referências selecionadas",info:"A espécie pode ter importância ecológica, alimentar ou artesanal, mas o gerador não atribui cura, efeito farmacológico nem segurança de uso sem documentação específica.",source:"",url:""};
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
const nameCulture=document.getElementById("name-culture"),hybridType=document.getElementById("name-hybrid-type"),hybridRegion=document.getElementById("name-hybrid-region");
const cultureControls=document.getElementById("name-origin-controls"),hybridControls=document.getElementById("name-hybrid-controls"),assimilatedControl=document.getElementById("name-assimilated-control");
const titleNode=document.getElementById("name-result"),detailNode=document.getElementById("name-detail"),contextNode=document.getElementById("name-context"),categoryNode=document.getElementById("name-category");
const ancestryNode=document.getElementById("name-ancestry"),ancestryDetail=document.getElementById("name-ancestry-detail");
const medicineNode=document.getElementById("name-medicinal"),medicineLabel=document.getElementById("name-medicinal-label"),medicineDetail=document.getElementById("name-medicinal-detail"),medicineSource=document.getElementById("name-medicinal-source");
function updateGeneratorVisibility(){
 const isHuman=nameKind.value==="npc"||nameKind.value==="enemy",isHybrid=nameKind.value==="hybrid";
 cultureControls.hidden=!isHuman;hybridControls.hidden=!isHybrid;assimilatedControl.hidden=isHybrid;
}
function clearExtras(){
 ancestryNode.hidden=true;medicineNode.hidden=true;medicineSource.hidden=true;
}
function showMedicine(plant,hybrid=false){
 if(!plant)return;
 const data=medicineReference[plant[1]]||defaultMedicine;
 medicineNode.hidden=false;
 medicineLabel.textContent=data.basis;
 medicineDetail.textContent=plant[0]+" ("+plant[1]+"): "+data.info+(hybrid?" A fusão Assimilada NÃO herda essa propriedade por definição.":"");
 if(data.url){medicineSource.hidden=false;medicineSource.href=data.url;medicineSource.textContent="Ver fonte: "+data.source}
 else{medicineSource.hidden=true;medicineSource.removeAttribute("href")}
}
function hybridName(first,second){
 const root=t=>t.toLocaleLowerCase("pt-BR").split(/[\s–—-]+/).filter(x=>!["de","do","da","dos","das"].includes(x))[0]||t;
 const a=root(first),b=root(second);
 const prefix=a.slice(0,Math.max(3,Math.ceil(a.length*.56)));
 let suffix=b.slice(Math.max(1,Math.floor(b.length*.42)));
 if(/[aeiouáéíóúâêôãõ]$/i.test(prefix)&&/^[aeiouáéíóúâêôãõ]/i.test(suffix))suffix=suffix.slice(1)||suffix;
 const joined=prefix+suffix;
 return joined.charAt(0).toLocaleUpperCase("pt-BR")+joined.slice(1);
}
function hybridSecondRegion(primary){
 const choice=hybridRegion.value;
 if(choice==="same")return primary;
 if(choice==="any")return one(Object.keys(habitat).filter(k=>k!==primary));
 return choice;
}
function makeHybrid(){
 const kind=hybridType.value;
 const type=kind==="random"?one(["fauna-fauna","fauna-flora","flora-flora"]):kind;
 const [k1,k2]=type.split("-");
 const regionA=nameRegion.value,regionB=hybridSecondRegion(regionA);
 const first=one(k1==="fauna"?fauna[regionA]:flora[regionA]);
 const options=(k2==="fauna"?fauna[regionB]:flora[regionB]).filter(x=>x[1]!==first[1]);
 const second=one(options);
 if(!first||!second)throw Error("Matrizes regionais insuficientes");
 const sourceLabel=first[0]+" ("+first[1]+") × "+second[0]+" ("+second[1]+")";
 const merged=hybridName(first[0],second[0]);
 const matrixText={"fauna-fauna":"Duas matrizes animais","fauna-flora":"Uma matriz animal e uma vegetal","flora-flora":"Duas matrizes vegetais"}[type];
 const v=one(variants);
 titleNode.textContent=merged+" — "+v[0];
 detailNode.textContent="Fusão fictícia: "+sourceLabel+". "+matrixText+" orientam o desenho; "+v[1];
 categoryNode.textContent="Criatura Assimilada · "+habitat[regionA]+" + "+habitat[regionB];
 contextNode.textContent="PROPOSTA DE LORE: nome e aparência não definem Aptidões, Saúde, mutações, perigo, comportamento nem compatibilidade anatômica. Aprovação do Assimilador é indispensável.";
 ancestryNode.hidden=false;ancestryDetail.textContent=sourceLabel;
 showMedicine(k1==="flora"?first:(k2==="flora"?second:null),true);
}
function generateEncounter(){
 updateGeneratorVisibility();clearExtras();
 const kind=nameKind.value,region=nameRegion.value,kindText=({npc:"NPC",enemy:"Antagonista",fauna:"Fauna",flora:"Flora",hybrid:"Assimilada"})[kind];
 categoryNode.textContent=kindText+" · "+habitat[region];
 if(kind==="hybrid"){makeHybrid();return}
 if(kind==="npc"||kind==="enemy"){
  const g=rnd(2),identity=humanName(nameCulture.value,g),job=one(kind==="enemy"?enemyRoles[region]:roles[region])[g];
  titleNode.textContent=identity.value;
  detailNode.textContent=(kind==="enemy"?"Antagonista humano — ":"Personagem — ")+job+". "+one(kind==="enemy"?enemyHooks:npcHooks);
  contextNode.textContent=identity.note+" O nome não determina origem, etnia, cultura nem índole. "+(assimilated.checked?"Possui um sinal de Assimilação ainda não explicado. ":"")+"Sem ficha nem nível de poder definido.";
 }else{
  const plant=kind==="flora",species=one(plant?flora[region]:fauna[region]),v=one(variants);
  titleNode.textContent=species[0]+(assimilated.checked?" "+v[0]:"");
  detailNode.textContent=species[1]+" · "+species[2];
  contextNode.textContent=assimilated.checked?"EXPANSÃO FICCIONAL: "+v[1]+" O novo organismo não adquire atributos, poderes ou propriedades medicinais automaticamente.":"Referência ecológica; ocorrência local depende do habitat e do contexto da campanha.";
  if(plant)showMedicine(species,false);
 }
}
document.getElementById("generate-name").addEventListener("click",generateEncounter);
[nameKind,nameRegion,nameCulture,hybridType,hybridRegion,assimilated].forEach(el=>el.addEventListener("change",generateEncounter));
document.getElementById("copy-name").addEventListener("click",async()=>{
 const txt=[titleNode.textContent,categoryNode.textContent,detailNode.textContent,contextNode.textContent,
 ancestryNode.hidden?"":("Espécies de origem: "+ancestryDetail.textContent),
 medicineNode.hidden?"":("Propriedades reais / advertências: "+medicineLabel.textContent+" — "+medicineDetail.textContent)].filter(Boolean).join("\n");
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