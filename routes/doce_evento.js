var multer = require('multer');
var fs = require('fs');
var moment = require('moment'); 
var User = require('./Usuario');


var Docente;
var Admi;
//1° = set los modelos para docente y admi
	exports.setModel = function(modelo){
		Docente = modelo;
	};
//2°volcar informacion
  	//a) Volcar todos los eventos(para páginaWeb principal) Docente (!!! FALTA PARA ADMI)
	exports.index_tu = function(req, res){
		console.log("hola");
		Docente.aggregate([
		    { $unwind: "$eventos" },
		    { $project: {
		    	archivo : {
					foto : '$eventos.archivo.foto',
					file : '$eventos.archivo.file'
				},
				titu: '$eventos.titu',
				descri: '$eventos.descri',
				cuando: {
						lugar: '$eventos.cuando.lugar',
						fecha: '$eventos.cuando.fecha'
				},
				tipo:'$eventos.Tipo',
				dispo: '$eventos.dispo',
				fecha_ini: '$eventos.fecha_ini',
				fecha_upd: '$eventos.fecha_upd',
		        _id: '$eventos._id'
		    }},
	    	{ $sort: {fecha_ini: -1}}
		], function (err, result) {
		     if (err) {
		            console.log(err);
		     }
		     else{
		     	console.log(result);
		     	res.json(result);
		     }
		});
	};
 	//b) Volcar solo tu evento tipo=docente       ************(!!FALTA PARA ADMI)************
	exports.index_tu = function(req, res){
		/*console.log(req.user._id );
		var iddocen = req.user._id+"";
		Docente.aggregate([
				    { $unwind: "$eventos" },
				    { $project: {
				    	archivo : {
							foto : '$eventos.archivo.foto',
							file : '$eventos.archivo.file'
						},
						titu: '$eventos.titu',
						descri: '$eventos.descri',
						cuando: {
								lugar: '$eventos.cuando.lugar',
								fecha: '$eventos.cuando.fecha'
						},
						tipo:'$eventos.tipo',
						dispo: '$eventos.dispo',
				        _id: '$eventos._id',

				        autor_nombre:'$nombre',
				        autor_apelliudos: '$apellidos',
				        foto_user:'$foto',
				        id_author:'$_id'
				    }},
			    	{ $sort: {'cuando.fecha': 1}},
			    	{ $match:{ $and:[{id_author: iddocen,tipo:0}] } }
				], function (err, result) {
				     if (err) {
				        console.log(err);
				     }
				     else{
				     	console.log(result);
				     	res.render('index_d2', {
							user:req.user,
							documento: result
						});
				     }
				});*/
		Docente.findById(req.user._id).select('eventos').exec(function(err, docs) {
			if(err){
				res.send('Ha surgido un error.');
			}else{
				console.log(docs);
				console.log(docs.eventos.length);
				res.render('index_d', {
					user:req.user,
					documento: docs
				});
			}
		});
	};

