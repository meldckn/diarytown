
/// Utility functions

function random(min, max) {
	return Math.random() * (max - min) + min;
}

// Add .last property to the Array prototype
if (!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    };
};

if (!String.prototype.toTitleCase) {
	String.prototype.toTitleCase = function() {
		return this.replace(
            /\b\w+/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
	};
};

// Remove the class given by the first param from all elements selected by second param
function removeClassOn (toRemove, selector) {
	let elements = Array.from(document.querySelectorAll("."+selector));
	elements.map(element => { element.classList.remove(toRemove); });
}

function removeAllClasses (element) {
	let classList = element.classList;
	while (classList.length > 0) {
	   classList.remove(classList.item(0));
	}
}

function insertAfter(afterNode, beforeNode) {
    beforeNode.parentNode.insertBefore(afterNode, beforeNode.nextSibling);
}

function isHtmlElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;  
}

// Zip an arbitrary number of arrays: [[a1, b1], [a2, b2], ...]
function zip (firstArray) {
	return zipped = firstArray.map((firstArrayItem, itemIndex) => { 
		let innerArray = [firstArrayItem];
		for (let argIndex=1; argIndex<arguments.length; argIndex++) {
			innerArray.push(arguments[argIndex][itemIndex]);
		}
		return innerArray;
	});
}

// Return a copy of a given array without any duplicate or undefined elements
function removeDuplicates (array) {
	return array.filter( (item, index) => 
		array.indexOf(item) === index && item !== undefined );
}

///

DataWrangler.init();

// Custom plugin for NLP-compromise to force particular verb conjugations
const plugin = {
	conjugations: {
	    'avoid': 	 { Infinitive:'avoid', PastTense:'avoided'},
	    'chat': 	 { Infinitive:'chat', PastTense:'chatted', Gerund:'chatting'},
	    'daydream':  { Infinitive:'daydream', PastTense:'daydreamed'},
	    //'didn\'t':   { Infinitive:'not do', PastTense:'didn\'t', Gerund:'not doing'},
	    'gossip': 	 { Infinitive:'gossip', PastTense:'gossiped', Gerund:'gossiping'},
	    'help': 	 { Infinitive:'help', PastTense:'helped'},
	    'indulge':   { Infinitive:'indulge', PastTense:'indulged', Gerund:'indulging'},
	    'learn': 	 { Infinitive:'learn', PastTense:'learned'},
	    'mess': 	 { Infinitive:'mess', PastTense:'messed', Gerund:'messing'},
	    'need': 	 { Infinitive:'need', PastTense:'needed'},
	    'plan': 	 { Infinitive:'plan', PastTense:'planned', Gerund:'planning'},
	    'reminisce': { Infinitive:'reminisce', PastTense:'reminisced', Gerund:'reminiscing'},
	    'storm': 	 { Infinitive:'storm', PastTense:'stormed', Gerund:'storming'},
	    'treat': 	 { Infinitive:'treat', PastTense:'treated'},
	    'visit': 	 { Infinitive:'visit', PastTense:'visited'},
	    'watch': 	 { Infinitive:'watch', PastTense:'watched', Gerund:'watching'},
	    'people-watch':{Infinitive:'people-watch',PastTense:'people-watched', Gerund:'people-watching'}
	}
};
nlp.plugin(plugin);

makeLibrary();
makeLibrarySortables();

let diary = document.getElementById('diary');
let library = document.querySelector('.library'); // Might eventually be multiple lists
let trash = document.getElementById('trash');
trash.draggable = false;

