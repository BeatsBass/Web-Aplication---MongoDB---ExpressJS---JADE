var mongoose = require('mongoose');
var moment = require('moment'); 
var personal;
var requisito;
var documento;

exports.hola = function(modelo2,modelo3,modelo4){
	personal = modelo2;
	requisito = modelo3;
	documento = modelo4;
};

exports.ObAjxRequi = function (req, res) {
	requisito.find({}, function(error, personal){
		if(error){
			res.send('Ha surgido un error.');
		}else{
			res.json(personal);
		}
	})
}

exports.ObAjxProf = function(req, res){
	personal.find({}, function (error, personal) {
		if(error){
			res.send('ERROR');
		}else{
			res.json(personal);
		}
	})
}

exports.ObAjxCrono = function(req, res){
	documento.find({'tipo':0},'foto fecha',function(error, documento){
		if(error){
			res.send('Ha surgido un error.');
		}else{
			var tiempo = documento[0].fecha.split('&&')[1]+" "+documento[0].fecha.split('&&')[0];
			var j1 = moment(tiempo,"D-M-YYYY HH:mm:ss a").toString();
			var footo = documento[0].foto;
			var docc = {
				fechaas: j1,
				documento: footo
			}
			res.json(docc);
		}
	})
}



exports.cabeza = function(req, res){
	
	personal.find({}, function(error, personal1){
		if(error){
			res.send('Ha surgido un error.');
		}else{
			var fechaw = moment().subtract(1,'h');
			var camm = fechaw.format();
			personal.aggregate([
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
		    	{ $match: { $and: [ { 'cuando.fecha': { $gte : new Date(camm)} }, { tipo: 0 } ] } }
		    	
			], function (err, result) {
			     if (err) {
			        res.send('Ha surgido un error.');
			     }
			     else{
			     	var fechawnoti = moment();
					var cammnoti = fechawnoti.format();
			     	personal.aggregate([
					    { $unwind: "$eventos" },
					    { $project: {
					    	archivo : {
								file : '$eventos.archivo.file'
							},
							titu: '$eventos.titu',
							descri: '$eventos.descri',
							duraci_noti:'$eventos.duraci_noti',
							tipo:'$eventos.tipo',
							dispo: '$eventos.dispo',
					        _id: '$eventos._id',
					        autor_nombre: '$nombre',
					        autor_apelliudos:'$apellidos',
					        id_author:'$_id',
					        fecha_ini: '$eventos.fecha_ini'
					    }},
				    	{ $sort: {fecha_ini: -1}},
				    	{ $match: { $and: [ { duraci_noti: { $gte : new Date(cammnoti)} }, { tipo: 1 } ] } }
					], function (err, result1) {
					     if (err) {
					        res.send('Ha surgido un error.');
					     }
					     else{
					     	//console.log(result);
					     	res.render('layout2', {
								temporal: personal1,
								evenoti:result,
								noti:result1
							});
					     }
					});
			     }
			});
		}
	})
};