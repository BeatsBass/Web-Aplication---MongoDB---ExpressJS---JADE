var multer = require('multer');
var fs = require('fs');
var User = require('./Usuario');
var LogEvent;
var Personal;
exports.setModel = function(modelo,modelo1){
	Personal = modelo;
	LogEvent = modelo1;
};
exports.index = function(req, res){
	Personal.find({}, function(error, personal){
		if(error){
			res.send('Ha surgido un error.');
		}else{
			res.render('index2', {
				personal: personal
			});
		}
	})
};
exports.validauser = function(req, res){
	/*Personal.find({'_id':'58ebc4e90f83730c445ba163'}, function(error, personal){
		if(error){
			res.send('Ha surgido un error.');
		}else{
			console.log(personal.length);
			res.json(personal.length);
		}
	});*/
	console.log(req.params);
	Personal.find({
    	ema: req.params.mail,
    	nombre:req.params.nombre,
    	apellidos:req.params.apelli
  	}).select('nombre').exec(function(err, docs) {
		if(err){
			res.send('Ha surgido un error.');
		}else{
			res.json(docs.length);
		}		  	
	});
};

exports.create2 = function(req, res){
	var profe = {
		action: '/personal/'
	}
	res.json(profe);
};

//Update foto docente
exports.update2 = function(req, res){
	var fotoNombre ="";
	var storage = multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, './public/avatar');
	  },
	  filename: function (req, file, callback) {
	  	var sinesp = file.originalname.split(' ');
	    var reeee = req._startTime+"";
	    var sera = reeee.split(' ');
	    var aux = sera[4].split(':');
	    fotoNombre = aux[0]+aux[1]+aux[2];
	    fotoNombre = fotoNombre+sinesp[sinesp.length-1];
	    callback(null,fotoNombre)
	  }
	});
	var Filtro = function(req, file, callback){
		if(file.mimetype.split("/")[0] != "image" ){
	  		return callback(new Error());
	  	}
	  	callback(null,true);
	}
	var upload = multer({storage: storage, fileFilter: Filtro}).single('photo1');
	upload(req, res, function(err) {
		if(err) {
		    res.redirect('/personal');
		    return;
	  	}
	  if(fotoNombre == ""){
	  	res.redirect('/personal');
	  }
	  else{
	  	Personal.findById(req.params.id, function(error, documento){
	  		if(error){
				res.send('Error al intentar modificar el personaje.');
			}else{
				var AntesFoto = documento.foto;
				var personaje = documento;
				personaje.foto = fotoNombre;
				personaje.save(function(error, documento){
					if(error){
						res.send('Error al intentar guardar el personaje.');
					}else{
						var linkk = './public/avatar/'+AntesFoto;
						if(AntesFoto != 'hombre.png' && AntesFoto != 'mujer.png'){
							fs.unlink(linkk,function (err){
							    if(err){
							    	res.redirect('/personal');
							    }
							    else{
							    	User.findById(req.params.id, function(error, usuarioqw){
										if(error){
											res.send('Error al intentar modificar el users.');
										}
										else{
											usuarioqw.local.foto  = fotoNombre;
											usuarioqw.save(function (error,documen) {
												if(error){
													res.send('error');
												}
												else{
													//Version log
													var newLogEvent = new LogEvent();	
													newLogEvent.tipolog = 1;
											        newLogEvent.userlog = "Administrador";
											        newLogEvent.descri = "Actualización de foto Docente id: "+req.params.id;
											        newLogEvent.save(function(error, documento){
														if(error){
															res.send('Error al intentar guardar el personaje.');
														}else{
															res.redirect('/personal');
														}
													});
											        /*Version sin log
													res.redirect('/personal');*/
												}
											});
										}	
									});
							    }
							});
						}
						else{
							User.findById(req.params.id, function(error, usuarioqw){
								if(error){
									res.send('Error al intentar modificar el users.');
								}
								else{
									usuarioqw.local.foto  = fotoNombre;
									usuarioqw.save(function (error,documen) {
										if(error){
											res.send('error');
										}
										else{
											//Version log
											var newLogEvent = new LogEvent();	
											newLogEvent.tipolog = 1;
											newLogEvent.userlog = "Administrador";
											newLogEvent.descri = "Actualización de foto por defecto Docente id: "+req.params.id;
											newLogEvent.save(function(error, documento){
												if(error){
													res.send('Error al intentar guardar el personaje.');
												}else{
													res.redirect('/personal');
												}
											});
											/*Version sin log
											res.redirect('/personal');*/
										}
									});
								}	
							});
						}
					}
				});
			}
	  	});

	  }
	});
};

