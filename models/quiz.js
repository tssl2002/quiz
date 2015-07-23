module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Quiz',
				{ pregunta : {
					type : DataTypes.STRING,
					validate : { notEmpty : { msg : " Falta el campo pregunta !!!"}}
				},
				  respuesta : {
					type : DataTypes.STRING,
					validate : { notEmpty : { msg : " Falta el campo respuesta !!!"}}
				},
				  tema : {
					type : DataTypes.STRING
				}
			});
}