require('dotenv').config()
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override')

//Login admi
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
//---------------

var personal = require('./routes/personal');

var index = require('./routes/index');
var users = require('./routes/users');
var requisito = require('./routes/requi');
var globalmente = require('./routes/globalmente');
var documento = require('./routes/docume');
var docevento = require('./routes/doce_evento');
var logeven = require('./routes/logeven');
var semestr = require('./routes/semestr');
var alumno = require('./routes/alumno');
var asignatura = require('./routes/asignatura');

//var config = require('./routes/config');
//var usuario   = require('./routes/Usuario');


mongoose.connect(process.env.URI, function (error) {
  if (error) {
    throw error;
  } else {
    console.log('Conectado a MongoDB');
  }
});




/*mongoose.connect('mongodb://127.0.0.1/primer_base', function(error){
  if(error){
    throw error;		
  }else{
    console.log('Conectado a MongoDB');
  }
});*/
//Modelo de Requiistos
var RequisitoSchema = mongoose.Schema({
  descri: { type: String, required: true },
  tipo: { type: Number }
});
var RequiModel = mongoose.model('Requisito', RequisitoSchema);
requisito.setModel(RequiModel);

//Modelo de Documentos
//tipo => 0 = Cronograma Admisión año xxxx (type = img) (Se puede almacenar, máximo 3)
//        1 = Tabla de vacantes (type = img) (Se puede CreateReadUpdateDelete, máximo 3)
//        2 = Prospecto (type = pdf) (Se puede almacenar los prospectos, maximo de 5)
//        3 = Balotario (type = pdf) (solo se puede actualizar)*
var DocuSchema = mongoose.Schema({
  foto: { type: String, required: true },
  fecha: { type: String, required: true },
  //fecha_cre:{type:Date,default: Date.now},
  //fecha_upd:{type:Date},
  tipo: { type: Number, required: true }
});
var DocuModel = mongoose.model('Documento', DocuSchema);
documento.setModel(DocuModel);

//Modelo de Log
//tipolog
// 0 = Create
// 1 = Update
// 2 = Delete
var LogSchema = mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  tipolog: { type: Number, required: true },
  userlog: { type: String, required: true },
  descri: { type: String, required: true }
});
var LogModel = mongoose.model('loggg', LogSchema);
logeven.setModel(LogModel);

//Modelo de Docetesv2
var EventoSchema = mongoose.Schema({
  archivo: {
    foto: { type: String },
    file: { type: String }
  },
  titu: { type: String, required: true },
  descri: { type: String, required: true },
  cuando: {
    lugar: { type: String },
    fecha: { type: Date }
  },
  duraci_noti: { type: Date },
  tipo: { type: Number, required: true },
  dispo: { type: Boolean, default: true },
  fecha_ini: { type: Date, default: Date.now },
  fecha_upd: { type: Date }
});



//Schema para profe_prue
//distribución carga horaria(prueba)
var AsignaturaDoceSchema = mongoose.Schema({
  semestre: { type: String },
  enlaze: { type: String },
  grupo: { type: String },
  horario: {
    hora_ini: { type: Number },
    hora_fin: { type: Number }
  }
});
/*var DocenteSchema = mongoose.Schema({
  nombre:{type:String},
  asignaturas:[AsignaturaDoceSchema]
});

var DocentexModel = mongoose.model('docentex',DocenteSchema);*/

//version Ok
var DocenSchema = mongoose.Schema({
  _id: { type: String },
  ema: { type: String },
  foto: { type: String },
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  genero: { type: Number, required: true },
  descri: { type: String, required: true },
  categoria: { type: Number, required: true },
  redes: { type: String },
  eventos: [EventoSchema],
  asignaturas: [AsignaturaDoceSchema]
});

var DocenteModel = mongoose.model('docente', DocenSchema);
personal.setModel(DocenteModel, LogModel);

docevento.setModel(DocenteModel);

//Asignaturas
var AndSchema = mongoose.Schema({
  _id: { type: String }
});
var AbreSchema = mongoose.Schema({
  _id: { type: String },//codigo de curso
  con: [AndSchema]

});

var AsignaturaxSchema = mongoose.Schema({
  cod_asignatura: { type: String },
  cod_carrera: { type: String },
  enlaze: { type: String }, //enlaze = cod_asignatura + cod_carrera
  nombre: { type: String },
  categoria: { type: String },
  creditos: { type: Number },
  abre: [AbreSchema]
});
var AsignaturaModel = mongoose.model('curso', AsignaturaxSchema);
asignatura.setModel(AsignaturaModel);

//Schema para alumno

var MatriculaSchema = mongoose.Schema({
  semestre: { type: String },
  grupo: { type: String },
  nota: { type: Number },
  enlaze: { type: String } //enlaze = cod_asignatura + cod_carrera
})

var AlumnoSchema = mongoose.Schema({
  _id: { type: String },
  dni: { type: String },
  ema: { type: String },
  foto: { type: String },
  nombre: { type: String },
  ap: { type: String },
  am: { type: String },
  fecha_na: { type: Date },
  genero: { type: Number },
  carrera: { type: String },
  fecha_cre: { type: Date, default: Date.now },
  fecha_upd: { type: Date },
  matriculas: [MatriculaSchema]
});

var AlumnoModel = mongoose.model('alumno', AlumnoSchema);
alumno.setModel(AlumnoModel);

//Schema semetre control