//Creacion de docente
exports.store = function(req, res){
	var h = req.body.pho+"";
	if(h == 'undefined'){
		var fotoNombre ="";
		var storage = multer.diskStorage({
		  destination: function (req, file, callback) {
		    callback(null, './public/avatar');
		  },
		  filename: function (req, file, callback) {
		  	var sinesp = file.originalname.split(' ');
		    var reeee = req._startTime+"";
		    var sera = reeee.split(' ');
		    var aux = sera[4].split(':');
		    fotoNombre = aux[0]+aux[1]+aux[2];
		    fotoNombre = fotoNombre+sinesp[sinesp.length-1];
		    callback(null,fotoNombre)
		  }
		});

		var upload = multer({storage: storage}).single('photos');
	 	upload(req, res, function(err) {
		  	if(err) {
		    	console.log(err);
		    	return;
		  	}
		  	if(fotoNombre == ""){
		  		var genero = parseInt(req.body.grupogenero);
		  		console.log('el genro es '+genero);
		  		if(genero == 0)
					fotoNombre = 'hombre.png';
				else
					fotoNombre = 'mujer.png';
		  	}
			var newUser = new User();
			var user_nombre = req.body.nombre.split(' ');
			var temp = "";
			for (var i = 0; i < user_nombre.length; i++) {
			 temp = temp + user_nombre[i];
			}
		    newUser.local.email    = temp+"@alviña";
	        newUser.local.password = newUser.generateHash(temp);
	        newUser.local.nombre   = req.body.nombre + "&&" +req.body.apellido;
	        newUser.local.foto	   = fotoNombre;
	        newUser.tipo = "docente";

	        newUser.save(function(err) {
	            if (err)
	                throw err;
	            else{
	            	var redd = req.body.face+";"+req.body.goo+";"+req.body.twwi;
					var categg = parseInt(req.body.optionsRadios);
					var genero = parseInt(req.body.grupogenero);
					var personaje = new Personal({
						_id: newUser._id,
						ema:req.body.ema,
					    foto: fotoNombre,
					    nombre: req.body.nombre,
						apellidos: req.body.apellido,
					    genero: genero,
					    descri: req.body.historia,
						categoria: categg,
						redes: redd
					});
					var tudni = personaje._id;
					var nombreh = personaje.nombre;
					var ema1 = personaje.ema;
					console.log(personaje);
					personaje.save(function(error, documento){
						if(error){
							res.send('Error al intentar guardar el personaje.');
						}else{	
							//Version log
							var newLogEvent = new LogEvent();	
							newLogEvent.tipolog = 0;
					        newLogEvent.userlog = "Administrador";
					        newLogEvent.descri = "Nuevo Docente id= "+tudni+", Nombre= "+nombreh+", Email= "+ema1;
					        newLogEvent.save(function(error, documento){
								if(error){
									res.send('Error al intentar guardar el personaje.');
								}else{
									res.redirect('/personal');
								}
							});
					        /*Version sin log
							res.redirect('/personal');*/
						}
					});
	            }
	        });
		})

	}
	else{
		var fotoNombre ="";
		var genero = parseInt(req.body.grupogenero);
		if(genero == 0)
			fotoNombre = 'hombre.png';
		else
			fotoNombre = 'mujer.png';
		var newUser = new User();
		var user_nombre = req.body.nombre.split(' ');
		var temp = "";
		for (var i = 0; i < user_nombre.length; i++) {
		 temp = temp + user_nombre[i];
		}
	    newUser.local.email    = temp+"@alviña";
        newUser.local.password = newUser.generateHash(temp);
        newUser.local.nombre   = req.body.nombre + "&&" +req.body.apellido;
        newUser.local.foto	   = fotoNombre;
        newUser.tipo = "docente";

        newUser.save(function(err) {
            if (err)
                throw err;
            else{
            	var redd = req.body.face+";"+req.body.goo+";"+req.body.twwi;
				var categg = parseInt(req.body.optionsRadios);
				var personaje = new Personal({
					_id: newUser._id,
					ema:req.body.ema,
				    foto: fotoNombre,
				    nombre: req.body.nombre,
					apellidos: req.body.apellido,
				    genero: genero,
				    descri: req.body.historia,
					categoria: categg,
					redes: redd
				});
				console.log(personaje);
				var tudni = personaje._id;
				var nombreh = personaje.nombre;
				var ema1 = personaje.ema;
				personaje.save(function(error, documento){
					if(error){
						res.send('Error al intentar guardar el personaje.');
					}else{
						//Version log
						var newLogEvent = new LogEvent();	
						newLogEvent.tipolog = 0;
				        newLogEvent.userlog = "Administrador";
				        newLogEvent.descri = "Creacion de nuevo Docente dni: "+tudni+", Nombre:"+nombreh+", Email: "+ema1;
				        newLogEvent.save(function(error, documento){
							if(error){
								res.send('Error al intentar guardar el personaje.');
							}else{
								res.redirect('/personal');
							}
						});
				        /*Version sin log
						res.redirect('/personal');*/
					}
				});
            }
        });
	}
	
	/*var fotoNombre ="";
	var storage = multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, '../public/avatar');
	  },
	  filename: function (req, file, callback) {
	  	var sinesp = file.originalname.split(' ');
	    var reeee = req._startTime+"";
	    var sera = reeee.split(' ');
	    var aux = sera[4].split(':');
	    fotoNombre = aux[0]+aux[1]+aux[2];
	    fotoNombre = fotoNombre+sinesp[sinesp.length-1];
	    callback(null,fotoNombre)
	  }
	});*/
 	//var upload = multer({storage: storage}).single('photos');
 	/*upload(req, res, function(err) {
 		console.log('hola');
 		console.log(req.body);
	  	/*f(err) {
	    	console.log(err);
	    	return;
	  	}
	  	if(fotoNombre == ""){
	  		fotoNombre = 'hombre.png';
	  	}
		var newUser = new User();
		var user_nombre = req.body.nombre.split(' ');
		var temp = "";
		for (var i = 0; i < user_nombre.length; i++) {
		 temp = temp + user_nombre[i];
		}
	    newUser.local.email    = temp+"@alviña";
        newUser.local.password = newUser.generateHash(temp);
        newUser.local.nombre   = req.body.nombre + "&&" +req.body.apellido;
        newUser.local.foto	   = fotoNombre;
        newUser.tipo = "docente";

        newUser.save(function(err) {
            if (err)
                throw err;
            else{
            	var redd = req.body.face+";"+req.body.goo+";"+req.body.twwi;
				var categg = parseInt(req.body.optionsRadios);
				var genero = parseInt(req.body.grupogenero);
				var personaje = new Personal({
					_id: newUser._id,
					ema:req.body.ema,
				    foto: fotoNombre,
				    nombre: req.body.nombre,
					apellidos: req.body.apellido,
				    genero: genero,
				    descri: req.body.historia,
					categoria: categg,
					redes: redd
				});
				console.log(personaje);
				personaje.save(function(error, documento){
					if(error){
						res.send('Error al intentar guardar el personaje.');
					}else{	
						res.redirect('/personal');
					}
				});
            }
        });*/
	//})
};

