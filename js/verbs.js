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

  function makeExample(de, pt, en) {
    return { de, pt, en };
  }

  function makeUsage(title, titleEn, copy, copyEn, examples) {
    return { title, title_en: titleEn, copy, copy_en: copyEn, examples };
  }

  function makeVerb(infinitive, meaning, meaningEn, explanation, explanationEn, forms, example, translation, translationEn, usages) {
    return {
      infinitive,
      meaning,
      meaning_en: meaningEn,
      explanation,
      explanation_en: explanationEn,
      forms: pronouns.map((person, index) => Object.assign({}, person, { form: forms[index] })),
      example,
      exampleTranslation: translation,
      exampleTranslation_en: translationEn,
      usages
    };
  }

  function makePhrase(id, verbId, prompt, promptEn, answer, detail, detailEn) {
    return {
      id,
      verbId,
      prompt,
      prompt_en: promptEn,
      detail,
      detail_en: detailEn,
      placeholder: 'Escreva a frase em alemão…',
      placeholder_en: 'Write the sentence in German…',
      answers: [answer]
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

  const phraseExercises = [
    makePhrase('phrase-lernen-01', 'lernen', 'Eu estudo alemão todos os dias.', 'I study German every day.', 'Ich lerne jeden Tag Deutsch.', 'jeden Tag = todos os dias', 'jeden Tag = every day'),
    makePhrase('phrase-lernen-02', 'lernen', 'Você aprende alemão em casa.', 'You learn German at home.', 'Du lernst Deutsch zu Hause.', 'zu Hause = em casa', 'zu Hause = at home'),
    makePhrase('phrase-lernen-03', 'lernen', 'Ele estuda para a prova.', 'He studies for the test.', 'Er lernt für den Test.', 'der Test = a prova', 'der Test = the test'),
    makePhrase('phrase-lernen-04', 'lernen', 'Ela aprende uma palavra nova.', 'She learns a new word.', 'Sie lernt ein neues Wort.', 'ein neues Wort = uma palavra nova', 'ein neues Wort = a new word'),
    makePhrase('phrase-lernen-05', 'lernen', 'Nós estudamos juntos à tarde.', 'We study together in the afternoon.', 'Wir lernen am Nachmittag zusammen.', 'am Nachmittag = à tarde', 'am Nachmittag = in the afternoon'),
    makePhrase('phrase-lernen-06', 'lernen', 'Vocês aprendem alemão na escola.', 'You learn German at school.', 'Ihr lernt Deutsch in der Schule.', 'die Schule = a escola', 'die Schule = the school'),
    makePhrase('phrase-lernen-07', 'lernen', 'As crianças aprendem a ler.', 'The children are learning to read.', 'Die Kinder lernen lesen.', 'lesen = ler', 'lesen = to read'),
    makePhrase('phrase-lernen-08', 'lernen', 'Meus amigos estudam inglês.', 'My friends study English.', 'Meine Freunde lernen Englisch.', 'meine Freunde = meus amigos', 'meine Freunde = my friends'),
    makePhrase('phrase-lernen-09', 'lernen', 'Eu aprendo a cozinhar.', 'I am learning to cook.', 'Ich lerne kochen.', 'kochen = cozinhar', 'kochen = to cook'),
    makePhrase('phrase-lernen-10', 'lernen', 'Você aprende rápido.', 'You learn quickly.', 'Du lernst schnell.', 'schnell = rápido', 'schnell = quickly'),
    makePhrase('phrase-lernen-11', 'lernen', 'O aluno aprende uma frase.', 'The student learns a sentence.', 'Der Schüler lernt einen Satz.', 'der Satz = a frase', 'der Satz = the sentence'),
    makePhrase('phrase-lernen-12', 'lernen', 'Ela aprende uma música nova.', 'She learns a new song.', 'Sie lernt ein neues Lied.', 'das Lied = a música', 'das Lied = the song'),
    makePhrase('phrase-lernen-13', 'lernen', 'Nós aprendemos três palavras hoje.', 'We learn three words today.', 'Wir lernen heute drei Wörter.', 'heute = hoje · drei Wörter = três palavras', 'heute = today · drei Wörter = three words'),
    makePhrase('phrase-lernen-14', 'lernen', 'Eles estudam para a prova.', 'They study for the exam.', 'Sie lernen für die Prüfung.', 'die Prüfung = a prova', 'die Prüfung = the exam'),
    makePhrase('phrase-lernen-15', 'lernen', 'Maria estuda na biblioteca.', 'Maria studies at the library.', 'Maria lernt in der Bibliothek.', 'die Bibliothek = a biblioteca', 'die Bibliothek = the library'),
    makePhrase('phrase-lernen-16', 'lernen', 'Eu aprendo muito com meu professor.', 'I learn a lot from my teacher.', 'Ich lerne viel von meinem Lehrer.', 'viel = muito · der Lehrer = o professor', 'viel = a lot · der Lehrer = the teacher'),
    makePhrase('phrase-lernen-17', 'lernen', 'As meninas estudam alemão juntas.', 'The girls study German together.', 'Die Mädchen lernen zusammen Deutsch.', 'die Mädchen = as meninas · zusammen = juntas', 'die Mädchen = the girls · zusammen = together'),
    makePhrase('phrase-lernen-18', 'lernen', 'Você aprende a nadar.', 'You are learning to swim.', 'Du lernst schwimmen.', 'schwimmen = nadar', 'schwimmen = to swim'),
    makePhrase('phrase-lernen-19', 'lernen', 'Ele aprende a tocar piano.', 'He is learning to play the piano.', 'Er lernt Klavier spielen.', 'Klavier spielen = tocar piano', 'Klavier spielen = to play the piano'),
    makePhrase('phrase-lernen-20', 'lernen', 'Nós aprendemos com nossos erros.', 'We learn from our mistakes.', 'Wir lernen aus unseren Fehlern.', 'der Fehler = o erro', 'der Fehler = the mistake'),
    makePhrase('phrase-lernen-21', 'lernen', 'Vocês estudam à noite.', 'You study in the evening.', 'Ihr lernt am Abend.', 'am Abend = à noite', 'am Abend = in the evening'),
    makePhrase('phrase-lernen-22', 'lernen', 'Meu irmão aprende uma canção.', 'My brother learns a song.', 'Mein Bruder lernt ein Lied.', 'mein Bruder = meu irmão', 'mein Bruder = my brother'),
    makePhrase('phrase-lernen-23', 'lernen', 'Eu estudo para a aula.', 'I study for the class.', 'Ich lerne für den Unterricht.', 'der Unterricht = a aula', 'der Unterricht = the class'),
    makePhrase('phrase-lernen-24', 'lernen', 'Onde você aprende alemão?', 'Where do you learn German?', 'Wo lernst du Deutsch?', 'wo = onde', 'wo = where'),
    makePhrase('phrase-lernen-25', 'lernen', 'A criança aprende a escrever.', 'The child is learning to write.', 'Das Kind lernt schreiben.', 'schreiben = escrever', 'schreiben = to write'),

    makePhrase('phrase-machen-01', 'machen', 'Eu faço minha lição de casa hoje.', 'I do my homework today.', 'Ich mache heute meine Hausaufgaben.', 'heute = hoje · die Hausaufgaben = a lição de casa', 'heute = today · die Hausaufgaben = homework'),
    makePhrase('phrase-machen-02', 'machen', 'Você prepara café de manhã.', 'You make coffee in the morning.', 'Du machst am Morgen Kaffee.', 'am Morgen = de manhã · der Kaffee = o café', 'am Morgen = in the morning · der Kaffee = coffee'),
    makePhrase('phrase-machen-03', 'machen', 'Ele tira uma foto.', 'He takes a photo.', 'Er macht ein Foto.', 'das Foto = a foto', 'das Foto = the photo'),
    makePhrase('phrase-machen-04', 'machen', 'Ela prepara o jantar.', 'She makes dinner.', 'Sie macht das Abendessen.', 'das Abendessen = o jantar', 'das Abendessen = dinner'),
    makePhrase('phrase-machen-05', 'machen', 'Nós fazemos uma pausa agora.', 'We are taking a break now.', 'Wir machen jetzt eine Pause.', 'jetzt = agora · die Pause = a pausa', 'jetzt = now · die Pause = the break'),
    makePhrase('phrase-machen-06', 'machen', 'Vocês praticam esporte no sábado.', 'You play sports on Saturday.', 'Ihr macht am Samstag Sport.', 'am Samstag = no sábado · Sport machen = praticar esporte', 'am Samstag = on Saturday · Sport machen = to play sports'),
    makePhrase('phrase-machen-07', 'machen', 'As crianças fazem um bolo.', 'The children make a cake.', 'Die Kinder machen einen Kuchen.', 'der Kuchen = o bolo', 'der Kuchen = the cake'),
    makePhrase('phrase-machen-08', 'machen', 'Eu faço um plano para amanhã.', 'I make a plan for tomorrow.', 'Ich mache einen Plan für morgen.', 'morgen = amanhã · der Plan = o plano', 'morgen = tomorrow · der Plan = the plan'),
    makePhrase('phrase-machen-09', 'machen', 'O que você está fazendo hoje?', 'What are you doing today?', 'Was machst du heute?', 'was = o que · heute = hoje', 'was = what · heute = today'),
    makePhrase('phrase-machen-10', 'machen', 'O barulho me deixa cansado.', 'The noise makes me tired.', 'Der Lärm macht mich müde.', 'der Lärm = o barulho · müde = cansado', 'der Lärm = the noise · müde = tired'),
    makePhrase('phrase-machen-11', 'machen', 'A música a deixa feliz.', 'The music makes her happy.', 'Die Musik macht sie glücklich.', 'die Musik = a música · glücklich = feliz', 'die Musik = the music · glücklich = happy'),
    makePhrase('phrase-machen-12', 'machen', 'Isso dá dez euros.', 'That comes to ten euros.', 'Das macht zehn Euro.', 'zehn Euro = dez euros', 'zehn Euro = ten euros'),
    makePhrase('phrase-machen-13', 'machen', 'Um e um são dois.', 'One and one make two.', 'Eins und eins macht zwei.', 'eins = um · zwei = dois', 'eins = one · zwei = two'),
    makePhrase('phrase-machen-14', 'machen', 'Ele comete um erro na prova.', 'He makes a mistake on the test.', 'Er macht einen Fehler im Test.', 'einen Fehler machen = cometer um erro', 'einen Fehler machen = to make a mistake'),
    makePhrase('phrase-machen-15', 'machen', 'Nós damos um passeio no parque.', 'We take a walk in the park.', 'Wir machen einen Spaziergang im Park.', 'der Spaziergang = o passeio · der Park = o parque', 'der Spaziergang = the walk · der Park = the park'),
    makePhrase('phrase-machen-16', 'machen', 'Minha irmã faz uma reserva.', 'My sister makes a reservation.', 'Meine Schwester macht eine Reservierung.', 'die Reservierung = a reserva', 'die Reservierung = the reservation'),
    makePhrase('phrase-machen-17', 'machen', 'Eu marco um horário para sexta-feira.', 'I make an appointment for Friday.', 'Ich mache einen Termin für Freitag.', 'der Termin = o compromisso · Freitag = sexta-feira', 'der Termin = the appointment · Freitag = Friday'),
    makePhrase('phrase-machen-18', 'machen', 'O que devo fazer com a chave?', 'What should I do with the key?', 'Was soll ich mit dem Schlüssel machen?', 'der Schlüssel = a chave · sollen = dever', 'der Schlüssel = the key · sollen = should'),
    makePhrase('phrase-machen-19', 'machen', 'Nós saímos às oito horas.', 'We set off at eight o’clock.', 'Wir machen uns um acht Uhr auf den Weg.', 'um acht Uhr = às oito horas · auf den Weg machen = pôr-se a caminho', 'um acht Uhr = at eight o’clock · auf den Weg machen = to set off'),
    makePhrase('phrase-machen-20', 'machen', 'Ela começa a trabalhar.', 'She gets to work.', 'Sie macht sich an die Arbeit.', 'sich an die Arbeit machen = começar a trabalhar', 'sich an die Arbeit machen = to get to work'),
    makePhrase('phrase-machen-21', 'machen', 'O aluno novo está indo bem na aula.', 'The new student is doing well in class.', 'Der neue Schüler macht sich gut im Unterricht.', 'neu = novo · gut = bem', 'neu = new · gut = well'),
    makePhrase('phrase-machen-22', 'machen', 'Não se preocupe.', 'Do not worry.', 'Mach dir keine Sorgen.', 'sich Sorgen machen = preocupar-se', 'sich Sorgen machen = to worry'),
    makePhrase('phrase-machen-23', 'machen', 'Fique bem!', 'Take care!', 'Mach\'s gut!', 'Mach\'s gut! = expressão de despedida', 'Mach\'s gut! = a farewell expression'),
    makePhrase('phrase-machen-24', 'machen', 'Não tem problema.', 'It does not matter.', 'Das macht nichts.', 'nichts = nada', 'nichts = nothing'),
    makePhrase('phrase-machen-25', 'machen', 'Deixe-me fazer isso.', 'Let me do that.', 'Lass mich das machen.', 'lassen = deixar · das = isso', 'lassen = to let · das = that'),

    makePhrase('phrase-spielen-01', 'spielen', 'As crianças brincam no jardim.', 'The children play in the garden.', 'Die Kinder spielen im Garten.', 'der Garten = o jardim', 'der Garten = the garden'),
    makePhrase('phrase-spielen-02', 'spielen', 'Eu jogo cartas com meu amigo.', 'I play cards with my friend.', 'Ich spiele mit meinem Freund Karten.', 'Karten spielen = jogar cartas · der Freund = o amigo', 'Karten spielen = to play cards · der Freund = the friend'),
    makePhrase('phrase-spielen-03', 'spielen', 'Você joga xadrez?', 'Do you play chess?', 'Spielst du Schach?', 'Schach spielen = jogar xadrez', 'Schach spielen = to play chess'),
    makePhrase('phrase-spielen-04', 'spielen', 'Ele joga futebol todos os dias.', 'He plays soccer every day.', 'Er spielt jeden Tag Fußball.', 'Fußball spielen = jogar futebol', 'Fußball spielen = to play soccer'),
    makePhrase('phrase-spielen-05', 'spielen', 'Ela joga tênis com Anna.', 'She plays tennis with Anna.', 'Sie spielt mit Anna Tennis.', 'Tennis spielen = jogar tênis', 'Tennis spielen = to play tennis'),
    makePhrase('phrase-spielen-06', 'spielen', 'Nós jogamos basquete na escola.', 'We play basketball at school.', 'Wir spielen Basketball in der Schule.', 'Basketball = basquete · die Schule = a escola', 'Basketball = basketball · die Schule = the school'),
    makePhrase('phrase-spielen-07', 'spielen', 'Vocês brincam juntos com um jogo.', 'You play a game together.', 'Ihr spielt zusammen ein Spiel.', 'zusammen = juntos · das Spiel = o jogo', 'zusammen = together · das Spiel = the game'),
    makePhrase('phrase-spielen-08', 'spielen', 'Maria e Paul brincam no parque.', 'Maria and Paul play in the park.', 'Maria und Paul spielen im Park.', 'der Park = o parque', 'der Park = the park'),
    makePhrase('phrase-spielen-09', 'spielen', 'Meu irmão toca violão.', 'My brother plays the guitar.', 'Mein Bruder spielt Gitarre.', 'Gitarre spielen = tocar violão/guitarra', 'Gitarre spielen = to play the guitar'),
    makePhrase('phrase-spielen-10', 'spielen', 'Eu toco piano à noite.', 'I play the piano in the evening.', 'Ich spiele am Abend Klavier.', 'Klavier spielen = tocar piano', 'Klavier spielen = to play the piano'),
    makePhrase('phrase-spielen-11', 'spielen', 'Você sabe tocar violão?', 'Can you play the guitar?', 'Kannst du Gitarre spielen?', 'können = poder/saber · Gitarre = violão/guitarra', 'können = can · Gitarre = guitar'),
    makePhrase('phrase-spielen-12', 'spielen', 'Ele interpreta um rei no teatro.', 'He plays a king in the theater.', 'Er spielt einen König im Theater.', 'der König = o rei · das Theater = o teatro', 'der König = the king · das Theater = the theater'),
    makePhrase('phrase-spielen-13', 'spielen', 'Ela atua em um filme.', 'She acts in a film.', 'Sie spielt in einem Film.', 'der Film = o filme', 'der Film = the film'),
    makePhrase('phrase-spielen-14', 'spielen', 'O filme se passa em Berlim.', 'The film is set in Berlin.', 'Der Film spielt in Berlin.', 'in Berlin = em Berlim', 'in Berlin = in Berlin'),
    makePhrase('phrase-spielen-15', 'spielen', 'A banda toca no rádio hoje.', 'The band plays on the radio today.', 'Die Band spielt heute im Radio.', 'die Band = a banda · heute = hoje', 'die Band = the band · heute = today'),
    makePhrase('phrase-spielen-16', 'spielen', 'Dinheiro não importa.', 'Money does not matter.', 'Geld spielt keine Rolle.', 'Geld spielt keine Rolle = dinheiro não importa', 'Geld spielt keine Rolle = money does not matter'),
    makePhrase('phrase-spielen-17', 'spielen', 'A família tem um papel importante.', 'The family plays an important role.', 'Die Familie spielt eine wichtige Rolle.', 'wichtig = importante · die Rolle = o papel', 'wichtig = important · die Rolle = the role'),
    makePhrase('phrase-spielen-18', 'spielen', 'Nós jogamos contra um bom time.', 'We play against a good team.', 'Wir spielen gegen eine gute Mannschaft.', 'gegen = contra · die Mannschaft = o time', 'gegen = against · die Mannschaft = the team'),
    makePhrase('phrase-spielen-19', 'spielen', 'As crianças jogam por um prêmio.', 'The children play for a prize.', 'Die Kinder spielen um einen Preis.', 'der Preis = o prêmio', 'der Preis = the prize'),
    makePhrase('phrase-spielen-20', 'spielen', 'Ele joga por dinheiro.', 'He gambles for money.', 'Er spielt um Geld.', 'um Geld spielen = jogar por dinheiro', 'um Geld spielen = to gamble for money'),
    makePhrase('phrase-spielen-21', 'spielen', 'Você está brincando com fogo.', 'You are playing with fire.', 'Du spielst mit dem Feuer.', 'mit dem Feuer spielen = brincar com fogo', 'mit dem Feuer spielen = to play with fire'),
    makePhrase('phrase-spielen-22', 'spielen', 'Não brinque comigo.', 'Do not play with me.', 'Spiel nicht mit mir.', 'mit jemandem spielen = brincar/manipular alguém', 'mit jemandem spielen = to play with/manipulate someone'),
    makePhrase('phrase-spielen-23', 'spielen', 'Nós brincamos lá fora depois da escola.', 'We play outside after school.', 'Wir spielen nach der Schule draußen.', 'nach der Schule = depois da escola · draußen = lá fora', 'nach der Schule = after school · draußen = outside'),
    makePhrase('phrase-spielen-24', 'spielen', 'Eles jogam vôlei no ginásio.', 'They play volleyball in the gym.', 'Sie spielen Volleyball in der Sporthalle.', 'Volleyball = vôlei · die Sporthalle = o ginásio', 'Volleyball = volleyball · die Sporthalle = the gym'),
    makePhrase('phrase-spielen-25', 'spielen', 'Nosso time joga hoje.', 'Our team plays today.', 'Unsere Mannschaft spielt heute.', 'unsere Mannschaft = nosso time', 'unsere Mannschaft = our team')
  ];

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
            'Eu estudo alemão.', 'I study German.',
            [
              makeUsage('Aprender uma matéria, idioma ou habilidade', 'Learn a subject, language or skill', 'Use lernen com o conteúdo que a pessoa está aprendendo. Para instrumento, dizer lernen Klavier sugere aprender a tocar piano.', 'Use lernen with the subject being learned. With an instrument, lernen Klavier suggests learning to play piano.', [
                makeExample('Ich lerne Deutsch.', 'Eu aprendo alemão.', 'I am learning German.'),
                makeExample('Sie lernt Klavier.', 'Ela aprende piano.', 'She is learning piano.')
              ]),
              makeUsage('Aprender a fazer algo', 'Learn to do something', 'Com algumas habilidades, como nadar e ler, o infinitivo pode vir sem zu. Em construções mais gerais, usa-se zu + infinitivo.', 'With some skills, such as swimming and reading, the infinitive can appear without zu. In more general constructions, use zu + infinitive.', [
                makeExample('Er lernt schwimmen.', 'Ele está aprendendo a nadar.', 'He is learning to swim.'),
                makeExample('Wir lernen, besser zu kochen.', 'Estamos aprendendo a cozinhar melhor.', 'We are learning to cook better.')
              ]),
              makeUsage('Estudar ou se preparar', 'Study or prepare', 'lernen também significa estudar, inclusive para uma prova ou na escola.', 'lernen also means to study, including for an exam or at school.', [
                makeExample('Ich lerne für die Prüfung.', 'Estou estudando para a prova.', 'I am studying for the exam.'),
                makeExample('Die Kinder lernen in der Schule.', 'As crianças estudam na escola.', 'The children study at school.')
              ]),
              makeUsage('Aprender com alguém ou com uma experiência', 'Learn from someone or an experience', 'Use von + dativo para indicar uma pessoa e aus + dativo para indicar de onde vem a aprendizagem, como uma experiência ou erro.', 'Use von + dative for a person and aus + dative for the source of learning, such as an experience or mistake.', [
                makeExample('Ich lerne viel von meiner Lehrerin.', 'Aprendo muito com minha professora.', 'I learn a lot from my teacher.'),
                makeExample('Wir lernen aus unseren Fehlern.', 'Aprendemos com nossos erros.', 'We learn from our mistakes.')
              ])
            ]
          ),
          makeVerb(
            'machen', 'fazer', 'to do · to make',
            'Também segue o padrão regular: mach- recebe as mesmas terminações de lernen.',
            'It also follows the regular pattern: mach- takes the same endings as lernen.',
            ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'],
            'Wir machen eine Pause.',
            'Nós fazemos uma pausa.', 'We take a break.',
            [
              makeUsage('Fazer, criar ou produzir', 'Do, create or produce', 'machen pode indicar que alguém realiza ou cria algo; o objeto vem no acusativo.', 'machen can mean carrying out or creating something; the object is in the accusative.', [
                makeExample('Ich mache ein Foto.', 'Eu tiro uma foto.', 'I take a photo.'),
                makeExample('Wir machen einen Plan.', 'Fazemos um plano.', 'We make a plan.')
              ]),
              makeUsage('Preparar comida ou bebida', 'Prepare food or a drink', 'Use machen para falar de preparar café, uma refeição ou algo para comer.', 'Use machen when talking about preparing coffee, a meal or something to eat.', [
                makeExample('Er macht Kaffee.', 'Ele prepara café.', 'He makes coffee.'),
                makeExample('Sie macht das Abendessen.', 'Ela prepara o jantar.', 'She makes dinner.')
              ]),
              makeUsage('Fazer atividades em expressões comuns', 'Do activities in common expressions', 'O alemão combina machen com substantivos em várias expressões do cotidiano.', 'German combines machen with nouns in many everyday expressions.', [
                makeExample('Ich mache meine Hausaufgaben.', 'Faço minha lição de casa.', 'I do my homework.'),
                makeExample('Wir machen Sport und danach eine Pause.', 'Praticamos esporte e depois fazemos uma pausa.', 'We play sports and then take a break.'),
                makeExample('Er macht einen Fehler.', 'Ele comete um erro.', 'He makes a mistake.'),
                makeExample('Wir machen einen Spaziergang.', 'Damos um passeio.', 'We take a walk.')
              ]),
              makeUsage('Causar uma sensação ou mudança', 'Cause a feeling or change', 'Com uma pessoa ou coisa no acusativo e um adjetivo, machen indica o efeito que algo causa.', 'With a person or thing in the accusative and an adjective, machen describes the effect something causes.', [
                makeExample('Das macht mich glücklich.', 'Isso me deixa feliz.', 'That makes me happy.'),
                makeExample('Der Lärm macht mich müde.', 'O barulho me deixa cansado.', 'The noise makes me tired.')
              ]),
              makeUsage('Indicar resultado, preço ou soma', 'Show a result, price or sum', 'Em preços e cálculos simples, machen pode indicar o total ou o resultado.', 'For prices and simple calculations, machen can give the total or result.', [
                makeExample('Das macht 20 Euro.', 'Isso dá 20 euros.', 'That comes to 20 euros.'),
                makeExample('Zwei und drei machen fünf.', 'Dois e três são cinco.', 'Two and three make five.')
              ]),
              makeUsage('Perguntar o que fazer com algo', 'Ask what to do with something', 'Was machst du? pergunta o que alguém está fazendo. Com mit + dativo, dá para perguntar o que fazer com um objeto.', 'Was machst du? asks what someone is doing. With mit + dative, ask what to do with an object.', [
                makeExample('Was machst du heute?', 'O que você vai fazer hoje?', 'What are you doing today?'),
                makeExample('Was soll ich mit dem Schlüssel machen?', 'O que devo fazer com a chave?', 'What should I do with the key?')
              ]),
              makeUsage('Combinar ou organizar algo', 'Arrange or organize something', 'machen aparece em expressões para marcar um horário, fazer uma reserva ou montar um plano. Vereinbaren é outra opção comum para “marcar”.', 'machen appears in expressions for setting an appointment, making a reservation or creating a plan. Vereinbaren is another common option for “arrange”.', [
                makeExample('Wir machen einen Termin.', 'Vamos marcar um horário.', 'We will make an appointment.'),
                makeExample('Sie macht eine Reservierung.', 'Ela faz uma reserva.', 'She makes a reservation.')
              ]),
              makeUsage('Começar uma ação ou pôr-se a caminho com sich', 'Start an action or set off with sich', 'Em expressões reflexivas, sich machen pode indicar que alguém começa uma tarefa ou sai em direção a algum lugar.', 'In reflexive expressions, sich machen can mean starting a task or setting off somewhere.', [
                makeExample('Wir machen uns auf den Weg.', 'Pomo-nos a caminho.', 'We set off.'),
                makeExample('Sie macht sich an die Arbeit.', 'Ela começa a trabalhar.', 'She gets to work.'),
                makeExample('Er macht sich daran, das Problem zu lösen.', 'Ele começa a resolver o problema.', 'He sets about solving the problem.')
              ]),
              makeUsage('Falar de desenvolvimento ou impressão', 'Talk about progress or appearance', 'sich gut machen descreve alguém ou algo que está indo bem ou causando uma boa impressão.', 'sich gut machen describes someone or something doing well or making a good impression.', [
                makeExample('Der neue Schüler macht sich gut im Unterricht.', 'O aluno novo está indo bem na aula.', 'The new student is doing well in class.'),
                makeExample('Das Kleid macht sich gut auf dem Foto.', 'O vestido fica bem na foto.', 'The dress looks good in the photo.')
              ]),
              makeUsage('Transformar alguém em algo', 'Turn someone into something', 'A estrutura machen + acusativo + zu pode expressar que alguém ou algo transforma uma pessoa em determinada coisa.', 'The structure machen + accusative + zu can express turning someone into something.', [
                makeExample('Die Ausbildung macht ihn zum Koch.', 'A formação o transforma em cozinheiro.', 'The training makes him a cook.')
              ]),
              makeUsage('Usar lassen para deixar ou mandar fazer', 'Use lassen to let or have something done', 'Para permitir que alguém faça algo ou mandar fazer um serviço, lassen vem conjugado e o outro verbo fica no infinitivo no final.', 'To let someone do something or have a service done, conjugate lassen and put the other verb as an infinitive at the end.', [
                makeExample('Lass mich das machen.', 'Deixe-me fazer isso.', 'Let me do that.'),
                makeExample('Ich lasse das Auto reparieren.', 'Mando consertar o carro.', 'I am having the car repaired.')
              ]),
              makeUsage('Expressões fixas do dia a dia', 'Everyday fixed expressions', 'Estas combinações são muito frequentes. Das macht Sinn é comum; Sinn ergeben também é uma forma bastante usada para “fazer sentido”.', 'These combinations are very common. Das macht Sinn is common; Sinn ergeben is also widely used for “make sense”.', [
                makeExample('Das macht nichts.', 'Não tem problema.', 'It does not matter.'),
                makeExample('Mach dir keine Sorgen.', 'Não se preocupe.', 'Do not worry.'),
                makeExample('Das macht Spaß.', 'Isso é divertido.', 'That is fun.'),
                makeExample('Das macht Sinn.', 'Isso faz sentido.', 'That makes sense.'),
                makeExample('Mach weiter! Mach’s gut!', 'Continue! Fique bem!', 'Keep going! Take care!')
              ])
            ]
          ),
          makeVerb(
            'spielen', 'jogar · tocar um instrumento', 'to play · to play an instrument',
            'É regular: mantenha spiel- e acrescente as mesmas seis terminações do presente.',
            'It is regular: keep spiel- and add the same six present-tense endings.',
            ['spiele', 'spielst', 'spielt', 'spielen', 'spielt', 'spielen'],
            'Die Kinder spielen draußen.',
            'As crianças brincam lá fora.', 'The children play outside.',
            [
              makeUsage('Brincar ou jogar jogos', 'Play or play games', 'spielen descreve brincadeiras e jogos. Use mit + dativo para dizer com quem alguém brinca.', 'spielen describes play and games. Use mit + dative to say who someone is playing with.', [
                makeExample('Die Kinder spielen im Garten.', 'As crianças brincam no jardim.', 'The children play in the garden.'),
                makeExample('Ich spiele mit meinem Bruder Karten.', 'Jogo cartas com meu irmão.', 'I play cards with my brother.'),
                makeExample('Spielst du Schach?', 'Você joga xadrez?', 'Do you play chess?')
              ]),
              makeUsage('Praticar um esporte', 'Play a sport', 'Use spielen com o nome do esporte, sem artigo na maioria das expressões.', 'Use spielen with the name of the sport, usually without an article.', [
                makeExample('Sie spielt Fußball.', 'Ela joga futebol.', 'She plays soccer.'),
                makeExample('Er spielt Tennis.', 'Ele joga tênis.', 'He plays tennis.')
              ]),
              makeUsage('Tocar um instrumento', 'Play an instrument', 'spielen + nome do instrumento expressa tocar. Em geral, o instrumento aparece sem artigo.', 'spielen + instrument name means to play it. The instrument usually appears without an article.', [
                makeExample('Ich spiele Gitarre.', 'Eu toco violão/guitarra.', 'I play the guitar.'),
                makeExample('Kannst du Klavier spielen?', 'Você sabe tocar piano?', 'Can you play the piano?')
              ]),
              makeUsage('Atuar ou interpretar um papel', 'Act or play a role', 'spielen pode significar interpretar uma personagem ou atuar em um filme ou peça.', 'spielen can mean portraying a character or acting in a film or play.', [
                makeExample('Er spielt einen König.', 'Ele interpreta um rei.', 'He plays a king.'),
                makeExample('Sie spielt in einem Film.', 'Ela atua em um filme.', 'She acts in a film.')
              ]),
              makeUsage('Falar de uma obra ou música em exibição', 'Talk about a film, play or music being on', 'Der Film spielt in Berlin quer dizer que a história se passa em Berlim. Para música no rádio, spielen também pode indicar o que a banda está tocando.', 'Der Film spielt in Berlin means the story is set in Berlin. For radio music, spielen can also describe what a band is playing.', [
                makeExample('Der Film spielt in Berlin.', 'O filme se passa em Berlim.', 'The film is set in Berlin.'),
                makeExample('Die Band spielt heute im Radio.', 'A banda toca no rádio hoje.', 'The band plays on the radio today.')
              ]),
              makeUsage('Dizer que algo tem importância', 'Say that something matters', 'A expressão eine Rolle spielen significa desempenhar um papel ou ter importância.', 'The expression eine Rolle spielen means to play a role or matter.', [
                makeExample('Das spielt eine große Rolle.', 'Isso tem um papel importante.', 'That plays an important role.'),
                makeExample('Geld spielt keine Rolle.', 'Dinheiro não importa.', 'Money does not matter.')
              ]),
              makeUsage('Usar mit, gegen ou um em jogos', 'Use mit, gegen or um in games', 'mit indica companhia; gegen indica o adversário; um + acusativo indica o prêmio ou o dinheiro em disputa.', 'mit indicates company; gegen indicates the opponent; um + accusative indicates the prize or money at stake.', [
                makeExample('Wir spielen gegen eine gute Mannschaft.', 'Jogamos contra um bom time.', 'We play against a good team.'),
                makeExample('Sie spielen um einen Preis.', 'Eles jogam por um prêmio.', 'They play for a prize.'),
                makeExample('Er spielt um Geld.', 'Ele joga por dinheiro.', 'He gambles for money.')
              ]),
              makeUsage('Usar em sentido figurado', 'Use figuratively', 'mit dem Feuer spielen significa arriscar-se. mit jemandem spielen pode significar brincar com alguém ou manipulá-lo, conforme o contexto.', 'mit dem Feuer spielen means taking a risk. mit jemandem spielen can mean playing with or manipulating someone, depending on context.', [
                makeExample('Du spielst mit dem Feuer.', 'Você está brincando com fogo.', 'You are playing with fire.'),
                makeExample('Spiel nicht mit mir.', 'Não brinque comigo.', 'Do not play with me.')
              ])
            ]
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
            id: 'practice',
            interaction: 'streak',
            shuffle: false,
            label: 'Conjugação',
            label_en: 'Conjugation',
            shortLabel: 'as formas do verbo',
            shortLabel_en: 'verb forms',
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
          },
          phrases: {
            id: 'phrases',
            interaction: 'streak',
            shuffle: true,
            label: 'Treino de frases',
            label_en: 'Sentence practice',
            shortLabel: 'use os verbos em contexto',
            shortLabel_en: 'use verbs in context',
            title: 'Traduza as frases para o alemão',
            title_en: 'Translate the sentences into German',
            instruction: 'Use lernen, machen e spielen com palavras simples do dia a dia. As frases aparecem em ordem aleatória.',
            instruction_en: 'Use lernen, machen and spielen with simple everyday words. Sentences appear in random order.',
            inputLabel: 'Sua resposta em alemão',
            inputLabel_en: 'Your answer in German',
            checkLabel: 'Conferir frase',
            checkLabel_en: 'Check sentence',
            nextLabel: 'Próxima frase',
            nextLabel_en: 'Next sentence',
            restartLabel: 'Recomeçar as 75 frases',
            restartLabel_en: 'Restart all 75 sentences',
            completedCopy: 'Você praticou as 75 frases, com 25 para cada verbo.',
            completedCopy_en: 'You practiced all 75 sentences, with 25 for each verb.',
            items: phraseExercises
          }
        }
      }
    }
  };
}());
