var moment = require('moment');  
var User = require('./Usuario');
var Alumno;

exports.setModel = function(modelo){
	Alumno = modelo;
};

//------------------------------ Administrador ------------------------------
//Todos los alumnos
exports.index = function(req, res){
	Alumno.find({}).sort('ap').select('ap am nombre carrera dni ema foto fecha_na genero fecha_cre fecha_upd').exec(function(error, personal) {
      if(error){
        console.log('Ha surgido un error.'+error);
      }else{
        	res.render('indexalu', {
				personal: personal
			});
      }
    });
};

//Solo alumnos de una carrera
exports.index_car = function (req, res) {
	var carrera = req.params.carrera;
	var carrera = req.body.carrera;
	Alumno.find({}).where('carrera').equals(carrera).sort('-ap').exec(function (error, personal) {
		if(error){

		}
		else{

		}
	});
};

//Validar nuevo alumno
exports.validauser = function(req, res){
	console.log(req.params);
	Alumno.find({
    	ema: req.params.mail,
    	dni:req.params.dni
  	}).select('nombre').exec(function(err, docs) {
		if(err){
			res.send('Ha surgido un error.');
		}else{
			res.json(docs.length);
		}		  	
	});
};

//Create nuevo alumno
exports.store = function(req, res){
	var newUser = new User();
	var user_nombre = req.body.nombre.split(' ');
	var fotoal = "";
	if(generox==0)
		fotoal = "hombre.png";
	else
		fotoal = "mujer.png";
	var temp = "";
	for (var i = 0; i < user_nombre.length; i++) {
		temp = temp + user_nombre[i];
	}
	newUser.local.email    = req.body.ema;
	newUser.local.password = newUser.generateHash(temp);
	newUser.local.nombre   = req.body.nombre + "&&" +req.body.ap + " " +req.body.am;
	newUser.local.foto	   = fotoal;//Será para el numero de créditos
	newUser.tipo = "alumno";
	newUser.tipoalumno.creditos = 0;

	newUser.save(function(err) {
	    if (err){
	    	res.send('Error, Nivel => User - Alumno');
	    }
	    else{	
	    	console.log(req.body);
	    	var generox = parseInt(req.body.grupogenero);

			var personaje = new Alumno({
				_id:newUser._id,
			    dni:req.body.dni,
			    ema:req.body.ema,
			    foto: fotoal,
			    nombre: req.body.nombre,
			    ap: req.body.ap,
			    am: req.body.am,
			    fecha_na:req.body.fecha_na,
			    genero:generox,
			    carrera:req.body.grupocarrera,
			});
			console.log(personaje);
			personaje.save(function(error, documento){
				if(error){
					res.send('Error, Nivel => Alumno');
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
					res.redirect('/alumno');
				}
			});
	    }
	});
};

// Update alumno
// Delete alumno (desactivar ingreso por medio de documento => User)


//Buscar alumno
exports.busca_al = function (req ,res) {
	/*console.log('jaja');
	console.log(req.body);
	res.json('hola');*/
	var modo_busqueda = req.body.mo_bus;
    var busca = req.body.buscar;

    if(req.body.dos == ""){
	    Alumno.find({}).where(modo_busqueda).equals(busca).sort('-ap').select('ap am nombre carrera dni ema foto fecha_na genero fecha_cre fecha_upd').exec(function (error, personal) {
	      if(error){
	        console.log('Ha surgido un error.'+error);
	      }else{
	        res.json(personal);
	      }
	    });
	}
	else{
		var mmk = modo_busqueda.split(' ');
		var buscat = (req.body.buscar).split(' ');
		Alumno.find({}).where(mmk[0]).equals(buscat[0]).where(mmk[1]).equals(buscat[1]).sort('-ap').select('ap am nombre carrera dni ema foto fecha_na genero fecha_cre fecha_upd').exec(function (error, personal) {
	      if(error){
	        console.log('Ha surgido un error.'+error);
	      }else{
	        res.json(personal);
	      }
	    });
	}
	/*var modo_busqueda = req.body.modo;
	var busca = req.body.busca;
	Alumno.find({}).where(modo_busqueda).equals(busca).sort('-ap').exec(function (error, personal) {
		if(error){
			console.log(error);
		}
		else{
			res.json(personal);
		}
	});*/
};