exports.show = function(req, res){
	Personal.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{
			res.render('show2', {
				personaje: documento
			});
		}
	});
};

exports.show2 = function(req, res){
	Personal.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{

			res.json(documento);
		}
	});
};

/*exports.edit = function(req, res){
	Personal.findById(req.params.id, function(error, documento){
		var ya = documento.redes;
		var aux = ya.split(";");
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{
			res.render('save21v2', {
				put: true,
				action: '/personal/' + req.params.id,
				personal: documento,
				aux
			});
		}
	});
};*/

exports.update = function(req, res){
	console.log("Entrateste a Update "+req.params.id);
	Personal.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar modificar el personaje.');
		}else{
			var categg = parseInt(req.body.optionsRadios);
			var redd = req.body.face+";"+req.body.goo+";"+req.body.twwi;
			var personaje = documento;
			console.log("antes");
			console.log(personaje);
			var genero = parseInt(req.body.grupogenero);
			personaje.nombre = req.body.nombre;
			personaje.apellidos = req.body.apellido;
			personaje.descri = req.body.historia;
			personaje.ema = req.body.ema;
			personaje.categoria = categg;
			personaje.redes = redd;
			personaje.genero = genero;
			var fotodefault="";
			if(personaje.foto=='hombre.png'||personaje.foto=='mujer.png'){
				if(genero == 0)
					fotodefault = 'hombre.png';
				else
					fotodefault = 'mujer.png';
				personaje.foto = fotodefault;
			}
			console.log("despues");
			console.log(personaje);
			personaje.save(function(error, documento){
				if(error){
					res.send('Error al intentar guardar el personaje.');
				}else{
					User.findById(req.params.id, function(error, usuarioqw){
						if(error){
							res.send('Error al intentar modificar el users.');
						}
						else{
							usuarioqw.local.nombre   = req.body.nombre + "&&" +req.body.apellido;
							if(fotodefault!=''){
								usuarioqw.local.foto = fotodefault;
							}
							usuarioqw.save(function (error,documen) {
								if(error){
									res.send('error');
								}
								else{
									//Version log
									var newLogEvent = new LogEvent();	
									newLogEvent.tipolog = 1;
									newLogEvent.userlog = "Administrador";
									newLogEvent.descri = "Datos de docente => id= "+req.params.id+", nombre= "+req.body.nombre;
									newLogEvent.save(function(error, documento){
										if(error){
											res.send('Error al intentar guardar el personaje.');
										}else{
											res.redirect('/personal');
										}
									});
									/*Version sin log
									res.redirect('/personal');*/
								}

								//res.redirect('/personal');
							});
						}	
					});
				}
			});
		}
	});
};

