
var people = [ 
	{
		name: "Melanie",
		pronoun: "she",
		relation: "self",
		tags: ["quiet", "creative", "insecure", "dislikes authority"]
	},{
		name: "Neil",
		pronoun: "he",
		relation: "partner",
		tags: ["mellow", "strong", "avoids drama", "goofy"]
	},{
		name: "Nybble",
		pronoun: "she",
		relation: "pet",
		tags: ["small", "particular"]
	},{
		name: "Bit",
		pronoun: "he",
		relation: "pet",
		tags: ["big", "loves pets", "cuddly"]
	},{
		name: "Mom",
		pronoun: "she",
		relation: "parent"
	},{
		name: "Dad",
		pronoun: "he",
		relation: "parent"
	},{
		name: "Alan",
		pronoun: "he",
		relation: "sibling"
	},{
		name: "Max",
		pronoun: "they"
	},{
		name: "Barrett",
		pronoun: "he"
	},{
		name: "Chloe",
		pronoun: "she"
	},{
		name: "Nick",
		pronoun: "he"
	}
];

var places = [
	{
		name: "home",
		type: "residence"
	},{
		name: "work",
		type: "work"
	},{
		name: "Neary Lagoon",
		type: "park"
	},{
		name: "Yan Flower House",
		type: "residence"
	},{
		name: "Barrett's house",
		type: "residence"
	},{
		name: "parent's house",
		type: "residence"
	},{
		name: "bookshop",
		type: "store"
	},{
		name: "beach",
		type: "beach"
	}
];

