/**
 * Personal Stretch Goals:
 * 
 * Looks.Upgrades:
 * DONE Fancy animation on upgrade hovers
 * DONE Unavailable upgrades are darkened
 * DONE Upgrades are scrollable
 * TODO Undiscovered upgrades are invisible
 * DONE Locked upgrades (developers) are hidden
 * 
 * Looks.Brain:
 * DONE Passive Throbbing
 * DONE Shake on hover
 * DONE Shrink on click
 * 
 * Chat:
 * I DONT KNOW WHAT I WANTED AND IT KEPT CHANGING AS I WENT BUT I AM VERY HAPPY WITH THE RESULT
 * 
 * Functionality:
 * DONE Auto-upgrades are only applied on specified days
 * DONE Special days of auto-upgrades are only applied on specific day
 * 
 */


// #region VARIABLES

let begCodeworks = findUpgradeIndex("Fully Stacked")
let endCodeworks = findUpgradeIndex("The Dungeon Master")
console.log(`Codeworks upgrades start at index ${begCodeworks} and end at ${endCodeworks}`)

let click1 = document.getElementById("click-1")
let click2 = document.getElementById("click-2")
let click3 = document.getElementById("click-3")
let click4 = document.getElementById("click-4")

// #endregion

// #region OBJECTS/ARRAYS



// #endregion OBJECTS/ARRAYS

// #region Search Functions

function findUpgrade(upgradeName) {
    return upgrades.find(i => i.name == upgradeName)
}

function findUpgradeIndex(upgradeName) {
    return upgrades.findIndex(i => i.name == upgradeName)
}
// #endregion Search Function

// #region BUY FUNCTIONS

function buyUpgrade(upgradeName) {
    let upgradeIndex = findUpgradeIndex(upgradeName)
    let upgradeObj = stats.upgrades[upgradeIndex]
    let purchase = true;
    if (upgradeObj.max) {
        if (upgradeObj.owned >= upgradeObj.max) {
            purchase = false
        }
    }
    if (upgradeObj.maxLevel) {
        if (upgradeObj.owned >= upgradeObj.maxLevel) {
            purchase = false
        }
    }
    if (stats.knowledge >= upgradeObj.price && purchase == true) {
        stats.knowledge -= upgradeObj.price
        upgradeObj.owned++
        upgradeObj.price = Math.floor(upgradeObj.price * 1.5)
        if (upgradeObj.priceMod) {
            upgradeObj.price = Math.floor(upgradeObj.price * upgradeObj.priceMod)
        }
        if (upgradeObj.name == "Stonks") {
            stats.bonusMax = 10 + upgradeObj.owned * upgradeObj.mod
            stats.bonusChance = 1 + upgradeObj.owned * upgradeObj.chanceMod
        }
        if (upgradeObj.name == "Mental Ascension") {
            if (upgradeObj.owned < upgradeObj.maxLevel) {
                stats.timeInterval = 1000 - (upgradeObj.mod * upgradeObj.owned)
                timeInterval = stats.timeInterval
            }
        }
        addToChat("buy", "", upgradeObj)
        // @ts-ignore
        click2.play()
    }
    update()
    // updateStats(upgradeObj)
    updatePrice(upgradeObj)
    updateOwned(upgradeObj)
    updateLocked(upgradeObj)
    updateMax(upgradeObj)
}

// #endregion BUY FUNCTIONS

// #region Interval Management
function addAuto() {
    let overallBonus = 0;

    for (let i = 0; i < upgrades.length; i++) {
        if (upgrades[i].available)
            if (upgrades[i].type == "auto" && upgrades[i].owned && upgrades[i].available[stats.day]) {
                stats.knowledge += upgrades[i].mod * upgrades[i].owned
                overallBonus += upgrades[i].mod * upgrades[i].owned
                if (upgrades[i].special[stats.day]) {
                    stats.knowledge += upgrades[i].special.bonus
                    overallBonus += upgrades[i].special.bonus
                }
            }
    }
    updateBonus(overallBonus)
    update()
    if (!firstClick) {
        save()
    }
}


// #endregion

// #region Days



// #endregion

let firstClick = true;
let bonusPoints = 0;
function addClick() {
    stats.totalClicks++
    stats.knowledge += 1 + findUpgrade("Absorption").owned;
    // @ts-ignore
    // click1.play()

    if (firstClick) {
        firstClick = false
        document.getElementById("chat-welcome").classList.add("chat-welcome-hide")
        setTimeout(removeChatWelcome, 3000)
        setTimeout(randomlyChat, 3000)
        setTimeout(updateTime, timeInterval)
        playMusic()
        if (stats.firstTime) {
            stats.firstTime = false
            save()
        }
    }

    if (Math.random() * 100 <= stats.bonusChance) {
        // console.log(stats.bonusChance)
        let bonus = findUpgrade("Absorption").owned + 1 + Math.floor(Math.random() * (stats.bonusMax))
        stats.knowledge += bonus
        bonusPoints = bonus
        // console.log(bonusPoints)
        // brainChat(bonus)
        // @ts-ignore
        click1.play()
    }

    if (shrinkingBrain == false) {
        shrinkBrain()
    }

    update()
}

