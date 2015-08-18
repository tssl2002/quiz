
var models = require('../models/models.js')
var cadena = require('../functions/cadenas.js')

exports.load = function(req,res,next,quizId) {
	models.Quiz.find({
					where : { id : Number(quizId)},
					include : [ { model : models.Comment }]}).then(
		function (quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { next( new Error('No existe la pregunta ' + quizId))}
		}).catch(function (error) { next(error);});
}


exports.author = function(req,res) {
	res.render('author', { errors : []})
}


exports.index = function(req,res,next) {
	if (req.query.search) {
		search = '%'+req.query.search.replace(/ /g,'%')+'%';
		models.Quiz.findAll({where: ["pregunta like ?", search],order:'pregunta'}).then( function(quizes){
			res.render('quizes/index.ejs',{ session : req.session, quizes : quizes , errors : []});
	}).catch(function (error) { next(error);});
	}

	else {models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs',{session : req.session,  quizes : quizes , errors : [] });
	}).catch(function (error) { next(error);});
} 
}


exports.show = function(req,res) {
			if(!req.quiz.Comments) { res.render('quizes/show',{ mensaje: 'No existen comentarios para esta pregunta' ,quiz : req.quiz , errors : []})}
			else {res.render('quizes/show',{ quiz : req.quiz , errors : []});}
}


exports.answer = function(req,res) {
		var resp = cadena.textoPlano(req.query.respuesta);
		var solucion = cadena.textoPlano(req.quiz.respuesta);
		if ( resp === solucion ) {
			res.render('quizes/answer',{ resultado : "¡¡¡CORRECTO!!!", enlace : '../', mensaje : "Volver a la pagina principal" , errors : [] , imagen : "/images/acierto.png"});
	} else {res.render('quizes/answer', { resultado : "¡¡¡FALLASTE!!!", enlace : '../'+ req.quiz.id, mensaje : "Vuelve a intentarlo >>" , errors : [] , imagen : "/images/error.png" });}
	
}

exports.new = function (req,res) {
	var quiz = models.Quiz.build({ pregunta:'Pregunta',respuesta:'Respuesta'});
	res.render('quizes/new',{ quiz : quiz , errors : [] , typeValue : "placeholder"});
}

exports.create = function(req,res) {
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(function(err) {
		if(err) {
			res.render('quizes/new',{ quiz : quiz , errors : err.errors , typeValue :"value"});
		} else {
			quiz.save({fields: ["pregunta","respuesta","tema"]}).then(function() {
		res.redirect('/quizes');});
		}
	});

	}

exports.edit = function(req,res) {
	var quiz = req.quiz;
	res.render('quizes/edit', { quiz : quiz , errors : [] , typeValue : "placeholder" })
}

exports.update = function(req,res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;

	req.quiz.validate().then(function(err) {
		if(err) {
			res.render('quizes/edit',{ quiz : req.quiz , errors : err.errors , typeValue : "value" })
		} else {
			req.quiz.save({fields : ["pregunta","respuesta","tema"]}).then(function() { res.redirect('/quizes')}); 
		}
	});
}

exports.delete = function(req,res) {
	console.log(req.session.user);
	if(!req.query._method) {
		res.render('quizes/delete' , { quiz : req.quiz , errors : []});
	} else {
		models.Comment.destroy(
			{where: { QuizId : req.quiz.id }}).then( function(){
		req.quiz.destroy().then(function() { res.redirect('/quizes')}).catch(function(error) {next(error)}); 
		
	});
}
}

exports.statistic = function(req,res) {
	models.Quiz.findAll().then(function(quizes) {
	models.Comment.findAll().then(function(comments) {
			res.render('quizes/statistics' , { quizes : quizes , 
											   comments : comments , 
											   session : req.session,  
											   errors : []});
		})
	});
}


		
	