//Resumen académico +
/*
	(Agregar gráficas con algun complemento o paquete js)
	Mostramos información + :

	Nivel 1 ---------
	* Promedio de cada semestre o total (con javascript obtenemos el total) (G ok) (1)
		Mostrar gráfica
		^
		| (y) = n° promedio
		|
		|
		|
		|
		|--------------------> (x) = semestres   => Computo total(*)

		Más info (muestra las notas en cada punto)
	* Cantidad de créditos acumulados. + if   user=alumno =>(get user - not query) (2)
										 else (query)
		h4 con estilo lateral.

	Nivel 2 ---------

	* Cantidad de créditos perdidos (con info de curso) x semestres + total. (query ajax despues de cargar)
		Mostrar gráfica
		^
		| (y) = Créditos perdidos.
		|
		|
		|
		|
		|--------------------> (x) = semestres   => Computo total(*)
	* Cantidad de créditos aprobados (con info de curso) x semestres + total. (query ajax despues de cargar)
		(similar anterior)
*/
//Nivel 1 --------------------------------
//Resumen(v. administrador) nivel 1
exports.resumenv1_n1 = function (req, res) {
	var identi = req.params.id;
	res.json(identi);
	//Promedio de tods los semestre v2
	/*AlumnoModel.aggregate([
        { $match:
          {
            _id:identi
          } 
        },
        { $unwind: '$matriculas'},
        { $lookup:{
            from: "cursos",
            localField: "matriculas.enlaze",
            foreignField: "enlaze",
            as: "cursos"
          }
        },
        { $unwind: {
            path :'$cursos'
          }
        },
        {$project:
          {
            nombre: '$nombre',
            nota: '$matriculas.nota',
            creditosx:'$cursos.creditos',
            semestre:'$matriculas.semestre'
          }
        },
        {$group: 
          {
            _id: {
              cod_alumno : '$_id',
              nombre : '$nombre',
              semestre:'$semestre'
            },
            totalcrts: {
                $sum: '$creditosx'
            },
            totalnts:{
              $sum: {
                $multiply : ['$creditosx','$nota']
              }
            }
          }
        },
        {$project:
          {
            promedio:{
              $divide: ['$totalnts','$totalcrts']
            },
            ponderado:{
              $cond:[
                {
                  $gte: [ {$divide: ['$totalnts','$totalcrts']}, 13 ]
                },
                1,
                0
              ]
            }
          }
        },
        {$project:
          {
            _id:0,
            semestre:'$_id.semestre',
            promedio:1,
            ponderado:1
          }
        },
        {$sort:{
            semestre: 1
          }
        }
    ], function (err, result) {
        if (err) {
          console.log(err);
        }
        else{
        	console.log(result);
        	AlumnoModel.aggregate([
		          { $match:
		            {
		              _id:identi
		            } 
		          },
		          { $unwind: {
		              path :'$matriculas',
		              preserveNullAndEmptyArrays: true
		            }
		          },
		          { $lookup:{
		              from: "cursos",
		              localField: "matriculas.enlaze",
		              foreignField: "enlaze",
		              as: "cursos"
		            }
		          },
		          { $unwind: {
		              path :'$cursos',
		              preserveNullAndEmptyArrays: true
		            }
		          },
		          {$project:
		            {
		              nombre: '$nombre',
		              nota: '$matriculas.nota',
		              creditpos:{
		                $cond:[
		                  {
		                    $gte: [ '$matriculas.nota', 11 ]
		                  },
		                  '$cursos.creditos',
		                  0
		                ]
		              }
		            }
		          },
		          {$group: 
		            {
		              _id: {
		                cod_alumno : '$_id',
		                nombre : '$nombre'
		              },
		              totalcreditoa: {
		                  $sum: '$creditpos'
		              }
		            }
		          },
		          {$project:
		            {
		              _id:0,
		              cdg_alumno:'$_id.cod_alumno',
		              nombrealumno:'$_id.nombre',
		              nrocreditos:'$totalcreditoa'
		            }
		          }
		    ], function (err, resultx) {
		        if (err) {
		          console.log(err);
		        }
		        else{
		            console.log(result);
		            console.log(result.length);
		            var dataxx = {
		            	data0:result,
		            	data1:resultx
		            };
		            res.json(dataxx);
		        }
		    });
        }
    });*/


	//v1
	/*Alumno.aggregate([
        { $match:
          {
            _id:identi
          } 
        },
        { $unwind: '$matriculas'},
        { $lookup:{
            from: "cursos",
            localField: "matriculas.enlaze",
            foreignField: "enlaze",
            as: "cursos"
          }
        },
        { $unwind: {
            path :'$cursos'
          }
        },
        {$project:
          {
            nombre: '$nombre',
            nota: '$matriculas.nota',
            creditosx:'$cursos.creditos',
            semestre:'$matriculas.semestre'
          }
        },
        {$group: 
          {
            _id: {
              cod_alumno : '$_id',
              nombre : '$nombre',
              semestre:'$semestre'
            },
            totalcrts: {
                $sum: '$creditosx'
            },
            totalnts:{
              $sum: {
                $multiply : ['$creditosx','$nota']
              }
            }
          }
        },
        {$project:
          {
            promedio:{
              $divide: ['$totalnts','$totalcrts']
            },
            ponderado:{
              $cond:[
                {
                  $gte: [ {$divide: ['$totalnts','$totalcrts']}, 13 ]
                },
                1,
                0
              ]
            }
          }
        },
        {$project:
          {
            _id:0,
            semestre:'$_id.semestre',
            promedio:1,
            ponderado:1
          }
        }
	], function (err, result) {
	    if (err) {
	    	console.log(err);
	    }
	    else{
	    	//get créditos
		  	Alumno.aggregate([
			        { $match:
			          {
			            _id:mongoose.Types.ObjectId(identi)
			          } 
			        },
			        { $unwind: {
			            path :'$matriculas',
			            preserveNullAndEmptyArrays: true
			          }
			        },
			        { $lookup:{
			            from: "cursos",
			            localField: "matriculas.enlaze",
			            foreignField: "enlaze",
			            as: "cursos"
			          }
			        },
			        { $unwind: {
			            path :'$cursos',
			            preserveNullAndEmptyArrays: true
			          }
			        },
			        {$project:
			          {
			            nombre: '$nombre',
			            nota: '$matriculas.nota',
			            creditpos:{
			              $cond:[
			                {
			                  $gte: [ '$matriculas.nota', 11 ]
			                },
			                '$cursos.creditos',
			                0
			              ]
			            }
			          }
			        },
			        {$group: 
			          {
			            _id: {
			              cod_alumno : '$_id',
			              nombre : '$nombre'
			            },
			            totalcreditoa: {
			                $sum: '$creditpos'
			            }
			          }
			        },
			        {$project:
			          {
			            _id:0,
			            cdg_alumno:'$_id.cod_alumno',
			            nombrealumno:'$_id.nombre',
			            nrocreditos:'$totalcreditoa'
			          }
			        }
			], function (err, result1) {
			    if (err) {
			    	console.log(err);
			    }
			    else{
			      	res.render('indexsem', {
						data1: result,
						data2: result1
					});
			    }
			});
	    }
	});*/
}

