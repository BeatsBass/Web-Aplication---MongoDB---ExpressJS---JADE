var moment = require('moment');  
var Semestre;

exports.setModel = function(modelo){
	Semestre = modelo;
};

exports.index = function(req, res){
	Semestre.find({}).sort('-_id').exec(function(error, personal) {
		if(error){
			res.send('Ha surgido un error.'+error);
		}else{
			res.render('indexsem', {
				logeve: personal
			});
		}
	});
};

exports.verifica = function(req, res){
	Semestre.find({}).exec(function(error, personal) {
		if(error){
			res.send('Ha surgido un error.'+error);
		}else{
			if(personal.length==0){
				var fegj = moment();
				var envio = {
					sepuede  : true,
					menja    : fegj.get('year')+'-I'
				}
				res.json(envio);
			}
			else{
				Semestre.aggregate([
			        { $match:
			          {
			            activox:true
			          } 
			        },
			        { $project:{
			            fecha_cre:1
			          }
			        }
				], function (err, result) {
				    if (err) {
				        console.log(err);
				    }
				    else{
				    	var semeac = result[0]._id;
				    	var etapa =semeac.split('-');
				    	var fecha = moment();
				    	var mensaje = "";
				    	var valido;
				    	if(fecha.get('month')==2){
				    		if(etapa[1] == 'I'){
				    			valido = false;
				    		}
				    		else{
				    			if(fecha.getFullYear == semeac[0])
				    				valido = false;
				    			else{
				    				var yearnex = parseInt(semeac[0]) + 1;
				    				if(yearnex == fecha.get('year')){
				    					valido = true;
				    					mensaje = fecha.get('year') + '-I';
				    				}
				    				else
				    					valido = false;
				    			}
				    		}
				    	}
				    	else{
				    		if(fecha.get('month')==7){
				    			if(etapa[1] == 'II'){
					    			valido = false;
					    		}
					    		else{
					    			if(fecha.getFullYear == semeac[0]){
					    				valido = true;
					    				mensaje = fecha.get('year') + '-II';
					    			}
					    			else
					    				valido = false;
					    		}
				    		}
				    		else
				    			valido = false;
				    	}

				    	var envio = {
				    		fecha_cre: result[0].fecha_cre,
				    		sepuede  : valido,
				    		menja    : mensaje
				    	}
				    	res.json(envio);
				    }
				});
			}
		}
	});
};

exports.store = function(req, res){
	console.log(req.body);
	var costo = parseInt(req.body.costo);
	if(req.body.cual_semestre!='error'){
		if(req.body.con_notas=="0"){
			var personaje = new Semestre({
				_id:req.body.cual_semestre,
			    costo_credi:costo,
			    configuracion:{
			      matriculas: {
			        fecha_ini:req.body.matri_ini,
			        fecha_fin:req.body.matri_fin
			      }
			    }
			});
		}
		else{
			var personaje = new Semestre({
				_id:req.body.cual_semestre,
			    costo_credi:costo,
			    configuracion:{
			      matriculas: {
			        fecha_ini:req.body.matri_ini,
			        fecha_fin:req.body.matri_fin
			      },
			      notas: {
			        nota1:{
			          fecha_ini:req.body.nota1_ini,
			          fecha_fin:req.body.nota1_fin,
			        },
			        nota2:{
			          fecha_ini:req.body.nota2_ini,
			          fecha_fin:req.body.nota2_fin,
			        },
			        nota3:{
			          fecha_ini:req.body.nota3_ini,
			          fecha_fin:req.body.nota3_fin,
			        },
			        nota_sus:{
			          fecha_ini:req.body.notasus_ini,
			          fecha_fin:req.body.notasus_fin,
			        }
			      }
			    }
			});
		}
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
				res.redirect('/semestre');
			}
		});
	}
	else{
		res.redirect('/semestre')
	}
};