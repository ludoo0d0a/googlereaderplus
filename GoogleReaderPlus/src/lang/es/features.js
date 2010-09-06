/**
 * ReaderPlus
 * Translation for features
 *
 * **************************
 * es : Español
 * **************************
 *
 * For translators : please keep major version or original for your translations !
 * Use minor version for yours translations
 * so that 0.3.11 is the 11th translated version of the original v0.3 english version.
 *
 *
 * Version : 1.4.2
 * Date : 09-06-2010
 * @author jesalgadom
 */
var locale = 'es';
namespace('GRP.langs.' + locale);
GRP.langs[locale].categories = {
        main: 'Principal',
        theme: 'Temas',
        icons:'Íconos',
        counter:'Contador',
        layout: 'Configuración de página',
        navigation: 'Navegación',
        share: 'Compartir',
        action: 'Acción',
        content: 'Contenido'
};
GRP.langs[locale].scripts = {
    general: {
        name: "General",
        desc: "Configuración general"
    },
    theme: {
        name: "Tema",
        desc: "Cambiar el tema de GoogleReader"
    },
    ig: {
        name: "Temas de iGoogle",
        desc: "Usar los <a href='http://www.google.com/ig/directory?type=themes' target='blank'>temas de iGoogle</a> en Google Reader (Beta)"
        },
    relook: {
        name: "Relook",
        desc: "Cambiar apariencia con hojas de estilo personalizadas"
    },
    favicons: {
        name: "Favicons",
        desc: "Mostrar favicons para cada flujo"
    },
    unreadcount: {
        name: "Mostrar contadores de elementos no leídos",
        desc: "Mostrar contadores de elementos no leídos en todos los flujos"
    },
    fixlayout: {
        name: "Corregir opciones de página",
        desc: "Corregir diferentes fallas de estilo en la página como el ancho de las entradas, las imágenes faltantes y la visualización de grandes imágenes"
    },
    count: {
        name: "Corregir contador (1000+)",
        desc: "Mostrar el número real de elementos no leídos"
    },
    counticon: {
        name: "Favicon contador",
        desc: "Mostrar número de elementos no leídos en el favicon de Google Reader"
    },
    removeads: {
        name: "Eliminar anuncios publicitarios",
        desc: "Bloquear algunos anuncios comunes"
    },
    column: {
        name: "Texto en varias columnas",
        desc: "Mostrar artículos en columnas (como en un periódico)"
    },
    preview: {
        name: "Vista previa integrada",
        desc: "Muestra el contenido original de la página en vez del resumen"
    },
    colorful: {
        name: "Colorear vista Lista",
        desc: "Usar un color distinto para cada flujo"
    },
    filter: {
        name: "Filtrar elementos",
        desc: "Filtrar artículos ocultándolos o destacándolos según términos definidos por el usuario"
    },
        limit: {
        name: "Limitar artículos",
        desc: "Limitar número de artículos en una página. Los elementos leídos se eliminan."
    },
        prefetch: {
        name: "Predescargar más",
        desc: "Descargar más entradas al mismo tiempo para una navegación más fluida"
    },
        nested: {
        name: "Carpetas anidadas",
        desc: "Carpetas en varios niveles"
    },
    readbymouse: {
        name: "Leer con el ratón",
        desc: "Ir adelante o atrás con los botones izquierdo y derecho del ratón"
    },
    facebook: {
        name: "Facebook",
        desc: "Añadir un botón para compartir noticias en Facebook"
    },
    twitter: {
        name: "Twitter",
        desc: "Añadir un botón para compartir noticias en Twitter"
    },
    instapaper: {
        name: "Instapaper",
        desc: "Añadir un botón para leer las noticias después con Instapaper"
    },
        readitlater: {
        name: "ReadItLater",
        desc: "Añadir un botón para leer las noticias después con ReadItLater"
    },
    mark: {
        name: "Marcar como leído",
        desc: "Marcar el elemento anterior o posterior al actual como leído"
    },
    jump: {
        name: "Añadir enlaces para ir arriba o abajo",
        desc: "Añadir un ícono 'ir abajo' en la parte superior de la entrada y uno 'ir arriba' en la parte inferior"
    },
    fitheight: {
        name: "Adaptar alto",
        desc: "Adaptar alto de la entrada actual según el alto de la pantalla (para artículos largos)"
    },
    closeentry: {
        name: "Cerrar entrada",
        desc: "Añadir un botón 'cerrar' en cada entrada para eliminarla"
    },
    openbackground: {
        name: "Abrir en segundo plano",
        desc: "Añadir un botón 'abrir en segundo plano' en cada entrada"
    },
    replacer: {
        name: "Remplazar",
        desc: "Remplazar la entrada con una parte de la página original. Actualmente se usa para obtener cómics.<br/>Gracias a jolan78 por su idea y su script."
    },
    aero: {
        name: "Barra de herramientas Aero",
        desc: "Barra de herrammientas con el tema de Google Aero"
    },
    info: {
        name: "SysInfo",
        desc: "Información del sistema"
    },
    extshortcuts: {
        name: "Combinaciones de teclas",
        desc: "Combinaciones de teclas"
    },
    pack: {
        name: "Opciones predefinidas",
        desc: "Distintas configuraciones predefinidas"
    },
    thanks: {
        name: "Gracias",
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