//Nivel 2 --------------------------------
//Ambos un query
exports.resumen_n2_amb =function (req, res) {
	var identi = req.params.id;
	Alumno.aggregate([
	    { $match:
	        {
	            _id:mongoose.Types.ObjectId(identi)
	        } 
	    },
	    { $unwind: {
	            path :'$matriculas',
	            preserveNullAndEmptyArrays: true
	        }
	    },
	    { $lookup:{
	            from: "cursos",
	            localField: "matriculas.enlaze",
	            foreignField: "enlaze",
	            as: "cursos"
	        }
	    },
	    { $unwind: {
	            path :'$cursos',
	            preserveNullAndEmptyArrays: true
	        }
	    },
	    {$project:
	        {
	            nota: '$matriculas.nota',
	            semestre: '$matriculas.semestre',
	            credito_a:{
	              $cond:[
	                {
	                  $gte: [ '$matriculas.nota', 11 ]
	                },
	                '$cursos.creditos',
	                0
	              ]
	            },
	            credito_d:{
	              $cond:[
	                {
	                  $lte: [ '$matriculas.nota', 10 ]
	                },
	                '$cursos.creditos',
	                0
	              ]
	            }
	        }
	    },
	    {$group: 
	       {
	            _id: {
	              cod_alumno : '$_id',
	              semestre :'$semestre'
	            },
	            totalcreditoapro: {
	                $sum: '$credito_a'
	            },
	            totalcreditodesapro: {
	                $sum: '$credito_d'
	            }
	        }
	    },
	    {$project:
	       {
	            _id:0,
	            semestre:'$_id.semestre',
	            nrocreditos_a:'$totalcreditoapro',
	            nrocreditos_d:'$totalcreditodesapro'
	        }
	    }
	], function (err, result) {
	    if (err) {
	    	console.log(err);
	    }
	    else{
	      	res.json(result);
	    }
	});
}

/*exports.resumen_cp_n2 =function (req, res) {
	var identi = req.params.id;
	Alumno.aggregate([
	    { $match:
	        {
	            _id:mongoose.Types.ObjectId(identi)
	        } 
	    },
	    { $unwind: {
	            path :'$matriculas',
	            preserveNullAndEmptyArrays: true
	        }
	    },
	    { $lookup:{
	            from: "cursos",
	            localField: "matriculas.enlaze",
	            foreignField: "enlaze",
	            as: "cursos"
	        }
	    },
	    { $unwind: {
	            path :'$cursos',
	            preserveNullAndEmptyArrays: true
	        }
	    },
	    {$project:
	        {
	            nota: '$matriculas.nota',
	            semestre: '$matriculas.semestre',
	            creditpos:{
	              $cond:[
	                {
	                  $lte: [ '$matriculas.nota', 10 ]
	                },
	                '$cursos.creditos',
	                0
	              ]
	            }
	        }
	    },
	    {$group: 
	       {
	            _id: {
	              cod_alumno : '$_id',
	              semestre :'$semestre'
	            },
	            totalcreditoa: {
	                $sum: '$creditpos'
	            }
	        }
	    },
	    {$project:
	       {
	            _id:0,
	            semestre:'$_id.semestre',
	            nrocreditos:'$totalcreditoa'
	        }
	    }
	], function (err, result) {
	    if (err) {
	    	console.log(err);
	    }
	    else{
	      	res.json(result);
	    }
	});
}

exports.resumen_ca_n2 =function (req, res) {
	var identi = req.params.id;
	Alumno.aggregate([
	    { $match:
	        {
	            _id:mongoose.Types.ObjectId(identi)
	        } 
	    },
	    { $unwind: {
	            path :'$matriculas',
	            preserveNullAndEmptyArrays: true
	        }
	    },
	    { $lookup:{
	            from: "cursos",
	            localField: "matriculas.enlaze",
	            foreignField: "enlaze",
	            as: "cursos"
	        }
	    },
	    { $unwind: {
	            path :'$cursos',
	            preserveNullAndEmptyArrays: true
	        }
	    },
	    {$project:
	        {
	            nota: '$matriculas.nota',
	            semestre: '$matriculas.semestre',
	            creditpos:{
	              $cond:[
	                {
	                  $gte: [ '$matriculas.nota', 11 ]
	                },
	                '$cursos.creditos',
	                0
	              ]
	            }
	        }
	    },
	    {$group: 
	       {
	            _id: {
	              cod_alumno : '$_id',
	              semestre :'$semestre'
	            },
	            totalcreditoa: {
	                $sum: '$creditpos'
	            }
	        }
	    },
	    {$project:
	       {
	            _id:0,
	            semestre:'$_id.semestre',
	            nrocreditos:'$totalcreditoa'
	        }
	    }
	], function (err, result) {
	    if (err) {
	    	console.log(err);
	    }
	    else{
	      	res.json(result);
	    }
	});
}*/



