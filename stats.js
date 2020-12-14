let stats = {
    firstTime: true,
    knowledge: 0,
    day: 0,
    time: 12,
    timeInterval: 1000,
    totalClicks: 0,
    bonusMax: 10,
    bonusChance: 1,
    achievements: {},
    upgrades: [
        {
            name: "Absorption",
            discovered: false,
            image: "images/bigBrain.jpg",
            price: 25,
            priceMod: 1.2,
            owned: 0,
            type: "click",
            description: "Strengthen your ability to absorb new information<br/><br/><i>Adds +1 neurons per click<br/>Adds +1 minimum bonus neurons</i>",
            locked: false
        },
        {
            name: "Stonks",
            discovered: false,
            image: "images/stonksBetter.jpg",
            price: 50,
            // priceMod: 1.2,
            chanceMod: 1,
            mod: 5,
            owned: 0,
            type: "stonks",
            description: "Strengthen your analytical abilities<br/><br/><i>Adds +1% chance to gain bonus neurons<br/>Adds +5 to maximum bonus neurons</i>",
            locked: false
        },
        {
            name: "Research",
            discovered: false,
            image: "images/research.jpg",
            price: 100,
            owned: 0,
            type: "auto",
            mod: 5,
            available: {
                5: true,
                6: true
            },
            special: {},
            description: "Your quest for knowledge compels you to do some digging on the weekends<br/><br/><i>Adds +5 neurons per hour on weekends<br/></i>",
            locked: false
        },
        {
            name: "Fully Stacked",
            discovered: false,
            image: "images/logo.png",
            price: 200,
            owned: 0,
            max: 1,
            type: "auto",
            mod: 1,
            available: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            special: {},
            description: "Join Boise Codework's Fullstack course!<br/><br/><i>Adds +1 neurons per hour on weekdays<br/> Unlocks Developers</i>",
            locked: false
        },
        {
            name: "The Recruiter",
            discovered: false,
            image: "images/brittany.jfif",
            price: 250,
            owned: 0,
            max: 1,
            type: "auto",
            subType: "staff",
            mod: 3,
            available: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            special: {
                4: true,
                bonus: 3,
            },
            description: `From the distant land of recruitment centers, Brittany has joined your cause<br/><br/><i>Adds +3 neurons per hour on weekdays<br/>Adds +6 neurons per hour on Fridays</i>`,
            locked: true,
            quotes: [
                "If you truly want a job, you'll put in the work for it!",
                "Follow the plan and we'll succeed!",
                "You have no landing page and you haven't been hired? Hmm... I wonder why...",
                "I'm here to help you with career placement!",
                "Codeworks Momma. That's me!"
            ]
        },
        {
            name: "The Scrumlord",
            discovered: false,
            image: "images/zach.jfif",
            price: 300,
            owned: 0,
            max: 1,
            type: "auto",
            subType: "staff",
            mod: 3,
            available: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            special: {
                4: true,
                bonus: 3,
            },
            description: `Business is his middle name.<br/><br/><i>Adds +3 neurons per hour on weekdays<br/>Adds +6 neurons per hour on Fridays</i>`,
            locked: true,
            quotes: [
                "Scrum scrum scrummity scrum scrum",
                "Call me the Scrum Lord.",
                "Big voice with a big heart. That's my motto.",
                "Business is my middle name."
            ]
        },
        {
            name: "The Rock Climber",
            discovered: false,
            image: "images/tim.jfif",
            price: 400,
            owned: 0,
            max: 1,
            type: "auto",
            subType: "staff",
            mod: 5,
            available: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            special: {
                1: true,
                bonus: 5,
            },
            description: `"My landing page is the best landing page in the history of all landing pages."<br/><br/><i>Adds +5 neurons per hour on weekdays<br/>Adds +10 neurons per hour on Tuesdays (cuz Tacos)</i>`,
            locked: true,
            quotes: [
                "We should go rock climbing some time!",
                "Bro, I want to like, grow my hair out to my feet. What do you think?",
                "My landing page is the best landing page in the history of all landing pages.",
                "I'm just a super cool dude.",
                "Me? Vibing."
            ]
        },
        {
            name: "The Dungeon Master",
            discovered: false,
            image: "images/mark.jfif",
            price: 500,
            owned: 0,
            max: 1,
            type: "auto",
            subType: "staff",
            mod: 10,
            available: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            special: {},
            description: `The dungeon master of all dungeon masters that were ever dungeon masters.<br/><br/><i>Adds +10 neurons per hour on weekdays</i>`,
            locked: true,
            quotes: [
                "Goooood morning class!",
                "Don't mess with my marvel mask.",
                "Did someone say DND?",
                "I'm not just a dungeon master. I am a master of ALL dungeons.",
                "Aaand today's afternoon project is..."
            ]
        },
        {
            name: "Focus",
            discovered: false,
            image: "images/focus.jpg",
            price: 500,
            owned: 0,
            type: "auto",
            subType: "codeworks",
            mod: 5,
            available: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            special: {},
            description: "<br/>Strengthen your focus during class<br/><br/><i>Adds +5 neurons per hour on weekdays<br/></i>",
            locked: true
        },
        {
            name: "Mental Ascension",
            discovered: false,
            image: "images/clockMind.jpg",
            price: 1000,
            // priceMod: 1.01,
            mod: 100,
            owned: 0,
            maxLevel: 10,
            type: "timeSpeed",
            description: "As your conscience reaches a new place of existence, the speed of your thoughts begin to surpass that of light. To you, time is merely an illusion...<br/><br/><i>Time is sped up by +10%</i>",
            locked: false,
        },
    ],
}

let upgrades = stats.upgrades

function save() {
    localStorage.setItem('stats', JSON.stringify(stats))
}

function load() {
    stats = JSON.parse(localStorage.getItem('stats'))
}

if (localStorage.getItem('stats')) {
    load()
    upgrades = stats.upgrades
}