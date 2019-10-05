
/// Utility functions

function random(min, max) {
	return Math.random() * (max - min) + min;
}

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
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

///

/// Sortable library stuff

let diary = document.getElementById('diary');
let library = document.querySelector('.library'); // Might eventually be multiple lists
let trash = document.getElementById('trash');
 
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
		pull: ["trash", "diary", "inner"], // ability to move from inner slot 
		put: ["library", "diary", "inner"], // whether elements can be added from other lists
		revertClone: true,
	},
	animation: 200,
	//fallbackOnBody: true,
	sort: true,
	// px, distance mouse must be from empty sortable to insert drag element into 
	emptyInsertThreshold: 20,
	onAdd: function (evt) {
		evt.to.querySelector('.empty-indicator').style.display = 'none';
	},
	// Element is removed from the list into another list
	onRemove: function (evt) {
		console.log(evt.from, evt.from.childNodes.length);
		// if list is empty, show empty indicator symbol
		// TODO try doing this onChange so it's updated during the drag
		if (evt.from.childNodes.length <= 1) {
			evt.to.querySelector('.empty-indicator').style.display = 'block';
		}
	}
};

// TODO play a lookatme effect on diary page when library phrase picked up?
// (if not right away, could trigger after some amount of time while picked up?)
let librarySortableObject = {
	animation: 200,
	group: {
		name: "library",
		pull: "clone", // ability to copy from the list 
		put: false, // whether elements can be added from other lists
		revertClone: true // revert cloned element to initial position after moving to a another list
	},
	ghostClass: 'dragGhost',
	dragClass: 'dragging',
	sort: false,
	// Element dragging started
	onStart: function (evt) {
		evt.item.classList.add('dragging');  // element index within parent
	},
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
		pull: ["trash", "inner"], // ability to move from diary 
		put: ["library", "inner"], // whether elements can be added from other lists
		revertClone: true,
	},
	fallbackOnBody: true,
	swapThreshold: 0.1,
	invertSwap: true,
	ghostClass: 'dragGhost',
	sort: true,
	onAdd: function (evt) {
		// When a phrase is dropped into the diary
		// TODO if evt.item is a modifier/connector
		// ..add a '(' to its inner html
		// ..and create a new .phrase element for ')'
		//createPhraseBuddies(evt.item);

		// Make each nested inner slot Sortable
		let innerSlots = Array.from(evt.item.querySelectorAll('.inner-slot'));
		innerSlots.forEach( (innerSlot) => {
			Sortable.create(innerSlot, innerSortableObject);
		});

	},
	// Called by any change to the list (add / update / remove)
	onSort: function (evt) {
		// Update the buddy lines

	},
});

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
	onAdd: function (evt) {
		// When a phrase is dropped into the trash "list"
		evt.item.remove();

		// TODO if evt.item is a modifier/connector, also remove associated ()s
	}
});

// TODO Ability to drag diary phrases to a trashcan 
// (icon in the bottom right corner of diary page?)

// TODO long click on diary phrases to enable multi-select 
// (and then option to trash, unselect, and [stretch] move together in sort?)


DataWrangler.init();
makeLibrary();


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
	// TODO sort phrases in each category by something reasonable
	addPhrasesToCategory (['modifier'], 'modifiers');
	addPhrasesToCategory (['connector'], 'connectors');
	addPhrasesToCategory (['event','action'], 'events', 'text');
}

// Add phrases of type given in phraseTypes (an array of phrase types),
// into HTML element with given category id. Optionally sort them by given field.
function addPhrasesToCategory (phraseTypes, category, sortBy='id') {
	let phrases = DataWrangler.getPhrasesByTypes(phraseTypes, sortBy);
	phrases.forEach ( (phrase) => {
		addPhraseToLibrary (phrase, category);
	})
}

