$(document).ready(function() {
    if($("#sindoc").length != 1){
        var options = {
          valueNames: [ 'name', 'born' ]
        };

        var userList = new List('users', options);
    }
    $('#agregar').on('click',getProfeNew);
    $('.ver').on('click',getProfe);
    $('.editardocen').on('click',editProfe);

    $('.modiimg').on('click',getProfe2);

    $('#agregarrequi').on('click',getRequiNew);
    $('.verrequi').on('click',getRequi);
    $('.editarrequi').on('click',setRequi);
    $('.showlog').on('click',showlog);
    $('#agregarsemest').on('click',agregarsemest);
    $('#myModal11 #masnotas').on('click',shownotas);
    $('.fechaini').on('click',showfecha);
    $('#atrasseme').on('click',atrasseme);
    $('.btn_b').on('click',btn_b);
    $('.ver_al').on('click',ver_al);
    $('#myModal12 .modal-body .chart_btn').on('click',chart_aca);
    $('#attras_cha').on('click',attras_cha);
    $('.orden_table').on('click',orden_table);

//--------------Docc--------------
    //N-docc
    $('#agregardocc').on('click',getDoccNew);
    $('.verdocc').on('click',getDocc);
    $('.Editar').on('click',editDocc);
    //$('#enviadocc').on('click',enviaDocc);

    $('#pruprudocc').on('submit',function(evt){
        evt.preventDefault();
        var ddd = $('#pruprudocc input[name = optionsRadios1]:checked').val();
        if(typeof ddd == "undefined"){
            $('#alerta').css('display','block');
            $('#alerta').html("Error, complete el formulario!");
        }
        else{
            $.getJSON('/doccval/'+ddd,function(data){
                console.log(data);
                if(data!="true"){
                    $('#alerta').css('display','block');
                    $('#alerta').html(data);
                }
                else{
                    $('#pruprudocc').unbind('submit');
                    $('#filtrodocc').trigger('click');
                }
            });
        }
    });
    $('#prupru').on('submit',function(evt){
            evt.preventDefault();
            console.log("hola");
            var hh = $("#prupru .valiz");
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
                $.getJSON('/perso/'+hh[3].value+'/'+hh[0].value+'/'+hh[1].value,function(data){
                    if(parseInt(data)==0){
                        $('#prupru').unbind('submit');
                        $('#filtro1').trigger('click');
                    }
                    else{
                       $('#myModal8 #alertauser').css("display",'block'); 
                    }
                });
                /*setTimeout(function(){
                    $('#prupru').unbind('submit');
                    $('#filtro1').trigger('click');
                },100);*/
            }
            else
                $('#myModal8 #alerta').css("display",'block');
    });

    $('#editdocen').on('submit',function(evt){
            evt.preventDefault();
            console.log("hola");
            var hh = $("#editdocen .valiz");
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
                $('#myModal3 #alertaedit').css("display",'none');
                setTimeout(function(){
                    $('#editdocen').unbind('submit');
                    $('#filtrodoce').trigger('click');
                },100);
            }
            else
                $('#myModal3 #alertaedit').css("display",'block');
    });

    $('#nuevosem').on('submit',function(evt){
            evt.preventDefault();
            console.log("hola");
            var hh = $("#nuevosem .valiz");
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
                $('#myModal11 #nuevosem .alert-danger').css("display",'none');
                setTimeout(function(){
                    $('#nuevosem').unbind('submit');
                    $('#vamosseme').trigger('click');
                },100);
            }
            else
                $('#myModal11 #nuevosem .alert-danger').css("display",'block');
    });

    $('#buscar_al').on('submit',function(evt){
        evt.preventDefault();
        console.log($('#busca_label')[0].childNodes[0].innerText = "");
        var cuales = $('#buscar_al input[name=optionsRadioshh]');
        var dattos = ['nombre','ap am','ap','am','dni','ema'];
        var valor_ele; 
        for (var i = 0; i < cuales.length; i++) {
            if(cuales[i].checked == true){
                var nomyu = cuales[i].parentElement.getElementsByTagName('label')[0].innerText;
                $('#busca_label')[0].childNodes[0].innerText = nomyu+" - ";
                $('#busca_label')[0].childNodes[1].innerText = $('#buscar_al input[type=Buscar]')[0].value;
                valor_ele = cuales[i].value;
                break;
            }
        }
        var data = {};
        data.mo_bus = dattos[valor_ele];
        data.buscar = $('#buscar_al input[type=Buscar]')[0].value;
        if(valor_ele==1)
            data.dos ="ok";
        else
            data.dos ="";
        console.log(data);
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/buscar_al',     
            beforeSend: function() {
              //$('.list').html('');
              $("#preloader").css('display','block');
            },
            error:function () {
                $('.list').html('ERROR');
                setTimeout(function(){
                    $("#preloader").css('display','none');
                },500);
            },                  
            success: function(datax) {
                console.log(datax);
                $("#preloader").css('display','none');
                var final = "";
                for (var i = 0; i < datax.length; i++) {
                    var nombrecarrera = ""; 
                    if(datax[i].carrera =='IN'){
                        nombrecarrera = 'Ingenieria Informática';
                    }
                    else{
                        if(datax[i].carrera == 'ARMU')
                            nombrecarrera = 'Artista Músico';
                        else{
                          if(datax[i].carrera == 'EDAR')
                            nombrecarrera = 'Educación Artística';
                          else
                            nombrecarrera = datax[i].carrera;
                        }
                    }

                    var ima_string = "<tr><td class='noshow'><img src=/avatar/"+datax[i].foto+" style='max-height:60px;' class='modiimg'></td>";
                    var nombreio = '<td class="text-center">'+(datax.length-i)+'</td><td class="name">'+datax[i].ap+'</td><td class="born">'+datax[i].am+'</td><td class="born">'+datax[i].nombre+'</td><td class="born">'+datax[i].dni+'</td><td>'+nombrecarrera+'</td><td class="noshow">'+datax[i].ema+'</td>';
                    var accion = '<td class="td-actions text-right"><a type="button" data-toggle="modal" data-target="#myModal12" genqwMa="'+datax[i].genero+"&&"+datax[i].ema+'" fec_da="'+new Date(datax[i].fecha_na)+'&&'+new Date(datax[i].fecha_cre)+'&&'+datax[i].fecha_upd+'" class="ver_al btn btn-info btn-simple btn-xs">Ver</a><a type="button" data-toggle="modal" data-target="#myModalx" class="editardocen btn btn-success btn-simple btn-xs minusq">Editar</a><form method="post" action="" style="display: -webkit-inline-box;"><input type="hidden" name="_method" value="DELETE"><a type="button" href="javascript:void(0);" onclick="if'+"(confirm('¿Está seguro que desea eliminar este registro? "+datax[i].nombre+"'))"+'{this.parentNode.submit();}" class="btn btn-danger btn-simple btn-xs minusq">Eliminar<div class="ripple-container"></div></a></form>';
                    final =ima_string+nombreio+accion+final;
                }
                $('.list').html(final);
                $(document).ready(function() {
                    $('.ver_al').on('click',ver_al);
                });
                /*function ver_al() {
                    console.log(this);
                    var imagen = $('#myModal12 .modal-header div');
                    imagen[0].style.backgroundImage = 'url('+this.parentElement.parentElement.getElementsByClassName('modiimg')[0].getAttribute('src')+')';
                    var nombres = this.parentElement.parentElement.getElementsByTagName('td');
                    $('#titutu_al').html(nombres[4].innerText+" "+nombres[2].innerText+' '+nombres[3].innerText);
                    var datos = this.getAttribute('genqwMa').split('&&');
                    var fe_da = this.getAttribute('fec_da').split('&&');
                    var partrs = $('#myModal12 .modal-body .col-md-12');
                    console.log(fe_da);
                    //dni
                    partrs[0].getElementsByTagName('label')[0].childNodes[1].innerText = nombres[5].innerText;
                    //nacimiento
                    partrs[0].getElementsByTagName('label')[1].childNodes[1].innerText = fe_da[0];
                    //email
                    partrs[0].getElementsByTagName('label')[3].childNodes[2].innerText = datos[1];
                    //create
                    partrs[1].getElementsByTagName('label')[0].childNodes[1].innerText = fe_da[1];
                    //update
                    if(fe_da[2]=='undefined')
                        partrs[1].getElementsByTagName('label')[1].childNodes[1].innerText = 'Sin Modificación';
                    else
                        partrs[1].getElementsByTagName('label')[1].childNodes[1].innerText = new Date(fe_da[2]);
                    //$('#myModal12 .modal-body x').html(datos[1]);
                    $('#myModal12 .modal-header h5 x').html(" "+nombres[6].innerText);
                    //$('#myModal12 .modal-body p').html(this.getAttribute('descqw'));
                    if(datos[0] == '1'){
                        $('#myModal12 .modal-header').css({'background':'rgba(233, 30, 99, 0.6)'});
                        partrs[0].getElementsByTagName('label')[2].childNodes[1].innerText = 'Femenino';
                    }
                    else{
                        $('#myModal12 .modal-header').css('background','#263238');
                        partrs[0].getElementsByTagName('label')[2].childNodes[1].innerText = 'Masculino';
                    }
                }*/
            }
        });
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

