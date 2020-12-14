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

// #endregion Search Function

// #region BUY FUNCTIONS

function buyUpgrade(upgrade) {
    let upgradeObj = findUpgrade(upgrade)
    let purchase = true;
    if (upgradeObj.max) {
        if (upgradeObj.owned >= upgradeObj.max) {
            purchase = false
        }
    }
    if (stats.knowledge >= upgradeObj.price && purchase == true) {
        stats.knowledge -= upgradeObj.price
        upgradeObj.owned++
        upgradeObj.price = Math.floor(upgradeObj.price * 1.5)
        addToChat("buy", "", upgradeObj)
        // @ts-ignore
        click2.play()
    }
    update()
    updatePrice(upgradeObj)
    updateOwned(upgradeObj)
    updateLocked(upgradeObj)
    updateMax(upgradeObj)
}

// #endregion BUY FUNCTIONS

// #region Interval Management
let autoIntervalTime = 1000
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
}

function refreshAutoInterval() {
    setTimeout(addAuto, autoIntervalTime)
}


// #endregion

// #region Days



// #endregion

let firstClick = true;
function addClick() {
    stats.totalClicks++
    stats.knowledge += 1 + findUpgrade("Absorption").owned;
    // @ts-ignore
    // click1.play()

    if (firstClick == true) {
        firstClick = false
        document.getElementById("chat-welcome").classList.add("chat-welcome-hide")
        setTimeout(removeChatWelcome, 3000)
        setTimeout(randomlyChat, 3000)
        setInterval(updateTime, 1000)

        playMusic()
    }

    if (Math.random() * 100 <= 1) {
        let bonus = 1 + Math.floor(Math.random() * (stats.bonusMax))
        stats.knowledge += bonus
        brainChat(bonus)
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

/* Stretch Goal: Point Floaters
let pointFloaters = 0
function mousePoints(event) {

    let newPoint = document.createElement("span")
    newPoint.classList.add("point-floaters")
    newPoint.id = `point-floater-${pointFloaters}`
    newPoint.innerHTML = `+ ${1 + findUpgrade("Absorption").owned}`
    document.body.appendChild(newPoint)


    let x = event.clientX + 20;
    let y = event.clientY - 5;
    $(".point-floaters").css({
        left: x,
        top: y,
        opacity: 1
    });
    let coords = "X coords: " + x + ", Y coords: " + y;

    console.log($(`#pointer-floater-0`).css("left"))

    pointFloaters++
}
*/
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

// Update Price
function updatePrice(upgradeObj) {
    document.getElementById(`${upgradeObj.name}-cost`).innerText = `${upgradeObj.price}`
}

// Update Owned
function updateOwned(upgradeObj) {
    if (upgradeObj.owned) {
        document.getElementById(`${upgradeObj.name}-owned`).innerText = `Level ${upgradeObj.owned}`
    }
}

function updateMax(upgradeObj) {
    if (upgradeObj.owned == upgradeObj.max) {
        document.getElementById(`${upgradeObj.name}-row`).classList.add("maxed-out");
        document.getElementById(`${upgradeObj.name}-owned`).innerText = ``
    }
}

function updateLocked(upgradeObj) {
    if (upgradeObj.name == "Fully Stacked" && upgradeObj.owned) {
        for (let i = 0; i < upgrades.length; i++) {
            if (upgrades[i].subType) {
                if (upgrades[i].subType == "staff") {
                    document.getElementById(`${upgrades[i].name}-row`).classList.remove("locked");
                }
            }
        }
    }
}

function updateBonus(bonus) {
    document.getElementById("day-progress").innerText = `+ ${bonus}`
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
let time = maxTime
function updateTime() {
    time--
    document.getElementById("day-progress").style.width = `${100 / maxTime * time}%`

    if (time == 0) {
        time = maxTime
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
}

// Draw Upgrades
function drawUpgrades() {
    let template = `
   `

    for (let i = 0; i < upgrades.length; i++) {
        template += `
        <div  id="${upgrades[i].name}-row" class="row upgrade-card mb-5 unavailable bg-trans ${upgrades[i].locked ? "locked" : ""}" onclick="buyUpgrade('${upgrades[i].name}')" >
            <div class="upgrade-image-div" >
                <div class="upgrade-overlay ${upgrades[i].name}-overlay" ></div>
                <img class="upgrade-image" src="${upgrades[i].image}" alt="">
            </div>
            <div class="col ml-3 p-0">
                <h4 class="upgrade-owned" id="${upgrades[i].name}-owned" >${upgrades[i].owned ? upgrades[i].owned : ""}</h4>
                <h2>${upgrades[i].name}</h2>
                    <div class="pos-relative upgrade-brain-box d-inline-block" >
                        <div class="upgrade-overlay ${upgrades[i].name}-overlay" ></div><img class="upgrade-brain" src="images/brainBlue.png">
                    </div>
                    <span>
                        <span id="${upgrades[i].name}-cost" class="upgrade-cost">${upgrades[i].price}</span>
                    </span><br/>
                    <span class="upgrade-description" >${upgrades[i].description}</span>
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

drawUpgrades()
update()
updateDay()
addAuto()
fixColumns()