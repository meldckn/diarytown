
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

// Need to custom-add some words to the lexicon because the 
// default Rita lexicon thinks they're nouns when they're actually verbs
RiTa.addWord("meditated","m-eh1-d-ah0-t-ey2-t-eh-d","vbd");
RiTa.addWord("gossiped", "g-aa1-s-ah0-p-eh-d", "vbd");

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
	    'visit': 	 { Infinitive:'visit', PastTense:'visited'}
	}
};
nlp.plugin(plugin);

/// Sortable library stuff

makeLibrary();

let diary = document.getElementById('diary');
let library = document.querySelector('.library'); // Might eventually be multiple lists
let trash = document.getElementById('trash');
trash.draggable = false;
 
// TODO since this doesn't allow arbitrarily nested inner slots,
// might try making different Sortable group for each inner slot (by incrementing an id)?
// and then connecting all existing inner slot groups
// --Would also need to rework CSS probably
// TODO ** Instead of inner sortable slots (since they make for small targets)
// make it so when you drag and drop something over a phrase with a slot, 
// it gets added to that slot (by hand; don't make inner slots Sortable lists).
// if there are multiple slots in phrase, check mouse position relative to boundingRect
let innerSortableObject = {
	group: {
		name: "inner",
		pull: ["trash", "diary", "inner"], // lists that can pull from any inner slot 
		put: ["library", "diary", "inner"], // lists that can add to any inner slot
		revertClone: true,
	},
	animation: 200,
	//fallbackOnBody: true,
	sort: true,
	// px, distance mouse must be from empty sortable to insert drag element into 
	emptyInsertThreshold: 20,
	filter: ".empty-indicator",  // Selectors that do not lead to dragging
	onAdd: function (evt) {
		// When a phrase is added to an inner slot, hide its empty-indicator
		// and show a distinguishing background color
		// Use :scope selector to select only direct children, not descendants
		evt.to.querySelector(':scope > .empty-indicator').style.display = "none";
		// TODO slightly darken the inner slot's parent color for the inner slot background 
		evt.to.style.background = "#00a6de"; 
		transformCompoundPhrase(evt.to.parentElement.parentElement, evt.item);
	},
	// Element is removed from the list into another list
	onRemove: function (evt) {
		// if list is empty, show empty indicator symbol
		// TODO try doing this onChange so it's updated during the drag?
		if (evt.from.children.length <= 1) {
			evt.from.querySelector(':scope > .empty-indicator').style.display = "inline-block";
			evt.from.style.background = "inherit";
		}
	}
};

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
		case 'which-caused':
			//after event changes to present tense and prefix "#subject to" 
			//(if action: change to present tense and prefix with "me to")
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

// Use RiTa to find the first verb in the given phrase (string, not element)
// Since that's probably the main verb and the only thing we need to change the tense of
function getVerb (phrase) {
	let words = RiTa.tokenize(phrase);
	let pos = RiTa.getPosTags(phrase, true);
	let firstVerb = words.find( (word,i) => {
		return pos[i] === "v";
	});
	return firstVerb;
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

// TODO write a test function that runs on load that tries to conjugate all phrases 
// in library, and lists all phrases that it doesn't understand

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
	if (!phraseData) return;

	let phraseText = phraseElement.querySelector('.phrase-container p').innerText;
	let verb = getVerb(phraseText);
	let present = conjugateVerb(verb,tense);

	phraseElement.querySelector('.phrase-container p').innerText = phraseText.replace(verb,present);
}

// TODO play a lookatme effect on diary page when library phrase picked up?
// (if not right away, could trigger after some amount of time while picked up?)
let librarySortableObject = {
	animation: 200,
	group: {
		name: "library",
		pull: "clone", // ability to copy from the list 
		put: false, // no list can add to library
		revertClone: true // revert cloned element to initial position after moving to a another list
	},
	//ghostClass: 'dragGhost',
	dragClass: 'dragging',
	sort: false,
	filter: ".new-button",
	// Element dragging started
	onStart: function (evt) {
		evt.item.classList.add('dragging');  // element index within parent
	},
	// TODO replace event listeners on original even if you don't finish dragging successfully
	// Investigate what function fires when you drag a library phrase outside of library
	// but not in diary

	// Element dragging ended (dragged HTMLElement: evt.item)
	onEnd: function (evt) {
		// Remove event listeners from dragged element, put a new one on the clone
		// (Because the clone is added to the library, the original element is dragged away)
		evt.item.removeEventListener('click',addToDiary);
		evt.clone.addEventListener('click',addToDiary);

  		evt.to;    // target list
  		evt.from;  // previous list
  		evt.oldIndex;  // element's old index within old parent
  		evt.newIndex;  // element's new index within new parent
  		evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
  		evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
  		evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
	}
};

// Make each library category Sortable
let libraries = Array.from(document.querySelectorAll('.library'));
libraries.forEach( (library) => {
	Sortable.create ( library, librarySortableObject);
});

Sortable.create( diary, {
	animation: 200, 
	group: {
		name: "diary",
		pull: ["trash", "inner"], // lists that can pull from diary 
		put: ["library", "inner"], // lists that can add to diary
		revertClone: true,
	},
	fallbackOnBody: true,
	swapThreshold: 0.1,
	invertSwap: true,
	//ghostClass: 'dragGhost',
	sort: true,
	onAdd: function (evt) {
		// When a phrase is dropped into the diary
		addToDiary (evt.item);
		undoPhraseTransforms(evt.item);
	},
	// Called by any change to the list (add / update / remove)
	onSort: function (evt) {
	},
});

