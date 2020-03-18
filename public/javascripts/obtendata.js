
// DOM Ready =============================================================
$(document).ready(function() {
    $('.parallax').parallax();
    populateTable();
    cosasgeniales();
    //Tab
    (function ($) { 
        $('.tab ul.tabs0').addClass('active').find('> li:eq(0)').addClass('current');
        
        $('.tab ul.tabs0 li a').click(function (g) { 
            var tab = $(this).closest('.tab'), 
                index = $(this).closest('li').index();
            
            tab.find('ul.tabs0 > li').removeClass('current');
            $(this).closest('li').addClass('current');
            
            tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp(0);
            tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown(0);
            
            g.preventDefault();
        } );
    })(jQuery);
    //busca();
    $('#cronoo').on('click',getCrono);
    $('.card5').on('click',showDo);
    $('#atttra').on('click',hidd);
    $('.cartas').on('click',carta);
    //$('.cartas1').on('click',carta1);
    $('#cierra').on('click',cartaclose);
    $('.grrand').on('click',jaja);
    $('.imagenEv').on('click',verima);

    $('#maavac').on('click',masvaca);
    $('#vacaca').on('click',inivaca);

    $('#maavac1').on('click',mascipre);
    $('#ciprew').on('click',inicipre);

    $('#siguie').on('click',siguw);

    $('.botonn').on('click',botonnw);



});
function cosasgeniales(){
    var fw = new Date();
    var mee3w = fw.getMonth();
    console.log(mee3w);
    if(mee3w == 2){
        $('#admigeni').trigger('click');
    }
}
function botonnw(){
    var paddrew = this.innerText;
    var father = this.parentNode.parentNode.getElementsByClassName('enefecto');
    if(paddrew == 'Historia'){
        this.className = "botonn sies";
        this.parentNode.getElementsByTagName('span')[0].className = "botonn";
        father[0].className = "col-xs-12 card2 enefecto sii";
        father[1].className = "col-xs-12 card2 enefecto";
    }
    else{
        this.className = "botonn sies";
        this.parentNode.getElementsByTagName('span')[1].className = "botonn";
        father[0].className = "col-xs-12 card2 enefecto";
        father[1].className = "col-xs-12 card2 enefecto sii";
    }
}
function siguw(){
    $(this).css('right','-10px');
    var hioh = this;
    var quien = this.parentNode.parentNode.getElementsByClassName('histole');
    var caru = this.parentNode.parentNode.getElementsByClassName('carousel-indicators')[0].childNodes;
    for (var i = 0; i < quien.length; i++) {
        if(quien[i].classList.length==2){
            quien[i].className="histole";
            caru[i].className="";
            if(i+1 == quien.length){
                quien[0].className="histole pri";
                caru[0].className='active';
            }
            else{
                quien[i+1].className="histole pri";
                caru[i+1].className='active';
            }
            break;
        }
    }
    setTimeout(function(){
        $(hioh).css('right','15px');
    },300);
    //console.log(this.parentNode.getElementsByClassName('histole')[1].className="histole pri");
}
function inicipre(){
    $('#myModal3 .mastew').css('display','none');
    $('#myModal3 #maavac1 strong').html('+ ');
    $('#myModal3 #maavac1 x').html('Ver más');
}

