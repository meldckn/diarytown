// Functions and data that interface with the SortableJS library,
// which enables drag-and-dropping elements to and from different lists on a page.

// Make the inner slot Sortable definition (which is )
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
		afterAddToInnerSlot (evt.item, evt.to);
		/*// When a phrase is added to an inner slot, hide its empty-indicator
		// and show a distinguishing background color
		// Use :scope selector to select only direct children, not descendants
		evt.to.querySelector(':scope > .empty-indicator').style.display = "none";
		// TODO slightly darken the inner slot's parent color for the inner slot background 
		evt.to.style.background = "#00a6de"; 
		transformCompoundPhrase(evt.to.parentElement.parentElement, evt.item);*/
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

// Make all of a given phrase element's inner slots Sortable 
function makeInnerSlotsSortable (outerPhrase) {
	// Make each nested inner slot Sortable
	let innerSlots = Array.from(outerPhrase.querySelectorAll('.inner-slot'));
	innerSlots.forEach( (innerSlot) => {
		Sortable.create(innerSlot, innerSortableObject);
	});
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
		//evt.item.removeEventListener('click',addToDiary);
		//evt.clone.addEventListener('click',addToDiary);

		updatePhraseListeners(evt.item, "diary");
		updatePhraseListeners(evt.clone, "library");

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
function makeLibrarySortables() {
	let libraries = Array.from(document.querySelectorAll('.library'));
	libraries.forEach( (library) => {
		Sortable.create ( library, librarySortableObject);
	});
}

// Make the diary entry Sortable
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

// Make the trashcan Sortable
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
		removeFromDiary(evt.item);
	}
});

