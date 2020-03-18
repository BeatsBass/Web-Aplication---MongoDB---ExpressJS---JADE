$(document).ready(function() {
    	var sele = $('#cual')[0].value;
        var info = $('#rarara input[name=optionsRadios]');
        for (var i = 0; i < info.length; i++) {
            if(sele == i){
                info[i].checked = "hola";
            }
        }
});