function mascipre(){
    var padre = this.parentNode.parentNode; 
    if(padre.getElementsByClassName('mastew')[0].style.display == 'none'){
        //console.log(this.childNodes[2].innerText);
        this.childNodes[2].innerText = "Ver menos";
        this.childNodes[1].innerText = "- ";
        padre.getElementsByClassName('mastew')[0].style.display = 'block';
    }
    else{
        this.childNodes[2].innerText = "Ver más";
        this.childNodes[1].innerText = "+ ";
        padre.getElementsByClassName('mastew')[0].style.display = 'none';
    }
}
function inivaca(){
    $('#myModal4 .text-justify').css('display','none');
    $('#myModal4 .ttabla').css('display','none');
    $('#myModal4 #maavac strong').html('+ ');
    $('#myModal4 #maavac x').html('Ver más');
}
function masvaca(){
    var padre = this.parentNode.parentNode; 
    if(padre.getElementsByClassName('text-justify')[0].style.display == 'none'){
        //console.log(this.childNodes[2].innerText);
        this.childNodes[2].innerText = "Ver menos";
        this.childNodes[1].innerText = "- ";
        padre.getElementsByClassName('text-justify')[0].style.display = 'block';
        padre.getElementsByClassName('ttabla')[0].style.display = 'block';
    }
    else{
        this.childNodes[2].innerText = "Ver más";
        this.childNodes[1].innerText = "+ ";
        padre.getElementsByClassName('text-justify')[0].style.display = 'none';
        padre.getElementsByClassName('ttabla')[0].style.display = 'none';
    }
}
function verima(){
    var tiempoui = this.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('cuantt')[0].textContent;
    if(tiempoui.split(' ')[1] =='hace'){
        $('#myModalevent .tiempo i').removeClass('fa-clock-o');
        $('#myModalevent .tiempo i').css('color','#4caf50');
        $('#myModalevent .tiempo').css('background','#388e3c');
        $('#myModalevent .tiempo x').html('En Curso...');
    }
    else{
        if($('#myModalevent .tiempo i.fa-clock-o').length == 0){
            $('#myModalevent .tiempo i').addClass('fa-clock-o');
            $('#myModalevent .tiempo').css('background','rgba(255,255,255,.18)');
            $('#myModalevent .tiempo i').css('color','white');
        }
        $('#myModalevent .tiempo x').html(tiempoui);
    }
    $('#myModalevent .lol').attr('src',this.getAttribute('jode'));
    $('#myModalevent .chip img').attr('src','/avatar/'+this.getAttribute('jofoto'));
    //$('#myModalevent .chip div').css('background','url(/avatar/'+this.getAttribute('jofoto')+')');
    //$('#myModalevent .chip div').css({'background-size':'cover','background-position':'center'});
    $('#myModalevent .nombre x').html(this.getAttribute('jonombre'));   
    
}
function jaja(){
    var datoss = this.getElementsByClassName('col-xs-12');
    var color_border = datoss[3].childNodes[0].style.borderTop;
    var fondo_color = datoss[0].parentNode.parentNode.style.backgroundColor;
    $('#myModal000 .modal-content').css('background',fondo_color);
    $('#myModal000 .borde_color').css('border-top',color_border);

    if(datoss[2].lastChild != null){
        $('#myModal000 .close').css('color','#f1de39');
        $('#myModal000 .modal-body #botonNoti').css('display','inline-block');
        $('#myModal000 .modal-body #botonNoti').attr('href',datoss[2].firstChild.getAttribute('href'));
    }
    else{
        $('#myModal000 .modal-body #botonNoti').css('display','none');
        $('#myModal000 .close').css('color','#B2DFDB');
    }

    var datoss1 = datoss[3].getElementsByClassName('stats');

    $('#myModal000 .modal-header h5').html(datoss[0].textContent);
    $('#myModal000 .modal-body .col-sm-12').html(datoss[1].textContent);
    $('#myModal000 .modal-footer x')[0].innerText=datoss1[0].lastChild.textContent;
    $('#myModal000 .modal-footer x')[1].innerText=datoss1[1].lastChild.textContent;
}
function busca() {
    var options = {
      valueNames: [ 'namess']
    };
    var userList = new List('users', options);
}