//3° Crear nuevos evntos o noticias
	//a)Crear desde Docente => Evento = 0 / Noticia = 1   ************(!FALTA CON FILE)**********
		exports.crearEN_doc = function(req, res){
			console.log("tu aqui?");
			var fotoNombre = "";
			var adjuNombre = "";
			var n = 0;
			var storage = multer.diskStorage({
			  destination: function (req, file, callback) {
			    callback(null, '../public/eventos');
			  },
			  filename: function (req, file, callback) {
			  	var tire = parseInt(req.body.group1);
			  	if(tire == 1){
			  		var reeee = req._startTime+"";
				    var sera = reeee.split(' ');
				    var aux = sera[4].split(':');
				    adjuNombre = aux[0]+aux[1]+aux[2];
				    adjuNombre = adjuNombre+file.originalname;
				    callback(null,adjuNombre)
			  	}
			  	else{
			  		var conftt = parseInt(req.body.confoto);
			  		if (conftt == 1){
			  			if(n==1){
			  				var reeee = req._startTime+"";
						    var sera = reeee.split(' ');
						    var aux = sera[4].split(':');
						    adjuNombre = aux[0]+aux[1]+aux[2];
						    adjuNombre = adjuNombre+file.originalname;
						    callback(null,adjuNombre)
			  			}
			  			else{
			  				var reeee = req._startTime+"";
						    var sera = reeee.split(' ');
						    var aux = sera[4].split(':');
						    fotoNombre = aux[0]+aux[1]+aux[2];
						    fotoNombre = fotoNombre+file.originalname;
						    n++;
						    callback(null,fotoNombre)
			  			}
			  		}
			  		else{
			  			var reeee = req._startTime+"";
					    var sera = reeee.split(' ');
					    var aux = sera[4].split(':');
					    adjuNombre = aux[0]+aux[1]+aux[2];
					    adjuNombre = adjuNombre+file.originalname;
					    callback(null,adjuNombre)
			  		}
			  	}
			  }
			});
			/*var Filtro = function(req, file, callback){
				console.log(file);
				if(n == 1){
					console.log(es el segundo);
				}
				if(file.mimetype.split("/")[0] != "image" ){
			  		return callback(new Error());
			  	}
			  	callback(null,true);
			  	n++;
			}*/
			//var upload = multer({storage: storage, fileFilter: Filtro}).array('photos', 2);
			var upload = multer({storage: storage}).array('photos', 2);
			upload(req, res, function(err) {
				if(err) {
			 		console.log(err);
			  		res.json(err);
				}
				console.log("Nombre de la foto "+fotoNombre);
				console.log("Nombre del Adjunto "+adjuNombre);
				var tioo = parseInt(req.body.group1);
				console.log(tioo);
				if(tioo == 1){
					var fechaw = moment().add(7,'d');
					var camm = fechaw.format();
					console.log(camm);
					Docente.findOne({'_id':req.user._id}).select('eventos').exec(function(err, docs) {
					  	//agregando un evneto al array
					  	if(adjuNombre != ""){
					  		docs.eventos.push({ 
						      archivo : {
						        file :  adjuNombre
						      },
						      duraci_noti: new Date(camm),
						      titu: req.body.titulo,
						      descri: req.body.descrii,
						      tipo: parseInt(req.body.group1)
						    });
					  	}
					  	else{
					  		docs.eventos.push({
					  		  duraci_noti: new Date(camm),
						      titu: req.body.titulo,
						      descri: req.body.descrii,
						      tipo: parseInt(req.body.group1)
						    });
					  	}
					    docs.save(function (err, doc) {
					      	if(err){
								res.send('Error al intentar guardar el personaje.');
							}else{
								console.log(doc);
								res.redirect('/EveNoProf');
							}
					    });
					});

				}
				else{
					if(fotoNombre == ""){
				 		fotoNombre = 'fotoe.png';
					}
					var fech = req.body.fechhha;
					var hora = moment(fech,"YYYY-MMMM-DD HH:mm a");
					Docente.findOne({'_id':req.user._id}).select('eventos').exec(function(err, docs) {
					  	//console.log(docs);
					  	//agregando un evneto al array
					  	if(adjuNombre ==""){
					  		docs.eventos.push({ 
						      archivo : {
						        foto :  fotoNombre
						      },
						      titu: req.body.titulo,
						      descri: req.body.descrii,
						      cuando: {
						        lugar: req.body.direccion,
						        fecha: hora.toISOString()
						      },
						      tipo: parseInt(req.body.group1)
						    });
					  	}
					  	else{
					  		docs.eventos.push({ 
						      archivo : {
						        foto :  fotoNombre,
						        file :  adjuNombre
						      },
						      titu: req.body.titulo,
						      descri: req.body.descrii,
						      cuando: {
						        lugar: req.body.direccion,
						        fecha: hora.toISOString()
						      },
						      tipo: parseInt(req.body.group1)
						    });
					  	}
					    /*docs.eventos.push({ 
					      archivo : {
					        foto :  fotoNombre
					      },
					      titu: req.body.titulo,
					      descri: req.body.descrii,
					      cuando: {
					        lugar: req.body.direccion,
					        fecha: hora.toISOString()
					      },
					      tipo: parseInt(req.body.group1)
					    });*/
					    docs.save(function (err, doc) {
					      	if(err){
								res.send('Error al intentar guardar el personaje.');
							}else{
								res.redirect('/EveNoProf');
							}
					    });
					});
				}
				/*var fech = req.body.fechhha;
				var hora = moment(fech,"YYYY-MMMM-DD HH:mm a");
				console.log(hora.toISOString());
				console.log("Nombre de la foto "+fotoNombre);
				Docente.findOne({'_id':req.user._id}).select('eventos').exec(function(err, docs) {
				  	//console.log(docs);
				  	//agregando un evneto al array
				    docs.eventos.push({ 
				      archivo : {
				        foto :  fotoNombre
				      },
				      titu: req.body.titulo,
				      descri: req.body.descrii,
				      cuando: {
				        lugar: req.body.direccion,
				        fecha: hora.toISOString()
				      },
				      tipo: parseInt(req.body.group1)
				    });
				    docs.save(function (err, doc) {
				      	if(err){
							res.send('Error al intentar guardar el personaje.');
						}else{
							console.log(doc);
							res.redirect('/EveNoProf');
						}
				    });
				});*/
			})

		};
	//b)Crear desde Admin => Evento = 0 / Noticia = 1 *************(!FALTA)************

