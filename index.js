const ttsOutput = document.getElementById('tts-output');
const synth = window.speechSynthesis;
let isSpeaking = false;

// Función de navegación entre pantallas
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active-screen');
  });
  document.getElementById(screenId).classList.add('active-screen');
}

// Función de Texto a Voz (TTS)
function speakPhrase(text) {
  if (isSpeaking) {
    synth.cancel();
  }

  // Muestra la frase que se va a decir en el encabezado
  ttsOutput.textContent = `Hablando: "${text}"`;

  const utterance = new SpeechSynthesisUtterance(text);
  // Intentar usar una voz en español si está disponible
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
  console.log('App ComunicaYa cargada y lista.');
};