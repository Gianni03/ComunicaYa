const ttsOutput = document.getElementById('tts-output');
const synth = window.speechSynthesis;
let isSpeaking = false;


function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active-screen');
  });
  document.getElementById(screenId).classList.add('active-screen');
}

function speakPhrase(text) {
  if (isSpeaking) {
    synth.cancel();
  }

  
  ttsOutput.textContent = `Hablando: "${text.toUpperCase()}"`;

  const utterance = new SpeechSynthesisUtterance(text);

  const spanishVoice = synth.getVoices().find(voice => voice.lang.startsWith('es-'));
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }
  utterance.rate = 1; // Velocidad de habla normal
  utterance.pitch = 1; // Tono normal

  utterance.onstart = () => { isSpeaking = true; };
  utterance.onend = () => { isSpeaking = false; ttsOutput.textContent = ''; };
  utterance.onerror = (e) => {
    isSpeaking = false;
    ttsOutput.textContent = 'Error de voz: ' + e.error;
    console.error('SpeechSynthesis Utterance Error', e);
  };

  synth.speak(utterance);
}

// Inicializar la pantalla
window.onload = () => {
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => { };
  }
  ttsOutput.textContent = 'TOCA UN BOTÓN PARA HABLAR';
  console.log('App ComunicaYa cargada y lista.');
};