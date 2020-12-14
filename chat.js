let template = ""
let maxChatLines = 15
let randomChatTime = 10000;
let quotes = {
    brainQuotes: [
        "STONKS",
        "I AM SMURT",
        "That tickles!",
        "Interesting...",
        "Such brain, much wow!",
    ],
    randomQuotes: [
        "Thoughts. All I have are thoughts.",
        "This game is so extra.",
        "I heard codeworks could help me become a developer...",
        "If only there was a course I could take to help me learn faster..."
    ],
    codeworksQuotes: [
        "You can't wait to learn something new today.",
        "You're a little confused on this subject. Maybe ask a TA?",
        "Everybody here is so nice!",
        "You've formed strong bonds with your comrades.",
        "You feel like you're part of the codeworks family.",
        "Be sure to follow Brittany's gameplan if you want to get hired.",
        "Scrum is one of the most efficient and adaptable planning systems to date.",
        "Zach has an intimidating voice, but I think he's a big softie.",
        "Tim's Taco Tuesday should have had ACTUAL tacos...",
        "Lost on a topic? Google it."
    ]
}
let lastQuote = ""

function addToChat(type, quote, targetObj) {
    let chatLines = document.getElementsByClassName("chat-line")

    // Increase chat-line IDs and fade
    for (let i = 0; i < chatLines.length; i++) {
        let chatID = parseInt(chatLines[i].id)
        chatLines[i].id = `${chatID + 1}-chat-line`
        let chatOpacity = parseFloat(chatLines[i].style.opacity)
        chatLines[i].style.opacity = `${chatOpacity - 0.08}`
        chatOpacity = parseFloat(chatLines[i].style.opacity)
        if (chatOpacity <= 0) {
            chatLines[i].remove()
        }
    }

    // Remove chat-line max's
    if (document.getElementById(`${maxChatLines}-chat-line`)) {
        document.getElementById(`${maxChatLines}-chat-line`).remove()
    }

    // Create new chat line and push to DOM
    let template = document.getElementById("chat").innerHTML
    template += `<span class="chat-line" id="1-chat-line" style="opacity: 1.0" ></span>`
    document.getElementById("chat").innerHTML = template

    let newChatLine = document.getElementById("1-chat-line")
    // newChatLine.style.opacity = "0.9"

    // Edit the text of new chat line
    if (type == "buy") {
        newChatLine.innerHTML = `<img class="chat-image" src="${targetObj.image}" >${targetObj.name} has been purchased.`
    } else if (type == "thought") {
        newChatLine.innerHTML = `<span class="chat-arrow" >></span>${quote}`
    } else if (type == "staff") {
        newChatLine.innerHTML = `<img class="chat-image" src="${targetObj.image}" >${quote}`
    } else if (type == "brain") {
        newChatLine.innerHTML = `<img class="chat-image" src="images/brainBlue.png" >${quote}`
    } else if (type == "welcome") {
        newChatLine.innerHTML = `<span id="chat-welcome" >${quote}</span>`
    }

}


function randomlyChat() {
    let quoteChoice = "";
    let quoteShuffle = Math.random() * 100
    let quoteType = "";
    let staffObj = {}
    if (stats.upgrades[2].owned == 0) {
        quoteShuffle = 100
    }
    if (quoteShuffle > 50) {
        if (stats.upgrades[2].owned == 1) {
            let ID = Math.floor(Math.random() * quotes.codeworksQuotes.length)
            quoteChoice = quotes.codeworksQuotes[ID]
            quoteType = "thought"
        } else {
            let ID = Math.floor(Math.random() * quotes.randomQuotes.length)
            quoteChoice = quotes.randomQuotes[ID]
            quoteType = "thought"
        }
    } else {
        let staffID = 3 + Math.floor(Math.random() * (stats.upgrades.length - 3))
        console.log(staffID)
        let ID = Math.floor(Math.random() * stats.upgrades[staffID].quotes.length)
        quoteChoice = stats.upgrades[staffID].quotes[ID]
        quoteType = "staff"
        staffObj = stats.upgrades[staffID]
    }

    checkLastRandom(quoteChoice, quoteType, staffObj)
}

function brainChat(amount) {
    let quoteChoice = ""
    let ID = Math.floor(Math.random() * quotes.brainQuotes.length)
    quoteChoice = `${quotes.brainQuotes[ID]}&nbsp&nbsp&nbsp+${amount} Bonus Knowledge`
    addToChat("brain", quoteChoice)
}

function checkLastRandom(quoteChoice, quoteType, staffObj) {
    if (quoteChoice == lastQuote) {
        randomlyChat()
    } else {
        lastQuote = quoteChoice
        addToChat(quoteType, quoteChoice, staffObj)
        playChatSound(quoteType)
        setRandomChatTime()
    }
}

function playChatSound(quoteType) {
    if (quoteType == "thought") {
        click3.play()
    } else if (quoteType == "staff") {
        click4.play()
    }
}

function setRandomChatTime() {
    randomChatTime = Math.floor(Math.random() * 10000) + 5000
    console.log("Next random chat in " + randomChatTime + "ms")
    setTimeout(randomlyChat, randomChatTime)
}

addToChat("welcome", "<h4>Your quest to become the ultimate developer has begun! Click on the brain to start obtaining knowledge!</h4>")

function removeChatWelcome() {
    document.getElementById("chat-welcome").remove()
}