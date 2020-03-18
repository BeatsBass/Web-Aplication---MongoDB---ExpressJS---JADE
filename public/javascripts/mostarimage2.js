function read1(input) {
	if(input.files && input.files[0]){
		console.log(input.files[0]);
		if(input.files[0].type.split("/")[0] == "image"){
			$('#filtro1').removeClass('sinaccion');
			$('#alerta').css('display','none');
			var reader = new FileReader();
			reader.onload = function(e){
				$('#mostrarimg').attr('src',e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
		else{
			$('#filtro1').addClass('sinaccion');
			$('#alerta').css('display','block');
		}
	}
}
$("#imagen").change(function () {
	read1(this);
});

function read(input) {
	if(input.files && input.files[0]){
		console.log(input.files[0]);
		$("#photow").attr('name','photo');
		if(input.files[0].type.split("/")[0] == "image"){
			$('#filtrow').removeClass('sinaccion');
			$('#alertaw').css('display','none');
			var reader = new FileReader();
			reader.onload = function(e){
				$('#imashow').attr('src',e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
		else{
			$('#filtrow').addClass('sinaccion');
			$('#alertaw').css('display','block');
		}
	}
}
$("#photow").change(function () {
	this.parentNode.parentNode.getElementsByClassName('file-path-wrapper')[0].style.color = "#3C4858";
	read(this);
});
$("#photow1").change(function () {
	this.parentNode.parentNode.getElementsByClassName('file-path-wrapper')[0].style.color = "#3C4858";
	$("#photow1").attr('name','photo');
});


function read2(input) {
	if(input.files && input.files[0]){
		console.log(input.files[0]);
		if(input.files[0].type.split("/")[0] == "image"){
			$('#myModal5 #imgtextqw').css('color','#3C4858');
			$('#filtroimgqw').removeClass('sinaccion');
			$('#alertaimgg').css('display','none');
			$("#setimg").attr('name','photo');
			var reader = new FileReader();
			reader.onload = function(e){
				$('#cbimgqw').attr('src',e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
		else{
			$('#filtroimgqw').addClass('sinaccion');
			$('#alertaimgg').css('display','block');
		}
	}
}
$("#setimg").change(function () {
	read2(this);
});
/*
function read2(input) {
	if(input.files && input.files[0]){
		console.log(input.files[0]);
		if(input.files[0].type.split("/")[0] == "image"){
			$('#filtro').removeClass('sinaccion');
			var reader = new FileReader();
			reader.onload = function(e){
				$('#mostrar2').attr('src',e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
		else{
			$('#filtro').addClass('sinaccion');
		}
	}
}
$("#imagen1").change(function () {
	read2(this);
});

function read4(input) {
	var tipo = $('#tipppo').attr('value');
	var soloimg = false;
	if(tipo == 0 || tipo ==1){
		soloimg = true;
	}
	if(input.files && input.files[0]){
		console.log(input.files[0]);
		if(input.files[0].type.split("/")[0] == "image"){
			if(soloimg){
				$('#alertaedit').css('display','none');
				$('#filtroe').removeClass('sinaccion');
				var reader = new FileReader();
				reader.onload = function(e){
					$('#editdocc').attr('src',e.target.result);
				}
				reader.readAsDataURL(input.files[0]);
			}
			else{
				$('#alertaedit').css('display','block');
				$('#alertaedit').html("Error: Solo se permite archivos PDF");
			}
		}
		else{
			if(input.files[0].type.split("/")[1] == "pdf"){
				if(soloimg){
					$('#alertaedit').css('display','block');
					$('#alertaedit').html("Error: Solo se permite archivos de tipo imagen");
				}
				else{
					$('#editdocc').attr('src','/documentos/file.jpg');
					$('#alertaedit').css('display','none');
					$('#filtroe').removeClass('sinaccion');
				}
			}
			else{
				$('#filtroe').addClass('sinaccion');
				$('#alertaedit').css('display','block');
				$('#alertaedit').html("Error: Archivo no permitido");
			}
		}
	}
}
$("#imagen1e").change(function () {
	read4(this);
});

function read3(input) {
	if(input.files && input.files[0]){
		console.log(input.files[0]);
		if(input.files[0].type.split("/")[0] == "image" || input.files[0].type.split("/")[1] == "pdf"){
			$('#filtrodocc').removeClass('sinaccion');
			if(input.files[0].type.split("/")[0] == "image"){

				$('#tipo0').removeAttr('disabled','checked');$('#lala0').css('color','#000');
				$('#tipo1').removeAttr('disabled','checked');$('#lala1').css('color','#000');

				$('#tipo2').attr('disabled','true');$('#tipo2').removeAttr('checked');$('#lala2').css('color','#aaa');
				$('#tipo3').attr('disabled','true');$('#tipo3').removeAttr('checked');$('#lala3').css('color','#aaa');
				var reader = new FileReader();
				reader.onload = function(e){
					$('#mostrardocc').attr('src',e.target.result);
				}
				reader.readAsDataURL(input.files[0]);
			}
			else{
				$('#mostrardocc').attr('src','/documentos/file.jpg');
				$('#tipo2').removeAttr('disabled','checked');$('#lala2').css('color','#000');
				$('#tipo3').removeAttr('disabled','checked');$('#lala3').css('color','#000');

				$('#tipo0').attr('disabled','true');$('#tipo0').removeAttr('checked');$('#lala0').css('color','#aaa');
				$('#tipo1').attr('disabled','true');$('#tipo1').removeAttr('checked');$('#lala1').css('color','#aaa');
			}
		}
		else{
			$('#filtrodocc').addClass('sinaccion');
			$('#tipo0').attr('disabled','true');$('#tipo0').removeAttr('checked');$('#lala0').css('color','#aaa');
			$('#tipo1').attr('disabled','true');$('#tipo1').removeAttr('checked');$('#lala1').css('color','#aaa');
			$('#tipo2').attr('disabled','true');$('#tipo2').removeAttr('checked');$('#lala2').css('color','#aaa');
			$('#tipo3').attr('disabled','true');$('#tipo3').removeAttr('checked');$('#lala3').css('color','#aaa');
		}
	}
}
$("#imagendocc").change(function () {
	read3(this);
});
*/


/*$('.pppdf').on('click',function(){
	var jaja = this.getAttribute('joder');
	window.open(jaja,'_blank')
})*/