/*
semestre = año + (I => marzo-abril || II julio )
*/
var SemestreSchema = mongoose.Schema({
  _id: { type: String },
  fecha_cre: { type: Date, default: Date.now },
  fecha_upd: { type: Date },
  activox: { type: Boolean, default: true },
  ingresos: { type: Number, default: 0 },
  costo_credi: { type: Number, default: 5 },
  configuracion: {
    matriculas: {
      fecha_ini: { type: Date },
      fecha_fin: { type: Date },
      fecha_upd: { type: Date },
      nro_upd: { type: Number, default: 0 }
    },
    notas: {
      nota1: {
        fecha_ini: { type: Date },
        fecha_fin: { type: Date },
        fecha_upd: { type: Date },
        nro_upd: { type: Number, default: 0 }
      },
      nota2: {
        fecha_ini: { type: Date },
        fecha_fin: { type: Date },
        fecha_upd: { type: Date },
        nro_upd: { type: Number, default: 0 }
      },
      nota3: {
        fecha_ini: { type: Date },
        fecha_fin: { type: Date },
        fecha_upd: { type: Date },
        nro_upd: { type: Number, default: 0 }
      },
      nota_sus: {
        fecha_ini: { type: Date },
        fecha_fin: { type: Date },
        fecha_upd: { type: Date },
        nro_upd: { type: Number, default: 0 }
      }
    }
  }
});

var SemestreModel = mongoose.model('semestre', SemestreSchema);
semestr.setModel(SemestreModel);

//Schema alumno update matricula nromaximoupdate = 4

var AlumnoSemeMaSchema = mongoose.Schema({
  _id: { type: String },//id alumno
  semestre: { type: String },
  fecha_upd: { type: Date },
  nro_upd: { type: Number, default: 4 }
});

var AlumnoSemeMaModel = mongoose.model('alumnosemema', AlumnoSemeMaSchema);

//Schema distribucion horaria
/*
  0 => 7-8
  1 => 8-9
  2 => 9-10
  3 => 10-11
  4 => 11-12
  5 => 12-1
  6 => 3-4
  7 => 4-5
*/
var HorarioSchema = mongoose.Schema({
  _id: { type: String },//= codasignatura+codcarrera+semestre (S1 IN 2017-I)
  encargado: { type: String },//coddocente
  /*
  nro_matriculados:{type:Number},//muestra nro de matriculados
  nro_max:{type:Number},//numero máximo a matricularse
  nro_min:{type:Number},//numero mínimo a matricularse
  */
  horario: {
    hora_ini: { type: Number },
    hora_fin: { type: Number }
  }
});

var HorarioModel = mongoose.model('horario', HorarioSchema);

//Schema concepto pago FALTA
/*
 0 => sin costo = 0
 1 => sin cargo = 1
 2 => costo credito = <=2
 3 => costo credito +25% <=3
 4 => costo credito +50% >=4
*/
/*
var PagoSchema = mongoose.Schema({
  _id:{type:String},//=codalumno+semestre
  codalumno:{type:String},
  cancelado:{type:Boolean,default:false}
  concepto:{
    concepto1:{type:Number},
    concepto2:{type:Number},
    concepto3:{type:Number},
    rango_cargo:{type:Number,default:0}
  }
});
*/



globalmente.hola(DocenteModel, RequiModel, DocuModel);

//Pruebas (agrgando data x código) **********************************************
//var User = require('./routes/Usuario');
//1° Agregamos datos
//Docentes
/*var newUser =new User();
newUser.local.email    = 'Docente1@alviña.com';
newUser.local.password = newUser.generateHash('Docente1');
newUser.local.nombre   = 'Docente1' + "&&" +'Apellido1';
newUser.local.foto     = 'hombre.png';
newUser.tipo = "docente";

newUser.save(function(err) {
    if (err){
      res.send('Error, Nivel => User - Docente');
    }
    else{ 
        var personajex = new DocenteModel({
          nombre: 'Docente1',
          _id: '5953d4ca7e6d1a1738f0c6a8',
          ema: 'Docente1@hotmail.com',
          foto: 'hombre.png',
          apellidos: 'Apellido1',
          genero: 0,
          descri: 'Descripcion1',
          categoria: 2,
          redes: 'R1;R2;R3',
          asignaturas:[{
              semestre:'2015-I',
              enlaze:'S1 IN',
              grupo: 'A',
              horario:{
                hora_ini:0,
                hora_fin:1
              }
            },{
              semestre:'2015-I',
              enlaze:'S4 IN',
              grupo: 'A',
              horario:{
                hora_ini:4,
                hora_fin:5
              }
            },{
              semestre:'2015-II',
              enlaze:'S5 IN',
              grupo: 'A',
              horario:{
                hora_ini:0,
                hora_fin:1
              }
            },{
              semestre:'2015-II',
              enlaze:'S8 IN',
              grupo: 'A',
              horario:{
                hora_ini:2,
                hora_fin:3
              }
            },{
              semestre:'2016-I',
              enlaze:'S9 IN',
              grupo: 'A',
              horario:{
                hora_ini:0,
                hora_fin:1
              }
            },{
              semestre:'2017-I',
              enlaze:'S12 IN',
              grupo: 'A',
              horario:{
                hora_ini:0,
                hora_fin:1
              }
            }
          ]
        });
        personajex.save(function(error, documento){
            if(error){
               console.log('Error al intentar guardar el personaje.');
            }else{  
              console.log(documento);
            }
        });
    /*}
});*/

