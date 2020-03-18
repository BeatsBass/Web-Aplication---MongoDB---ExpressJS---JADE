var personal = require('./personal');
var requisito = require('./requi');
var documento = require('./docume');
var doceventos = require('./doce_evento');
var logeven = require('./logeven');
var semestre = require('./semestr');
var alumnox = require('./alumno');

module.exports = function(app, passport) {
    /*app.get('/', function(req, res) {
        res.render('index3');
    });*/
    app.get('/', function(req, res) {
        var siuser = req.user+"";
        if(siuser == 'undefined'){
            res.render('admilogin', { message: req.flash('loginMessage') }); 
        }
        else{
            res.redirect('/admi');
        }
    });
    app.get('/signup', function(req, res) {
        res.render('signup', { message: req.flash('signupMessage') });
    });
    app.get('/admi', isLoggedIn, function(req, res) {
        if(req.user.tipo == 'admin'){
            res.render('admi', {
                user : req.user
            });
        }
        else{
            if(req.user.tipo == 'docente'){
                res.render('profe', {
                    user : req.user
                });
            }
            else{
                res.render('alumno', {
                    user : req.user
                });
            }
        }
    });
    //Solo para Administrador
        //Pa profesores
        app.get('/personal',isLoggedInA, personal.index);
        app.get('/personal/create2',isLoggedInA, personal.create2);
        app.post('/personal',isLoggedInA, personal.store);
        app.get('/persona/:id',isLoggedInA, personal.show2);
        //app.get('/personal/:id/edit',isLoggedInA, personal.edit);
        app.get('/perso/:mail/:nombre/:apelli',isLoggedInA, personal.validauser);

        app.put('/personal/:id',isLoggedInA, personal.update);
        app.post('/persona/:id',isLoggedInA, personal.update2);
        app.delete('/personal/:id',isLoggedInA, personal.destroy);
        //Pa requisitos
        app.get('/requisito',isLoggedInA, requisito.index);
        app.get('/requisito/create2',isLoggedInA, requisito.create2);
        app.post('/requisito',isLoggedInA, requisito.store);
        app.get('/requisit/:id',isLoggedInA, requisito.show2);
        app.get('/requisit/:id/edit',isLoggedInA, requisito.edit2);
        app.put('/requisito/:id',isLoggedInA, requisito.update);
        app.delete('/requisito/:id',isLoggedInA, requisito.destroy);
        //Pa archivos
        app.get('/docc',isLoggedInA, documento.index);
        app.get('/docc/create',isLoggedInA, documento.create2);
        app.post('/docc',isLoggedInA, documento.store);
        app.get('/doccval/:tipo',isLoggedInA,documento.valida);
        app.delete('/docc/:id',isLoggedInA, documento.destroy);
        app.post('/docc/:id',isLoggedInA, documento.update2);
        //Pa log
        app.get('/logevent',isLoggedInA, logeven.index);
        app.delete('/logevent/:id',isLoggedInA, logeven.destroy);
        //Pa semestre
        app.get('/semestre',isLoggedInA, semestre.index);
        app.post('/semestre',isLoggedInA, semestre.store);
        app.get('/semestreveri',isLoggedInA, semestre.verifica);
        //Pa alumnos
        app.get('/alumnos',isLoggedInA, alumnox.index);
        app.post('/buscar_al',isLoggedInA, alumnox.busca_al);
        app.get('/alumno/:id',isLoggedInA, alumnox.resumenv1_n1);
    //Para docente
        app.get('/h1',isLoggedInD, function(req, res){
          res.render('profe');
        });
    //Para docente page
        //Eventos y Noticias
            app.get('/EveNoProf',isLoggedInD, doceventos.index_tu);
            app.get('/obtienexyq/:id',isLoggedInD, doceventos.userget);
            app.get('/obtienepassw/:id',isLoggedInD, doceventos.veripassw);

            app.post('/EveNoProf',isLoggedInD, doceventos.crearEN_doc);
            app.put('/EveNoProf/:id',isLoggedInD, doceventos.update);
            app.post('/EveNoPro/:id',isLoggedInD, doceventos.update2);
            app.post('/EveNoProNo/:id',isLoggedInD, doceventos.update3);
            app.post('/cambioer/:id',isLoggedInD, doceventos.update4);
            app.delete('/EveNoProf/:id',isLoggedInD, doceventos.destruir);
        //Cursos Docente
            //app.get('/EveNoProf',isLoggedInD, doceventos.index_tu);

    //Para Alumnos
        //Chart Estadisticas
            app.get('/chart',isLoggedInAlu,alumnox.chart_esta);

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/admi', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
function isLoggedInA(req, res, next) {
    if (req.isAuthenticated() && req.user.tipo == "admin")
        return next();
    res.redirect('/admi');
}
function isLoggedInD(req, res, next) {
    if (req.isAuthenticated() && req.user.tipo == "docente")
        return next();
    res.redirect('/admi');
}
function isLoggedInAlu(req, res, next) {
    if (req.isAuthenticated() && req.user.tipo == "alumno")
        return next();
    res.redirect('/admi');
}