// #region Screen Updates

let shrinkingBrain = false;
function shrinkBrain() {
    document.getElementById("main-brain").classList.add("shrink")
    setTimeout(unShrinkBrain, 50)
}

function unShrinkBrain() {
    document.getElementById("main-brain").classList.remove("shrink")
    shrinkingBrain = false
}

// Update Score
function update() {
    document.getElementById("main-knowledge").innerText = Math.floor(stats.knowledge).toString()

    updateAvailability()
}


let pointFloaters = 0
function generatePoints(X, Y, type, setAmount) {
    let x = X + 0;
    let y = Y - 40;
    let amount;
    if (type == "click") {
        amount = 1 + findUpgrade("Absorption").owned
    } else if (type == "auto") {
        amount = setAmount
    }

    let newPoint = document.createElement("h3")
    newPoint.classList.add("point-floaters")
    newPoint.id = `point-floater-${pointFloaters}`
    newPoint.innerHTML = `+ ${amount}`
    pointFloaters++
    document.body.appendChild(newPoint)
    // console.log(newPoint.id)
    $(`#${newPoint.id}`).css({
        left: x,
        top: y,
        opacity: 1
    });

    if (bonusPoints) {
        let bonusPoint = document.createElement("h1")
        bonusPoint.classList.add("point-floaters")
        bonusPoint.classList.add("point-floaters-bonus")
        bonusPoint.classList.add("bg-trans")
        bonusPoint.id = `point-floater-${pointFloaters}`
        bonusPoint.innerHTML = `+ ${bonusPoints}`
        pointFloaters++
        bonusPoints = 0
        document.body.appendChild(bonusPoint)
        $(`#${bonusPoint.id}`).css({
            left: x,
            top: y,
            opacity: 2,
            "z-index": 4
        });
    }

    // console.log($(`#pointer-floater-0`).css("left"))
}

function updateFloaters() {
    let floaters = document.getElementsByClassName("point-floaters")
    for (let i = 0; i < floaters.length; i++) {
        let floater = floaters[i]
        let floaterStyle = floaters[i].style
        let x = parseInt(floaterStyle.left)
        floaterStyle.left = `${x - (Math.random() > 0.4 ? (Math.random() * -30) : (Math.random() * 30))}px`

        let y = parseInt(floaterStyle.top)
        floaterStyle.top = `${floaters[i].classList.contains("point-floaters-bonus") ? y - 15 : y - 30}px`

        let opacity = floaterStyle.opacity
        floaterStyle.opacity = opacity - 0.1
        if (floaterStyle.opacity <= 0) {
            floaters[i].remove()
        }
    }
}

setInterval(updateFloaters, 100)

// Update Upgrade Availability
function updateAvailability() {
    // Update ""available" purchases
    for (let i = 0; i < upgrades.length; i++) {

        if (stats.knowledge >= upgrades[i].price) {
            document.getElementById(`${upgrades[i].name}-row`).classList.remove("unavailable")

            // Grab the "overlay" elements
            let elements = document.getElementsByClassName(`${upgrades[i].name}-overlay`)
            for (let j = 0; j < elements.length; j++) {
                elements[j].classList.remove("vis-dark")
                elements[j].classList.add("vis")
            }

            if (!upgrades[i].discovered) {
                upgrades[i].discovered = true
                document.getElementById(`${upgrades[i].name}-name`).innerText = `${upgrades[i].name}`
                document.getElementById(`${upgrades[i].name}-description`).innerHTML = `${upgrades[i].description}`
            }
        } else {
            document.getElementById(`${upgrades[i].name}-row`).classList.remove("unavailable")
            document.getElementById(`${upgrades[i].name}-row`).classList.add("unavailable")
            // Grab the "overlay" elements
            let elements = document.getElementsByClassName(`${upgrades[i].name}-overlay`)
            for (let j = 0; j < elements.length; j++) {
                elements[j].classList.remove("vis")
                elements[j].classList.add("vis-dark")
            }
        }

    }
}

// So... apparently I haven't been pushing my upgradeObj to the stats THIS ENTIRE TIME
// Update Upgrades
function updateStats(upgradeObj) {
    let index = findUpgradeIndex(upgradeObj.name)
    console.log(index)
    stats.upgrades[index] = upgradeObj
}

// Update Price
function updatePrice(upgradeObj) {
    document.getElementById(`${upgradeObj.name}-cost`).innerText = `${upgradeObj.price}`
}

