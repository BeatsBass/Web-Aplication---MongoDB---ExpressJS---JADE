
var n = 0;
var n1 = 0;
/*if(okk == 0){
    $('#prupruevent').unbind('submit');
    $('#filtro1').trigger('click');
}*/
$(document).ready(function() {
    if($("#sineventos").length != 1){
        var options = {
          valueNames: [ 'name','born']
        };

        var userList = new List('users', options);
    }
    
    populateTable();
    $('#prupruevent input[name=group1]').on('click',evenNoti);
    $('#lalaf').on('click',masfec);
    $('#lalaf1').on('click',masfec1);

    $('#mosmas').on('click',masDocc);
    $('#unomasw').on('click',masDocc1);
    $('.atrras').on('click',hidd);
    $('.verebenw').on('click',verEv);
    $('.editpho').on('click',editPho);
    $('.adddi').on('click',addDi);
    $('#sett_user').on('click',sett_User);
    $('#edituser').on('click',editUser);
    $('#keyset').on('click',keySet);
    $('#imgset').on('click',imgSet);
    $('.orden_table').on('click',orden_table);
    //Modal create und update
        //create initial
        $('#agregarevent').on('click',nueEv);
        //update initial
        $('.evedi').on('click',evEdit);

    $('#prupruevent').on('submit',function(evt){
        evt.preventDefault();
        if($('#prupruevent input[name=group1]:checked')[0].value ==0){
            var hh = $("#prupruevent .valiz");
            var okk = 0;
            for (var i = 0; i < hh.length; i++) {
                if(hh[i].value == ""){
                    hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "red";
                    okk++;
                }
                else{
                    hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "#aaa";
                }
            }
            if(okk == 0){
                $('#alerta2').css("display",'none');
                /*$('#prupruevent').unbind('submit');
                $('#filtro1').trigger('click');
                setTimeout(function(){
                    $('#filtro1').trigger('click');
                },100);*/
            }
            else{
                $('#alerta2').css("display",'block');
            }
            if($("#imagen")[0].files.length == 0){
                $('#alerta3').css("display",'block');
                $('#conffo').attr('value','0');
            }
            else{
                $('#alerta3').css("display",'none');
                $('#conffo').attr('value','1');
            }


            if($("#adju").length == 0){
                $('#alerta4').css("display",'none');
                if(okk == 0){
                    $('#prupruevent').unbind('submit');
                    $('#filtro1').trigger('click');
                    setTimeout(function(){
                        $('#filtro1').trigger('click');
                    },100);
                }
            }
            else{
                console.log($("#adju"));
                if($("#adju")[0].files.length == 0)
                    $('#alerta4').css("display",'block');
                else{
                    $('#alerta4').css("display",'none');
                    if(okk == 0){
                        console.log('OK con adjunto');
                        $('#prupruevent').unbind('submit');
                        $('#filtro1').trigger('click');
                        setTimeout(function(){
                            $('#filtro1').trigger('click');
                        },100);
                    }
                }
            }
        }
        else{
            console.log($("#prupruevent input[name=titulo],#prupruevent textarea[name=descrii]"));
            var hh = $("#prupruevent input[name=titulo],#prupruevent textarea[name=descrii]");
            var okk = 0;
            var vamm = false;
            for (var i = 0; i < hh.length; i++) {
                if(hh[i].value == ""){
                    hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "red";
                    okk++;
                }
                else{
                    hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "#aaa";
                }
            }
            if(okk == 0){
                $('#alerta2').css("display",'none');
                //$('#prupruevent').unbind('submit');
                //$('#filtro1').trigger('click');
                //setTimeout(function(){
                    //$('#filtro1').trigger('click');
                //},100);
            }
            else{
                $('#alerta2').css("display",'block');
            }
            console.log($("#adju").length);
            if($("#adju").length == 0){
                $('#alerta4').css("display",'none');
                if(okk == 0){
                    $('#prupruevent').unbind('submit');
                    $('#filtro1').trigger('click');
                    setTimeout(function(){
                        $('#filtro1').trigger('click');
                    },100);
                }
            }
            else{
                console.log($("#adju"));
                if($("#adju")[0].files.length == 0)
                    $('#alerta4').css("display",'block');
                else{
                    $('#alerta4').css("display",'none');
                    if(okk == 0){
                        $('#prupruevent').unbind('submit');
                        $('#filtro1').trigger('click');
                        setTimeout(function(){
                            $('#filtro1').trigger('click');
                        },100);
                    }
                }
            }
        }
    });
    $('#editat').on('submit',function(evt){
        evt.preventDefault();
        var onlyeven = $('#editat .row');
        var arrayonly = onlyeven[0].childNodes;
        if(arrayonly[1].style.display == "block"){
            var hh = $("#editat .valiz");
            var okk = 0;
            for (var i = 0; i < hh.length; i++) {
                if(hh[i].value == ""){
                    hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "red";
                    okk++;
                }
                else{
                    hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "#aaa";
                }
            }
            console.log(okk);
            if(okk == 0){
                $('#alerta11').css("display",'none');
                setTimeout(function(){
                    $('#editat').unbind('submit');
                    $('#editevw').trigger('click');
                },100);
            }
            else
                $('#alerta11').css("display",'block');
        }
        else{
            var hh = $("#editat .valiz");
            var okk = 0;
            for (var i = 0; i < hh.length; i++) {
                if(hh[i].value == ""){
                    hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "red";
                    okk++;
                }
                else{
                    hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "#aaa";
                }
            }
            console.log(okk);
            if(okk == 0){
                $('#alerta11').css("display",'none');
                setTimeout(function(){
                    $('#editat').unbind('submit');
                    $('#editevw').trigger('click');
                },100);
            }
            else
                $('#alerta11').css("display",'block');
            
        }
    });
    $('#editfilew').on('submit',function(evt){
        evt.preventDefault();
        if($('#editfilew input[name=tipoqw]').attr('value')=='0'){
            console.log('evento');

            if($('#editfilew #photow').attr('name') == 'photo'){
                $('#editfilew input[name=confoto]').attr('value','1');
                if($('#editfilew input[name=conadjunto]').attr('value')=='0'){
                    var hayadjunto = $('#editfilew #adju0');
                    if(hayadjunto.length == 0){
                        $('#editfilew #alertadjw').css('display','none'); 
                        setTimeout(function(){
                            $('#editfilew').unbind('submit');
                            $('#filtrow').trigger('click');
                        },100);
                    }
                    else{
                        if(hayadjunto[0].files.length == 0){
                            $('#editfilew #alertadjw').css('display','block');  
                        }
                        else{
                            $('#editfilew #alertadjw').css('display','none');
                            setTimeout(function(){
                                $('#editfilew').unbind('submit');
                                $('#filtrow').trigger('click');
                            },100);
                        }
                    }
                }
                else{
                    setTimeout(function(){
                        $('#editfilew').unbind('submit');
                        $('#filtrow').trigger('click');
                    },100);

                }

            }
            else{
                $('#editfilew input[name=confoto]').attr('value','0');

                var hayadjunto = $('#editfilew #adju0');
                if($('#editfilew input[name=conadjunto]').attr('value')=='0'){
                    if(hayadjunto.length == 0){
                        $('#editfilew #alertadjw').css('display','none'); 
                        console.log('sin modificacion alguna');
                        $('#myModal3 .modal-header button').trigger('click');
                    }
                    else{
                        if(hayadjunto[0].files.length == 0){
                            $('#editfilew #alertadjw').css('display','block');  
                        }
                        else{
                            $('#editfilew #alertadjw').css('display','none');
                            setTimeout(function(){
                                $('#editfilew').unbind('submit');
                                $('#filtrow').trigger('click');
                            },100);
                        }
                    }
                }
                else{
                    if($('#editfilew #photow1').attr('name') == 'photo'){
                        setTimeout(function(){
                            $('#editfilew').unbind('submit');
                            $('#filtrow').trigger('click');
                        },100);
                    }
                    else{
                        console.log('Sin cambio');
                        $('#myModal3 .modal-header button').trigger('click');
                    }
                }
            }
        }
        else{
            $('#editfilew input[name=confoto]').attr('value','0');
            console.log('noti');
            if($('#editfilew input[name=conadjunto]').attr('value')=='0'){
                    var hayadjunto = $('#editfilew #adju0');
                    if(hayadjunto.length == 0){
                        $('#editfilew #alertadjw').css('display','none'); 
                        console.log('Sin modificacion');
                        $('#myModal3 .modal-header button').trigger('click');
                    }
                    else{
                        if(hayadjunto[0].files.length == 0){
                            $('#editfilew #alertadjw').css('display','block');  
                        }
                        else{
                            $('#editfilew #alertadjw').css('display','none');
                            setTimeout(function(){
                                $('#editfilew').unbind('submit');
                                $('#filtrow').trigger('click');
                            },100);
                        }
                    }
            }
            else{
                    if($('#editfilew #photow1').attr('name') == 'photo'){
                        setTimeout(function(){
                            $('#editfilew').unbind('submit');
                            $('#filtrow').trigger('click');
                        },100);
                    }
                    else{
                        console.log('Sin cambio');
                        $('#myModal3 .modal-header button').trigger('click');
                    }
            }

        }
        //console.log($('#editfilew input')[0].value);
    });

    $('#cambioqw').on('submit',function(evt){
        evt.preventDefault();
        console.log($('#cuslqw').attr('value'));
        var tipo = $('#cuslqw').attr('value');
        if(tipo == '0'){
            if($('#myModal5 #setimg').attr('name') == 'phot'){
                console.log('Sin Modificar');
            }
            else{
                var archivos = $('#myModal5 #setimg');
                if(archivos[0].files[0].type.split('/')[0] == 'image'){
                    setTimeout(function(){
                        $('#cambioqw').unbind('submit');
                        $('#filtroimgqw').trigger('click');
                    },100);
                }
                else{
                    console.log('con error');
                }
            }
        }
        else{
            if(tipo == "1"){
                var hh = $("#cambioqw .valiqw");
                console.log(hh);
                var okk = 0;
                for (var i = 0; i < hh.length; i++) {
                    if(hh[i].value == ""){
                        hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "red";
                        okk++;
                    }
                    else{
                        hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "#aaa";
                    }
                }
                console.log(okk);
                if(okk == 0){
                    $('#alertawer').css("display",'none');
                    setTimeout(function(){
                        $('#cambioqw').unbind('submit');
                        $('#filtroimgqw').trigger('click');
                    },100);
                }
                else
                    $('#alertawer').css("display",'block');
            }
            else{
                var hh = $("#cambioqw .valipassw");
                console.log(hh);
                var okk = 0;
                for (var i = 0; i < hh.length; i++) {
                    if(hh[i].value == ""){
                        hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "red";
                        okk++;
                    }
                    else{
                        hh[i].parentElement.getElementsByClassName('control-label')[0].style.color = "#aaa";
                    }
                }
                if(okk == 0){
                    $('#alertapass').css("display",'none');
                    var nuevap = hh[1].value; 
                    var repnue = hh[2].value; 
                    if(nuevap == repnue){
                        $('#alertapass').css("display",'none');
                        hh[1].parentElement.getElementsByClassName('control-label')[0].style.color = "#aaa";
                        hh[2].parentElement.getElementsByClassName('control-label')[0].style.color = "#aaa";
                        var contrAlt = $('#myModal5 input[name="contra"]');
                        var datos = contrAlt[0].value;
                        $.getJSON('/obtienepassw/'+datos,function(data){
                            if(data){
                                setTimeout(function(){
                                    $('#cambioqw').unbind('submit');
                                    $('#filtroimgqw').trigger('click');
                                },100);
                            }
                            else{
                                $('#alertapass').css("display",'block');
                                hh[0].parentElement.getElementsByClassName('control-label')[0].style.color = "red";
                                var erruuib = $('#alertapass');
                                erruuib[0].childNodes[1].innerText="Error, ponga la anterior contraseña";
                            }
                        });
                    }
                    else{
                        $('#alertapass').css("display",'block');
                        hh[1].parentElement.getElementsByClassName('control-label')[0].style.color = "red";
                        hh[2].parentElement.getElementsByClassName('control-label')[0].style.color = "red";
                        var erruuib = $('#alertapass');
                        erruuib[0].childNodes[1].innerText="Son diferentes";
                    }
                }
                else{
                    var erruuib = $('#alertapass');
                    
                    erruuib[0].childNodes[1].innerText="Complete el Formulario !!";
                    $('#alertapass').css("display",'block');
                }
            }
        }
    });
});