//Reportes
/*
	Muestra reportes en pdf (Search js)

*/

//Alumnos ponderados todos sus semestres (x carrera)
exports.rela_td_pond_c = function (req, res) {
	var carreraxx = req.body.carrera;
	Alumno.aggregate([
	        { $match:
	          {
	            carrera:carreraxx
	          } 
	        },
	        { $unwind: '$matriculas'},
	        { $lookup:{
	            from: "cursos",
	            localField: "matriculas.enlaze",
	            foreignField: "enlaze",
	            as: "cursos"
	          }
	        },
	        { $unwind: {
	            path :'$cursos'
	          }
	        },
	        {$project:
	          {
	            nombre: '$nombre',
	            nota: '$matriculas.nota',
	            creditosx:'$cursos.creditos',
	            semestre:'$matriculas.semestre'
	          }
	        },
	        {$group: 
	          {
	            _id: {
	              cod_alumno : '$_id',
	              nombre : '$nombre',
	              semestre:'$semestre'
	            },
	            totalcrts: {
	                $sum: '$creditosx'
	            },
	            totalnts:{
	              $sum: {
	                $multiply : ['$creditosx','$nota']
	              }
	            }
	          }
	        },
	        {$project:
	          {
	            promedio:{
	              $divide: ['$totalnts','$totalcrts']
	            },
	            ponderado:{
	              $cond:[
	                {
	                  $gte: [ {$divide: ['$totalnts','$totalcrts']}, 13 ]
	                },
	                1,
	                0
	              ]
	            }
	          }
	        },
	        {$project:
	          {
	            _id:0,
	            cdg_alumno:'$_id.cod_alumno',
	            nombrealumno:'$_id.nombre',
	            ponderado:1
	          }
	        },
	        {$group: 
	          {
	            _id: {
	              cod_alumno : '$cdg_alumno',
	              nombre : '$nombrealumno'
	            },
	            totalsemestre:{
	              $sum:1
	            },
	            totalpts:{
	              $sum: '$ponderado'
	            }
	          }
	        },
	        {$project:
	          {
	            aprobotodo:{
	              $eq: [ '$totalsemestre', '$totalpts' ]
	            }
	          }
	        },
	        {$match:
	          {
	            aprobotodo:true
	          }
	        }
	  ], function (err, result) {
	          if (err) {
	              console.log(err);
	          }
	          else{
	          	console.log(result);
	          	console.log(result.length);
	          }
	  });
};

//Alumnos ponderados todos sus semestres (general)
exports.rela_td_pond_g = function (req, res) {
	Alumno.aggregate([
	        { $unwind: '$matriculas'},
	        { $lookup:{
	            from: "cursos",
	            localField: "matriculas.enlaze",
	            foreignField: "enlaze",
	            as: "cursos"
	          }
	        },
	        { $unwind: {
	            path :'$cursos'
	          }
	        },
	        {$project:
	          {
	            nombre: '$nombre',
	            nota: '$matriculas.nota',
	            creditosx:'$cursos.creditos',
	            semestre:'$matriculas.semestre'
	          }
	        },
	        {$group: 
	          {
	            _id: {
	              cod_alumno : '$_id',
	              nombre : '$nombre',
	              semestre:'$semestre'
	            },
	            totalcrts: {
	                $sum: '$creditosx'
	            },
	            totalnts:{
	              $sum: {
	                $multiply : ['$creditosx','$nota']
	              }
	            }
	          }
	        },
	        {$project:
	          {
	            promedio:{
	              $divide: ['$totalnts','$totalcrts']
	            },
	            ponderado:{
	              $cond:[
	                {
	                  $gte: [ {$divide: ['$totalnts','$totalcrts']}, 13 ]
	                },
	                1,
	                0
	              ]
	            }
	          }
	        },
	        {$project:
	          {
	            _id:0,
	            cdg_alumno:'$_id.cod_alumno',
	            nombrealumno:'$_id.nombre',
	            ponderado:1
	          }
	        },
	        {$group: 
	          {
	            _id: {
	              cod_alumno : '$cdg_alumno',
	              nombre : '$nombrealumno'
	            },
	            totalsemestre:{
	              $sum:1
	            },
	            totalpts:{
	              $sum: '$ponderado'
	            }
	          }
	        },
	        {$project:
	          {
	            aprobotodo:{
	              $eq: [ '$totalsemestre', '$totalpts' ]
	            }
	          }
	        },
	        {$match:
	          {
	            aprobotodo:true
	          }
	        }
	  ], function (err, result) {
	          if (err) {
	              console.log(err);
	          }
	          else{
	          	console.log(result);
	          	console.log(result.length);
	          }
	  });
};