// Update Owned
function updateOwned(upgradeObj) {
    if (upgradeObj.owned) {
        document.getElementById(`${upgradeObj.name}-owned`).innerText = `Level ${upgradeObj.maxLevel ? upgradeObj.owned >= upgradeObj.maxLevel ? "Max" : upgradeObj.owned : upgradeObj.owned}`
    }
}

function updateMax(upgradeObj) {
    if (upgradeObj.owned == upgradeObj.max) {
        document.getElementById(`${upgradeObj.name}-row`).classList.add("maxed-out");
        document.getElementById(`${upgradeObj.name}-owned`).innerText = ``
    }
    if (upgradeObj.owned >= upgradeObj.maxLevel) {
        document.getElementById(`${upgradeObj.name}-row`).classList.add("maxed-level-out");
    }
}

function updateLocked(upgradeObj) {
    if (upgradeObj.name == "Fully Stacked" && upgradeObj.owned) {
        for (let i = 0; i < upgrades.length; i++) {
            if (upgrades[i].subType) {
                if (upgrades[i].subType == "staff" || upgrades[i].subType == "codeworks") {
                    stats.upgrades[i].locked = false
                    document.getElementById(`${upgrades[i].name}-row`).classList.remove("locked");
                }
            }
        }
    }
}

function updateBonus(bonus) {
    document.getElementById("day-progress").innerText = `+ ${bonus}`
    let progBar = document.getElementById("day-progress").getBoundingClientRect()
    if (bonus) {
        generatePoints((progBar.x + progBar.width), progBar.y, "auto", bonus)
    }
}

// Draw Day
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
function updateDay() {
    let day = stats.day
    // console.log(day)
    document.getElementById("day-title").innerHTML = `<h1>${days[day].toUpperCase()}</h1>`
}

// Draw Time
const maxTime = 12
let timeInterval = stats.timeInterval
function updateTime() {
    stats.time--
    document.getElementById("day-progress").style.width = `${100 / maxTime * stats.time}%`

    if (stats.time == 0) {
        stats.time = maxTime
        document.getElementById("day-progress").style.width = `100%`

        // Set Day
        let day = stats.day
        if (day >= 6) {
            stats.day = 0
        } else {
            stats.day++
        }
        updateDay()
    }

    addAuto()
    refreshTimeInterval()
}

function refreshTimeInterval() {
    setTimeout(updateTime, timeInterval)
}

// Draw Upgrades
function drawUpgrades() {
    let template = `
   `

    for (let i = 0; i < upgrades.length; i++) {
        template += `
        <div id="${upgrades[i].name}-row" class="row upgrade-card mb-5 unavailable bg-trans ${upgrades[i].locked ? "locked" : ""} ${upgrades[i].owned == upgrades[i].max ? "d-none" : ""} ${upgrades[i].discovered ? "" : "undiscovered"} ${upgrades[i].owned >= upgrades[i].maxLevel ? "maxed-level-out" : ""}" onclick="buyUpgrade('${upgrades[i].name}')" >
            <div class="upgrade-image-div" >
                <div class="upgrade-overlay ${upgrades[i].name}-overlay" ></div>
                <img class="upgrade-image" src="${upgrades[i].image}" alt="">
            </div>
            <div class="col ml-3 p-0">
                <h4 class="upgrade-owned" id="${upgrades[i].name}-owned" >${upgrades[i].owned ? "Level " + (upgrades[i].owned >= upgrades[i].maxLevel ? "Max" : upgrades[i].owned) : ""}</h4>
                <h2 id="${upgrades[i].name}-name" >${upgrades[i].discovered ? upgrades[i].name : "???"}</h2>
                    <div class="pos-relative upgrade-brain-box d-inline-block" >
                        <div class="upgrade-overlay ${upgrades[i].name}-overlay" ></div><img class="upgrade-brain" src="images/brainBlue.png">
                    </div>
                    <span>
                        <span id="${upgrades[i].name}-cost" class="upgrade-cost">${upgrades[i].price}</span>
                    </span><br/>
                    <span class="upgrade-description" id="${upgrades[i].name}-description" >${upgrades[i].discovered ? upgrades[i].description : "<br/><br/>???"}</span>
            </div>
        </div>`
    }
    // template += `<div id="upgrade-list-space" class="row" >Hello</div><br/>Hi<br/>Hi<br/>Hi`
    document.getElementById("upgrade-list").innerHTML = template
}

// #endregion Screen Updates

// #region Fix Columns
function fixColumns() {
    // let wH = window.innerHeight
    let wH = document.documentElement.clientHeight

    let queryCSS = document.querySelector(':root')
    queryCSS.style.setProperty('--window-height', `${wH}px`);
    // console.log(queryCSS.style.getPropertyValue('--window-height'))

    // let elements = document.getElementsByClassName("no-stretch")
    // for (let i = 0; i < elements.length; i++) {
    // }
}
// #endregion

document.getElementById("day-progress").style.width = `${100 / maxTime * stats.time}%`
drawUpgrades()
update()
updateDay()
// addAuto()
fixColumns()