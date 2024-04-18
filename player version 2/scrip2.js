

var allaud=document.querySelector("#allaud");
var audio= new Audio()
var isPlaying = false; 
//C:\Users\saad4\Desktop\practice\player\Ilahi-Teri-Chokhat-Par-Junaid-Jamshed.mp3

var arr = [
    {time: "3:17", name: "Mera-dil-badal-de--Junaid Jamshed", url: "mera-dil-badal-de.mp3", img: "https://i.tribune.com.pk/media/images/1271776-junaidjamshed-1482397732/1271776-junaidjamshed-1482397732.jpg"},
    {time: "3:15", name: "The Way of Tears", url: "the-way-of-tears.mp3", img: "https://i1.sndcdn.com/artworks-1kcqUHpQzbcbHZL6-t5ta7Q-t500x500.jpg"},
    {time: "3:16", name: "Illahi Teri Chokhat par-Junaid Jamshed", url: "Ilahi-Teri-Chokhat-Par-Junaid-Jamshed.mp3", img: "https://pakobserver.net/wp-content/uploads/2019/12/1-40.jpg"},
    {time: "3:15", name: "The Way of Tears", url: "the-way-of-tears.mp3", img: "https://i1.sndcdn.com/artworks-1kcqUHpQzbcbHZL6-t5ta7Q-t500x500.jpg"},
    {time: "3:15", name: "The Way of Tears", url: "the-way-of-tears.mp3", img: "https://i1.sndcdn.com/artworks-1kcqUHpQzbcbHZL6-t5ta7Q-t500x500.jpg"},
    {time: "3:15", name: "The Way of Tears", url: "the-way-of-tears.mp3", img: "https://i1.sndcdn.com/artworks-1kcqUHpQzbcbHZL6-t5ta7Q-t500x500.jpg"},
    {time: "3:15", name: "The Way of Tears", url: "the-way-of-tears.mp3", img: "https://i1.sndcdn.com/artworks-1kcqUHpQzbcbHZL6-t5ta7Q-t500x500.jpg"},
    {time: "3:15", name: "The Way of Tears", url: "the-way-of-tears.mp3", img: "https://i1.sndcdn.com/artworks-1kcqUHpQzbcbHZL6-t5ta7Q-t500x500.jpg"},
    {time: "3:15", name: "The Way of Tears", url: "the-way-of-tears.mp3", img: "https://i1.sndcdn.com/artworks-1kcqUHpQzbcbHZL6-t5ta7Q-t500x500.jpg"},
    {time: "3:15", name: "The Way of Tears", url: "the-way-of-tears.mp3", img: "https://i1.sndcdn.com/artworks-1kcqUHpQzbcbHZL6-t5ta7Q-t500x500.jpg"},
    {time: "3:15", name: "The Way of Tears", url: "the-way-of-tears.mp3", img: "https://i1.sndcdn.com/artworks-1kcqUHpQzbcbHZL6-t5ta7Q-t500x500.jpg"}
   
];


// function add(){
// var clutter=""
// arr.forEach(function(obj,index){
//     clutter+=`
//     <div class="audiocard" id=${index}>
//     <div class="img">
//     <img src="${obj.img}" alt="">
//     <h3 >${obj.name}</h3>
//     </div>
//     <div >${obj.time}</div>
//     </div>
//     `
//     })
//     allaud.innerHTML=clutter;
// }


allaud.addEventListener("click", function(details) {
    // Start with the target of the click event
    var target = details.target;

    // Loop through the parents until you find a `.songcard` or reach the container
    while (target && target !== this) {//target!=#allauudio
        if (target.classList.contains("audiocard")) {
            //this refers to allaudio
            var id = target.id;
            var selectedaudio = arr[id];
            
            // Set the audio source and play
            isPlaying = true;
            document.querySelector("#play-button").className="ri-pause-line";
            audio.src = selectedaudio.url;
            audio.preload = 'none';
            audio.play();
            
            document.querySelector("#left").style.background = `url(${arr[target.id].img})`;
            document.querySelector("#left").style.backgroundSize="cover";
            document.querySelector("#left").style.backgroundPosition="center";
            
            return;
        }
        // Move up the DOM tree if not found
        target = target.parentNode;
    }
});

