/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * es : Español
 * **************************
 *
 * Version : 1.6
 * Date : 09-06-2010
 * @author jesalgadom
 */
var locale = 'es';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    version: "version",
    closeentry: {
        text: 'Cerrar este elemento',
        keyword: 'Cerrar'
    },
    column: {
        text: 'Visualización en varias columnas',
        keyword: 'Columnas',
        summary: 'Agregar/editar',
        desc: 'Administrar columnas'
    },
    facebook: {
        text: 'Compartir esta noticia en Facebook',
        keyword: 'Facebook'
    },
    twitter: {
        text: 'Compartir esta noticia en Twitter',
        keyword: 'Twitter',
        plslogin: 'Iniciar sesión en Twitter',
        toolong: "¡Mensaje demasiado largo!",
        notetoolong: "<b>Mensaje adjunto a la noticia:</b> (Opcional, quedan {0} caracteres)",
        notemax: "<b>Mensaje adjunto a la noticia:</b> (Opcional, máximo 140 caracteres)",
        text_title: 'Título',
        text_tag: 'Etiqueta',
        text_url: 'URL',
        text_send: 'Enviar',
        text_count: 'Contar',
        text_cancel: 'Cancelar',
        text_shortener: 'URL corta',
        shortfailed: "Verificar URL corta, conexión imposible\n\r{0}"
    },
    readit: {
        password: 'Contraseña (si tiene):',
        wronglogin: 'Nombre de usuario o contraseña erróneos',
        nologin: 'Esta característica necesita un nombre de usuario, configurar en preferencias',
        error: 'Se ha producido un error, vuélvalo a intentar luego',
        badrequest: 'Consulta incorrecta, tal vez falte un parámetro, como la URL',
        saving: 'Guardar',
        shortcut_readitlater: 'Leer luego con Instapaper'
    },
    instapaper: {
        text: 'Leer luego con Instapaper',
        keyword: 'Instapaper',
        plslogin: 'Iniciar sesión en Instapaper',
        login: 'Email o nombre de usuario:'
    },
    readitlater: {
        text: 'Leer luego con ReadItLater',
        keyword: 'ReadItLater',
        plslogin: 'Iniciar sesión en ReadItLater',
        rateexceeded: 'Límite de tráfico excedido, espere un poco antes de volver a intentarlo',
        maintenance: 'El servidor de sincronización de Read It Later se encuentra en mantenimiento'
    },
    favicons: {
        preferences: 'Preferencias',
        getfavicon: 'Obtener el ícono de esta página (favicon)',
        notfoundicon: 'No se puede obtener favicon para "{0}"',
        summary: 'Agregar/editar',
        desc: 'Administrar favicons'
    },
    filter: {
        settings: 'Configuración de filtros',
        excludes: 'Bloqueados',
        highlights: 'Destacados',
        highlight: 'Destacar',
        exclude: 'Bloquear',
        hideduplicates: 'Ocultar elementos duplicados',
        hideexcludes: 'Ocultar elementos bloqueados',
        preferehighlights: 'Preferir destacados',
        update: 'Actualizar',
        quickadd: 'Agregar rápidamente',
        add: 'Agregar',
        close: 'Cerrar',
        edit: 'Editar',
        remove: 'Eliminar'
    },
    fitheight: {
        text: 'Adaptar el alto',
        keyword: 'Adaptar el alto'
    },
    jump: {
        textbottom: 'Ir abajo',
        texttop: 'Ir arriba',
        keywordtop: 'arriba'
    },
    openbackground: {
        text: 'Abrir en segundo plano',
        keyword: 'Abrir'
    },
    preview: {
        text: 'Vista previa de la noticia',
        title: 'Ver vista previa de la noticia',
        opennewtab: 'Abrir en nueva ventana',
        keyword: 'Ver vista previa',
        overlay_next: 'Siguiente',
        overlay_previous: 'Anterior',
        overlay_close: 'Cerrar',
        overlay_category: 'Categoría'
    },
    readbymouse: {
        middleclick: 'Clic central',
        openintab: 'Abrir en nueva pestaña',
        openinbacktab: 'Abrir en nueva pestaña en segundo plano',
        shares: 'Compartir',
        stars: 'Seguir',
        tag: 'Etiqueta',
        addtag: 'Agregar etiqueta',
        on: 'Activar ReadByMouse',
        off: 'Desactivar ReadByMouse'
    },
    replacer: {
        nomatch: 'No se han encontrado resultados',
        loading: 'Cargando...'
    },
    lightbox: {
        text: 'Light on the media',
        keyword: 'Light'
    },
    ig: {
        menu_prefs: 'Reader+ preferencias',
        menu_theme: 'Reader+ tema',
        menu_randomtheme: 'Cambiar tema:'
    },
    menu: {
        label: 'Extra',
        showallfolders: 'Mostrar todas las carpetas'
    }
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus",
        "val-save": "Guardar",
        alreadyexist: "Este elemento ya existe",
        snew: '¡Nuevo!',
        supdated: '¡Actualizado!',
        prefssaved: "Se han guardado las preferencias",
        cachecleared: "Se ha borrado el caché",
        expandall: 'Ver todo'
    },
    theme: {
        noborder: "Eliminar márgenes para ganar espacio de visualización",
        mytheme: 'Usar <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">una imagen de fondo</a> y colores personalizados con el tema "MyTheme" (<a href="http://code.google.com/p/googlereaderplus/wiki/Themes" target="blank">Ver vista previa</a>)',
        /*url: 'URL de la imagen',*/
        color: 'Color del texto',
        bg: 'Color del fondo',
        /*repeat: 'Tiled Picture ',*/
        externaltheme: 'Tema Google/Gmail',
        imgrbg: 'Fondo repetido',
        imgsbg: 'Fondo',
        imgrh: 'Encabezado repetido',
        imgh: 'Encabezado',
        imghr: 'Encabezado derecho',
        imghl: 'Encabezado izquierdo',
        imgrf: 'Pie de página repetido',
        imgf: 'Pie de página',
        imgfr: 'Pie de página derecho',
        imgfl: 'Pie de página izquierdo'
    },
    ig: {
        warning: 'Puede que algunos temas no se visualicen correctamente. Esta característica se encuentra en desarrollo.',
        skin_name: 'Nombre del tema iGoogle',
        skin_url: 'URL del tema iGoogle',
        debug: 'Debug mode (For debugging only)',
        randomtime: 'Dynamic theme toggles randomly instead time control',
        userandomthemes: 'El tema se cambia de manera aleatoria automáticamente',
        randomthemes: 'Cambiar tema cada (min.)',
        add: 'Agregar ahora',
        next: 'Siguiente',
        previous: 'Anterior',
        random: 'Aleatorio',
        search: 'Buscar temas'
    },
    about: {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>Gracias...</h1>' +
        '<p>... por haber instalado (o actualizado) la última versión de <strong>Reader Plus</strong>.</p>' +
        '<p>Asegúrese de haber configurado las <a href="preferences.html" title="Ir a opciones"><strong>opciones</strong></a> de la extensión.</p>' +
        '<p><a href="https://chrome.google.com/extensions/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Ir a la página de la extensión"><strong>Ir a la galería de extensiones de Google Chrome</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Seguir en Twitter"/></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>Si le gusta esta extensión y quiere nuevas características, no dude en decírmelo.</p>' +
        '<p>También puede hacer una donación, de manera que pueda comprarme un cargamento de café que me mantenga despierto mientras escribo todo el código :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
        whatsnew: '<td><h2>¿Qué hay de nuevo?</h2><ul><li>Nuevos temas</li><li>o imágenes de fondo personalizadas con el nuevo tema "MyTheme"</li><li>o temas aleatorios de <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a> </li><li>Vista previa de los artículos en pantalla completa con lightbox</li><li>Compartir artículos con  <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li><li>Ver el panel de acciones en una ventana flotante (pestaña general)</li><li>Traducción de los artículos</li></ul></td>',
        nopopup: '<p>Si no quiere avisos sobre las nuevas versiones, marque la opción "No avisar sobre actualizaciones" en la sección <a href="preferences.html#general">General</a>.</p>'
    },
    link: {
        reader: "<span>Google Reader</span>Mi lector de RSS",
        issues: "<span>Soporte</span>¿Algún problema o sugerencia?",
        download: "<span>Descargar</span>La galería de Google Chrome",
        about: "<span>Acerca</span>Acerca de, agradecimientos...",
        site: "<span>Web</span>Mi página personal",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Mantente al tanto",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>¡Invítame a un café!</a>',
        translate: '<span>Traducción</span>Ayúdame a traducir</a>'
    },
    column: {
        count: "Número de columnas",
        locked: "Opción siempre activa, excepto en:",
        pagebreak: "Dividir artículos largos para que se puedan leer por páginas como en un periódico.",
                miniparas: "Número mínimo de párrafos antes de dividir en columnas",
        entersite: "Introduzca la URL de su página"
    },
    translate: {
        lang: "Traducir contenido a ",
        locked: "Siempre activo, excepto en:",
        include: "Sólo incluir los siguientes flujos:",
        entersite: "Introduzca la URL de su página"
    },
    twitter: {
        shortener: "URL corta",
        shortener_bitly: "Configuración de BitLy (opcional):",
        shortener_login: "Nombre de usuario",
        shortener_apikey: "Código ApiKey",
        shortener_pwd: "Contraseña"
    },
    instapaper: {
        auth: "Inicio de sesión en <a href='http://www.instapaper.com' target='blank'>Instapaper</a>:",
        username: "Nombre de usuario:",
        password: "Contraseña (opcional):"
    },
    readitlater: {
        auth: "<a href='http://readitlaterlist.com/signup' target='blank'>Inicio de sesión</a> en <a href='http://www.readitlaterlist.com' target='blank'>ReadItLater</a> (obligatorio):",
        username: "Nombre de usuario:",
        password: "Contraseña:"
    },
    colorful: {
        tree: "Colorear los títulos en el panel de navegación de la izquierda",
                usebasecolor: "Usar los colores siguientes:",
                background: "Color de fondo",
                color:"Color del texto"
    },
    general: {
        counter: "Mostrar el contador en la barra de herramientas",
counterinterval: "Actualizar el contador cada (min)",
        pageicon: 'Activar ícono en la barra de direcciones (muestra un menú al pinchar)',
        stats: 'Autorizar el envío anónimo de datos estadísticos (para mejorar el soporte)',
        bottomup: "Poner la barra 'Anterior/Siguiente' en la parte superior de la pantalla",
        opendirect: "Pinchar el botón de la barra de herramientas para abrir GoogleReader",
        secure: "Usar siempre el protocolo seguro (https)",
        topcurrent: "Abrir artículos siempre en la parte superior de la pantalla",
        floatactions: "El panel de acciones se muestra en una ventana flotante",
        noupdatepopup: "No mostrar avisos sobre actualizaciones",
        icontoolbar_add: "Para añadir el botón a la barra de herramientras, <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">descargar e instalar</a>.",
        icontoolbar_text: "<span>Para que el uso del botón sea opcional, lo ofrecemos como una extensión independiente que debe instalarse aparte de Readerplus.</span>                                    <br>                                    <span>Para añadir el botón, clic en <b>Instalar</b> en la página <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">botón para Readerplus</a>.</span><br><span>Para desactivar el botón, dé clic derecho sobre él y elija Desactivar.</span>",
        importexport_text: "Puede guardar sus preferencias con la función 'export' y recargarlas luego con 'import', pero asegúrese de la validez del formato <a href='http://jsonformatter.curiousconcept.com/' target='blank'>JSON</a>:",
        confirmimport: "¿Está seguro de querer importar esta configuración?\n¡La configuración actual se perderá!",
        text_layout: 'Configuración de página',
        text_private: 'Datos privados y actualizaciones',
        text_toolbaricon: 'Ícono de la barra de herramientas',
        text_pageicon: 'Ícono de la barra de direcciones',
        text_export: 'Exportar/importar',
currdir: 'Destacar la carpeta del elemento seleccionado <span class="new">¡Nuevo!</span>',
icons: 'Íconos solamente en los botones de la barra acciones (excepto checkbox) <span class="new">¡Nuevo!</span>'
    },
