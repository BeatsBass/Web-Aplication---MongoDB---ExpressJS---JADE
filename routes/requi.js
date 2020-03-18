var Requisi;
exports.setModel = function(modelo){
	Requisi = modelo;
};
exports.index = function(req, res){
	Requisi.find({}, function(error, personajes){
		if(error){
			res.send('Ha surgido un error.');
		}else{
			res.render('indexr', {
				requisito: personajes
			});
		}
	})
};
exports.create = function(req, res){
	res.render('saver', {
		put: false,
		action: '/requisito/',
		personaje: new Requisi({
			descri: '',
			tipo: 0
		})
	});
};
exports.create2 = function(req, res){
	var rerequi = {
		action: '/requisito/',
	}
	res.json(rerequi);
};
exports.store = function(req, res){
	console.log(req.body);
	var categg = parseInt(req.body.optionsRadios);
	var personaje = new Requisi({
		descri: req.body.requisito,
		tipo: categg
	});
	console.log(personaje);
	personaje.save(function(error, documento){
		if(error){
			res.send('Error al intentar guardar el personaje.');
		}else{	
			res.redirect('/requisito');
		}
	});
};

exports.show = function(req, res){
	Requisi.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{
			res.render('personajes/show', {
				personaje: documento
			});
		}
	});
};
exports.show2 = function(req, res){
	Requisi.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{
			res.json(documento);
		}
	});
};
exports.edit = function(req, res){
	Requisi.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{
			res.render('saver', {
				put: true,
				action: '/requisito/' + req.params.id,
				personaje: documento
			});
		}
	});
};
exports.edit2 = function(req, res){
	Requisi.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{
			var profe = {
				put: true,
				action:  '/requisito/' + req.params.id,
				personaje: documento
			}
			res.json(profe);
		}
	});
};
exports.update = function(req, res){
	Requisi.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar modificar el personaje.');
		}else{
			var personaje = documento;
			personaje.descri = req.body.requisito;
			personaje.tipo = parseInt(req.body.optionsRadios);

			personaje.save(function(error, documento){
				if(error){
					res.send('Error al intentar guardar el personaje.');
				}else{	
					res.redirect('/requisito');
				}
			});
		}
	});
};
exports.destroy = function(req, res){
	Requisi.remove({_id: req.params.id}, function(error){
		if(error){
			res.send('Error al intentar eliminar el personaje.');
		}else{	
			res.redirect('/requisito');
		}
	});
};
