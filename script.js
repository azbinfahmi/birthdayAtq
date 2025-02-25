const ws = new WebSocket("ws://gsvault.sg:5555/test");

const message = "I wanted to make this birthday special for you. Hope this little gift brings a smile to your face! 🎶";
let index = 0;
function typeWriter() {
    if (index < message.length) {
        document.getElementById("message").innerHTML += message.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    }
}
setTimeout(typeWriter, 1000);

const secondMessage = "I hope you can move on from the past and keep moving forward. Harap kamu sentiasa ceria di hari-hari mendatang." +  
"Semoga dengan bertambahnya usia ke-26, banyak perkara baik akan hadir dalam hidup kamu.🌸";
let secondIndex = 0;
function secondTypeWriter() {
    if (secondIndex < secondMessage.length) {
        document.getElementById("secondMessage").innerHTML += secondMessage.charAt(secondIndex);
        secondIndex++;
        setTimeout(secondTypeWriter, 50);
    }
}

// Show the gift section and play video
document.getElementById("giftButton").addEventListener("click", function () {
    document.getElementById("giftSection").classList.remove("hidden");
    this.style.display = "none"; // Hide the button after clicking

    // Play the video with sound
    let video = document.getElementById("birthdayVideo");
    video.muted = false;
    video.play();

    // Start second typewriter animation when video starts playing
    video.onplay = function () {
        setTimeout(secondTypeWriter, 1000);
    };
});

// Floating Sparkle Effect on Tap
document.addEventListener("click", function (event) {
    let sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    document.body.appendChild(sparkle);
    sparkle.style.left = event.clientX + "px";
    sparkle.style.top = event.clientY + "px";

    setTimeout(() => {
        sparkle.remove();
    }, 1500);
});

// Try autoplaying video on page load (some browsers may block it)
document.addEventListener("DOMContentLoaded", function () {
    try{
        ws.onopen = () => {
            console.log("Connected to /test WebSocket");
            ws.close();
        };
        ws.onclose = () => {
            console.log("Disconnected from /test WebSocket");
        };
    }catch (error){
        console.log(error)
    }
    let video = document.getElementById("birthdayVideo");
    video.muted = true; // Autoplay requires mute first
    video.play().then(() => {
        setTimeout(() => video.muted = false, 1000); // Unmute after a delay
    }).catch(error => {
        console.log("Autoplay blocked. User must interact first.");
    });
});

