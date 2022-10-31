// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  // Variable for selecting different horns
  const horn_selector = document.querySelector("#horn-select");
  // Select the different audio type 
  let audio_type = document.querySelector('audio');
  // Change image and volume type for different horn options
  horn_selector.addEventListener('change', (event) => {
    // Look at the "value" tag of the horn options
    let horn_type = event.target.value;
    // Use image tag
    let img_type = document.querySelector("img");

    if (horn_type == 'air-horn') {
        img_type.src = 'assets/images/air-horn.svg';
        audio_type.src = 'assets/audio/air-horn.mp3';   
    }
    else if (horn_type == 'car-horn') {
        img_type.src = 'assets/images/car-horn.svg';
        audio_type.src = 'assets/audio/car-horn.mp3';
    }   
    else if (horn_type == 'party-horn') {
        img_type.src = 'assets/images/party-horn.svg';
        audio_type.src = 'assets/audio/party-horn.mp3';
    }

  });


  const volume_slider = document.querySelector('#volume');
  // Change volume icon based on position (i.e. "value") of slider
  volume_slider.addEventListener('change', (event) => {
    // Use the "value" tag inside div "volume-controls"
    let slider = event.target.value;
    // Use the div image tag
    let audio_icon = document.querySelector('div img')
    if (slider == 0) {
      audio_icon.src = `assets/icons/volume-level-0.svg`;
    } else if (slider < 33) {
      audio_icon.src = `assets/icons/volume-level-1.svg`;
    } else if (slider < 67) {
      audio_icon.src = `assets/icons/volume-level-2.svg`;
    } else {
      audio_icon.src = `assets/icons/volume-level-3.svg`;
    }
    audio_type.volume = volume_slider.value / 100;
  });

  
  const play_sound = document.querySelector('button');
  const jsConfetti = new JSConfetti();
  //Button to play sound. Also display confetti if party horn is selected. 
  play_sound.addEventListener('click', (event) => {
    audio_type.play();
    if (horn_selector.value == 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
}