function cartaclose(){
    $('.tutu').css('display','none');
}
/*function cartaclose1(){
    $('.tutu1').css('display','none');
}*/
function carta(){
    var jaja = this.getAttribute('pruTip');
    $('.tutu').css('display','block');
    if(jaja=='1'){
        $('.tutu a').css('display','none');
        $('#solo1').css('display','block');
        $('#cardtitu').html("Prueba de Aptitudes Musicales");
        $('.tutu').css('background','rgba(60, 72, 88, 0.97)');
        $('.tutu .parrafo').html('La evaluación de Aptitudes Musicales comprende la valoración de los siguientes aspectos:');
    }
    else{
        if(jaja=='2'){
            $('.tutu a').css('display','none');
            $('#solo1').css('display','none');
            $('#cardtitu').html("Prueba de Condiciones Físico-Instrumentales");
            $('.tutu').css('background','rgba(60, 72, 88, 0.97)');
            $('.tutu .parrafo').html("Esta prueba comprende la valoración de la Predisposición Anatómica del Postulante para la ejecución del Instrumento elegido o del Canto, y su preparación vocal o instrumental. Igualmente, se valora la predisposición vocacional del postulante para el estudio de la carrera. ");
        }
        else{
            $('.tutu').css('background','rgba(0, 150, 136, 0.97)');
            $('#cardtitu').html("Prueba de Conocimientos Cientïficos y Humanísticos");
            $('#solo1').css('display','none');
            $('.tutu a').css('display','inline-block');
            $('.tutu .parrafo').html('Esta prueba es de SEGUNDA FASE. La prueba consta de ochenta (80) preguntas, se aplica de acuerdo al siguiente Balotario');
        }
    }
}
/*function carta1(){
    var jaja = this.getAttribute('pruTip');
    console.log(jaja);
    $('.tutu1').css('display','block');
    if(jaja=='1'){
        $('.tutu1 a').css('display','none');
        $('#solo1').css('display','block');
        $('#cardtitu1').html("Prueba de Aptitudes Musicales");
        $('.tutu1').css('background','rgba(60, 72, 88, 0.97)');
        $('.tutu1 .parrafo').html('La evaluación de Aptitudes Musicales comprende la valoración de los siguientes aspectos:');
    }
    else{
        $('.tutu1 a').css('display','none');
        $('#solo1').css('display','none');
        $('#cardtitu1').html("Prueba de Condiciones Físico-Instrumentales");
        $('.tutu1').css('background','rgba(60, 72, 88, 0.97)');
        $('.tutu1 .parrafo').html("Esta prueba comprende la valoración de la Predisposición Anatómica del Postulante para la ejecución del Instrumento elegido o del Canto, y su preparación vocal o instrumental. Igualmente, se valora la predisposición vocacional del postulante para el estudio de la carrera. ");
    }
}*/

function hidd(){
    $('#nono').html('Plana Docente');
    $('#users').css('display','block');
    $('#shoow').css('display','none');
    $('#myModal9 .modal-header .tiiq').css('display','none');
    $('#myModal9 .modal-dialog').addClass('modal-lg');
    $('#myModal9 .modal-header').removeClass('unaa');
    $('#myModal9 .modal-header').css('background','none');
    $('#myModal9 .modal-header').css('padding-bottom','0px');

    $('#myModal9 #nono').css('opacity','1');
    $('#myModal9 .modal-header button').css('display','block');
}

