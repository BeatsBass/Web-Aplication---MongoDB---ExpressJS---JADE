var multer = require('multer');
var fs = require('fs');
var moment = require('moment'); 

var Documen;
exports.setModel = function(modelo){
	Documen = modelo;
};
exports.index = function(req, res){
	Documen.find({}, function(error, documento){
		if(error){
			res.send('Ha surgido un error.');
		}else{
			res.render('indexd', {
				message:"",
				documento: documento
			});
		}
	})
};

exports.create2 = function(req, res){
	var profe = {
		action: '/docc/',
		personal: new Documen({
			foto: '',
			fecha: '',
			tipo: 0
		})
	}
	res.json(profe);
};


exports.update2 = function(req, res){
	var fotoNombre ="";
	var storage = multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, '../public/documentos');
	  },
	  filename: function (req, file, callback) {
	    var reeee = req._startTime+"";
	    var sera = reeee.split(' ');
	    var aux = sera[4].split(':');
	    fotoNombre = aux[0]+aux[1]+aux[2];
	    fotoNombre = fotoNombre+file.originalname;
	    callback(null,fotoNombre)
	  }
	});
	var upload = multer({storage: storage}).single('photo1');
	upload(req, res, function(err) {
		if(err) {
		    res.redirect('/docc');
		    return;
	  	}
	  if(fotoNombre == ""){
	  	res.redirect('/docc');
	  }
	  else{
	  	Documen.findById(req.params.id, function(error, documento){
	  		if(error){
				res.send('Error al intentar modificar el personaje.');
			}else{
				var ahora = moment().utc();
				var fecccha = ahora.format("h:mm:ss a")+"&&"+ahora.format("D-M-YYYY");
				var AntesFoto = documento.foto;

				var personaje = documento;
				personaje.foto = fotoNombre;
				personaje.fecha = fecccha;
				personaje.save(function(error, documento){
					if(error){
						res.send('Error al intentar guardar el personaje.');
					}else{
							var linkk = '../public/documentos/'+AntesFoto;
							fs.unlink(linkk,function (err){
							    if(err){
							    	res.redirect('/docc');
							    }
							    else{
							    	res.redirect('/docc');
							    }
							});

					}
				});
			}
	  	});

	  }
	});

};
exports.valida = function(req,res){
	var fech_docc = moment().get('year');
	var esval = true;
	var valores = ['Cronograma de Admisión','Vacantes','Prospecto','Balotario'];
	var lafecha = "";

	console.log("el tipo "+req.params.tipo);

	Documen.find({ 'tipo' :  req.params.tipo }, function(err, documento) {
	    // if there are any errors, return the error
	    if (err){
	        res.send('Error al buscar');
	    }
	    var tamaa = documento.length;
	    console.log("el tamaño es"+tamaa);
	    if(tamaa > 3){
	    	res.json("Error: No Puede Agregar Más");
	    }
	    else{
	    	for (var i = 0; i < documento.length; i++) {
	    		var aan = documento[i].fecha.split('&&')[1].split('-')[2];
	    		console.log("fecha de documento "+fech_docc);
	    		console.log("fecha de o "+aan);
	    		if(fech_docc == aan){
	    			esval = false;
	    			lafecha = documento[i].fecha.split('&&')[1] + " " +documento[i].fecha.split('&&')[0];
	    			break;
	    		}
	    	}
	    	if(esval){
	    		res.json("true");
	    	}
	    	else{
	    		res.json("Error: Solo Un Documento Al Año o Puede Actualizar el Documento "+valores[documento[0].tipo]+". Última Actualización realizada el "+lafecha);
	    	}
	    }
    }); 
}



exports.store = function(req, res){
	var fotoNombre ="";
	var storage = multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, '../public/documentos');
	  },
	  filename: function (req, file, callback) {
	    var reeee = req._startTime+"";
	    var sera = reeee.split(' ');
	    var aux = sera[4].split(':');
	    fotoNombre = aux[0]+aux[1]+aux[2];
	    fotoNombre = fotoNombre+file.originalname;
	    callback(null,fotoNombre)
	  }
	});
 	var upload = multer({storage: storage}).single('photo');
 	upload(req, res, function(err) {
	  if(err) {
	    console.log('Error Occured');
	    return;
	  }
	  if(fotoNombre == ""){
	  	 res.redirect('/docc');
	  }
	  else{
	  		var categg = parseInt(req.body.optionsRadios1);
			var ahora = moment().utc();
			var fecccha = ahora.format("h:mm:ss a")+"&&"+ahora.format("D-M-YYYY");

			var personaje = new Documen({
						foto : fotoNombre,
						fecha: fecccha,
						tipo: categg
			});
			console.log(personaje);
			personaje.save(function(error, documento){
						if(error){

							res.send('Error al intentar guardar el personaje.');
						}else{	
							res.redirect('/docc');
						}
			});
		}
	  })
};


exports.destroy = function(req, res){
	Documen.findById(req.params.id, function(error, documento){
	  		if(error){
				res.send('Error al intentar modificar el personaje.');
			}else{
				var AntesFoto = documento.foto;
				Documen.remove({_id: req.params.id}, function(error){
					if(error){
						res.send('Error al intentar eliminar el personaje.');
					}else{
						var linkk = '../public/documentos/'+AntesFoto;
						fs.unlink(linkk,function (err){
							if(err){
								res.redirect('/docc');
							}
							else{
								res.redirect('/docc');
							}
						});
					}
				});
			}
	});
};


exports.getDocc = function(req, res){
	Documen.find({ 'tipo' :  req.params.tipo }, function(err, documento) {
	    // if there are any errors, return the error
	    if (err){
	        res.send('Error al buscar');
	    }
	    res.json(documento);
    }); 
};