exports.new = function(req,res) {
	var errors = req.session.errors || {}
	req.session.errors = {};

	res.render('sessions/new' , { errors : errors});

}

exports.create = function(req,res) {
	var login = req.body.login;
	var password = req.body.pass;

	var user_controller = require('./user_controller');
	user_controller.autenticar(login,password,function(err,user) {

		if(err) {
			req.session.errors = [{ message : "Se ha producido un " + err}];
			res.redirect('/login');
			return;
		}

		req.session.user = { id : user.id , username : user.username};
		res.redirect(req.session.redir.toString());
	})

}

exports.destroy = function(req,res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString());
}

exports.loggerReq = function (req,res,next) {
	if(req.session.user) {
		next()
	} else {
		res.redirect('/login');
	}
}