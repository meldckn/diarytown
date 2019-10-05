/* 
 * Singleton DataWrangler class
 * 
 * Interfaces with Loki.js to store, manage, and query data objects
 */

var DataWrangler = (function () {

	var db;
	var phrases_db;

	function init () {
        // Make Lokijs database (with name of file to persist data to)
		db = new loki('db.json');
		createPhraseCollection();
	}

	function createPhraseCollection () {
		// Add a collection called 'phrases' to the database
		phrases_db = db.addCollection('phrases');

		// Add a bunch of phrase documents to the phrases collection
		// (One document = one phrase)
		phrases_db.insert(phrases);
	}

	function getAllPhrases () {
		// Get all phrases sorted by category
		return phrases_db.chain().simplesort('category').data();
	}

	function getPhraseById (id) {
		return phrases_db.findOne({id: id});
	}

	function getPhrasesByType (type, sortBy='text') {
		if (sortBy == 'text') {
			return phrases_db.chain().find({'type':type}).sort(sortByDefaultText).data();
		} else 
			return phrases_db.chain().find({'type':type}).simplesort(sortBy).data();
	}

	// Get phrases of multiple types, all sorted together
	function getPhrasesByTypes (types, sortBy='text') {
		// Make find filter by or'ing the given types
		let filter = { '$or': [] }
		types.forEach( (type) => { filter['$or'].push({'type':type}) });
		// Use custom sorting function if sorting by default text
		if (sortBy == 'text') {
			return phrases_db.chain().find(filter).sort(sortByDefaultText).data();
		} else 
			return phrases_db.chain().find(filter).simplesort(sortBy).data();
	}

	function getSortedPhrases () {
		return phrases_db.chain().sort(sortByDefaultText).data();
	}

	function sortByDefaultText (a,b) {
		// ignore case
		a = a.text[0].toUpperCase(); 
		b = b.text[0].toUpperCase(); 
		if (a < b) { return -1; }
		if (a > b) { return 1; }
		// names must be equal
		else { return 0; }
	}

	// Doesn't work - max call stack size exceeded
	function printPhrases () {
		console.log(getAllPhrases());
	}


    return { // Public Functions:
        
        init : init,
        getAllPhrases : getAllPhrases, 
        getPhraseById : getPhraseById,
        getPhrasesByType : getPhrasesByType,
        getPhrasesByTypes : getPhrasesByTypes,
        getSortedPhrases : getSortedPhrases,
        
        // Returns the unique instance
        // Creates the instance if it doesn't exist yet 
        getInstance : function () {
            if (!instance) {
                instance = createInstance ();
            }
            return instance;
        }

    };
})(); 