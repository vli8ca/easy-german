(function () {
  'use strict';

  const lessons = [
    {
      id: 'pronunciation', number: 1, title: 'Pronúncia e leitura',
      description: 'Aprenda os sons que você vai ouvir todos os dias e ganhe segurança para ler suas primeiras palavras.',
      duration: '18 min', focus: 'Ouvir e reconhecer',
      introduction: 'O alemão fica muito mais fácil quando você para de tentar adivinhar os sons. Nesta aula, vamos criar um mapa de pronúncia prático: observe a combinação, ouça a palavra e repita em voz alta.',
      objectives: ['Reconhecer ä, ö, ü e ß', 'Ler combinações frequentes', 'Usar o áudio para treinar o ouvido'],
      sections: [
        { type: 'soundGrid', title: 'Os quatro sons especiais', lede: 'Eles não são enfeites: mudam a pronúncia e às vezes mudam o significado da palavra.', items: [
          { symbol: 'ä', title: 'ä / Ä', pronunciation: 'parecido com “é” aberto', example: 'Mädchen', translation: 'menina' },
          { symbol: 'ö', title: 'ö / Ö', pronunciation: 'faça “ê” com os lábios de “ô”', example: 'schön', translation: 'bonito / bonita' },
          { symbol: 'ü', title: 'ü / Ü', pronunciation: 'faça “i” com os lábios de “u”', example: 'müde', translation: 'cansado / cansada' },
          { symbol: 'ß', title: 'ß (Eszett)', pronunciation: 'soa como “ss”', example: 'Straße', translation: 'rua' }
        ]},
        { type: 'table', title: 'Combinações que aparecem o tempo todo', lede: 'Use estas aproximações apenas como ponto de partida. O botão Ouvir mostra o som real em alemão.', headers: ['Escrita', 'Som aproximado', 'Exemplo', 'Tradução'], rows: [
          ['ch', 'um sopro suave', 'ich', 'eu'], ['sch', '“x”', 'Schule', 'escola'], ['sp', '“xp” no início', 'Sport', 'esporte'], ['st', '“x t” no início', 'Stein', 'pedra'], ['z', '“ts”', 'Zeit', 'tempo'], ['w', '“v”', 'Wasser', 'água'], ['v', 'geralmente “f”', 'Vater', 'pai'], ['j', '“i”', 'ja', 'sim']
        ]},
        { type: 'table', title: 'Vogais em dupla', lede: 'Estas combinações são ótimos atalhos para ler palavras novas.', headers: ['Combinação', 'Leia como', 'Exemplo', 'Tradução'], rows: [
          ['ei', '“ai”', 'mein', 'meu / minha'], ['ie', '“i” longo', 'Liebe', 'amor'], ['eu', '“ói”', 'Deutsch', 'alemão'], ['äu', '“ói”', 'Häuser', 'casas']
        ]},
        { type: 'examples', title: 'Leia, ouça, repita', lede: 'Clique no alto-falante e repita cada palavra duas vezes.', items: [
          { de: 'Mädchen', pt: 'menina' }, { de: 'schön', pt: 'bonito / bonita' }, { de: 'müde', pt: 'cansado / cansada' }, { de: 'Straße', pt: 'rua' }, { de: 'Deutsch', pt: 'alemão' }, { de: 'Häuser', pt: 'casas' }
        ]}
      ],
      vocabulary: [
        { word: 'die Schule', meaning: 'a escola', example: 'Die Schule ist hier.' }, { word: 'die Straße', meaning: 'a rua', example: 'Die Straße ist lang.' },
        { word: 'das Wasser', meaning: 'a água', example: 'Das Wasser, bitte.' }, { word: 'der Sport', meaning: 'o esporte', example: 'Ich mache Sport.' },
        { word: 'mein', meaning: 'meu / minha', example: 'Das ist mein Buch.' }, { word: 'die Liebe', meaning: 'o amor', example: 'Liebe ist wichtig.' }
      ],
      summary: ['ä, ö e ü têm sons próprios.', 'ß tem som de “ss”.', 'sch soa como “x”; z começa com “ts”.', 'ei soa como “ai”; ie é um “i” longo.', 'Ouvir e repetir é mais importante do que decorar uma aproximação em português.'],
      exercises: [
        { id: 'p1', type: 'multiple', prompt: 'Qual combinação costuma soar como “ai”?', options: ['ie', 'ei', 'eu', 'äu'], answer: 'ei', explanation: 'Em alemão, ei costuma soar como “ai”: mein, Stein, drei.' },
        { id: 'p2', type: 'multiple', prompt: 'Qual palavra começa com o som “x”?', options: ['Vater', 'Schule', 'Zeit', 'Liebe'], answer: 'Schule', explanation: 'sch no início de Schule produz um som parecido com “x”.' },
        { id: 'p3', type: 'multiple', prompt: 'Qual é a pronúncia aproximada de Zeit?', options: ['“zait”', '“ziet”', '“xait”', '“tsait”'], answer: '“tsait”', explanation: 'A letra z alemã começa com “ts”. Zeit significa “tempo”.' },
        { id: 'p4', type: 'translate', prompt: 'Como dizer “água” em alemão? (inclua o artigo)', answer: 'das Wasser', answers: ['das Wasser'], explanation: 'Água é das Wasser. Aprenda o substantivo junto com seu artigo.' }
      ]
    },
    {
      id: 'pronouns', number: 2, title: 'Pronomes pessoais',
      description: 'Descubra quem faz a ação e comece a montar frases sobre você, outras pessoas e o tratamento formal.',
      duration: '20 min', focus: 'Falar sobre pessoas',
      introduction: 'Pronomes são as pequenas palavras que ocupam o lugar de nomes. Eles aparecem antes do verbo e determinam a forma que o verbo vai assumir.',
      objectives: ['Usar os nove pronomes básicos', 'Distinguir sie de Sie', 'Apresentar pessoas com frases simples'],
      sections: [
        { type: 'table', title: 'O mapa dos pronomes', lede: 'O contexto e a letra maiúscula ajudam a entender sie e Sie.', headers: ['Alemão', 'Português', 'Pista rápida'], rows: [
          ['ich', 'eu', 'quem fala'], ['du', 'você (informal)', 'uma pessoa próxima'], ['er', 'ele', 'masculino'], ['sie', 'ela', 'minúsculo'], ['es', 'isso / ele / ela neutro', 'neutro'], ['wir', 'nós', 'ich + outras pessoas'], ['ihr', 'vocês (informal)', 'mais de uma pessoa'], ['sie', 'eles / elas', 'minúsculo'], ['Sie', 'você / vocês (formal)', 'sempre maiúsculo']
        ]},
        { type: 'callout', title: 'Atenção ao “Sie”', text: '<strong>sie</strong> pode significar “ela” ou “eles/elas”. <strong>Sie</strong>, com S maiúsculo, é o tratamento formal. Na fala, o verbo e o contexto ajudam; na escrita, a maiúscula é uma pista importante.' },
        { type: 'examples', title: 'Frases de apresentação', items: [
          { de: 'Ich bin Leonardo.', pt: 'Eu sou Leonardo.' }, { de: 'Du bist hier.', pt: 'Você está aqui.' }, { de: 'Er arbeitet.', pt: 'Ele trabalha.' },
          { de: 'Sie lernt Deutsch.', pt: 'Ela aprende alemão.' }, { de: 'Wir wohnen in Deutschland.', pt: 'Nós moramos na Alemanha.' }, { de: 'Sprechen Sie Deutsch?', pt: 'Você fala alemão? (formal)' }
        ]}
      ],
      vocabulary: [
        { word: 'ich', meaning: 'eu', example: 'Ich lerne Deutsch.' }, { word: 'du', meaning: 'você informal', example: 'Du bist nett.' },
        { word: 'wir', meaning: 'nós', example: 'Wir wohnen hier.' }, { word: 'ihr', meaning: 'vocês informal', example: 'Ihr seid pünktlich.' },
        { word: 'sie', meaning: 'ela / eles / elas', example: 'Sie arbeitet heute.' }, { word: 'Sie', meaning: 'você / vocês formal', example: 'Wie heißen Sie?' }
      ],
      summary: ['ich significa “eu”; du é “você” informal.', 'er, sie e es significam ele, ela e neutro.', 'sie minúsculo pode ser ela ou eles/elas.', 'Sie maiúsculo é formal e pede verbo no plural.', 'O pronome vem normalmente antes do verbo em uma frase simples.'],
      exercises: [
        { id: 'pr1', type: 'multiple', prompt: '___ lernt Deutsch. (ela)', options: ['Er', 'Sie', 'Wir', 'Ihr'], answer: 'Sie', explanation: '“Ela” é sie. No início da frase, aparece como Sie porque toda primeira palavra é maiúscula.' },
        { id: 'pr2', type: 'multiple', prompt: 'Qual pronome significa “nós”?', options: ['ihr', 'sie', 'wir', 'du'], answer: 'wir', explanation: 'wir significa “nós”.' },
        { id: 'pr3', type: 'fill', prompt: 'Complete: ___ bin Leonardo. (eu)', answer: 'ich', explanation: 'A primeira pessoa do singular é ich: Ich bin Leonardo.' },
        { id: 'pr4', type: 'translate', prompt: 'Traduza para o alemão: “Nós moramos na Alemanha.”', answers: ['Wir wohnen in Deutschland.', 'wir wohnen in deutschland'], answer: 'Wir wohnen in Deutschland.', explanation: 'wir = nós, wohnen = moramos / morar e Deutschland = Alemanha.' }
      ]
    },
    {
      id: 'sein-haben', number: 3, title: 'Sein e haben',
      description: 'Domine os dois verbos mais importantes do alemão: ser/estar e ter, com frases úteis desde o primeiro dia.',
      duration: '24 min', focus: 'Bin, bist, habe',
      introduction: 'Sein e haben aparecem em apresentações, descrições, necessidades e situações do cotidiano. Vale aprender suas formas de cor, sempre ligadas a uma frase curta.',
      objectives: ['Conjugar sein no presente', 'Conjugar haben no presente', 'Descrever estados e necessidades'],
      sections: [
        { type: 'table', title: 'SEIN — ser / estar', headers: ['Pronome', 'Forma', 'Exemplo'], rows: [
          ['ich', 'bin', 'Ich bin müde.'], ['du', 'bist', 'Du bist nett.'], ['er / sie / es', 'ist', 'Er ist im Büro.'], ['wir', 'sind', 'Wir sind hier.'], ['ihr', 'seid', 'Ihr seid pünktlich.'], ['sie / Sie', 'sind', 'Sie sind freundlich.']
        ]},
        { type: 'table', title: 'HABEN — ter', headers: ['Pronome', 'Forma', 'Exemplo'], rows: [
          ['ich', 'habe', 'Ich habe Zeit.'], ['du', 'hast', 'Du hast ein Auto.'], ['er / sie / es', 'hat', 'Er hat eine Frage.'], ['wir', 'haben', 'Wir haben Arbeit.'], ['ihr', 'habt', 'Ihr habt Hunger.'], ['sie / Sie', 'haben', 'Sie haben Zeit.']
        ]},
        { type: 'examples', title: 'Frases que você vai usar', lede: 'Ouça a frase completa. O ritmo ajuda a fixar a forma do verbo.', items: [
          { de: 'Ich bin müde.', pt: 'Estou cansado / cansada.' }, { de: 'Ich bin glücklich.', pt: 'Estou feliz.' }, { de: 'Ich bin zu Hause.', pt: 'Estou em casa.' },
          { de: 'Du bist nett.', pt: 'Você é gentil.' }, { de: 'Er ist im Büro.', pt: 'Ele está no escritório.' }, { de: 'Ich habe Zeit.', pt: 'Eu tenho tempo.' },
          { de: 'Ich habe Hunger.', pt: 'Estou com fome.' }, { de: 'Du hast ein Auto.', pt: 'Você tem um carro.' }, { de: 'Er hat eine Frage.', pt: 'Ele tem uma pergunta.' }, { de: 'Wir haben Arbeit.', pt: 'Nós temos trabalho.' }
        ]},
        { type: 'callout', title: 'Uma pista para lembrar', text: 'As formas de <strong>sein</strong> são mais irregulares: bin, bist, ist, sind, seid. Já <strong>haben</strong> mantém “hab-” na maior parte da conjugação, mas muda para hast e hat no singular.' }
      ],
      vocabulary: [
        { word: 'müde', meaning: 'cansado / cansada', example: 'Ich bin müde.' }, { word: 'glücklich', meaning: 'feliz', example: 'Sie ist glücklich.' },
        { word: 'zu Hause', meaning: 'em casa', example: 'Wir sind zu Hause.' }, { word: 'Zeit', meaning: 'tempo', example: 'Ich habe Zeit.' },
        { word: 'Hunger', meaning: 'fome', example: 'Ich habe Hunger.' }, { word: 'die Frage', meaning: 'a pergunta', example: 'Ich habe eine Frage.' }
      ],
      summary: ['bin, bist, ist, sind, seid são formas de sein.', 'habe, hast, hat, haben, habt são formas de haben.', 'Em alemão, fome e tempo são expressos com haben.', 'Aprenda a forma do verbo junto com uma frase curta.', 'O verbo muda de acordo com o pronome.'],
      exercises: [
        { id: 'sh1', type: 'multiple', prompt: 'Ich ___ müde.', options: ['bin', 'bist', 'ist', 'sind'], answer: 'bin', explanation: 'Com ich, sein vira bin: Ich bin müde.' },
        { id: 'sh2', type: 'multiple', prompt: 'Du ___ nett.', options: ['bin', 'bist', 'ist', 'seid'], answer: 'bist', explanation: 'Com du, usamos bist.' },
        { id: 'sh3', type: 'multiple', prompt: 'Er ___ im Büro.', options: ['bin', 'bist', 'ist', 'sind'], answer: 'ist', explanation: 'er/sie/es usa ist.' },
        { id: 'sh4', type: 'multiple', prompt: 'Wir ___ hier.', options: ['ist', 'seid', 'sind', 'bin'], answer: 'sind', explanation: 'wir usa sind.' },
        { id: 'sh5', type: 'multiple', prompt: 'Ihr ___ pünktlich.', options: ['sind', 'seid', 'ist', 'habt'], answer: 'seid', explanation: 'ihr usa seid.' },
        { id: 'sh6', type: 'multiple', prompt: 'Ich ___ Zeit.', options: ['hat', 'hast', 'habe', 'haben'], answer: 'habe', explanation: 'Com ich, haben vira habe.' },
        { id: 'sh7', type: 'multiple', prompt: 'Du ___ ein Auto.', options: ['habe', 'hast', 'hat', 'habt'], answer: 'hast', explanation: 'du usa hast.' },
        { id: 'sh8', type: 'multiple', prompt: 'Er ___ eine Frage.', options: ['hat', 'hast', 'haben', 'habe'], answer: 'hat', explanation: 'er/sie/es usa hat.' },
        { id: 'sh9', type: 'multiple', prompt: 'Wir ___ Arbeit.', options: ['habt', 'hat', 'haben', 'habe'], answer: 'haben', explanation: 'wir usa haben.' },
        { id: 'sh10', type: 'translate', prompt: 'Traduza: “Eu estou em casa.”', answers: ['Ich bin zu Hause.', 'ich bin zu hause'], answer: 'Ich bin zu Hause.', explanation: 'A frase é Ich bin zu Hause. Zu Hause é a expressão “em casa”.' }
      ]
    },
    {
      id: 'sentence-structure', number: 4, title: 'Estrutura básica das frases',
      description: 'Entenda a posição 2 do verbo e construa frases claras mesmo quando você começa com hoje, amanhã ou outro elemento.',
      duration: '20 min', focus: 'Verbo na posição 2',
      introduction: 'A frase alemã fica previsível quando você encontra o verbo conjugado. Em uma declaração, ele costuma ocupar a segunda posição — o segundo elemento da frase, não necessariamente a segunda palavra.',
      objectives: ['Identificar o verbo conjugado', 'Montar frases declarativas', 'Começar frases com tempo ou lugar'],
      sections: [
        { type: 'rule', title: 'A regra que organiza a frase', segments: ['Posição 1', 'VERBO', 'Resto da frase'], verbIndex: 1, caption: 'O verbo conjugado normalmente fica no segundo elemento.' },
        { type: 'examples', title: 'Sujeito primeiro', items: [
          { de: 'Ich arbeite bei Bosch.', pt: 'Eu trabalho na Bosch.', note: 'Ich = posição 1 · arbeite = verbo' }, { de: 'Ich lerne Deutsch.', pt: 'Eu aprendo alemão.' }, { de: 'Ich wohne in Stuttgart.', pt: 'Eu moro em Stuttgart.' }
        ]},
        { type: 'examples', title: 'Outro elemento primeiro', lede: 'Quando Hoje ocupa a posição 1, o sujeito vai depois do verbo.', items: [
          { de: 'Heute arbeite ich.', pt: 'Hoje eu trabalho.', note: 'Heute = posição 1 · arbeite = verbo · ich = sujeito' }, { de: 'Heute lerne ich Deutsch.', pt: 'Hoje eu aprendo alemão.' }, { de: 'Am Montag arbeite ich.', pt: 'Na segunda-feira eu trabalho.' }
        ]},
        { type: 'callout', title: 'Segundo elemento, não segunda palavra', text: 'Em <strong>Am Montag arbeite ich</strong>, “Am Montag” funciona como um bloco de tempo. Por isso, arbeite continua na posição 2, mesmo aparecendo como a terceira palavra.' }
      ],
      vocabulary: [
        { word: 'heute', meaning: 'hoje', example: 'Heute lerne ich.' }, { word: 'am Montag', meaning: 'na segunda-feira', example: 'Am Montag arbeite ich.' },
        { word: 'arbeiten', meaning: 'trabalhar', example: 'Ich arbeite bei Bosch.' }, { word: 'lernen', meaning: 'aprender', example: 'Ich lerne Deutsch.' },
        { word: 'wohnen', meaning: 'morar', example: 'Ich wohne in Stuttgart.' }, { word: 'bei', meaning: 'em / na (empresa)', example: 'bei Bosch' }
      ],
      summary: ['Uma declaração costuma ter o verbo conjugado na posição 2.', 'Posição 2 é o segundo elemento sintático.', 'O sujeito pode vir depois do verbo.', 'Hoje = heute; na segunda-feira = am Montag.', 'Não traduza a ordem do português palavra por palavra.'],
      exercises: [
        { id: 'st1', type: 'order', prompt: 'Ordene as palavras: Deutsch / ich / lerne', answer: ['Ich', 'lerne', 'Deutsch'], explanation: 'A frase fica Ich lerne Deutsch. O verbo lerne ocupa a posição 2.' },
        { id: 'st2', type: 'order', prompt: 'Ordene as palavras: Heute / ich / arbeite', answer: ['Heute', 'arbeite', 'ich'], explanation: 'Heute é o primeiro elemento; arbeite permanece na posição 2.' },
        { id: 'st3', type: 'multiple', prompt: 'Qual frase está correta?', options: ['Heute ich lerne Deutsch.', 'Heute lerne ich Deutsch.', 'Heute Deutsch ich lerne.', 'Lerne heute ich Deutsch.'], answer: 'Heute lerne ich Deutsch.', explanation: 'Depois de Hoje, vem o verbo conjugado: Heute lerne ich Deutsch.' },
        { id: 'st4', type: 'truefalse', prompt: 'Verdadeiro ou falso: na frase alemã, o verbo conjugado precisa ser sempre a segunda palavra.', options: ['Verdadeiro', 'Falso'], answer: 'Falso', explanation: 'Ele costuma ser o segundo elemento. Um bloco como Am Montag pode ter duas palavras e ocupar a posição 1.' }
      ]
    },
    {
      id: 'questions', number: 5, title: 'Perguntas em alemão',
      description: 'Aprenda as palavras interrogativas essenciais e monte perguntas que resolvem situações reais na Alemanha.',
      duration: '21 min', focus: 'Perguntar e entender',
      introduction: 'Fazer uma boa pergunta é uma das formas mais rápidas de ganhar autonomia. Primeiro, reconheça a palavra interrogativa; depois, deixe o verbo fazer o trabalho.',
      objectives: ['Reconhecer as principais W-Fragen', 'Perguntar sobre lugares, preços e horários', 'Usar frases de sobrevivência'],
      sections: [
        { type: 'table', title: 'As palavras que abrem portas', headers: ['Pergunta', 'Significado', 'Exemplo'], rows: [
          ['Was?', 'o quê?', 'Was ist das?'], ['Wer?', 'quem?', 'Wer ist das?'], ['Wo?', 'onde?', 'Wo ist der Bahnhof?'], ['Woher?', 'de onde?', 'Woher kommst du?'], ['Wohin?', 'para onde?', 'Wohin gehst du?'], ['Wann?', 'quando?', 'Wann kommt der Zug?'], ['Warum?', 'por quê?', 'Warum lernst du Deutsch?'], ['Wie?', 'como?', 'Wie heißt du?'], ['Wie viel?', 'quanto?', 'Wie viel kostet das?'], ['Wie lange?', 'quanto tempo?', 'Wie lange dauert das?']
        ]},
        { type: 'examples', title: 'Perguntas úteis de verdade', items: [
          { de: 'Wo ist der Bahnhof?', pt: 'Onde fica a estação de trem?' }, { de: 'Wie viel kostet das?', pt: 'Quanto custa isso?' }, { de: 'Wann kommt der Zug?', pt: 'Quando chega o trem?' }, { de: 'Woher kommst du?', pt: 'De onde você vem?' }, { de: 'Warum lernst du Deutsch?', pt: 'Por que você aprende alemão?' }, { de: 'Wie heißt du?', pt: 'Como você se chama?' }, { de: 'Sprechen Sie Englisch?', pt: 'Você fala inglês? (formal)' }
        ]},
        { type: 'scenario', title: 'Frases de bolso', scenarios: [
          { icon: 'life-buoy', title: 'Quando precisar de ajuda', phrases: ['Entschuldigung, wo ist der Bahnhof?', 'Können Sie mir helfen?', 'Sprechen Sie Englisch?'] },
          { icon: 'credit-card', title: 'Quando for pagar', phrases: ['Wie viel kostet das?', 'Kann ich mit Karte bezahlen?'] }
        ]}
      ],
      vocabulary: [
        { word: 'der Bahnhof', meaning: 'a estação de trem', example: 'Wo ist der Bahnhof?' }, { word: 'der Zug', meaning: 'o trem', example: 'Wann kommt der Zug?' },
        { word: 'wie viel', meaning: 'quanto', example: 'Wie viel kostet das?' }, { word: 'warum', meaning: 'por quê', example: 'Warum lernst du Deutsch?' },
        { word: 'helfen', meaning: 'ajudar', example: 'Können Sie mir helfen?' }, { word: 'bezahlen', meaning: 'pagar', example: 'Kann ich mit Karte bezahlen?' }
      ],
      summary: ['Wo pergunta por lugar; wohin pergunta destino.', 'Woher pergunta origem.', 'Wie viel é usado para perguntar preços e quantidades.', 'Entschuldigung é uma forma educada de chamar alguém.', 'Perguntas formais usam Sie.'],
      exercises: [
        { id: 'q1', type: 'multiple', prompt: '___ ist der Bahnhof? (onde)', options: ['Was', 'Wo', 'Wann', 'Warum'], answer: 'Wo', explanation: 'Wo significa “onde”.' },
        { id: 'q2', type: 'multiple', prompt: '___ kostet das? (quanto)', options: ['Wie viel', 'Woher', 'Wer', 'Wie lange'], answer: 'Wie viel', explanation: 'Wie viel significa “quanto” e aparece muito em perguntas de preço.' },
        { id: 'q3', type: 'multiple', prompt: '___ kommt der Zug? (quando)', options: ['Warum', 'Wohin', 'Wann', 'Was'], answer: 'Wann', explanation: 'Wann pergunta “quando”.' },
        { id: 'q4', type: 'translate', prompt: 'Traduza: “Você fala inglês?” (formal)', answers: ['Sprechen Sie Englisch?', 'sprechen sie englisch'], answer: 'Sprechen Sie Englisch?', explanation: 'Com Sie formal, a pergunta fica Sprechen Sie Englisch?' }
      ]
    },
    {
      id: 'present-verbs', number: 6, title: 'Verbos no presente',
      description: 'Use a lógica dos verbos regulares para falar sobre trabalho, estudo, moradia, compras e rotina.',
      duration: '24 min', focus: 'Ações do dia a dia',
      introduction: 'A maioria dos verbos regulares segue um padrão claro. Retire -en para encontrar o radical e acrescente a terminação correspondente ao pronome.',
      objectives: ['Encontrar o radical do verbo', 'Conjugar machen e verbos frequentes', 'Falar sobre sua rotina'],
      sections: [
        { type: 'rule', title: 'machen como modelo', segments: ['mach-', 'terminação', 'frase'], verbIndex: 0, caption: 'Radical + terminação. No presente, a terminação acompanha o pronome.' },
        { type: 'table', title: 'As terminações regulares', headers: ['Pronome', 'Final', 'machen'], rows: [
          ['ich', '-e', 'ich mache'], ['du', '-st', 'du machst'], ['er / sie / es', '-t', 'er macht'], ['wir', '-en', 'wir machen'], ['ihr', '-t', 'ihr macht'], ['sie / Sie', '-en', 'sie machen']
        ]},
        { type: 'table', title: 'Verbos para sua primeira semana', headers: ['Infinitivo', 'Significado', 'Exemplo'], rows: [
          ['machen', 'fazer', 'Ich mache Sport.'], ['arbeiten', 'trabalhar', 'Ich arbeite heute.'], ['lernen', 'aprender', 'Wir lernen Deutsch.'], ['wohnen', 'morar', 'Ich wohne in Stuttgart.'], ['kommen', 'vir', 'Ich komme aus Brasilien.'], ['kaufen', 'comprar', 'Wir kaufen Brot.'], ['brauchen', 'precisar', 'Ich brauche Hilfe.'], ['spielen', 'jogar / brincar', 'Die Kinder spielen.'], ['fragen', 'perguntar', 'Ich frage den Lehrer.']
        ]},
        { type: 'callout', title: 'Pequena atenção', text: 'Verbos cujo radical termina em -t ou -d podem ganhar um “e” de apoio em algumas formas: <strong>arbeiten → du arbeitest</strong>. Não tente aplicar o padrão de forma mecânica a todos os verbos.' }
      ],
      vocabulary: [
        { word: 'machen', meaning: 'fazer', example: 'Was machst du?' }, { word: 'arbeiten', meaning: 'trabalhar', example: 'Ich arbeite bei Bosch.' },
        { word: 'lernen', meaning: 'aprender', example: 'Ich lerne Deutsch.' }, { word: 'wohnen', meaning: 'morar', example: 'Wir wohnen in Deutschland.' },
        { word: 'kaufen', meaning: 'comprar', example: 'Ich kaufe Brot.' }, { word: 'brauchen', meaning: 'precisar', example: 'Ich brauche Hilfe.' }
      ],
      summary: ['Retire -en para encontrar o radical de um verbo regular.', 'ich recebe -e; du recebe -st.', 'er/sie/es recebe -t; ihr também recebe -t.', 'wir e sie/Sie recebem -en.', 'Alguns radicais pedem um “e” de apoio, como arbeiten.'],
      exercises: [
        { id: 'v1', type: 'fill', prompt: 'Ich ___ Deutsch. (lernen)', answer: 'lerne', explanation: 'ich recebe a terminação -e: lernen → ich lerne.' },
        { id: 'v2', type: 'fill', prompt: 'Du ___ in Berlin. (wohnen)', answer: 'wohnst', explanation: 'du recebe -st: wohnen → du wohnst.' },
        { id: 'v3', type: 'fill', prompt: 'Er ___ bei Bosch. (arbeiten)', answer: 'arbeitet', explanation: 'arbeiten tem um “e” de apoio: er arbeitet.' },
        { id: 'v4', type: 'multiple', prompt: 'Qual é a forma correta para wir + machen?', options: ['wir macht', 'wir machen', 'wir machst', 'wir mache'], answer: 'wir machen', explanation: 'wir recebe -en: wir machen.' },
        { id: 'v5', type: 'translate', prompt: 'Traduza: “Eu preciso de ajuda.”', answers: ['Ich brauche Hilfe.', 'ich brauche hilfe'], answer: 'Ich brauche Hilfe.', explanation: 'brauchen → ich brauche; Hilfe é ajuda.' }
      ]
    },
    {
      id: 'articles', number: 7, title: 'Artigos e gênero',
      description: 'Aprenda a tratar cada substantivo como um conjunto: artigo + palavra. Isso deixa sua fala muito mais natural.',
      duration: '22 min', focus: 'Der, die, das',
      introduction: 'Todo substantivo alemão tem gênero gramatical. Para quem fala português, a melhor estratégia é nunca memorizar a palavra sozinha: aprenda der Tisch, die Stadt, das Haus.',
      objectives: ['Reconhecer os artigos definidos', 'Usar ein e eine', 'Memorizar substantivos com artigo'],
      sections: [
        { type: 'table', title: 'Os artigos definidos', headers: ['Artigo', 'Gênero / número', 'Exemplo'], rows: [
          ['der', 'masculino', 'der Mann · o homem'], ['die', 'feminino', 'die Frau · a mulher'], ['das', 'neutro', 'das Auto · o carro'], ['die', 'plural', 'die Kinder · as crianças']
        ]},
        { type: 'scenario', title: 'Vocabulário agrupado', scenarios: [
          { icon: 'user-round', title: 'Masculino · der', phrases: ['der Mann — o homem', 'der Tisch — a mesa', 'der Bahnhof — a estação', 'der Zug — o trem'] },
          { icon: 'user-round', title: 'Feminino · die', phrases: ['die Frau — a mulher', 'die Stadt — a cidade', 'die Arbeit — o trabalho', 'die Schule — a escola'] },
          { icon: 'box', title: 'Neutro · das', phrases: ['das Auto — o carro', 'das Haus — a casa', 'das Kind — a criança', 'das Wasser — a água'] }
        ]},
        { type: 'table', title: 'Um / uma', lede: 'O artigo indefinido acompanha o gênero. No plural, não existe um equivalente direto de “um/uma”.', headers: ['Definido', 'Indefinido', 'Exemplo'], rows: [
          ['der', 'ein', 'ein Mann'], ['die', 'eine', 'eine Frau'], ['das', 'ein', 'ein Auto']
        ]},
        { type: 'callout', title: 'A regra de ouro', text: 'Não memorize <strong>Tisch = mesa</strong>. Memorize <strong>der Tisch = a mesa</strong>. O artigo faz parte da palavra e vai ajudar você nas próximas aulas.' }
      ],
      vocabulary: [
        { word: 'der Mann', meaning: 'o homem', example: 'Der Mann ist hier.' }, { word: 'die Frau', meaning: 'a mulher', example: 'Die Frau arbeitet.' },
        { word: 'das Kind', meaning: 'a criança', example: 'Das Kind lernt.' }, { word: 'der Tisch', meaning: 'a mesa', example: 'Der Tisch ist groß.' },
        { word: 'die Stadt', meaning: 'a cidade', example: 'Die Stadt ist schön.' }, { word: 'das Haus', meaning: 'a casa', example: 'Das Haus ist neu.' }
      ],
      summary: ['der é masculino; die é feminino e plural; das é neutro.', 'O gênero alemão nem sempre coincide com o gênero em português.', 'Aprenda substantivos com artigo.', 'ein acompanha der e das; eine acompanha die.', 'O plural usa die no artigo definido.'],
      exercises: [
        { id: 'a1', type: 'multiple', prompt: '___ Auto', options: ['der', 'die', 'das'], answer: 'das', explanation: 'Carro é das Auto.' },
        { id: 'a2', type: 'multiple', prompt: '___ Frau', options: ['der', 'die', 'das'], answer: 'die', explanation: 'Mulher é die Frau.' },
        { id: 'a3', type: 'multiple', prompt: '___ Bahnhof', options: ['der', 'die', 'das'], answer: 'der', explanation: 'Estação de trem é der Bahnhof.' },
        { id: 'a4', type: 'multiple', prompt: 'Qual forma significa “uma casa”?', options: ['ein Haus', 'eine Haus', 'der Haus', 'ein Hause'], answer: 'ein Haus', explanation: 'Haus é neutro, então usamos ein Haus.' },
        { id: 'a5', type: 'translate', prompt: 'Traduza: “a escola”', answers: ['die Schule'], answer: 'die Schule', explanation: 'Escola é die Schule. Guarde o artigo junto.' }
      ]
    },
    {
      id: 'negation', number: 8, title: 'Negação: nicht e kein',
      description: 'Diga que algo não acontece, não é caro ou que você não tem alguma coisa sem travar na hora de falar.',
      duration: '19 min', focus: 'Dizer “não”',
      introduction: 'Em alemão, há dois caminhos principais para negar. Pense primeiro no que você está negando: uma ação ou característica pede nicht; um substantivo sem artigo definido pede kein.',
      objectives: ['Usar nicht para ações e adjetivos', 'Usar kein para substantivos', 'Negar frases do cotidiano'],
      sections: [
        { type: 'compare', title: 'nicht × kein', items: [
          { label: 'nicht', color: 'coral', description: 'nega uma ação, adjetivo ou frase inteira', examples: ['Ich verstehe nicht. — Eu não entendo.', 'Das ist nicht teuer. — Isso não é caro.'] },
          { label: 'kein', color: 'teal', description: 'nega um substantivo: nenhum / nenhuma / não ter', examples: ['Ich habe kein Auto. — Eu não tenho carro.', 'Ich habe keine Zeit. — Eu não tenho tempo.'] }
        ]},
        { type: 'examples', title: 'Compare no contexto', items: [
          { de: 'Ich arbeite heute nicht.', pt: 'Eu não trabalho hoje.', note: 'não + ação' }, { de: 'Ich verstehe nicht.', pt: 'Eu não entendo.', note: 'não + ação' }, { de: 'Das ist nicht teuer.', pt: 'Isso não é caro.', note: 'não + adjetivo' }, { de: 'Das ist kein Problem.', pt: 'Isso não é um problema.', note: 'kein + substantivo' }, { de: 'Ich habe keine Zeit.', pt: 'Eu não tenho tempo.', note: 'keine + substantivo' }
        ]},
        { type: 'callout', title: 'Uma primeira aproximação segura', text: 'Se você está negando a existência ou posse de uma coisa, use <strong>kein</strong>: Ich habe kein Auto. Se está negando o que alguém faz ou uma qualidade, use <strong>nicht</strong>: Ich arbeite nicht.' }
      ],
      vocabulary: [
        { word: 'nicht', meaning: 'não', example: 'Ich verstehe nicht.' }, { word: 'kein', meaning: 'nenhum / não um', example: 'Kein Problem!' },
        { word: 'keine Zeit', meaning: 'sem tempo', example: 'Ich habe keine Zeit.' }, { word: 'teuer', meaning: 'caro', example: 'Das ist nicht teuer.' },
        { word: 'verstehen', meaning: 'entender', example: 'Ich verstehe Deutsch.' }, { word: 'das Problem', meaning: 'o problema', example: 'Das ist kein Problem.' }
      ],
      summary: ['nicht nega ações, adjetivos ou a frase.', 'kein nega um substantivo.', 'kein acompanha palavras de gênero neutro e masculino no básico.', 'keine aparece com palavras femininas e no plural.', 'Aprenda frases inteiras, não apenas a regra isolada.'],
      exercises: [
        { id: 'n1', type: 'multiple', prompt: 'Ich verstehe ___.', options: ['nicht', 'kein', 'keine'], answer: 'nicht', explanation: 'Verstehen é uma ação; usamos nicht.' },
        { id: 'n2', type: 'multiple', prompt: 'Ich habe ___ Auto.', options: ['nicht', 'kein', 'keine'], answer: 'kein', explanation: 'Auto é um substantivo neutro: kein Auto.' },
        { id: 'n3', type: 'multiple', prompt: 'Ich habe ___ Zeit.', options: ['nicht', 'kein', 'keine'], answer: 'keine', explanation: 'Zeit é feminina: keine Zeit.' },
        { id: 'n4', type: 'fill', prompt: 'Das ist ___ teuer. (não)', answer: 'nicht', explanation: 'Teuer é um adjetivo; use nicht.' },
        { id: 'n5', type: 'translate', prompt: 'Traduza: “Isso não é um problema.”', answers: ['Das ist kein Problem.', 'das ist kein problem'], answer: 'Das ist kein Problem.', explanation: 'Problem é neutro e aparece sem artigo definido na expressão: kein Problem.' },
        { id: 'n6', type: 'truefalse', prompt: 'Verdadeiro ou falso: “kein” é usado para negar uma ação.', options: ['Verdadeiro', 'Falso'], answer: 'Falso', explanation: 'kein nega um substantivo. Ações são negadas com nicht.' },
        { id: 'n7', type: 'multiple', prompt: 'Qual frase está correta?', options: ['Ich habe nicht Auto.', 'Ich habe kein Auto.', 'Ich habe keine Auto.', 'Ich kein habe Auto.'], answer: 'Ich habe kein Auto.', explanation: 'Auto é neutro: Ich habe kein Auto.' },
        { id: 'n8', type: 'translate', prompt: 'Traduza: “Eu não trabalho hoje.”', answers: ['Ich arbeite heute nicht.', 'ich arbeite heute nicht'], answer: 'Ich arbeite heute nicht.', explanation: 'Aqui negamos a ação arbeiten, por isso usamos nicht.' }
      ]
    },
    {
      id: 'accusative', number: 9, title: 'Acusativo',
      description: 'Uma introdução tranquila ao objeto direto: perceba por que der muda para den e ein para einen.',
      duration: '22 min', focus: 'Quem faz · o que recebe',
      introduction: 'Você já consegue formar frases. Agora vamos observar o que acontece com a pessoa ou coisa que recebe diretamente a ação. No início, concentre-se na mudança do masculino.',
      objectives: ['Diferenciar sujeito e objeto', 'Reconhecer der → den', 'Usar ein → einen no masculino'],
      sections: [
        { type: 'rule', title: 'Quem faz e quem recebe', segments: ['Quem faz', 'VERBO', 'Objeto direto'], verbIndex: 1, caption: 'Nominativo = quem realiza. Acusativo = objeto direto da ação.' },
        { type: 'table', title: 'A mudança básica', headers: ['Gênero / número', 'Nominativo', 'Acusativo'], rows: [
          ['masculino', 'der', 'den'], ['feminino', 'die', 'die'], ['neutro', 'das', 'das'], ['plural', 'die', 'die']
        ]},
        { type: 'table', title: 'Com o artigo indefinido', headers: ['Gênero', 'Nominativo', 'Acusativo'], rows: [
          ['masculino', 'ein', 'einen'], ['feminino', 'eine', 'eine'], ['neutro', 'ein', 'ein']
        ]},
        { type: 'examples', title: 'Veja a mudança em frases reais', items: [
          { de: 'Der Mann ist hier.', pt: 'O homem está aqui.', note: 'der Mann = sujeito' }, { de: 'Ich sehe den Mann.', pt: 'Eu vejo o homem.', note: 'den Mann = objeto' }, { de: 'Ich kaufe einen Kaffee.', pt: 'Eu compro um café.' }, { de: 'Ich habe einen Termin.', pt: 'Eu tenho um compromisso.' }, { de: 'Ich brauche einen Arzt.', pt: 'Eu preciso de um médico.' }, { de: 'Ich kaufe das Brot.', pt: 'Eu compro o pão.' }, { de: 'Ich sehe die Frau.', pt: 'Eu vejo a mulher.' }
        ]},
        { type: 'callout', title: 'Não tente aprender tudo agora', text: 'Nesta etapa, guarde uma única imagem mental: quando um substantivo masculino recebe diretamente a ação, <strong>der → den</strong> e <strong>ein → einen</strong>. die e das ficam iguais neste quadro básico.' }
      ],
      vocabulary: [
        { word: 'sehen', meaning: 'ver', example: 'Ich sehe den Mann.' }, { word: 'kaufen', meaning: 'comprar', example: 'Ich kaufe einen Kaffee.' },
        { word: 'der Kaffee', meaning: 'o café', example: 'Einen Kaffee, bitte.' }, { word: 'der Termin', meaning: 'o compromisso', example: 'Ich habe einen Termin.' },
        { word: 'der Arzt', meaning: 'o médico', example: 'Ich brauche einen Arzt.' }, { word: 'das Brot', meaning: 'o pão', example: 'Ich kaufe das Brot.' }
      ],
      summary: ['Nominativo é quem faz a ação.', 'Acusativo é o objeto direto.', 'No masculino: der vira den.', 'No masculino: ein vira einen.', 'die e das permanecem iguais nesta introdução.'],
      exercises: [
        { id: 'ac1', type: 'multiple', prompt: 'Ich sehe ___ Mann.', options: ['der', 'den', 'die', 'das'], answer: 'den', explanation: 'Mann recebe a ação de ver: masculino no acusativo = den Mann.' },
        { id: 'ac2', type: 'multiple', prompt: 'Ich kaufe ___ Kaffee.', options: ['ein', 'einen', 'eine', 'der'], answer: 'einen', explanation: 'Kaffee é masculino e é objeto direto: einen Kaffee.' },
        { id: 'ac3', type: 'multiple', prompt: 'Ich sehe ___ Frau.', options: ['der', 'den', 'die', 'das'], answer: 'die', explanation: 'Feminino permanece die no acusativo.' },
        { id: 'ac4', type: 'multiple', prompt: 'Ich kaufe ___ Brot.', options: ['den', 'ein', 'das', 'einen'], answer: 'das', explanation: 'Brot é neutro: das permanece das.' },
        { id: 'ac5', type: 'fill', prompt: 'Ich habe ___ Termin. (ein, masculino)', answer: 'einen', explanation: 'Termin é masculino e objeto direto: einen Termin.' },
        { id: 'ac6', type: 'translate', prompt: 'Traduza: “Eu preciso de um médico.”', answers: ['Ich brauche einen Arzt.', 'ich brauche einen arzt'], answer: 'Ich brauche einen Arzt.', explanation: 'Arzt é masculino e está no acusativo: einen Arzt.' }
      ]
    },
    {
      id: 'modals-real-life', number: 10, title: 'Verbos modais e alemão da vida real',
      description: 'Feche o A1 Starter com kann, muss e möchte — e leve frases prontas para supermercado, restaurante, transporte e trabalho.',
      duration: '28 min', focus: 'Se virar na Alemanha',
      introduction: 'Verbos modais expressam o que você pode, precisa, quer ou gostaria de fazer. Eles deixam suas frases muito mais úteis: o modal conjugado fica na posição 2 e o infinitivo vai para o final.',
      objectives: ['Usar können, müssen, wollen, möchten e dürfen', 'Construir frases com dois verbos', 'Resolver situações práticas'],
      sections: [
        { type: 'table', title: 'Modais essenciais', headers: ['Verbo', 'Ideia', '1ª pessoa'], rows: [
          ['können', 'poder / conseguir', 'ich kann'], ['müssen', 'precisar / ter que', 'ich muss'], ['wollen', 'querer', 'ich will'], ['möchten', 'gostaria', 'ich möchte'], ['dürfen', 'poder / ter permissão', 'ich darf']
        ]},
        { type: 'rule', title: 'Dois verbos, duas posições', segments: ['Ich', 'kann', 'Deutsch', 'sprechen'], verbIndex: 1, caption: 'O modal conjugado fica na posição 2; o infinitivo fecha a frase.' },
        { type: 'examples', title: 'Frases para guardar', items: [
          { de: 'Ich kann Deutsch sprechen.', pt: 'Eu consigo falar alemão.' }, { de: 'Ich muss arbeiten.', pt: 'Eu preciso trabalhar.' }, { de: 'Ich möchte einen Kaffee.', pt: 'Eu gostaria de um café.' }, { de: 'Ich will nach Hause gehen.', pt: 'Eu quero ir para casa.' }, { de: 'Darf ich hier sitzen?', pt: 'Posso sentar aqui?' }, { de: 'Kann ich mit Karte bezahlen?', pt: 'Posso pagar com cartão?' }, { de: 'Können Sie mir helfen?', pt: 'Você pode me ajudar? (formal)' }
        ]},
        { type: 'scenario', title: 'Alemão da vida real', scenarios: [
          { icon: 'shopping-basket', title: 'Supermercado', phrases: ['Wo finde ich ...?', 'Wie viel kostet das?', 'Kann ich mit Karte bezahlen?', 'Brauchen Sie eine Tüte?'] },
          { icon: 'utensils', title: 'Restaurante', phrases: ['Ich möchte ...', 'Die Rechnung, bitte.', 'Ein Wasser, bitte.', 'Ich hätte gerne ...'] },
          { icon: 'train-front', title: 'Transporte', phrases: ['Wo ist der Bahnhof?', 'Wann kommt der Zug?', 'Fährt dieser Zug nach Stuttgart?', 'Welches Gleis?'] },
          { icon: 'briefcase-business', title: 'Trabalho', phrases: ['Guten Morgen.', 'Ich habe eine Frage.', 'Können Sie mir helfen?', 'Können Sie das bitte wiederholen?'] }
        ]},
        { type: 'dialogue', title: 'Mini diálogo: primeiro contato', lines: [
          ['A', 'Guten Morgen!'], ['B', 'Guten Morgen!'], ['A', 'Sprechen Sie Englisch?'], ['B', 'Ja, ein bisschen.']
        ]},
        { type: 'examples', title: 'Apresentação pessoal', items: [
          { de: 'Ich heiße Leonardo.', pt: 'Eu me chamo Leonardo.' }, { de: 'Ich komme aus Brasilien.', pt: 'Eu venho do Brasil.' }, { de: 'Ich wohne in Stuttgart.', pt: 'Eu moro em Stuttgart.' }, { de: 'Ich arbeite bei Bosch.', pt: 'Eu trabalho na Bosch.' }, { de: 'Ich lerne Deutsch.', pt: 'Eu aprendo alemão.' }
        ]}
      ],
      vocabulary: [
        { word: 'können', meaning: 'poder / conseguir', example: 'Kann ich bezahlen?' }, { word: 'müssen', meaning: 'ter que', example: 'Ich muss arbeiten.' },
        { word: 'möchten', meaning: 'gostaria', example: 'Ich möchte ein Wasser.' }, { word: 'die Rechnung', meaning: 'a conta', example: 'Die Rechnung, bitte.' },
        { word: 'das Gleis', meaning: 'a plataforma / trilho', example: 'Welches Gleis?' }, { word: 'wiederholen', meaning: 'repetir', example: 'Bitte wiederholen.' }
      ],
      summary: ['O modal conjugado fica na posição 2.', 'O infinitivo vai para o final: Ich kann Deutsch sprechen.', 'möchte é uma forma educada de pedir.', 'Können Sie mir helfen? é uma frase-chave.', 'Frases curtas e educadas já resolvem muitas situações.'],
      exercises: [
        { id: 'm1', type: 'multiple', prompt: 'Ich ___ Deutsch sprechen. (consigo)', options: ['kann', 'muss', 'will', 'darf'], answer: 'kann', explanation: 'können na primeira pessoa é ich kann.' },
        { id: 'm2', type: 'multiple', prompt: 'Ich ___ arbeiten. (tenho que)', options: ['möchte', 'muss', 'kann', 'darf'], answer: 'muss', explanation: 'müssen expressa obrigação: ich muss.' },
        { id: 'm3', type: 'multiple', prompt: 'Qual pedido é mais educado?', options: ['Ich will einen Kaffee.', 'Ich möchte einen Kaffee.', 'Ich muss einen Kaffee.', 'Ich kann einen Kaffee.'], answer: 'Ich möchte einen Kaffee.', explanation: 'möchte significa “gostaria” e é uma forma educada de pedir.' },
        { id: 'm4', type: 'order', prompt: 'Ordene: kann / ich / mit Karte / bezahlen', answer: ['Ich', 'kann', 'mit Karte', 'bezahlen'], explanation: 'O modal kann fica na posição 2; bezahlen vai para o final.' },
        { id: 'm5', type: 'translate', prompt: 'Traduza: “Você pode me ajudar?” (formal)', answers: ['Können Sie mir helfen?', 'können sie mir helfen'], answer: 'Können Sie mir helfen?', explanation: 'Use können + Sie + mir helfen para o pedido formal.' },
        { id: 'm6', type: 'truefalse', prompt: 'Verdadeiro ou falso: em “Ich muss arbeiten”, o infinitivo fica no final.', options: ['Verdadeiro', 'Falso'], answer: 'Verdadeiro', explanation: 'Com um modal, o segundo verbo permanece no infinitivo e vai para o final.' }
      ]
    }
  ];

  window.KlarLessons = lessons;
}());
