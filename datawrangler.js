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
		return phrases_db.chain().simplesort("category").data();
	}

	function getPhraseById (id) {
		return phrases_db.findOne({id: id});
	}

	// Doesn't work - max call stack size exceeded
	function printPhrases () {
		console.log(getAllPhrases());
	}


    return { // Public Functions:
        
        init : init,
        getAllPhrases : getAllPhrases, 
        getPhraseById : getPhraseById,
        
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