//Alumnos aprobaron todo sus cursos en todo sus semestres (x carrera)
exports.rela_td_aprob_c = function (req, res) {
	var carreraxx = req.body.carrera;
	Alumno.aggregate([
        { $match:
          {
            carrera:carreraxx
          } 
        },
        { $unwind: '$matriculas'},
        { $lookup:{
            from: "cursos",
            localField: "matriculas.enlaze",
            foreignField: "enlaze",
            as: "cursos"
          }
        },
        { $unwind: {
            path :'$cursos'
          }
        },
        {$project:
          {
            nombre: '$nombre',
            nota: '$matriculas.nota',
            semestre:'$matriculas.semestre',
            credito: '$cursos.creditos',
            creditpos:{
              $cond:[
                {
                  $gte: [ '$matriculas.nota', 11 ]
                },
                '$cursos.creditos',
                0
              ]
            }
          }
        },
        {$group: 
          {
            _id: {
              cod_alumno : '$_id',
              nombre : '$nombre',
              semestre: '$semestre'
            },
            totalcrtsh:{
              $sum: '$credito'
            },
            totalcreditoa: {
              $sum: '$creditpos'
            }
          }
        },
        {$project:
          {
            _id:0,
            cdg_alumno:'$_id.cod_alumno',
            nombrealumno:'$_id.nombre',
            semestre:'$_id.semestre',
            aprobadotd:{
              $cond:[
                {
                  $eq: [ '$totalcrtsh', '$totalcreditoa' ]
                },
                1,
                0
              ]
            },
            totalcrhh:'$totalcrtsh',
            totalcreditos:'$totalcreditoa'
          }
        },
        {$group: 
          {
            _id: {
              cod_alumno : '$cdg_alumno',
              nombre : '$nombrealumno',
            },
            totalsemestre:{
              $sum:1
            },
            totalpts:{
              $sum: '$aprobadotd'
            }
          }
        },
        {$project:
          {
            aprobotodo:{
              $eq: [ '$totalsemestre', '$totalpts' ]
            }
          }
        },
        {$match:
          {
            aprobotodo:true
          }
        }
  	], function (err, result) {
          if (err) {
              console.log(err);
          }
          else{
          	console.log(result);
          	console.log(result.length);
          }
  	});
}

//Alumnos aprobaron todo sus cursos en todo sus semestres (general)
exports.rela_td_aprob_g = function (req, res) {
	Alumno.aggregate([
        { $unwind: '$matriculas'},
        { $lookup:{
            from: "cursos",
            localField: "matriculas.enlaze",
            foreignField: "enlaze",
            as: "cursos"
          }
        },
        { $unwind: {
            path :'$cursos'
          }
        },
        {$project:
          {
            nombre: '$nombre',
            nota: '$matriculas.nota',
            semestre:'$matriculas.semestre',
            credito: '$cursos.creditos',
            creditpos:{
              $cond:[
                {
                  $gte: [ '$matriculas.nota', 11 ]
                },
                '$cursos.creditos',
                0
              ]
            }
          }
        },
        {$group: 
          {
            _id: {
              cod_alumno : '$_id',
              nombre : '$nombre',
              semestre: '$semestre'
            },
            totalcrtsh:{
              $sum: '$credito'
            },
            totalcreditoa: {
              $sum: '$creditpos'
            }
          }
        },
        {$project:
          {
            _id:0,
            cdg_alumno:'$_id.cod_alumno',
            nombrealumno:'$_id.nombre',
            semestre:'$_id.semestre',
            aprobadotd:{
              $cond:[
                {
                  $eq: [ '$totalcrtsh', '$totalcreditoa' ]
                },
                1,
                0
              ]
            },
            totalcrhh:'$totalcrtsh',
            totalcreditos:'$totalcreditoa'
          }
        },
        {$group: 
          {
            _id: {
              cod_alumno : '$cdg_alumno',
              nombre : '$nombrealumno',
            },
            totalsemestre:{
              $sum:1
            },
            totalpts:{
              $sum: '$aprobadotd'
            }
          }
        },
        {$project:
          {
            aprobotodo:{
              $eq: [ '$totalsemestre', '$totalpts' ]
            }
          }
        },
        {$match:
          {
            aprobotodo:true
          }
        }
  	], function (err, result) {
          if (err) {
              console.log(err);
          }
          else{
          	console.log(result);
          	console.log(result.length);
          }
  	});
}

//Relacion de alumnos de la carrera zzz, asignatura zzz y grupo zzz en el semestre zzz 
//en observacion aprobado, desaprobado, reprobado o nsp(no se presento)
//        ARREGLAR QUERY
/*exports.relacion_asignatura = function (req, res) {
	Alumno3Model.aggregate([
        { $unwind: "$matriculas" },
        { $lookup:{
            from: "cursos",
            localField: "matriculas.enlaze",
            foreignField: "enlaze",
            as: "cursos"
          }
        },
        { $unwind: {
            path :'$cursos'
          }
        },
        { $project: {
          
          nombre:'$nombre',
          semestre: '$matriculas.semestre',
          curso:'$cursos.cod_asignatura' ,
          nota: '$matriculas.nota',
          grupo: '$matriculas.grupo',
          observaciones: { 
            $cond: [ 
              {
                $eq: [ '$matriculas.nota', 'NSP' ] 
              }, 
              'true',
              {
                $cond:[
                  {
                    $lte: [ '$matriculas.nota', 6 ]
                  },
                  'REPROBADO',
                  {
                    $cond:[
                      {
                        $lte: [ '$matriculas.nota', 10 ]
                      },
                      'DESAPROBADO',
                      'APROBADO'
                    ]
                  } 
                ]
              } 
            ]
          }
        } },
        { $match:{
          $and: [{
            semestre:'2016-I',
            curso:'ROB',
            grupo:'A'
          }]
        }}
  	], function (err, result) {
          if (err) {
              console.log(err);
              return;
          }
          console.log(result);
  	});
}*/