function attras_cha() {
   console.log(this.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('row'));
   var cuua = this.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('row');
   cuua[0].style.display = 'block';
   cuua[1].style.display = 'none';
   $('#attras_cha').attr('noajx','false');
}

function chart_aca() {
    console.log('hola');
    console.log(dsixz);
    if($('#attras_cha').attr('noajx')=='true'){
        console.log('ajax');
        $.getJSON('/alumno/'+dsixz,function(data){
            console.log(data);
            var graji = $('#myModal12 .modal-body .row');
            graji[0].style.display="none";
            graji[1].style.display="block";
            var data2 = [{
                semestre: '2014-I',
                promedio: 18,
                ponderado: 1 },
              { semestre: '2014-II',
                promedio: 10,
                ponderado: 0  },
              { semestre: '2015-I',
                promedio: 20,
                ponderado: 1  },
              { semestre: '2015-II',
                promedio: 20,
                ponderado: 0  },
              { semestre: '2016-I',
                promedio: 13,
                ponderado: 0  },
              { semestre: '2016-II',
                promedio: 11,
                ponderado: 0  }];
            var array1 = new Array();
            var array2 = new Array();
            for (var i = 0; i < data2.length; i++) {
                array1 [i] = data2[i].semestre;
                array2 [i] = data2[i].promedio;
            }

            Highcharts.chart('grafico_chart', {
                title: {
                    text: 'Resumen Académico',
                    style: {
                      color: 'rgba(233, 30, 99, 0.89)',
                      fontWeight: 'bold',
                      fontSize:'1.3em',
                      background:'#000'
                    },
                    align:'center'
                },

                subtitle: {
                    text: '<strong>Fuente:</strong> Leandro ALviña <br>'+new Date()
                },
                xAxis: {
                    title:{
                        text:''
                    },
                    categories: array1
                },

                yAxis: {
                    title: {
                        text: ''
                    },
                    max:21,
                    min:0,
                    showLastLabel:false,
                    minorGridLineWidth: 0,
                    gridLineWidth: 0,
                    alternateGridColor: null,
                    plotLines:[{
                        value:13,
                        color:'rgba(0, 150, 136,.5)',
                        width:2
                    },{
                        value:7,
                        color:'rgba(0, 150, 136,.5)',
                        width:2
                    }],
                    plotBands: [{
                        from: 13,
                        to: 21,
                        className:'hola',
                        label: {
                            text: 'Ponderado',
                            style: {
                                color: 'teal',
                                fontWeight:'bold',
                                fontSize:'11px'
                            }
                        }
                    },{
                        from: 0,
                        to: 7,
                        label: {
                            text: 'Reprobado',
                            style: {
                                color: 'rgba(244, 0, 0, 0.86)',
                                fontWeight: 'bold',
                                fontSize:'11px'
                            }
                        }
                    },{
                        from: 7,
                        to: 13,
                        label: {
                            text: 'Desaprobado',
                            style: {
                                color: 'rgba(244, 0, 0, 0.56)',
                                fontWeight: 'bold'
                            },
                        }
                    }]
                },
                legend: {
                    enabled:false
                },
                tooltip: {
                    color:'transparent',
                    formatter: function () {
                        console.log(this);
                        this.color="transparent";
                        this.series.color ="transparent";
                        return '<h5 style="color:#e91e63;font-weight:bold">' + this.series.name + '</h5><br/>' +
                        '<h4><strong>Promedio:</strong> '+this.point.y+'</h4>'+'<br><h4><strong>Semestre:</strong> '+this.x+'</h4>';
                    },
                    backgroundColor:'rgba(255,255,255,.8)',
                    borderColor:'rgba(0,0,0,0)',
                    borderRadius:0,
                    borderWidth:0,
                    shadow:false
                },
                series: [{
                    type: 'spline',
                    name: ' ',
                    data: array2,
                    lineWidth:3,
                    color: 'rgba(55,55,55,.7)',//'#E91E63'//'rgba(0,0,0,.5)'//'rgba(0, 150, 136,.6)'
                }]
            });
        });
    }
    else{
        console.log('sin ajax');
        var graji = $('#myModal12 .modal-body .row');
        graji[0].style.display="none";
        graji[1].style.display="block";
    }
}
var dsixz = "";
function ver_al() {
    console.log(this);
    var graji = $('#myModal12 .modal-body .row');
    graji[0].style.display="block";
    graji[1].style.display="none";
    $('#attras_cha').attr('noajx','true');

    var imagen = $('#myModal12 .modal-header div');
    imagen[0].style.backgroundImage = 'url('+this.parentElement.parentElement.getElementsByClassName('modiimg')[0].getAttribute('src')+')';
    var nombres = this.parentElement.parentElement.getElementsByTagName('td');
    $('#titutu_al').html(nombres[4].innerText+" "+nombres[2].innerText+' '+nombres[3].innerText);
    var datos = this.getAttribute('genqwMa').split('&&');
    var fe_da = this.getAttribute('fec_da').split('&&');
    var partrs = $('#myModal12 .modal-body .col-md-12');
    console.log(fe_da);
    dsixz = this.getAttribute('dsixz');
    //dni
    partrs[0].getElementsByTagName('label')[0].childNodes[1].innerText = nombres[5].innerText;
    //nacimiento
    partrs[0].getElementsByTagName('label')[1].childNodes[1].innerText = fe_da[0];
    //email
    partrs[0].getElementsByTagName('label')[3].childNodes[2].innerText = datos[1];
    //create
    partrs[1].getElementsByTagName('label')[0].childNodes[1].innerText = fe_da[1];
    //update
    if(fe_da[2]=='undefined')
        partrs[1].getElementsByTagName('label')[1].childNodes[1].innerText = 'Sin Modificación';
    else
        partrs[1].getElementsByTagName('label')[1].childNodes[1].innerText = new Date(fe_da[2]);
    //$('#myModal12 .modal-body x').html(datos[1]);
    $('#myModal12 .modal-header h5 x').html(" "+nombres[6].innerText);
    //$('#myModal12 .modal-body p').html(this.getAttribute('descqw'));
    if(datos[0] == '1'){
        //$('#myModal12 .modal-header').css({'background':'rgba(233, 30, 99, 0.6)'});
        $('#myModal12 .modal-header').css('background','#263238');
        partrs[0].getElementsByTagName('label')[2].childNodes[1].innerText = 'Femenino';
    }
    else{
        $('#myModal12 .modal-header').css('background','#263238');
        partrs[0].getElementsByTagName('label')[2].childNodes[1].innerText = 'Masculino';
    }
}

