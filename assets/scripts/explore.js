// explore.js

window.addEventListener('DOMContentLoaded', init);


const synth = window.speechSynthesis;
const voice_selector = document.getElementById('voice-select');
const tts_input = document.getElementById('text-to-speak');
const talk_button = document.querySelector('button');
let voices = [];
function init() {

  //Function to populate the voices on dropdown list
  function populateVoiceList() {
	// retrieve a list of the voices available
    voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voice_selector.appendChild(option); 
    } 
  };

  populateVoiceList();    
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  var face_swap = document.querySelector('img');
  talk_button.addEventListener('click', (event) => {
	// Stop the form submitting
    event.preventDefault();

	//Create instance that contains the text from the text input. 
    const utterThis = new SpeechSynthesisUtterance(tts_input.value);
	//Set the utterance's voice to the voice selected in the <select> element
    const selectedOption = voice_selector.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length ; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
	//Start the utterance speaking
    synth.speak(utterThis);

	//OWhile the synthesizer is speaking, the face should swap to being open mouthed. 
	function while_speaking() {
	  if (synth.speaking) {
		  face_swap.src = `assets/images/smiling-open.png`;
	  }
	  else {
	  face_swap.src = `assets/images/smiling.png`;
	  }
	}
	setInterval(while_speaking);
  });
}