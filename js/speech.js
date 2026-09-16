(function () {
  'use strict';

  function speakGerman(text) {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      return false;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.82;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
    return true;
  }

  window.speakGerman = speakGerman;
}());