// TODO move the transform logic into the phrases data of these connectors and modifiers
function transformCompoundPhrase (outerPhrase, newPhrase) {
	let slot = getSlotNumber(newPhrase);
	switch (outerPhrase.id) {
		case 'to':
			// Change 2nd to present (..to daydreamed -> ..to daydream)
			if (slot == 0) {
				addSubject(newPhrase);
				toPast(newPhrase);
			} else if (slot == 2) {
				stripI(newPhrase)
				toPresent(newPhrase);
			}  
			break;
		case 'by':
		case 'which-involved':
		case 'led-to':
		case 'instead-of':
			// Change 2nd to -ing and remove subject
			if (slot == 0) {
				addSubject(newPhrase);
				toPast(newPhrase);
			} else if (slot == 2) {
				stripI(newPhrase);
				toPresentParticiple(newPhrase);
			}
			break;
		case 'didnt':
		case 'tried':
		case 'want':
		case 'wanted':
		case 'need':
		case 'needed':
		case 'planned':
		case 'decided':
			stripI(newPhrase);
			toPresent(newPhrase);
			break;
		case 'then':
			// TODO strip second subject if same as first
		case 'because':
		case 'while': 
			addSubject(newPhrase);
			toPast(newPhrase);
			break;
		case 'finished':
		case 'started':
			stripI(newPhrase);
			toPresentParticiple(newPhrase);
			break;
		case 'which-caused':
			//after event changes to present tense and prefix "#subject to" 
			//(if action: change to present tense and prefix with "me to")
			break;
		default: 
			if (slot == 0)
				addSubject(newPhrase);
			break;
	}
}

// Return the index of the inner slot that newPhrase is in 
// relative to its immediate outer phrase (usually 0 or 2)
function getSlotNumber (newPhrase) {
	// Get the index of the newPhrase's parent (inner slot) in its parent
	let innerSlot = newPhrase.parentElement;
	return [...innerSlot.parentElement.children].indexOf(innerSlot);	
}

// Reset phrase to how it should be when added to the root level of the diary
function undoPhraseTransforms (phraseElement) {
	addSubject(phraseElement);
	toPast(phraseElement);
}

// If there's an "I " at the beginning of this phrase's innerText, remove it
// TODO find the probable bug
function stripI (phraseElement) {
	let phraseText = phraseElement.querySelector('.phrase-container p').innerText;
	phraseElement.querySelector('.phrase-container p').innerText = phraseText.replace("I ", "");
}

// Use NLP Compromise to find the first verb in the given phrase (string, not element)
// Since that's probably the main verb and the only thing we need to change the tense of
function getVerb (phrase) {
	let terms = nlp(phrase).terms().data();
	let verb = terms.find( (term,i) => {
		// Find the first term with "Verb" in its POS tags
		// Unless it's hyphenated, then return the second (e.g., cloud-watched --> watched)
		// Will break if there's a non-verb hyphenation before the first verb
		if (term.tags.includes("Hyphenated")) 
			return term.spaceAfter !== "-";
		else
			return term.tags.includes("Verb");
	})
	return verb.text;
}

// Return the given verb conjugated to the given tense
// Possible tenses are defined by NLP-compromise:
// "Infinitive", "Gerund", "PresentTense", "PastTense", "FutureTense", "Actor"
function conjugateVerb (verb, tense) {
	word = nlp(verb);
	conjugation = word.verbs().conjugate()[0];
	if (conjugation !== undefined)
		return conjugation[tense];
	else {
		console.warn(`Could not conjugate '${verb}' into ${tense}.`,
					 `Consider adding verb to NLP-compromise custom plugin.`);
		return verb; 
	}
}

// TODO Test function that runs on load that tries to conjugate all phrases 
// in library, and lists all phrases that it doesn't understand
function testAllConjugations () {
	let phrases = DataWrangler.getAllPhrases();
	/////
}

// Return an array of all unique single-word verbs used in the phrases library
// Mostly for debugging
// Currently only looks through the default text[0] of each phrase
// TODO also look through alt text?
function getAllVerbs () {
	let verbs = DataWrangler.getAllPhrases().map((phrase) => {
		return getVerb(phrase.text[0]); 
	});
	return removeDuplicates(verbs);
}

// Convert the text in a given phrase element to present (infinitive) tense
function toPresent (phraseElement) {
	conjugatePhraseElement(phraseElement, 'Infinitive');
}
function toPast (phraseElement) {
	conjugatePhraseElement(phraseElement, 'PastTense');
}
function toPresentParticiple (phraseElement) {
	conjugatePhraseElement(phraseElement, 'Gerund');
}

function conjugatePhraseElement(phraseElement, tense) {
	// People and places (as simple phrases) should never be conjugated
	// TODO change this to more straightforward check once we have overall database
	// e.g., if (isSimplePhrase(phraseElement.id)) return;
	let phraseData = DataWrangler.getPhraseById(phraseElement.id);
	let phraseType = phraseData.type;
	if (phraseType==="connector" || phraseType==="modifier" || phraseType==="person" || phraseType==="place") return;

	let phraseText = phraseElement.querySelector('.phrase-container p').innerText;
	let verb = getVerb(phraseText);
	let present = verb;

	if (verb === undefined) {
		console.warn(`Could not find a verb to conjugate in '${phraseText}'.`);
	} else {
		present = conjugateVerb(verb,tense);
	}

	phraseElement.querySelector('.phrase-container p').innerText = phraseText.replace(verb,present);
}

