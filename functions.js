function begin_test( ){
	if( test_started ){
		speak( 'El examen ya comenzo!' );
	}
	else {
		if( first_time ){
			first_time = 0;
			speak( 'El examen esta por comenzar. Favor de seguir estas simples instrucciones para completar el examen.' );
			speak( 'Para responder una pregunta debera decir: La respuesta es. Seguido por su respuesta.' );
			speak( 'Puede pedirme que repita la pregunta simplemente pidiendomelo diciendo: repetir pregunta. Tambien puede solicitar mas informacion diciendo: Explicar pregunta.' );
			speak( 'Buena Suerte!' );
		}

		$( '#index_box' ).hide( );
		$( '#test_box' ).fadeIn( );
		correct_answers = 0;
		progress = 0;

		select_question( );
		test_started = true;
	}
}

function exit_test( ){
	if( !test_started ){
		speak( 'El examen aun no ha comenzado!' );
	}
	else {
		speak( "Esta seguro que quiere salir del examen?" );
	}
}

function confirm_exit_test( ){
	if( !exit_prompt ) return;

	$( '#test_box' ).hide( );
	$( '#index_box' ).fadeIn( );

	exit_prompt = false;
	test_started = false;
}

function continue_test( ){
	speak( 'Continuemos el examen!' );
}

function show_progress( ){
	speak( "Usted ha completado: " + progress + ' de ' + questions.length );
}

function guide_user( ){
	speak( "Esta un poco perdido?, permitame ayudar!" );
	speak( "Para conocer su progreso actual, simplemente diga: Mostrar mi progreso." );
	speak( "Para comenzar el examen, diga: Comenzar examen." );
	speak( "Para terminar el examen, diga: Finalizar examen o Abortar examen." );
	speak( "Para obtener mas informacion sobre la pregunta, diga: Explicar pregunta." );
	speak( "Para repetir una pregunta, diga: Repetir pregunta." );
	speak( "Para responder una pregunta, diga: La respuesta es. Seguido por la respuesta que desea dar." );
	speak( "Adios!" );
}

function repeat( ){
	speak( 'La ' + ordinals[ progress - 1 ] + ' pregunta es: ' );
	speak( question.name );
}

function select_question( ){
	/*annyang.pause( );
	annyang.start( );*/
	$( '#software_interpretation' ).val( '' );

	$( '#response_changer' ).attr( 'disabled', true );
	$( '#software_interpretation' ).attr( 'disabled', true );

	if( progress == questions.length ){
		finish_test( );
		return;
	}

	speak( 'La ' + ordinals[ progress ] + ' pregunta es: ' );

	question = questions[ progress ];

	$( "#question_name" ).html( question.name );
	$( "#question_description" ).html( question.description );
	$( "#progress" ).animate( { width: ( ( progress / questions.length )*100 ) + '%' } );
	$( '#progress_percentage' ).html( ( ( progress / questions.length )*100 ) + '%' );

	/*setTimeout( function( ){
		speak( 'Hey!, seems you are stuck, here is more information for you!' );
		speak( question.description );
	}, 5000 );*/

	speak( question.name );
	//responsiveVoice.speak("hello world");
	progress++;
}

function process_answer( given_answer ){
	given_answer = given_answer.toLowerCase( );

	$( "#software_interpretation" ).val( given_answer );
	speak( 'Su respuesta fue: ' + given_answer );

	var response_correctness = false;
	if( strcmp( given_answer, question.answer ) == 0 ){
		correct_answers++;
		response_correctness = true;
	}
	else {
		$( '#software_interpretation' ).attr( 'disabled', false );
		$( '#response_changer' ).attr( 'disabled', false );
		return;
	}

	play_feedback_sound( response_correctness );

	setTimeout( function( ){
		select_question( );
	}, 5000 );
}

$( '#response_changer' ).click( function( ) {
	var given_answer = $( "#software_interpretation" ).val( );

	response_correctness = false;
	if( strcmp( given_answer, question.answer ) == 0 ){
		correct_answers++;
		response_correctness = true;
	}

	play_feedback_sound( response_correctness );

	setTimeout( function( ){
		select_question( );
	}, 5000 );


} );

function play_feedback_sound( response_correctness ){
	if( response_correctness ){
		speak( 'Correcto' );
	}
	else {
		speak( 'Incorrecto' );
	}
}
function finish_test( ){
	var text;
	speak( 'Usted aserto ' + correct_answers + ' de ' + questions.length + ' preguntas.');

	if( correct_answers >= ( questions.length )*0.5 ){
		text = 'Felicidades, usted pasó el examen!';
		$( "#test_result" ).removeClass( 'alert-danger' );
		$( "#test_result" ).addClass( 'alert-success' );
	}
	else {
		text = "Vaya!, al parecer necesita practicar un poco mas sobre este tema. Pero no desista! Siempre estaremos aqui para ayudar. Recuerde que el conocimiento es poder.";
		$( "#test_result" ).addClass( 'alert-danger' );
		$( "#test_result" ).removeClass( 'alert-success' );
	}

	$( '#test_result' ).html( text );
	$( '#test_result' ).fadeIn( );

	speak( text );

	$( '#test_box' ).hide( );
	$( '#index_box' ).fadeIn( );

	annyang.addCallback( 'errorNetwork', function( ){
		speak( 'Disculpe, actualmente hay problemas con la conexion a internet!' );
	}, this);

	test_started = false;
}

function more_information( ){
	if( !test_started )
		speak( "Disculpe, no puedo proporcionar mas informacion hasta que comnience el!" );
	else
		speak( question.description );
}

function speak( text ){
	responsiveVoice.speak( text, 'Spanish Female' );
}

function strcmp(a, b) {
	a = a.toString(), b = b.toString();
	for (var i=0,n=Math.max(a.length, b.length); i<n && a.charAt(i) === b.charAt(i); ++i);
	if (i === n) return 0;
	return a.charAt(i) > b.charAt(i) ? -1 : 1;
}