function btn_b() {
    console.log(this.getElementsByTagName('i')[0].className);
    var cuall = this.getElementsByTagName('i')[0].className;
    if(cuall=="fa fa-search tama_ico"){
        if($('#buscar_ui').css('display')=='none'){
            $('#buscar_ui').css('display','block');
            setTimeout(function(){
                $('#buscar_ui').css('opacity','1');
            },100);
            $('#sub_cate').html(': Buscar');
            this.style.background = '#3c4858';
            this.style.color = 'white';
        }
        else{
            $('#buscar_ui').css('display','none');
            $('#buscar_ui').css('opacity','0');
            /*setTimeout(function(){
                $('#buscar_ui').css('display','none');
            },200);*/
            $('#sub_cate').html('');
            this.style.background = 'transparent';
            this.style.color = '#3C4858';
        }
    }else{
        if(cual="fa fa-cog tama_ico"){

        }else{

        }
    }
}
var cual;
function atrasseme() {
    $('#myModal11 .modal-body .app-container').css('display','none');
    $('#myModal11 #errornews').css('display','none');
    $('#myModal11 #semini').css('display','none');
    $('#myModal11 #nuevosem').css('display','block');
    var fechas = $('#midato').attr('jala');
    var anteq = cual.innerText;
    cual.parentElement.getElementsByTagName('input')[0].attributes[1].value = fechas;
    cual.innerText = fechas;
    if(cual.getAttribute('segundo')=="0"){
        console.log('hola');
        var diafin = new Date(fechas);
        var anterior = cual.parentElement.parentElement.parentElement.getElementsByTagName('h3')[0].innerText;
        var diaini = new Date(anterior);
        console.log(diaini);
        console.log(diafin);
        if((diafin-diaini)<0){
            console.log('error fecha inicio menor a fin');
            cual.parentElement.parentElement.parentElement.getElementsByTagName('h3')[0].innerText = fechas;
            cual.parentElement.parentElement.parentElement.getElementsByTagName('input')[0].attributes[1].value = fechas;
        }
    }
    else{
        var dianew = new Date(fechas);
        var finn1 = cual.parentElement.parentElement.parentElement.getElementsByTagName('h3')[1].innerText;
        var diafin = new Date(finn1);
        //var diante = new Date(anteq);
        console.log('estamos aquí');
        if(anteq!="" && diafin!=""){
            console.log('estamos aquí 1');
            if((diafin - dianew)<0){
                console.log('error fecha inicio mayor a fin');
                cual.parentElement.parentElement.parentElement.getElementsByTagName('h3')[1].innerText = fechas;
                cual.parentElement.parentElement.parentElement.getElementsByTagName('input')[1].attributes[1].value = fechas;
            }
        }
    }
    /*$('.tufec').attr('value',fechas);
    cual.attributes[1].value = fechas*/
    console.log(cual.attributes.value);
}
function showfecha() {
    cual = this;
    $('#myModal11 .modal-body .app-container').css('display','block');
    $('#myModal11 #errornews').css('display','none');
    $('#myModal11 #semini').css('display','none');
    $('#myModal11 #nuevosem').css('display','none');
}

