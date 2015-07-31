var users = {
	admin: { id : 1, username: "admin" , password : "1234" },
	eduardo : { id : 2, username : "eduardo" , password : "4321"}
};

exports.autenticar = function (login,password,callback) {
	if (users[login]) { 
		if(users[login].password === password) {
			callback(null,users[login])
		} else {
			callback(new Error("El password no es correcto !!!"));
		}

	} else { callback(new Error("No existe usuario con ese login !!!")); }

}