let settings = {
	autoslot : true
};

function getLastDiaryPhrase() {
	// Will never grab an innerslotted phrase
	// Not sure if you'd want to
	return document.querySelector('#diary').lastChild;
}

// Return the type (e.g., "place", "action") of the rightmost
// innerslot of the current text of the given phrase data object.
// Return null or -1 if phrase has no inner slots. 
// TODO when we add cycling through alt text, will need to alter this
function getRightmostInnerSlotType (phraseData) {
	// Parse text for inner slots
	const regex = /(?<=#)([a-z-]*)/gim;
	if (!phraseData["text"]) {
		return null; // No text property on this phrase
	}
	let str = phraseData["text"][0];
	let matches = str.match(regex);

	if (matches) return matches.last();
	else return null; // No inner slots
}

function getLeftmostInnerSlotType (phraseData) {
	// Parse text for inner slots
	const regex = /(?<=#)([a-z-]*)/gim;
	if (!phraseData["text"]) {
		return null; // No text property on this phrase
	}
	let str = phraseData["text"][0];
	let matches = str.match(regex);

	if (matches) return matches[0];
	else return null; // No inner slots
}

function getRightmostInnerSlotElement (phraseElement) {
	return phraseElement.childNodes[0].querySelector(".inner-slot:last-of-type");
}
function getLeftmostInnerSlotElement (phraseElement) {
	return phraseElement.childNodes[0].querySelector(".inner-slot:first-of-type");
}

// Things to do after the given new phrase element is added to the given inner slot
function afterAddToInnerSlot (newPhrase, innerSlotElement) {
	// When a phrase is added to an inner slot, hide its empty-indicator
	// and show a distinguishing background color
	// Use :scope selector to select only direct children, not descendants
	innerSlotElement.querySelector(':scope > .empty-indicator').style.display = "none";
	// Slightly darken the inner slot's parent color for the inner slot background 
	let parentElement = innerSlotElement.parentElement,
		parentStyle = window.getComputedStyle(parentElement),
    	parentColor = tinycolor(parentStyle.getPropertyValue('background-color'));
	innerSlotElement.style.background = parentColor.darken(8).toString();//"#00a6de"; 
	transformCompoundPhrase(innerSlotElement.parentElement.parentElement, newPhrase);
}

//DataWrangler.getAllPhrases().forEach((phrase) => {getLeftmostInnerSlotType(phrase);});

// Autoslot phrase into diary
function addPhraseWithAutoSlot (newPhrase) {

	let newPhraseData = DataWrangler.getPhraseById(newPhrase.id);
	let lastPhrase = getLastDiaryPhrase();
	if (!lastPhrase) {
		// No phrases in diary yet
		document.querySelector('#diary').append(newPhrase);

		// Add subject if phrase doesn't already have one
		addSubject(newPhrase);
		return;
	}

	let lastPhraseData = DataWrangler.getPhraseById(lastPhrase.id);
	let lastPhraseInnerType = getRightmostInnerSlotType(lastPhraseData);
	let newPhraseInnerType = getLeftmostInnerSlotType(newPhraseData);

	// If the last diary phrase (before this one) has (or ends with?) 
	// an empty rightmost innerslot with a type that matches the new phrase's type, 
	// put the new phrase in that innerslot instead of appending to diary
	if (typesMatch(getRightmostInnerSlotType(lastPhraseData), newPhraseData.type)) {
		let lastPhraseRightInnerSlot = getRightmostInnerSlotElement(lastPhrase);
		// TODO check if (lastPhraseRightInnerSlot is empty) else append to diary
		lastPhraseRightInnerSlot.append(newPhrase);
		afterAddToInnerSlot(newPhrase,lastPhraseRightInnerSlot);

	// If the new phrase has (starts with?) an inner slot with a type that matches 
	// the type of the last diary phrase, append the new phrase to the diary and 
	// move the last phrase in the new phrase's inner slot
	} else if (typesMatch(getLeftmostInnerSlotType(newPhraseData), lastPhraseData.type)) {
		document.querySelector('#diary').append(newPhrase);
		let newPhraseLeftInnerSlot = getLeftmostInnerSlotElement(newPhrase);
		// TODO check if (newPhraseLeftInnerSlot is empty) else append to diary
		newPhraseLeftInnerSlot.append(lastPhrase);
		afterAddToInnerSlot(lastPhrase, newPhraseLeftInnerSlot);
	} else {
		// No matching phrase + inner slot to combine
		document.querySelector('#diary').append(newPhrase);

		// Add subject if phrase doesn't already have one
		addSubject(newPhrase);
	}
}

// Return true if the given phrase type strings (event, action, connector, modifier, person, place) match
// either exactly or if one is "event" and the other is "action"
function typesMatch (first, second) {
	if ( (first==="event" && second==="action") || (first==="action" && second==="event") ) {
		return true;
	} else return first === second;
}

// Add a given phrase/action/event (by id) to the diary entry
// -- uses the event which triggered it (a phrase's onclick)
// TODO check that there is a valid phrase in the event target
// (i.e., that this was called from a phrase's onclick)
// TODO if it wasn't, it would probably be called with a phrase id
// so have that as fallback?
function addToDiary (newPhrase) {

	if (!isHtmlElement(newPhrase)) {
		// This phrase was click-added instead of dragged
		// -Was not called with a valid HTML element (of the new phrase)
		// So create one using the current event's target 

		// Deeply clone the phrase container that was clicked on (w/ all children)
		// (doesn't clone event listeners)
		newPhrase = event.currentTarget.cloneNode(true);

		// TODO See if we can simulate a drag-to-diary action here?

		if (settings.autoslot) 
			addPhraseWithAutoSlot (newPhrase);
		else 
			document.querySelector('#diary').append(newPhrase);
	} else {
		// Add subject if phrase doesn't already have one
		addSubject(newPhrase);
	}

	// Make each nested inner slot Sortable
	makeInnerSlotsSortable(newPhrase);

	// Auto-select the newly added phrase
	toggleDiaryPhraseSelect(newPhrase);
	
	updatePhraseListeners(newPhrase,"diary");

	// TODO Fix animation here?
	//newPhrase.classList.add("dragged");
	//setTimeout(newPhrase.classList.remove("dragged"), 5000);
}

// Add a subject to the given phrase (HTML element) if it's appropriate 
// (if it's a verb and doesn't already have a subject)
function addSubject (phrase) {
	let phraseData = DataWrangler.getPhraseById(phrase.id);
	// People and places (as simple phrases) are not added to the Loki db
	let phraseType = phraseData.type;
	if (phraseType==="person" || phraseType==="place") return;

	// Some connectors & modifiers don't have subjects and shouldn't have ones generated 
	if (phraseData.supressSubject) return; 

	if (!hasSubject(phrase)) {
		innerText = phrase.querySelector(".phrase > p");
		innerText.prepend("I ");
	}
}

// TODO refactor code so that each phrase has structured data associated with it so we
// don't need to do this awful, super fragile HTML parsing
function hasSubject (phrase) {
	if (phrase.querySelector(".phrase > p").innerText.startsWith("I"))
		return true;
	if (phrase.querySelector(".phrase > :first-child").classList.contains("person"))
		return true;
	if (phrase.querySelector(".phrase > :first-child").classList.contains("place"))
		return true;

	let phraseText = phrase.querySelector(".phrase > :first-child").innerText;
	let startsWithVerb = nlp(phraseText).match("^#Verb").found; // Does phrase start with a verb
	if (startsWithVerb) return false;

	let nounThenVerb = nlp(phraseText).match('#Noun * #Verb').found; // Does a noun come before a verb
	if (nounThenVerb) return true;
	
	return false;
}

function removeFromDiary (phrase) {
	phrase.remove();
}

/*trash.addEventListener('dragover', dragOverTrash);
function dragOverTrash (ev) {
	console.log("dragged over trash", ev);
	ev.preventDefault();
}*/

// TODO Ability to drag diary phrases to a trashcan 
// (icon in the bottom right corner of diary page?)

// TODO long click on diary phrases to enable multi-select 
// (and then option to trash, unselect, and [stretch] move together in sort?)


/// Date stuff

function nthMonth (i) {
	let months = ["January", "February", "March", "April", 
				  "May", "June", "July", "August", "September", 
				  "October", "November", "December"];
	return months[i];
}
function currentDate() {
	let d = new Date();
	let month = nthMonth(d.getMonth());
	let day = d.getDate();
	let year = d.getFullYear();
	return `${month} ${day}, ${year}`;
}
function addDateLine (date) {
	document.querySelector('#dateline').innerHTML = date;
}
addDateLine(currentDate());

/// 

// Clear contents of #diary when "clear" button clicked
document.querySelector('#clear-diary').onclick = function () {
	let phrases = Array.from(document.querySelector("#diary").childNodes);
	phrases.forEach( phrase => {
		phrase.classList.add("fade");
		// Remove all contents of #diary after animation finishes 
		phrase.addEventListener('animationend', () => {
			removeFromDiary(phrase);
		});
	});
}

// Display and add listeners to each phrase in the library
function makeLibrary () {

	// Add simple phrases (no inner phrases)
	addItemsToCategory (people, 'people', 'person');
	appendPlusButton ('people', 'person');
	addItemsToCategory (places, 'places', 'place');
	appendPlusButton ('places', 'place');

	// Add complex phrases by type
	addPhrasesOfTypeToCategory (['modifier'], 'modifiers');
	addPhrasesOfTypeToCategory (['connector'], 'connectors');

	// Add complex event/action phrases by tag
	makeCategory ('Mind', 'mind'); 
	makeCategory ('Body', 'body');
	makeCategory ('Social', 'social');
	makeCategory ('Recreation', 'recreation');
	makeCategory ('Expression', 'expression');
	makeCategory ('Work', 'work'); 
	makeCategory ('Chores', 'chores');
	makeCategory ('Major Life Events', 'major life events'); 
	makeCategory ('External', 'external');
	
}

// Add all phrases defined by data objects in the items array 
// to the library category with the given HTML id (e.g., "people").
// - type is a string to add in classnames for the individual item HTML elements.
// - each item in the items array should at least have a 'name' property. 
function addItemsToCategory (items, category, type) {
	items.forEach( (item) => addItemToCategory(item, category, type) );
}

// Add a given "simple" phrase (no inner slots) 
// of a given type ("person", "place") 
// to the library category with the given HTML id ("people", "places").
// The item is an object with at least a 'name' property. 
function addItemToCategory (item, category, type) {
	let container = document.createElement("div");
	container.classList.add("phrase-container-"+type);
	container.classList.add("phrase-container");
	// TODO eventually give each data and HTML item a numerical, generated ID 
	// so we don't need to worry about names with spaces, special characters,
	// or duplicate names.
	container.id = item.id;
	container.draggable = true;
	let element = document.createElement("button");
	element.classList.add("phrase");
	element.classList.add(type);
	let p = document.createElement("p");
	p.innerHTML = item.name;
	element.append(p);
	updatePhraseListeners(container,"library");
	container.append(element);
	document.querySelector('#'+category).append(container);
}

function appendPlusButton (category, type) {
	let container = document.createElement("div");
	container.classList.add("phrase-container-new");
	container.classList.add("phrase-container");
	//container.classList.add("new-button");
	container.id = "new-"+type;
	container.draggable = false;
	let element = document.createElement("button");
	element.classList.add("phrase");
	element.classList.add("new-button");
	let p = document.createElement("p");
	p.innerHTML = "+";
	element.append(p);
	container.addEventListener('click', () => createNewItem(type));
	container.append(element);
	document.querySelector('#'+category).append(container);
}

function createNewItem (type) {
	// TODO make this actually do something
	console.log("Create new", type);
}

// Make a new category HTML element with the given ID and heading
// and the classes "category phrases-container library".
// Like <div class="category phrases-container library" id="events"><h2>Events</h2>.
// Append all phrases of the given tag to this div.
function makeCategory (categoryName, phrasesTag) {

	let category = document.createElement("div");
	category.classList.add("category");
	category.classList.add("phrases-container");
	category.classList.add("library");
	// To turn the categoryName string into a CSS id, make it all lowercase and replace spaces with hyphens
	category.id = categoryName.toLowerCase().replace(/\s/g, "-");

	let heading = document.createElement("h2");
	heading.innerHTML = categoryName.toTitleCase();
	category.append(heading);

	document.querySelector('.categories-container').append(category);

	addPhrasesWithTagToCategory (phrasesTag, category.id);
}

//// TODO: make the two functions addPhrasesOfTypeToCategory and addPhrasesWithTagToCategory one function?

// Add phrases with a given tag to HTML element with given category id. Optionally sort them by given field.
// Assumes there's something like <div class="category phrases-container library" id="events"><h2>Events</h2>
// in the HTML.
function addPhrasesWithTagToCategory (phraseTag, category, sortBy='text') {
	let phrases = DataWrangler.getPhrasesByTag(phraseTag, sortBy);
	phrases.forEach ( (phrase) => {
		addPhraseToLibrary (phrase, category);
	})
}
// Add phrases of type given in phraseTypes (an array of phrase types),
// into HTML element with given category id. Optionally sort them by given field.
// Assumes there's something like <div class="category phrases-container library" id="events"><h2>Events</h2>
// in the HTML.
function addPhrasesOfTypeToCategory (phraseTypes, category, sortBy='text') {
	let phrases = DataWrangler.getPhrasesByTypes(phraseTypes, sortBy);
	phrases.forEach ( (phrase) => {
		addPhraseToLibrary (phrase, category);
	})
}

// Create the html for a given phrase data object,
// and append it to the element with the given category id
function addPhraseToLibrary (phraseObj, category) {
	let container = document.createElement("div");
	container.classList.add("phrase-container-"+category);
	container.classList.add("phrase-container");
	container.id = phraseObj["id"];
	container.draggable = true;
	let element = document.createElement("button");
	element.className = "phrase " + category;

	// Parse all inner slot #tags and text in between and around them
	const regex = /(#[a-z-.]*)|([a-z' -]+)/gim;
	let str = phraseObj["text"][0];
	let matches = str.match(regex);

	matches.forEach((match, groupIndex) => {
		// If match is a #tag, add an inner slot
		if (match.startsWith('#')) {
			let innerSlotType = getInnerSlotTypeFromString(match);
			element.append(makeInnerSlot(innerSlotType)); 
		} else {
			// Add text as <p>
			let p = document.createElement("p");
			p.innerHTML = match;
			element.append(p);
		}
	});
	
	//element.style.transform = "rotate("+ random(-5,5) +"deg)";

	updatePhraseListeners(container,"library");
	
	container.append(element);
	document.querySelector('#'+category).append(container);
}

// Example: "#event.present" -> "event"
function getInnerSlotTypeFromString (str) {
	// Without the global flag, will only return the first inner slot type if there's multiple
	const regex = /(?<=#)([a-z-]*)/im;
	let match = str.match(regex);
	if (match === null) {
		console.warn(`Could not find an inner slot to type in '${str}'`);
	}
	return match[0];
}

// Add/remove event listeners to a phrase element in the "library" or "diary" context
// Called when the phrase library is first created, 
// and when a phrase is dragged/click-added to the diary.
function updatePhraseListeners (element, context="library") {

	// Both diary and library events
	element.addEventListener('contextmenu',showPhraseContextMenu); // right click

	if (context === "library") {
		element.addEventListener('click',addToDiary);

	} else if (context === "diary") {
		// Remove any addToDiary event listeners (important because for dragged 
		// elements, the original element is dragged away, and a clone is added in
		// the original's place, so need to remove the dragged element's library-specific events)
		element.removeEventListener('click',addToDiary);

		element.addEventListener('click',toggleDiaryPhraseSelect);
	}
}


function toggleDiaryPhraseSelect (event) {

	let selectedPhrase;
	if (event.currentTarget) {
		// Prevent this event from bubbling up to any outer phrases, so that 
		// toggling selection only runs for the innermost phrase (if it's nested in an inner slot)
		// Otherwise you couldn't select inner slot phrases.
		event.stopPropagation();
		selectedPhrase = event.currentTarget;
	}
	if (isHtmlElement(event)) {
		selectedPhrase = event; 
	}

	// Unselect any other diary phrases; there can only be one
	let diaryPhrases = document.querySelector("#diary").querySelectorAll(".phrase-container");
	diaryPhrases.forEach ( (phrase) => {
		if (phrase === selectedPhrase) return;
		else phrase.classList.remove("selected") 
	});

	selectedPhrase.classList.toggle("selected");

	// Begin selection mode - listen for arrow keys, enter, and delete
	if (selectedPhrase.classList.contains("selected")) {
		document.addEventListener('keydown',keydownWhilePhraseSelected);
	} else {
		endEditPhraseText(selectedPhrase);
		document.removeEventListener('keydown',keydownWhilePhraseSelected);
	}
}

// Function to run when a key is pressed while a diary phrase is selected
// Checks the key code and runs the appropriate operation
function keydownWhilePhraseSelected (event) {
	let selectedPhrase = document.querySelector("#diary").querySelector(".selected");

	// If there is no selected phrase, this event listener shouldn't be around
	if (!selectedPhrase) {
		document.removeEventListener('keydown',keydownWhilePhraseSelected);
		return;
	}
	//console.log(`Key pressed: ${event.code}, selectedPhrase:`,selectedPhrase);

	switch (event.code) {
		case "ArrowRight":
			//movePhrase(selectedPhrase, 'right');
			break;
		case "ArrowLeft":
			//movePhrase(selectedPhrase, 'left');
			break;
		case "ArrowUp":
			//cyclePhraseText(selectedPhrase, 'up');
			break;
		case "ArrowDown":
			//cyclePhraseText(selectedPhrase, 'down');
			break;
		case "Enter":
			event.preventDefault();
			toggleEditPhraseText(selectedPhrase);
			break;
		case "Backspace":
			// Don't do special behavior if phrase is currently editable
			if (!selectedPhrase.isContentEditable)
				removeFromDiary(selectedPhrase);
			break;
	}
}

function toggleEditPhraseText (phrase) {
	if (phrase.isContentEditable) endEditPhraseText (phrase);
	else startEditPhraseText (phrase);
}
function startEditPhraseText (phrase) {
	phrase.contentEditable = 'true';
	setCursorToEnd(phrase);
}
function endEditPhraseText (phrase) {
	phrase.contentEditable = 'false';
}

// Via https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity/3866442#3866442
// TODO Alter this to ignore innerslots
function setCursorToEnd (contentEditableElement) {
    var range, selection;
    if(document.createRange) { //Firefox, Chrome, Opera, Safari, IE 9+
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if (document.selection) { //IE 8 and lower
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}

// Event triggered by right-clicking a phrase in either library or diary
// Show a custom context menu containing: a list of all alternate text representations
// for this phrase, which user may click to change the current representation to. 
// The menu also contains: "Edit phrase", "Edit phrase text", 
// and (if in library) "Add to diary", "Add to diary without 'I'",
// (if in diary) "Select", "Delete from diary"
function showPhraseContextMenu (event) {
	//event.preventDefault();
	console.log("Phrase has been right-clicked. Show context menu containing alt phrases");
}

// Make and return an inner slot element
function makeInnerSlot (type) {
	let innerSlot = document.createElement("button");
	innerSlot.classList.add("inner-slot");
	// TODO set inner slot background color to slightly darker shade of parent's background
	//innerSlot.style.background = 'white';
	let emptyIndicator = document.createElement("div");
	// TODO set visually different empty-indicators for different slot types

	// Inner slot background starts off the same as its parent phrase
	innerSlot.style.background = "inherit";

	//console.log(type);
	switch (type) {
		case "person": 
			//<i class="fas fa-child empty-indicator"></i>
			emptyIndicator = document.createElement("i");
			emptyIndicator.className = "fas fa-child empty-indicator"; // or fa-user
			emptyIndicator.style.color = "var(--person)";
			innerSlot.classList.add("person");
			break;
		case "place":
			emptyIndicator = document.createElement("i");
			emptyIndicator.className = "fas fa-map-marker empty-indicator"; // or fa-home
			emptyIndicator.style.color = "var(--place)";
			innerSlot.classList.add("place");
			break;
		default: 
			emptyIndicator = document.createElement("div");
			emptyIndicator.className = "empty-indicator";
			emptyIndicator.style.background = "white";
	}
	emptyIndicator.draggable = false;
	innerSlot.append(emptyIndicator);
	return innerSlot;
}

// Sets SVG attributes given in obj for a new line
function Line(obj){
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    for (property in obj) {
        line.setAttribute(property, obj[property])  
    }
    return line;
}