function shownotas() {
    if(this.parentElement.getElementsByClassName('notq')[0].style.display == 'none'){
        $('#myModal11 #notas').css('display','block');
        $('#myModal11 #nuevosem #notas .otroc').addClass('valiz');
        this.innerText = "-";
        $(this).css('padding-top','2px');
        //$('#masnotas1').css({'transform':'translateX(10px)','font-size':'15px'});
        $('#masnotas').css('transform','rotate(400grad)');
        $('#myModal11 #con_notas').attr('value','1');
    }
    else{
        $('#myModal11 #notas').css('display','none');
        $('#myModal11 #nuevosem #notas .otroc').removeClass('valiz');
        this.innerText = "+";
        $(this).css('padding-top','4px');
        //$('#masnotas1').css({'transform':'translateX(0px)','font-size':'14px'});
        $('#masnotas').css('transform','rotate(0grad)');
        $('#myModal11 #con_notas').attr('value','0');
    }
}

function agregarsemest() {
    $.getJSON('/semestreveri',function(data){
        console.log(data);
        if(data.sepuede==true){
            $('#myModal11 .modal-header h4').html(data.menja);
            $('#myModal11 #errornews').css('display','none');
            $('#myModal11 #semini').css('display','none');
            $('#myModal11 #nuevosem').css('display','block');
            $('#myModal11 #nuevosem .otroc').attr('value',"");
            $('#myModal11 #cual_semestre').attr('value',data.menja);

        }
        else{
            var mmmk = '<p style="text-align:center;"> <strong style="color:red;">ERROR</strong> no puedes crear un nuevo semestre.</p> Último semestre creado el <strong> '+new Date(data.fecha_cre)+"</strong>";
            $('#myModal11 #errornews').css('display','block');
            $('#myModal11 #errornews').html(mmmk);
            $('#myModal11 #semini').css('display','none');
            $('#myModal11 #nuevosem').css('display','none');
            $('#myModal11 #cual_semestre').attr('value','error');
        }
    });
}


