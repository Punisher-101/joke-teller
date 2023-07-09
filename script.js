// Importing Variables from Voice.js
import VoiceRSS from "./voice.js";

// DOM Elements
const button = document.querySelector("#button");
export const audioElement = document.querySelector("#audio");

// Disable Enabled Fucntion
function toggleButton() {
  button.disabled = !button.disabled;
}

// A function taking a joke which would be used by the VoiceRss
function tellMe(joke) {
  VoiceRSS.speech({
    key: "5d28fd82c7c644769957624cf91e8606",
    src: `${joke}`,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from JokeAPI
async function getJokes() {
  let joke = "";
  const apiURL = "https://v2.jokeapi.dev/joke/Dark,Spooky";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    !data.joke ? (joke = `${data.setup} ${data.delivery}`) : (joke = data.joke);
    // Telling the Joke
    tellMe(joke);
    // Disbling the Button While playing Audio
    toggleButton();
  } catch (error) {
    console.log(error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
