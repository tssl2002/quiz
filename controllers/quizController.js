
var models = require('../models/models.js')
var cadena = require('../functions/cadenas.js')

exports.index = function(req,res) {
	models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs',{ quizes : quizes });
	});
}

exports.show = function(req,res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz){
			res.render('quizes/show',{ quiz : quiz });
	});
}

exports.answer = function(req,res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
		var resp = cadena.textoPlano(req.query.respuesta);
		var solucion = cadena.textoPlano(quiz.respuesta);
		if ( resp === solucion ) {
			res.render('quizes/answer',{ resultado : "correcto", enlace : '../', mensaje : "Volver a la pagina principal"});
	} else {res.render('quizes/answer', { resultado : "incorrecto", enlace : '../'+quiz.id, mensaje : "Volver a intentarlo >>" });}
	
	});
}