/*var newUser1 =new User();
newUser1.local.email    = 'Docente2@alviña.com';
newUser1.local.password = newUser1.generateHash('Docente2');
newUser1.local.nombre   = 'Docente2' + "&&" +'Apellido2';
newUser1.local.foto     = 'mujer.png';
newUser1.tipo = "docente";

newUser1.save(function(err) {
    if (err){
      res.send('Error, Nivel => User - Alumno');
    }
    else{ 
      var personajet = new DocenteModel({
        nombre: 'Docente2',
        _id: '5953d4ca7e6d1a1738f0c6a9',
        ema: 'Docente2@hotmail.com',
        foto: 'mujer.png',
        apellidos: 'Apellido2',
        genero: 1,
        descri: 'Descripcion2',
        categoria: 0,
        redes: 'R1;R2;R3',
        asignaturas:[{
            semestre:'2015-I',
            enlaze:'S3 IN',
            grupo: 'A',
            horario:{
              hora_ini:2,
              hora_fin:3
            }
          },{
            semestre:'2015-II',
            enlaze:'S2 IN',
            grupo: 'A',
            horario:{
              hora_ini:6,
              hora_fin:7
            }
          },{
            semestre:'2015-II',
            enlaze:'S6 IN',
            grupo: 'A',
            horario:{
              hora_ini:4,
              hora_fin:5
            }
          },{
            semestre:'2016-I',
            enlaze:'S10 IN',
            grupo: 'A',
            horario:{
              hora_ini:2,
              hora_fin:3
            }
          },{
            semestre:'2016-I',
            enlaze:'S11 IN',
            grupo: 'A',
            horario:{
              hora_ini:6,
              hora_fin:7
            }
          },{
            semestre:'2016-II',
            enlaze:'S11 IN',
            grupo: 'A',
            horario:{
              hora_ini:6,
              hora_fin:7
            }
          }
        ]
      });
      personajet.save(function(error, documento){
          if(error){
             console.log('Error al intentar guardar el personaje. xx'+error);
          }else{  
            console.log(documento);
          }
      });
    /*}
});*/

/*var newUser2 =new User();
newUser2.local.email    = 'Docente3@alviña.com';
newUser2.local.password = newUser2.generateHash('Docente3');
newUser2.local.nombre   = 'Docente3' + "&&" +'Apellido3';
newUser2.local.foto     = 'hombre.png';
newUser2.tipo = "docente";

newUser2.save(function(err) {
    if (err){
      res.send('Error, Nivel => User - Alumno');
    }
    else{ 
      var personajegg = new DocenteModel({
        nombre: 'Docente3',
        _id: '5953d4ca7e6d1a1738f0c6aa',
        ema: 'Docente3@hotmail.com',
        foto: 'hombre.png',
        apellidos: 'Apellido3',
        genero: 0,
        descri: 'Descripcion3',
        categoria: 1,
        redes: 'R1;R2;R3',
        asignaturas:[{
            semestre:'2015-I',
            enlaze:'S2 IN',
            grupo: 'A',
            horario:{
              hora_ini:6,
              hora_fin:7
            }
          },{
            semestre:'2015-II',
            enlaze:'S1 IN',
            grupo: 'A',
            horario:{
              hora_ini:0,
              hora_fin:1
            }
          },{
            semestre:'2015-II',
            enlaze:'S7 IN',
            grupo: 'A',
            horario:{
              hora_ini:6,
              hora_fin:7
            }
          },{
            semestre:'2016-I',
            enlaze:'S7 IN',
            grupo: 'A',
            horario:{
              hora_ini:6,
              hora_fin:7
            }
          },{
            semestre:'2016-II',
            enlaze:'S10 IN',
            grupo: 'A',
            horario:{
              hora_ini:6,
              hora_fin:7
            }
          },{
            semestre:'2016-II',
            enlaze:'S9 IN',
            grupo: 'A',
            horario:{
              hora_ini:0,
              hora_fin:1
            }
          }
        ]
      });
      personajegg.save(function(error, documento){
          if(error){
             console.log('Error al intentar guardar el personaje.');
          }else{  
            console.log(documento);
          }
      });
    /*}
});*/

//Asignaturas

/*var pers = new AsignaturaModel({
  cod_asignatura:'S1',
  cod_carrera:'IN',
  nombre:'Curso1',
  enlaze:'S1 IN',
  categoria: 'EE',
  creditos: 2,
  abre:[{
      _id:'S5'
    }
  ]
});
pers.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers0 = new AsignaturaModel({
  cod_asignatura:'S2',
  cod_carrera:'IN',
  nombre:'Curso2',
  enlaze:'S2 IN',
  categoria: 'OE',
  creditos: 4,
  abre:[{
      _id:'S6'
    }
  ]
});
pers0.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers1 = new AsignaturaModel({
  cod_asignatura:'S3',
  cod_carrera:'IN',
  nombre:'Curso3',
  enlaze:'S3 IN',
  categoria: 'OE',
  creditos: 4,
  abre:[{
      _id:'S7'
    }
  ]
});
pers1.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers10 = new AsignaturaModel({
  cod_asignatura:'S4',
  cod_carrera:'IN',
  nombre:'Curso4',
  enlaze:'S4 IN',
  categoria: 'OE',
  creditos: 4,
  abre:[{
      _id:'S8'
    }
  ]
});
pers10.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers2 = new AsignaturaModel({
  cod_asignatura:'S5',
  cod_carrera:'IN',
  nombre:'Curso5',
  enlaze:'S5 IN',
  categoria: 'OE',
  creditos: 4,
  abre:[{
      _id:'S9'
    },{
      _id:'S10'
    }
  ]
});
pers2.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers3 = new AsignaturaModel({
  cod_asignatura:'S6',
  cod_carrera:'IN',
  nombre:'Curso6',
  enlaze:'S6 IN',
  categoria: 'OE',
  creditos: 2,
  abre:[{
      _id:'S11'
    },{
      _id:'S12'
    },{
      _id:'S16'
    }
  ]
});
pers3.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers4 = new AsignaturaModel({
  cod_asignatura:'S7',
  cod_carrera:'IN',
  nombre:'Curso7',
  enlaze:'S7 IN',
  categoria: 'EE',
  creditos: 2,
  abre:[{
      _id:'S13',
      con:[{
        _id:'S8'
      }]
    }
  ]
});
pers4.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers5 = new AsignaturaModel({
  cod_asignatura:'S8',
  cod_carrera:'IN',
  nombre:'Curso8',
  enlaze:'S8 IN',
  categoria: 'OE',
  creditos: 2,
  abre:[{
      _id:'S13',
      con:[{
        _id:'S7'
      }]
    }
  ]
});
pers5.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers6 = new AsignaturaModel({
  cod_asignatura:'S9',
  cod_carrera:'IN',
  nombre:'Curso9',
  enlaze:'S9 IN',
  categoria: 'OE',
  creditos: 4,
  abre:[{
      _id:'S14'
    }
  ]
});
pers6.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers7 = new AsignaturaModel({
  cod_asignatura:'S10',
  cod_carrera:'IN',
  nombre:'Curso10',
  enlaze:'S10 IN',
  categoria: 'OE',
  creditos: 5,
  abre:[{
      _id:'S14'
    }
  ]
});
pers7.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers8 = new AsignaturaModel({
  cod_asignatura:'S11',
  cod_carrera:'IN',
  nombre:'Curso11',
  enlaze:'S11 IN',
  categoria: 'OE',
  creditos: 2,
  abre:[{
      _id:'S15',
      con:[{
        _id:'S12'
      }]
    }
  ]
});
pers8.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers9 = new AsignaturaModel({
  cod_asignatura:'S12',
  cod_carrera:'IN',
  nombre:'Curso12',
  enlaze:'S12 IN',
  categoria: 'OE',
  creditos: 4,
  abre:[{
      _id:'S15',
      con:[{
        _id:'S11'
      }]
    }
  ]
});
pers9.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers13 = new AsignaturaModel({
  cod_asignatura:'S13',
  cod_carrera:'IN',
  nombre:'Curso13',
  enlaze:'S13 IN',
  categoria: 'OE',
  creditos: 2
});
pers13.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers14 = new AsignaturaModel({
  cod_asignatura:'S14',
  cod_carrera:'IN',
  nombre:'Curso14',
  enlaze:'S14 IN',
  categoria: 'OE',
  creditos: 4
});
pers14.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers15 = new AsignaturaModel({
  cod_asignatura:'S15',
  cod_carrera:'IN',
  nombre:'Curso15',
  enlaze:'S15 IN',
  categoria: 'OE',
  creditos: 5
});
pers15.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});

var pers16 = new AsignaturaModel({
  cod_asignatura:'S16',
  cod_carrera:'IN',
  nombre:'Curso16',
  enlaze:'S16 IN',
  categoria: 'OE',
  creditos: 2
});
pers16.save(function(error, documento){
    if(error){
       console.log('Error al intentar guardar el personaje.'+error);
    }else{  
      console.log(documento);
    }
});*/

