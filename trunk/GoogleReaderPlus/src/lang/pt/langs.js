/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * pt : Portuguese
 * **************************
 *
 * Version : 1.6
 * Date : 07-30-2010
 * @author Ilídio
 */
var locale = 'pt';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    version: "version",
    closeentry: {
        text: 'Fechar entrada',
        keyword: 'Fechar'
    },
    column: {
        text: 'Mostrar em multiplas colunas',
        keyword: 'Coluna',
        summary: 'Adicionar/editar items',
        desc: 'Gerir colunas'
    },
    facebook: {
        text: 'Partilhar este artigo no Facebook',
        keyword: 'Facebook'
    },
    twitter: {
        text: 'Partilhar este artigo no Twitter',
        keyword: 'Twitter',
        plslogin: 'Entre no Twitter',
        toolong: "Esta mensagem é grande demais!",
        notetoolong: "<b>Nota para prosseguir com o envio:</b> (sobram {0} caracteres)",
        notemax: "<b>Nota para prosseguir com o envio:</b> (não mais que 140 caracteres)",
        text_title: 'Título',
        text_tag: 'Tag',
        text_url: 'URL',
        text_send: 'Enviar',
        text_count: 'Número de caracteres',
        text_cancel: 'Cancelar',
        text_shortener: 'url pequeno',
        shortfailed: "Ora bolas, aconteceu um erro no uso de um url pequeno!\n\r{0}"
    },
    readit: {
        password: 'Palavra-passe, se tiveres alguma:',
        wronglogin: 'O nome de utilizador ou palavra-passe que introduziu está incorrecto!!',
        nologin: 'Para utilizar este serviço necessita de um utilizador válido, por favor configure-o nas preferências!!',
        error: 'O serviço encontrou um erro. Por favor tente mais tarde.',
        badrequest: 'Erro no pedido. Deve faltar algum parâmetro (ver o url).',
        saving: 'Guardar',
        shortcut_readitlater: 'Ler mais tarde com Instapaper'
    },
    instapaper: {
        text: 'Ler mais tarde com Instapaper',
        keyword: 'Instapaper',
        plslogin: 'Por favor inicie a sessão no Instapaper',
        login: 'Email or username:'
    },
    readitlater: {
        text: 'Ler mais tarde com ReadItLater',
        keyword: 'ReadItLater',
        plslogin: 'Por favor inicie a sessão no ReadItLater',
        rateexceeded: 'O limite taxa de utilização foi excedida, por favor espere',
        maintenance: 'O servidor de sincronização do Read It Later\'s encontra-se em baixo para operações de manutenção)'
    },
    favicons: {
        preferences: 'Preferências',
        getfavicon: 'Obter favicon',
        notfoundicon: 'O favicon não foi encontrado para "{0}"',
        summary: 'Adicionar/editar itens',
        desc: 'Gestão de favicons'
    },
    filter: {
        settings: 'Configurações dos filtros',
        excludes: 'Excluidos',
        highlights: 'Destaques',
        highlight: 'Destaque',
        exclude: 'Excluido',
        hideduplicates: 'Esconder duplicados',
        hideexcludes: 'Esconder excluidos',
        preferehighlights: 'Preferir destaques em vez de excluidos',
        update: 'Actualização',
        quickadd: 'Adicionar rápido',
        add: 'Adicionar',
        close: 'Fechar',
        edit: 'Editar',
        remove: 'Remover'
    },
    fitheight: {
        text: 'Ajustar altura',
        keyword: 'Ajustar altura'
    },
    jump: {
        textbottom: 'Saltar para o fundo da página',
        texttop: 'Saltar para o cimo da página',
        keywordtop: 'top'
    },
    openbackground: {
        text: 'Abrir em plano de fundo',
        keyword: 'Abrir'
    },
    preview: {
        text: 'Integrar pre-visualizações dos artigos',
        title: 'Abrir em pre-visualização',
        opennewtab: 'Abrir numa nova janela',
        keyword: 'Pre-visualização',
        overlay_next: 'Seguinte',
        overlay_previous: 'Anterior',
        overlay_close: 'Fechar',
        overlay_category: 'Categoria'
    },
    readbymouse: {
        middleclick: 'Click do meio',
        openintab: 'Abrir em separadores',
        openinbacktab: 'Abrir num Separador em plano de fundo',
        shares: 'Partilhas',
        stars: 'Estrelas',
        tag: 'Tag',
        addtag: 'Adicionar uma Tag',
        on: 'ReadByMouse On',
        off: 'ReadByMouse Off'
    },
    replacer: {
        nomatch: 'Nenhum resultado foi encontrado.',
        loading: 'Carregar ...'
    },
    lightbox: {
        text: 'Dar destaque aos conteúdos media',
        keyword: 'Luz'
    },
    ig: {
        menu_prefs: 'Reader+ preferências',
        menu_theme: 'Reader+ temas',
        menu_randomtheme: 'Mudar o tema :'
    },
    menu: {
        label: 'Extra',
showallfolders: 'Ver as pastas todas'
    }
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus",
        "val-save": "Guardar",
        alreadyexist: "O item pretendido já existe!",
        snew: 'novo!',
        supdated: 'Actualizado!',
        prefssaved: "Preferências gravadas!",
        cachecleared: "Memória do Reader Plus apagada!",