// Add a given phrase/action/event (by id) to the diary entry
// -- uses the event which triggered it (a phrase's onclick)
// TODO check that there is a valid phrase in the event target
// (i.e., that this was called from a phrase's onclick)
// TODO if it wasn't, it would probably be called with a phrase id
// so have that as fallback?
function addToDiary (newPhrase) {

	if (!isHtmlElement(newPhrase)) {
		// Was not called with a valid HTML element (of the new phrase)
		// So create one using the current event's target 

		// Deeply clone the phrase container that was clicked on (w/ all children)
		// (doesn't clone event listeners)
		newPhrase = event.currentTarget.cloneNode(true);

		// TODO See if we can simulate a drag-to-diary action here?

		document.querySelector('#diary').append(newPhrase);
	}

	// Make each nested inner slot Sortable
	let innerSlots = Array.from(newPhrase.querySelectorAll('.inner-slot'));
	innerSlots.forEach( (innerSlot) => {
		Sortable.create(innerSlot, innerSortableObject);
	});

	// Add subject if phrase doesn't already have one
	addSubject(newPhrase);

	// TODO Fix animation here?
	//newPhrase.classList.add("dragged");
	//setTimeout(newPhrase.classList.remove("dragged"), 5000);
}

// Add a subject to the given phrase (HTML element) if it's appropriate 
// (if it's a verb and doesn't already have a subject)
function addSubject (phrase) {
	let phraseData = DataWrangler.getPhraseById(phrase.id);
	// People and places (as simple phrases) are not added to the Loki db
	if (!phraseData) return;

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
	let match = nlp(phraseText).match('#Noun * #Verb'); // Does a noun come before a verb
	if (match.found) return true;
	
	return false;
}

// A pseudo-list to enable drag-and-dropping from diary to trash
// TODO trigger a trash effect when hovered over while dragging 
// (Is there an onenter?)
// And maybe a lookatme effect on trash when diary phrase is picked up
// (e.g., trash lid opens)
Sortable.create( trash, {
	animation: 200,
	group: {
		name: "trash",
		pull: false,
		put: ["diary","inner"]
	},
	ghostClass: 'trashGhost', // Set display:none 
	//dragClass: 'dragoverTrash',
	sort: false,
	filter: "#trash", // Selectors that do not lead to dragging
	onAdd: function (evt) {
		// When a phrase is dropped into the trash "list"
		evt.item.remove();
	}
});

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
			phrase.remove();
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
	//container.id = "person-"+person.id;
	container.draggable = true;
	let element = document.createElement("button");
	element.classList.add("phrase");
	element.classList.add(type);
	let p = document.createElement("p");
	p.innerHTML = item.name;
	element.append(p);
	container.addEventListener('click',addToDiary);
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
	const regex = /(#[a-z]*)|([a-z' -]+)/gim;
	let str = phraseObj["text"][0];
	let matches = str.match(regex);

	matches.forEach((match, groupIndex) => {
		// If match is a #tag, add an inner slot
		if (match.startsWith('#')) {
			element.append(makeInnerSlot(match.substr(1))); // Strip the '#'
		} else {
			// Add text as <p>
			let p = document.createElement("p");
			p.innerHTML = match;
			element.append(p);
		}
	});
	
	//element.style.transform = "rotate("+ random(-5,5) +"deg)";

	container.addEventListener('click',addToDiary);
	container.append(element);
	document.querySelector('#'+category).append(container);
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
		case "someone": 
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

// // Global variable containing the currently dragged element
// var draggedPhrase = null;

// // Set the drag-and-drop payload
// // When a phrase is being dragged from the library
// // Note: all custom data types get converted to all-lowercase
// // And for some reason we can't access payload data from dragover events (only drop?)
// // So using the global draggedPhrase variable to manage
// function dragStartFromLibrary (event) {
// 	// Create a new .diary-phrase element to add to the entry from the library
// 	console.log("this", this);
// 	draggedPhrase = makeDiaryPhrase(this.id);
// 	event.dataTransfer.effectAllowed = 'move';
// 	event.dataTransfer.setData('from-library', true);
// 	event.dataTransfer.setData('text/plain', this.id);
// }
// // When a phrase is being dragged from the diary entry
// function dragStartFromEntry (event) {
// 	draggedPhrase = event.target;
// 	event.dataTransfer.effectAllowed = 'move';
// 	event.dataTransfer.setData('text/plain', this.id);
// }

// Set the drop target (the diary entry) by setting its dnd event listeners
//let diaryPage = document.querySelector(".page-right");
//diaryPage.addEventListener('dragover', dragOverDiary);
//diaryPage.addEventListener('dragenter', dragEnterTrash);
//diaryPage.addEventListener('dragleave', dragLeaveDiary);
//diaryPage.addEventListener('drop', dropInDiary);


function dragOverDiary (event) {
	event.preventDefault();

	/*
	if (document.querySelector(".diary-phrase:not(.dragged)")) {
		// Insert a temporary element before or after the nearest element
		placePhraseInList(draggedPhrase);
	} else {
		document.querySelector("#diary").append(draggedPhrase);
	}
	draggedPhrase.classList.add("dragged");*/
	return false;
}

function dragEnterDiary (event) {
	// Could eventually have an effect here?
	//console.log("dragenter event.target:", event.target);
}

function dragLeaveDiary (event) {
	// If you drag onto diary and then off, remove temp phrase
	dragged = document.querySelector(".dragged");
	if (dragged) { document.querySelector(".dragged").remove(); }
}

function dropInDiary (event) {
	// (New phrase added in dragOverDiary)
	removeClassOn("highlight", "diary-phrase");
	draggedPhrase.classList.remove("dragged");
	draggedPhrase = null;
}

// Sets SVG attributes given in obj for a new line
function Line(obj){
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    for (property in obj) {
        line.setAttribute(property, obj[property])  
    }
    return line;
}

