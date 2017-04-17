function begin_test( ){
	if( test_started ){
		speak( 'The test is already started!' );
	}
	else {
		if( first_time ){
			first_time = 0;
			speak( 'The test is about to start. Please follow this simple instruction to answer the questions.' );
			speak( 'To answer a question you should say: The answer is. ( followed by your answer ).' );
			speak( 'You can ask me to repeat the question for you by saying. Repeat please. Or have more information by saying More information please.' );
			speak( 'Good Luck!' );
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
		alert( 'The test has not started!' );
	}
	else {
		$( '#test_box' ).hide( );
		$( '#index_box' ).fadeIn( );

		test_started = false;
	}
}

function confirm_exit_test( ){
	//
}

function continue_test( ){
	//
}

function show_progress( ){
	//
}

function guide_user( ){
	//
}

function repeat( ){
	speak( 'The ' + ordinals[ progress - 1 ] + ' question is: ' );
	speak( question.name );
}

function select_question( ){
	$( '#software_interpretation' ).html( '' );

	if( progress == questions.length ){
		finish_test( );
		return;
	}

	speak( 'The ' + ordinals[ progress ] + ' question is: ' );

	question = questions[ progress ];

	$( "#question_name" ).html( question.name );
	$( "#question_description" ).html( question.description );
	$( "#progress" ).animate( { width: ( ( progress / questions.length )*100 ) + '%' } );

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

	console.log( given_answer + ' ' + question.answer );
	console.log( typeof( given_answer ) + ' ' + typeof( question.answer ) );
	$( "#software_interpretation" ).html( given_answer );
	speak( 'Your answer was: ' + given_answer );

	if( strcmp( given_answer, question.answer ) == 0 ){
		correct_answers++;
	}

	setTimeout( function( ){
		select_question( );
	}, 3000 );
}

function finish_test( ){
	var text;
	speak( 'You scored ' + correct_answers + ' out of ' + questions.length );

	if( correct_answers >= ( questions.length )*0.5 ){
		text = 'Congratulations, you performed well during this test!';
		$( "#test_result" ).removeClass( 'alert-danger' );
		$( "#test_result" ).addClass( 'alert-success' );
	}
	else {
		text = "Well!, it seems that you need more practicing on this topic. But don't worry, we are here for you, keep learning, and remember that Knowledge is power!";
		$( "#test_result" ).addClass( 'alert-danger' );
		$( "#test_result" ).removeClass( 'alert-success' );
	}

	$( '#test_result' ).html( text );
	$( '#test_result' ).fadeIn( );

	speak( text );

	$( '#test_box' ).hide( );
	$( '#index_box' ).fadeIn( );

	annyang.addCallback( 'errorNetwork', function( ){
		speak( 'Sorry, we have internet problems!' );
	}, this);

	test_started = false;
}

function more_information( ){
	if( !test_started )
		speak( "Sorry, I can't give you more information because you have not started the test yet!" );
	else
		speak( question.description );
}

function speak( text ){
	responsiveVoice.speak( text );
}

function strcmp(a, b) {
	a = a.toString(), b = b.toString();
	for (var i=0,n=Math.max(a.length, b.length); i<n && a.charAt(i) === b.charAt(i); ++i);
	if (i === n) return 0;
	return a.charAt(i) > b.charAt(i) ? -1 : 1;
}