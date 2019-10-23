
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
		tags: ["mind"],
		relatedPhrases : []
	},{
		id : "late",
		text : [ "was late to something", "was late to #action", "was late to #place", "#action and was late" ],
		type : "action",
		tags: ["work", "social"],
		sentiment: "negative",
		relatedPhrases : [],
		emoji : "💨"
	},{
		id : "forgot",
		text : [ "forgot something" ],
		type : "action",
		tags: ["mind"],
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "lost",
		text : [ "lost something" ],
		type : "action",
		tags: ["mind"],
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "was-adj",
		text : [ "was #adj", "did something #adj", "felt #adj" ],
		type : "action",
		tags: ["mind"], 
		relatedPhrases : []
	},{
		id : "was-adj-to",
		text : [ "was #adj to #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : []
	},{
		id : "watched",
		text : [ "watched TV", "watched a show", "watched a movie", "watched something" ],
		type : "action",
		tags: ["recreation"],
		relatedPhrases : [],
		emoji : "📺"
	},{
		id : "went-home",
		text : [ "went home" ],
		type : "action",
		tags: ["physical"],
		relatedPhrases : [],
		emoji : "🏠"
	},{
		id : "vacationed",
		text : [ "vacationed", "went on a trip", "went on a day trip", "went on vacation", "went on a vacation to #place" ],
		type : "action",
		tags: ["recreation"],
		sentiment: "positive",
		relatedPhrases : ["left-for-trip", "returned-from-trip", "adventured"],
		emoji : "✈️"
	},{
		id : "left-for-trip",
		text : [ "left for a trip" ],
		type : "action",
		tags: ["recreation"],
		sentiment: "positive",
		relatedPhrases : ["returned-from-trip", "vacationed", "adventured"],
		emoji : "✈️"
	},{
		id : "returned-from-trip",
		text : [ "returned from a trip", "came back from a trip" ],
		type : "action",
		tags: ["recreation"],
		sentiment: "positive",
		relatedPhrases : ["left-for-trip", "vacationed", "adventured"],
		emoji : "✈️"
	},{
		id : "packed",
		text : [ "packed for a trip", "packed" ],
		type : "action",
		tags: ["recreation", "chores"],
		relatedPhrases : ["unpacked", "adventured"]
	},{
		id : "unpacked",
		text : [ "unpacked" ],
		type : "action",
		tags: ["recreation", "chores"],
		relatedPhrases : ["packed", "adventured"]
	},{
		id : "adventured",
		text : [ "went on a journey", "had an adventure" ],
		type : "action",
		tags: ["recreation"],
		sentiment: "positive",
		relatedPhrases : ["vacationed"],
		emoji : "🏝️"
	},{
		id : "ate-out",
		text : [ "went out for food", "went out to dinner", "went out for drinks" ],
		type : "action",
		tags: ["social", "recreation"],
		relatedPhrases : [],
		emoji : "🍔"
	},{
		id : "shopped",
		text : [ "went shopping", "shopped" ],
		type : "action",
		tags: ["chores", "recreation"],
		relatedPhrases : [],
		emoji : "🛍️"
	},{
		id : "work-meeting",
		text : [ "went to a meeting" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : [],
		emoji : "💼"
	},{
		id : "work",
		text : [ "went to work" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : [],
		emoji : "👔"
	},{
		id : "worked",
		text : [ "worked", "did work", "did some work", "worked on #project" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : [],
		emoji : "👔"
	},{
		id : "finished-work",
		text : [ "finished some work", "finished #project" ],
		type : "action",
		tags: ["work"],
		sentiment: "positive",
		relatedPhrases : [],
		emoji : "👍"
	},{
		id : "published",
		text : [ "published my work", "published some work", 
				 "published some writing", "published some art", "published a project" ],
		type : "action",
		tags: ["expression"],
		sentiment: "positive",
		relatedPhrases : []
	},{
		id : "shared-work",
		text : [ "shared my work", "shared my work with #someone", 
				 "shared work-in-progress" ],
		type : "action",
		tags: ["expression"],
		relatedPhrases : []
	},{
		id : "got-feedback",
		text : [ "got feedback on my work" ],
		type : "action",
		tags: ["expression"],
		relatedPhrases : ["shared-work", "published"]
	},{
		id : "worked-late",
		text : [ "worked late" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : [],
		emoji : "👔"
	},{
		id : "left-job",
		text : [ "left my job", "quit my job" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : [],
		emoji: "💼"
	},{
		id : "started-job",
		text : [ "started a new job" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : [],
		emoji: "💼"
	},{
		id : "got-job",
		text : [ "got a new job" ],
		type : "action",
		tags: ["work"],
		sentiment: "positive",
		relatedPhrases : [],
		emoji: "💼"
	},{
		id : "got-raise",
		text : [ "got a raise" ],
		type : "action",
		tags: ["work"],
		sentiment: "positive",
		relatedPhrases : [],
		emoji: "💼"
	},{
		id : "got-promotion",
		text : [ "got a promotion" ],
		type : "action",
		tags: ["work"],
		sentiment: "positive",
		relatedPhrases : [],
		emoji: "💼"
	},{
		id : "job-hunted",
		text : [ "job-hunted", "hunted for a job" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : ["interviewed", "got-job"],
		emoji: "💼"
	},{
		id : "applied-job",
		text : [ "applied for a job", "applied for a position" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : ["interviewed", "got-job"],
		emoji: "💼"
	},{
		id : "interviewed",
		text : [ "interviewed for a new job" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : ["job-hunted", "got-job"],
		emoji: "💼"
	},{
		id : "retired",
		text : [ "retired" ],
		type : "action",
		tags: ["work", "major life events"],
		relatedPhrases : [],
		emoji: "💼"
	},{
		id : "went-to-class",
		text : [ "went to a class", "went to class", "went to school" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : [],
		emoji : "📝"
	},{
		id : "went-to-party",
		text : [ "went to a party" ],
		type : "action",
		tags: ["recreation"],
		relatedPhrases : [],
		emoji : "🎉"
	},{
		id : "went-to-sport",
		text : [ "went to a sporting event" ],
		type : "action",
		tags: ["recreation"],
		relatedPhrases : ["played"],
		emoji : "🏀"
	},{
		id : "went-to-doctor",
		text : [ "went to the doctor", "went to the hospital" ],
		type : "action",
		tags: ["chores"],
		relatedPhrases : ["sick"],
		emoji : "🏥"
	},{
		id : "prayed",
		text : [ "prayed" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : ["church"]
	},{
		id : "church",
		text : [ "went to church" ],
		type : "action",
		tags: ["mind", "social"],
		relatedPhrases : ["prayed"]
	},{
		id : "avoided",
		text : [ "avoided doing something", "avoided #action", "avoided a responsibility" ],
		type : "action",
		tags: ["mind", "work"],
		relatedPhrases : ["avoided-someone"],
		emoji : "🤥"
	},{
		id : "avoided-someone",
		text : [ "avoided #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : ["avoided-something"]
	},{
		id : "chatted-with",
		text : [ "chatted with #someone" ],
		type : "action",
		tags: ["social"],
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
		tags: ["work", "social"],
		relatedPhrases : ["helped-someone", "got-help"],
		emoji : "🤝"
	},{
		id : "did-nothing",
		text : [ "did nothing", "couldn't do anything" ],
		type : "action",
		tags: ["mind"],
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
		tags: ["mind"],
		relatedPhrases : [],
		emoji : "💭"
	},{
		id : "meditated",
		text : [ "meditated" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji : "🙏"
	},{
		id : "napped",
		text : [ "took a nap", "napped" ],
		type : "action",
		tags: ["body"],
		relatedPhrases : []
	},{
		id : "cloud-watched",
		text : [ "cloud-watched" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : ["people-watched", "daydreamed"]
	},{
		id : "people-watched",
		text : [ "people-watched" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : ["cloud-watched", "daydreamed"]
	},{
		id : "chores",
		text : [ "did chores", "ran errands", "took care of personal things", "did adult things" ],
		type : "action",
		tags: ["chores"],
		relatedPhrases : ["taxes", "managed-finances"],
		emoji : "🏠"
	},{
		id : "hobby",
		text : [ "did a hobby", 
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
		tags: ["recreation", "mind"],
		relatedPhrases : ["read", "played", "made-something", "cooked", "exercised", "volunteered", "learned"],
		emoji : "🎨"
	},{
		id : "volunteered",
		text : [ "volunteered" ],
		type : "action",
		tags: ["work", "mind", "social"],
		relatedPhrases : ["helped-someone"]
	},{
		id : "played",
		text : [ "played", "played games", "played a game", "played a sport" ],
		type : "action",
		tags: ["recreation"],
		relatedPhrases : ["hobby"],
		emoji : "🎮"
	},{
		id : "got-pet",
		text : [ "got a new pet", "adopted a pet", "got a pet" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : []
	},{
		id : "helped-someone",
		text : [ "did something for #someone", "helped #someone", "did a favor for #someone" ],
		type : "action",
		tags: ["social"],
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
		tags: ["social"],
		sentiment: "positive",
		relatedPhrases : ["collaborated"],
		emoji : "👨‍🎓"
	},{
		id : "exercised",
		text : [ "exercised", "worked out" ],
		type : "action",
		tags: ["body"],
		sentiment: "positive",
		relatedPhrases : ["did-sport"],
		emoji : "💪"
	},{
		id : "did-sport",
		text : [ "played a sport", "practiced a sport" ],
		type : "action",
		tags: ["body", "recreation"],
		sentiment: "positive",
		relatedPhrases : ["exercised"]
	},{
		id : "feeling-excited",
		text : [ "feeling excited for something coming up" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji : "🤗"
	},{
		id : "sick",
		text : [ "felt sick", "had a headache", "had a stomachache", "felt nauseous", "threw up", "had a fever" ],
		type : "action",
		tags: ["body"],
		sentiment: "negative",
		relatedPhrases : ["went-to-doctor"],
		emoji : "🤢"
	},{
		id : "anxiety-attack",
		text : [ "had an anxiety attack", "had a panic attack" ],
		type : "action",
		tags: ["body"],
		sentiment: "negative",
		relatedPhrases : ["sick"]
	},{
		id : "seizure",
		text : [ "had a seizure" ],
		type : "action",
		tags: ["body"],
		sentiment: "negative",
		relatedPhrases : ["went-to-doctor"]
	},{
		id : "got-hurt",
		text : [ "got hurt", "hurt myself" ],
		type : "action",
		tags: ["body"],
		sentiment: "negative",
		relatedPhrases : [],
		emoji : "😔"
	},{
		id : "bug-bite",
		text : [ "got a bug bite", "was bit by a bug" ],
		type : "action",
		tags: ["body"],
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "interneted",
		text : [ "interneted", "puttered around on the internet", "messed around on the internet", "played on the computer" ],
		type : "action",
		tags: ["recreation"],
		relatedPhrases : [],
		emoji : "💻"
	},{
		id : "day-description",
		text : [ "had a #day-adj day" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
	},{
		id : "good-idea",
		text : [ "had a good idea" ],
		type : "action",
		tags: ["mind"],
		sentiment: "positive",
		relatedPhrases : [],
		emoji : "💡"
	},{
		id : "nice-convo",
		text : [ "had a nice conversation with #someone" ],
		type : "action",
		tags: ["social"],
		sentiment: "positive",
		relatedPhrases : [],
		emoji : "💬"
	},{
		id : "heard-from",
		text : [ "heard from #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [],
		emoji : "👂"
	},{
		id : "resolved-conflict",
		text : [ "helped resolve a fight" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [],
		emoji : "😄"
	},{
		id : "hung-out",
		text : [ "hung out" ],
		type : "action",
		tags: ["recreation", "social"],
		relatedPhrases : [],
		emoji : "🤝"
	},{
		id : "hung-out-with",
		text : [ "hung out with #someone", "spent quality time with #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [],
		emoji : "🤝"
	},{
		id : "made-plans",
		text : [ "made plans" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji : "🗓️"
	},{
		id : "made-something",
		text : [ "made something", "made a thing" ],
		type : "action",
		tags: ["expression"],
		relatedPhrases : [],
		emoji : "🎨"
	},{
		id : "wrote",
		text : [ "wrote something", "did some writing" ],
		type : "action",
		tags: ["expression"],
		relatedPhrases : ["made-something"]
	},{
		id : "messed-up",
		text : [ "messed up" ],
		type : "action",
		tags: ["mind"],
		sentiment: "negative",
		relatedPhrases : [],
		emoji : "😔"
	},{
		id : "missing-someone",
		text : [ "missed #someone", "wished #someone was here"],
		type : "action",
		tags: ["mind"],
		sentiment: "negative",
		relatedPhrases : [],
		emoji : "😔"
	},{
		id : "moved",
		text : [ "moved" ],
		type : "action",
		tags: ["major life events"],
		relatedPhrases : ["house-searched"],
		emoji : "🏠"
	},{
		id : "someone-moved",
		text : [ "#someone moved away" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : ["moved", "house-searched"],
		emoji : "🏠"
	},{
		id : "house-searched",
		text : [ "house searched", "searched for a new place to live" ],
		type : "action",
		tags: ["chores"],
		relatedPhrases : ["moved"],
		emoji : "🏠"
	},{
		id : "bought-house",
		text : [ "bought a home", "bought a house" ],
		type : "action",
		tags: ["major life events"],
		relatedPhrases : ["moved", "house-searched"],
		emoji : "🏠"
	},{
		id : "sold-house",
		text : [ "sold my house" ],
		type : "action",
		tags: ["major life events"],
		relatedPhrases : ["bought-house", "moved", "house-searched"],
		emoji : "🏠"
	},{
		id : "dated",
		text : [ "went on a date with #someone", "went out with #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : []
	},{
		id : "engaged",
		text : [ "got engaged to #someone" ],
		type : "action",
		tags: ["major life events"],
		sentiment: "positive",
		relatedPhrases : ["proposed", "married"]
	},{
		id : "proposed",
		text : [ "proposed to #someone" ],
		type : "action",
		tags: ["major life events"],
		sentiment: "positive",
		relatedPhrases : ["engaged", "married"]
	},{
		id : "married",
		text : [ "married #someone", "got married to #someone" ],
		type : "action",
		tags: ["major life events"],
		sentiment: "positive",
		relatedPhrases : ["engaged", "proposed"]
	},{
		id : "divorced",
		text : [ "got divorced" ],
		type : "action",
		tags: ["major life events"],
		relatedPhrases : []
	},{
		id : "had-baby",
		text : [ "had a baby" ],
		type : "action",
		tags: ["major life events"],
		sentiment: "positive",
		relatedPhrases : []
	},{
		id : "adopted",
		text : [ "adopted #someone" ],
		type : "action",
		tags: ["major life events"],
		sentiment: "positive",
		relatedPhrases : []
	},{
		id : "pregnant",
		text : [ "am pregnant", "found out I'm pregnant", "found out we're pregnant" ],
		type : "action",
		tags: ["major life events"],
		sentiment: "positive",
		relatedPhrases : []
	},{
		id : "died",
		text : [ "#someone died", "#someone passed away" ],
		type : "event",
		tags: ["major life events"],
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "graduated",
		text : [ "graduated", "graduated from college", "graduated from high school" ],
		type : "action",
		tags: ["major life events"],
		sentiment: "positive",
		relatedPhrases : []
	},{
		id : "body-modification",
		text : [ "got a tattoo", "got a piercing" ],
		type : "action",
		tags: ["major life events", "recreation", "body"],
		relatedPhrases : []
	},{
		id : "managed-finances",
		text : [ "managed finances" ],
		type : "action",
		tags: ["chores"],
		relatedPhrases : ["chores", "taxes"]
	},{
		id : "paid bills",
		text : [ "paid bills" ],
		type : "action",
		tags: ["chores"],
		relatedPhrases : ["managed-finances", "chores", "taxes"]
	},{
		id : "taxes",
		text : [ "did taxes" ],
		type : "action",
		tags: ["chores"],
		relatedPhrases : ["chores", "managed-finances"]
	},{
		id : "broke-something",
		text : [ "broke something" ],
		type : "action",
		sentiment: "negative",
		relatedPhrases : ["fixed-something", "accident"]
	},{
		id : "something-broke",
		text : [ "something broke" ],
		type : "event",
		sentiment: "negative",
		relatedPhrases : ["broke-something", "accident"]
	},{
		id : "fixed-something",
		text : [ "fixed something" ],
		type : "action",
		sentiment: "positive",
		relatedPhrases : ["broke-something"]
	},{
		id : "went-somewhere",
		text : [ "went somewhere" ],
		type : "action",
		relatedPhrases : [],
		emoji : "🚘"
	},{
		id : "ran-into",
		text : [ "ran into #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [],
		emoji : "💨"
	},{
		id : "turning-point",
		text : [ "reached a turning point in something" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji : "🔄"
	},{
		id : "reached-out-to",
		text : [ "reached out to #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [],
		emoji : "🤝"
	},{
		id : "read",
		text : [ "read a book", "read something", "read something #adj" ],
		type : "action",
		tags: ["mind", "recreation"],
		relatedPhrases : [ "finished book" ],
		emoji : "📖"
	},{
		id : "finished-book",
		text : [ "finished a book", "finished a book I was reading" ],
		type : "action",
		tags: ["mind", "recreation"],
		relatedPhrases : [ "read" ],
		emoji : "📖"
	},{
		id : "realized-something",
		text : [ "realized something" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji : "💡"
	},{
		id : "saw-something",
		text : [ "saw something", "encountered something" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji : "👀"
	},{
		id : "saw-something-adj",
		text : [ "saw something #adj" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji : "👀"
	},{
		id : "saw-art",
		text : [ "looked at art", "saw art", "experienced art" ],
		type : "action",
		tags: ["mind", "recreation"],
		relatedPhrases : [],
		emoji : "🖼"
	},{
		id : "learned",
		text : [ "learned something new", "set out to learn something new" ],
		type : "action",
		tags: ["mind"],
		sentiment: "positive",
		relatedPhrases : [],
		emoji : "📚"
	},{
		id : "slept-in",
		text : [ "slept in" ],
		type : "action",
		tags: ["body"],
		relatedPhrases : ["up-late"],
		emoji : "🛌"
	},{
		id : "up-late",
		text : [ "stayed up late" ],
		type : "action",
		tags: ["body"],
		relatedPhrases : ["bed-early", "slept-in"]
	},{
		id : "bed-early",
		text : [ "went to bed early" ],
		type : "action",
		tags: ["body"],
		relatedPhrases : ["up-late", "slept-in"]
	},{
		id : "couldnt-sleep",
		text : [ "couldn't sleep" ],
		type : "action",
		tags: ["body"],
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "did-something-cool",
		text : [ "did something cool" ],
		type : "action",
		tags: ["mind"],
		sentiment: "positive",
		relatedPhrases : [],
		emoji : "🤗"
	},{
		id : "fight",
		text : [ "#someone and #someone fought", "#someone and #someone got into a fight" ],
		type : "event",
		tags: ["social"],
		sentiment: "negative",
		relatedPhrases : [],
		emoji : "👊"
	},{
		id : "disagreement",
		text : [ "got into a disagreement",
			 	 "got into a disagreement with #someone",
			 	 "got into an argument",
			 	 "got into an argument with #someone"
			 	],
		type : "action",
		tags: ["social"],
		sentiment: "negative",
		relatedPhrases : [],
		emoji : "👊"
	},{
		id : "misunderstood",
		text : [ "misunderstood #someone" ],
		type : "action",
		tags: ["social"],
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "misunderstood-me",
		text : [ "#someone misunderstood me" ],
		type : "event",
		tags: ["social"],
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "studied",
		text : [ "studied", "studied for a thing coming up", "studied for a test coming up" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : [ "work" ],
		emoji : "📚"
	},{
		id : "reminisced",
		text : [ "reminisced", "thought of an old memory", "thought of old times", "looked through old photos" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji:"📆"
	},{
		id : "took-walk",
		text : [ "took a walk", "took a walk to nowhere in particular", "took a drive" ],
		type : "action",
		tags: ["body"],
		relatedPhrases : [],
		emoji: "👟"
	},{
		id : "cared-for",
		text : [ "took care of #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [],
		emoji: "💗"
	},{
		id : "took-someone",
		text : [ "took #someone to #place" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : ["cared-for"]
	},{
		id : "self-care",
		text : [ "took care of myself", "did self-care" ],
		type : "action",
		tags: ["body"],
		sentiment: "positive",
		relatedPhrases : [ "cared-for" ],
		emoji : "😃"
	},{
		id : "dressed-up",
		text : [ "got dressed up" ],
		type : "action",
		tags: ["body"],
		sentiment: "positive"
	},{
		id : "relaxed",
		text : [ "relaxed" ],
		type : "action",
		tags: ["body", "mind"],
		sentiment: "positive"
	},{
		id : "got-massage",
		text : [ "got a massage" ],
		type : "action",
		tags: ["body"],
		sentiment: "positive"
	},{
		id : "haircut",
		text : [ "got a haircut", "got my hair cut", "cut my hair" ],
		type : "action",
		tags: ["body"]
	},{
		id : "treated-self",
		text : [ "treated myself", "indulged in something nice" ],
		type : "action",
		tags: ["recreation", "body"],
		sentiment: "positive",
		relatedPhrases : [ "guilty-pleasure", "slept-in", "self-care" ],
		emoji: "😃"
	},{
		id : "guilty-pleasure",
		text : [ "indulged in a guilty pleasure" ],
		type : "action",
		tags: ["recreation"],
		relatedPhrases : [ "treated-self" ],
		emoji:"😀"
	},{
		id : "cooked",
		text : [ "cooked", "baked", "cooked something yummy" ],
		type : "action",
		tags: ["chores", "recreation"],
		relatedPhrases : [],
		emoji: "👨‍🍳"
	},{
		id : "cleaned",
		text : [ "cleaned", "tidied", "decluttered" ],
		type : "action",
		tags: ["chores"],
		relatedPhrases : []
	},{
		id : "people-visited",
		text : [ "had #someone over" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [ "visited-people" ],
		emoji : "🤝"
	},{
		id : "visited-people",
		text : [ "visited friends", "visited relatives" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [ "people-visited" ],
		emoji : "🤝"
	},{
		id : "met-someone",
		text : [ "met someone new", "met #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [],
		emoji : "🤝"
	},{
		id : "introduced",
		text : [ "introduced #someone to #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [],
		emoji: "🤝"
	},{
		id : "didnt-want-to",
		text : [ "did something I didn't want to" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji: "👎"
	},{
		id : "had-trouble",
		text : [ "did something I had a lot of trouble doing" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji: "😔"
	},{
		id : "did-something-i-love",
		text : [ "did something I love" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji: "😍"
	},{
		id : "did-something-i-regret",
		text : [ "did something I regret" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji: "😞"
	},{
		id : "did-something-weird",
		text : [ "did something weird", "did something unusual", "did something uncharacteristic" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji: "👾"
	},{
		id : "reassured",
		text : [ "reassured #someone", "comforted #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [],
		emoji: "🧸"
	},{
		id : "started-conversation",
		text : [ "struck up a conversation with #someone", "started a conversation with #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [ "met-someone" ],
		emoji: "💬"
	},{
		id : "gave-presentation",
		text : [ "gave a presentation", "gave a speech", "spoke in public", "spoke to an audience" ],
		type : "action",
		tags: ["work"],
		relatedPhrases : [ "performed" ],
		emoji: "💬"
	},{
		id : "performed",
		text : [ "performed", "performed in front of an audience" ],
		type : "action",
		tags: ["expression"],
		relatedPhrases : [ "gave-presentation" ],
		emoji: "🎭"
	},{
		id : "traffic",
		text : [ "was stuck in traffic", "got stuck in traffic" ],
		type : "action",
		tags: ["chores"],
		sentiment: "negative",
		relatedPhrases : [],
		emoji: "🚦"
	},{
		id : "waited",
		text : [ "waited for something" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji: "⏲️"
	},{
		id : "worried",
		text : [ "worried about #event" ],
		type : "action",
		tags: ["mind"],
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "dreamed",
		text : [ "had a #adj dream" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : ["daydreamed"],
		emoji: "💤"
	},{
		id : "dreamt-about",
		text : [ "dreamt about #event", "dreamt about #someone", "dreamt about #place" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : ["dreamed"],
		emoji: "💤"
	},{
		id : "shared",
		text : [ "opened up to #someone", "shared a personal thing with #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [],
		emoji: "👐"
	},{
		id : "told-secret",
		text : [ "told #someone a secret", "told #someone a secret" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : ["heard-secret"],
		emoji: "👐"
	},{
		id : "heard-secret",
		text : [ "#someone told me a secret", "heard a secret" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : ["told-secret"],
		emoji: "👐"
	},{
		id : "gossiped",
		text : [ "gossiped", "gossiped about #someone", "talked about #someone" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : []
	},{
		id : "saw-talk",
		text : [ "saw a talk", "saw a #adj talk", "heard a talk", "heard a #adj talk" ],
		type : "action",
		tags: ["mind"],
		relatedPhrases : [],
		emoji: "🗣️"
	},{
		id : "led",
		text : [ "led a thing", "led a team", "led a group", "led a meeting" ],
		type : "action",
		tags: ["social"],
		relatedPhrases : [],
		emoji: "🙋‍♂️"
	},{
		id : "someone-was-adj",
		text : [ "#someone was #adj" ],
		type : "event",
		tags: ["social"],
		relatedPhrases : []
	},{
		id : "was-productive",
		text : [ "was productive" ],
		type : "event",
		tags: ["work", "chores"],
		relatedPhrases : [],
		emoji: "👍"
	},{
		id : "got-recognition",
		text : [ "people said nice things about me", 
				 "#someone said nice things about me", 
				 "felt recognized", 
				 "got recognition" ],
		type : "event",
		tags: ["social"],
		sentiment: "positive",
		relatedPhrases : [],
		emoji: "🤗"
	},{
		id : "angry-with-me",
		text : [ "#someone got angry with me", "#someone got upset with me" ],
		type : "event",
		tags: ["social"],
		sentiment: "negative",
		relatedPhrases : [],
		emoji: "😡"
	},{
		id : "someone-did-something-cool",
		text : [ "#someone did something cool" ],
		type : "event",
		tags: ["social"],
		relatedPhrases : [],
		emoji: "😎"
	},{
		id : "someone-bothered",
		text : [ "#someone bothered me", "#someone got on my nerves", "#someone annoyed me" ],
		type : "event",
		tags: ["social"],
		sentiment: "negative",
		relatedPhrases : [],
		emoji: "😑"
	},{
		id : "someone-was-jerk",
		text : [ "#someone was a jerk to me", "#someone was bitchy at me", "#someone yelled at me", "#someone got angry at me" ],
		type : "event",
		tags: ["social"],
		sentiment: "negative",
		relatedPhrases : [],
		emoji: "😠"
	},{
		id : "power-outage",
		text : [ "there was a power outage" ],
		type : "event",
		tags: ["external"],
		relatedPhrases : [],
		emoji: "🔌"
	},{
		id : "earthquake",
		text : [ "there was an earthquake", "the earth quaked" ],
		type : "event",
		tags: ["external"],
		relatedPhrases : ["storm"]
	},{
		id : "fire",
		text : [ "there was a fire", "#place caught on fire" ],
		type : "event",
		tags: ["external"],
		sentiment: "negative",
		relatedPhrases : ["storm"]
	},{
		id : "flood",
		text : [ "#place flooded" ],
		type : "event",
		tags: ["external"],
		sentiment: "negative",
		relatedPhrases : ["storm"]
	},{
		id : "alarm",
		text : [ "an alarm went off" ],
		type : "event",
		tags: ["external"],
		sentiment: "negative",
		relatedPhrases : []
	},{
		id : "storm",
		text : [ "it stormed", "there was a storm" ],
		type : "event",
		tags: ["external"],
		relatedPhrases : [],
		emoji: "🌩️"
	},{
		id : "accident",
		text : [ "got into an accident" ],
		type : "action",
		tags: ["body"],
		sentiment: "negative",
		relatedPhrases : ["flat-tire", "car troubles"]
	},{
		id : "got-ticket",
		text : [ "got a ticket", "got a parking ticket", "got a traffic ticket" ],
		type : "action",
		tags: ["body"],
		sentiment: "negative",
		relatedPhrases : ["accident", "flat-tire", "car troubles"]
	},{
		id : "car-troubles",
		text : [ "had car troubles" ],
		type : "action",
		tags: ["body"],
		sentiment: "negative",
		relatedPhrases : ["flat-tire"]
	},{
		id : "flat-tire",
		text : [ "got a flat tire" ],
		type : "action",
		tags: ["body"],
		sentiment: "negative",
		relatedPhrases : ["car-troubles"]
	},{
		id : "was-introduced",
		text : [ "#someone introduced me to #someone" ],
		type : "event",
		tags: ["social"],
		relatedPhrases : [ "met-someone", "introduced" ],
		emoji: "🤝"
	},{
		id : "which made me",
		text : [ "#event which made me #adj" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "as-usual",
		text : [ "#action, as usual", "as usual, #action" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "again",
		text : [ "#event again" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "little",
		text : [ "#event a little" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "lot",
		text : [ "#event a lot" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "didnt",
		text : [ "didn't #action" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "accidentally",
		text : [ "accidentally #action" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "just",
		text : [ "just #action" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "finally",
		text : [ "finally #event", "#event, finally" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "tried",
		text : [ "tried to #action", "tried to #action but didn't" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "want",
		text : [ "want to #action", "wanted to #action", "wanted to #action but didn't" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "need",
		text : [ "need to #action", "needed to #action", "needed to #action but didn't" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "planned",
		text : [ "planned to #action", "planned to #action but didn't" ],
		type : "modifier",
		relatedPhrases : [],
		supressSubject: false
	},{
		id : "started",
		text : [ "started #action", "started to #action" ],
		type : "modifier",
		relatedPhrases : ["finished"],
		supressSubject: false
	},{
		id : "finished",
		text : [ "finished #action" ],
		type : "modifier",
		relatedPhrases : ["started"],
		supressSubject: false
	},{
		id : "first-time",
		text : [ "#action for the first time" ],
		type : "modifier",
		relatedPhrases : ["last-time"],
		supressSubject: true
	},{
		id : "last-time",
		text : [ "#action for the last time" ],
		type : "modifier",
		relatedPhrases : ["first-time"],
		supressSubject: true
	},{
		id : "then",
		text : [ "#event then #event" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "caused",
		text : [ "#event which caused #event" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "led-to",
		text : [ "#event which led to #event" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "while",
		text : [ "#event while #event" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "which-involved",
		text : [ "#event which involved #event" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "because",
		text : [ "#event because #event", "#event because I'm #adj" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "to",
		text : [ "#event in order to #event", "#event to #event" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "but",
		text : [ "#event but #event" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "by",
		text : [ "#event by #event" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "instead-of",
		text : [ "#event instead of #event" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "at",
		text : [ "#event at #place" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "near",
		text : [ "#event near #place" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "on-the-way-to",
		text : [ "#action on the way to #place" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "with",
		text : [ "#action with #someone" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	},{
		id : "for",
		text : [ "#action for #someone" ],
		type : "connector",
		relatedPhrases : [],
		supressSubject: true
	}
];