expandall:'Todos'
    },
    theme: {
        noborder: "Remove as caixas das entradas para mostrar mais itens",
        mytheme: 'Utilize as <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">imagens de fundo</a> e cores de fontes de "MyTheme" (<a href="http://code.google.com/p/googlereaderplus/wiki/Themes" target="blank">Pre-visualização</a>)',
/*url: 'Picture URL',*/
        color: 'Cores do texto',
                bg: 'Cores de fundo',
/*repeat: 'Tiled Picture ',*/
externaltheme: 'Tema do Google/Gmail',
imgrbg:'Repetir fundo',
imgsbg:'Fundo',
imgrh:'Repetir cabeçalho',
imgh:'Cabeçalho',
imghr:'Cabeçalho direito',
imghl:'Cabeçalho esquerdo',
imgrf:'Repetir Rodapé',
imgf:'Rodapé',
imgfr:'Rodapé direito',
imgfl:'Rodapé esquerdo'
    },
    ig: {
        warning: 'Alguns temas podem aparecer incorrectamente; isto ainda está em testes (versão beta)!',
        skin_name: 'Nome do tema do iGoogle',
        skin_url: 'URL do tema iGoogle',
        debug: 'Modo depuração (só para programadores)',
        randomtime: 'Tema dinâmico muda aleatóriamnete',
        userandomthemes: 'O tema é mudado de uma forma automática e aleatóriamente',
        randomthemes: 'O tema é mudado de cada X minutos',
        add: 'Adiciona agora',
        next: 'Seguinte',
        previous: 'Anterior',
        random: 'Aleatório',
        search: 'Procurar temas'
    },
    about: {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>Obrigado...</h1>' +
        '<p>... por instalado (ou actualizado) para a última versão so <strong>Reader Plus</strong>!</p>' +
        '<p>Dá uma olhadela na <a href="preferences.html" title="Go to the preferences page"><strong>página de configurações</strong></a> da extensão, para ver se está tudo nos conformes ou mesmo se pretendes efectuar alguma alteração.</p>' +
        '<p><a href="https://chrome.google.com/extensions/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>Visita a galeria de extensões do Google Chrome!</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Follow me on Twitter"/></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>Se gostas-te desta extensão ou mesmo se prentendes novas funcionalidades, por favor efectua uma doação.</p>' +
        '<p>Desta forma, poderei comprar um camião carregado de café, e assim conseguirei ficar mais tempo acordado e escrever mais código :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
        whatsnew: '<td><h2>O que é há de novo!!</h2><ul><li>Novos temas</li><li>ou utiliza fundos customizáveis com novos temas "MyTheme"</li><li>ou utiliza os temas <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a> </li><li>Pre-visualizações em lightbox</li><li>Partilhar itens no <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li><li>Utilizar janelas flutuantes (geral)</li><li>Traduzir artigos</li></ul></td>',
        nopopup: '<p>Se não quiseres alertas acerca de novas actualizações, remove a seguinte opção "Sem aviso de actualizações" na <a href="preferences.html#general">Secção Geral</a>.</p>'
    },
    link: {
        reader: "<span>Google Reader</span>O teu RSS reader",
        issues: "<span>Contactar</span>Encontras-te algum bug ou têns alguma sugestão?",
        download: "<span>Extensões do Google</span>O local para fazer download",
        about: "<span>Acerca</span>Acerca, obrigado,…",
        site: "<span>Website</span>A minha página pessoal",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Segue as notícias e actualizações",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Paga-me um café!</a>',
        translate: '<span>Tradução</span>Ajuda-me a traduzir</a>'
    },
    column: {
        count: "Número de colunas",
        locked: "Sempre activo, excepto os feeds seguintes:",
        pagebreak: "Separa os artigos muito longos para serem lidos como um jornal.",
        entersite: "Inserir um URL de uma página de internet"
    },
    translate: {
        lang: "Traduzir conteúdo para ",
        locked: "Sempre activo, excepto:",
        include: "Incluir apenas os feeds seguintes:",
        entersite: "Inserir um URL de uma página de internet"
    },
    twitter: {
        shortener: "Encurtador",
        shortener_bitly: "Configuração do BitLy (opcional):",
        shortener_login: "Login",
        shortener_apikey: "ApiKey",
        shortener_pwd: "Password"
    },
    instapaper: {
        auth: "Autenticação do <a href='http://www.instapaper.com' target='blank'>Instapaper</a>:",
        username: "Utilizador:",
        password: "Palavra-passe (opcional):"
    },
    readitlater: {
        auth: "<a href='http://readitlaterlist.com/signup' target='blank'>Autenticação</a> do <a href='http://www.readitlaterlist.com' target='blank'>ReadItLater</a> (obrigatório):",
        username: "Utilizador:",
        password: "Palavra-passe:"
    },
    colorful: {
        tree: "Mostrar cores das pastas da navegação em árvore"
    },
    general: {
        counter: "Mostrar contador dos não lidos no icon da toolbar",
pageicon: 'Activar o icon na barra de endereço (ao clicar irá abrir o menu)',
stats: 'Activar o relatório de estatisticas anónimas (para um melhor suporte)',
bottomup:'Toolbar do Cabeçalho para cima',
                opendirect: "Clicar na toolbar icon irá abrir o GoogleReader",
        secure: "Utilizar sempre o protocolo seguro (https)",
        topcurrent: "Entrada currente sempre no topo",
        floatactions: "As acções inseridas são mostradas em janelas flutuantes",
        noupdatepopup: "Sem avisos de actualizações",
        icontoolbar_add: "Para adicionar um botão com um icon na toolbar, faça <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">download e instale-o</a>.",
        icontoolbar_text: "<span>Para inserir o botão opcional, adiciona-mo-lo numa extensão à parte,</span>                                    <br>                                    <span>para ser instalado em conjunto com o readerplus.</span>                                    <br>                                    <span>Para adicionar o botão, clica <b></b> no <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">botão Toolbar do readerplus</a> da página.</span><span>Para remover o botão, clica no botão do lado direito e escolhe a opção desactivar.</span>",
        importexport_text: "Podes agora gravar as tuas configurações utilizando o 'exportar' e utiliza-las mais tarde com o 'importar', mas confirma que a informação é compatível com a modelo <a href='http://jsonformatter.curiousconcept.com/' target='blank'>JSON</a>:",
        confirmimport: "Têm a certeza que pretende importar estas configurações?\nAs configurações correntes seram PERDIDAS!",
text_layout:'Opções de Layout',
text_private:'Dados privados e actualizações',
text_toolbaricon:'Toolbar icon',
text_pageicon:'Address bar icon',
text_export:'Exportar/importar'
    },
    limit: {
        slidewindow: "Slidewindow - limitar número de entradas",
        mini: "Nº mínimo de itens",
        maxi: "Nº máximo de itens"
    },
    removeads: {
        links: "Filtro Link:",
        images: "Filtro imagem:",
        iframes: "Filtro Iframe:"
    },
    preview: {
        onicon: "Mostrar pre-visualizações integradas quando se clica no icon direito a seguir ao título (if not checked, on title)",
        locked: "Sempre activo, excepto feeds seguintes:",
        overlay: 'Pré-visulização em ecrã inteiro (Lightbox)'
    },
    fitheight: {
        locked: "Sempre activo, excepto feeds seguintes:"
    },
    filter: {
        searchbody: "Pesquisar no título e no corpo da mensagem"
    },
    favicons: {
        providerpageicons: 'Utilizar o servidor do <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> (Recomendado para visualização dos icons)',
        sidebaronly: "Mostrar favicons apenas na barra do lado",
cloud: 'Utilizar uma base de dados em nuvem <a href="http://wedata.net/databases/Favicons" target="blank">wedata/Favicons</a> para a comunidade poder utilizar/adicionar favicons',
        custom: "Inserir favicons:",
        add: "Adicionar",
        tip: "Ajuda: podes facilmente adicionar o menu contextual \"Get favicon\" no menu que está situado à esquerda",
        manual: "Icons manuais para todos os sites (não recomendado; lento)",
        parsing: "Esta opção irá detectar o favicon utilizando para isso a página principal",
        entersite: "Introduz um URL de uma página de internet",
        prompticon: "Introduz o url do icon (deixa este campo vazio para obter automáticamente):"
    },
    replacer: {
intro: '<a href="http://code.google.com/p/googlereaderplus/wiki/ReplacerHowto" target="blank">Ajuda de como utilizar o substituidor</a>',
cloud: 'Utiliza expressões online expressions de <a href="http://wedata.net/databases/LDRFullFeed/items" target="blank">wedata/LDRFullFeed</a> e <a href="http://wedata.net/databases/Replacer/items" target="blank">wedata/Replacer</a> da base de dados em nuvem',
        link: "Link Regex",
        from: "Procura regex/xpath",
        to: "Substitui",
        prompttitle: "Título para este filtro"
    },
    lightbox: {
        locked: "Sempre activo, excepto para os seguintes feeds:"
    },
    relook: {
        css: "CSS folha de estilo",
        resize: "Dispara o evento resize para adaptar o ecrã em completo (fullscreen)"
    },
    pack: {
        mini: "<span>Package Mini</span>O mínimo para uma melhor leitura",
        ludoo: "<span>Package LudoO</span>O melhor para um click",
        full: "<span>Package Full</span>Tudo activo",
        reset: "<span>Package Reset</span>Voltar ao ínicio",
        confirmdel: "Todas as configurações seram APAGADAS. Têns a certeza que pretendes fazer isto?"
    },
    extshortcuts: {
        custom: "Os teus Atalhos",
        official: "Os atalhos do Google Reader",
        alreadyusedprefs: "Já tinho sido antes inserido nas tuas preferências!",
        alreadyusedgoogle: "Já era utilizado pelo Google!"
    },
    thanks: {
        donators: "Obrigado pelas contribuições monetárias realizadas para este projecto",
        translators: "Obrigado pelo trabalho realizado pelos tradutores",
        authors: "Obrigado aos autores dos projectos Greasemonkey e Stylish"
    }
};