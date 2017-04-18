var steps = [
	'Comenzar prueba',
	'La respuesta es carenta'/*,
	'The answer is washingtong'*/
];

setInterval( function( ) {
	if( test_step >= questions.length || steps[ test_step ] == undefined ) return;
	annyang.trigger( steps[ test_step ] );
	test_step++;
}, 3500 );