//Relacion de alumnos de la carrera zzz que aprobaron todas sus asignaturas en el semestre zzz
exports.rela_td_smtr_c = function (req, res) {
	var carreraxx = req.body.carrera;
	var semestrexx = req.body.semestre;
	Alumno3Model.aggregate([
        { $match:
          {
            carrera:carreraxx
          } 
        },
        { $unwind: '$matriculas'},
        { $match:
          {
            'matriculas.semestre':semestrexx
          }
        },
        { $lookup:{
            from: "cursos",
            localField: "matriculas.enlaze",
            foreignField: "enlaze",
            as: "cursos"
          }
        },
        { $unwind: {
            path :'$cursos'
          }
        },
        {$project:
          {
            nombre: '$nombre',
            nota: '$matriculas.nota',
          }
        },
        {$group: 
          {
            _id: {
              cod_alumno : '$_id',
              nombre : '$nombre'
            },
            count: {
                $sum: 1
            },
            minima:{
              $min: '$nota'
            }
          }
        },
        {$project:
          {
            codigo:'$cod_alumno',
            nombre:'$nombre',
            aprobado:
            { 
              $gt: [ "$minima", 10 ] 
            }
          }
        },
        {$match:
          {
            aprobado:true
          }
        },
        {$project:
          {
            _id:0,
            c_alumnozz:'$_id.cod_alumno',
            nombrealumno:'$_id.nombre'
          }
        }
  	], function (err, result) {
          if (err) {
              console.log(err);
          }
          else{
          	console.log(result);
          	console.log(result.length);
          }
  	});
}

//Relacion de alumnos de la carrera zzz que aprobaron todas sus asignaturas en el semestre zzz
//y que obtenieron promedio ponderado >=13
exports.rela_td_smtr_pond_c = function (req, res) {
	var carreraxx = req.body.carrera;
	var semestrexx = req.body.semestre;
	Alumno.aggregate([
        { $match:
          {
            carrera:carreraxx
          } 
        },
        { $unwind: '$matriculas'},
        { $match:
          {
            'matriculas.semestre':semestrexx
          }
        },
        { $lookup:{
            from: "cursos",
            localField: "matriculas.enlaze",
            foreignField: "enlaze",
            as: "cursos"
          }
        },
        { $unwind: {
            path :'$cursos'
          }
        },
        {$project:
          {
            nombre: '$nombre',
            nota: '$matriculas.nota',
            creditosx:'$cursos.creditos'
          }
        },
        {$group: 
          {
            _id: {
              cod_alumno : '$_id',
              nombre : '$nombre'
            },
            totalcrts: {
                $sum: '$creditosx'
            },
            totalnts:{
              $sum: {
                $multiply : ['$creditosx','$nota']
              }
            }
          }
        },
        {$project:
          {
            promedio:{
              $divide: ['$totalnts','$totalcrts']
            },
            ponderado:{
              $cond:[
                {
                  $gte: [ {$divide: ['$totalnts','$totalcrts']}, 13 ]
                },
                'si',
                'no'
              ]
            }
          }
        },
        {$match:
          {
            ponderado:'si'
          }
        },
        {$project:
          {
            _id:0,
            cdg_alumno:'$_id.cod_alumno',
            nombrealumno:'$_id.nombre',
            promedio:1
          }
        }
  	], function (err, result) {
          if (err) {
              console.log(err);
          }
          else{
          	console.log(result);
          	console.log(result.length);
          }
  	});
}

//Ranking alumnos x carrera
//Ranking alumnos x general



//------------------------------ Alumno_user ------------------------------
//Actualización creditos  => document : User.tipoalumno.creditos (inicio de página principal)
exports.inicio = function (req, res) {
  	var identi = req.user._id;
  	Alumno.aggregate([
	        { $match:
	          {
	            _id:mongoose.Types.ObjectId(identi)
	          } 
	        },
	        { $unwind: {
	            path :'$matriculas',
	            preserveNullAndEmptyArrays: true
	          }
	        },
	        { $lookup:{
	            from: "cursos",
	            localField: "matriculas.enlaze",
	            foreignField: "enlaze",
	            as: "cursos"
	          }
	        },
	        { $unwind: {
	            path :'$cursos',
	            preserveNullAndEmptyArrays: true
	          }
	        },
	        {$project:
	          {
	            nombre: '$nombre',
	            nota: '$matriculas.nota',
	            creditpos:{
	              $cond:[
	                {
	                  $gte: [ '$matriculas.nota', 11 ]
	                },
	                '$cursos.creditos',
	                0
	              ]
	            }
	          }
	        },
	        {$group: 
	          {
	            _id: {
	              cod_alumno : '$_id',
	              nombre : '$nombre'
	            },
	            totalcreditoa: {
	                $sum: '$creditpos'
	            }
	          }
	        },
	        {$project:
	          {
	            _id:0,
	            cdg_alumno:'$_id.cod_alumno',
	            nombrealumno:'$_id.nombre',
	            nrocreditos:'$totalcreditoa'
	          }
	        }
	], function (err, result) {
	    if (err) {
	    	console.log(err);
	    }
	    else{
	    	var nrocreditos = result.nrocreditos;
	      	User.findById(identi, function(error, usuarioqw){
				if(error){
					res.send('Error al intentar modificar el users.');
				}
				else{
					usuarioqw.tipoalumno.creditos  = nrocreditos;
					usuarioqw.save(function (error,documen) {
						if(error){
							res.send('error');
						}
						else{
							res.render('indexsem', {
								alumno: personal
							});
						}
					});
				}	
			});
	    }
	});
};

