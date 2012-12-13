var d = new Date();

hlDebug = {};
hlDebug.applyRules = function(){
    if (debug == 1 || debug == 2 || debug == 4) {
        $("input, a, li, div, span").bind("click", function(){
            d = new Date();
        });
    }
    return;
};

Holyavenger.addEvent({
    name: "hlDebug.applyRules",
    onLoad: hlDebug.applyRules
});
