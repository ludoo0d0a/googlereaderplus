/**
 * @author Valente
 */
var igrp = 
{
    scripts: [
    {
        id: "skins",
        name: "Theme",
        desc: "Change the look of GoogleReader"
    }, 
    {
        id: "favicons",
        name: "Favicons",
        desc: "Display favicons for every feed"
    }, 
    {
        id: "unreadcount",
        name: "Show all unread count",
        desc: "Show all feeds unread count"
    }, 
    /*{
        id: "fixwidth",
        name: "Fix width of text entry",
        desc: "Display text using full width"
    }, 
    {
        id: "fixenclosures",
        name: "Fix missing enclosures",
        desc: "Show non displaying pictures in enclosures links"
    }, */
	{
        id: "fixlayout",
        name: "Fix layout",
        desc: "Fix different layout bugs style"
    },
    {
        id: "count",
        name: "Fix counter (1000+)",
        desc: "Display real unread count"
    }, 
    {
        id: "counticon",
        name: "Icon counter",
        desc: "Dislay unread count in the Google Reader favicon"
    }, 
    {
        id: "removeads",
        name: "Remove ads",
        desc: "Simple advertising blocker"
    }, 
    {
        id: "column",
        name: "Text multi columns",
        desc: "Add abutton to display news as a newspaper in multi columns",
        //shortcut: "c",
        shortcuts: [
        {
            id: 'columns',
            title: 'Multi columns',
            key: 
            {
                keyCode: 67
            }
        }]
    }, 
    {
        id: "preview",
        name: "Integrated preview",
        desc: "Add a button to show entire original page instead the entry",
        //shortcut: "Shift+R",
        shortcuts: [
        {
            id: 'prview',
            title: 'Entry preview',
            key: 
            {
                keyCode: 81
            }
        }]
    }, 
    {
        id: "colorful",
        name: "Colorful listview",
        desc: "Use a background color for a same feed"
    }, 
    {
        id: "filter",
        name: "Filter entries",
        desc: "Filter entries by removing or highligting items based on user terms"
    }, 
    {
        id: "readbymouse",
        name: "Read by mouse",
        desc: "Middle click not available on Windows",
        desc: "Next/previous item using right/left mouse click"
    }, 
    {
        id: "facebook",
        name: "Facebook integration",
        desc: "Add a button to share news using Facebook",
        //shortcut: "b",
        shortcuts: [
        {
            id: 'gofacebook',
            title: 'Post on Facebook',
            key: 
            {
                keyCode: 66
            }
        }]
    }, 
    {
        id: "twitter",
        name: "Twitter integration",
        desc: "Add a button to share news using Twitter",
        //shortcut: "d",
        shortcuts: [
        {
            id: 'tweet',
            title: 'Post on Twitter',
            key: 
            {
                keyCode: 68
            }
        }]
    }, 
    {
        id: "mark",
        name: "Mark As Read",
        desc: "Mark items before/after current as read",
        //shortcut: "before: w ; after: x",
        shortcuts: [
        {
            id: 'markprev',
            title: 'Mark items before As Read',
            key: 
            {
                keyCode: 87
            }
        }, 
        {
            id: 'marknext',
            title: 'Mark items after As Read',
            key: 
            {
                keyCode: 75
            }
        }]
    }, 
    {
        id: "jump",
        name: "Add top/bottom links",
        desc: "Add a 'goto bottom' icon on top entry and a 'goto top' on bottom entry",
        //shortcut: "Shift+T: goto top ; Shift+B : goto bottom",
        shortcuts: [
        {
            id: 'goup',
            title: 'Goto top',
            key: 
            {
                keyCode: 84
            }
        }, 
        {
            id: 'godown',
            title: 'Goto bottom',
            key: 
            {
                keyCode: 66
            }
        }]
    }, 
    {
        id: "fitheight",
        name: "Fit height",
        desc: "Fit height of the current news to the screen height (for long articles)",
        //shortcut: "f : fit height",
        shortcuts: [
        {
            id: 'fit',
            title: 'Fit height',
            key: 
            {
                keyCode: 70
            }
        }]
    }, 
    {
        id: "closeentry",
        name: "Close entry",
        desc: "Add a 'close' button on each entry to remove it",
        //shortcut: "x",
        shortcuts: [
        {
            id: 'close',
            title: 'Close entry',
            key: 
            {
                keyCode: 88
            }
        }]
    
    }, 
    {
        id: "openbackground",
        name: "Open in background",
        desc: "Add a 'open in background' button on each entry",
        //shortcut: "Shift + V : open in background tab",
        shortcuts: [
        {
            id: 'openback',
            title: 'Open in background tab',
            key: 
            {
                shiftKey: true,
                keyCode: 86
            }
        }]
    }, 
    {
        id: "aero",
        name: "Google Aero Toolbar",
        desc: "Toolbar using Aero theme"
    }, 
    {
        id: "info",
        name: "SysInfo",
        desc: "System information",
        link: true
    }, 
    {
        id: "thanks",
        name: "Thanks",
        desc: "",
        link: true
    
    }, 
    /*{
     id: "readershortcuts",
     name: "Keyboard shortcuts",
     desc: "Original keyboard shortcuts",
     url: 'http://www.google.com/support/reader/bin/answer.py?hl=en&answer=69973',
     link: true
     }, */
    {
        id: "extshortcuts",
        name: "Extension shortcuts",
        desc: "Extension keyboard shortcuts",
        link: true
    }, 
    {
        id: "about",
        name: "About",
        desc: "About GoogleReaderPlus",
        url: 'about.html',
        link: true
    
    }],
    
    skins: [
    {
        id: "none",
        name: "None"
    }, 
    {
        id: "air",
        name: "Air Skin"
    }, 
    {
        id: "aircomic",
        name: "Air Skin Comic Sans"
    }, 
    {
        id: "black",
        name: "Google Enhanced Black"
    }, 
    {
        id: "dark",
        name: "Dark Skin"
    }, 
    {
        id: "darkgray",
        name: "Dark Gray Skin"
    }, 
    {
        id: "helvetireader",
        name: "Helvetireader Skin"
    }, 
    {
        id: "minimal",
        name: "Minimalistic Skin"
    }, 
    {
        id: "optimized",
        name: "Optimized Skin"
    }, 
    {
        id: "osxblue",
        name: "Mac OS X Snow Leopard - Blue"
    }, 
    {
        id: 'osxblack',
        name: "Mac OS X Snow Leopard - Black"
    }]
};