function showlog() {
   console.log(this.parentElement.parentElement.getElementsByTagName('td'));
   var filaxx = this.parentElement.parentElement.getElementsByTagName('td');
   $('#myModal4 .modal-header h5 x').html(filaxx[3].innerText);
   $('#myModal4 .modal-body h4').html(filaxx[2].innerText);
   $('#myModal4 .modal-body p').html(filaxx[4].innerText);
   $('#myModal4 .modal-body x').html(filaxx[1].innerText);
   //$('#myModal4 .modal-body h4').css('color',filaxx[0].style.background);
}

function editProfe() {
    $('#myModal3 #alertaedit').css("display",'none');
    $('#myModal3 #editdocen').attr('action','/personal/'+this.getAttribute('dni'));
    var datos = this.parentElement.getElementsByTagName('a')[0];
    //console.log(this.parentElement.getElementsByTagName('a'));
    //console.log(datos);
    var imagen = $('#myModal3 .modal-header div');
    imagen[0].style.backgroundImage = 'url('+this.parentElement.parentElement.getElementsByClassName('modiimg')[0].getAttribute('src')+')';
    var nombres = this.parentElement.parentElement.getElementsByTagName('td');
    $('#myModal3 #titudoce').html(nombres[2].innerText+" "+nombres[3].innerText);
    var infodoc = $('#myModal3 #editdocen .valiz');
    var redesfgt = datos.getAttribute('redqw').split(';');
    var compri = datos.getAttribute('genqwma').split('&&');
    var arr_data = [nombres[2].innerText, nombres[3].innerText, datos.getAttribute('descqw'), compri[1], redesfgt[0], redesfgt[1], redesfgt[2]];
    for (var i = 0; i < infodoc.length; i++) {
        console.log(infodoc[i].parentElement);
        console.log(infodoc[i].parentElement.className);
        var classNamea = infodoc[i].parentElement.className;
        infodoc[i].parentElement.getElementsByClassName('control-label')[0].style.color = "#aaa";
        if(i==0 || i==1 || i==3){
            var resd = classNamea.split(' ');
            if(resd.length == 3){
                infodoc[i].parentElement.className = "form-group label-floating";
                //infodoc[i].parentElement.getElementsByClassName('control-label')[0].style.color = "#aaa";
            }
            console.log(resd.length);
        }
        if(i>=4){
            var resd = classNamea.split(' ');
            if(resd.length == 4){
                infodoc[i].parentElement.className = "input-group form-group label-floating";
                //infodoc[i].parentElement.getElementsByClassName('control-label')[0].style.color = "#aaa";
            }
            console.log(resd.length);
        }
        infodoc[i].value = arr_data[i];
    }
    var info = $('#myModal3 input[name=optionsRadios]');
        for (var i = 0; i < info.length; i++) {
            if(parseInt(compri[2]) == i){
                info[i].checked = "hola";
            }
    }
    var info = $('#myModal3 input[name=grupogenero]');
        for (var i = 0; i < info.length; i++) {
            if(parseInt(compri[0]) == i){
                info[i].checked = "hola";
            }
    }
}

