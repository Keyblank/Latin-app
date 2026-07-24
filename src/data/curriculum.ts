import type { Unit } from '../types'

// Corso di latino per chi parte da zero.
// Ogni unità introduce poche parole nuove e le fa ripetere in modi diversi.
// Pensato per chi NON ha mai studiato latino: le spiegazioni sono in italiano.

export const curriculum: Unit[] = [
  {
    id: 'u1',
    title: 'Unità 1 — Prime parole',
    subtitle: 'Saluti e parole di tutti i giorni',
    color: '#58cc02',
    lessons: [
      {
        id: 'u1l1',
        title: 'Ciao e arrivederci',
        icon: '👋',
        exercises: [
          {
            type: 'info',
            icon: '👋',
            title: 'Benvenutə!',
            body: 'Il latino usa poche parole per salutare.\n\n• «Salve» = Ciao / Salve\n• «Vale» = Arrivederci (a una persona)\n\nNon serve sapere altro: iniziamo!',
          },
          {
            type: 'choice',
            prompt: 'Come si dice «Ciao»?',
            options: ['Salve', 'Vale', 'Aqua'],
            answer: 'Salve',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Vale»?',
            focus: 'Vale',
            options: ['Ciao (incontro)', 'Arrivederci', 'Grazie'],
            answer: 'Arrivederci',
          },
          {
            type: 'match',
            prompt: 'Abbina le parole',
            pairs: [
              ['Salve', 'Ciao'],
              ['Vale', 'Arrivederci'],
            ],
          },
          {
            type: 'choice',
            prompt: 'Saluti qualcuno che se ne va. Cosa dici?',
            options: ['Vale', 'Salve'],
            answer: 'Vale',
          },
        ],
      },
      {
        id: 'u1l2',
        title: 'Persone',
        icon: '🧒',
        exercises: [
          {
            type: 'info',
            icon: '🧒',
            title: 'Parole nuove',
            body: 'In latino la parola cambia a seconda del genere:\n\n• «puer» = bambino / ragazzo\n• «puella» = bambina / ragazza\n• «vir» = uomo\n• «femina» = donna',
          },
          {
            type: 'choice',
            prompt: 'Quale significa «bambina»?',
            options: ['puer', 'puella', 'vir'],
            answer: 'puella',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «vir»?',
            focus: 'vir',
            options: ['uomo', 'donna', 'bambino'],
            answer: 'uomo',
          },
          {
            type: 'match',
            prompt: 'Abbina le parole',
            pairs: [
              ['puer', 'bambino'],
              ['puella', 'bambina'],
              ['femina', 'donna'],
            ],
          },
          {
            type: 'choice',
            prompt: 'Quale NON è una persona?',
            options: ['puer', 'femina', 'aqua'],
            answer: 'aqua',
          },
        ],
      },
      {
        id: 'u1l3',
        title: 'Cose e natura',
        icon: '🌿',
        exercises: [
          {
            type: 'info',
            icon: '🌿',
            title: 'Parole nuove',
            body: '• «aqua» = acqua\n• «rosa» = rosa\n• «terra» = terra\n• «villa» = casa di campagna',
          },
          {
            type: 'choice',
            prompt: 'Quale significa «acqua»?',
            options: ['rosa', 'aqua', 'terra'],
            answer: 'aqua',
          },
          {
            type: 'match',
            prompt: 'Abbina le parole',
            pairs: [
              ['aqua', 'acqua'],
              ['rosa', 'rosa'],
              ['terra', 'terra'],
              ['villa', 'casa di campagna'],
            ],
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «villa»?',
            focus: 'villa',
            options: ['città', 'casa di campagna', 'strada'],
            answer: 'casa di campagna',
          },
        ],
      },
    ],
  },
  {
    id: 'u2',
    title: 'Unità 2 — Il verbo «essere»',
    subtitle: 'Costruisci le prime frasi',
    color: '#1cb0f6',
    lessons: [
      {
        id: 'u2l1',
        title: 'È e sono',
        icon: '🟰',
        exercises: [
          {
            type: 'info',
            icon: '🟰',
            title: 'Il verbo essere',
            body: 'Per dire «è» e «sono» si usa il verbo «esse»:\n\n• «est» = (lui/lei) è\n• «sunt» = (loro) sono\n\nEsempio: «Puella est» = La ragazza c’è / esiste.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «est»?',
            focus: 'est',
            options: ['è', 'sono', 'era'],
            answer: 'è',
          },
          {
            type: 'build',
            prompt: 'Traduci: «La ragazza è»',
            source: 'La ragazza è',
            answer: ['Puella', 'est'],
            extra: ['sunt', 'puer'],
          },
          {
            type: 'choice',
            prompt: 'Quale frase significa «I bambini sono»?',
            options: ['Pueri sunt', 'Puer est', 'Puella est'],
            answer: 'Pueri sunt',
          },
          {
            type: 'build',
            prompt: 'Traduci: «L’uomo è»',
            source: "L'uomo è",
            answer: ['Vir', 'est'],
            extra: ['sunt', 'femina'],
          },
        ],
      },
      {
        id: 'u2l2',
        title: 'Descrivere',
        icon: '✨',
        exercises: [
          {
            type: 'info',
            icon: '✨',
            title: 'Aggettivi',
            body: 'Ora aggiungiamo qualche qualità:\n\n• «bona» = buona\n• «magna» = grande\n• «parva» = piccola\n\nEsempio: «Puella bona est» = La ragazza è buona.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «magna»?',
            focus: 'magna',
            options: ['grande', 'piccola', 'buona'],
            answer: 'grande',
          },
          {
            type: 'build',
            prompt: 'Traduci: «La rosa è piccola»',
            source: 'La rosa è piccola',
            answer: ['Rosa', 'parva', 'est'],
            extra: ['magna', 'puella'],
          },
          {
            type: 'match',
            prompt: 'Abbina le parole',
            pairs: [
              ['bona', 'buona'],
              ['magna', 'grande'],
              ['parva', 'piccola'],
            ],
          },
          {
            type: 'build',
            prompt: 'Traduci: «La casa è grande»',
            source: 'La casa è grande',
            answer: ['Villa', 'magna', 'est'],
            extra: ['parva', 'aqua'],
          },
        ],
      },
    ],
  },
  {
    id: 'u3',
    title: 'Unità 3 — Azioni',
    subtitle: 'Verbi e frasi complete',
    color: '#ce82ff',
    lessons: [
      {
        id: 'u3l1',
        title: 'Verbi di base',
        icon: '🏃',
        exercises: [
          {
            type: 'info',
            icon: '🏃',
            title: 'Le azioni',
            body: 'Ecco tre verbi utili (3ª persona singolare):\n\n• «amat» = ama\n• «videt» = vede\n• «portat» = porta',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «videt»?',
            focus: 'videt',
            options: ['vede', 'ama', 'porta'],
            answer: 'vede',
          },
          {
            type: 'match',
            prompt: 'Abbina le parole',
            pairs: [
              ['amat', 'ama'],
              ['videt', 'vede'],
              ['portat', 'porta'],
            ],
          },
          {
            type: 'choice',
            prompt: 'Quale significa «porta»?',
            options: ['amat', 'portat', 'videt'],
            answer: 'portat',
          },
        ],
      },
      {
        id: 'u3l2',
        title: 'Frasi complete',
        icon: '💬',
        exercises: [
          {
            type: 'info',
            icon: '💬',
            title: 'Soggetto + verbo + oggetto',
            body: 'In latino l’oggetto spesso finisce in «-am»:\n\n• «rosam» = la rosa (come oggetto)\n• «aquam» = l’acqua (come oggetto)\n\nEsempio: «Puella rosam amat» = La ragazza ama la rosa.',
          },
          {
            type: 'build',
            prompt: 'Traduci: «La ragazza vede l’acqua»',
            source: "La ragazza vede l'acqua",
            answer: ['Puella', 'aquam', 'videt'],
            extra: ['rosam', 'amat'],
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Puer rosam portat»?',
            focus: 'Puer rosam portat',
            options: [
              'Il bambino porta la rosa',
              'La rosa vede il bambino',
              'Il bambino ama la rosa',
            ],
            answer: 'Il bambino porta la rosa',
          },
          {
            type: 'build',
            prompt: 'Traduci: «L’uomo ama l’acqua»',
            source: "L'uomo ama l'acqua",
            answer: ['Vir', 'aquam', 'amat'],
            extra: ['videt', 'rosam'],
          },
          {
            type: 'build',
            prompt: 'Traduci: «La donna porta la rosa»',
            source: 'La donna porta la rosa',
            answer: ['Femina', 'rosam', 'portat'],
            extra: ['aquam', 'videt'],
          },
        ],
      },
    ],
  },
  {
    id: 'u4',
    title: 'Unità 4 — I casi latini',
    subtitle: 'Il cuore della grammatica latina',
    color: '#ff9600',
    lessons: [
      {
        id: 'u4l1',
        title: 'Cosa sono i casi',
        icon: '🧩',
        exercises: [
          {
            type: 'info',
            icon: '🧩',
            title: 'La grande idea',
            body: 'In italiano capiamo il ruolo di una parola dalla sua posizione e dalle preposizioni:\n\n«La ragazza vede la rosa» ≠ «La rosa vede la ragazza».\n\nIn latino, invece, è la FINE della parola (la desinenza) a dirci il suo ruolo. Queste diverse forme si chiamano CASI.',
          },
          {
            type: 'info',
            icon: '📋',
            title: 'I sei casi',
            body: 'Ogni caso risponde a una domanda:\n\n• NOMINATIVO → chi? (il soggetto)\n• GENITIVO → di chi? (specificazione)\n• DATIVO → a chi? (il termine)\n• ACCUSATIVO → chi/che cosa? (l’oggetto)\n• ABLATIVO → con/da/in che cosa?\n• VOCATIVO → per chiamare qualcuno',
          },
          {
            type: 'table',
            title: 'I casi e la loro funzione',
            columns: ['Caso', 'Domanda', 'Ruolo in italiano'],
            rows: [
              ['Nominativo', 'chi?', 'soggetto'],
              ['Genitivo', 'di chi?', 'complemento di specificazione («di…»)'],
              ['Dativo', 'a chi?', 'complemento di termine («a/per…»)'],
              ['Accusativo', 'che cosa?', 'complemento oggetto'],
              ['Ablativo', 'con che cosa?', 'mezzo, modo, luogo, tempo'],
              ['Vocativo', '—', 'per chiamare («o Marco!»)'],
            ],
            note: 'Non serve impararli a memoria adesso: li vedremo uno alla volta. Per ora ricorda i due più importanti: NOMINATIVO (soggetto) e ACCUSATIVO (oggetto).',
          },
          {
            type: 'choice',
            prompt: 'A quale domanda risponde il NOMINATIVO?',
            focus: 'Nominativo',
            options: ['chi? (il soggetto)', 'di chi?', 'a chi?'],
            answer: 'chi? (il soggetto)',
          },
          {
            type: 'match',
            prompt: 'Abbina il caso alla sua funzione',
            pairs: [
              ['Nominativo', 'soggetto'],
              ['Accusativo', 'oggetto'],
              ['Genitivo', 'specificazione («di…»)'],
            ],
          },
        ],
      },
      {
        id: 'u4l2',
        title: 'Soggetto e oggetto',
        icon: '🎯',
        exercises: [
          {
            type: 'info',
            icon: '🎯',
            title: 'Nominativo vs Accusativo',
            body: 'Osserva la parola «puella» (ragazza):\n\n• soggetto → «puella» (nominativo)\n• oggetto → «puellam» (accusativo)\n\nLa desinenza -am segnala l’oggetto. Ecco perché «Puella rosam videt» = la ragazza (sogg.) vede la rosa (ogg.).',
          },
          {
            type: 'choice',
            prompt: 'In «Puella rosam videt», qual è il complemento OGGETTO?',
            focus: 'Puella rosam videt',
            options: ['rosam', 'puella', 'videt'],
            answer: 'rosam',
          },
          {
            type: 'choice',
            prompt: 'In «Femina aquam portat», qual è il SOGGETTO?',
            focus: 'Femina aquam portat',
            options: ['femina', 'aquam', 'portat'],
            answer: 'femina',
          },
          {
            type: 'choice',
            prompt: 'Che caso è «rosam»?',
            focus: 'rosam',
            options: ['accusativo (oggetto)', 'nominativo (soggetto)', 'genitivo'],
            answer: 'accusativo (oggetto)',
          },
          {
            type: 'build',
            prompt: 'Traduci: «La ragazza vede l’acqua»',
            source: "La ragazza vede l'acqua",
            answer: ['Puella', 'aquam', 'videt'],
            extra: ['aqua', 'puellam'],
          },
        ],
      },
      {
        id: 'u4l3',
        title: 'Di chi? A chi? Con che cosa?',
        icon: '🔑',
        exercises: [
          {
            type: 'info',
            icon: '🔑',
            title: 'Genitivo, Dativo, Ablativo',
            body: 'Con la parola «puella»:\n\n• GENITIVO: «puellae» = della ragazza\n  → «villa puellae» = la casa della ragazza\n• DATIVO: «puellae» = alla ragazza\n  → «Femina puellae rosam dat» = la donna dà la rosa alla ragazza\n• ABLATIVO: «puellā» = con/dalla ragazza\n  → «in villā» = nella casa',
          },
          {
            type: 'choice',
            prompt: 'Che caso è «puellae» in «villa puellae» (la casa della ragazza)?',
            focus: 'villa puellae',
            options: ['genitivo (di chi?)', 'nominativo (chi?)', 'accusativo (che cosa?)'],
            answer: 'genitivo (di chi?)',
          },
          {
            type: 'choice',
            prompt: 'Quale caso indica il complemento di termine («a/per»)?',
            options: ['dativo', 'ablativo', 'genitivo'],
            answer: 'dativo',
          },
          {
            type: 'match',
            prompt: 'Abbina la forma di «puella» al significato',
            pairs: [
              ['puella', 'la ragazza (soggetto)'],
              ['puellam', 'la ragazza (oggetto)'],
              ['puellae', 'della ragazza'],
            ],
          },
          {
            type: 'choice',
            prompt: 'In «Puella in villā est», che caso è «villā»?',
            focus: 'Puella in villā est',
            options: ['ablativo (stato in luogo)', 'accusativo', 'genitivo'],
            answer: 'ablativo (stato in luogo)',
          },
        ],
      },
    ],
  },
  {
    id: 'u5',
    title: 'Unità 5 — La prima declinazione',
    subtitle: 'Il modello «rosa, rosae»',
    color: '#2ec4b6',
    lessons: [
      {
        id: 'u5l1',
        title: 'La tabella di rosa',
        icon: '🌹',
        exercises: [
          {
            type: 'info',
            icon: '🌹',
            title: 'La prima declinazione',
            body: 'Le parole come «rosa», «puella», «aqua», «villa» seguono tutte lo stesso schema: la PRIMA declinazione. Sono quasi tutte femminili.\n\nDeclinare vuol dire elencare tutte le forme di una parola, caso per caso. Vediamo il modello.',
          },
          {
            type: 'table',
            title: 'rosa, rosae (f.) — «la rosa»',
            columns: ['Caso', 'Singolare', 'Plurale'],
            rows: [
              ['Nominativo', 'rosa', 'rosae'],
              ['Genitivo', 'rosae', 'rosārum'],
              ['Dativo', 'rosae', 'rosīs'],
              ['Accusativo', 'rosam', 'rosās'],
              ['Ablativo', 'rosā', 'rosīs'],
              ['Vocativo', 'rosa', 'rosae'],
            ],
            note: 'La -a dell’ablativo singolare è lunga (rosā) ma si scrive come le altre. Nota che alcune forme si ripetono: rosae vale per genitivo e dativo singolare e nominativo plurale — il contesto della frase chiarisce quale sia.',
          },
          {
            type: 'table',
            title: 'Le desinenze da ricordare',
            columns: ['Caso', 'Singolare', 'Plurale'],
            rows: [
              ['Nominativo', '-a', '-ae'],
              ['Genitivo', '-ae', '-ārum'],
              ['Dativo', '-ae', '-īs'],
              ['Accusativo', '-am', '-ās'],
              ['Ablativo', '-ā', '-īs'],
            ],
            note: 'Queste cinque coppie di desinenze valgono per TUTTE le parole della prima declinazione. Imparate queste, sai declinare puella, aqua, terra, villa…',
          },
          {
            type: 'choice',
            prompt: 'Qual è il GENITIVO singolare di «rosa»?',
            options: ['rosae', 'rosam', 'rosārum'],
            answer: 'rosae',
          },
        ],
      },
      {
        id: 'u5l2',
        title: 'Riconosci la desinenza',
        icon: '🔎',
        exercises: [
          {
            type: 'choice',
            prompt: 'La desinenza «-am» indica quale caso (singolare)?',
            focus: '-am',
            options: ['accusativo', 'genitivo', 'ablativo'],
            answer: 'accusativo',
          },
          {
            type: 'choice',
            prompt: 'Qual è l’ACCUSATIVO plurale di «puella»?',
            options: ['puellās', 'puellae', 'puellam'],
            answer: 'puellās',
          },
          {
            type: 'match',
            prompt: 'Abbina la desinenza al caso singolare',
            pairs: [
              ['-a', 'nominativo'],
              ['-ae', 'genitivo'],
              ['-am', 'accusativo'],
            ],
          },
          {
            type: 'choice',
            prompt: '«aquārum» è…',
            focus: 'aquārum',
            options: ['genitivo plurale (delle acque)', 'accusativo singolare', 'dativo singolare'],
            answer: 'genitivo plurale (delle acque)',
          },
          {
            type: 'choice',
            prompt: 'Quale forma è il DATIVO/ABLATIVO plurale di «villa»?',
            options: ['villīs', 'villās', 'villārum'],
            answer: 'villīs',
          },
        ],
      },
      {
        id: 'u5l3',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '📖',
            title: 'Mettiamo tutto insieme',
            body: 'Ora usi la declinazione per capire una frase vera: guarda le desinenze, trova il caso, poi traduci. È esattamente ciò che farai con i testi latini.',
          },
          {
            type: 'choice',
            prompt: 'In «Puellae rosam dant» («dant» = danno), che caso è «Puellae»?',
            focus: 'Puellae rosam dant',
            options: [
              'nominativo plurale (le ragazze, soggetto)',
              'genitivo singolare (della ragazza)',
              'accusativo singolare',
            ],
            answer: 'nominativo plurale (le ragazze, soggetto)',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Femina puellae aquam dat»? («dat» = dà)',
            focus: 'Femina puellae aquam dat',
            options: [
              'La donna dà l’acqua alla ragazza',
              'La ragazza dà l’acqua alla donna',
              'La donna della ragazza vede l’acqua',
            ],
            answer: 'La donna dà l’acqua alla ragazza',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Le ragazze vedono la rosa»',
            source: 'Le ragazze vedono la rosa',
            answer: ['Puellae', 'rosam', 'vident'],
            extra: ['puellam', 'rosās'],
          },
          {
            type: 'choice',
            prompt: 'In «Rosās portāmus» («portāmus» = portiamo), «Rosās» è…',
            focus: 'Rosās portāmus',
            options: [
              'accusativo plurale (le rose, oggetto)',
              'nominativo singolare',
              'genitivo plurale',
            ],
            answer: 'accusativo plurale (le rose, oggetto)',
          },
        ],
      },
    ],
  },
]