//Chart estadistico 
exports.chart_esta = function (req, res) {
	var identi = req.user._id;//data
	console.log(identi);
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
                promedio: 10.666,
                ponderado: 0  }];
	res.render('chart_alu', {
		user:req.user,
		data: data2
	});
}

//Número de créditos x alumno
exports.creditos = function (req, res) {
  	var identi = req.user._id;
  	Alumno.aggregate([
	        { $match:
	          {
	            _id:mongoose.Types.ObjectId(identi)
	          } 
	        },
	        { $unwind: {
	            path :'$matriculas',
	            preserveNullAndEmptyArrays: true
	          }
	        },
	        { $lookup:{
	            from: "cursos",
	            localField: "matriculas.enlaze",
	            foreignField: "enlaze",
	            as: "cursos"
	          }
	        },
	        { $unwind: {
	            path :'$cursos',
	            preserveNullAndEmptyArrays: true
	          }
	        },
	        {$project:
	          {
	            nombre: '$nombre',
	            nota: '$matriculas.nota',
	            creditpos:{
	              $cond:[
	                {
	                  $gte: [ '$matriculas.nota', 11 ]
	                },
	                '$cursos.creditos',
	                0
	              ]
	            }
	          }
	        },
	        {$group: 
	          {
	            _id: {
	              cod_alumno : '$_id',
	              nombre : '$nombre'
	            },
	            totalcreditoa: {
	                $sum: '$creditpos'
	            }
	          }
	        },
	        {$project:
	          {
	            _id:0,
	            cdg_alumno:'$_id.cod_alumno',
	            nombrealumno:'$_id.nombre',
	            nrocreditos:'$totalcreditoa'
	          }
	        }
	], function (err, result) {
	    if (err) {
	    	console.log(err);
	    }
	    else{
	      	console.log(result);
	      	console.log(result.length);
	    }
	});
};

//Cursos que puede llevar
exports.puedes_cur = function (req, res) {
  	var identi = req.user._id;
  	var semestrevar = req.body.semestre;
  	Alumno.aggregate([
	        { $match:
	          {
	            _id:mongoose.Types.ObjectId(identi)
	          } 
	        },
	        {$unwind: "$matriculas" },
	        { $match:
	          {
	            'matriculas.semestre': semestrevar
	          } 
	        },
	        { $lookup:{
	            from: "cursops",
	            localField: "matriculas.enlaze",
	            foreignField: "enlaze",
	            as: "cursos"
	          }
	        },
	        { $unwind: {
	            path :'$cursos'
	          }
	        },
	        { $project: {
	          nombre:'$nombre',
	          codcurso:'$cursos.cod_asignatura',
	          abre:'$cursos.abre',
	          junte: { $concat: 
	            ["$carrera" ,' ', "$matriculas.semestre" ]
	          }, 
	          aprueba: { 
	            $cond: [ 
	              {
	                $gte: [ '$matriculas.nota', 11 ]
	              }, 
	              0,
	              1
	            ]
	          }
	        } },
	        { $unwind: {
	            path :'$abre'
	          }
	        },
	        { $project:{
	            _id:0,
	            codcurso:1,
	            abrecurso:'$abre._id',
	            aprueba:1,
	            junte:{ $concat:[
	                '$abre._id'," ",'$junte'
	              ]
	            }
	          }
	        },
	        { $group:{
	            _id:{
	              abrecurso:'$abrecurso',
	              junte:'$junte'
	            },
	            total: {
	              $sum: '$aprueba'
	            }
	          }
	        },
	        { $match:{
	            total:0
	          }
	        }/*,
	        { $project:{
	            _id:0,
	            codigo:'$_id.abrecurso'
	          }
	        },
	        { $lookup:{
	            from: "docentes",
	            localField: "codigo",
	            foreignField: "asignaturas.codAsig",
	            as: "cursos"
	          }
	        },
	        { $unwind: {
	            path :'$cursos',
	            preserveNullAndEmptyArrays: true,
	            includeArrayIndex: "arrayIndex"
	          }
	        },
	        { $project:{
	            codigo:1,
	            codAsig:'$cursos.asignaturas.codAsig',
	            vacio:{  
	              $cond: [ 
	                {
	                  $eq: ['$arrayIndex', null ]
	                }, 
	                'si',
	                'no'
	              ]
	            }
	          }
	        }*/
	], function (err, result) {
	    if (err) {
	        console.log(err);
	    }
	    else{
	     console.log(result);
	    }
	});
};