function orden_table() {
    var lis_clas = this.classList;
    if(lis_clas[2] == 'fa-caret-down'){
        var nuevo = "";
        for (var i = 0; i < lis_clas.length; i++) {
            if(i == 2){
                nuevo = nuevo + 'fa-caret-up'+' ';
            }
            else{
                if(i+1==lis_clas.length)
                    nuevo = nuevo + lis_clas[i];
                else
                    nuevo = nuevo + lis_clas[i]+' ';
            }
        }
        this.className = nuevo;
    }
    else{
        var nuevo = "";
        for (var i = 0; i < lis_clas.length; i++) {
            if(i == 2){
                nuevo = nuevo + 'fa-caret-down'+' ';
            }
            else{
                if(i+1==lis_clas.length)
                    nuevo = nuevo + lis_clas[i];
                else
                    nuevo = nuevo + lis_clas[i]+' ';
            }
        }
        this.className = nuevo;
    }
}
function sett_User() {
    var erruuib = $('#alertapass');
    erruuib[0].childNodes[1].innerText="Complete el Formulario !!";
    $('#myModal5 #setimg').attr('name','phot');
    $('#cuslqw').attr('value','-1');
    $('#myModal5 #cambioqw').css('display','none');
    $('#myModal5 #cardqw-info').css('display','block');
    $('#myModal5 #edituser i').removeClass('fa-arrow-left');
    $('#myModal5 #edituser i').addClass('fa-edit');
    $('#myModal5 .modal-dialog').addClass('modal-sm');
    $('#alertaimgg').css('display','none');
    $('#filtroimgqw').removeClass('sinaccion');
    $('#myModal5 #cambioqw #cbimgqw').attr('src',$('#myModal5 #imgset img').attr('src'));
    $('#myModal5 #imgtextqw').css('color','white');
}
function keySet() {
    $('#cuslqw').attr('value','2');
    $('#alertaimgg').css('display','none');
    $('#filtroimgqw').removeClass('sinaccion');
    $('#myModal5 #imgtextqw').css('color','white');
    if($('#cambioqw').css('display') == 'none'){
        $('#myModal5 #cambioqw .contraqw').css('display','block');

        this.parentNode.parentNode.parentNode.getElementsByClassName('atraqw')[0].childNodes[0].className = 'fa fa-arrow-left';
        this.parentNode.parentNode.parentNode.getElementsByClassName('row')[0].style.display = 'none';
        $('#myModal5 #cambioqw').css('display','block');

        $('#myModal5 #cambioqw .fotoqw').css('display','none');
        $('#myModal5 #cambioqw .infoqw').css('display','none');
    }
    else{
        this.parentNode.parentNode.parentNode.getElementsByClassName('atraqw')[0].childNodes[0].className = 'fa fa-edit';
        this.parentNode.parentNode.parentNode.getElementsByClassName('row')[0].style.display = 'block';
        $('#myModal5 #cambioqw').css('display','none');
        $('#myModal5 #setimg').attr('name','phot');

    }
}
function imgSet() {
    $('#cuslqw').attr('value','0');
    $('#myModal5 #cambioqw #cbimgqw').attr('src',$('#myModal5 #imgset img').attr('src'));
    $('#alertaimgg').css('display','none');
    $('#filtroimgqw').removeClass('sinaccion');
    $('#myModal5 #imgtextqw').css('color','white');
    if($('#cambioqw').css('display') == 'none'){
        //$('#myModal5 #setimg').attr('name','photo');
        $('#myModal5 #cambioqw .fotoqw').css('display','block');

        this.parentNode.parentNode.parentNode.getElementsByClassName('atraqw')[0].childNodes[0].className = 'fa fa-arrow-left';
        this.parentNode.parentNode.parentNode.getElementsByClassName('row')[0].style.display = 'none';
        $('#myModal5 #cambioqw').css('display','block');
        $('#myModal5 #cambioqw .contraqw').css('display','none');
        $('#myModal5 #cambioqw .infoqw').css('display','none');
    }
    else{
        this.parentNode.parentNode.parentNode.getElementsByClassName('atraqw')[0].childNodes[0].className = 'fa fa-edit';
        this.parentNode.parentNode.parentNode.getElementsByClassName('row')[0].style.display = 'block';
        $('#myModal5 #cambioqw').css('display','none');
        $('#myModal5 #setimg').attr('name','phot');
    }
}
function editUser() {
    $('#cuslqw').attr('value','1');
    $('#alertaimgg').css('display','none');
    $('#filtroimgqw').removeClass('sinaccion');
    $('#myModal5 #imgtextqw').css('color','white');
    if($('#cambioqw').css('display') == 'none'){
        $('#myModal5 .modal-dialog').removeClass('modal-sm');
        $('#myModal5 #cambioqw .infoqw').css('display','block');
        this.childNodes[0].className = 'fa fa-arrow-left';
        this.parentNode.getElementsByClassName('row')[0].style.display = 'none';
        $('#myModal5 #cambioqw').css('display','block');
        $('#myModal5 #cambioqw .fotoqw').css('display','none');
        $('#myModal5 #cambioqw .contraqw').css('display','none');
    }
    else{
        $('#myModal5 .modal-dialog').addClass('modal-sm');
        this.childNodes[0].className = 'fa fa-edit';
        this.parentNode.getElementsByClassName('row')[0].style.display = 'block';
        $('#myModal5 #cambioqw').css('display','none');
        $('#myModal5 #setimg').attr('name','phot');
    }
}
function addDi() {
    var idnoti = this.getAttribute('eved');
    $('#myModal4 .modal-body h4').html(this.parentNode.parentNode.getElementsByTagName('td')[2].innerText);
    var dates  =  new Date();
    var cuanto = new Date(this.getAttribute('duracion')) - dates;
    var diasw = (cuanto/3600000)/24;
    var horasw = diasw % 1;
    horasw = horasw*24;
    var minutos = horasw%1;
    minutos = minutos*60;
    minutos = Math.round(minutos);
    diasw = parseInt(diasw);
    horasw = parseInt(horasw);
    if(cuanto<0){
        $('#myModal4 .modal-body #masdias').attr('action','/EveNoProNo/'+idnoti);
        $('#myModal4 .modal-body #masdias').css('display','block');
        $('#myModal4 .modal-body .alert-danger').css('display','none');
        $('#myModal4 .modal-body .alert-success').css('display','none');

        $('#myModal4 .modal-header h4').css('color','#e91e63');
        $('#myModal4 .modal-header h4 .textow').html('(Finalizado)');
    }
    else{
        $('#myModal4 .modal-body .alert-danger').css('display','block');
        $('#myModal4 .modal-body #masdias').css('display','none');
        $('#myModal4 .modal-body .alert-success').css('display','block');

        $('#myModal4 .modal-header h4').css('color','#66bb6a');
        $('#myModal4 .modal-header h4 .textow').html('(Disponible)');  
        var mennoti = diasw+" dias "+horasw+" horas y " + minutos +" minutos";
        $('#myModal4 .modal-body .alert-success').html('Vigente por '+ mennoti);
    }
}
function editPho(){
    $('#myModal3 .modal-header h5').html(this.parentNode.getElementsByClassName('name')[0].innerText);
    var filasw = $('#myModal3 .modal-body .row');
    var imagen = this.getAttribute('pothow');
    var archfile = this.getAttribute('filew');
    $('#myModal3 .modal-body #photow').attr('name','phot');
    $('#myModal3 .modal-body #photow1').attr('name','phot');
    $('#myModal3 #nuevodocumento .file-path-wrapper').css('color','white');
    $('#myModal3 #paadjuntoq').css('color','white');
    n1=0;
    $('#bb2w label').html("Agregar un archivo");
    $('#unomasw').html("+");
    $('#bb2w .file-field').remove();
    $('#editfilew #alertadjw').css('display','none');

    $('#myModal3 #editfilew').attr('action','/EveNoPro/'+this.getAttribute('eved'));
    $('#myModal3 #editfilew input[name=filesqw]').attr('value',this.getAttribute('filessa'));
    if(this.getAttribute('dispow')=="0"){
        $('#editfilew input[name=tipoqw]').attr('value','0');
        filasw[0].style.display="block";
        filasw[1].style.display="block";
        /*$('#nuevodocumento .file-field').remove();
        var tu = "<div class='file-field input-field'><div class='btn1'><span>Foto</span><input id='photow' type='file' name='photo'></div><div class='file-path-wrapper'><input type='text' class='file-path validate'></div></div>";
        $('#nuevodocumento').append(tu);*/
        //$('#nuevodocumento .file-field').remove();
        $('#myModal3 .modal-body #editfilew img').attr('src','/eventos/'+imagen);
        
        //$('#myModal3 .modal-body #photow').attr('name','photo');

        if(archfile=="undefined"){
            filasw[3].style.display="block";
            filasw[2].style.display="none";
            $('#myModal3 .modal-body #photow1').attr('name','phot');
            $('#editfilew input[name=conadjunto]').attr('value','0');
        }
        else{
            $('#editfilew input[name=conadjunto]').attr('value','1');
            filasw[3].style.display="none";
            filasw[2].style.display="block";
            //$('#myModal3 .modal-body #photow1').attr('name','photo');
            $('#myModal3 .modal-body #adjuntow').attr('href','/eventos/'+archfile);
        }
    }
    else{
        //$('#myModal3 .modal-body #photow').attr('name','phot');
        $('#editfilew input[name=tipoqw]').attr('value','1');
        filasw[0].style.display="none";
        filasw[1].style.display="none";
        if(archfile=="undefined"){
            $('#editfilew input[name=conadjunto]').attr('value','0');
            filasw[2].style.display="none";
            $('#myModal3 .modal-body #photow1').attr('name','phot');
            filasw[3].style.display="block";
        }
        else{
            $('#editfilew input[name=conadjunto]').attr('value','1');
            filasw[3].style.display="none";
            filasw[2].style.display="block";
            //$('#myModal3 .modal-body #photow1').attr('name','photo');
            $('#myModal3 .modal-body #adjuntow').attr('href','/eventos/'+archfile);
        }
    }
    //console.log(this);
    //console.log($('#myModal3 .modal-body .row'));
}
function evEdit(){
    $('#prupruevent').css('display','none');
    $('#editat').css('display','block');
    $('#editat').attr('deedit','1');
    $('#editat').attr('action','/EveNoProf/'+this.getAttribute('eved'));
    //fecha default
    $('#myModal1 .modal-body #editat .tufec1').attr('value','0');
    //cambiar titu
    var fila = this.parentNode.parentNode.getElementsByTagName('td');

    //get inputs
    var entradas = $('#myModal1 .modal-body #editat .valiz');

    var tipow = this.getAttribute('dispow');
    if(tipow =='0'){
        //show only evento
        $('#myModal1 .modal-header h4').html("Modificar Evento");
        var onlyeven = $('#editat .row');
        var arrayonly = onlyeven[0].childNodes;
        arrayonly[1].style.display = 'block';
        arrayonly[2].style.display = 'block';

        //get lugar evento
        entradas[0].value =  fila[3].innerText;
        //get date
        var fechaget = new Date(fila[4].innerText);
        var parserr = (fechaget+"").split(' ');
        var formato = fechaget.getFullYear()+"-"+parserr[1]+'-'+fechaget.getDate()+" "+parserr[4];
        $('#myModal1 .modal-body #editat #lalaf1').html(formato+" Hrs");
        //get titulo evento
        entradas[2].value = fila[2].innerText;
        //set descrip
        var descrip = this.getAttribute('descriw');
        entradas[3].value = descrip;
    }
    else{
        entradas[0].value =  "noticia";
        //show only evento
        $('#myModal1 .modal-header h4').html("Modificar Noticia");
        var onlyeven = $('#editat .row');
        var arrayonly = onlyeven[0].childNodes;
        arrayonly[1].style.display = 'none';
        arrayonly[2].style.display = 'block';

        //get titulo evento
        entradas[2].value = fila[2].innerText;
        //set descrip
        var descrip = this.getAttribute('descriw');
        entradas[3].value = descrip;
    }
    console.log(entradas);

}
function verEv(){
    var dates  =  new Date();
    var cuanto = 0;
    var descrip = this.getAttribute('descriw');
    $('#myModal2 .modal-body .descrtw').html(descrip);
    var tipow = this.getAttribute('dispow');
    var fila = this.parentNode.parentNode.getElementsByTagName('td');
    $('#myModal2 .modal-body .texto4').html(fila[2].innerText);
    var fechaw0 = $('#myModal2 .modal-body .fecw0 .otroc');
    fechaw0[0].textContent = this.getAttribute('fechacr');
    if(this.getAttribute('fechaup') == 'undefined')
        fechaw0[1].textContent = 'Ninguna';
    else
        fechaw0[1].textContent = this.getAttribute('fechaup');
    var lugar = $('#myModal2 .modal-body .luggaw .otroc');
    lugar[0].textContent = fila[3].innerText;
    lugar[1].textContent = fila[4].innerText;
    if(tipow == '0'){
        var cuanto = new Date(fila[4].innerText) - dates;
        var diasw = (cuanto/3600000)/24;
        var horasw = diasw % 1;
        horasw = horasw*24;
        var minutos = horasw%1;
        minutos = minutos*60;
        minutos = Math.round(minutos);
        diasw = parseInt(diasw);
        horasw = parseInt(horasw);
        $('#myModal2 .modal-content').css({'background':'white','color':'#3c4858'});
        $('#myModal2 .modal-content .otroc').css('color','#3c4858');
        $('#myModal2 .modal-body .luggaw').css('display','block');
        $('#myModal2 .modal-header div').css({'background-image':'url('+fila[0].childNodes[0].getAttribute('src')+')','display':'block'});
        if(cuanto<0){
            $('#myModal2 .modal-header h4').css('color','#e91e63');
            $('#myModal2 .modal-header h4 .textow').html('(Finalizado)');
            $('#myModal2 .modal-body #finaleve').css('display','block');
            if((diasw*-1) <= 4){
                if((diasw*-1)!=1)
                    if((diasw*-1)==0)
                        var mensaje = horasw*-1+" horas y " + minutos*-1 +" minutos";
                    else
                        var mensaje = diasw*-1+" dias "+horasw*-1+" horas y " + minutos*-1 +" minutos";
                else
                    var mensaje = diasw*-1+" dia "+horasw*-1+" horas y " + minutos*-1 +" minutos";
            }
            else{
                var mensaje = diasw*-1+" dias ";
            }
            $('#myModal2 .modal-body #finaleve').html('Finalizó hace '+ mensaje);
            $('#myModal2 .modal-body #faltaleve').css('display','none'); 
        }
        else{
            $('#myModal2 .modal-header h4').css('color','#66bb6a');
            $('#myModal2 .modal-header h4 .textow').html('(Disponible)');  
            $('#myModal2 .modal-body #finaleve').css('display','none');
            $('#myModal2 .modal-body #faltaleve').css('display','block'); 
            var mennoti = diasw+" dias "+horasw+" horas " + minutos +" minutos";
            $('#myModal2 .modal-body #faltaleve').html('Falta '+ mennoti+' para el Evento');
        }
    }
    else{
        $('#myModal2 .modal-content').css({'background':'#212121','color':'white'});
        $('#myModal2 .modal-content .otroc').css('color','white');
        $('#myModal2 .modal-header div').css('display','none');
        $('#myModal2 .modal-body .luggaw').css('display','none');
        $('#myModal2 .modal-body #finaleve').css('display','none');
        var cuanto = new Date(this.getAttribute('duracion')) - dates;
        var diasw = (cuanto/3600000)/24;
        var horasw = diasw % 1;
        horasw = horasw*24;
        var minutos = horasw%1;
        minutos = minutos*60;
        minutos = Math.round(minutos);
        diasw = parseInt(diasw);
        horasw = parseInt(horasw);
        if(cuanto<0){
            $('#myModal2 .modal-header h4').css('color','#e91e63');
            $('#myModal2 .modal-header h4 .textow').html('(Finalizado)');
            $('#myModal2 .modal-body #finaleve').css('display','block');
            if((diasw*-1) <= 4){
                if((diasw*-1)!=1)
                    if((diasw*-1)==0)
                        var mensaje = horasw*-1+" horas y " + minutos*-1 +" minutos";
                    else
                        var mensaje = diasw*-1+" dias "+horasw*-1+" horas y " + minutos*-1 +" minutos";
                else
                    var mensaje = diasw*-1+" dia "+horasw*-1+" horas y " + minutos*-1 +" minutos";
            }
            else{
                var mensaje = diasw*-1+" dias ";
            }
            $('#myModal2 .modal-body #finaleve').html('Finalizó hace '+ mensaje);
            $('#myModal2 .modal-body #faltaleve').css('display','none'); 
        }
        else{
            $('#myModal2 .modal-header h4').css('color','#66bb6a');
            $('#myModal2 .modal-header h4 .textow').html('(Disponible)');  
            $('#myModal2 .modal-body #finaleve').css('display','none'); 
            $('#myModal2 .modal-body #faltaleve').css('display','block');
            var mennoti = diasw+" dias "+horasw+" horas " + minutos +" minutos";
            $('#myModal2 .modal-body #faltaleve').html('La Noticia esta vigente por '+ mennoti);
        }

    }
    console.log(diasw+" dias "+horasw+" horas" + minutos +" minutos");
}
function nueEv(){
    var info = $('#prupruevent input[name=group1]');
    info[0].checked = "hola";
    /*if($('#mifotoa').length == 0){
        var tu = "<div id='mifotoa' class='file-field input-field'><div class='btn1'><span>File</span><input id='imagen' type='file' name='photos'></div><div class='file-path-wrapper'><input type='text' class='file-path validate'></div></div>";
        $('#imaeve').append(tu);
    }*/
    //Set display none a formulario Update
    $('#editat').css('display','none');
    $('#editat').attr('deedit','0');


    $('#conteeve').css({'background':'#fff','color':'rgb(60,72,88)'});
    $('#fechhha').css('display','block');
    $('#titmodev').html('Agregar Evento');
    $('#imaeve').css('display','block');
    $('#conteeve input').css('color','#555');
    $('.app-container').css('display','none');
    $('#prupruevent').css('display','block');
    $('#titmodev').html('Agregar Evento');
    //$('input[name = direccion]').attr('value','jode');
    //$('input[name = fecha]').attr('value','');
    //$('input[name = titulo]').attr('value','');
    $('textarea[name = descrii]').html('');
    $('#lalaf').css('color','#555');
    $('#filtro1').css('color','#fff');
    $('#imagen').attr('name','photos');

}
function hidd(){
    console.log($('#editat').attr('deedit'));
    if($('#editat').attr('deedit') == '0'){
        $('.app-container').css('display','none');
        $('#prupruevent').css('display','block');
        $('#titmodev').html('Agregar Evento');
        $('.atrras').css({'top': '-55px','left': '18px'})
        var fechas = $('#midato').attr('jala');
        $('#lalaf').html(fechas);
        $('.tufec').attr('value',fechas);
    }
    else{
        $('.app-container').css('display','none');
        $('#editat').css('display','block');
        $('#myModal1 .modal-header h4').html("Modificar Evento");
        var fechas = $('#midato').attr('jala');
        $('#lalaf1').html(fechas);
        $('.tufec1').attr('value',fechas);
    }
}
function masfec(){
    $('.app-container').css('display','block');
    $('#prupruevent').css('display','none');
    $('#titmodev').html('');
    //$('.atrras').css({'top': '-35px','left': '0px'})
}
function masfec1(){
    $('.app-container').css('display','block');
    $('#editat').css('display','none');
    $('#titmodev').html('');
    //$('.atrras').css({'top': '-35px','left': '0px'})
}
function masDocc(){
    console.log($('#imagen'));
    var tu = "<div class='file-field input-field'><div class='btn1'><span>File</span><input id='adju' type='file' name='photos'></div><div class='file-path-wrapper'><input type='text' class='file-path validate'></div></div>";
    if(n%2 == 0){
        $('#bb2 label').html("Eliminar  archivo");
        $('#mosmas').html("-");
        $('#bb2').append(tu);
        //$('#masdoc').css('display','block');
    }
    else{
        $('#bb2 label').html("Agregar un archivo");
        $('#mosmas').html("+");
        $('#bb2 .file-field').remove();
        //$('#masdoc').css('display','none');
    }
    n++;
}
function masDocc1(){
    var tu = "<div class='file-field input-field'><div class='btn1'><span>File</span><input id='adju0' type='file' name='photo'></div><div class='file-path-wrapper'><input type='text' class='file-path validate'></div></div>";
    if(n1%2 == 0){
        $('#bb2w label').html("Eliminar  archivo");
        $('#unomasw').html("-");
        $('#bb2w').append(tu);
        //$('#masdoc').css('display','block');
    }
    else{
        $('#bb2w label').html("Agregar un archivo");
        $('#unomasw').html("+");
        $('#bb2w .file-field').remove();
        //$('#masdoc').css('display','none');
    }
    n1++;
}
function evenNoti(){
    var tipo = this.getAttribute('value');
    if(tipo ==1){
        $('#fechhha').css('display','none');
        $('#titmodev').html('Agregar Noticia');
        $('#imaeve').css('display','none');
        $('#conteeve').css({'background':'#37474f','color':'#fff'});
        $('#conteeve .form-control').css('color','#fff');
        $('#lalaf').css('color','#fff');
        $('#imagen').attr('name','photos1');
        //$('#imaeve .file-field').remove();
    }
    else{
        $('#conteeve').css({'background':'#fff','color':'rgb(60,72,88)'});
        $('#fechhha').css('display','block');
        $('#titmodev').html('Agregar Evento');
        $('#imaeve').css('display','block');
        $('#conteeve input').css('color','#555');
        $('#lalaf').css('color','#555');
        $('#imagen').attr('name','photos');
        //var tu = "<div id='mifotoa' class='file-field input-field'><div class='btn1'><span>File</span><input id='imagen' type='file' name='photos'></div><div class='file-path-wrapper'><input type='text' class='file-path validate'></div></div>";
        //$('#imaeve').append(tu);

    }
}

function populateTable() {
    $.getJSON('/obtienexyq/'+$('#sett_user').attr('colores'),function(data){
        var genero = parseInt(data.genero);
        var redes = data.redes+"";
        var arrayRedes = redes.split(';');
        var ema = data.ema;
        $('#myModal5 .modal-content .correoqw').html(ema);
        $('#myModal5 .modal-content #emama').attr('value',ema);

        var redqw1 = $('#myModal5 .modal-content #cambioqw .redesqw');
        redqw1[0].value = arrayRedes[0];
        redqw1[1].value = arrayRedes[1];
        redqw1[2].value = arrayRedes[2];
        console.log(redqw1);
        var reqw = $('#myModal5 .modal-content .redess');
        var noss = reqw[0].childNodes;
        noss[0].attributes[0].value = arrayRedes[0];
        noss[1].attributes[0].value = arrayRedes[1];
        noss[2].attributes[0].value = arrayRedes[2];
        if(genero == 1){
            $('#myModal5 .profile-card').addClass('mujer');
        }
        else{
            $('#myModal5 .modal-body .close').css('color','#607D8B');
            $('#myModal5 .modal-body #edituser').css('color','#607D8B');
            $('#myModal5 .modal-body #keyset div').css('color','#607D8B');
        }
    });
};