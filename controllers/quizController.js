exports.question = function(req,res) {
	res.render('quizes/question', { pregunta : "¿Cual es la capital de Italia?"});
};

exports.answer = function(req,res) {
	
	if (req.query.respuesta === "Roma") { 
			res.render('quizes/answer', { resultado : "correcto", enlace : '../', mensaje : "Volver a la pagina principal"});}
	else {res.render('quizes/answer', { resultado : "incorrecto", enlace : '../quizes/question', mensaje : "Volver a intentarlo" });}
};