//Alumnos
/*var newUserqw =new User();
newUserqw.local.email    = 'AnaMariaMiyuki@hotmail.com';
newUserqw.local.password = newUserqw.generateHash('AnaMariaMiyuki');
newUserqw.local.nombre   = 'Ana Maria Miyuki'+ "&&" +'Yamada Gameiro';
newUserqw.local.foto     = '190243Mochigusare.jpg';
newUserqw.tipo = "alumno";
newUserqw.tipoalumno.creditos = 0;
newUserqw.tipoalumno.carrera = 'EDAR';

newUserqw.save(function(err) {
    if (err){
      res.send('Error, Nivel => User - Alumno');
    }
    else{ 
      var personajeal = new AlumnoModel({
        nombre: 'Ana Maria Miyuki',
        carrera: 'EDAR',
        _id:newUserqw._id,
        dni:'88888888',
        ema:'AnaMariaMiyuki@hotmail.com',
        foto: '190243Mochigusare.jpg',
        ap: 'Yamada',
        am: 'Gameiro',
        fecha_na:moment("1994-March-13","YYYY-MMMM-DD"),
        genero:1,
        matriculas:[{
            semestre : '2015-I',
            grupo : 'A',
            nota :16,
            enlaze: 'S1 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :14,
            enlaze: 'S2 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :17,
            enlaze: 'S3 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :20,
            enlaze: 'S4 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :14,
            enlaze: 'S5 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :16,
            enlaze: 'S6 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :18,
            enlaze: 'S7 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :19,
            enlaze: 'S8 IN'
          },{
            semestre : '2016-I',
            grupo : 'A',
            nota :15,
            enlaze: 'S9 IN'
          },{
            semestre : '2016-I',
            grupo : 'A',
            nota :18,
            enlaze: 'S10 IN'
          },{
            semestre : '2016-I',
            grupo : 'A',
            nota :19,
            enlaze: 'S11 IN'
          }
        ]
      });
      personajeal.save(function(error, documento){
          if(error){
             console.log('Error al intentar guardar el personaje.');
          }else{  
            console.log(documento);
          }
      });
    }
});
var newUserqw =new User();
newUserqw.local.email    = 'CeoMiyu@hotmail.com';
newUserqw.local.password = newUserqw.generateHash('CeoMiyu');
newUserqw.local.nombre   = 'Ceo Miyu'+ "&&" +'Fernandez Cameiro';
newUserqw.local.foto     = 'mujer.png';
newUserqw.tipo = "alumno";
newUserqw.tipoalumno.creditos = 0;

newUserqw.save(function(err) {
    if (err){
      res.send('Error, Nivel => User - Alumno');
    }
    else{ 
      var personajeal = new AlumnoModel({
        nombre: 'Ceo Miyu',
        carrera: 'IN',
        _id:newUserqw._id,
        dni:'12345678',
        ema:'CeoMiyu@hotmail.com',
        foto: 'mujer.png',
        ap: 'Fernandez',
        am: 'Cameiro',
        fecha_na:moment("2004-April-20","YYYY-MMMM-DD"),
        genero:1,
        matriculas:[{
            semestre : '2015-I',
            grupo : 'A',
            nota :16,
            enlaze: 'S1 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :14,
            enlaze: 'S2 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :17,
            enlaze: 'S3 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :20,
            enlaze: 'S4 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :14,
            enlaze: 'S5 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :16,
            enlaze: 'S6 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :18,
            enlaze: 'S7 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :19,
            enlaze: 'S8 IN'
          },{
            semestre : '2016-I',
            grupo : 'A',
            nota :15,
            enlaze: 'S9 IN'
          },{
            semestre : '2016-I',
            grupo : 'A',
            nota :18,
            enlaze: 'S10 IN'
          },{
            semestre : '2016-I',
            grupo : 'A',
            nota :10,
            enlaze: 'S11 IN'
          }
        ]
      });
      personajeal.save(function(error, documento){
          if(error){
             console.log('Error al intentar guardar el personaje.');
          }else{  
            console.log(documento);
          }
      });
    }
});


var newUserty =new User();
newUserty.local.email    = 'Niobe_N@gmail.com';
newUserty.local.password = newUserty.generateHash('Niobe');
newUserty.local.nombre   = 'Niobe'+ "&&" +'Pazo Torres';
newUserty.local.foto     = 'mujer.png';
newUserty.tipo = "alumno";
newUserty.tipoalumno.creditos = 0;

newUserty.save(function(err) {
    if (err){
      res.send('Error, Nivel => User - Alumno');
    }
    else{ 
      var personajexal = new AlumnoModel({
        nombre: 'Niobe',
        carrera: 'IN',
        _id:newUserty._id,
        dni:'53846214',
        ema:'Niobe_Nb@gmail.com',
        foto: 'mujer.png',
        ap: 'Pazo',
        am: 'Torres',
        fecha_na:moment("2004-December-20","YYYY-MMMM-DD"),
        genero:1,
        matriculas:[{
            semestre : '2015-I',
            grupo : 'A',
            nota :13,
            enlaze: 'S1 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :10,
            enlaze: 'S2 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :13,
            enlaze: 'S3 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :15,
            enlaze: 'S4 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :14,
            enlaze: 'S5 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :16,
            enlaze: 'S2 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :6,
            enlaze: 'S7 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :14,
            enlaze: 'S8 IN'
          },{
            semestre : '2016-I',
            grupo : 'A',
            nota :15,
            enlaze: 'S9 IN'
          },{
            semestre : '2016-I',
            grupo : 'A',
            nota :18,
            enlaze: 'S10 IN'
          },{
            semestre : '2016-I',
            grupo : 'A',
            nota :11,
            enlaze: 'S6 IN'
          },{
            semestre : '2016-II',
            grupo : 'A',
            nota :10,
            enlaze: 'S11 IN'
          }
        ]
      });
      personajexal.save(function(error, documento){
          if(error){
             console.log('Error al intentar guardar el personaje.');
          }else{  
            console.log(documento);
          }
      });
    }
});

var newUserhh =new User();
newUserhh.local.email    = 'Maria@hotmail.com';
newUserhh.local.password = newUserhh.generateHash('Maria');
newUserhh.local.nombre   = 'Maria'+ "&&" +'Cameiro Cameiro';
newUserhh.local.foto     = 'mujer.png';
newUserhh.tipo = "alumno";
newUserhh.tipoalumno.creditos = 0;

newUserhh.save(function(err) {
    if (err){
      res.send('Error, Nivel => User - Alumno');
    }
    else{ 
      var personajezal = new AlumnoModel({
        nombre: 'Maria',
        carrera: 'IN',
        _id:newUserhh._id,
        dni:'23451674',
        ema:'Maria@hotmail.com',
        foto: 'mujer.png',
        ap: 'Cameiro',
        am: 'Cameiro',
        fecha_na:moment("2004-June-13","YYYY-MMMM-DD"),
        genero:1,
        matriculas:[{
            semestre : '2015-I',
            grupo : 'A',
            nota :7,
            enlaze: 'S1 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :5,
            enlaze: 'S2 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :15,
            enlaze: 'S3 IN'
          },{
            semestre : '2015-I',
            grupo : 'A',
            nota :16,
            enlaze: 'S4 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :11,
            enlaze: 'S1 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :12,
            enlaze: 'S2 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :18,
            enlaze: 'S7 IN'
          },{
            semestre : '2015-II',
            grupo : 'A',
            nota :19,
            enlaze: 'S8 IN'
          },{
            semestre : '2016-I',
            grupo : 'A',
            nota :15,
            enlaze: 'S5 IN'
          },{
            semestre : '2016-I',
            grupo : 'A',
            nota :18,
            enlaze: 'S6 IN'
          },{
            semestre : '2016-II',
            grupo : 'A',
            nota :10,
            enlaze: 'S9 IN'
          },{
            semestre : '2016-II',
            grupo : 'A',
            nota :11,
            enlaze: 'S10 IN'
          },{
            semestre : '2016-II',
            grupo : 'A',
            nota :17,
            enlaze: 'S11 IN'
          }
        ]
      });
      personajezal.save(function(error, documento){
          if(error){
             console.log('Error al intentar guardar el personaje.');
          }else{  
            console.log(documento);
          }
      });
    }
});*/

