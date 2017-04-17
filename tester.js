var steps = [
	'Begin test',
	'The answer is four',
	'The answer is washingtong'
];

setInterval( function( ) {
	if( test_step >= questions.length ) return;
	annyang.trigger( steps[ test_step ] );
	test_step++;
}, 3500 );