//senn
function editDocc(){
    var jaja = this.getAttribute('joder');
    var datsss = jaja.split('イ');var tituloo = "";
        if(datsss[2]==2 || datsss[2]==3){
            $('#editdocc').attr('src','/documentos/file.jpg');
            $('#boooedit').css('display','inline-block');
            $('#boooedit').attr('href','/documentos/'+datsss[1]);
            if(datsss[2]==2){
                tituloo = "Prospecto ";
            }
            else{
                tituloo = "Balotario ";
            }
        }
        else{
            $('#editdocc').attr('src','/documentos/'+datsss[1]);
            $('#boooedit').css('display','none');
         
            if(datsss[2]==0){
                tituloo = "Cronograma de Admisión ";
            }
            else{
                tituloo = "Tabla de Vacantes ";
            }
        }
    $('#modificadocc').attr('action','/docc/'+datsss[0]);
    $('#tipppo').attr('value',datsss[2]);
    $('#alertaedit').css('display','none');
    $('#nombredit').html(tituloo + datsss[3].split('&&')[1].split('-')[2]);
    var Fechass = datsss[3].split('&&')[1].split('-');
    $('#Fechha').html("Última actualización "+Fechass[0]+"/"+Fechass[1]+"/"+Fechass[2]+" a las "+datsss[3].split('&&')[0]);
}