//Query
//Mostrar todos los alumnos (Ok)
/*AlumnoModel.find({}).sort('ap').select('ap am nombre carrera dni ema foto fecha_na genero').exec(function(error, personal) {
  if(error){
    console.log('Ha surgido un error.'+error);
  }else{
    console.log(personal);
  }
});*/
//Mostrar de una carrera (Ok)
/*var carui = 'IN';
AlumnoModel.find({}).where('carrera').equals(carui).sort('-ap').exec(function (error, personal) {
  if(error){
    console.log('Ha surgido un error.'+error);
  }else{
    console.log(personal);
  }
});*/

//******************************************+****************************************

//Buscar alumno(Ok)
/*AlumnoModel.find({}).where('ap').equals('').where('am').equals('').sort('-ap').select('ap am nombre carrera dni ema foto fecha_na genero').exec(function (error, personal) {
    if(error){
      console.log('Ha surgido un error.'+error);
    }else{
      console.log(personal);
    }
  });
var modo_busqueda = 'fecha_na';
var busca = "2004-4-20";
AlumnoModel.find({}).where(modo_busqueda).equals(busca).sort('-ap').exec(function (error, personal) {
  if(error){
    console.log('Ha surgido un error.'+error);
  }else{
    console.log(personal);
  }
});


//******************************************+****************************************
//Resumen Nivel1 Promedio todos los semestres(Ok)
/*
  [ { _id: '5953d4ca7e6d1a1738f0c6bc', nombre: 'Niobe' },
    { _id: '5953d4ca7e6d1a1738f0c6bb', nombre: 'Ceo Miyu' },
    { _id: '5953d4ca7e6d1a1738f0c6bd', nombre: 'Maria' },
    { _id: '595fd62e396e21065079c743', nombre: 'Ana Maria Miyuki'}]
*/