exports.destroy = function(req, res){
	Personal.findById(req.params.id, function(error, documento){
	  		if(error){
				res.send('Error al intentar modificar el personaje.');
			}else{
				var AntesFoto = documento.foto;
				Personal.remove({_id: req.params.id}, function(error){
					if(error){
						res.send('Error al intentar eliminar el personaje.');
					}else{
						User.findById(req.params.id, function(error, usuarioqw){
							if(error){
								res.send('Error al intentar modificar el users.');
							}
							else{
								User.remove({_id: req.params.id}, function(error){
									if(error){
										res.send('Error al intentar modificar el users.');
									}
									else{
										var linkk = './public/avatar/'+AntesFoto;
										if(AntesFoto != 'hombre.png' && AntesFoto != 'mujer.png'){
											fs.unlink(linkk,function (err){
												if(err){
													res.redirect('/personal');
												}
												else{
													//Version log
													var newLogEvent = new LogEvent();	
													newLogEvent.tipolog = 2;
													newLogEvent.userlog = "Administrador";
													newLogEvent.descri = "Eliminado Docente id: "+req.params.id;
													newLogEvent.save(function(error, documento){
														if(error){
															res.send('Error al intentar guardar el personaje.');
														}else{
															res.redirect('/personal');
														}
													});
													/*Version sin log
													res.redirect('/personal');*/
												}
											});
										}
										else{
											//Version log
											var newLogEvent = new LogEvent();	
											newLogEvent.tipolog = 2;
											newLogEvent.userlog = "Administrador";
											newLogEvent.descri = "Eliminado Docente id: "+req.params.id;
											newLogEvent.save(function(error, documento){
												if(error){
													res.send('Error al intentar guardar el personaje.');
												}else{
													res.redirect('/personal');
												}
											});
											/*Version sin log
											res.redirect('/personal');*/
										}
									}
								});
							}	
						});
					}
				});
			}
	});
	/*Personal.remove({_id: req.params.id}, function(error){
		if(error){
			res.send('Error al intentar eliminar el personaje.');
		}else{

			var linkk = '../public/avatar/'+AntesFoto;
			if(AntesFoto != 'hombre.png'){
				fs.unlink(linkk,function (err){
					if(err){
						res.redirect('/personal');
					}
					else{
						res.redirect('/personal');
					}
				});
			}
			else{
				res.redirect('/personal');
			}
		}
	});*/
};
