let music = [
    document.getElementById("music-1"),
    document.getElementById("music-2"),
    document.getElementById("music-3")
]
let lastChoice;

function playMusic() {
    // debugger
    let choice = Math.floor(Math.random() * music.length)
    if (lastChoice) {
        music.push(lastChoice[0])
    }
    // if (lastChoice) {
    //     // If we've already chosen a song before, run the newMusic() loop
    //     choice = newMusic()
    // }
    // @ts-ignore
    music[choice].volume = 0.3
    // @ts-ignore
    music[choice].currentTime = 0;
    // @ts-ignore
    music[choice].play()
    checkingMusic(choice)
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
function checkingMusic(choice) {
    // music[choice].currentTime = 250;
    // Adds an event listener to the selected audio track
    music[choice].ontimeupdate = function () {
        // @ts-ignore
        if (music[choice].ended) {
            lastChoice = music.splice(choice, 1);
            console.log(music.length)
            playMusic()
        }
    }
}