/*AlumnoModel.aggregate([
    { $match:
      {
        _id:'5953d4ca7e6d1a1738f0c6bd'
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
    }
});*/

//******************************************+****************************************
/*
    S1 = 2   S2 = 4   S3 = 4   S4 = 4    => 14crt (1° Semestre)
    S5 = 4   S6 = 2   S7 = 2   S8 = 2    => 10crt (2° Semestre)
    S9 = 4   S10 = 5  S11 = 2  S12 = 4   => 11crt (3° Semestre)
    S13 = 2  S14 = 4  S15 = 5  S16 = 2   => 13crt (4° Semestre)
  */
//Cantidad de creditos perdidos y get x semestre (Ok)
/*AlumnoModel.aggregate([
    { $match:
        {
            _id:'5953d4ca7e6d1a1738f0c6bb'
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
    },
    {$sort:{
        semestre:1
      }
    }
], function (err, result) {
    if (err) {
      console.log(err);
    }
    else{
      console.log(result);
    }
});*/

//******************************************+****************************************
//Ponderado todos sus semstres x carrera (Ok)
/*AlumnoModel.aggregate([
        { $match:
          {
            carrera:'IN'
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
            //nombre: '$nombre',
            nombre: { $concat: 
              ["$nombre" ,';', "$ap",';','$am' ]
            },
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
  });*/

//******************************************+****************************************
//Alumnos aprobaron todo sus cursos en todo sus semestres (x carrera) (Sin resultados)
/*AlumnoModel.aggregate([
      { $match:
        {
          carrera:'IN'
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
  });*/

//******************************************+****************************************
//Relacion de alumnos de la carrera zzz que aprobaron todas sus asignaturas en el semestre zzz
//(Ok)
/*var carreraxx = 'IN';
var semestrexx = '2016-I';
AlumnoModel.aggregate([
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
  });*/

//******************************************+****************************************
//Relacion de alumnos de la carrera zzz que aprobaron todas sus asignaturas en el semestre zzz
//y que obtenieron promedio ponderado >=13 (Ok)
/*var carreraxx = 'IN';
var semestrexx = '2015-I';
AlumnoModel.aggregate([
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
  });*/

//******************************************+****************************************
//Numero creditos x alumno (Ok)
/*
  [ { _id: '5953d4ca7e6d1a1738f0c6bc', nombre: 'Niobe' },
    { _id: '5953d4ca7e6d1a1738f0c6bb', nombre: 'Ceo Miyu' },
    { _id: '5953d4ca7e6d1a1738f0c6bd', nombre: 'Maria' },
    { _id: '595fd62e396e21065079c743', nombre: 'Ana Maria Miyuki'}]
*/
/*AlumnoModel.aggregate([
      { $match:
        {
          _id:'5953d4ca7e6d1a1738f0c6bb'
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
});*/

//******************************************+****************************************

//Cursos q puedes llevar(Ok)
//Version 1
/*var tuedu = "5953d4ca7e6d1a1738f0c6bd";
var inixx = new Date();
AlumnoModel.aggregate([
      { $match:
        {
          _id:tuedu
        } 
      },
      {$unwind: "$matriculas" },
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
        codcurso:'$cursos.cod_asignatura',
        abre:'$cursos.abre',
        junte: { $concat: 
          //["$carrera" ,' ', "$matriculas.semestre" ]
          ["$carrera",'']
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
      { $match:{
          aprueba:0
        }
      },
      { $unwind: {
          path :'$abre'
        }
      },
      { $project:{
          _id:0,
          codcurso:1,
          abrecurso:'$abre._id',
          vacio:{  
            $cond: [ 
              {
                $eq: [{$size:'$abre.con'}, 0 ]
              }, 
              0,
              {$sum:
                [{$size:'$abre.con'},1]
              }
            ]
          },
          junte:{ $concat:[
              '$abre._id'," ",'$junte'
            ]
          }
        }
      },
      { $group:{
          _id:{
            abrecurso:'$abrecurso',
            vacio:'$vacio',
            junte:'$junte'
          },
          total: {
            $sum: '$vacio'
          }
        }
      },
      {$project:{
          _id:0,
          curso:'$_id.abrecurso',
          junte:'$_id.junte',
          requi:{
            $cond: [ 
              {
                $eq: [{$multiply : ['$_id.vacio','$_id.vacio']}, '$total' ]
              }, 
              0,
              1
            ]
          }
        }
      },
      {$match:{
          requi:0
        }
      },
      { $lookup:{
          from: "cursos",
          localField: "junte",
          foreignField: "enlaze",
          as: "cursos"
        }
      },
      { $unwind: {
          path :'$cursos'
        }
      },
      { $project:{
          union:'$curso',
          nombre:'$cursos.nombre',
          categoria:'$cursos.categoria',
          creditos:'$cursos.creditos',
          junte:1
        }
      },
      { $lookup:{
          from: "docentes",
          localField: "junte",
          foreignField: "asignaturas.enlaze",
          as: "ubuyb"
        }
      },
      { $unwind: {
          path :'$ubuyb',
          preserveNullAndEmptyArrays:true
        }
      },
      { $project:{
          union:1,
          nombre:1,
          categoria:1,
          creditos:1,
          junte:1,
          nombre_profe:'$ubuyb.nombre',
          cual:{
            $filter:{
              input:'$ubuyb.asignaturas',
              as:'pruw',
              cond:{
                $and:[
                  {$eq:['$$pruw.semestre','2017-I']},
                  {$eq:['$$pruw.enlaze','$junte']}
                ]
              },
            }
          }
        }
      },
      { $project:{
          union:1,
          nombre:1,
          categoria:1,
          creditos:1,
          cual:1,
          nombre:{
            $cond: [ 
              {
                $eq: ['$cual', null ]
              }, 
              'no',
              {$cond: [ 
                {
                  $eq: [{$size:'$cual'}, 0 ]
                }, 
                'no',
                '$nombre_profe'
              ]}
            ]
          }
        }
      },
      { $unwind: {
          path :'$cual',
          preserveNullAndEmptyArrays:true
        }
      },
      { $project:{
          union:1,
          nombre:1,
          categoria:1,
          creditos:1,
          nombre_profe:1,
          grupo:'$cual.grupo',
          horario:'$cual.horario'
        }
      }
], function (err, result) {
    if (err) {
        console.log(err);
    }
    else{
        //console.log(result);
        //console.log(result.length);

        AlumnoModel.aggregate([
          { $match:
            {
              _id:tuedu
            } 
          },
          {$unwind: "$matriculas" },
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
            _id:0,
            codcurso:'$cursos.cod_asignatura',
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
          { $match:{
              aprueba:0
            }
          },
          { $project:{union:'$codcurso'}}
    ], function (err, result1) {
        if (err) {
            console.log(err);
        }
        else{
            var arreglof = new Array();
            var i1a = 0;
            for (var i = 0; i < result.length; i++) {
              var estas = result[i].union;
              var igua = false;
              for (var j = 0; j < result1.length; j++) {
                if(result1[j].union==estas){
                  igua = true;
                  break;
                }
              }
              if(igua==false){
                arreglof[i1a] = result[i];
                i1a++;
              }
            }
            var inixx2 = new Date();
            console.log(inixx2-inixx);
            console.log(arreglof);
        }
    });
    }
});*/

