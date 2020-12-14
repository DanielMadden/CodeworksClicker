let stats = {
    knowledge: 0,
    day: 0,
    totalClicks: 0,
    bonusMax: 10,
    achievements: {},
    upgrades: [
        {
            name: "Absorption",
            image: "images/bigBrain.jpg",
            price: 50,
            owned: 0,
            type: "click",
            description: "<br/>Strengthen your ability to absorb new information<br/><br/><i>Adds +1 knowledge per click</i>",
            locked: false
        },
        {
            name: "Research",
            image: "images/research.jpg",
            price: 100,
            owned: 0,
            type: "auto",
            mod: 1,
            available: {
                5: true,
                6: true
            },
            special: {},
            description: "Your quest for knowledge compels you to do some digging on the weekends<br/><br/><i>Adds +1 knowledge per hour on weekends<br/></i>",
            locked: false
        },
        {
            name: "Fully Stacked",
            image: "images/logo.png",
            price: 200,
            owned: 0,
            max: 1,
            type: "auto",
            mod: .5,
            available: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            special: {},
            description: "Join Boise Codework's Fullstack course!<br/><br/><i>Adds +0.5 knowledge per hour on weekdays<br/> Unlocks Developers</i>",
            locked: false
        },
        {
            name: "The Recruiter",
            image: "images/brittany.jfif",
            price: 200,
            owned: 0,
            max: 1,
            type: "auto",
            subType: "staff",
            mod: 0.5,
            available: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            special: {
                4: true,
                bonus: 1.5,
            },
            description: `From the distant land of recruitment centers, Brittany has joined your cause<br/><br/><i>Adds +0.5 knowledge per hour on weekdays<br/>Adds +2 knowledge per hour on Fridays</i>`,
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
            image: "images/zach.jfif",
            price: 250,
            owned: 0,
            max: 1,
            type: "auto",
            subType: "staff",
            mod: 0.5,
            available: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            special: {
                4: true,
                bonus: 1.5,
            },
            description: `Business is his middle name.<br/><br/><i>Adds +0.5 knowledge per hour on weekdays<br/>Adds +2 knowledge per hour on Fridays</i>`,
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
            image: "images/tim.jfif",
            price: 300,
            owned: 0,
            max: 1,
            type: "auto",
            subType: "staff",
            mod: .5,
            available: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            special: {
                1: true,
                bonus: 2.5,
            },
            description: `"My landing page is the best landing page in the history of all landing pages."<br/><br/><i>Adds +0.5 knowledge per hour on weekdays<br/>Adds +3 knowledge per hour on Tuesdays</i>`,
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
            image: "images/mark.jfif",
            price: 400,
            owned: 0,
            max: 1,
            type: "auto",
            subType: "staff",
            mod: 2,
            available: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            special: {},
            description: `The dungeon master of all dungeon masters that were ever dungeon masters.<br/><br/><i>Adds +2 knowledge per hour on weekdays</i>`,
            locked: true,
            quotes: [
                "Goooood morning class!",
                "Don't mess with my marvel mask.",
                "Did someone say DND?",
                "I'm not just a dungeon master. I am a master of ALL dungeons.",
                "Aaand today's afternoon project is..."
            ]
        },
    ],
}

let upgrades = stats.upgrades