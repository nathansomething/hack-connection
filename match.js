function match(personA, personB){
	is_match = false;
	word_matches = 0;
	words_a = dbInterface.getPersonAttribute(connection, personA, 'words')
	words_b = dbInterface.getPersonAttribute(connection, personB, 'words')

	for(i = 0; i < words_a.length; i++){
		for(j = 0; j < words_b.length; j++){
			if(personA.words[i] == personB.words[j]){
				word_matches += 1;
			}
		}
	}
	
	competitive_a = dbInterface.getPersonAttribute(connection, personA, 'competitiveness');
	competitive_b = dbInterface.getPersonAttribute(connection, personB, 'competitiveness');
	competitive_diff = Math.abs(competitive_a - competitive_b);
	
	if(competitive_diff > .65){
		match_rank = word_matches/(2*competitive_diff);
	} else {
		match_rank = word_matches/(compettitive_diff);
	}
	
	return match_rank;
	}
};