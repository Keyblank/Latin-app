import type { Unit } from '../types'

// Corso di latino per chi parte da zero.
// Ogni unità introduce poche parole nuove e le fa ripetere in modi diversi.
// Pensato per chi NON ha mai studiato latino: le spiegazioni sono in italiano.

export const curriculum: Unit[] = [
  {
    id: 'u0',
    title: 'Pronuntiatio — Come si legge',
    subtitle: 'Ascolta e impara i suoni (tocca 🔊)',
    color: '#a9791d',
    lessons: [
      {
        id: 'u0l1',
        title: 'I suoni del latino',
        icon: '🔊',
        exercises: [
          {
            type: 'info',
            icon: '🗣️',
            title: 'Buona notizia',
            body: 'Useremo la pronuncia «ecclesiastica», quella usata in Italia. Il latino si legge quasi come l’italiano!\n\nCi sono solo poche regole particolari. Le vediamo — e puoi ascoltarle toccando il pulsante 🔊.',
          },
          {
            type: 'table',
            title: 'Lettere e suoni particolari',
            columns: ['Lettera', 'Come si legge', 'Esempio'],
            rows: [
              ['c + e, i', 'dolce, come «cena»', 'Cicero'],
              ['c + a, o, u', 'dura, come «cane»', 'caput'],
              ['g + e, i', 'dolce, come «gelo»', 'gens'],
              ['gn', 'come «gnocchi»', 'magnus'],
              ['ae, oe', 'si leggono «e»', 'caelum'],
              ['ti + vocale', 'come «tsi»', 'natio'],
              ['v', 'come «vino»', 'vinum'],
              ['h', 'muta, non si sente', 'hora'],
            ],
            speakCols: [2],
            note: 'Regola d’oro: leggi come in italiano e ricorda queste eccezioni. Tocca 🔊 sugli esempi per sentirli.',
          },
          {
            type: 'choice',
            prompt: 'Come si pronuncia «Cicero»?',
            focus: 'Cicero',
            options: ['Cì-ce-ro (c dolce)', 'Kì-ke-ro', 'Sì-se-ro'],
            answer: 'Cì-ce-ro (c dolce)',
          },
          {
            type: 'choice',
            prompt: 'Il gruppo «ae» in «caelum» si legge…',
            focus: 'caelum',
            options: ['«e» (célum)', '«ai» (cailum)', 'a-e separate'],
            answer: '«e» (célum)',
          },
          {
            type: 'choice',
            prompt: 'La «h» di «hora» come si pronuncia?',
            focus: 'hora',
            options: ['non si sente (muta)', 'come una «k»', 'come una «f»'],
            answer: 'non si sente (muta)',
          },
          {
            type: 'match',
            prompt: 'Abbina la lettera al suo suono',
            pairs: [
              ['c + i', 'dolce (cena)'],
              ['gn', 'gnocchi'],
              ['ae', 'e'],
            ],
          },
        ],
      },
      {
        id: 'u0l2',
        title: 'L’accento',
        icon: '🎵',
        exercises: [
          {
            type: 'info',
            icon: '🎵',
            title: 'Dove cade la voce',
            body: 'In latino l’accento non si scrive, ma la voce cade su una sillaba precisa.\n\n• Parole di 2 sillabe → sempre sulla PRIMA: RÒ-sa, PÙ-er.\n• Parole più lunghe → di solito sulla penultima o terzultima sillaba.\n\nAll’inizio te lo indichiamo noi (in MAIUSCOLO), finché non ci fai l’orecchio.',
          },
          {
            type: 'table',
            title: 'Dove cade l’accento',
            columns: ['Parola', 'Si legge'],
            rows: [
              ['rosa', 'RÒ-sa'],
              ['puella', 'pu-ÈL-la'],
              ['dominus', 'DÒ-mi-nus'],
              ['amicus', 'a-MÌ-cus'],
              ['templum', 'TÈM-plum'],
              ['femina', 'FÈ-mi-na'],
            ],
            speakCols: [0],
            note: 'Tocca 🔊 sulla parola per sentirla. La sillaba in maiuscolo è quella su cui batte la voce.',
          },
          {
            type: 'choice',
            prompt: 'Dove cade l’accento in «puella»?',
            focus: 'puella',
            options: ['pu-ÈL-la', 'PU-el-la', 'pu-el-LA'],
            answer: 'pu-ÈL-la',
          },
          {
            type: 'choice',
            prompt: 'In «dominus» la voce batte su…',
            focus: 'dominus',
            options: ['DÒ- (terzultima)', 'do-MÌ- (penultima)', '-NÙS (ultima)'],
            answer: 'DÒ- (terzultima)',
          },
          {
            type: 'choice',
            prompt: 'Una parola di 2 sillabe come «puer»: dove cade l’accento?',
            focus: 'puer',
            options: ['sulla prima: PÙ-er', 'sull’ultima: pu-ÈR'],
            answer: 'sulla prima: PÙ-er',
          },
        ],
      },
    ],
  },
  {
    id: 'u1',
    title: 'Unità 1 — Prime parole',
    subtitle: 'Saluti e parole di tutti i giorni',
    color: '#6a3fb5',
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
            body:
              'Alcune parole latine si riconoscono al volo, altre no. Queste no:\n\n' +
              '• «silva» = bosco, foresta\n' +
              '• «ianua» = porta (sì: è il nome di questa app)\n' +
              '• «villa» = casa di campagna, fattoria\n' +
              '• «aqua» = acqua (questa era facile)',
          },
          {
            type: 'choice',
            prompt: 'Quale significa «bosco»?',
            options: ['silva', 'aqua', 'ianua'],
            answer: 'silva',
          },
          {
            type: 'info',
            icon: '⚠️',
            title: 'Attenzione: «casa» non è casa',
            body:
              'Ci sono parole latine identiche all’italiano che però significano ' +
              'un’altra cosa: si chiamano FALSI AMICI, e nelle versioni fanno danni.\n\n' +
              '• «casa» in latino = capanna, tugurio (non la casa dove abiti!)\n' +
              '• la casa vera in città è «domus»; in campagna è «villa»\n\n' +
              'Regola d’oro: se una parola ti sembra ovvia, controllala lo stesso.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «casa» in latino?',
            focus: 'casa',
            options: ['capanna', 'casa di città', 'famiglia'],
            answer: 'capanna',
          },
          {
            type: 'match',
            prompt: 'Abbina le parole',
            pairs: [
              ['silva', 'bosco'],
              ['ianua', 'porta'],
              ['casa', 'capanna'],
              ['villa', 'casa di campagna'],
            ],
          },
          {
            type: 'choice',
            prompt: 'In una versione trovi «domus». Cos’è?',
            focus: 'domus',
            options: ['la casa di città', 'la capanna', 'il bosco'],
            answer: 'la casa di città',
          },
        ],
      },
    ],
  },
  {
    id: 'u2',
    title: 'Unità 2 — Il verbo «essere»',
    subtitle: 'Costruisci le prime frasi',
    color: '#3a6ea5',
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
            body: 'Un aggettivo è una parola che descrive: buona, grande, piccola. Aggiungiamone qualcuna, per ora con parole femminili:\n\n• «bona» = buona\n• «magna» = grande\n• «parva» = piccola\n\nEsempio: «Puella bona est» = La ragazza è buona.\n\n(Per ora usiamo la forma femminile con parole femminili. La regola completa — la «concordanza» — la vedremo per bene nell’Unità 7.)',
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
    color: '#2e9e8f',
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
            body: 'Il VERBO è la parola dell’azione. Eccone tre, per ora alla 3ª persona singolare (cioè «lui/lei fa»):\n\n• «amat» = ama\n• «videt» = vede\n• «portat» = porta\n\n(Come cambia il verbo con io, tu, noi, voi, loro lo studieremo per bene nell’Unità 8. Per ora ci basta «lui/lei».)',
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
            body: 'Finora le parole erano il soggetto (chi compie l’azione). Ora aggiungiamo l’OGGETTO: chi o che cosa subisce l’azione.\n\nPiccola magia del latino: quando una parola è oggetto, cambia la sua fine. Molte parole femminili prendono la desinenza «-am»:\n• «rosa» → «rosam» (la rosa, come oggetto)\n• «aqua» → «aquam» (l’acqua, come oggetto)\n\nEsempio: «Puella rosam amat» = La ragazza ama la rosa.\n(«puella» è soggetto, «rosam» è oggetto: lo vedi dalla -m finale.)\n\nStudieremo tutto questo con calma più avanti: per ora basta riconoscere la -m dell’oggetto.',
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
    color: '#c9821f',
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
            body: 'Partiamo dall’italiano, che già conosci.\n\nIn una frase, il SOGGETTO è chi compie l’azione; l’OGGETTO è chi o che cosa la subisce:\n«La ragazza vede la rosa» → «la ragazza» è il soggetto (vede lei), «la rosa» è l’oggetto (è vista).\n\nIn italiano capiamo chi è chi dall’ORDINE delle parole. Se lo cambi, cambia il senso: «La rosa vede la ragazza» dice il contrario!\n\nIl latino fa diversamente: non conta l’ordine, ma la FINE della parola. Questa parte finale che cambia si chiama DESINENZA. È la desinenza a dirti se una parola è soggetto, oggetto, ecc.\n\nLe diverse forme che una parola assume si chiamano CASI. Impararli è il cuore del latino: partiamo con calma.',
          },
          {
            type: 'info',
            icon: '📋',
            title: 'I sei casi',
            body: 'I casi in latino sono sei. Il modo più facile per ricordarli è legarli a una DOMANDA: la risposta a quella domanda va in quel caso.\n\n• NOMINATIVO → chi? (il soggetto)\n• GENITIVO → di chi? («la casa DI Marco»)\n• DATIVO → a chi? («do il libro A Marco»)\n• ACCUSATIVO → chi/che cosa? (l’oggetto)\n• ABLATIVO → con/da/in che cosa?\n• VOCATIVO → per chiamare qualcuno («o Marco!»)\n\nNon spaventarti: non vanno imparati tutti oggi. Li incontreremo uno alla volta, con calma.',
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
            note: '«Complemento» è solo il nome tecnico di un pezzo di frase che aggiunge un’informazione (di chi?, a chi?, con che cosa?). Non serve imparare tutto adesso: per ora bastano i due più importanti — NOMINATIVO (soggetto) e ACCUSATIVO (oggetto).',
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
            body: 'Vediamo la stessa parola, «puella» (ragazza), nei due casi più importanti:\n\n• quando è SOGGETTO (compie l’azione) → «puella». Questo caso si chiama NOMINATIVO.\n• quando è OGGETTO (subisce l’azione) → «puellam». Questo caso si chiama ACCUSATIVO.\n\nHai visto? È bastato cambiare la fine: -a → -am. Quella -am è il segnale dell’oggetto.\n\nPerciò «Puella rosam videt» = la ragazza (soggetto) vede la rosa (oggetto). E siccome è la desinenza a contare, in latino l’ordine delle parole può cambiare senza confondere il senso.',
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
            title: 'Oltre soggetto e oggetto',
            body: 'Finora abbiamo visto due casi: nominativo (soggetto) e accusativo (oggetto). Ma nelle frasi diciamo anche «DI chi», «A chi», «CON che cosa»…\n\nIn italiano queste sfumature le rendiamo con le preposizioni (di, a, con, da, in). Il latino, invece, usa altri tre casi. Vediamoli uno alla volta, con calma.',
          },
          {
            type: 'info',
            icon: '📎',
            title: 'Il genitivo — «di chi?»',
            body: 'Il GENITIVO indica a chi appartiene qualcosa, o di che cosa si parla. In italiano lo diciamo con «DI»:\n• il libro DI Marco\n• la porta DELLA casa\n• il re DEI Romani\n\nÈ il caso del possesso e dell’appartenenza. Risponde alla domanda «di chi? di che cosa?».\n\nIn latino, «puella» (la ragazza) al genitivo diventa «puellae» (della ragazza):\n→ «villa puellae» = la casa della ragazza.\n\nLa desinenza del genitivo (1ª declinazione) è «-ae».',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «rosa puellae»? («rosa» = la rosa)',
            focus: 'rosa puellae',
            options: ['la rosa della ragazza', 'la ragazza e la rosa', 'la ragazza rosa'],
            answer: 'la rosa della ragazza',
          },
          {
            type: 'info',
            icon: '🎁',
            title: 'Il dativo — «a chi?»',
            body: 'Il DATIVO indica a chi (o per chi) è diretta l’azione: chi riceve qualcosa. In italiano lo diciamo con «A» o «PER»:\n• do il libro A Marco\n• scrivo A mia madre\n• è un regalo PER te\n\nRisponde alla domanda «a chi? per chi?».\n\nIn latino «puella» al dativo è «puellae» (alla ragazza):\n→ «Femina puellae rosam dat» = la donna dà la rosa alla ragazza.\n(«dat» = dà.)',
          },
          {
            type: 'info',
            icon: '🛠️',
            title: 'L’ablativo — «con / da / in»',
            body: 'L’ABLATIVO è il più versatile: dice CON che cosa, DA dove, IN quale luogo, QUANDO… In italiano usiamo preposizioni come «con, da, in»:\n• scrivo CON la penna (mezzo)\n• vengo DA Roma (origine)\n• sono IN casa (luogo)\n\nIn latino «puella» all’ablativo è «puellā», e spesso lo trovi dopo una preposizione:\n→ «in villā» = nella casa.\n\nNon preoccuparti di tutti i suoi usi ora: per iniziare, pensa «con / da / in».',
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
    color: '#b5432f',
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
            body: 'Abbiamo detto che ogni caso ha la sua desinenza. Ma non tutte le parole usano le stesse desinenze: i nomi latini si dividono in gruppi, chiamati DECLINAZIONI.\n\nUna «declinazione» è semplicemente una famiglia di nomi che cambiano le desinenze allo stesso modo. Se impari lo schema di un gruppo, sai declinare tutte le parole di quel gruppo.\n\n«Declinare» vuol dire elencare le forme di una parola caso per caso (nominativo, genitivo, dativo…).\n\nParole come «rosa», «puella», «aqua», «villa» appartengono alla PRIMA declinazione, e sono quasi tutte femminili. Vediamo il modello.',
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
            speakCols: [1, 2],
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
  {
    id: 'u6',
    title: 'Unità 6 — La seconda declinazione',
    subtitle: 'I maschili e i neutri',
    color: '#9b3b6a',
    lessons: [
      {
        id: 'u6l1',
        title: 'I maschili in -us',
        icon: '👨',
        exercises: [
          {
            type: 'info',
            icon: '👨',
            title: 'Una nuova declinazione',
            body: 'Finora le parole erano femminili (1ª declinazione). Ora vediamo la 2ª declinazione, che contiene molti MASCHILI in -us.\n\nParole nuove:\n• «dominus» = padrone, signore\n• «amicus» = amico\n• «servus» = servo\n• «amicus templum videt» = l’amico vede il tempio',
          },
          {
            type: 'table',
            title: 'dominus, dominī (m.) — «il padrone»',
            columns: ['Caso', 'Singolare', 'Plurale'],
            rows: [
              ['Nominativo', 'dominus', 'dominī'],
              ['Genitivo', 'dominī', 'dominōrum'],
              ['Dativo', 'dominō', 'dominīs'],
              ['Accusativo', 'dominum', 'dominōs'],
              ['Ablativo', 'dominō', 'dominīs'],
              ['Vocativo', 'domine', 'dominī'],
            ],
            speakCols: [1, 2],
            note: 'Attenzione al VOCATIVO singolare: è l’unico caso «strano», finisce in -e (domine!, «o padrone!»). Tutti gli altri seguono lo schema qui sopra.',
          },
          {
            type: 'table',
            title: 'Desinenze: 1ª vs 2ª declinazione (singolare)',
            columns: ['Caso', '1ª (rosa)', '2ª (dominus)'],
            rows: [
              ['Nominativo', '-a', '-us'],
              ['Genitivo', '-ae', '-ī'],
              ['Dativo', '-ae', '-ō'],
              ['Accusativo', '-am', '-um'],
              ['Ablativo', '-ā', '-ō'],
            ],
            note: 'Il caso si riconosce sempre dalla desinenza, ma le desinenze cambiano da una declinazione all’altra. Per questo, studiando una parola, si impara sempre anche a quale declinazione appartiene.',
          },
          {
            type: 'choice',
            prompt: 'Qual è il GENITIVO singolare di «dominus»?',
            options: ['dominī', 'dominō', 'dominum'],
            answer: 'dominī',
          },
          {
            type: 'choice',
            prompt: 'In «Amicus dominum videt», qual è il complemento OGGETTO?',
            focus: 'Amicus dominum videt',
            options: ['dominum', 'amicus', 'videt'],
            answer: 'dominum',
          },
          {
            type: 'match',
            prompt: 'Abbina la forma di «servus» al significato',
            pairs: [
              ['servus', 'il servo (soggetto)'],
              ['servum', 'il servo (oggetto)'],
              ['servī', 'del servo / i servi'],
            ],
          },
        ],
      },
      {
        id: 'u6l2',
        title: 'I neutri in -um',
        icon: '🏛️',
        exercises: [
          {
            type: 'info',
            icon: '🏛️',
            title: 'Il genere neutro',
            body: 'In italiano le parole hanno due generi: maschile (il libro) e femminile (la casa). Il «genere» è appunto questa categoria.\n\nIl latino ne ha uno in più: il NEUTRO — né maschile né femminile. Si usa per molte cose e concetti (spesso oggetti, luoghi, idee).\n\nParole nuove, tutte neutre:\n• «templum» = tempio\n• «bellum» = guerra\n• «donum» = dono\n• «verbum» = parola',
          },
          {
            type: 'info',
            icon: '⚖️',
            title: 'La regola dei neutri',
            body: 'Due regole valgono per TUTTI i neutri, in ogni declinazione:\n\n1) Il NOMINATIVO e l’ACCUSATIVO sono sempre uguali.\n2) Al plurale, nominativo e accusativo finiscono in -a.\n\nQuindi «bella» può voler dire «le guerre» (sogg.) o «le guerre» (ogg.): è un neutro plurale, non un femminile!',
          },
          {
            type: 'table',
            title: 'templum, templī (n.) — «il tempio»',
            columns: ['Caso', 'Singolare', 'Plurale'],
            rows: [
              ['Nominativo', 'templum', 'templa'],
              ['Genitivo', 'templī', 'templōrum'],
              ['Dativo', 'templō', 'templīs'],
              ['Accusativo', 'templum', 'templa'],
              ['Ablativo', 'templō', 'templīs'],
            ],
            speakCols: [1, 2],
            note: 'Nota il colpo d’occhio: nominativo = accusativo (templum… templum; templa… templa). Solo genitivo, dativo e ablativo distinguono i neutri dai maschili.',
          },
          {
            type: 'choice',
            prompt: 'Qual è l’ACCUSATIVO singolare di «templum»?',
            focus: 'templum (neutro)',
            options: ['templum', 'templī', 'templa'],
            answer: 'templum',
          },
          {
            type: 'choice',
            prompt: 'La parola «bella» (da bellum) è…',
            focus: 'bella',
            options: [
              'neutro plurale (le guerre)',
              'femminile singolare (bella = carina)',
              'genitivo singolare',
            ],
            answer: 'neutro plurale (le guerre)',
          },
          {
            type: 'build',
            prompt: 'Traduci: «L’amico vede il tempio»',
            source: "L'amico vede il tempio",
            answer: ['Amicus', 'templum', 'videt'],
            extra: ['templa', 'amicum'],
          },
        ],
      },
      {
        id: 'u6l3',
        title: 'Analizza e traduci',
        icon: '🧠',
        exercises: [
          {
            type: 'info',
            icon: '🧠',
            title: 'Due declinazioni insieme',
            body: 'Ora mescoliamo 1ª e 2ª declinazione, proprio come nei testi. Ricorda: guarda la desinenza, riconosci il caso, poi traduci.\n\n(«amant» = amano, «portat» = porta)',
          },
          {
            type: 'choice',
            prompt: 'In «Servī dominum amant», che caso è «Servī»?',
            focus: 'Servī dominum amant',
            options: [
              'nominativo plurale (i servi, soggetto)',
              'genitivo singolare (del servo)',
              'accusativo plurale',
            ],
            answer: 'nominativo plurale (i servi, soggetto)',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «villa dominī»?',
            focus: 'villa dominī',
            options: [
              'la casa del padrone',
              'il padrone della casa',
              'la casa e il padrone',
            ],
            answer: 'la casa del padrone',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Il padrone porta il dono»',
            source: 'Il padrone porta il dono',
            answer: ['Dominus', 'donum', 'portat'],
            extra: ['dominum', 'dona'],
          },
          {
            type: 'choice',
            prompt: 'In «Amīcī templa vident», «templa» è…',
            focus: 'Amīcī templa vident',
            options: [
              'accusativo plurale neutro (i templi, oggetto)',
              'nominativo singolare femminile',
              'genitivo singolare',
            ],
            answer: 'accusativo plurale neutro (i templi, oggetto)',
          },
          {
            type: 'match',
            prompt: 'Abbina la parola alla declinazione e genere',
            pairs: [
              ['rosa', '1ª — femminile'],
              ['dominus', '2ª — maschile'],
              ['templum', '2ª — neutro'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u7',
    title: 'Unità 7 — Gli aggettivi',
    subtitle: 'Descrivere: la concordanza',
    color: '#d98324',
    lessons: [
      {
        id: 'u7l1',
        title: 'La concordanza',
        icon: '🎨',
        exercises: [
          {
            type: 'info',
            icon: '🎨',
            title: 'Che cos’è un aggettivo',
            body: 'L’AGGETTIVO è una parola che descrive un nome: grande, buono, piccolo, bello…\n\nGià in italiano l’aggettivo si adatta al nome: diciamo «un bambino buono» ma «una bambina buona». Questo adattarsi si chiama CONCORDANZA.\n\nIl latino fa lo stesso, ma in modo ancora più preciso. Vediamo come.',
          },
          {
            type: 'info',
            icon: '🧩',
            title: 'Concordare in 3 cose',
            body: 'In latino l’aggettivo deve concordare con il suo nome in TRE cose:\n\n1) GENERE (maschile, femminile o neutro)\n2) NUMERO (singolare o plurale)\n3) CASO (nominativo, accusativo, genitivo…)\n\nPer farlo, l’aggettivo cambia la desinenza — proprio come i nomi.',
          },
          {
            type: 'table',
            title: 'bonus, bona, bonum (buono) — nominativo',
            columns: ['Genere', 'Aggettivo', 'Esempio'],
            rows: [
              ['maschile', 'bonus', 'dominus bonus'],
              ['femminile', 'bona', 'puella bona'],
              ['neutro', 'bonum', 'templum bonum'],
            ],
            speakCols: [1, 2],
            note: 'Riconosci le desinenze? -us / -a / -um: sono quelle della 2ª declinazione (maschile e neutro) e della 1ª (femminile), che già conosci. Un aggettivo di questo tipo si dice «della 1ª classe».',
          },
          {
            type: 'choice',
            prompt: 'Quale forma di «buono» va con «puella» (femminile)?',
            focus: 'puella …',
            options: ['bona', 'bonus', 'bonum'],
            answer: 'bona',
          },
          {
            type: 'choice',
            prompt: 'E quale va con «templum» (neutro)?',
            focus: 'templum …',
            options: ['bonum', 'bonus', 'bona'],
            answer: 'bonum',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «dominus bonus»?',
            focus: 'dominus bonus',
            options: ['il buon padrone', 'il padrone c’è', 'i buoni padroni'],
            answer: 'il buon padrone',
          },
          {
            type: 'match',
            prompt: 'Abbina il genere alla forma di «magnus» (grande)',
            pairs: [
              ['maschile', 'magnus'],
              ['femminile', 'magna'],
              ['neutro', 'magnum'],
            ],
          },
        ],
      },
      {
        id: 'u7l2',
        title: 'L’aggettivo segue il caso',
        icon: '🔗',
        exercises: [
          {
            type: 'info',
            icon: '🔗',
            title: 'Cambiano insieme',
            body: 'Il nome cambia desinenza a seconda del caso. Ebbene: quando il nome cambia, l’aggettivo lo SEGUE, per restare in accordo.\n\nEsempio con «puella bona» (la brava ragazza):\n• soggetto: «puella bona» (nominativo)\n• oggetto: «puellam bonam» (accusativo)\n• «della…»: «puellae bonae» (genitivo)\n\nHai notato? Qui nome e aggettivo prendono la stessa desinenza: -a…-a, -am…-am, -ae…-ae.',
          },
          {
            type: 'table',
            title: 'puella bona — insieme, caso per caso',
            columns: ['Caso', 'Nome + aggettivo'],
            rows: [
              ['Nominativo', 'puella bona'],
              ['Genitivo', 'puellae bonae'],
              ['Dativo', 'puellae bonae'],
              ['Accusativo', 'puellam bonam'],
              ['Ablativo', 'puellā bonā'],
            ],
            speakCols: [1],
            note: 'Nome e aggettivo concordano nel CASO. Attenzione però: con nomi di declinazioni diverse le desinenze possono sembrare diverse pur essendo lo stesso caso — conta che il caso coincida, non la «rima».',
          },
          {
            type: 'choice',
            prompt: 'Come si dice «Vedo la brava ragazza»? («video» = vedo)',
            options: ['Puellam bonam video', 'Puella bona video', 'Puellae bonae video'],
            answer: 'Puellam bonam video',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Amo la grande casa» («villa» = casa)',
            source: 'Amo la grande casa',
            answer: ['Villam', 'magnam', 'amo'],
            extra: ['magna', 'villa'],
          },
          {
            type: 'choice',
            prompt: 'In «templum magnum est», perché «magnum» e non «magnus»?',
            focus: 'templum magnum est',
            options: ['perché templum è neutro', 'perché è plurale', 'perché è genitivo'],
            answer: 'perché templum è neutro',
          },
          {
            type: 'match',
            prompt: 'Abbina la coppia al suo caso',
            pairs: [
              ['puella bona', 'nominativo'],
              ['puellam bonam', 'accusativo'],
              ['puellae bonae', 'genitivo'],
            ],
          },
        ],
      },
      {
        id: 'u7l3',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '📖',
            title: 'Mettiamo tutto insieme',
            body: 'Ora usa la concordanza: controlla che il nome e il suo aggettivo vadano d’accordo (stesso genere, numero e caso), poi traduci. È proprio quello che farai con i testi.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Puella parva aquam portat»?',
            focus: 'Puella parva aquam portat',
            options: [
              'La piccola ragazza porta l’acqua',
              'La ragazza porta la piccola acqua',
              'La piccola acqua porta la ragazza',
            ],
            answer: 'La piccola ragazza porta l’acqua',
          },
          {
            type: 'choice',
            prompt: 'In «dominum bonum videō», che caso sono «dominum bonum»?',
            focus: 'dominum bonum',
            options: ['accusativo (oggetto)', 'nominativo (soggetto)', 'genitivo'],
            answer: 'accusativo (oggetto)',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Il buon padrone vede la rosa»',
            source: 'Il buon padrone vede la rosa',
            answer: ['Dominus', 'bonus', 'rosam', 'videt'],
            extra: ['bonum', 'rosa'],
          },
          {
            type: 'choice',
            prompt: 'Quale coppia concorda correttamente?',
            options: ['templum magnum', 'templum magna', 'templum magnus'],
            answer: 'templum magnum',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione («malus» = cattivo)',
            pairs: [
              ['puella bona', 'la brava ragazza'],
              ['dominus malus', 'il cattivo padrone'],
              ['templum magnum', 'il grande tempio'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u8',
    title: 'Unità 8 — I verbi (presente)',
    subtitle: 'Le 4 coniugazioni e il verbo essere',
    color: '#3f7a52',
    lessons: [
      {
        id: 'u8l1',
        title: 'Le persone del verbo',
        icon: '🗣️',
        exercises: [
          {
            type: 'info',
            icon: '🗣️',
            title: 'La desinenza dice CHI',
            body: 'Nell’Unità 3 abbiamo incontrato qualche verbo (amat, videt) solo alla 3ª persona, «lui/lei». Ora scopriamo tutte le persone.\n\nIl VERBO è la parola dell’azione (amare, leggere, essere). Un verbo può riferirsi a persone diverse: io, tu, lui/lei, noi, voi, loro. In grammatica queste si chiamano le sei PERSONE del verbo.\n\nAnche in italiano il verbo cambia con la persona: am-o, am-i, am-a… Il latino fa lo stesso, e anzi la fine del verbo (la desinenza) basta da sola a dirti chi agisce — così il pronome «io, tu…» spesso non serve nemmeno.\n\nEsempio, dal verbo «amāre» (amare):\n• «amō» = (io) amo\n• «amās» = (tu) ami\n• «amat» = (lui/lei) ama',
          },
          {
            type: 'table',
            title: 'amāre (amare) — presente',
            columns: ['Persona', 'Latino', 'Italiano'],
            rows: [
              ['io', 'amō', 'amo'],
              ['tu', 'amās', 'ami'],
              ['lui/lei', 'amat', 'ama'],
              ['noi', 'amāmus', 'amiamo'],
              ['voi', 'amātis', 'amate'],
              ['loro', 'amant', 'amano'],
            ],
            speakCols: [1],
            note: 'Nota le desinenze: -ō, -s, -t, -mus, -tis, -nt. Sono (quasi) sempre queste, in tutte le coniugazioni. Tocca 🔊 per ascoltare.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «amāmus»?',
            focus: 'amāmus',
            options: ['amiamo (noi)', 'amano (loro)', 'amate (voi)'],
            answer: 'amiamo (noi)',
          },
          {
            type: 'choice',
            prompt: 'Quale forma significa «amano» (loro)?',
            options: ['amant', 'amat', 'amātis'],
            answer: 'amant',
          },
          {
            type: 'match',
            prompt: 'Abbina la forma alla persona',
            pairs: [
              ['amō', 'io amo'],
              ['amās', 'tu ami'],
              ['amātis', 'voi amate'],
            ],
          },
          {
            type: 'build',
            prompt: 'Traduci: «Amiamo la rosa»',
            source: 'Amiamo la rosa',
            answer: ['Rosam', 'amāmus'],
            extra: ['amant', 'rosa'],
          },
          {
            type: 'choice',
            prompt: 'In «Puella cantat», la desinenza «-t» indica…',
            focus: 'cantat',
            options: ['lui/lei (3ª singolare)', 'io', 'loro'],
            answer: 'lui/lei (3ª singolare)',
          },
        ],
      },
      {
        id: 'u8l2',
        title: 'Le quattro coniugazioni',
        icon: '🧭',
        exercises: [
          {
            type: 'info',
            icon: '🧭',
            title: 'Quattro gruppi',
            body: 'Come i nomi si dividono in declinazioni, i verbi si dividono in gruppi chiamati CONIUGAZIONI: verbi che si comportano allo stesso modo.\n\nPer capire a quale gruppo appartiene un verbo si guarda il suo INFINITO — la forma base, quella che in italiano finisce in «-are, -ere, -ire» (amare, leggere, dormire) ed è come lo trovi sul vocabolario.\n\nIn latino le coniugazioni sono 4, riconoscibili dalla fine dell’infinito:\n• 1ª: -āre (amāre = amare)\n• 2ª: -ēre (monēre = avvertire)\n• 3ª: -ere (legere = leggere)\n• 4ª: -īre (audīre = ascoltare)\n\nCambia la vocale del gruppo, ma le desinenze delle persone (-o, -s, -t, -mus, -tis, -nt) restano quelle che già conosci.',
          },
          {
            type: 'table',
            title: 'Le quattro coniugazioni a confronto',
            columns: ['Persona', '2ª monēre', '3ª legere', '4ª audīre'],
            rows: [
              ['io', 'moneō', 'legō', 'audiō'],
              ['tu', 'monēs', 'legis', 'audīs'],
              ['lui/lei', 'monet', 'legit', 'audit'],
              ['noi', 'monēmus', 'legimus', 'audīmus'],
              ['voi', 'monētis', 'legitis', 'audītis'],
              ['loro', 'monent', 'legunt', 'audiunt'],
            ],
            speakCols: [1, 2, 3],
            note: 'Occhio alla 3ª (legere): la vocale è breve e alla 3ª persona plurale fa -unt (legunt). La 4ª aggiunge una i (audiunt). Le desinenze -s, -t, -mus, -tis, -nt restano riconoscibili ovunque.',
          },
          {
            type: 'choice',
            prompt: 'A quale coniugazione appartiene «audīre»?',
            focus: 'audīre',
            options: ['4ª (-īre)', '1ª (-āre)', '2ª (-ēre)'],
            answer: '4ª (-īre)',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «legimus»?',
            focus: 'legimus',
            options: ['leggiamo (noi)', 'leggono (loro)', 'leggi (tu)'],
            answer: 'leggiamo (noi)',
          },
          {
            type: 'match',
            prompt: 'Abbina l’infinito al significato',
            pairs: [
              ['monēre', 'avvertire'],
              ['legere', 'leggere'],
              ['audīre', 'ascoltare'],
            ],
          },
          {
            type: 'choice',
            prompt: 'Quale forma significa «ascoltano» (loro)?',
            options: ['audiunt', 'audit', 'audīmus'],
            answer: 'audiunt',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Leggono il libro» («librum» = il libro)',
            source: 'Leggono il libro',
            answer: ['Librum', 'legunt'],
            extra: ['legit', 'liber'],
          },
        ],
      },
      {
        id: 'u8l3',
        title: 'Il verbo essere',
        icon: '⭐',
        exercises: [
          {
            type: 'info',
            icon: '⭐',
            title: '«esse» — un verbo speciale',
            body: 'Il verbo «esse» (essere) è irregolare e importantissimo: va imparato a memoria. Lo conosci già in parte (est, sunt).',
          },
          {
            type: 'table',
            title: 'esse (essere) — presente',
            columns: ['Persona', 'Latino', 'Italiano'],
            rows: [
              ['io', 'sum', 'sono'],
              ['tu', 'es', 'sei'],
              ['lui/lei', 'est', 'è'],
              ['noi', 'sumus', 'siamo'],
              ['voi', 'estis', 'siete'],
              ['loro', 'sunt', 'sono'],
            ],
            speakCols: [1],
            note: 'Irregolare, ma ritrovi le desinenze note: -m/-s/-t/-mus/-tis/-nt. Tocca 🔊 per ascoltare.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «sumus»?',
            focus: 'sumus',
            options: ['(noi) siamo', '(voi) siete', '(loro) sono'],
            answer: '(noi) siamo',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Siamo Romani» («Romani» = Romani)',
            source: 'Siamo Romani',
            answer: ['Romani', 'sumus'],
            extra: ['estis', 'sunt'],
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Poeta es»? («poeta» = poeta)',
            focus: 'Poeta es',
            options: ['Sei un poeta', 'È un poeta', 'Sono un poeta'],
            answer: 'Sei un poeta',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Sono un allievo» («discipulus» = allievo)',
            source: 'Sono un allievo',
            answer: ['Discipulus', 'sum'],
            extra: ['est', 'es'],
          },
          {
            type: 'match',
            prompt: 'Abbina la forma di «esse»',
            pairs: [
              ['sum', 'io sono'],
              ['est', 'lui/lei è'],
              ['estis', 'voi siete'],
            ],
          },
        ],
      },
      {
        id: 'u8l4',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '📖',
            title: 'Guarda la desinenza',
            body: 'Per capire un verbo, guarda la sua fine: ti dice CHI compie l’azione. Poi ricostruisci la frase in italiano.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Rosās portāmus»?',
            focus: 'Rosās portāmus',
            options: ['Portiamo le rose', 'Portano le rose', 'Porti le rose'],
            answer: 'Portiamo le rose',
          },
          {
            type: 'choice',
            prompt: 'In «Pueri templum vident», la desinenza «-nt» indica…',
            focus: 'templum vident',
            options: ['loro (3ª plurale)', 'noi', 'voi'],
            answer: 'loro (3ª plurale)',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Vedete il tempio»',
            source: 'Vedete il tempio',
            answer: ['Templum', 'vidētis'],
            extra: ['videt', 'templa'],
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Discipulī sumus»? («discipulī» = allievi)',
            focus: 'Discipulī sumus',
            options: ['Siamo allievi', 'Sei un allievo', 'Sono allievi'],
            answer: 'Siamo allievi',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Ascolto la parola» («verbum» = parola)',
            source: 'Ascolto la parola',
            answer: ['Verbum', 'audiō'],
            extra: ['audit', 'verba'],
          },
          {
            type: 'match',
            prompt: 'Abbina la forma alla persona',
            pairs: [
              ['amō', 'io'],
              ['amātis', 'voi'],
              ['amant', 'loro'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u9',
    title: 'Unità 9 — La terza declinazione',
    subtitle: 'La più frequente (e la più furba)',
    color: '#2f7d8f',
    lessons: [
      {
        id: 'u9l1',
        title: 'La terza è diversa',
        icon: '🗝️',
        exercises: [
          {
            type: 'info',
            icon: '🗝️',
            title: 'Una declinazione speciale',
            body: 'La 3ª declinazione è la più comune nei testi latini — e funziona in modo un po’ diverso dalle prime due.\n\nContiene parole di TUTTI i generi (maschili, femminili e neutri). E soprattutto: il nominativo è imprevedibile. Guarda che varietà:\n• «rex» = re\n• «lex» = legge\n• «pater» = padre\n• «corpus» = corpo\n\nNon puoi indovinare le altre forme dal solo nominativo. Serve un trucco.',
          },
          {
            type: 'info',
            icon: '🔑',
            title: 'La chiave: il genitivo',
            body: 'Ecco il trucco: di ogni parola della 3ª si imparano DUE forme — il nominativo E il genitivo. Per questo sul vocabolario trovi scritto «rex, regis».\n\nIl genitivo finisce in «-is». Se togli il «-is», ottieni il TEMA (o radice): la parte fissa su cui si costruiscono tutti gli altri casi.\n\nEsempio: «rex, regis» → tolgo -is → tema «reg-». Da lì: reg-em, reg-ibus, ecc.',
          },
          {
            type: 'table',
            title: 'rex, regis (m.) — «il re»',
            columns: ['Caso', 'Singolare', 'Plurale'],
            rows: [
              ['Nominativo', 'rex', 'regēs'],
              ['Genitivo', 'regis', 'regum'],
              ['Dativo', 'regī', 'regibus'],
              ['Accusativo', 'regem', 'regēs'],
              ['Ablativo', 'rege', 'regibus'],
            ],
            speakCols: [1, 2],
            note: 'Tutte le forme partono dal tema «reg-», tranne il nominativo singolare «rex». Ecco perché il genitivo è così importante: è lui a rivelarti il tema.',
          },
          {
            type: 'choice',
            prompt: 'Di ogni parola della 3ª quali DUE forme si imparano?',
            options: ['nominativo e genitivo', 'nominativo e accusativo', 'solo il nominativo'],
            answer: 'nominativo e genitivo',
          },
          {
            type: 'choice',
            prompt: 'Qual è il tema di «rex, regis»?',
            focus: 'rex, regis',
            options: ['reg-', 'rex-', 'regis-'],
            answer: 'reg-',
          },
          {
            type: 'choice',
            prompt: 'Qual è l’accusativo singolare di «rex»?',
            options: ['regem', 'rex', 'regis'],
            answer: 'regem',
          },
          {
            type: 'match',
            prompt: 'Abbina la forma di «rex» al caso',
            pairs: [
              ['rex', 'nominativo'],
              ['regem', 'accusativo'],
              ['regis', 'genitivo'],
            ],
          },
        ],
      },
      {
        id: 'u9l2',
        title: 'Le desinenze',
        icon: '🔎',
        exercises: [
          {
            type: 'info',
            icon: '🔎',
            title: 'Le desinenze della 3ª',
            body: 'Una volta trovato il tema, aggiungi queste desinenze (maschili e femminili). Sono diverse da quelle della 1ª e 2ª, quindi vanno imparate a parte.',
          },
          {
            type: 'table',
            title: 'Desinenze — 3ª declinazione (m. e f.)',
            columns: ['Caso', 'Singolare', 'Plurale'],
            rows: [
              ['Nominativo', 'vario', '-ēs'],
              ['Genitivo', '-is', '-um'],
              ['Dativo', '-ī', '-ibus'],
              ['Accusativo', '-em', '-ēs'],
              ['Ablativo', '-e', '-ibus'],
            ],
            note: 'Attenzione a due desinenze «furbe»: -ēs vale sia per il nominativo sia per l’accusativo plurale (il contesto decide), e -ibus vale sia per il dativo sia per l’ablativo plurale.',
          },
          {
            type: 'choice',
            prompt: 'La desinenza «-ibus» (3ª) indica…',
            focus: '-ibus',
            options: ['dativo o ablativo plurale', 'genitivo singolare', 'accusativo singolare'],
            answer: 'dativo o ablativo plurale',
          },
          {
            type: 'choice',
            prompt: '«regēs» può essere…',
            focus: 'regēs',
            options: [
              'nominativo o accusativo plurale (i re)',
              'genitivo singolare',
              'dativo singolare',
            ],
            answer: 'nominativo o accusativo plurale (i re)',
          },
          {
            type: 'choice',
            prompt: 'In «Rex legem videt», che caso è «legem»? («lex, legis» = legge)',
            focus: 'Rex legem videt',
            options: ['accusativo (oggetto)', 'nominativo (soggetto)', 'genitivo'],
            answer: 'accusativo (oggetto)',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Il re vede il soldato» («miles, militis» = soldato → acc. «militem»)',
            source: 'Il re vede il soldato',
            answer: ['Rex', 'militem', 'videt'],
            extra: ['miles', 'regem'],
          },
          {
            type: 'match',
            prompt: 'Abbina la desinenza al caso',
            pairs: [
              ['-em', 'accusativo singolare'],
              ['-ibus', 'dativo/ablativo plurale'],
              ['-um', 'genitivo plurale'],
            ],
          },
        ],
      },
      {
        id: 'u9l3',
        title: 'I neutri della terza',
        icon: '⚖️',
        exercises: [
          {
            type: 'info',
            icon: '⚖️',
            title: 'Anche qui i neutri',
            body: 'La 3ª ha molti neutri (corpo, nome, tempo…). Valgono le solite due regole dei neutri, che già conosci:\n\n1) nominativo e accusativo sono uguali;\n2) al plurale, nominativo e accusativo finiscono in -a.\n\nModello: «nomen, nominis» (il nome) → tema «nomin-».',
          },
          {
            type: 'table',
            title: 'nomen, nominis (n.) — «il nome»',
            columns: ['Caso', 'Singolare', 'Plurale'],
            rows: [
              ['Nominativo', 'nomen', 'nomina'],
              ['Genitivo', 'nominis', 'nominum'],
              ['Dativo', 'nominī', 'nominibus'],
              ['Accusativo', 'nomen', 'nomina'],
              ['Ablativo', 'nomine', 'nominibus'],
            ],
            speakCols: [1, 2],
            note: 'Nota: nominativo = accusativo (nomen… nomen; nomina… nomina). Le desinenze di genitivo, dativo e ablativo sono le stesse dei maschili/femminili (-is, -ī, -e / -um, -ibus, -ibus).',
          },
          {
            type: 'choice',
            prompt: 'Qual è il plurale (nom./acc.) di «nomen»?',
            options: ['nomina', 'nomines', 'nomeni'],
            answer: 'nomina',
          },
          {
            type: 'choice',
            prompt: '«corpus, corporis» (corpo) è neutro. Il suo accusativo singolare è…',
            focus: 'corpus',
            options: ['corpus (uguale al nominativo)', 'corporem', 'corpo'],
            answer: 'corpus (uguale al nominativo)',
          },
          {
            type: 'match',
            prompt: 'Abbina il neutro al significato',
            pairs: [
              ['nomen', 'il nome'],
              ['corpus', 'il corpo'],
              ['tempus', 'il tempo'],
            ],
          },
        ],
      },
      {
        id: 'u9l4',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '📖',
            title: 'Alla prova con la 3ª',
            body: 'Ricorda il metodo: trova il tema dal genitivo, riconosci la desinenza (quindi il caso), poi traduci. Qui mescoliamo la 3ª con le declinazioni che già sai.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Rēgēs lēgēs scrībunt»? («scrībunt» = scrivono, «lēgēs» = leggi)',
            focus: 'Rēgēs lēgēs scrībunt',
            options: [
              'I re scrivono le leggi',
              'Il re scrive la legge',
              'Le leggi scrivono i re',
            ],
            answer: 'I re scrivono le leggi',
          },
          {
            type: 'choice',
            prompt: 'In «Pater fīlium amat» («pater» = padre, «fīlium» = il figlio), qual è il soggetto?',
            focus: 'Pater fīlium amat',
            options: ['pater', 'fīlium', 'amat'],
            answer: 'pater',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Vediamo il re» («rex» → acc. «regem»)',
            source: 'Vediamo il re',
            answer: ['Regem', 'vidēmus'],
            extra: ['rex', 'videt'],
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Hominēs vōcem audiunt»? («hominēs» = gli uomini, «vōcem» = la voce)',
            focus: 'Hominēs vōcem audiunt',
            options: [
              'Gli uomini ascoltano la voce',
              'L’uomo ascolta le voci',
              'La voce ascolta gli uomini',
            ],
            answer: 'Gli uomini ascoltano la voce',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['rex', 'il re'],
              ['lex', 'la legge'],
              ['corpus', 'il corpo'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u10',
    title: 'Unità 10 — Il passato',
    subtitle: 'Imperfetto e perfetto: i tempi del racconto',
    color: '#4b4fa8',
    lessons: [
      {
        id: 'u10l1',
        title: 'L’imperfetto',
        icon: '⏳',
        exercises: [
          {
            type: 'info',
            icon: '⏳',
            title: 'Il tempo dello sfondo',
            body: 'Finora i verbi erano al presente («amo»). Ora andiamo al passato.\n\nIl primo tempo passato è l’IMPERFETTO. Descrive un’azione che nel passato DURAVA, si RIPETEVA, o faceva da sfondo. In italiano lo rendi con «amavo», «stavo amando», «ero solito amare».',
          },
          {
            type: 'info',
            icon: '🔎',
            title: 'Riconoscerlo è facilissimo',
            body: 'L’imperfetto ha un segnale inconfondibile: il gruppo «-BA-». Appena lo vedi, sei nel passato (imperfetto):\n\n• amā-BA-m = amavo\n• monē-BA-t = avvertiva\n• legē-BA-nt = leggevano\n\nDopo il «-ba-» tornano le solite desinenze delle persone: -m, -s, -t, -mus, -tis, -nt.',
          },
          {
            type: 'table',
            title: 'amāre — imperfetto',
            columns: ['Persona', 'Latino', 'Italiano'],
            rows: [
              ['io', 'amābam', 'amavo'],
              ['tu', 'amābās', 'amavi'],
              ['lui/lei', 'amābat', 'amava'],
              ['noi', 'amābāmus', 'amavamo'],
              ['voi', 'amābātis', 'amavate'],
              ['loro', 'amābant', 'amavano'],
            ],
            speakCols: [1],
            note: 'Lo stesso schema (-ba- + desinenze) vale per tutte le coniugazioni: monēbam, legēbam, audiēbam. Tocca 🔊 per ascoltare.',
          },
          {
            type: 'table',
            title: 'esse — imperfetto («ero, eri, era…»)',
            columns: ['Persona', 'Latino', 'Italiano'],
            rows: [
              ['io', 'eram', 'ero'],
              ['tu', 'erās', 'eri'],
              ['lui/lei', 'erat', 'era'],
              ['noi', 'erāmus', 'eravamo'],
              ['voi', 'erātis', 'eravate'],
              ['loro', 'erant', 'erano'],
            ],
            speakCols: [1],
            note: 'Il verbo essere è irregolare anche qui, ma è frequentissimo: vale la pena impararlo bene.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «amābat»?',
            focus: 'amābat',
            options: ['amava', 'ama', 'amò'],
            answer: 'amava',
          },
          {
            type: 'choice',
            prompt: 'Quale «segnale» indica l’imperfetto?',
            options: ['-ba-', '-vi-', '-nt'],
            answer: '-ba-',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «erat» (da esse)?',
            focus: 'erat',
            options: ['(egli) era', '(egli) è', '(egli) sarà'],
            answer: '(egli) era',
          },
          {
            type: 'match',
            prompt: 'Abbina la forma alla traduzione',
            pairs: [
              ['amābam', 'amavo'],
              ['amābāmus', 'amavamo'],
              ['amābant', 'amavano'],
            ],
          },
        ],
      },
      {
        id: 'u10l2',
        title: 'Il perfetto',
        icon: '✅',
        exercises: [
          {
            type: 'info',
            icon: '✅',
            title: 'L’azione compiuta',
            body: 'Il PERFETTO indica un’azione COMPIUTA, conclusa nel passato: un fatto avvenuto. In italiano lo rendi con «ho amato» oppure «amai».\n\nÈ diverso dall’imperfetto: l’imperfetto durava («amavo»), il perfetto è concluso e puntuale («amai», «ho amato»).',
          },
          {
            type: 'info',
            icon: '🗝️',
            title: 'Il tema del perfetto',
            body: 'Il perfetto ha un tema TUTTO SUO, spesso imprevedibile, che va imparato — come per la 3ª declinazione impari il genitivo.\n\nSul vocabolario trovi una forma in più: «amō, amāre, amāvī». Quel «amāvī» è il perfetto (tema «amāv-»).\n\nAlcuni sono regolari (amāvī, audīvī), altri no e vanno memorizzati: «lēgī» = ho letto, «scrīpsī» = ho scritto, «vīdī» = ho visto.',
          },
          {
            type: 'table',
            title: 'amāre — perfetto',
            columns: ['Persona', 'Latino', 'Italiano'],
            rows: [
              ['io', 'amāvī', 'ho amato / amai'],
              ['tu', 'amāvistī', 'hai amato'],
              ['lui/lei', 'amāvit', 'ha amato / amò'],
              ['noi', 'amāvimus', 'abbiamo amato'],
              ['voi', 'amāvistis', 'avete amato'],
              ['loro', 'amāvērunt', 'hanno amato / amarono'],
            ],
            speakCols: [1],
            note: 'Le desinenze del perfetto sono SEMPRE queste, per ogni verbo: -ī, -istī, -it, -imus, -istis, -ērunt. Cambia solo il tema (amāv-, lēg-, vīd-…).',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «amāvit»?',
            focus: 'amāvit',
            options: ['ha amato / amò', 'amava', 'ama'],
            answer: 'ha amato / amò',
          },
          {
            type: 'choice',
            prompt: 'La desinenza «-ērunt» (perfetto) indica quale persona?',
            focus: '-ērunt',
            options: ['loro (3ª plurale)', 'io', 'noi'],
            answer: 'loro (3ª plurale)',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «lēgī» (da legere)?',
            focus: 'lēgī',
            options: ['ho letto / lessi', 'leggo', 'leggevo'],
            answer: 'ho letto / lessi',
          },
          {
            type: 'match',
            prompt: 'Abbina la forma alla traduzione',
            pairs: [
              ['amāvī', 'ho amato'],
              ['amāvimus', 'abbiamo amato'],
              ['amāvērunt', 'hanno amato'],
            ],
          },
        ],
      },
      {
        id: 'u10l3',
        title: 'Imperfetto o perfetto?',
        icon: '⚖️',
        exercises: [
          {
            type: 'info',
            icon: '⚖️',
            title: 'Due passati, due sensi',
            body: 'È la distinzione più importante per tradurre bene.\n\n• IMPERFETTO (segnale -ba-): azione che DURAVA o si RIPETEVA, lo sfondo del racconto → «amava», «regnava».\n• PERFETTO (tema del perfetto + -ī/-istī/-it…): azione CONCLUSA, un fatto → «amò», «regnò».\n\nEsempio: «vidēbam» = vedevo (durava); «vīdī» = vidi (fatto compiuto).',
          },
          {
            type: 'choice',
            prompt: '«portābant»: che tempo è, e come si traduce?',
            focus: 'portābant',
            options: ['imperfetto: portavano', 'perfetto: portarono', 'presente: portano'],
            answer: 'imperfetto: portavano',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «portāvērunt»?',
            focus: 'portāvērunt',
            options: ['portarono (perfetto)', 'portavano (imperfetto)', 'portano'],
            answer: 'portarono (perfetto)',
          },
          {
            type: 'choice',
            prompt: 'Per un’azione che «durava, faceva da sfondo» quale tempo usi?',
            options: ['l’imperfetto', 'il perfetto'],
            answer: 'l’imperfetto',
          },
          {
            type: 'choice',
            prompt: 'Come traduci «Rex regnābat»? («regnāre» = regnare)',
            focus: 'Rex regnābat',
            options: ['Il re regnava', 'Il re regnò', 'Il re regna'],
            answer: 'Il re regnava',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['amābat', 'amava (imperfetto)'],
              ['amāvit', 'amò (perfetto)'],
              ['erat', 'era (imperfetto)'],
            ],
          },
        ],
      },
      {
        id: 'u10l4',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '📖',
            title: 'Alla prova, al passato',
            body: 'Guarda il verbo: c’è il «-ba-» (imperfetto, «durava») oppure il tema del perfetto con -it/-ērunt (perfetto, «fatto compiuto»)? Poi traduci. È esattamente il ragionamento delle versioni.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Milites urbem oppugnāvērunt»? («oppugnāre» = assalire, «urbem» = la città)',
            focus: 'Milites urbem oppugnāvērunt',
            options: [
              'I soldati assalirono la città',
              'I soldati assalivano la città',
              'I soldati assaltano la città',
            ],
            answer: 'I soldati assalirono la città',
          },
          {
            type: 'choice',
            prompt: 'In «Pater fīlium vocāvit», che tempo è «vocāvit»?',
            focus: 'Pater fīlium vocāvit',
            options: ['perfetto (chiamò)', 'imperfetto (chiamava)', 'presente (chiama)'],
            answer: 'perfetto (chiamò)',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Vedevamo il re» («rex» → acc. «regem»; «vedevamo» = vidēbāmus)',
            source: 'Vedevamo il re',
            answer: ['Regem', 'vidēbāmus'],
            extra: ['vīdimus', 'rex'],
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Erāmus in villā»? («in villā» = nella casa)',
            focus: 'Erāmus in villā',
            options: ['Eravamo nella casa', 'Siamo nella casa', 'Fummo nella casa'],
            answer: 'Eravamo nella casa',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['amābam', 'amavo'],
              ['amāvī', 'ho amato'],
              ['eram', 'ero'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u11',
    title: 'Unità 11 — Il pronome relativo',
    subtitle: 'qui, quae, quod: «che, il quale, cui»',
    color: '#c0567a',
    lessons: [
      {
        id: 'u11l1',
        title: 'Che cos’è una relativa',
        icon: '🔗',
        exercises: [
          {
            type: 'info',
            icon: '🔗',
            title: 'Le proposizioni relative',
            body: 'In italiano usiamo spesso «che», «il quale», «cui» per aggiungere un’informazione a una parola:\n\n«Il ragazzo CHE legge…», «La casa CHE vedo…».\n\n• la parolina «che» è il PRONOME RELATIVO;\n• la frase che introduce («che legge») è la PROPOSIZIONE RELATIVA;\n• la parola a cui si riferisce («il ragazzo») è l’ANTECEDENTE.',
          },
          {
            type: 'info',
            icon: '🧑‍🏫',
            title: 'In latino: qui, quae, quod',
            body: 'Il pronome relativo latino ha tre forme al nominativo, una per genere:\n\n• «qui» (maschile) = che / il quale\n• «quae» (femminile) = che / la quale\n• «quod» (neutro) = che\n\nCome soggetto della relativa:\n• «Puer qui legit» = il ragazzo che legge\n• «Puella quae cantat» = la ragazza che canta\n• «Templum quod stat» = il tempio che sta',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Puer qui legit»?',
            focus: 'Puer qui legit',
            options: ['il ragazzo che legge', 'il ragazzo legge', 'quale ragazzo legge?'],
            answer: 'il ragazzo che legge',
          },
          {
            type: 'choice',
            prompt: 'Quale forma di «che» va con «puella» (femminile)?',
            focus: 'puella … cantat',
            options: ['quae', 'qui', 'quod'],
            answer: 'quae',
          },
          {
            type: 'match',
            prompt: 'Abbina la forma al genere',
            pairs: [
              ['qui', 'maschile (che)'],
              ['quae', 'femminile (che)'],
              ['quod', 'neutro (che)'],
            ],
          },
          {
            type: 'build',
            prompt: 'Traduci: «La donna che vede» («videt» = vede)',
            source: 'La donna che vede',
            answer: ['Femina', 'quae', 'videt'],
            extra: ['qui', 'quod'],
          },
        ],
      },
      {
        id: 'u11l2',
        title: 'La regola d’oro',
        icon: '🔑',
        exercises: [
          {
            type: 'info',
            icon: '🔑',
            title: 'Da dove viene la forma',
            body: 'Ecco la regola più importante (e la più sbagliata da chi non la conosce):\n\nIl pronome relativo prende GENERE e NUMERO dall’ANTECEDENTE, ma il CASO dalla sua funzione DENTRO la relativa.\n\nIn breve: «genere e numero da fuori, caso da dentro».',
          },
          {
            type: 'info',
            icon: '💡',
            title: 'Stesso antecedente, caso diverso',
            body: '• «Puer qui legit» = il ragazzo che legge\n  → «qui» è maschile singolare (come puer), ma NOMINATIVO, perché è il soggetto di «legit» (chi legge? lui).\n\n• «Puer quem videō» = il ragazzo che vedo\n  → «quem» è sempre maschile singolare (come puer), ma ACCUSATIVO, perché è l’oggetto di «video» (vedo chi? lui).\n\nStesso antecedente, caso diverso: dipende dal ruolo nella relativa.',
          },
          {
            type: 'table',
            title: 'qui, quae, quod — singolare',
            columns: ['Caso', 'Masch.', 'Femm.', 'Neutro'],
            rows: [
              ['Nominativo', 'qui', 'quae', 'quod'],
              ['Genitivo', 'cuius', 'cuius', 'cuius'],
              ['Dativo', 'cui', 'cui', 'cui'],
              ['Accusativo', 'quem', 'quam', 'quod'],
              ['Ablativo', 'quo', 'qua', 'quo'],
            ],
            speakCols: [1, 2, 3],
            note: 'Genitivo (cuius) e dativo (cui) sono uguali per tutti i generi. Al plurale: Nom. qui/quae/quae, Gen. quorum/quarum/quorum, Dat. e Abl. «quibus» (per tutti), Acc. quos/quas/quae.',
          },
          {
            type: 'choice',
            prompt: 'In «Puer quem videō», perché «quem» è accusativo?',
            focus: 'Puer quem videō',
            options: [
              'perché è l’oggetto di «video»',
              'perché puer è accusativo',
              'perché è femminile',
            ],
            answer: 'perché è l’oggetto di «video»',
          },
          {
            type: 'choice',
            prompt: 'In «Femina quam amō», che caso è «quam» e perché?',
            focus: 'Femina quam amō',
            options: [
              'accusativo: è l’oggetto di «amo»',
              'nominativo: è il soggetto',
              'genitivo: indica possesso',
            ],
            answer: 'accusativo: è l’oggetto di «amo»',
          },
          {
            type: 'choice',
            prompt: 'In «templa quae vidēmus», «quae» è…',
            focus: 'templa quae vidēmus',
            options: ['neutro plurale (come templa)', 'femminile singolare', 'maschile singolare'],
            answer: 'neutro plurale (come templa)',
          },
        ],
      },
      {
        id: 'u11l3',
        title: 'Cui, cuius: a cui, di cui',
        icon: '🧩',
        exercises: [
          {
            type: 'info',
            icon: '🧩',
            title: 'Non solo «che»',
            body: 'Oltre a «che» (soggetto o oggetto), il relativo può rendere anche «di cui, a cui, con cui», a seconda del caso:\n\n• GENITIVO «cuius» = di cui / del quale\n• DATIVO «cui» = a cui / al quale\n• ABLATIVO «quo / qua» = con cui / dal quale (spesso con una preposizione)\n\nEsempi:\n• «Vir cuius villa magna est» = l’uomo la cui casa è grande\n• «Puella cui rosam damus» = la ragazza a cui diamo la rosa',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «cui»?',
            focus: 'cui',
            options: ['a cui / al quale', 'di cui', 'con cui'],
            answer: 'a cui / al quale',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «cuius»?',
            focus: 'cuius',
            options: ['di cui / del quale', 'a cui', 'che (oggetto)'],
            answer: 'di cui / del quale',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Puella cui rosam damus»? («damus» = diamo)',
            focus: 'Puella cui rosam damus',
            options: [
              'La ragazza a cui diamo la rosa',
              'La ragazza che dà la rosa',
              'La rosa della ragazza',
            ],
            answer: 'La ragazza a cui diamo la rosa',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['cuius', 'di cui'],
              ['cui', 'a cui'],
              ['quem', 'che (oggetto)'],
            ],
          },
        ],
      },
      {
        id: 'u11l4',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '📖',
            title: 'Il metodo',
            body: 'Per tradurre una relativa: 1) trova l’antecedente (ti dà genere e numero); 2) guarda la funzione del relativo nella sua frase (ti dà il caso e quindi la traduzione: che, di cui, a cui…); 3) traduci.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Puer qui rosam portat»?',
            focus: 'Puer qui rosam portat',
            options: [
              'Il ragazzo che porta la rosa',
              'Il ragazzo che la rosa porta lui',
              'La rosa che porta il ragazzo',
            ],
            answer: 'Il ragazzo che porta la rosa',
          },
          {
            type: 'choice',
            prompt: 'In «Rex quem milites amant», che caso è «quem»? («milites» = i soldati, «amant» = amano)',
            focus: 'Rex quem milites amant',
            options: [
              'accusativo: «il re che i soldati amano»',
              'nominativo: «il re che ama»',
              'genitivo: «del re»',
            ],
            answer: 'accusativo: «il re che i soldati amano»',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Femina quam vidēmus»? («vidēmus» = vediamo)',
            focus: 'Femina quam vidēmus',
            options: ['La donna che vediamo', 'La donna che vede', 'La donna di cui parliamo'],
            answer: 'La donna che vediamo',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Il tempio che vedo» («video» = vedo)',
            source: 'Il tempio che vedo',
            answer: ['Templum', 'quod', 'video'],
            extra: ['qui', 'quem'],
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['qui', 'che (soggetto)'],
              ['quem', 'che (oggetto)'],
              ['cui', 'a cui'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u12',
    title: 'Unità 12 — Participi e ablativo assoluto',
    subtitle: 'Il costrutto principe delle versioni',
    color: '#2f8f6b',
    lessons: [
      {
        id: 'u12l1',
        title: 'Il participio presente',
        icon: '🏃',
        exercises: [
          {
            type: 'info',
            icon: '🏃',
            title: 'Che cos’è un participio',
            body: 'Il PARTICIPIO è una forma del verbo che si comporta come un aggettivo: un «verbo-aggettivo». Descrive un nome dicendo quale azione compie o subisce.\n\nEsiste anche in italiano: «amante», «cantante», «uscente» (= che ama, che canta, che esce).',
          },
          {
            type: 'info',
            icon: '➡️',
            title: 'Il participio presente',
            body: 'Il participio PRESENTE ha senso ATTIVO e CONTEMPORANEO: indica chi compie l’azione, «mentre» la compie. Si traduce con «che fa» o «facente».\n\nSi forma dal tema del presente + «-ns» (diventa «-ēns» nella 3ª e 4ª coniugazione):\n• amā-ns = che ama\n• legē-ns = che legge',
          },
          {
            type: 'table',
            title: 'Il participio presente nelle 4 coniugazioni',
            columns: ['Coniugazione', 'Participio', 'Significato'],
            rows: [
              ['1ª amāre', 'amāns', 'che ama'],
              ['2ª vidēre', 'vidēns', 'che vede'],
              ['3ª legere', 'legēns', 'che legge'],
              ['4ª audīre', 'audiēns', 'che ascolta'],
            ],
            speakCols: [1],
            note: 'Il participio presente si declina come un aggettivo della 3ª declinazione (amāns, gen. amantis, acc. amantem…).',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «legēns»?',
            focus: 'legēns',
            options: ['che legge / leggente', 'letto', 'leggerà'],
            answer: 'che legge / leggente',
          },
          {
            type: 'choice',
            prompt: 'Il participio presente ha senso…',
            options: ['attivo (chi compie l’azione)', 'passivo (chi la subisce)', 'futuro'],
            answer: 'attivo (chi compie l’azione)',
          },
          {
            type: 'match',
            prompt: 'Abbina il participio al significato',
            pairs: [
              ['amāns', 'che ama'],
              ['vidēns', 'che vede'],
              ['audiēns', 'che ascolta'],
            ],
          },
        ],
      },
      {
        id: 'u12l2',
        title: 'Il participio perfetto',
        icon: '✅',
        exercises: [
          {
            type: 'info',
            icon: '✅',
            title: 'Il participio perfetto',
            body: 'Il participio PERFETTO ha senso PASSIVO e ANTERIORE: indica un’azione SUBITA e già avvenuta. Si traduce con «X-ato / che è stato X-ato».\n\nFinisce in «-tus, -a, -um» (a volte «-sus») e si declina come «bonus, bona, bonum». Lo ricavi dalla forma che trovi sul vocabolario:\n«amō, amāre, amāvī, amātum» → «amātus» (amato).',
          },
          {
            type: 'table',
            title: 'Participio perfetto — alcuni verbi',
            columns: ['Verbo', 'Participio', 'Significato'],
            rows: [
              ['amāre', 'amātus', 'amato'],
              ['vidēre', 'vīsus', 'visto'],
              ['capere', 'captus', 'preso'],
              ['dūcere', 'ductus', 'condotto'],
              ['vincere', 'victus', 'vinto'],
            ],
            speakCols: [1],
            note: 'Il tema del participio perfetto è spesso irregolare (vīsus, captus, victus): va imparato, come il tema del perfetto.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «captus» (da capere)?',
            focus: 'captus',
            options: ['preso / catturato', 'che prende', 'prenderà'],
            answer: 'preso / catturato',
          },
          {
            type: 'choice',
            prompt: 'Il participio perfetto ha senso…',
            options: ['passivo (subisce l’azione)', 'attivo', 'presente'],
            answer: 'passivo (subisce l’azione)',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «rosa amāta»?',
            focus: 'rosa amāta',
            options: ['la rosa amata', 'la rosa che ama', 'la rosa amerà'],
            answer: 'la rosa amata',
          },
          {
            type: 'match',
            prompt: 'Abbina il participio al significato',
            pairs: [
              ['victus', 'vinto'],
              ['vīsus', 'visto'],
              ['ductus', 'condotto'],
            ],
          },
        ],
      },
      {
        id: 'u12l3',
        title: 'L’ablativo assoluto',
        icon: '⛓️',
        exercises: [
          {
            type: 'info',
            icon: '⛓️',
            title: 'Due parole in ablativo',
            body: 'L’ABLATIVO ASSOLUTO è uno dei costrutti più frequenti nelle versioni.\n\nÈ formato da due parole in ABLATIVO — un NOME + un PARTICIPIO — che stanno insieme come un blocchetto «sciolto» (absolutus = sciolto) dal resto della frase. Esprime una circostanza: quando, dopo che, poiché, mentre…',
          },
          {
            type: 'info',
            icon: '🔁',
            title: 'Come si traduce',
            body: 'Dipende dal participio:\n\n• con participio PERFETTO (azione già avvenuta):\n«Urbe captā, hostēs fūgērunt» = Presa la città, i nemici fuggirono (= dopo che la città fu presa…).\n\n• con participio PRESENTE (azione contemporanea):\n«Rēge regnante, populus gaudēbat» = Regnando il re / mentre il re regnava, il popolo gioiva.',
          },
          {
            type: 'table',
            title: 'Esempi di ablativo assoluto',
            columns: ['Latino', 'Traduzione'],
            rows: [
              ['Urbe captā', 'presa la città'],
              ['Rēge regnante', 'mentre il re regnava'],
              ['Signō datō', 'dato il segnale'],
            ],
            speakCols: [0],
            note: 'Riconoscerlo: due parole in ablativo (spesso in -e, -o, -ā), un nome + un participio, un po’ staccate dal resto. Tocca 🔊 per ascoltarle.',
          },
          {
            type: 'choice',
            prompt: 'In un ablativo assoluto, in che caso sono le due parole?',
            options: ['ablativo', 'nominativo', 'accusativo'],
            answer: 'ablativo',
          },
          {
            type: 'choice',
            prompt: 'Come si traduce «Signō datō»?',
            focus: 'Signō datō',
            options: ['dato il segnale', 'il segnale dà', 'al segnale'],
            answer: 'dato il segnale',
          },
          {
            type: 'choice',
            prompt: 'In «Urbe captā, hostēs fūgērunt», che cosa esprime «Urbe captā»?',
            focus: 'Urbe captā',
            options: [
              'una circostanza: dopo che la città fu presa',
              'il soggetto della frase',
              'il complemento oggetto',
            ],
            answer: 'una circostanza: dopo che la città fu presa',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['Urbe captā', 'presa la città'],
              ['Rēge regnante', 'mentre il re regnava'],
              ['Bellō factō', 'fatta la guerra'],
            ],
          },
        ],
      },
      {
        id: 'u12l4',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '📖',
            title: 'Il metodo',
            body: 'Participio: guarda se è presente (-ns, «che fa») o perfetto (-tus, «fatto»). Ablativo assoluto: due parole in ablativo = una circostanza («dopo che…, mentre…»). Poi traduci.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Puer librum legēns tacet»? («librum» = il libro, «tacet» = tace)',
            focus: 'Puer librum legēns tacet',
            options: [
              'Il ragazzo che legge il libro tace',
              'Il libro che legge il ragazzo tace',
              'Il ragazzo tace e legge il libro insieme',
            ],
            answer: 'Il ragazzo che legge il libro tace',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Rēge mortuō, populus flēvit»? («mortuō» = morto, «flēvit» = pianse)',
            focus: 'Rēge mortuō, populus flēvit',
            options: [
              'Morto il re, il popolo pianse',
              'Il re morto pianse il popolo',
              'Il popolo morto pianse per il re',
            ],
            answer: 'Morto il re, il popolo pianse',
          },
          {
            type: 'choice',
            prompt: 'In «Urbe captā», «captā» è un participio…',
            focus: 'captā',
            options: [
              'perfetto (passivo): «presa»',
              'presente (attivo): «prendente»',
              'futuro: «che prenderà»',
            ],
            answer: 'perfetto (passivo): «presa»',
          },
          {
            type: 'build',
            prompt: 'Traduci: «la rosa amata»',
            source: 'la rosa amata',
            answer: ['rosa', 'amāta'],
            extra: ['amāns', 'amat'],
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['amāns', 'che ama (presente)'],
              ['amātus', 'amato (perfetto)'],
              ['Urbe captā', 'presa la città'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u13',
    title: 'Unità 13 — L’infinito e l’accusativo + infinito',
    subtitle: 'Come il latino dice «dico che…»',
    color: '#8a5a2b',
    lessons: [
      {
        id: 'u13l1',
        title: 'L’infinito',
        icon: '♾️',
        exercises: [
          {
            type: 'info',
            icon: '♾️',
            title: 'Che cos’è l’infinito',
            body:
              'L’INFINITO è la forma «neutra» del verbo, quella che non dice chi ' +
              'compie l’azione: in italiano è «amare», «vedere», «leggere», ' +
              '«sentire».\n\nÈ la forma con cui cerchi un verbo sul vocabolario. ' +
              'In latino la riconosci dalla terminazione:\n\n' +
              '• «-āre, -ēre, -ere, -īre» — proprio come in italiano.',
          },
          {
            type: 'table',
            title: 'L’infinito presente nelle 4 coniugazioni',
            columns: ['Coniugazione', 'Infinito', 'Significato'],
            rows: [
              ['1ª', 'amāre', 'amare'],
              ['2ª', 'vidēre', 'vedere'],
              ['3ª', 'legere', 'leggere'],
              ['4ª', 'audīre', 'sentire, ascoltare'],
              ['irregolare', 'esse', 'essere'],
            ],
            speakCols: [1],
            note: 'Attenzione alla differenza tra 2ª e 3ª: «vidĒre» ha la e lunga e accentata, «lEgere» ha la e breve e l’accento si sposta indietro. Tocca 🔊.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «audīre»?',
            focus: 'audīre',
            options: ['sentire, ascoltare', 'ascolta', 'ho ascoltato'],
            answer: 'sentire, ascoltare',
          },
          {
            type: 'info',
            icon: '⏮️',
            title: 'C’è anche un infinito PERFETTO',
            body:
              'L’italiano ha «amare» ma anche «aver amato»: un infinito che ' +
              'guarda al passato. Il latino pure, ed è una parola sola.\n\n' +
              'Si fa con il TEMA DEL PERFETTO (quello dell’Unità 10) + «-isse»:\n' +
              '• amāv- + isse → «amāvisse» = aver amato\n' +
              '• vīd- + isse → «vīdisse» = aver visto\n\n' +
              'Da «esse» viene «fuisse» = essere stato.',
          },
          {
            type: 'table',
            title: 'Infinito presente e perfetto',
            columns: ['Verbo', 'Presente', 'Perfetto'],
            rows: [
              ['amāre', 'amāre (amare)', 'amāvisse (aver amato)'],
              ['vidēre', 'vidēre (vedere)', 'vīdisse (aver visto)'],
              ['legere', 'legere (leggere)', 'lēgisse (aver letto)'],
              ['venīre', 'venīre (venire)', 'vēnisse (esser venuto)'],
              ['esse', 'esse (essere)', 'fuisse (essere stato)'],
            ],
            note: 'La marca «-isse» è la stessa per tutti: se vedi -isse, sei davanti a un infinito perfetto.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «vēnisse»?',
            focus: 'vēnisse',
            options: ['esser venuto', 'venire', 'verrà'],
            answer: 'esser venuto',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['legere', 'leggere'],
              ['lēgisse', 'aver letto'],
              ['esse', 'essere'],
              ['fuisse', 'essere stato'],
            ],
          },
        ],
      },
      {
        id: 'u13l2',
        title: 'Dico che… (acc. + infinito)',
        icon: '💬',
        exercises: [
          {
            type: 'info',
            icon: '💬',
            title: 'Riferire le parole di qualcuno',
            body:
              'Quando racconti quello che qualcuno dice o pensa, puoi farlo in ' +
              'due modi.\n\n' +
              '• DISCORSO DIRETTO — riporti le parole tali e quali:\n' +
              '  Marco dice: «Cesare viene».\n' +
              '• DISCORSO INDIRETTO — le incastri nella tua frase:\n' +
              '  Marco dice CHE Cesare viene.\n\n' +
              'Il discorso indiretto è dappertutto nelle versioni: gli storici ' +
              'passano il tempo a riferire discorsi, notizie, pensieri.',
          },
          {
            type: 'info',
            icon: '🚫',
            title: 'In latino il «che» non c’è',
            body:
              'Ecco il punto che spiazza tutti: il latino NON usa una parolina ' +
              'come «che» per introdurre il discorso indiretto.\n\n' +
              'Fa una cosa diversa: mette il SOGGETTO della frase riferita in ' +
              'ACCUSATIVO e il suo VERBO all’INFINITO.\n\n' +
              '  Dico che Cesare viene → «Dīcō Caesarem venīre»\n' +
              '  (alla lettera: «dico Cesare venire»)\n\n' +
              'Questo costrutto si chiama ACCUSATIVO + INFINITO.',
          },
          {
            type: 'table',
            title: 'Italiano e latino a confronto',
            columns: ['Italiano', 'Latino'],
            rows: [
              ['Dico che Cesare viene', 'Dīcō Caesarem venīre'],
              ['Penso che la ragazza canta', 'Putō puellam cantāre'],
              ['So che il re è buono', 'Sciō rēgem esse bonum'],
            ],
            speakCols: [1],
            note: '«putō» = penso, «sciō» = so, «cantāre» = cantare. Nota che in latino sparisce il «che» e il soggetto cambia caso.',
          },
          {
            type: 'info',
            icon: '⚠️',
            title: 'L’accusativo qui NON è l’oggetto',
            body:
              'È l’errore numero uno, e va capito bene.\n\n' +
              'Fin qui l’accusativo era il complemento oggetto: «Puella rosam ' +
              'amat» = la ragazza ama la rosa. Chi subisce l’azione.\n\n' +
              'Nell’accusativo + infinito no: «Caesarem» in «Dīcō Caesarem ' +
              'venīre» è il SOGGETTO di «venīre». Non è Cesare a essere detto: ' +
              'è Cesare a venire.\n\n' +
              'Se traducessi «dico Cesare» non avrebbe senso — ed è proprio ' +
              'quel non-senso il segnale che sei davanti a un acc. + infinito.',
          },
          {
            type: 'choice',
            prompt: 'In «Dīcō Caesarem venīre», che funzione ha «Caesarem»?',
            focus: 'Caesarem',
            options: [
              'è il soggetto di «venīre»',
              'è il complemento oggetto di «dīcō»',
              'è un complemento di luogo',
            ],
            answer: 'è il soggetto di «venīre»',
          },
          {
            type: 'choice',
            prompt: 'Come si traduce «Putō puellam cantāre»?',
            focus: 'Putō puellam cantāre',
            options: [
              'Penso che la ragazza canti',
              'Penso alla ragazza che canta',
              'La ragazza pensa di cantare',
            ],
            answer: 'Penso che la ragazza canti',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Dico che la ragazza canta»',
            source: 'Dico che la ragazza canta',
            answer: ['Dīcō', 'puellam', 'cantāre'],
            extra: ['puella', 'cantat'],
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['Dīcō Caesarem venīre', 'Dico che Cesare viene'],
              ['Sciō rēgem esse bonum', 'So che il re è buono'],
              ['Putō puellam cantāre', 'Penso che la ragazza canti'],
            ],
          },
        ],
      },
      {
        id: 'u13l3',
        title: 'Prima o insieme?',
        icon: '⏳',
        exercises: [
          {
            type: 'info',
            icon: '🔔',
            title: 'I verbi che lo fanno scattare',
            body:
              'L’accusativo + infinito non arriva a caso: lo introduce sempre un ' +
              'verbo di DIRE, PENSARE o PERCEPIRE. Quando ne vedi uno, aspettati ' +
              'il costrutto.\n\n' +
              '• dire: «dīcō» (dico), «narrō» (racconto), «nūntiō» (annuncio)\n' +
              '• pensare/sapere: «putō» (penso), «crēdō» (credo), «sciō» (so)\n' +
              '• percepire: «videō» (vedo), «audiō» (sento)',
          },
          {
            type: 'info',
            icon: '⏳',
            title: 'Il tempo dell’infinito è RELATIVO',
            body:
              'L’infinito qui non indica presente o passato in assoluto: indica il ' +
              'rapporto con il verbo che regge la frase.\n\n' +
              '• INFINITO PRESENTE → azione CONTEMPORANEA («che fa»)\n' +
              '  Dīcō Caesarem venīre = dico che viene\n' +
              '• INFINITO PERFETTO → azione ANTERIORE, avvenuta prima («che ha fatto»)\n' +
              '  Dīcō Caesarem vēnisse = dico che è venuto\n\n' +
              'Una sola sillaba (-isse) sposta l’azione nel passato: è lì che si ' +
              'gioca la traduzione.',
          },
          {
            type: 'table',
            title: 'Contemporaneo o anteriore',
            columns: ['Latino', 'Infinito', 'Traduzione'],
            rows: [
              ['Dīcō Caesarem venīre', 'presente', 'Dico che Cesare viene'],
              ['Dīcō Caesarem vēnisse', 'perfetto', 'Dico che Cesare è venuto'],
              ['Dīxī Caesarem venīre', 'presente', 'Dissi che Cesare veniva'],
              ['Dīxī Caesarem vēnisse', 'perfetto', 'Dissi che Cesare era venuto'],
            ],
            speakCols: [0],
            note: 'Guarda le ultime due: il verbo reggente è al passato («dīxī» = dissi), quindi anche la traduzione italiana slitta indietro. L’infinito, però, dice solo «insieme» o «prima».',
          },
          {
            type: 'choice',
            prompt: 'Come si traduce «Putō rēgem fuisse bonum»?',
            focus: 'Putō rēgem fuisse bonum',
            options: [
              'Penso che il re sia stato buono',
              'Penso che il re sia buono',
              'Il re pensa di essere buono',
            ],
            answer: 'Penso che il re sia stato buono',
          },
          {
            type: 'info',
            icon: '🪞',
            title: 'E se il soggetto è lo stesso?',
            body:
              'Se chi parla e chi compie l’azione sono la stessa persona, il latino ' +
              'usa «sē» (= sé, lui stesso) in accusativo:\n\n' +
              '«Caesar dīcit sē venīre» = Cesare dice che (lui) viene.\n\n' +
              'Se invece trovi un altro nome in accusativo, il soggetto è un altro:\n' +
              '«Caesar dīcit hostēs venīre» = Cesare dice che i nemici vengono.',
          },
          {
            type: 'choice',
            prompt: 'Come si traduce «Caesar dīcit sē vēnisse»?',
            focus: 'Caesar dīcit sē vēnisse',
            options: [
              'Cesare dice di essere venuto',
              'Cesare dice che verrà',
              'Dicono che Cesare viene',
            ],
            answer: 'Cesare dice di essere venuto',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['Caesarem venīre', 'che Cesare viene'],
              ['Caesarem vēnisse', 'che Cesare è venuto'],
              ['rēgem esse bonum', 'che il re è buono'],
              ['rēgem fuisse bonum', 'che il re è stato buono'],
            ],
          },
        ],
      },
      {
        id: 'u13l4',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '🧭',
            title: 'Il metodo, in tre mosse',
            body:
              '1. Trova il verbo reggente: è di dire, pensare o percepire? ' +
              '(dīcō, putō, sciō, videō, audiō…)\n' +
              '2. Cerca la coppia ACCUSATIVO + INFINITO che lo segue.\n' +
              '3. Traduci mettendoci tu il «che»: l’accusativo diventa il ' +
              'soggetto italiano, l’infinito il verbo coniugato.\n\n' +
              'E controlla la desinenza dell’infinito: «-isse» = azione già ' +
              'avvenuta.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Magister dīcit discipulōs legere»? («magister» = maestro, «discipulōs» = allievi)',
            focus: 'Magister dīcit discipulōs legere',
            options: [
              'Il maestro dice che gli allievi leggono',
              'Il maestro dice agli allievi di leggere',
              'Gli allievi dicono che il maestro legge',
            ],
            answer: 'Il maestro dice che gli allievi leggono',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Nūntius dīcit urbem captam esse»? («nūntius» = messaggero)',
            focus: 'Nūntius dīcit urbem captam esse',
            options: [
              'Il messaggero dice che la città è stata presa',
              'Il messaggero dice che la città prende',
              'Il messaggero prende la città',
            ],
            answer: 'Il messaggero dice che la città è stata presa',
          },
          {
            type: 'info',
            icon: '🧩',
            title: 'Da dove viene «captam esse»',
            body:
              'Due pezzi che conosci già, messi insieme:\n\n' +
              '• «captam» = participio perfetto di «capere», concordato con ' +
              '«urbem» (femminile, accusativo);\n' +
              '• «esse» = l’infinito di essere.\n\n' +
              'Participio perfetto + esse = infinito perfetto PASSIVO: ' +
              '«essere stata presa». Nelle versioni di guerra lo trovi a ogni riga.',
          },
          {
            type: 'choice',
            prompt: 'In «Sciō puerum rosam amāre», chi ama chi?',
            focus: 'Sciō puerum rosam amāre',
            options: [
              'il ragazzo ama la rosa',
              'la rosa ama il ragazzo',
              'io amo il ragazzo e la rosa',
            ],
            answer: 'il ragazzo ama la rosa',
          },
          {
            type: 'info',
            icon: '🔍',
            title: 'Due accusativi: come si distinguono',
            body:
              'In «Sciō puerum rosam amāre» ci sono DUE accusativi. Come sai qual ' +
              'è il soggetto?\n\n' +
              'Con il buon senso, e con l’ordine: il primo accusativo dopo il verbo ' +
              'reggente è di solito il soggetto, l’altro è l’oggetto. Poi verifica ' +
              'se il senso regge: una rosa che ama un ragazzo è poesia, non ' +
              'traduzione.',
          },
          {
            type: 'build',
            prompt: 'Traduci: «So che Cesare è venuto»',
            source: 'So che Cesare è venuto',
            answer: ['Sciō', 'Caesarem', 'vēnisse'],
            extra: ['venīre', 'Caesar'],
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['Sciō rēgem venīre', 'So che il re viene'],
              ['Audiō hostēs fūgisse', 'Sento che i nemici sono fuggiti'],
              ['Videō puerōs legere', 'Vedo che i ragazzi leggono'],
              ['urbem captam esse', 'che la città è stata presa'],
            ],
          },
        ],
      },
    ],
  },
]
