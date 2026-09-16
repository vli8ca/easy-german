(function () {
  'use strict';

  const icons = window.KlarIcons;
  const typeLabels = {
    multiple: 'Escolha uma opção',
    fill: 'Complete a frase',
    order: 'Monte a frase',
    translate: 'Tradução curta',
    truefalse: 'Verdadeiro ou falso'
  };

  function escapeHTML(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalize(value) {
    return String(value == null ? '' : value)
      .trim()
      .toLocaleLowerCase('de-DE')
      .replace(/[.!?,;:]+$/g, '')
      .replace(/\s+/g, ' ');
  }

  function renderOptions(exercise) {
    return '<div class="exercise-options" role="group" aria-label="Alternativas">' + exercise.options.map((option) => (
      '<button type="button" class="option-button' + (exercise.type === 'truefalse' ? ' is-true' : '') + '" data-option="' + escapeHTML(option) + '">' + escapeHTML(option) + '</button>'
    )).join('') + '</div>';
  }

  function renderOrder(exercise) {
    return '<div class="word-bank" aria-label="Palavras disponíveis">' + exercise.answer.map((word, index) => (
      '<button type="button" class="word-chip" data-order-word="' + escapeHTML(word) + '" data-word-index="' + index + '">' + escapeHTML(word) + '</button>'
    )).join('') + '</div>' +
      '<div class="order-answer" data-order-answer aria-label="Sua frase"></div>' +
      '<button type="button" class="order-reset" data-reset-order>Limpar e começar de novo</button>';
  }

  function renderTextInput(exercise) {
    const placeholder = exercise.type === 'translate' ? 'Escreva a frase em alemão…' : 'Sua resposta…';
    return '<input class="exercise-input" type="text" autocomplete="off" spellcheck="false" placeholder="' + placeholder + '" aria-label="Resposta" />';
  }

  function renderExercise(exercise, index, contextId) {
    const question = exercise.audioText ?
      '<button type="button" class="audio-inline" data-speak="' + escapeHTML(exercise.audioText) + '" aria-label="Ouvir frase">' + icons.render('volume-2', 'audio-icon') + 'Ouvir</button>' : '';
    let input = '';
    if (exercise.type === 'multiple' || exercise.type === 'truefalse') input = renderOptions(exercise);
    if (exercise.type === 'fill' || exercise.type === 'translate') input = renderTextInput(exercise);
    if (exercise.type === 'order') input = renderOrder(exercise);
    return '<article class="exercise-card" data-exercise-card data-exercise-id="' + escapeHTML(exercise.id) + '" data-lesson-id="' + escapeHTML(contextId) + '">' +
      '<div class="exercise-top"><span class="exercise-number">Exercício ' + String(index + 1).padStart(2, '0') + '</span><span class="exercise-type">' + escapeHTML(typeLabels[exercise.type] || 'Prática') + '</span></div>' +
      '<h3>' + escapeHTML(exercise.prompt) + ' ' + question + '</h3>' +
      input +
      '<div class="exercise-actions"><button type="button" class="button button-primary" data-check-exercise>Verificar</button><button type="button" class="button button-secondary" data-show-explanation>Ver explicação</button></div>' +
      '<div class="feedback" data-feedback aria-live="polite"><span class="feedback-symbol" data-feedback-symbol></span><span data-feedback-text></span></div>' +
      '<div class="explanation" data-explanation>' + escapeHTML(exercise.explanation) + '<span class="answer-reveal" data-answer-reveal></span></div>' +
      '</article>';
  }

  function readResponse(card, exercise) {
    if (exercise.type === 'multiple' || exercise.type === 'truefalse') {
      const selected = card.querySelector('.option-button.is-selected');
      return selected ? selected.dataset.option : '';
    }
    if (exercise.type === 'order') {
      return Array.from(card.querySelectorAll('[data-order-answer] .word-chip')).map((chip) => chip.dataset.orderWord);
    }
    const input = card.querySelector('.exercise-input');
    return input ? input.value.trim() : '';
  }

  function isCorrect(response, exercise) {
    if (exercise.type === 'order') {
      const actual = response.map(normalize);
      const expected = exercise.answer.map(normalize);
      return actual.length === expected.length && actual.every((word, index) => word === expected[index]);
    }
    const accepted = exercise.answers || [exercise.answer];
    return accepted.some((answer) => normalize(response) === normalize(answer));
  }

  function answerLabel(exercise) {
    if (exercise.type === 'order') return exercise.answer.join(' ');
    return exercise.answer;
  }

  window.KlarExercises = {
    escapeHTML,
    typeLabels,
    normalize,
    renderExercise,
    readResponse,
    isCorrect,
    answerLabel
  };
}());
