jQuery.extend( jQuery.expr[':'],{
    hl: function(a) {
        try {
            return ( a.getAttribute('hl:onabort')     ||
            		 a.getAttribute('hl:onblur')      ||
            		 a.getAttribute('hl:onchange')    ||
            		 a.getAttribute('hl:onclick')     ||
            		 a.getAttribute('hl:ondbclick')   ||
            		 a.getAttribute('hl:onerror')     ||
            		 a.getAttribute('hl:onfocus')     ||
            		 a.getAttribute('hl:onkeydown')   ||
            		 a.getAttribute('hl:onkeypress')  ||
            		 a.getAttribute('hl:onkeyup')     ||
            		 a.getAttribute('hl:onload')      ||
            		 a.getAttribute('hl:onmousedown') ||
            		 a.getAttribute('hl:onmousemove') ||
            		 a.getAttribute('hl:onmouseout')  ||
            		 a.getAttribute('hl:onmouseover') ||
            		 a.getAttribute('hl:onmouseup')   ||
            		 a.getAttribute('hl:onreset')     ||
            		 a.getAttribute('hl:onresize')    ||
            		 a.getAttribute('hl:onselect')    ||
            		 a.getAttribute('hl:onsubmit')    ||
                     a.getAttribute('hl:unload'));           
        }catch(e){
           Holyavenger.Debug("<p>" + e.name + '= ' + e.value + "</p>");
           return false;
        }       
    }
});