//Gt=>N-docc
function getDoccNew() {
    $.getJSON('/docc/create',function(data){
        console.log(data);
        $('#pruprudocc').attr('action',data.action);
        $('#alerta').css('display','none');
        $('#mostrardocc').attr('src','/documentos/file.jpg');
    });
}
//Show docc
function getDocc() {
    console.log(this);
        var jaja = this.getAttribute('jode');
        var datsss = jaja.split('イ');
        var tituloo = "";
        if(datsss[2]==2 || datsss[2]==3){
            $('#myModalevent #mostrardocc1').attr('src','/documentos/file.jpg');
            $('#myModalevent .card2').css({'width':'41.66666667%','margin-left':'29%'});
            //Pdf
            $('#myModalevent #booo').css('display','inline-block');
            $('#myModalevent #booo').attr('href','/documentos/'+datsss[0]);
            //
            if(datsss[2]==2){
                tituloo = "Prospecto ";
            }
            else{
                tituloo = "Balotario ";
            }
        }
        else{
            //Img
            $('#mostrardocc1').attr('src',this.getAttribute('src'));
            $('#myModalevent .card2').css({'width':'100%','margin-left':'0%'});
            //Pdf
            $('#myModalevent #booo').css('display','none');

            if(datsss[2]==0){
                tituloo = "Cronograma de Admisión ";
            }
            else{
                tituloo = "Tabla de Vacantes ";
            }
        }
        //Date
        //$('#myModalevent .modal-body .tiempxx').html(datsss[1].split('&&')[1]+" "+datsss[1].split('&&')[0]);
        var Fechass = datsss[1].split('&&')[1].split('-');
        $('#myModalevent .modal-body .tiempxx').html("Última actualización "+Fechass[0]+"/"+Fechass[1]+"/"+Fechass[2]+" a las "+datsss[1].split('&&')[0]);
        //Title
        $('#titutudocc').html(tituloo + datsss[1].split('&&')[1].split('-')[2]);
}

function setRequi() {
    var jaja = this.getAttribute('joder');
    $.getJSON(jaja,function(data){
        $('#RequiiiUpda').attr('action',data.action);
        $('#updatere').html(''+data.personaje.descri);
        var sele = data.personaje.tipo;
        var info = $('#RequiiiUpda input[name=optionsRadios]');
        for (var i = 0; i < info.length; i++) {
            if(sele == i){
                info[i].checked = "hola";
            }
        }
    });
}

function getRequiNew() {

    console.log('Obten por AJAX 2');
    
    $.getJSON('/requisito/create2',function(data){
        $('#Requiii').attr('action',data.action);
    });
}
function getRequi() {
    var jaja = this.getAttribute('joder');
    $.getJSON(jaja,function(data){
        $('#Remera').html(''+data.descri);
        var sele = data.tipo;
        var info = $('#Requiii1 input[name=optionsRadios]');
        for (var i = 0; i < info.length; i++) {
            if(sele == i){
                info[i].checked = "hola";
            }
        }
    });
}


function getProfe() {
    var imagen = $('#myModal2 .modal-header div');
    imagen[0].style.backgroundImage = 'url('+this.parentElement.parentElement.getElementsByClassName('modiimg')[0].getAttribute('src')+')';
    var nombres = this.parentElement.parentElement.getElementsByTagName('td');
    $('#titutu').html(nombres[2].innerText+" "+nombres[3].innerText);
    var datos = this.getAttribute('genqwMa').split('&&');
    var tiposi = ['Piano','Clarinete','Violin','S',]
    $('#myModal2 .modal-body x').html(datos[1]);
    $('#myModal2 .modal-header h5 x').html(tiposi[parseInt(datos[2])]);
    $('#myModal2 .modal-body p').html(this.getAttribute('descqw'));
    if(datos[0] == '1'){
        $('#myModal2 .modal-header').css({'background':'rgba(233, 30, 99, 0.6)'});
    }
    else{
        $('#myModal2 .modal-header').css('background','#263238')
    }
}

function getProfe2() {
    $('.showimg').attr('src',this.getAttribute('src'));
    $('#modificaimg').attr('action','/persona/' + this.getAttribute('mioqw'));
    $('#nombreee').html(this.parentElement.parentElement.getElementsByClassName('name')[0].innerText);
}

function getProfeNew() {
    $('#myModal8 #imagen').attr('name','pho');
    $('#filtro1').removeClass('sinaccion');
    $('#mostrar1').attr('src','/avatar/hombre.png');
    //$('#myModal8 #nombrefil').css('color','white');
    $('#myModal8 #alerta2').css("display",'none');
    $('#prupru input[name=nombre]').attr('value',"");
    $('#prupru input[name=apellido]').attr('value',"");
    $('#prupru input[name=ema]').attr('value',"");
    $('#prupru input[name=face]').attr('value',"");
    $('#prupru input[name=goo]').attr('value',"");
    $('#prupru input[name=twwi]').attr('value',"");
    $('#prupru').attr('enctype','hola');
}
