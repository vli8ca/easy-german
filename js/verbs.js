(function () {
  'use strict';

  const pronouns = [
    { pronoun: 'ich', meaning: 'eu', meaning_en: 'I' },
    { pronoun: 'du', meaning: 'você (informal)', meaning_en: 'you (informal)' },
    { pronoun: 'er / sie / es', meaning: 'ele / ela / isso', meaning_en: 'he / she / it' },
    { pronoun: 'wir', meaning: 'nós', meaning_en: 'we' },
    { pronoun: 'ihr', meaning: 'vocês (informal)', meaning_en: 'you (plural, informal)' },
    { pronoun: 'sie / Sie', meaning: 'eles / elas · você formal', meaning_en: 'they · you (formal)' }
  ];

  function makeVerb(infinitive, meaning, meaningEn, explanation, explanationEn, forms, example, translation, translationEn) {
    return {
      infinitive,
      meaning,
      meaning_en: meaningEn,
      explanation,
      explanation_en: explanationEn,
      forms: pronouns.map((person, index) => Object.assign({}, person, { form: forms[index] })),
      example,
      exampleTranslation: translation,
      exampleTranslation_en: translationEn
    };
  }

  const exercises = [
    { id: 'lernen-ich', verbId: 'lernen', prompt: 'Complete: Ich ___ Deutsch.', prompt_en: 'Complete: I ___ German.', detail: 'lernen · ich', detail_en: 'lernen · ich', answers: ['lerne'] },
    { id: 'lernen-du', verbId: 'lernen', prompt: 'Complete: Du ___ Deutsch.', prompt_en: 'Complete: You ___ German.', detail: 'lernen · du', detail_en: 'lernen · du', answers: ['lernst'] },
    { id: 'lernen-er', verbId: 'lernen', prompt: 'Complete: Er ___ Deutsch.', prompt_en: 'Complete: He ___ German.', detail: 'lernen · er', detail_en: 'lernen · he', answers: ['lernt'] },
    { id: 'lernen-wir', verbId: 'lernen', prompt: 'Complete: Wir ___ Deutsch.', prompt_en: 'Complete: We ___ German.', detail: 'lernen · wir', detail_en: 'lernen · we', answers: ['lernen'] },
    { id: 'lernen-ihr', verbId: 'lernen', prompt: 'Complete: Ihr ___ Deutsch.', prompt_en: 'Complete: You ___ German.', detail: 'lernen · ihr', detail_en: 'lernen · you (plural)', answers: ['lernt'] },
    { id: 'lernen-sie', verbId: 'lernen', prompt: 'Complete: Sie ___ Deutsch.', prompt_en: 'Complete: They ___ German.', detail: 'lernen · sie (plural)', detail_en: 'lernen · they', answers: ['lernen'] },
    { id: 'machen-ich', verbId: 'machen', prompt: 'Complete: Ich ___ heute Sport.', prompt_en: 'Complete: I ___ sports today.', detail: 'machen · ich', detail_en: 'machen · I', answers: ['mache'] },
    { id: 'machen-du', verbId: 'machen', prompt: 'Complete: Du ___ die Hausaufgaben.', prompt_en: 'Complete: You ___ the homework.', detail: 'machen · du', detail_en: 'machen · you', answers: ['machst'] },
    { id: 'machen-er', verbId: 'machen', prompt: 'Complete: Er ___ einen Kaffee.', prompt_en: 'Complete: He ___ a coffee.', detail: 'machen · er', detail_en: 'machen · he', answers: ['macht'] },
    { id: 'machen-wir', verbId: 'machen', prompt: 'Complete: Wir ___ eine Pause.', prompt_en: 'Complete: We ___ a break.', detail: 'machen · wir', detail_en: 'machen · we', answers: ['machen'] },
    { id: 'machen-ihr', verbId: 'machen', prompt: 'Complete: Ihr ___ Musik.', prompt_en: 'Complete: You ___ music.', detail: 'machen · ihr', detail_en: 'machen · you (plural)', answers: ['macht'] },
    { id: 'machen-sie', verbId: 'machen', prompt: 'Complete: Maria und Paul ___ das Essen.', prompt_en: 'Complete: Maria and Paul ___ the food.', detail: 'machen · Maria und Paul', detail_en: 'machen · Maria and Paul', answers: ['machen'] },
    { id: 'spielen-ich', verbId: 'spielen', prompt: 'Complete: Ich ___ Fußball.', prompt_en: 'Complete: I ___ soccer.', detail: 'spielen · ich', detail_en: 'spielen · I', answers: ['spiele'] },
    { id: 'spielen-du', verbId: 'spielen', prompt: 'Complete: Du ___ Klavier.', prompt_en: 'Complete: You ___ the piano.', detail: 'spielen · du', detail_en: 'spielen · you', answers: ['spielst'] },
    { id: 'spielen-er', verbId: 'spielen', prompt: 'Complete: Er ___ Tennis.', prompt_en: 'Complete: He ___ tennis.', detail: 'spielen · er', detail_en: 'spielen · he', answers: ['spielt'] },
    { id: 'spielen-wir', verbId: 'spielen', prompt: 'Complete: Wir ___ Karten.', prompt_en: 'Complete: We ___ cards.', detail: 'spielen · wir', detail_en: 'spielen · we', answers: ['spielen'] },
    { id: 'spielen-ihr', verbId: 'spielen', prompt: 'Complete: Ihr ___ im Park.', prompt_en: 'Complete: You ___ in the park.', detail: 'spielen · ihr', detail_en: 'spielen · you (plural)', answers: ['spielt'] },
    { id: 'spielen-sie', verbId: 'spielen', prompt: 'Complete: Die Kinder ___ draußen.', prompt_en: 'Complete: The children ___ outside.', detail: 'spielen · die Kinder', detail_en: 'spielen · the children', answers: ['spielen'] },
    { id: 'lernen-zusammen', verbId: 'lernen', prompt: 'Complete: Meine Schwester und ich ___ Deutsch.', prompt_en: 'Complete: My sister and I ___ German.', detail: 'lernen · meine Schwester und ich', detail_en: 'lernen · my sister and I', answers: ['lernen'] },
    { id: 'spielen-karten', verbId: 'spielen', prompt: 'Complete: Mein Bruder und ich ___ Karten.', prompt_en: 'Complete: My brother and I ___ cards.', detail: 'spielen · mein Bruder und ich', detail_en: 'spielen · my brother and I', answers: ['spielen'] }
  ].map((item) => Object.assign({
    placeholder: 'Digite a forma correta…',
    placeholder_en: 'Type the correct form…'
  }, item));

  window.KlarVerbs = {
    pages: {
      starter: {
        id: 'verbs-starter',
        title: 'Primeiros verbos',
        title_en: 'First verbs',
        heroTitle: 'Aprenda a conjugar',
        heroTitle_en: 'Learn to conjugate',
        heroAccent: 'com verbos do dia a dia.',
        heroAccent_en: 'with everyday verbs.',
        introduction: 'Comece com três verbos regulares que ajudam a formar frases simples desde a primeira conversa.',
        introduction_en: 'Start with three regular verbs that help you build simple sentences from your first conversation.',
        showQuestionCount: true,
        verbs: [
          makeVerb(
            'lernen', 'aprender · estudar', 'to learn · to study',
            'É regular: retire -en para formar lern- e acrescente a terminação de cada pessoa.',
            'It is regular: remove -en to get lern- and add the ending for each person.',
            ['lerne', 'lernst', 'lernt', 'lernen', 'lernt', 'lernen'],
            'Ich lerne Deutsch.',
            'Eu estudo alemão.', 'I study German.'
          ),
          makeVerb(
            'machen', 'fazer', 'to do · to make',
            'Também segue o padrão regular: mach- recebe as mesmas terminações de lernen.',
            'It also follows the regular pattern: mach- takes the same endings as lernen.',
            ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'],
            'Wir machen eine Pause.',
            'Nós fazemos uma pausa.', 'We take a break.'
          ),
          makeVerb(
            'spielen', 'jogar · tocar um instrumento', 'to play · to play an instrument',
            'É regular: mantenha spiel- e acrescente as mesmas seis terminações do presente.',
            'It is regular: keep spiel- and add the same six present-tense endings.',
            ['spiele', 'spielst', 'spielt', 'spielen', 'spielt', 'spielen'],
            'Die Kinder spielen draußen.',
            'As crianças brincam lá fora.', 'The children play outside.'
          )
        ],
        notes: [
          {
            title: 'Terminações do presente',
            title_en: 'Present-tense endings',
            copy: 'Nos verbos regulares terminados em -en, use -e, -st, -t, -en, -t, -en nesta ordem: ich, du, er/sie/es, wir, ihr, sie/Sie.',
            copy_en: 'For regular verbs ending in -en, use -e, -st, -t, -en, -t, -en in this order: ich, du, er/sie/es, wir, ihr, sie/Sie.'
          },
          {
            title: 'O verbo fica em segundo lugar',
            title_en: 'The verb goes in second position',
            copy: 'Em uma frase simples, o verbo conjugado costuma ficar na segunda posição: Ich lerne Deutsch.',
            copy_en: 'In a simple statement, the conjugated verb usually goes in second position: Ich lerne Deutsch.'
          },
          {
            title: 'sie e Sie',
            title_en: 'sie and Sie',
            copy: 'sie pode significar “ela” ou “eles/elas”. Sie com inicial maiúscula também significa “você” formal. As duas últimas usam a forma terminada em -en.',
            copy_en: 'sie can mean “she” or “they”. Capitalized Sie also means formal “you”. Both use the form ending in -en.'
          }
        ],
        completedCopy: 'Você praticou as seis pessoas dos três verbos regulares.',
        completedCopy_en: 'You practiced all six forms of the three regular verbs.',
        modes: {
          practice: {
            id: 'verbs-starter',
            interaction: 'streak',
            shuffle: false,
            title: 'Complete cada forma',
            title_en: 'Complete each form',
            instruction: 'Digite a forma que falta. Confira a correção e avance para a próxima questão.',
            instruction_en: 'Type the missing form. Check your answer and move on to the next question.',
            inputLabel: 'Sua resposta',
            inputLabel_en: 'Your answer',
            checkLabel: 'Conferir resposta',
            checkLabel_en: 'Check answer',
            nextLabel: 'Próxima questão',
            nextLabel_en: 'Next question',
            restartLabel: 'Recomeçar as 20 questões',
            restartLabel_en: 'Restart all 20 questions',
            items: exercises
          }
        }
      }
    }
  };
}());
