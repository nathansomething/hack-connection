function analyze(var firstname, var lastname, var email, var phone, var interests, var techBackground, var bio, var words, var competitiveness){
	var fullname = concat(firstname, lastname);
	
	//analyze words
	new_words = [];
	// do not add duplicates and irrelevant parts of speech
	for(i=0; i<words.posTags.length; i++){
		word = words.posTags[i];
		if(word.pos == "NOUN" or word.pos == "ADJ"){
			if(!(word in new_words)){
				new_words.push(word.text);	
			}
		}
	};
	
	var person = {name: fullname, email: email, phone: phone, interests:interests, techBackground:techBackground, bio:bio, words: words, competitiveness: parseInt(competitiveness)}
	enterPerson(person);
	matches = [];

	//match the person with other people
	people = dbInterface.getPersonAttribute(connection, 'fullname');
	for(i=0; i<people.length; people++){
		other_person = people[i];
		match_rank = match(person, other_person);
		matches.push({name: other_person, rank: match_rank});
	};
	
	person.matches = matches;
	return person;
};