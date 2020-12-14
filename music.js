let music = [
    document.getElementById("music-1"),
    document.getElementById("music-2"),
    document.getElementById("music-3")
]
let choice = 0;
let lastChoice;

function playMusic() {
    choice = Math.floor(Math.random() * music.length)
    if (lastChoice) {
        // If we've already chosen a song before, run the newMusic() loop
        choice = newMusic()
    }
    // @ts-ignore
    music[choice].volume = 0.3
    // @ts-ignore
    music[choice].play()
    lastChoice = choice
    checkingMusic()
}

function newMusic() {
    let newChoice = Math.floor(Math.random() * music.length)
    if (newChoice == lastChoice) {
        newMusic()
    } else {
        return newChoice
    }
}

// Starts checking to see if music has ended
function checkingMusic() {
    // Adds an event listener to the selected audio track
    music[choice].ontimeupdate = function () {
        // @ts-ignore
        console.log(music[choice].currentTime)
        // @ts-ignore
        if (music[choice].ended) {
            playMusic()
        }
    }
}
