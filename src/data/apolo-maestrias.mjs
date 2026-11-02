// Resumos editoriais das habilidades publicadas de Apolo — SRD v1.29 [HOMEBREW] [TESTE].
// Cada registro produz uma URL própria, uma ficha de consulta e o texto do popover.
// A descrição integral permanece no dossiê original.
export const apoloMaestrias = [
  {
    slug:"leitura-de-partitura",name:"Leitura de Partitura",stage:1,kind:"Leitura tática",
    headline:"Reconhecer o funcionamento de uma ativação e descobrir brechas reais.",
    costs:[{value:"0 PM",type:"free",label:"Observação"},{value:"1 PM",type:"pm",label:"Análise ou Antecipação"},{value:"A / B",type:"symbol",label:"Conflito"}],
    stats:[["Alvo","Uma ativação observada ou sinalizada"],["Uso","Narrativa fluida ou Conflito"],["Efeito","Informação tática, não neutralização"]],
    rules:[
      {title:"Observação Recorrente",text:"<strong>0 PM.</strong> Depois de presenciar a <strong>mesma ativação duas vezes</strong>, Apolo reconhece seu padrão. Não identifica automaticamente a partitura inteira."},
      {title:"Análise Imediata",text:"<strong>1 PM</strong> após observar uma ocorrência. Em <strong>Conflito</strong>, paga também <strong class='rule-a'>1A</strong> ou <strong class='rule-b'>1B</strong> para descobrir custo em símbolos, condições perceptíveis e uma vulnerabilidade real possível, quando houver."},
      {title:"Antecipação",text:"<strong>1 PM</strong> antes da primeira ocorrência, com <strong>indícios concretos</strong>. Em <strong>Conflito</strong>, exige <strong class='rule-a'>1A + </strong><strong class='rule-b'>1B</strong> ou <strong class='rule-a'>2A</strong> para prever uma ativação provável."},
      {title:"Narrativa fluida",text:"Raciocinar e deduzir com base no que foi visto é <strong>gratuito</strong>. Uma pista excepcional pode custar <strong>1 PM</strong>, mas não exige A/B fora do Conflito; só role quando existir incerteza real."}
    ],
    warning:"Símbolos pagos não contam como progresso de Objetivos. A Maestria não inventa fraquezas ou informações impossíveis.",
    sourceSection:"adaptativa",sourceName:"LEITURA DE PARTITURA"
  },
  {
    slug:"vinculo-tatico",name:"Vínculo Tático",stage:1,kind:"Coordenação",
    headline:"Estabelecer um plano conjunto e criar uma adaptação para um aliado.",
    costs:[{value:"1 PM",type:"pm",label:"Ativação"},{value:"+1B",type:"adapt",label:"Aliado"}],
    stats:[["Alvo","Um aliado vinculado"],["Duração","Até o fim do Conflito"],["Frequência","+1B em um teste pertinente por rodada"]],
    rules:[
      {title:"Ativação",text:"Apolo gasta <strong>1 PM</strong> para escolher um aliado. O custo <strong>substitui o antigo 1d</strong>. Trocar de aliado gasta <strong>outro 1 PM</strong>; só existe um Vínculo ativo."},
      {title:"Em Conflito",text:"O aliado recebe <strong class='rule-b'>+1B</strong> no resultado de <strong>um teste pertinente por rodada</strong> quando contribuir de fato para o plano. O B pertence ao aliado."},
      {title:"Na narrativa fluida",text:"Concede <strong class='rule-b'>+1B</strong> em <strong>um único teste cooperativo pertinente</strong> na cena."}
    ],
    warning:"Manter o vínculo não custa PM por rodada. Não concede uma Ação extra nem contorna as restrições de apoio a quem Age por Instinto.",
    sourceSection:"adaptativa",sourceName:"VÍNCULO TÁTICO"
  },
  {
    slug:"analise-preventiva",name:"Análise Preventiva",stage:1,kind:"Investigação",
    headline:"Preparar uma resposta antes que o perigo se transforme em Conflito.",
    costs:[{value:"0 PM",type:"free",label:"Dedução"},{value:"1 PM",type:"pm",label:"Pista excepcional"}],
    stats:[["Uso","Principalmente narrativa fluida"],["Exemplos","Estruturas, rotas e comportamento"],["Condição","Indícios reais disponíveis"]],
    rules:[
      {title:"Pensar é gratuito",text:"Apolo pode observar, comparar padrões, planejar e comunicar uma solução plausível sem pagar recursos nem rolar apenas por ter encontrado uma boa ideia."},
      {title:"Leitura especializada",text:"Para obter uma <strong>pista excepcional e verdadeira</strong>, pode gastar <strong>1 PM</strong>. O Assimilador só exige teste quando existirem riscos, oposição, pressa ou incerteza real."},
      {title:"Quando o Conflito começar",text:"A informação obtida continua válida. Se a transição constituir uma <strong>nova cena significativa</strong>, Apolo recupera <strong>1 PM</strong>, respeitando a reserva máxima."}
    ],
    warning:"A obtidos fora do Conflito não ficam armazenados para Objetivos futuros. Cortes artificiais de cena não renovam PM.",
    sourceSection:"adaptativa",sourceName:"ANÁLISE PREVENTIVA"
  },
  {
    slug:"plano-de-contramedida",name:"Plano de Contramedida",stage:1,kind:"Objetivos",
    headline:"Transformar uma fraqueza plausível da ameaça em Objetivo Secundário executável.",
    costs:[{value:"0 PM",type:"free",label:"Plano válido"},{value:"1 PM",type:"pm",label:"Se usar Leitura especial"}],
    stats:[["Forma","Objetivo Secundário com marcos"],["Progressão","A investidos em ações reais"],["Participantes","Qualquer Infectado apto"]],
    rules:[
      {title:"Propor um plano",text:"<strong>Qualquer Infectado</strong> pode propor uma contramedida plausível <strong>sem gastar PM</strong>. O Assimilador determina custo em A, requisitos físicos, Condicionantes e marcos."},
      {title:"Com Leitura de Apolo",text:"Se a Leitura especializada abrir o Plano na <strong>mesma Ação</strong>, seu <strong>1 PM já cobre o procedimento</strong>; um <strong class='rule-a'>1A</strong> ou <strong class='rule-b'>1B</strong> pago na Leitura pode fundamentar a abertura, mas <strong>não conta como progresso</strong>."},
      {title:"Debilitação e Neutralização",text:"Um marco intermediário <strong>dificulta</strong> a ativação conforme previsto. Concluir o Objetivo <strong>neutraliza a fonte</strong> enquanto a condição persistir."},
      {title:"Crédito ao Objetivo Principal",text:"A cada marco, metade do <strong>custo acumulado em A</strong> (arredondada para baixo e descontados os créditos anteriores) progride apenas na Neutralização da <strong>mesma Ameaça</strong>."}
    ],
    warning:"Ter a ideia não conclui o Objetivo. O grupo continua sujeito a ferramentas, posicionamento, A investidos, Pressões e tempo.",
    sourceSection:"adaptativa",sourceName:"PLANO DE CONTRAMEDIDA"
  },
  {
    slug:"golpe-de-ruptura",name:"Golpe de Ruptura",stage:1,kind:"Intervenção decisiva",
    headline:"Sacrificar uma arma para acelerar uma Contramedida já em execução.",
    costs:[{value:"1 PM",type:"pm",label:"Técnica"},{value:"1A",type:"success",label:"Próprio"},{value:"Arma Q2+",type:"risk",label:"Sacrifício"}],
    stats:[["Frequência","1 vez por Conflito"],["Pré-requisito","Leitura válida e metade do Objetivo avançado"],["Bônus","+2A apenas naquele Secundário"]],
    rules:[
      {title:"Condições",text:"A ativação já deve ter sido lida e pelo menos <strong>metade dos A exigidos</strong> no Objetivo Secundário deve ter sido investida por ações reais."},
      {title:"Custo",text:"Na Ação, Apolo gasta <strong>1 PM</strong>, investe <strong class='rule-a'>ao menos 1A próprio</strong> no mesmo Objetivo e <strong>destrói definitivamente uma arma compatível de Qualidade 2 ou mais</strong>."},
      {title:"Benefício",text:"Acrescenta <strong class='rule-a'>+2A</strong> exclusivamente ao progresso daquele Objetivo Secundário. Não gera A livres, turno extra, dano automático ou benefício em outro Objetivo."}
    ],
    warning:"O método precisa ser fisicamente possível; a arma não pode produzir um efeito que não possui. A destruição é irreversível como equipamento.",
    sourceSection:"adaptativa",sourceName:"MAESTRIA DE ARMAS — GOLPE DE RUPTURA"
  },
  {
    slug:"repertorio-marcial",name:"Repertório Marcial",stage:1,kind:"Conhecimento passivo",
    headline:"Aprender com o comportamento de adversários sem copiar poderes impossíveis.",
    costs:[{value:"0 PM",type:"free",label:"Passiva"}],
    stats:[["Uso","Observação e prática"],["Alcance","Movimentos fisicamente viáveis"],["Custo adicional","Nenhum PM por lembrar ou adaptar"]],
    rules:[
      {title:"Efeito",text:"Apolo reconhece, memoriza e adapta <strong>posturas, defesas e técnicas</strong> compatíveis com seu próprio corpo, treino e equipamento."},
      {title:"Aplicação",text:"Pode propor soluções narrativas fundamentadas na experiência marcial. Testes só são necessários quando a execução tiver incerteza real."}
    ],
    warning:"Não adquire automaticamente Aptidões, Características, novas mutações ou poderes ao observar um oponente.",
    sourceSection:"adaptativa",sourceName:"REPERTÓRIO MARCIAL"
  },
  {
    slug:"haicais-e-desenhos",name:"Haicais, Desenhos e Ritos",stage:2,kind:"Criação e experiência",
    headline:"A prática artística e espiritual produz Experiência quando efetivamente realizada.",
    costs:[{value:"0 PM",type:"free",label:"Prática"},{value:"1 XP",type:"success",label:"Haicai/dia"},{value:"2 XP",type:"success",label:"Desenho/dia"}],
    stats:[["Haicai","Novo, escrito e apresentado"],["Desenho","Novo, criado em 1–2h no jogo"],["Soma","Até 3 XP/dia se ambos válidos"]],
    rules:[
      {title:"Haicai",text:"<strong>1 XP</strong> por haicai <strong>inédito</strong>, no máximo um por dia efetivamente vivido em jogo; o jogador escreve e apresenta ou recita a obra na sessão."},
      {title:"Desenho",text:"<strong>2 XP</strong> por desenho <strong>inédito</strong>, no máximo um por dia vivido; exige aproximadamente <strong>1–2 horas de criação pelo personagem</strong> e apresentação real da arte pelo jogador."},
      {title:"Rituais significativos",text:"Podem oferecer XP adicional definido pelo Assimilador segundo <strong>dificuldade, risco e peso narrativo</strong>, inclusive no mesmo dia de haicai e desenho."}
    ],
    warning:"Não há recompensa retroativa por saltos de calendário nem XP por reutilizar obras antigas. O Assimilador valida o rito.",
    sourceSection:"bencao",sourceName:"HAICAIS E DESENHOS"
  },
  {
    slug:"julgamento-solar",name:"Julgamento Solar",stage:2,kind:"Origem especial",
    headline:"Enxergar na escuridão e recorrer a uma terceira Origem exclusivamente noturna.",
    costs:[{value:"0 PM",type:"free",label:"Percepção passiva"},{value:"1 uso",type:"origin",label:"Por sessão, à noite"}],
    stats:[["Ativação","À noite, 1 vez por sessão"],["Benefício","+1 dado mantido pela Origem especial"],["Incompatibilidade","Agir por Instinto"]],
    rules:[
      {title:"Percepção lunar-solar",text:"Apolo distingue formas e deslocamentos <strong>mesmo na ausência de iluminação</strong>, desde que existam condições reais de percepção. Não enxerga através de barreiras."},
      {title:"Origem noturna",text:"Durante a noite, pode usar a <strong>terceira Origem especial</strong> para manter <strong>+1 dado</strong> conforme o funcionamento das Origens. É <strong>adicional</strong> às duas Origens normais."},
      {title:"Discernimento e convicção",text:"Alvorecer, julgamento e discernimento expressam a interpretação narrativa de Apolo, sem fornecer A/B ou detecção infalível de mentiras automaticamente."}
    ],
    warning:"O uso é independente de PM, não se acumula com Agir por Instinto e só pode ser acionado uma vez por sessão, à noite.",
    sourceSection:"bencao",sourceName:"ORIGEM EXTRA — JULGAMENTO SOLAR"
  },
  {
    slug:"heranca-compartilhada",name:"Herança Compartilhada",stage:2,kind:"Elo fraternal",
    headline:"Transferir parte da própria Experiência para Aruana sem duplicá-la.",
    costs:[{value:"0 PM",type:"free",label:"Transferência"},{value:"2 XP → 1 XP",type:"origin",label:"Razão de troca"}],
    stats:[["Origem do XP","Reserva não gasta de Apolo"],["Destinatária","Aruana"],["Natureza","Transferência definitiva"]],
    rules:[
      {title:"Troca",text:"Apolo pode ceder <strong>2 XP próprios ainda não gastos</strong> para que Aruana receba <strong>1 XP</strong>."},
      {title:"Conservação",text:"Os pontos saem definitivamente da reserva de Apolo. Frações não são transferidas, e nenhum XP é copiado ou criado."}
    ],
    warning:"O elo de Experiência não transfere PM, Pontos de Origem ou recursos de Conflito.",
    sourceSection:"bencao",sourceName:"HERANÇA COMPARTILHADA — EXPERIÊNCIA"
  },
  {
    slug:"convergencia-dos-gemeos",name:"Convergência dos Gêmeos",stage:2,kind:"Gatilho compartilhado",
    headline:"Dois esforços pessoais dos irmãos produzem um pequeno avanço conjunto.",
    costs:[{value:"0 PM",type:"free",label:"Gatilho"},{value:"1A + 1A",type:"success",label:"Próprios"},{value:"+1A",type:"success",label:"Uma vez"}],
    stats:[["Frequência","1 vez por Conflito, compartilhada"],["Condição","Mesmo Objetivo, mesma rodada"],["Participantes","Apolo e Aruana"]],
    rules:[
      {title:"Condição",text:"Apolo e Aruana devem investir <strong class='rule-a'>pelo menos 1A próprio cada</strong> no <strong>mesmo Objetivo</strong> e na <strong>mesma rodada</strong>."},
      {title:"Benefício",text:"O Objetivo recebe <strong class='rule-a'>+1A adicional único</strong>. O gatilho pertence à dupla, não é uma ativação separada por personagem."}
    ],
    warning:"A de Apoio, conversão de B e bônus automáticos não substituem os A próprios exigidos. Não recupera PM nem concede turno.",
    sourceSection:"bencao",sourceName:"CONVERGÊNCIA DOS GÊMEOS"
  },
  {
    slug:"controle-hemorragico",name:"Controle Hemorrágico",stage:3,kind:"Regeneração biológica",
    headline:"Recuperar a faixa de Saúde seguinte mediante esforço de Assimilação.",
    costs:[{value:"2e",type:"assim",label:"Assimilação"},{value:"0 PM",type:"free",label:"Sem custo extra"}],
    stats:[["Em Conflito","Uma Ação"],["Fora de Conflito","Alguns minutos"],["Frequência","1 vez entre dois repousos completos"]],
    rules:[
      {title:"Recuperação",text:"Gasta <strong class='rule-e'>2 Pontos de Assimilação</strong> para recuperar os pontos mínimos necessários para entrar com <strong>1 Ponto na faixa superior</strong>: <strong>S2 → S3</strong> ou <strong>S3 → S4</strong>."},
      {title:"Limite",text:"Não recupera acima de <strong>S4 — Laceração</strong>. O uso entre repousos completos vale tanto em Conflito quanto na narrativa fluida."}
    ],
    warning:"Não funciona em S1, não dispensa custos para agir em Saúde crítica e não combina duas regenerações na mesma Ação.",
    sourceSection:"sangue",sourceName:"CONTROLE HEMORRÁGICO"
  },
  {
    slug:"percepcao-hematica",name:"Percepção Hemática",stage:3,kind:"Percepção passiva",
    headline:"Interpretar vestígios de sangue e suas alterações recentes.",
    costs:[{value:"0 PM",type:"free",label:"Passiva"}],
    stats:[["Vestígios","Expostos e detectáveis"],["Uso","Investigação e perseguição"],["Teste","Quando houver incerteza real"]],
    rules:[
      {title:"Efeito",text:"Apolo reconhece <strong>sangue exposto, ferimentos com vestígios, rastros hemáticos</strong> e alterações recentes em manchas ou odores pertinentes."},
      {title:"Interpretação",text:"Pode investigar pistas biológicas mediante testes adequados quando houver risco ou dúvida sobre o rastro."}
    ],
    warning:"Não detecta automaticamente sangue oculto dentro de corpos intactos nem rastreia qualquer pessoa a distância.",
    sourceSection:"sangue",sourceName:"PERCEPÇÃO HEMÁTICA"
  },
  {
    slug:"marca-sanguinea",name:"Marca Sanguínea",stage:3,kind:"Rastreamento",
    headline:"Marcar uma criatura com sangue próprio e perceber sua direção aproximada.",
    costs:[{value:"1 PM",type:"pm",label:"Ativação"},{value:"Toque",type:"risk",label:"Contato direto"}],
    stats:[["Duração","Até o fim do próximo Repouso Completo"],["Alcance","1 km por Nível de Assimilação"],["Limite","Uma Marca ativa"]],
    rules:[
      {title:"Marcar",text:"Apolo gasta <strong>1 PM</strong> e toca a criatura diretamente com o <strong>próprio sangue</strong>. O novo custo <strong>substitui o antigo 1e</strong>."},
      {title:"Rastrear",text:"Enquanto a Marca durar e o alvo estiver dentro do alcance, percebe sua <strong>direção aproximada</strong>, não a posição exata."},
      {title:"Sob oposição",text:"Contato e aproximação exigem Ação e teste quando houver resistência. Em alvo acessível e cooperativo, não se cria rolagem artificial."}
    ],
    warning:"Uma nova Marca substitui a anterior. Não atravessa automaticamente barreiras especiais, não domina o alvo nem causa dano.",
    sourceSection:"sangue",sourceName:"MARCA SANGUÍNEA"
  },
  {
    slug:"duelo-hematico",name:"Duelo Hemático",stage:3,kind:"Compromisso e risco",
    headline:"Enfrentar sozinho uma criatura previamente marcada em uma disputa real.",
    costs:[{value:"0 PM",type:"free",label:"Declaração"},{value:"Marca ativa",type:"risk",label:"Requisito"}],
    stats:[["Declaração","Antes de iniciar a disputa"],["Escopo","Conflito preparado para um Infectado"],["Prêmio","Elegibilidade à Herança de Batalha"]],
    rules:[
      {title:"Preparação",text:"Apolo declara o duelo <strong>antes do começo da disputa individual</strong> contra uma criatura sob Marca Sanguínea. O Assimilador prepara os dados e Objetivos considerando <strong>um Infectado</strong>."},
      {title:"Durante o duelo",text:"Quando plausível, a criatura prioriza Apolo como alvo das ativações hostis individuais. O duelo <strong>não reduz</strong> custos, dano ou riscos da ameaça."},
      {title:"Interferência",text:"Ajuda direta de outro Infectado na Neutralização ou proteção que influencie o duelo <strong>invalida a Herança</strong>. Socorrer Apolo continua permitido, mas sem o troféu."}
    ],
    warning:"Não é possível converter retroativamente uma luta coletiva em duelo individual para diminuir sua dificuldade.",
    sourceSection:"sangue",sourceName:"DUELO HEMÁTICO"
  },
  {
    slug:"heranca-de-batalha",name:"Herança de Batalha",stage:3,kind:"Recompensa condicionada",
    headline:"Conservar um troféu de duelo e utilizá-lo para absorver uma Pressão futura.",
    costs:[{value:"0 PM",type:"free",label:"Recompensa"},{value:"−1C",type:"adapt",label:"Próximo teste"}],
    stats:[["Condição","Neutralização pessoal + troféu biológico"],["Reserva","Um troféu por vez"],["Aplicação","Próximo Teste de Assimilação"]],
    rules:[
      {title:"Conquista",text:"Ao neutralizar pessoalmente a criatura marcada, de forma letal ou não letal, e obter um <strong>troféu biológico significativo</strong>, Apolo recebe uma Herança."},
      {title:"Uso",text:"Pode consumir esse troféu para <strong>anular 1C de seu próximo Teste de Assimilação</strong>."}
    ],
    warning:"Não elimina C de mutações Inoportunas anteriores. A mesma criatura não gera novas Heranças repetidas, e duelos inválidos por interferência não concedem troféu.",
    sourceSection:"sangue",sourceName:"HERANÇA DE BATALHA"
  }
];

export const apoloPorSlug=Object.fromEntries(apoloMaestrias.map(item=>[item.slug,item]));
export const apoloPorNome=Object.fromEntries(apoloMaestrias.map(item=>[item.sourceName,item]));
export const apoloGrupos=[
  {stage:1,name:"I — Maestria Adaptativa",description:"Leitura, Contramedidas, coordenação e ruptura."},
  {stage:2,name:"II — Bênção de Apolo",description:"Arte, Origem noturna e elo dos gêmeos."},
  {stage:3,name:"III — Linhagem de Sangue",description:"Rastreamento, sobrevivência e compromisso predatório."}
];
