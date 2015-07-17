exports.textoPlano = function(cadena) {
	cadena = cadena.toLowerCase(cadena);
	cadena = cadena.replace(/á/g,'a');
	cadena = cadena.replace(/é/g,'e');
	cadena = cadena.replace(/í/g,'i');
	cadena = cadena.replace(/ó/g,'o');
	cadena = cadena.replace(/ú/g,'u');
	return cadena;
}