limit: {
slidewindow: "Slidewindow - Limitar número de entradas",
mini: "Mínimo de elementos",
maxi: "Máximo de elementos"
},
prefetch: {
first: "Número inicial de elementos cargados en la vista Texto completo.",
next: "Número de elementos cargados después de un scroll en la vista Texto completo. ",
list: "Número inicial de elementos cargados en la vista Lista."
},
nested: {
separator: "Separador para añadir niveles adicionales (ejemplo: Deportes:Fútbol)."
},
    removeads: {
        links: "Filtrar enlaces:",
        images: "Filtrar imágenes:",
        iframes: "Filtrar iFrames:"
    },
    preview: {
        onicon: "Mostrar vista previa con un ícono después del título (si no se selecciona, la vista previa aparece al dar clic en el título)",
        locked: "Opción siempre activa, excepto en los siguientes flujos:",
        overlay: 'Vista previa a pantalla completa (Lightbox)'
    },
    fitheight: {
        locked: "Opción siempre activa, excepto en los siguientes flujos:"
    },
    filter: {
        searchbody: "Buscar en el título y el cuerpo del texto",
        highlights: 'Lista de destacados (uno por línea)',
        excludes: 'Lista de bloqueados (uno por línea)'
    },
    favicons: {
        providerpageicons: 'Usar el proveedor de íconos <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> para visualizar correctamente los íconos de página (recomendado)',
        sidebaronly: "Mostrar favicons sólo en la barra lateral",
        cloud: 'Usar favicons de la comunidad en línea <a href="http://wedata.net/databases/Favicons" target="blank">wedata/Favicons</a>',
        custom: "Use sus propios favicons:",
        add: "Añadir",
        tip: "Consejo: puede añadir fácilmente favicons usando el menú contextual \"Obtener favicon\" de cada web en la barra lateral",
        manual: "Favicons manuales para todas las páginas (no se recomienda puesto que es relativamente lento)",
        parsing: "Tratar de detectar favicons recorriendo la página principal de cada web",
        entersite: "URL del sitio",
        prompticon: "URL del ícono (vacío para detectar automáticamente):"
    },
    replacer: {
        intro: '<a href="http://code.google.com/p/googlereaderplus/wiki/ReplacerHowto" target="blank">Ayuda sobre cómo usar replacer</a>',
        cloud: 'Usar expresiones de la base en línea <a href="http://wedata.net/databases/LDRFullFeed/items" target="blank">wedata/LDRFullFeed</a> y <a href="http://wedata.net/databases/Replacer/items" target="blank">wedata/Replacer</a>',
        link: "Enlazar Regex",
        from: "Buscar regex/xpath/css",
        to: "Remplazar con",
        prompttitle: "Nombre del filtro"
    },
    lightbox: {
        locked: "Opción siempre activa, excepto en los siguientes flujos:"
    },
    relook: {
        css: "Hoja de estilos CSS",
        resize: "Usar evento 'resize' para pasar a pantalla completa"
    },
    pack: {
        mini: "<span>Opciones mínimas</span>Lo mínimo para mejorar la lectura",
        ludoo: "<span>Opciones LudoO</span>Las mejores características en sólo un clic",
        full: "<span>Opciones completas</span>Activar todas las características",
        reset: "<span>Borrar todo</span>Reiniciar configuración",
        confirmdel: "Esto borrará y reiniciará toda la configuración. ¿Está seguro?"
    },
    extshortcuts: {
        custom: "Sus propias combinaciones de teclas",
        official: "Combinaciones de teclas oficiales de Google Reader",
        alreadyusedprefs: "Ya está en sus preferencias",
        alreadyusedgoogle: "Ya está en las combinaciones oficiales"
    },
    thanks: {
        donators: "Gracias a los que, con sus donaciones, han contribuido en este proyecto",
        translators: "Gracias a los valientes traductores por su excelente trabajo",
        authors: "Gracias a los autores de los scripts y temas originales (Greasemonkey y Stylish)"
    }
};