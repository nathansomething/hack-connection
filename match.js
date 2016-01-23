function match(personA, personB){
	is_match = false;
	interest_matches = 0;
	for(i=0; i<personA.interests.length; i++){
		for(j=0; j<personB.interests.length; j++){
			if(personA.interest[i] == personB.interest[j]){
				interest_matches += 1;
			}
		}
	}
	if(interest_matches >= 2){
		return true;
	} else {
		return false;
	}
};