var moment = require('moment');  
var Asignatura;

exports.setModel = function(modelo){
	Asignatura = modelo;
};

//------------------------------ Administrador ------------------------------

//Read*****************************
//Todas las asignaturas
exports.index = function(req, res){
	Asignatura.find({}).sort('-_id').exec(function(error, personal) {
		if(error){
			res.send('Ha surgido un error.'+error);
		}else{
			res.render('indexsem', {
				logeve: personal
			});
		}
	});
};
//Asignaturas x carrera
exports.index_c = function(req, res){
	var carrera = req.params.carrera;
	var carrera = req.body.carrera;
	Asignatura.find({}).where('carrera').equals(carrera).sort('-_id').exec(function(error, personal) {
		if(error){
			res.send('Ha surgido un error.'+error);
		}else{
			res.render('indexsem', {
				logeve: personal
			});
		}
	});
};

//Create***************************
//Validar nueva asignatura
exports.valida_asig = function(req, res){
	console.log(req.params);
	Asignatura.find({
    	enlaze:req.params.enlazex,
    	nombre:req.params.nombre
  	}).exec(function(err, docs) {
		if(err){
			res.send('Ha surgido un error.');
		}else{
			res.json(docs.length);
		}		  	
	});
};

//Crear asigntura
exports.store = function(req, res){
	console.log(req.body);
	var costo = parseInt(req.body.costo);
	var abrec = req.body.cursos;
	if(req.body.cual_semestre!='E'){

		var cred = parseInt(req.body.creditos);
		var enla = req.body.codigo+" "+req.body.carrera;
		var personaje = new Asignatura({
			cod_asignatura:codigo,
		    cod_carrera:req.body.carrera,
		    enlaze:enla,
		    nombre:req.body.nombre,
		    categoria:req.body.categoria,
		    creditos:cred
		});
		console.log(personaje);
		personaje.save(function(error, documento){
			if(error){
				res.send('Error, Contáctate con el Administrador');
			}else{	
				//Version log
				/*var newLogEvent = new LogEvent();	
				newLogEvent.tipolog = 0;
				newLogEvent.userlog = "Administrador";
				newLogEvent.descri = "Nuevo Docente id= "+tudni+", Nombre= "+nombreh+", Email= "+ema1;
				newLogEvent.save(function(error, documento){
					if(error){
						res.send('Error al intentar guardar el personaje.');
					}else{
						res.redirect('/personal');
					}
				});*/

				//Version sin log
				//res.redirect('/semestre');
				Asignatura.findOne({'_id':personaje._id}).select('abre').exec(function(err, docs) {
					  	//agregando un evneto al array
					for (var i = 0; i < abrec.length; i++) {
					 	docs.abre.push({ 
						     _id:abrec[i]
						});
					}
					docs.save(function (err, doc) {
					    if(err){
							res.send('Error al abre curso');
						}else{
							console.log(doc);
							res.redirect('/semestre');
						}
					});
				});
			}
		});
	}
	else{
		res.redirect('/semestre')
	}
};
//Update***************************


//------------------------------ Docente ------------------------------