//4° Update evento o noticia
	//a)Actualizar desde Docente
		exports.update = function(req, res){
			if(req.body.direccion=="noticia"){
				Docente.findOneAndUpdate(
				    { "eventos._id":req.params.id },
				      	{ 
					        "$set": {
					            "eventos.$.titu":req.body.titulo,
					            "eventos.$.descri":req.body.descrii,
					            "eventos.$.fecha_upd": new Date()
					        }
				    	},
				    function(err,doc) {
				        if(err)
				          console.log(err);
				        else
				          res.redirect('/EveNoProf');
				    }
			    );
			}
			else{
				if(req.body.fechhha=='0'){
					Docente.findOneAndUpdate(
				      { "eventos._id":req.params.id },
				      { 
				          "$set": {
				              "eventos.$.titu":req.body.titulo,
				              "eventos.$.descri":req.body.descrii,
				              "eventos.$.cuando.lugar":req.body.direccion,
				              "eventos.$.fecha_upd": new Date()
				          }
				      },
				      function(err,doc) {
				        if(err)
				          console.log(err);
				        else
				          res.redirect('/EveNoProf');
				      }
			    	);
				}
				else{
					Docente.findOneAndUpdate(
				      { "eventos._id":req.params.id },
				      { 
				          "$set": {
				              "eventos.$.titu":req.body.titulo,
				              "eventos.$.descri":req.body.descrii,
				              "eventos.$.cuando.lugar":req.body.direccion,
				              "eventos.$.cuando.fecha":req.body.fechhha,
				              "eventos.$.fecha_upd": new Date()
				          }
				      },
				      function(err,doc) {
				        if(err)
				          console.log(err);
				        else{
				          res.redirect('/EveNoProf');
				        }
				      }
			    	);
				}
			}
		}
	//a.1)Actualizar imagen o file
		exports.update2 = function(req, res){
			var idevento = req.params.id;
			var fotoNombre = "";
			var adjuNombre = "";
			var n = 0;
			var storage = multer.diskStorage({
			  destination: function (req, file, callback) {
			    callback(null, '../public/eventos');
			  },
			  filename: function (req, file, callback) {
			  	var tire = parseInt(req.body.tipoqw);
			  	if(tire == 1){
			  		var reeee = req._startTime+"";
				    var sera = reeee.split(' ');
				    var aux = sera[4].split(':');
				    adjuNombre = aux[0]+aux[1]+aux[2];
				    adjuNombre = adjuNombre+file.originalname;
				    callback(null,adjuNombre)
			  	}
			  	else{
			  		var conftt = parseInt(req.body.confoto);
			  		if (conftt == 1){
			  			if(n==1){
			  				var reeee = req._startTime+"";
						    var sera = reeee.split(' ');
						    var aux = sera[4].split(':');
						    adjuNombre = aux[0]+aux[1]+aux[2];
						    adjuNombre = adjuNombre+file.originalname;
						    callback(null,adjuNombre)
			  			}
			  			else{
			  				var reeee = req._startTime+"";
						    var sera = reeee.split(' ');
						    var aux = sera[4].split(':');
						    fotoNombre = aux[0]+aux[1]+aux[2];
						    fotoNombre = fotoNombre+file.originalname;
						    n++;
						    callback(null,fotoNombre)
			  			}
			  		}
			  		else{
			  			var reeee = req._startTime+"";
					    var sera = reeee.split(' ');
					    var aux = sera[4].split(':');
					    adjuNombre = aux[0]+aux[1]+aux[2];
					    adjuNombre = adjuNombre+file.originalname;
					    callback(null,adjuNombre)
			  		}
			  	}
			  }
			});
			var upload = multer({storage: storage}).array('photo', 2);
			upload(req, res, function(err) {
				if(err) {
			 		console.log(err);
				}
				else{
					/*console.log('foto nombre');
					console.log(fotoNombre);
					console.log('adjunto nombre');
					console.log(adjuNombre);
					console.log('subido');
					console.log(req.body);*/
					var tipofw = parseInt(req.body.tipoqw);

					var archiwf = req.body.filesqw;

					var archiarray = archiwf.split('&&');

					if(tipofw == 0){
						if(fotoNombre == ""){
							if(adjuNombre != ""){
								Docente.findOneAndUpdate(
								    { "eventos._id":idevento},
								      	{ 
									        "$set": {
									            "eventos.$.archivo.file":adjuNombre,
									            "eventos.$.fecha_upd": new Date()
									        }
								    	},
								    function(err,doc) {
								        if(err)
								          console.log(err);
								        else{
								        	if(archiarray[1]=='undefined'){
												res.redirect('/EveNoProf');
											}
											else{
												var linkk1 = '../public/eventos/'+archiarray[1];
												fs.unlink(linkk1,function (err){
													if(err){
														console.log(err);
													}
													else{
														res.redirect('/EveNoProf');
													}
												});
											}
								        }
								    }
							    );
							}
						}
						else{
							if(adjuNombre == ""){
								Docente.findOneAndUpdate(
								    { "eventos._id":idevento},
								      	{ 
									        "$set": {
									            "eventos.$.archivo.foto":fotoNombre,
									            "eventos.$.fecha_upd": new Date()
									        }
								    	},
								    function(err,doc) {
								        if(err)
								          console.log(err);
								        else{
								        				var linkk = '../public/eventos/'+archiarray[0];
														if(archiarray[0] != 'fotoe.png'){
															fs.unlink(linkk,function (err){
																if(err){
																	console.log(err);
																}
																else{
																	res.redirect('/EveNoProf');
																}
															});
														}
														else{
															res.redirect('/EveNoProf');
														}
								        }
								    }
							    );
							}
							else{
								Docente.findOneAndUpdate(
								    { "eventos._id":idevento},
								      	{ 
									        "$set": {
									            "eventos.$.archivo.foto":fotoNombre,
									            "eventos.$.archivo.file":adjuNombre,
									            "eventos.$.fecha_upd": new Date()
									        }
								    	},
								    function(err,doc) {
								        if(err)
								          console.log(err);
								        else{
								        	if(archiarray[0]=='undefined' && archiarray[1]=='undefined'){
												res.redirect('/EveNoProf');
											}
											else{
												if(archiarray[0]!='undefined' && archiarray[1]!='undefined'){
														var linkk = '../public/eventos/'+archiarray[0];
														var linkk1 = '../public/eventos/'+archiarray[1];
														if(archiarray[0] != 'fotoe.png'){
															fs.unlink(linkk,function (err){
																if(err){
																	console.log(err);
																}
																else{
																	fs.unlink(linkk1,function (err){
																		if(err){
																			console.log(err);
																		}
																		else{
																			res.redirect('/EveNoProf');
																		}
																	});
																}
															});
														}
														else{
															fs.unlink(linkk1,function (err){
																if(err){
																	console.log(err);
																}
																else{
																	res.redirect('/EveNoProf');
																}
															});
														}
												}
												else{
													if(archiarray[0]!='undefined'){
														var linkk = '../public/eventos/'+archiarray[0];
														if(archiarray[0] != 'fotoe.png'){
															fs.unlink(linkk,function (err){
																if(err){
																	console.log(err);
																}
																else{
																	res.redirect('/EveNoProf');
																}
															});
														}
														else{
															res.redirect('/EveNoProf');
														}
													}
													else{
														var linkk = '../public/eventos/'+archiarray[1];
														fs.unlink(linkk,function (err){
															if(err){
																console.log(err);
															}
															else{
																res.redirect('/EveNoProf');
															}
														});
													}
												}
											}
								        }
								    }
							    );
							}
						}
					}
					else{
						if(adjuNombre!=""){
							Docente.findOneAndUpdate(
							    { "eventos._id":idevento},
							      	{ 
								        "$set": {
								            "eventos.$.archivo.file":adjuNombre,
								            "eventos.$.fecha_upd": new Date()
								        }
							    	},
							    function(err,doc) {
							        if(err)
							          console.log(err);
							        else{
							        	if(archiarray[1]=='undefined'){
											res.redirect('/EveNoProf');
										}
										else{
											var linkk1 = '../public/eventos/'+archiarray[1];
											fs.unlink(linkk1,function (err){
												if(err){
													console.log(err);
												}
												else{
													res.redirect('/EveNoProf');
												}
											});
										}
							        }
							    }
						    );
						}
					}
				}
			});
		}
		exports.update3 = function(req, res){
				var fechaw = moment().add(7,'d');
				var camm = fechaw.format();
				Docente.findOneAndUpdate(
				    { "eventos._id":req.params.id },
				      	{ 
					        "$set": {
					            "eventos.$.duraci_noti":new Date(camm),
					            "eventos.$.fecha_upd": new Date()
					        }
				    	},
				    function(err,doc) {
				        if(err)
				          console.log(err);
				        else
				          res.redirect('/EveNoProf');
				    }
			    );
		}
		exports.update4 = function(req, res){
			var fotoNombre ="";
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
			});
			/*var Filtro = function(req, file, callback){
				if(file.mimetype.split("/")[0] != "image" ){
			  		return callback(new Error());
			  	}
			  	callback(null,true);
			}*/
			//var upload = multer({storage: storage, fileFilter: Filtro}).single('photo');
			var upload = multer({storage: storage}).single('photo');
			upload(req, res, function(err) {
				if(err) {
				    res.redirect('/admi');
				    return;
			  	}
			  	var tipoxyz = parseInt(req.body.cualcu);
			  	if(tipoxyz == 0){
			  		Docente.findById(req.params.id, function(error, documento){
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
									var linkk = '../public/avatar/'+AntesFoto;
									if(AntesFoto != 'hombre.png' && AntesFoto != 'mujer.png'){
										fs.unlink(linkk,function (err){
										    if(err){
										    	console.log(err);
										    	res.redirect('/admi');
										    }
										    else{
										    	User.findById(req.params.id, function(error, usuarioqw){
													if(error){
														res.send('Error al intentar modificar el users.');
													}
													else{
														usuarioqw.local.foto  = fotoNombre;
														usuarioqw.save(function (error,documen) {
															res.redirect('/admi');
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
													res.redirect('/admi');
												});
											}	
										});
									}
								}
							});
						}
				  	});
			  	}
			  	else{
			  		if(tipoxyz == 1){
			  			Docente.findById(req.params.id, function(error, documento){
					  		if(error){
								res.send('Error al intentar modificar el personaje.');
							}else{
								var redd = req.body.faccqw+";"+req.body.gooqw+";"+req.body.twttqw;
								var pauser = req.body.nombre + "&&" +req.body.apellido;
								var personaje = documento;

								personaje.nombre = req.body.nombre;
								personaje.apellidos = req.body.apellido;
								personaje.ema = req.body.emaxyz;
								personaje.redes = redd;

								personaje.save(function(error, documento){
									if(error){
										res.send('Error al intentar guardar el personaje.');
									}else{
										User.findById(req.params.id, function(error, usuarioqw){
											if(error){
												res.send('Error al intentar modificar el users.');
											}
											else{
												usuarioqw.local.nombre  = pauser;
												usuarioqw.save(function (error,documen) {
													res.redirect('/admi');
												});
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
								usuarioqw.local.password  = usuarioqw.generateHash(req.body.contranew);
								usuarioqw.save(function (error,documen) {
									if(error){
										console.log(error)
									}
									else{
										res.redirect('/admi');
									}
								});
							}	
						});
			  		}
			  	}
			  /*if(fotoNombre == ""){
			  	res.redirect('/personal');
			  }*/
			  /*else{
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
								var linkk = '../public/avatar/'+AntesFoto;
								if(AntesFoto != 'hombre.png'){
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
														res.redirect('/personal');
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
												res.redirect('/personal');
											});
										}	
									});
								}
							}
						});
					}
			  	});

			  }*/
			});
		}
	//b)Actrualizar desde Admi
//5* Delete evento o noticia
	//a)Actualizar desde Docente
		exports.destruir =function(req, res){
			Docente.findById(req.user._id).select('eventos').exec(function(err, docs) {
				console.log(req.body);
				var archiwf = req.body.archivowf;
				var archiarray = archiwf.split('&&');
			    docs.eventos.pull({ _id: req.params.id });
			    docs.save(function (err) {
			    	if(err){
			    		console.log(err);
			    	}
			    	else{
			    		if(archiarray[0]=='undefined' && archiarray[1]=='undefined'){
							res.redirect('/EveNoProf');
						}
						else{
							if(archiarray[0]!='undefined' && archiarray[1]!='undefined'){
									var linkk = '../public/eventos/'+archiarray[0];
									var linkk1 = '../public/eventos/'+archiarray[1];
									if(archiarray[0] != 'fotoe.png'){
										fs.unlink(linkk,function (err){
											if(err){
												console.log(err);
											}
											else{
												fs.unlink(linkk1,function (err){
													if(err){
														console.log(err);
													}
													else{
														res.redirect('/EveNoProf');
													}
												});
											}
										});
									}
									else{
										fs.unlink(linkk1,function (err){
											if(err){
												console.log(err);
											}
											else{
												res.redirect('/EveNoProf');
											}
										});
									}
							}
							else{
								if(archiarray[0]!='undefined'){
									var linkk = '../public/eventos/'+archiarray[0];
									if(archiarray[0] != 'fotoe.png'){
										fs.unlink(linkk,function (err){
											if(err){
												console.log(err);
											}
											else{
												res.redirect('/EveNoProf');
											}
										});
									}
									else{
										res.redirect('/EveNoProf');
									}
								}
								else{
									var linkk = '../public/eventos/'+archiarray[1];
									fs.unlink(linkk,function (err){
										if(err){
											console.log(err);
										}
										else{
											res.redirect('/EveNoProf');
										}
									});
								}
							}
						}
			    		//res.redirect('/EveNoProf');
			    	}
			    });
			});
		}
	//b)Actrualizar desde Admi

//6° Otras operaciones
	//Get genero und redes
	exports.userget = function(req, res){
		Docente.findById(req.user._id).select('genero redes ema').exec(function(err, docs) {
			if(err){
				res.send('Ha surgido un error.');
			}else{
				res.json(docs);
			}
		});
	}
	exports.veripassw = function(req, res){
		User.findById(req.user._id, function(error, usuarioqw){
			if(error){
				res.send('Error al intentar modificar el users.');
			}
			else{
				if(usuarioqw.validPassword(req.params.id)){
					res.json(true);
				}
				else{
					res.json(false);
				}
				//console.log(usuarioqw.validPassword(userid[1]));
				//usuarioqw.validPassword(password)
				/*var contra = usuarioqw.local.password;
				usuarioqw.local.foto  = fotoNombre;
				usuarioqw.save(function (error,documen) {
					res.redirect('/admi');
				});*/
			}	
		});
	}






/*exports.update2 = function(req, res){
	var fotoNombre ="";
	var storage = multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, '../public/avatar');
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
				});
			}
	  	});

	  }
	});
};

exports.store = function(req, res){
	var fotoNombre ="";
	var storage = multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, '../public/avatar');
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
	  	fotoNombre = 'hombre.png';
	  }
	    var redd = req.body.face+";"+req.body.goo+";"+req.body.twwi;
		var categg = parseInt(req.body.optionsRadios);
		var personaje = new Personal({
					foto : fotoNombre,
					nombre: req.body.nombre,
					apellidos: req.body.apellido,
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
	  //response.end('Your File Uploaded');
	  console.log('Photo Uploaded');
	  })
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
exports.edit = function(req, res){
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
};

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
			personaje.nombre = req.body.nombre;
			personaje.apellidos = req.body.apellido;
			personaje.descri = req.body.historia;
			personaje.categoria = categg;
			personaje.redes = redd;
			console.log("despues");
			console.log(personaje);
			personaje.save(function(error, documento){
				if(error){
					res.send('Error al intentar guardar el personaje.');
				}else{	
					res.redirect('/personal');
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
				});
			}
	});
};*/