//Version 2
/*AlumnoModel.aggregate([
      { $match:
        {
          _id:tuedu
        } 
      },
      {$unwind: "$matriculas" },
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
        codcurso:'$cursos.cod_asignatura',
        abre:'$cursos.abre',
        //junte: { $concat: 
          //["$carrera" ,' ', "$matriculas.semestre" ]
        //}, 
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
      { $match:{
          aprueba:0
        }
      },
      { $unwind: {
          path :'$abre'
        }
      },
      { $project:{
          _id:0,
          codcurso:1,
          abrecurso:'$abre._id',
          vacio:{  
            $cond: [ 
              {
                $eq: [{$size:'$abre.con'}, 0 ]
              }, 
              0,
              {$sum:
                [{$size:'$abre.con'},1]
              }
            ]
          }
          //junte:{ $concat:[
            //  '$abre._id'," ",'$junte'
            //]
          //}
        }
      },
      { $group:{
          _id:{
            abrecurso:'$abrecurso',
            vacio:'$vacio'
            //junte:'$junte'
          },
          total: {
            $sum: '$vacio'
          }
        }
      },
      {$project:{
          _id:0,
          curso:'$_id.abrecurso',
          requi:{
            $cond: [ 
              {
                $eq: [{$multiply : ['$_id.vacio','$_id.vacio']}, '$total' ]
              }, 
              0,
              1
            ]
          }
        }
      },
      {$match:{
          requi:0
        }
      },
      { $project:{union:'$curso'}}
], function (err, result) {
    if (err) {
        console.log(err);
    }
    else{
        //console.log(result);
        //console.log(result.length);

        AlumnoModel.aggregate([
          { $match:
            {
              _id:tuedu
            } 
          },
          {$unwind: "$matriculas" },
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
            _id:0,
            codcurso:'$cursos.cod_asignatura',
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
          { $match:{
              aprueba:0
            }
          },
          { $project:{union:'$codcurso'}}
    ], function (err, result1) {
        if (err) {
            console.log(err);
        }
        else{
            //console.log(result1);
            //console.log(result1.length);
            var arreglof = new Array();
            var i1a = 0;
            for (var i = 0; i < result.length; i++) {
              var estas = result[i].union;
              var igua = false;
              for (var j = 0; j < result1.length; j++) {
                if(result1[j].union==estas){
                  igua = true;
                  break;
                }
              }
              if(igua==false){
                arreglof[i1a] = result[i];
                i1a++;
              }
            }
            console.log('result');
            console.log(arreglof);
        }
    });
    }
});*/

//******************************************+****************************************
//Matriculas x semestres (Ok)
/*AlumnoModel.aggregate([
  { $match:
      {
        _id:'5953d4ca7e6d1a1738f0c6bc'
      } 
  },
  { $unwind: {
        path :'$matriculas'
        //preserveNullAndEmptyArrays: true
      }
  },
  { $match:
      {
          'matriculas.semestre': '2015-I'
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
          _id:0,
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
});*/

//******************************************+****************************************
//Notas x semestres (Ok)
/*AlumnoModel.aggregate([
    { $match:
        {
          _id:'5953d4ca7e6d1a1738f0c6bc'
        } 
    },
    { $unwind: {
          path :'$matriculas'
          //preserveNullAndEmptyArrays: true
        }
    },
    { $match:
        {
            'matriculas.semestre': '2015-I'
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
          _id:0,
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
});*/

/* AlumnoModel.aggregate([
     { $match:
         {
           _id:'5953d4ca7e6d1a1738f0c6bc'
         } 
     },
     { $unwind: {
           path :'$matriculas'
           //preserveNullAndEmptyArrays: true
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
           _id:0,
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
 });*/