document.querySelector("#play-button").addEventListener("click", function() {
    if(isPlaying){
        audio.pause();
        this.className = "ri-play-line";
    } else {
        if(!audio.src) {
            // Set to the first audio if none is selected
            //for when the browser is refreshed
            audio.src = arr[0].url;
            document.querySelector("#left").style.background = `url(${arr[0].img})`;
            document.querySelector("#left").style.backgroundSize = "cover";
            document.querySelector("#left").style.backgroundPosition = "center";
        }
        audio.play();
        this.className = "ri-pause-line";
    }
    isPlaying = !isPlaying;
});


// Function to play a track by its index
function playTrack(index) {
    if(index >= 0 && index < arr.length) {
        currentTrackIndex = index; // Update current track index
        var selectedTrack = arr[currentTrackIndex];
        
        audio.src = selectedTrack.url;
        audio.play();
        isPlaying = true;
        document.querySelector("#play-button").className = "ri-pause-line";
        
        document.querySelector("#left").style.background = `url(${selectedTrack.img})`;
        document.querySelector("#left").style.backgroundSize = "cover";
        document.querySelector("#left").style.backgroundPosition = "center";
    }
}




// Event listener for the next button
document.querySelector(".ri-skip-forward-mini-line").addEventListener("click", function() {
    // Calculate next track index, wrap around if at the end of the array
    var nextIndex = (currentTrackIndex + 1) % arr.length;
    playTrack(nextIndex);
});

// Event listener for the previous button
document.querySelector(".ri-skip-back-mini-line").addEventListener("click", function() {
// Calculate previous track index, wrap around if at the beginning of the array
var prevIndex = (currentTrackIndex - 1 + arr.length) % arr.length;
playTrack(prevIndex);

});

// Updated add function to include click event listener on audiocard to play the clicked track
function add(){
    var clutter = "";
    arr.forEach(function(obj, index){
        clutter += `
        <div class="audiocard" id="${index}">
            <div class="img">
                <img src="${obj.img}" alt="">
                <h3 >${obj.name}</h3>
            </div>
            <div >${obj.time}</div>
        </div>
        `;
    });
    allaud.innerHTML = clutter;

    // Added: Adding event listeners to each audiocard for playing selected track
    document.querySelectorAll('.audiocard').forEach(item => {
        item.addEventListener('click', event => {
            playTrack(parseInt(item.id));
        })
    });
}

// Adjusted the allaud click event listener to use playTrack function
allaud.addEventListener("click", function(details) {
    var target = details.target;
    while (target && target !== this) {
        if (target.classList.contains("audiocard")) {
            var id = parseInt(target.id);
            playTrack(id);
            return;
        }
        target = target.parentNode;
    }
});


// Load durations and update UI
async function loadDurationsAndUpdateUI() {
    for (let i = 0; i < arr.length; i++) {
        let audio = new Audio();
        audio.src = arr[i].url;
        try {
            await new Promise((resolve, reject) => {
                audio.addEventListener('loadedmetadata', () => {
                    arr[i].time = convertTime(audio.duration);
                    resolve();
                });
                audio.addEventListener('error', () => {
                    arr[i].time = "Unknown"; // Handle error, if any
                    resolve(); // Resolve to continue the loop even if there's an error
                });
            });
            } catch (error) {
            console.log(error);
            arr[i].time = "Error"; // In case of an unexpected error
        }
    }
    add(); // Now, call add to update the UI after all durations are loaded
}


function convertTime(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
// Correctly targeting the progress container by its ID
document.getElementById('progress-container').addEventListener('click', function(event) {
    var progressContainer = this; // 'this' now correctly refers to the progress-container
    var width = progressContainer.offsetWidth; // Width of the container
    var clickX = event.offsetX; // How far into the container the click was
    var duration = audio.duration; // Total duration of the audio

    // Calculate the new currentTime for the audio based on the click position
    audio.currentTime = (clickX / width) * duration;
});

audio.addEventListener('timeupdate', function() {
    var progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress-bar').style.width = progress + "%";
});





loadDurationsAndUpdateUI();




