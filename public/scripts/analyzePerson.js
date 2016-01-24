function analyze(var firstname, var lastname, var email, var phone, var interests, var techBackground, var bio, var words, var comp){
	var fullname = concat(firstname, lastname);
	var dbInterface = require('db/dbInterface');
	var pool = dbInterface.defaultPool();
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
	
	//determine competitiveness:
	options = ["I'm just here to have fun!", "Working on the ferocity","The Middle Path", "Working on the chill", 
		"I'm in it to win it."]
	competitiveness = 0;
	for(i=0; i<5; i++){
		if(comp = options[i]){
			competitiveness = i;
		}
	}
	
	var person = {name: fullname, email: email, phone: phone, interests:interests, techBackground:techBackground, bio:bio, words: words}
	enterPerson(person);
	matches = [];

	//match the person with other people
	var people =dbInterface.getAllPeople(pool, function(err, rows) {
		return rows;
	});
	for(i=0; i<people.length; people++){
		other_person = people[i];
		match_rank = match(person, other_person);
		matches.push({name: other_person, rank: match_rank});
	};
	
	person.matches = matches;
	return person;
};