//Todos los semestres
exports.semestres = function (req, res) {
	var identi = req.user._id;
  	Alumno.aggregate([
	    { $match:
	        {
	        	_id:mongoose.Types.ObjectId(identi)
	        } 
	    },
	    { $unwind: {
	        	path :'$matriculas'
	        	//preserveNullAndEmptyArrays: true
	        }
	    },
	    { $project:{
            	semestre:'$matriculas.semestre'
            }
        },
        { $group:{
              _id: '$semestre'
            }
        },
        { $sort: {_id: -1}},
	], function (err, result) {
	    if (err) {
	    	console.log(err);
	    }
	    else{
	      	console.log(result);
	      	console.log(result.length);
	    }
	});
};

//Matriculas x semestre
exports.matricula_sem = function (req, res) {
	var identi = req.user._id;
	var semestrevar = req.body.semestre;
  	Alumno.aggregate([
	    { $match:
	        {
	        	_id:mongoose.Types.ObjectId(identi)
	        } 
	    },
	    { $unwind: {
	        	path :'$matriculas'
	        	//preserveNullAndEmptyArrays: true
	        }
	    },
	    { $match:
	        {
	            'matriculas.semestre': semestrevar
	        } 
	    },
	    { $lookup:{
	            from: "cursos",
	            localField: "matriculas.enlaze",
	            foreignField: "enlaze",
	            as: "cursos"
	        }
	    },
	    { $unwind: {
	            path :'$cursos'
	        }
	    },
	    {$project:
	        {
	            cod_asig: '$cursos.cod_asignatura',
	            nombre: '$cursos.nombre',
	            cate: '$cursos.categoria',
	            credito : '$cursos.creditos'
	        }
	    },
	], function (err, result) {
	    if (err) {
	    	console.log(err);
	    }
	    else{
	      	console.log(result);
	      	console.log(result.length);
	    }
	});
}

//Notas x semestre
exports.notas_sem = function (req, res) {
	var identi = req.user._id;
	var semestrevar = req.body.semestre;
  	Alumno.aggregate([
	    { $match:
	        {
	        	_id:mongoose.Types.ObjectId(identi)
	        } 
	    },
	    { $unwind: {
	        	path :'$matriculas'
	        	//preserveNullAndEmptyArrays: true
	        }
	    },
	    { $match:
	        {
	            'matriculas.semestre': semestrevar
	        } 
	    },
	    { $lookup:{
	            from: "cursos",
	            localField: "matriculas.enlaze",
	            foreignField: "enlaze",
	            as: "cursos"
	        }
	    },
	    { $unwind: {
	            path :'$cursos'
	        }
	    },
	    {$project:
	        {
	            cod_asig: '$cursos.cod_asignatura',
	            nombre: '$cursos.nombre',
	            cate: '$cursos.categoria',
	            credito : '$cursos.creditos',
	            nota : '$matriculas.nota'
	        }
	    },
	], function (err, result) {
	    if (err) {
	    	console.log(err);
	    }
	    else{
	      	console.log(result);
	      	console.log(result.length);
	    }
	});
}

//Resumen(v. alumno) nivel 1
exports.resumenv2_n1 = function (req, res) {
	var identi = req.user._id;
	//Promedio de tods los semestre
	Alumno.aggregate([
        { $match:
          {
            _id:mongoose.Types.ObjectId(identi)
          } 
        },
        { $unwind: '$matriculas'},
        { $lookup:{
            from: "cursos",
            localField: "matriculas.enlaze",
            foreignField: "enlaze",
            as: "cursos"
          }
        },
        { $unwind: {
            path :'$cursos'
          }
        },
        {$project:
          {
            nombre: '$nombre',
            nota: '$matriculas.nota',
            creditosx:'$cursos.creditos',
            semestre:'$matriculas.semestre'
          }
        },
        {$group: 
          {
            _id: {
              cod_alumno : '$_id',
              nombre : '$nombre',
              semestre:'$semestre'
            },
            totalcrts: {
                $sum: '$creditosx'
            },
            totalnts:{
              $sum: {
                $multiply : ['$creditosx','$nota']
              }
            }
          }
        },
        {$project:
          {
            promedio:{
              $divide: ['$totalnts','$totalcrts']
            }/*,
            ponderado:{
              $cond:[
                {
                  $gte: [ {$divide: ['$totalnts','$totalcrts']}, 13 ]
                },
                1,
                0
              ]
            }*/
          }
        },
        {$project:
          {
            _id:0,
            semestre:'$_id.semestre',
            promedio:1
          }
        }
	], function (err, result) {
	    if (err) {
	    	console.log(err);
	    }
	    else{
	    	
	    }
	});
}



//------------------------------ Docente_user ------------------------------
/*
	Query y otras funciones para el área Docente:
	 * Registro de notas x alumno
	 * ...
	 CreateRUpdateD
*/

//Agregar matriculas
exports.matriculas = function (req, res) {
	Alumno.findOne({'_id':req.params.id}).select('matriculas').exec(function(err, docs) {
		docs.matriculas.push({ 
			semestre : req.params.semestre,
		    grupo : req.params.grupo,
		    nota :req.params.nota,
		    enlaze: req.params.enlaze
		});
		docs.save(function (err, doc) {
			if(err){
				console.log(err);
				res.json('error '+err);
			}else{
				res.json('ok');
			}
		});
	});
};

//------------------------------ Trabajador_user ------------------------------
/*
	Query y otras funciones para el área trabajador:
	 * Matriculas pago
	 * Get ficha de seguimiento => pdf
	 * ...
*/
