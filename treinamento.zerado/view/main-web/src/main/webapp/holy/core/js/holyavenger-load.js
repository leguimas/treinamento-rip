/* Holyavenger.loader */
Holyavenger.load = {};
Holyavenger.load.scripts = new Array();
Holyavenger.load.scripts.ie6 = new Array();
Holyavenger.load.flag = true;

Holyavenger.load.design = function LDloading(){
    $("body").css("padding", "0");
    $("body").css("margin", "0");
    $("#hlLoad").html("<p>Carregando aplica&ccedil;&atilde;o...</p><div><div></div></div>");
    $("#hlLoad").css("padding", "10px");
	$("#hlLoad").css("width", "98.3%");
	$("#hlLoad").css("height", "97.5%");
	$("#hlLoad").css("background", "#FFF");
    $("#hlLoad").css("margin", "0");
    $("#hlLoad").css("position", "absolute");
    $("#hlLoad").css("z-index", "1000");
    $("#hlLoad div").css("padding", "0");
    $("#hlLoad div").css("margin", "6px 0 0");
    $("#hlLoad div").css("width", "300px");
    $("#hlLoad div").css("height", "5px");
    $("#hlLoad div").css("background", "#fff");
    $("#hlLoad div").css("border", "1px solid #699");
    $("#hlLoad div").css("line-height", "0");
    $("#hlLoad div").css("font-size", "0");
    $("#hlLoad div div").css("padding", "0");
    $("#hlLoad div div").css("margin", "0");
    $("#hlLoad div div").css("width", "0");
    $("#hlLoad div div").css("background", "#9cc");
    $("#hlLoad div div").css("border", "none");
    $("#hlLoad div div").css("font-size", "0");
    $("#hlLoad div div").css("line-height", "0");
    $("#hlLoad p").css("font-family", "Trebuchet MS, Arial, verdana");
    $("#hlLoad p").css("font-size", "14px");
    $("#hlLoad p").css("color", "#333");
    $("#hlLoad p").css("font-weight", "bold");
    $("#hlLoad p").css("padding", "0");
    $("#hlLoad p").css("margin", "0");
    $("#hlLoad span").css("font-family", "arial, verdana");
    $("#hlLoad span").css("font-size", "9px");
    return false;
};

Holyavenger.load.turnoff = function(){
    $("#wrap").css("display", "block");
    $("#hlLoad").css("display", "none");
    Holyavenger.Loading.Popup.showPopup = true;
};

Holyavenger.load.include = function(files, index, encoding){
    if (index == 0) {
        files = Holyavenger.load.include.sort(files);
    };
    
    //monta a barra de progresso
    if (Holyavenger.load.flag) {
        Holyavenger.load.flag = Holyavenger.load.design();
    }
    var cw = $("#hlLoad div").css("width").match(/[0-9]*/)[0];
    var wd = Math.floor(cw / files.length * index);
    // mostra a barra de progresso
    $("#hlLoad div div").css("width", wd + 'px');
    
    var encoding = (encoding == null) ? "utf-8" : encoding;
    var dstr = (BrowserDetect.browser == "Firefox" || debug == 3) ? '' : '?' + Math.random(0, 1000) + '=' + Math.random(0, 1000);
    if (files.length > index) {
		if (files[index].indexOf(".js") != -1) {
            if (BrowserDetect.browser == "Explorer") {
                Holyavenger.load.include.jsIE(files[index] + dstr, encoding);
            }
            else {
                Holyavenger.load.include.js(files[index] + dstr, encoding);
            }
        }
        else {
            var insert = true;
            if (files[index].indexOf("msie") != -1 || files[index].indexOf("webkit") != -1) {
                insert = false;
                if (files[index].indexOf("msie") != -1 && BrowserDetect.browser == "Explorer") {
                    if (BrowserDetect.version == 6 && files[index].indexOf(7) != -1) {
                        insert = true;
                    }
                    if (files[index].indexOf(BrowserDetect.version) != -1) {
                        insert = true;
                    }
                }
                if (files[index].indexOf("webkit") != -1 &&
                (BrowserDetect.browser == "Chrome" || BrowserDetect.browser == "Safari")) {
                    insert = true;
                }
            }
            if (insert) {
                Holyavenger.load.include.css(files[index], dstr);
            }
        }
        Holyavenger.load.include(files, ++index, encoding);
    }
    else {
         if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6) {
            Holyavenger.load.include.css.ie6();
        }
    }
};
Holyavenger.load.include.sort = function(files, index){
    var jsF = [];
    var csF = [];
    for (var i = 0; i < files.length; i++) {
        if (/\.js/i.test(files[i])) {
            jsF.push(files[i]);
        }
        else {
            csF.push(files[i]);
        }
    }
    return csF.concat(jsF);
};

Holyavenger.load.include.js = function(file, encoding){
    var html = document.getElementsByTagName('head').item(0);
    var obj = document.createElement('script');
    obj.setAttribute('type', 'text/javascript');
    obj.setAttribute('charset', encoding);
    obj.setAttribute('src', file);
    html.appendChild(obj);
    html = obj = null;
};

Holyavenger.load.include.jsIE = function(file, encoding){
    var html = document.getElementsByTagName('head').item(0);
    var obj = document.createElement('script');
    obj.setAttribute('type', 'text/javascript');
    obj.setAttribute('charset', encoding);
    obj.setAttribute('src', file);
    html.appendChild(obj);
    obj.attachEvent('onreadystatechange', function(){
        if (obj.readyState == 'loaded' || obj.readyState == 'complete') {
            html = obj = null;
        }
    });
};

Holyavenger.load.include.css = function(file, dstr){
    if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6) {
        Holyavenger.load.scripts.ie6.push(file);
    }
    else {
        var html = document.getElementsByTagName('head').item(0);
        var obj = document.createElement('link');
        obj.setAttribute('rel', 'stylesheet');
        obj.setAttribute('type', 'text/css');
        obj.setAttribute('href', file + dstr);
        html.appendChild(obj);
        html = obj = null;
    }
};

Holyavenger.load.include.css.ie6 = function(){
    var counter = -1; 
    document.title = Holyavenger.load.scripts.ie6.length;
    for (var i = 0; i < Holyavenger.load.scripts.ie6.length; i++) {
        if (++counter < 25) {
            if (counter == 0) {
                var html = document.getElementsByTagName('head').item(0);
                var obj = document.createElement('style');
                obj.setAttribute('type', 'text/css');
                html.appendChild(obj);
            }
            // http://msdn.microsoft.com/en-us/library/ms531193(VS.85).aspx
            document.styleSheets[(document.styleSheets.length-1)].addImport(Holyavenger.load.scripts.ie6[i]);           
        }
        else {
            counter = -1;
            --i;
        }
    }
    html = obj = null;
};

hlLoad = function(scripts){
    Holyavenger.load.scripts.push(scripts);
};