function showDo() {
    var jaja = this.getAttribute('jode');
    var cover = this.getAttribute('imau');
    //$('.im12').attr('src',cover);
    $('#myModal9 .modal-header').addClass('unaa');
    $('#myModal9 .modal-header').css('background','url('+cover+')');
    $('#myModal9 .modal-header').css({'background-size':'cover','background-position':'center'});
    $('#myModal9 .modal-header .tiiq').css('display','block');
    /*$('.imagen_cover').css('background','url('+cover+')');
    $('.imagen_cover').css({'background-size':'cover','background-position':'center'});*/
    $('#myModal9 .modal-dialog').removeClass('modal-lg');

    //imagen redonda
    /*$('#myModal9 .modal-header div').css('display','block');
    $('#myModal9 .modal-header div').css('background','url('+cover+')');
    $('#myModal9 .modal-header div').css({'background-size':'cover','background-position':'center'});*/

    $('#myModal9 .modal-header').css('padding-bottom','80px');


    $('#myModal9 #nono').css('opacity','0');
    $('#myModal9 .modal-header button').css('display','none');

    $.getJSON(jaja,function(data){
        //$('#shoow h3[name=nombreshow]').html(data.nombre);
        $('#vamos2').html(''+data.descri);
        //$('#nono').html(data.nombre+' '+data.apellidos);
        $('#myModal9 #titutu').html(data.nombre+' '+data.apellidos);
        var sele = data.categoria;
        var tipos = ['Piano','Clarinete','Violin','S'];
        $('#myModal9 .modal-header .tiiq x').html(tipos[sele]+" 🎹");
        $('#myModal9 .emaa').html(data.ema);
        
        $('#users').css('display','none');
        $('#shoow').css('display','block');
    });
}

function getCrono() {
    $.getJSON('/GetCrono',function(data){
        var fechaw = new Date(data.fechaas);
        $('#ttiti').html('Cronograma de Admisión '+fechaw.getFullYear());
        $('#cocoro').attr('src','/documentos/'+data.documento);
        var diassem = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado'];
        var messew = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        var labelFecha = ''+diassem[fechaw.getDay()]+" "+fechaw.getDate()+' de '+messew[fechaw.getMonth()]+" del "+fechaw.getFullYear();
        if(fechaw.getFullYear() == (new Date()).getFullYear())
            $('#joj12').html(labelFecha + '<br><spam class="label" style="background:rgb(52, 156, 52);border-radius:0px;"> actualizado</spam>');
        else
            $('#joj12').html(labelFecha + '<br><spam class="label" style="background:rgba(255,10,10,1);border-radius:0px;"> desactualizado</spam>');
    });
}

// Functions =============================================================

// Fill table with data
function populateTable() {

    var options = {
      valueNames: [ 'namess']
    };

    var userList = new List('users', options);

    var Requi1 ="";
    var Requi2 = "";
    var Requi3 = "";
    var Requi4 = "";

    $.getJSON('/GetBal/3',function(data){
        if(data.length>0)
            $('.tutu a').attr('href','/documentos/'+data[0].foto); 
    });

    // jQuery AJAX call for JSON
    $.getJSON( '/GetRequi', function( data ) {
        // Stick our user data array into a userlist variable in the global object
        userListData = data;


        // For each item in our JSON, add a table row and cells to the content string
        var uu = 0;
        for (var i = 0; i < data.length; i++) {
            if(data[i].tipo == 1){
                Requi2 += '<p class="requii" style="color:#00695C;"><spam><i class="fa fa-check-circle-o" style="margin-right:4px;font-size:17px;"></i></spam>'+data[i].descri+'</p>';
            }
            else{
                if(data[i].tipo == 0){
                    Requi1 += '<p class="requii" style="color:rgba(40, 56, 103, 0.91);"><spam><i class="fa fa-check-circle-o" style="margin-right:4px;font-size:17px;"></i></spam>'+data[i].descri+'</p>';
                }
                if(data[i].tipo == 2){
                    Requi3 += '<p class="requii" style="color:#00695C;"><spam><i class="fa fa-check-circle-o" style="margin-right:4px;font-size:17px;"></i></spam>'+data[i].descri+'</p>';
                }
                if(data[i].tipo == 3){
                    Requi4 += '<p class="requii" style="color:#00695C;"><spam><i class="fa fa-check-circle-o" style="margin-right:4px;font-size:17px;"></i></spam>'+data[i].descri+'</p>';
                }
            }
            uu++;
        }
        // Inject the whole content string into our existing HTML table
        $('.aqui').html(Requi1);
        $('.aqui1').html(Requi1+Requi2);
        $('.aqui2').html(Requi1+Requi3);
        $('.aqui3').html(Requi1+Requi4);
    });
};