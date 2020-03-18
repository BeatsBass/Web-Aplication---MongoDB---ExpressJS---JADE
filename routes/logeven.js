var Logevent;
exports.setModel = function(modelo){
	Logevent = modelo;
};
exports.index = function(req, res){

	/*Logevent.find({},sort('-fecha'), function(error, personal){
		if(error){
			res.send('Ha surgido un error.'+error);
		}else{
			res.render('indexlog', {
				logeve: personal
			});
		}
	})*/
	Logevent.find({}).sort('-fecha').exec(function(error, personal) {
		if(error){
			res.send('Ha surgido un error.'+error);
		}else{
			res.render('indexlog', {
				logeve: personal
			});
		}
	});
};
exports.destroy = function(req, res){
	Logevent.remove({_id: req.params.id}, function(error){
		if(error){
			res.send('Error al intentar eliminar el personaje.');
		}else{	
			res.redirect('/requisito');
		}
	});
};