var phrases = [ 
	{
		id : "used-quality",
		text : [ "used some quality of self" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : []
	},{
		id : "late",
		text : [ "was late to something", "was late to #action", "was late to #place", "#action and was late" ],
		type : "action",
		category : "self",
		otherCategories : "negative",
		sentiment: "negative",
		relatedPhrases : [],
		emoji : "💨"
	},{
		id : "was-adj",
		text : [ "was #adj", "did something #adj", "felt #adj" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : []
	},{
		id : "was-adj-to",
		text : [ "was #adj to #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : []
	},{
		id : "watched",
		text : [ "watched TV", "watched a show", "watched a movie", "watched something" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "📺"
	},{
		id : "went-home",
		text : [ "went home" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🏠"
	},{
		id : "vacationed",
		text : [ "vacationed", "went on a trip", "went on a day trip", "went on vacation", "went on a vacation to #place" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : ["left-for-trip", "returned-from-trip", "adventured"],
		emoji : "✈️"
	},{
		id : "left-for-trip",
		text : [ "left for a trip" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : ["returned-from-trip", "vacationed", "adventured"],
		emoji : "✈️"
	},{
		id : "returned-from-trip",
		text : [ "returned from a trip", "came back from a trip" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : ["left-for-trip", "vacationed", "adventured"],
		emoji : "✈️"
	},{
		id : "packed",
		text : [ "packed for a trip", "packed" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : ["unpacked", "adventured"]
	},{
		id : "unpacked",
		text : [ "unpacked" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : ["packed", "adventured"]
	},{
		id : "adventured",
		text : [ "went on a journey", "had an adventure" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : ["vacationed"],
		emoji : "🏝️"

	},{
		id : "ate-out",
		text : [ "went out for food", "went out to dinner", "went out for drinks" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🍔"
	},{
		id : "shopped",
		text : [ "went shopping", "shopped" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🛍️"
	},{
		id : "work-meeting",
		text : [ "went to a meeting" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "💼"
	},{
		id : "work",
		text : [ "went to work" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "👔"
	},{
		id : "worked",
		text : [ "worked", "did work", "did some work", "worked on #project" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "👔"
	},{
		id : "finished-work",
		text : [ "finished some work", "finished #project" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : [],
		emoji : "👍"
	},{
		id : "published",
		text : [ "published my work", "published some work", 
				 "published some writing", "published some art", "published a project" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : []
	},{
		id : "shared-work",
		text : [ "shared my work", "shared my work with #someone", 
				 "shared work-in-progress" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : []
	},{
		id : "worked-late",
		text : [ "worked late" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "👔"
	},{
		id : "started-job",
		text : [ "started a new job" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "💼"
	},{
		id : "got-job",
		text : [ "got a new job" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "💼"
	},{
		id : "job-hunted",
		text : [ "job-hunted", "hunted for a job" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : ["interviewed", "got-job"],
		emoji: "💼"
	},{
		id : "applied-job",
		text : [ "applied for a job", "applied for a position" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : ["interviewed", "got-job"],
		emoji: "💼"
	},{
		id : "interviewed",
		text : [ "interviewed for a new job" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : ["job-hunted", "got-job"],
		emoji: "💼"
	},{
		id : "retired",
		text : [ "retired" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "💼"
	},{
		id : "went-to-class",
		text : [ "went to a class", "went to class", "went to school" ],
		type : "action",
		category : "movement",
		otherCategories : "work",
		relatedPhrases : [],
		emoji : "📝"
	},{
		id : "went-to-party",
		text : [ "went to a party" ],
		type : "action",
		category : "social",
		otherCategories : "movement",
		relatedPhrases : [],
		emoji : "🎉"
	},{
		id : "went-to-sport",
		text : [ "went to a sporting event" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : ["played"],
		emoji : "🏀"
	},{
		id : "went-to-doctor",
		text : [ "went to the doctor", "went to the hospital" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : ["sick"],
		emoji : "🏥"
	},{
		id : "prayed",
		text : [ "prayed" ],
		type : "action",
		category : "spirituality",
		otherCategories : "",
		relatedPhrases : ["church"]
	},{
		id : "church",
		text : [ "went to church" ],
		type : "action",
		category : "spirituality",
		otherCategories : "",
		relatedPhrases : ["prayed"]
	},{
		id : "avoided",
		text : [ "avoided doing something", "avoided #action", "avoided a responsibility" ],
		type : "action",
		category : "self",
		otherCategories : "work",
		relatedPhrases : ["avoided-someone"],
		emoji : "🤥"
	},{
		id : "avoided-someone",
		text : [ "avoided #someone" ],
		type : "action",
		category : "self",
		otherCategories : "social",
		relatedPhrases : ["avoided-something"]
	},{
		id : "chatted-with",
		text : [ "chatted with #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "👥"
	},{
		id : "collaborated",
		text : [ "collaborated with #someone", 
				 "worked together with #someone", 
				 "worked with #someone",
				 "worked with #someone on #project" 
				],
		type : "action",
		category : "social",
		otherCategories : "work",
		relatedPhrases : ["helped-someone", "got-help"],
		emoji : "🤝"
	},{
		id : "did-nothing",
		text : [ "did nothing", "couldn't do anything" ],
		type : "action",
		category : "self",
		otherCategories : "negative",
		relatedPhrases : [],
		emoji : "😒"
	},{
		id : "daydreamed",
		text : [ "daydreamed", 
				 "daydreamed about #event", 
				 "daydreamed about #someone",
				 "daydreamed about #place"
				],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "💭"
	},{
		id : "meditated",
		text : [ "meditated" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🙏"
	},{
		id : "napped",
		text : [ "took a nap", "napped" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : []
	},{
		id : "cloud-watched",
		text : [ "cloud-watched" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : ["people-watched", "daydreamed"]
	},{
		id : "people-watched",
		text : [ "people-watched" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : ["cloud-watched", "daydreamed"]
	},{
		id : "chores",
		text : [ "did chores", "ran errands", "took care of personal things", "did adult things" ],
		type : "action",
		category : "self",
		otherCategories : "movement",
		relatedPhrases : ["taxes", "managed-finances"],
		emoji : "🏠"
	},{
		id : "hobby",
		text : [ "did hobby", 
				 "crafted",
				 "gardened",
				 "wrote",
				 "drew",
				 "painted",
				 "took photos",
				 "played music",
				 "danced",
				 "hunted",
				 "biked",
				 "hiked",
				 "dived",
				 "collected #something",
				 "birdwatched",
				 "fished", "went fishing"
				],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : ["read", "played", "made-something", "cooked", "exercised", "volunteered", "learned"],
		emoji : "🎨"
	},{
		id : "volunteered",
		text : [ "volunteered" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : ["helped-someone"]
	},{
		id : "played",
		text : [ "played", "played games", "played a game", "played a sport" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : ["hobby"],
		emoji : "🎮"
	},{
		id : "helped-someone",
		text : [ "did something for #someone", "helped #someone", "did a favor for #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : ["volunteered", "got-help"],
		emoji : "🤝"
	},{
		id : "got-help",
		text : [ "asked for help", 
				 "got help from #someone", 
				 "#someone helped me", 
				 "got help on something from #someone" 
				],
		type : "action",
		category : "social",
		otherCategories : "work",
		sentiment: "positive",
		relatedPhrases : ["collaborated"],
		emoji : "👨‍🎓"
	},{
		id : "exercised",
		text : [ "exercised", "worked out" ],
		type : "action",
		category : "self",
		otherCategories : "movement",
		sentiment: "positive",
		relatedPhrases : [],
		emoji : "💪"
	},{
		id : "feeling-excited",
		text : [ "feeling excited for something coming up" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🤗"
	},{
		id : "sick",
		text : [ "felt sick", "felt bad" ],
		type : "action",
		category : "self",
		otherCategories : "negative",
		sentiment: "negative",
		relatedPhrases : ["went-to-doctor"],
		emoji : "🤢"
	},{
		id : "got-hurt",
		text : [ "got hurt", "hurt myself" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : [],
		emoji : "😔"
	},{
		id : "bug-bite",
		text : [ "got a bug bite", "was bit by a bug" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "interneted",
		text : [ "interneted", "puttered around on the internet", "messed around on the internet", "played on the computer" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "💻"
	},{
		id : "day-description",
		text : [ "had a #day-adj day" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
	},{
		id : "good-idea",
		text : [ "had a good idea" ],
		type : "action",
		category : "self",
		otherCategories : "mental",
		sentiment: "positive",
		relatedPhrases : [],
		emoji : "💡"
	},{
		id : "nice-convo",
		text : [ "had a nice conversation with #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : [],
		emoji : "💬"
	},{
		id : "heard-from",
		text : [ "heard from #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "👂"
	},{
		id : "resolved-conflict",
		text : [ "helped resolve a fight" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "😄"
	},{
		id : "hung-out",
		text : [ "hung out" ],
		type : "action",
		category : "self",
		otherCategories : "social",
		relatedPhrases : [],
		emoji : "🤝"
	},{
		id : "hung-out-with",
		text : [ "hung out with #someone", "spent quality time with #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🤝"
	},{
		id : "made-plans",
		text : [ "made plans" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🗓️"
	},{
		id : "made-something",
		text : [ "made something", "made a thing" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🎨"
	},{
		id : "messed-up",
		text : [ "messed up" ],
		type : "action",
		category : "self",
		otherCategories : "negative",
		sentiment: "negative",
		relatedPhrases : [],
		emoji : "😔"
	},{
		id : "missing-someone",
		text : [ "missed #someone", "wished #someone was here"],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : [],
		emoji : "😔"
	},{
		id : "moved",
		text : [ "moved" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : ["house-searched"],
		emoji : "🏠"
	},{
		id : "someone-moved",
		text : [ "#someone moved away" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : ["moved", "house-searched"],
		emoji : "🏠"
	},{
		id : "house-searched",
		text : [ "house searched", "searched for a new place to live" ],
		type : "action",
		category : "",
		otherCategories : "",
		relatedPhrases : ["moved"],
		emoji : "🏠"
	},{
		id : "bought-house",
		text : [ "bought a home", "bought a house" ],
		type : "action",
		category : "",
		otherCategories : "",
		relatedPhrases : ["moved", "house-searched"],
		emoji : "🏠"
	},{
		id : "sold-house",
		text : [ "sold a house" ],
		type : "action",
		category : "",
		otherCategories : "",
		relatedPhrases : ["bought-house", "moved", "house-searched"],
		emoji : "🏠"
	},{
		id : "dated",
		text : [ "went on a date with #someone", "went out with #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : []
	},{
		id : "engaged",
		text : [ "got engaged to #someone" ],
		type : "action",
		category : "",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : ["married"]
	},{
		id : "married",
		text : [ "got married to #someone" ],
		type : "action",
		category : "",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : ["engaged"]
	},{
		id : "divorced",
		text : [ "got divorced" ],
		type : "action",
		category : "",
		otherCategories : "",
		relatedPhrases : []
	},{
		id : "had-baby",
		text : [ "had a baby" ],
		type : "action",
		category : "",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : []
	},{
		id : "managed-finances",
		text : [ "managed finances" ],
		type : "action",
		category : "",
		otherCategories : "",
		relatedPhrases : ["chores", "taxes"]
	},{
		id : "taxes",
		text : [ "did taxes" ],
		type : "action",
		category : "",
		otherCategories : "",
		relatedPhrases : ["chores", "managed-finances"]
	},{
		id : "broke-something",
		text : [ "broke something" ],
		type : "action",
		category : "",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : ["fixed-something", "accident"]
	},{
		id : "something-broke",
		text : [ "something broke" ],
		type : "event",
		category : "external",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : ["broke-something", "accident"]
	},{
		id : "fixed-something",
		text : [ "fixed something" ],
		type : "action",
		category : "",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : ["broke-something"]
	},{
		id : "went-somewhere",
		text : [ "went somewhere" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🚘"
	},{
		id : "ran-into",
		text : [ "ran into #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "💨"
	},{
		id : "turning-point",
		text : [ "reached a turning point in something" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🔄"
	},{
		id : "reached-out-to",
		text : [ "reached out to #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🤝"
	},{
		id : "read",
		text : [ "read a book", "read something", "read something #adj" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [ "finished book" ],
		emoji : "📖"
	},{
		id : "finished-book",
		text : [ "finished a book", "finished a book I was reading" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [ "read" ],
		emoji : "📖"
	},{
		id : "realized-something",
		text : [ "realized something" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "💡"
	},{
		id : "saw-something",
		text : [ "saw something", "encountered something" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "👀"
	},{
		id : "saw-something-adj",
		text : [ "saw something #adj" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "👀"
	},{
		id : "saw-art",
		text : [ "looked at art", "saw art", "experienced art" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🖼"
	},{
		id : "learned",
		text : [ "learned something new", "set out to learn something new" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : [],
		emoji : "📚"
	},{
		id : "slept-in",
		text : [ "slept in" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : ["up-late"],
		emoji : "🛌"
	},{
		id : "up-late",
		text : [ "stayed up late" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : ["bed-early", "slept-in"]
	},{
		id : "bed-early",
		text : [ "went to bed early" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : ["up-late", "slept-in"]
	},{
		id : "couldnt-sleep",
		text : [ "couldn't sleep" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "did-something-cool",
		text : [ "did something cool" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : [],
		emoji : "🤗"
	},{
		id : "fight",
		text : [ "#someone and #someone fought", "#someone and #someone got into a fight" ],
		type : "event",
		category : "social",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : [],
		emoji : "👊"
	},{
		id : "studied",
		text : [ "studied", "studied for a thing coming up", "studied for a test coming up" ],
		type : "action",
		category : "self",
		otherCategories : "work",
		relatedPhrases : [ "work" ],
		emoji : "📚"
	},{
		id : "reminisced",
		text : [ "reminisced", "thought of an old memory", "thought of old times" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji:"📆"
	},{
		id : "took-walk",
		text : [ "took a walk", "took a walk to nowhere in particular", "took a drive" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "👟"
	},{
		id : "cared-for",
		text : [ "took care of #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "💗"
	},{
		id : "self-care",
		text : [ "took care of myself", "did self-care" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : [ "cared-for" ],
		emoji : "😃"
	},{
		id : "treated-self",
		text : [ "treated myself", "indulged in something nice" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : [ "guilty-pleasure", "slept-in", "self-care" ],
		emoji: "😃"
	},{
		id : "guilty-pleasure",
		text : [ "indulged in a guilty pleasure" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [ "treated-self" ],
		emoji:"😀"
	},{
		id : "cooked",
		text : [ "cooked", "baked", "cooked something yummy" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "👨‍🍳"
	},{
		id : "people-visited",
		text : [ "had #someone over" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [ "visited-people" ],
		emoji : "🤝"
	},{
		id : "visited-people",
		text : [ "visited friends", "visited relatives" ],
		type : "action",
		category : "social",
		otherCategories : "movement",
		relatedPhrases : [ "people-visited" ],
		emoji : "🤝"
	},{
		id : "met-someone",
		text : [ "met someone new", "met #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji : "🤝"
	},{
		id : "introduced",
		text : [ "introduced #someone to #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "🤝"
	},{
		id : "didnt-want-to",
		text : [ "did something I didn't want to" ],
		type : "action",
		category : "self",
		otherCategories : "negative",
		relatedPhrases : [],
		emoji: "👎"
	},{
		id : "had-trouble",
		text : [ "did something I had a lot of trouble doing" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "😔"
	},{
		id : "did-something-i-love",
		text : [ "did something I love" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "😍"
	},{
		id : "did-something-i-regret",
		text : [ "did something I regret" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "😞"
	},{
		id : "did-something-weird",
		text : [ "did something weird", "did something unusual", "did something uncharacteristic" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "👾"
	},{
		id : "reassured",
		text : [ "reassured #someone", "comforted #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "🧸"
	},{
		id : "started-conversation",
		text : [ "struck up a conversation with #someone", "started a conversation with #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [ "met-someone" ],
		emoji: "💬"
	},{
		id : "gave-presentation",
		text : [ "gave a presentation", "gave a speech", "spoke in public", "spoke to an audience" ],
		type : "action",
		category : "social",
		otherCategories : "work",
		relatedPhrases : [ "performed" ],
		emoji: "💬"
	},{
		id : "performed",
		text : [ "performed", "performed in front of an audience" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [ "gave-presentation" ],
		emoji: "🎭"
	},{
		id : "traffic",
		text : [ "was stuck in traffic", "got stuck in traffic" ],
		type : "action",
		category : "external",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : [],
		emoji: "🚦"
	},{
		id : "waited",
		text : [ "waited for something" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "⏲️"
	},{
		id : "worried",
		text : [ "worried about #event" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "dreamed",
		text : [ "had a #adj dream" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : ["daydreamed"],
		emoji: "💤"
	},{
		id : "dreamt-about",
		text : [ "dreamt about #event", "dreamt about #someone", "dreamt about #place" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : ["dreamed"],
		emoji: "💤"
	},{
		id : "shared",
		text : [ "opened up to #someone", "shared a personal thing with #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "👐"
	},{
		id : "told-secret",
		text : [ "told #someone a secret", "told #someone a secret" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : ["heard-secret"],
		emoji: "👐"
	},{
		id : "heard-secret",
		text : [ "#someone told me a secret", "heard a secret" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : ["told-secret"],
		emoji: "👐"
	},{
		id : "gossiped",
		text : [ "gossiped", "gossiped about #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : []
	},{
		id : "saw-talk",
		text : [ "saw a talk", "saw a #adj talk", "heard a talk", "heard a #adj talk" ],
		type : "action",
		category : "social",
		otherCategories : "work",
		relatedPhrases : [],
		emoji: "🗣️"
	},{
		id : "led",
		text : [ "led a thing", "led a team", "led a group", "led a meeting" ],
		type : "action",
		category : "social",
		otherCategories : "work",
		relatedPhrases : [],
		emoji: "🙋‍♂️"
	},{
		id : "then",
		text : [ "#event then #event" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "caused",
		text : [ "#event which caused #event" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "led-to",
		text : [ "#event which led to #event" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "while",
		text : [ "#event while #event" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "which-involved",
		text : [ "#event which involved #event" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "because",
		text : [ "#event because #event", "#event because I'm #adj" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "to",
		text : [ "#event to #event" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "but",
		text : [ "#event but #event" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "by",
		text : [ "#event by #event" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "instead-of",
		text : [ "#event instead of #event" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "at",
		text : [ "#event at #place" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "near",
		text : [ "#event near #place" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "on-the-way-to",
		text : [ "#action on the way to #place" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "with",
		text : [ "#action with #someone" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "for",
		text : [ "#action for #someone" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "someone-was-adj",
		text : [ "#someone was #adj" ],
		type : "event",
		category : "social",
		otherCategories : "",
		relatedPhrases : []
	},{
		id : "was-productive",
		text : [ "was productive" ],
		type : "event",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "👍"
	},{
		id : "got-recognition",
		text : [ "people said nice things about me", 
				 "#someone said nice things about me", 
				 "felt recognized", 
				 "got recognition" ],
		type : "event",
		category : "social",
		otherCategories : "",
		sentiment: "positive",
		relatedPhrases : [],
		emoji: "🤗"
	},{
		id : "angry-with-me",
		text : [ "#someone got angry with me", "#someone got upset with me" ],
		type : "event",
		category : "social",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : [],
		emoji: "😡"
	},{
		id : "someone-did-something-cool",
		text : [ "#someone did something cool" ],
		type : "event",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "😎"
	},{
		id : "someone-bothered",
		text : [ "#someone bothered me", "#someone got on my nerves", "#someone annoyed me" ],
		type : "event",
		category : "social",
		otherCategories : "self",
		sentiment: "negative",
		relatedPhrases : [],
		emoji: "😑"
	},{
		id : "someone-was-jerk",
		text : [ "#someone was a jerk to me", "#someone was bitchy at me", "#someone yelled at me", "#someone got angry at me" ],
		type : "event",
		category : "social",
		otherCategories : "negative",
		sentiment: "negative",
		relatedPhrases : [],
		emoji: "😠"
	},{
		id : "power-outage",
		text : [ "there was a power outage" ],
		type : "event",
		category : "external",
		otherCategories : "",
		relatedPhrases : [],
		emoji: "🔌"
	},{
		id : "earthquake",
		text : [ "there was an earthquake", "the earth quaked" ],
		type : "event",
		category : "external",
		otherCategories : "event",
		relatedPhrases : ["storm"]
	},{
		id : "fire",
		text : [ "there was a fire", "#place caught on fire" ],
		type : "event",
		category : "external",
		otherCategories : "event",
		sentiment: "negative",
		relatedPhrases : ["storm"]
	},{
		id : "flood",
		text : [ "#place flooded" ],
		type : "event",
		category : "external",
		otherCategories : "event",
		sentiment: "negative",
		relatedPhrases : ["storm"]
	},{
		id : "alarm",
		text : [ "an alarm went off" ],
		type : "event",
		category : "external",
		otherCategories : "event",
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "storm",
		text : [ "it stormed", "there was a storm" ],
		type : "event",
		category : "external",
		otherCategories : "event",
		relatedPhrases : [],
		emoji: "🌩️"
	},{
		id : "accident",
		text : [ "got into an accident" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : ["flat-tire", "car troubles"]
	},{
		id : "got-ticket",
		text : [ "got a ticket", "got a parking ticket", "got a traffic ticket" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : ["accident", "flat-tire", "car troubles"]
	},{
		id : "car-troubles",
		text : [ "had car troubles" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : ["flat-tire"]
	},{
		id : "flat-tire",
		text : [ "got a flat tire" ],
		type : "action",
		category : "self",
		otherCategories : "",
		sentiment: "negative",
		relatedPhrases : ["car-troubles"]
	},{
		id : "was-introduced",
		text : [ "#someone introduced me to #someone" ],
		type : "event",
		category : "social",
		otherCategories : "",
		relatedPhrases : [ "met-someone", "introduced" ],
		emoji: "🤝"
	},{
		id : "which made me",
		text : [ "#event which made me #adj" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "as-usual",
		text : [ "#action, as usual", "as usual, #action" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "again",
		text : [ "#event again" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "little",
		text : [ "#event a little" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "lot",
		text : [ "#event a lot" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "didnt",
		text : [ "didn't #action" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "accidentally",
		text : [ "accidentally #action" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "just",
		text : [ "just #action" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "finally",
		text : [ "finally #event", "#event, finally" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "tried",
		text : [ "tried to #action", "tried to #action but didn't" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "wanted",
		text : [ "wanted to #action", "wanted to #action but didn't" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "needed",
		text : [ "needed to #action", "needed to #action but didn't" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "want",
		text : [ "want to #action" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "need",
		text : [ "need to #action" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "planned",
		text : [ "planned to #action", "planned to #action but didn't" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		supressSubject: false
	}
];