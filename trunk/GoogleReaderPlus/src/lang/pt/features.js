/**
 * ReaderPlus
 * Translation for features
 *
 * **************************
 * pt : Portuguese 
 * **************************
 *
 * For translators : please keep major version or original for your translations !
 * Use minor version for yours translations
 * so that 0.3.11 is the 11th translated version of the original v0.3 english version.
 *
 *
 * Version : 1.5.1
 * Date : 07-30-2010
 * @author Ilídio
 */
var locale = 'pt';
namespace('GRP.langs.' + locale);
GRP.langs[locale].categories = {
        main: 'Main',
        theme: 'Temas',
        icons:'Icons',
        counter:'Contador',
        layout: 'Layout',
        navigation: 'Navegação',
        share: 'Partilhar',
        action: 'Acção',
        content: 'Conteúdo'
};
GRP.langs[locale].scripts = {
    general: {
        name: "Geral",
        desc: "Configurações gerais"
    },
    theme: {
        name: "Tema",
        desc: "Altera o tema do Google Reader"
    },
    ig: {
        name: "Temas do iGoogle",
        desc: "Utiliza os <a href='http://www.google.com/ig/directory?type=themes' target='blank'>Temas do iGoogle</a> no Google Reader (Beta)"
        },
    relook: {
        name: "Relook",
        desc: "Alterar a cara do site com folhas de estilo"
    },
    favicons: {
        name: "Favicons",
        desc: "Mostrar o favicon por cada item seguido"
    },
    unreadcount: {
        name: "Mostra todos os contadores não lidos",
        desc: "Mostra todos os contadores não lidos dos feeds"
    },
    fixlayout: {
        name: "Corrigir layout",
        desc: "Corrige diferentes falhas de estilos no layout como o tamanhos das caixas de entradas, etc..."
    },
    count: {
        name: "Corrigir contador (1000+)",
        desc: "Mostrar a contagem real de feeds não lidos"
    },
    counticon: {
        name: "Icon counter",
        desc: "Mostra a contagem de itens não lidos no favicon do Google Reader"
    },
    removeads: {
        name: "Remover publicidade",
        desc: "Simples bloqueador de publicidade"
    },
    column: {
        name: "Texto em multiplas colunas",
        desc: "Adicionar um botão para ler artigos em colunas (como os jornais)"
    },
    preview: {
        name: "Pré-visualização integrada",
        desc: "Adiciona um botão para mostrar a página inteira do artigo em vez do resumo"
    },
    colorful: {
        name: "Listagens às cores",
        desc: "Utilizar a cor de fundo para o mesmo feed"
    },
    filter: {
        name: "Filtrar entradas",
        desc: "Filtrar entradas baseado em palavras chave"
    },
        limit: {
        name: "Limitar entradas",
        desc: "Limitar número de entradas numa só página. Os itens lidos são removidos."
    },
    prefetch: {
        name: "Pre-obter mais",
        desc: "Obter mais entradas de cada vez, para uma navegação mais suave"
    },
        nested: {
        name: "Pastas aninhadas",
        desc: "Multiplos níveis em pastas"
    },    
    readbymouse: {
        name: "Ler com o rato",
        desc: "O seguinte/anterior são utilizados com o botão direito/esquerdo do rato"
    },
    facebook: {
        name: "Facebook",
        desc: "Adicionar um botão para partilhar o artigo no Facebook"
    },
    twitter: {
        name: "Twitter",
        desc: "Adicionar um botão para partilhar o artigo no Twitter"
    },
    instapaper: {
        name: "Instapaper",
        desc: "Adicionar um botão para ler as notícias mais tarde com o Instapaper"
    },
        readitlater: {
        name: "ReadItLater",
        desc: "Adicionar um botão para ler as notícias mais tarde com o ReadItLater"
    },
    mark: {
        name: "Marcar como lido",
        desc: "Marcar itens antes/depois como lidos"
    },
    jump: {
        name: "Adicionar links de cabeçalho/rodapé",
        desc: "Adicionar os botões 'vai para o fim' no ínicio e 'vai para o ínicio' no fim"
    },
    fitheight: {
        name: "Ajustar altura",
        desc: "Ajustar altura dos artigos para se ajustarem com a altura do ecrã (para artigos grandes)"
    },
    closeentry: {
        name: "Fechar entrada",
        desc: "Adicionar um botão 'fechar' para cada entrada, para a remover"
    },
    openbackground: {
        name: "Abrir em plano de fundo",
        desc: "Adicionar um botão 'abrir em plano de fundo' para cada entrada"
    },
    replacer: {
        name: "Substituidor",
        desc: "Substitui a entrada com uma parte original da página. Isto é utilizado em tiras de banda de desenhada.<br/>Um obrigado a jolan78 pela ideia original e o script."
    },
    aero: {
        name: "Google Aero Toolbar",
        desc: "Utilizar o barra de ferramentas Aero"
    },
    info: {
        name: "SysInfo",
        desc: "Informação do Systema"
    },
    extshortcuts: {
        name: "Atalhos",
        desc: "Atalhos do teclado"
    },
    pack: {
        name: "Pacotes",
        desc: "Pacotes de configuração predefinidos"
    },
    thanks: {
        name: "Obrigado",
        desc: ""
    },
    about: {
        name: "Acerca",
        desc: "Acerca de ReaderPlus"
    }
};
GRP.langs[locale].skins = {
    none: {
        name: "None"
    },
    air: {
        name: "Air Skin"
    },
    aircomic: {
        name: "Air Skin Comic Sans"
    },
    black: {
        name: "Google Enhanced Black"
    },
    dark: {
        name: "Dark Skin"
    },
    darkgray: {
        name: "Dark Gray Skin"
    },
    helvetireader: {
        name: "Helvetireader Skin"
    },
    minimal: {
        name: "Minimalistic Skin"
    },
    optimized: {
        name: "Optimized Skin"
    },
    portal: {
        name: "Portal Theme"
    },
    player: {
        name: "Player Theme"
    },
    osxblue: {
        name: "Mac OS X Snow Leopard - Blue"
    },
    osxblack: {
        name: "Mac OS X Snow Leopard - Black"
    },
        calibri: {
        name: "Calibri Skin"
    },
    glassblackgold: {
        name: "Glass Black Gold Skin"
    },
    simpleclean: {
        name: "Simple and Clean"
    },
    peacockfeather: {
        name: "Peacock Feather"
    },
    myowngooglereader: {
        name: "My Own Google Reader"
    },
    compactcleantweaked: {
        name: "Compact, Clean & Tweaked"
    },
    absolutelycompact: {
        name: "Absolutely Compact"
    },
    darkshinyblue: {
        name: "Dark Shiny Blue"
    },
        persian: {
        name: "Optimized Persian"
    }
};