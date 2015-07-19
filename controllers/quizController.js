
var models = require('../models/models.js')
var cadena = require('../functions/cadenas.js')

exports.load = function(req,res,next,quizId) {
	models.Quiz.findById(quizId).then(
		function (quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { next( new Error('No existe la pregunta ' + quizId))}
		}).catch(function (error) { next(error);});
}

exports.index = function(req,res,next) {
	if (req.query.search) {
		search = '%'+req.query.search.replace(/ /g,'%')+'%';
		models.Quiz.findAll({where: ["pregunta like ?", search],order:'pregunta'}).then( function(quizes){
			res.render('quizes/index.ejs',{ quizes : quizes });
	}).catch(function (error) { next(error);});
	}

	else {models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs',{ quizes : quizes });
	}).catch(function (error) { next(error);});
}
}

exports.show = function(req,res) {
			res.render('quizes/show',{ quiz : req.quiz });
}

exports.answer = function(req,res) {
		var resp = cadena.textoPlano(req.query.respuesta);
		var solucion = cadena.textoPlano(req.quiz.respuesta);
		if ( resp === solucion ) {
			res.render('quizes/answer',{ resultado : "correcto", enlace : '../', mensaje : "Volver a la pagina principal"});
	} else {res.render('quizes/answer', { resultado : "incorrecto", enlace : '../'+quiz.id, mensaje : "Volver a intentarlo >>" });}
	
}

exports.new = function (req,res) {
	var quiz = models.Quiz.build({ pregunta:'Pregunta',respuesta:'Respuesta'});
	res.render('quizes/new',{ quiz : quiz});
}

exports.create = function(req,res) {
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.save({fields: ["pregunta","respuesta"]}).then(function() {
		res.redirect('/quizes');
		
	});
}