// Create the html for a given phrase data object,
// and append it to the element with the given category id
function addPhraseToLibrary (phraseObj, category) {
	let container = document.createElement("div");
	container.classList.add("phrase-container-"+phraseObj["category"]);
	container.classList.add("phrase-container");
	container.id = phraseObj["id"];
	container.draggable = true;
	let element = document.createElement("button");
	element.className = "phrase " + phraseObj["category"];
	let p = document.createElement("p");
	p.innerHTML = phraseObj["text"][0];
	element.append(p);

	// Add inner slots
	if (phraseObj["id"] === "caused") {
		element.innerHTML += "  ";
		let innerSlot = document.createElement("button");
		innerSlot.className = "inner-slot";
		//innerSlot.style.background = 'white';
		let emptyIndicator = document.createElement("div");
		emptyIndicator.className = "empty-indicator";
		innerSlot.append(emptyIndicator);
		element.append(innerSlot);
	}
	
	//element.style.transform = "rotate("+ random(-5,5) +"deg)";

	container.addEventListener('click',addToDiary);
		//container.addEventListener('dragstart', dragStartFromLibrary);
		container.append(element);
	document.querySelector('#'+category).append(container);
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
//diaryPage.addEventListener('dragenter', dragEnterDiary);
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

// Add a given phrase/action/event (by id) to the diary entry
// -- uses the event which triggered it (a phrase's onclick)
// TODO check that there is a valid phrase in the event target
// (i.e., that this was called from a phrase's onclick)
// TODO if it wasn't, it would probably be called with a phrase id
// so have that as fallback?
function addToDiary () {
	// Deeply clone the phrase container that was clicked on (w/ all children)
	// (doesn't clone event listeners)
	let newPhrase = event.currentTarget.cloneNode(true);

	// TODO See if we can simulate a drag-to-diary action here

	document.querySelector('#diary').append(newPhrase);
	//createPhraseBuddies(newPhrase);

	// Loop through each nested sortable element (inner-slots)
	let innerSlots = Array.from(newPhrase.querySelectorAll('.inner-slot'));

	for (var i = 0; i < innerSlots.length; i++) {
		Sortable.create ( innerSlots[i], innerSortableObject);
	}

	// TODO Fix animation here?
	newPhrase.classList.add("dragged");
	setTimeout(newPhrase.classList.remove("dragged"), 5000);
}

// Sets SVG attributes given in obj for a new line
function Line(obj){
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    for (property in obj) {
        line.setAttribute(property, obj[property])  
    }
    return line;
}

// If a phrase just added to the diary is a modifier/connector
// ..add a '(' to its inner html
// ..and create a new .phrase element for ')'
function createPhraseBuddies(phrase) {

	// Check if modifier or connector
	// TODO instead check beforeContext and afterContext
	let phraseData = DataWrangler.getPhraseById(phrase.id);
	if (phraseData.type === 'modifier') {

		let innerPhrase = phrase.querySelector('button');
		let phraseColor = getComputedStyle(innerPhrase).backgroundColor;

		innerPhrase.innerHTML += " (";

		// Deeply clone the original phrase that was clicked on (w/ all children)
		// (doesn't clone event listeners)
		let buddy = phrase.cloneNode(true);
		let innerBuddy = buddy.querySelector('button');
		innerBuddy.innerHTML = ")";

		insertAfter(buddy,phrase);

		// Make svg line between phrase and buddy
		let phraseRect = phrase.getBoundingClientRect();
		let buddyRect  = buddy.getBoundingClientRect();

		// Make new SVG 
		let svg = document.getElementById('svg');

		let line = new Line ({
			'id': phrase.id + '-line',
		    'x1': phraseRect.x + phraseRect.width/2,
			'y1': phraseRect.y + phraseRect.height/2,
			'x2': buddyRect.x + buddyRect.width/2,
			'y2': buddyRect.y + buddyRect.height/2,
			"stroke": phraseColor,
			"stroke-width": '3px'
		});
    	svg.append(line);
	}
}