//******************************************+****************************************
//Promedio notas cada semestre para todas las carreras
/*AlumnoModel.aggregate([
    { $unwind: {
          path :'$matriculas',
          preserveNullAndEmptyArrays: true
        }
    },
    {$project:{
        carrera:1,
        semestre:'$matriculas.semestre',
        notas:'$matriculas.nota'
      }
    },
    {$group: 
      {
        _id: {
          carrera : '$carrera',
          semestre:'$semestre'
        },
        totalnts: {
            $sum: '$notas'
        },
        total:{
          $sum: 1
        }
      }
    },
    {$project:{
        _id : 0,
        carrera: '$_id.carrera',
        semestre: '$_id.semestre',
        notas_pro: {
          $divide: ['$totalnts','$total']
        }
      }
    },
    {$sort:{
        semestre: 1
      }
    },
    {$group:{
        _id:{
          carrera: '$carrera'
        },
        no:{
          $push:{
            semestre: '$semestre',
            nota: '$notas_pro'
          }
        }
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
});*/
//Promedio notas cada semestre universal
/*AlumnoModel.aggregate([
    { $unwind: {
          path :'$matriculas',
          preserveNullAndEmptyArrays: true
        }
    },
    {$project:{
        semestre:'$matriculas.semestre',
        notas:'$matriculas.nota'
      }
    },
    {$group: 
      {
        _id: {
          semestre:'$semestre'
        },
        totalnts: {
            $sum: '$notas'
        },
        total:{
          $sum: 1
        }
      }
    },
    {$project:{
        _id : 0,
        semestre: '$_id.semestre',
        notas_pro: {
          $divide: ['$totalnts','$total']
        }
      }
    },
    {$sort:{
        semestre: 1
      }
    },
    //Para promedio universal
    //{$group:{
        //_id: null,
        //todos:{
          //$sum:'$notas_pro'
        //},
        //count:{
          //$sum: 1
        //}
      //}
    //},
    //{ $project:{
        //promedio_uni:{$divide:['$todos','$count']}
      //}
    //}
], function (err, result) {
    if (err) {
      console.log(err);
    }
    else{
        console.log(result);
        console.log(result.length);
    }
});*/

//******************************************+****************************************
//Ranking
//Ranking x semestre x carrera
/*var carreraxx = 'IN';
var semestrexx = '2016-I';
AlumnoModel.aggregate([
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
          }
        }
      },
      { $sort:{
          promedio:-1
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
  });*/
//Ranking x semestre todos
/*var semestrexx = '2016-II';
AlumnoModel.aggregate([
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
          }
        }
      },
      { $sort:{
          promedio:-1
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
  });*/
//Ranking total x carrera
/*var carreraxx = 'EDAR';
AlumnoModel.aggregate([
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
          }
        }
      },
      { $sort:{
          promedio:-1
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
  });*/
//Ranking total todos
/*AlumnoModel.aggregate([
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
          }
        }
      },
      { $sort:{
          promedio:-1
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
  });*/

var app = express();

// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride(function (req, res) {
  console.log('gola');
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    console.log('el metodo es ' + method);
    return method
  }
}))
//configuracion del login
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


require('./routes/rutas')(app, passport);
require('./routes/passport')(passport);


//pruebas de tiempo
/*app.get('/hola', function(req, res){
  //2011-03-10T17:42:18.922Z
  /*var ahorautc = moment().utc();
  console.log(req._startTime);
  console.log(req._startTime+"");
  console.log(moment().dayOfYear());
  console.log(moment().get('year'));
  console.log(moment().get('hour'));
  console.log(ahorautc.get('hour'));
  console.log(ahorautc);
  console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a, Z"));
  console.log(ahorautc.format("dddd, MMMM Do YYYY, h:mm:ss a, Z"));
  console.log("la hora de la subida es"+moment().format("h:mm:ss a"));
  console.log("la fecha de la subida es"+moment().format("D M YYYY"));*/
/*var hora = moment("2010-April-20 4:30 pm +0000","YYYY-MMMM-DD HH:mm a Z");
console.log(hora.toISOString());
res.send('hola');
});*/

app.get('/pruebax', function (req, res) {
  res.render('prueba');
});


app.get('/hee', globalmente.cabeza);


//Get data Web Page
app.get('/GetRequi', globalmente.ObAjxRequi);
app.get('/GetProfe', globalmente.ObAjxProf);
app.get('/GetCrono', globalmente.ObAjxCrono);
//get data prof page web
app.get('/profe/:id', personal.show2);
app.get('/GetBal/:tipo', documento.getDocc);

//Bot Facebook
/*app.get('/webhook', (req, res) => {
  console.log('hola');
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'camila') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});*/

/* For Facebook Validation */
/* app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'tuxedo_cat') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
}); */

/* Handling all messenges */
/* app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });
    res.status(200).end();
  }
});
 */

/* const request = require('request');

function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: 'EAADkMJYn1rgBAOPrJZAsxMiXLP1e6PM8nv80ePDeQDGTtOCltniJ380hMZBOg4iTcIFUtnKiRH9YnnGIrfvUKvMc8T8ZCSiX0POroxvgSuGj7oaONPgIatXgtZCDrsHPp4VdutmXAjyZAApEKvnVOAs763MDfRkATedODgxenZBwJs0ZB8N6FiA'},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: text}
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
} */


/*
function processPostback(event) {
  var senderId = event.sender.id;
  var payload = event.postback.payload;

  if (payload === "Greeting") {
    // Get user's first name from the User Profile API
    // and include it in the greeting
    request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      var greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObj = JSON.parse(body);
        name = bodyObj.first_name;
        greeting = "Hi " + name + ". ";
      }
      var message = greeting + "My name is SP Movie Bot. I can tell you various details regarding movies. What movie would you like to know about?";
      sendMessage(senderId, {text: message});
    });
  }
}

function sendMessage(recipientId, message) {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: "POST",
    json: {
      recipient: {id: recipientId},
      message: message,
    }
  }, function(error, response, body) {
    if (error) {
      console.log("Error sending message: " + response.error);
    }
  });
}*/


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (err.status == 404)
    res.render('err404');
  else
    res.render('error');
});

module.exports = app;
