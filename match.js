function match(personA, personB){
	is_match = false;
	//match_rank = 0;
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
	
	serious_a = words_a = dbInterface.getPersonAttribute(connection, personA, 'seriousness')
	serious_b = dbInterface.getPersonAttribute(connection, personB, 'seriousness')
	serious_compatibility = Math.abs(serious_a - serious_b);
	/*if((word_matches >= 5) && (serious_compatibility < .60){
		is_match = true;
		match_rank = word_matches - (serious_compatibility/2);
	}*/
	match_rank = word_matches - (serious_compatibility*2)
	
	return match_rank
	}
};