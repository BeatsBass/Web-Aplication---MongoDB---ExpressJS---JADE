function read(input) {
	if(input.files && input.files[0]){
		if(input.files[0].type.split("/")[0] == "image"){
			$('#filtro1').removeClass('sinaccion');
			$('#myModal8 #alerta2').css("display",'none');
			$('#myModal8 #imagen').attr('name','photos');
			//$('#myModal8 #nombrefil').css('color','#3C4863');
			$('#prupru').attr('enctype','multipart/form-data');
			var reader = new FileReader();
			reader.onload = function(e){
				$('#mostrar1').attr('src',e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
		else{
			console.log('error');
			$('#filtro1').addClass('sinaccion');
			$('#myModal8 #imagen').attr('name','pho');
			//console.log($('#myModal8 #imagen'));
			$('#myModal8 #alerta2').css('display','block');
			//$('#myModal8 #imagen').css('color','#3C4863');
		}
	}
}
$("#imagen").change(function () {
	read(this);
});
function read2(input) {
	if(input.files && input.files[0]){
		console.log(input.files[0]);
		if(input.files[0].type.split("/")[0] == "image"){
			$('#filtro').removeClass('sinaccion');
			var peso =parseInt(input.files[0].size)/1024/1024;

			//Limitar tamaño de archivo
			if(parseInt(input.files[0].size) >1024 * 1024 * 2){
				$('#filtro').addClass('sinaccion');
				$('#myModal200 #alertimageinfo').removeClass('alert-success');
				$('#myModal200 #alertimageinfo').addClass('alert-warning');
				var mensaje = "<x style='font-size:1.5em;'>⚠</x> <br> El archivo <strong>"+input.files[0].name+ "</strong> supera los 2MB <strong> Size: "+ peso.toFixed(2)+"MB</strong>";
			}
			else{
				$('#myModal200 #alertimageinfo').addClass('alert-success');
				$('#myModal200 #alertimageinfo').removeClass('alert-warning');
				$('#filtro').removeClass('sinaccion');
				var mensaje = "<x style='font-size:1.5em;'>✔</x> <br> El archivo <strong>"+input.files[0].name+ "</strong> es válido <strong>"+ peso.toFixed(2)+"MB</strong>";
			}

			//var mensaje = "<x style='font-size:1.5em;'>✔</x> <br> El archivo <strong>"+input.files[0].name+ "</strong> es válido <strong>"+ peso.toFixed(2)+"MB</strong>";
			$('#myModal200 #alertimageinfo').css("display",'block');
			$('#myModal200 #alertimageinfo').html(mensaje);

			$('#myModal200 #alertimage').css("display",'none');
			var reader = new FileReader();
			reader.onload = function(e){
				$('#mostrar2').attr('src',e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
		else{
			$('#myModal200 #alertimageinfo').css("display",'none');
			var mensaje = "<x style='font-size:1.5em;'>⚠</x> Error !!<br> El archivo <strong>"+input.files[0].name+ "</strong> es de tipo <strong>"+ input.files[0].type.split("/")[0]+"</strong>";
			$('#filtro').addClass('sinaccion');
			$('#myModal200 #alertimage').css("display",'block');
			$('#myModal200 #alertimage').html(mensaje);
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


/*$('.pppdf').on('click',function(){
	var jaja = this.getAttribute('joder');
	window.open(jaja,'_blank')
})*/