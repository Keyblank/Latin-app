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
              ['fēmina', 'FÈ-mi-na'],
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
          {
            type: 'info',
            icon: '➖',
            title: 'La lineetta sulle vocali: ā, ē, ī, ō, ū',
            body:
              'Da qui in avanti vedrai spesso una lineetta sopra una vocale: ' +
              '«amāre», «rosā», «rēx». Non è un accento e non è un errore di ' +
              'stampa: segna una vocale LUNGA, cioè che si tiene un po’ più a ' +
              'lungo.\n\n' +
              'Serve a due cose: ti dice come pronunciare, e soprattutto ti dice ' +
              'dove cade l’accento nelle parole lunghe.\n\n' +
              'Attenzione però: nei testi latini veri la lineetta NON c’è. La ' +
              'mettono i manuali (e noi) per aiutarti. In una versione «rosa» e ' +
              '«rosā» — due casi diversi — si scrivono identiche, e a distinguerle ' +
              'sei tu, dal senso della frase.',
          },
          {
            type: 'choice',
            prompt: 'Cosa indica la lineetta in «rosā»?',
            focus: 'rosā',
            options: [
              'che la vocale è lunga',
              'che lì cade l’accento',
              'che la parola è plurale',
            ],
            answer: 'che la vocale è lunga',
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
            title: 'Si comincia',
            body: 'Il latino usa poche parole per salutare.\n\n• «Salvē» = Ciao / Salve\n• «Valē» = Arrivederci (a una persona)\n\nNon serve sapere altro: iniziamo!',
          },
          {
            type: 'table',
            title: 'I saluti',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['salvē', 'ciao, salve'],
              ['valē', 'arrivederci, addio'],
            ],
            speakCols: [0],
          },
          {
            type: 'choice',
            prompt: 'Come si dice «Ciao»?',
            options: ['Salvē', 'Valē', 'Aqua'],
            answer: 'Salvē',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Valē»?',
            focus: 'Valē',
            options: ['Ciao (incontro)', 'Arrivederci', 'Grazie'],
            answer: 'Arrivederci',
          },
          {
            type: 'match',
            prompt: 'Abbina le parole',
            pairs: [
              ['Salvē', 'Ciao'],
              ['Valē', 'Arrivederci'],
            ],
          },
          {
            type: 'choice',
            prompt: 'Saluti qualcuno che se ne va. Cosa dici?',
            options: ['Valē', 'Salvē'],
            answer: 'Valē',
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
            body: 'In latino la parola cambia a seconda del genere:\n\n• «puer» = ragazzo, bambino\n• «puella» = ragazza, bambina\n• «vir» = uomo\n• «fēmina» = donna',
          },
          {
            type: 'table',
            title: 'Le persone',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['puer', 'ragazzo, bambino'],
              ['puella', 'ragazza, bambina'],
              ['vir', 'uomo'],
              ['fēmina', 'donna'],
            ],
            speakCols: [0],
          },
          {
            type: 'choice',
            prompt: 'Quale significa «ragazza»?',
            options: ['puer', 'puella', 'vir'],
            answer: 'puella',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «vir»?',
            focus: 'vir',
            options: ['uomo', 'donna', 'ragazzo'],
            answer: 'uomo',
          },
          {
            type: 'match',
            prompt: 'Abbina le parole',
            pairs: [
              ['puer', 'ragazzo'],
              ['puella', 'ragazza'],
              ['fēmina', 'donna'],
            ],
          },
          {
            type: 'choice',
            prompt: 'Quale NON è una persona?',
            options: ['puer', 'fēmina', 'aqua'],
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
              '• «iānua» = porta (sì: è il nome di questa app)\n' +
              '• «villa» = casa di campagna, fattoria\n' +
              '• «aqua» = acqua (questa era facile)',
          },
          {
            type: 'table',
            title: 'Cose e natura',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['silva', 'bosco, foresta'],
              ['iānua', 'porta'],
              ['villa', 'casa di campagna, fattoria'],
              ['aqua', 'acqua'],
            ],
            speakCols: [0],
          },
          {
            type: 'choice',
            prompt: 'Quale significa «bosco»?',
            options: ['silva', 'aqua', 'iānua'],
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
            type: 'table',
            title: 'Dove si abita',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['casa', 'capanna, tugurio'],
              ['domus', 'casa (di città)'],
            ],
            speakCols: [0],
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
              ['iānua', 'porta'],
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
            type: 'info',
            icon: '🔀',
            title: 'Due sorprese, prima di cominciare',
            body:
              'Stai per comporre la tua prima frase. Due cose spiazzano chi ' +
              'arriva dall’italiano, e nessuno le dice mai:\n\n' +
              '• Il latino non ha gli ARTICOLI: il, la, un non esistono. ' +
              '«Puella» da solo vale la ragazza, una ragazza o semplicemente ' +
              'ragazza — l’articolo lo aggiungi tu traducendo, scegliendo quello ' +
              'che suona bene.\n' +
              '• Il VERBO di solito sta in fondo alla frase, non in mezzo.\n\n' +
              '«Puella est» = la ragazza c’è\n' +
              '«Rosa parva est» = la rosa è piccola (alla lettera: rosa piccola è)\n\n' +
              'Non è una regola ferrea — i poeti fanno di testa loro — ma è ' +
              'l’ordine che troverai quasi sempre nelle versioni. Quando componi ' +
              'una frase, mettici il verbo per ultimo.',
          },
          {
            type: 'choice',
            prompt: 'Come traduci «puella», da solo?',
            focus: 'puella',
            options: [
              'la ragazza, una ragazza… l’articolo lo scelgo io',
              'sempre e solo «la ragazza»',
              '«ragazza», senza mai articolo',
            ],
            answer: 'la ragazza, una ragazza… l’articolo lo scelgo io',
          },
          {
            type: 'choice',
            prompt: 'Nella frase latina normale, dove sta il verbo?',
            options: ['in fondo', 'sempre all’inizio', 'sempre in mezzo'],
            answer: 'in fondo',
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
            prompt: 'Quale frase significa «I ragazzi sono»?',
            options: ['Pueri sunt', 'Puer est', 'Puella est'],
            answer: 'Pueri sunt',
          },
          {
            type: 'build',
            prompt: 'Traduci: «L’uomo è»',
            source: "L'uomo è",
            answer: ['Vir', 'est'],
            extra: ['sunt', 'fēmina'],
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
            body: 'Un aggettivo è una parola che descrive: buona, grande, piccola. Aggiungiamone qualcuna, per ora con parole femminili:\n\n• «bona» = buona\n• «magna» = grande\n• «parva» = piccola\n\nPer dire che la ragazza è buona, metti in fila il nome, l’aggettivo e per ultimo «est»:\n\n«Puella bona est» = La ragazza è buona (alla lettera: ragazza buona è).\n\n(Per ora usiamo la forma femminile con parole femminili. La regola completa — la «concordanza» — la vedremo per bene nell’Unità 7.)',
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
            body: 'Finora le parole erano il soggetto (chi compie l’azione). Ora aggiungiamo l’OGGETTO: chi o che cosa subisce l’azione.\n\nEcco il meccanismo centrale del latino: quando una parola è oggetto, cambia la sua fine. Molte parole femminili prendono la desinenza «-am»:\n• «rosa» → «rosam» (la rosa, come oggetto)\n• «aqua» → «aquam» (l’acqua, come oggetto)\n\nL’ordine tipico della frase latina è dunque: soggetto, oggetto e VERBO in fondo.\n\n«Puella rosam amat» = La ragazza ama la rosa (alla lettera: «la ragazza la rosa ama»).\n(«puella» è soggetto, «rosam» è oggetto: lo vedi dalla -m finale.)\n\nStudieremo tutto questo per bene più avanti: per ora basta riconoscere la -m dell’oggetto e ricordare che il verbo va per ultimo.',
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
              'Il ragazzo porta la rosa',
              'La rosa vede il ragazzo',
              'Il ragazzo ama la rosa',
            ],
            answer: 'Il ragazzo porta la rosa',
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
            body: 'Partiamo dall’italiano, che già conosci.\n\nIn una frase, il SOGGETTO è chi compie l’azione; l’OGGETTO è chi o che cosa la subisce:\n«La ragazza vede la rosa» → «la ragazza» è il soggetto (vede lei), «la rosa» è l’oggetto (è vista).\n\nIn italiano capiamo chi è chi dall’ORDINE delle parole. Se lo cambi, cambia il senso: «La rosa vede la ragazza» dice il contrario!\n\nIl latino fa diversamente: non conta l’ordine, ma la FINE della parola. Questa parte finale che cambia si chiama DESINENZA. È la desinenza a dirti se una parola è soggetto, oggetto, ecc.\n\nLe diverse forme che una parola assume si chiamano CASI. Impararli è il cuore del latino: si parte da qui.',
          },
          {
            type: 'info',
            icon: '📋',
            title: 'I sei casi',
            body: 'I casi in latino sono sei. Il modo più efficace per ricordarli è legarli a una DOMANDA: la risposta a quella domanda va in quel caso.\n\n• NOMINATIVO → chi? (il soggetto)\n• GENITIVO → di chi? («la casa DI Marco»)\n• DATIVO → a chi? («do il libro A Marco»)\n• ACCUSATIVO → chi/che cosa? (l’oggetto)\n• ABLATIVO → con/da/in che cosa?\n• VOCATIVO → per chiamare qualcuno («o Marco!»)\n\nNon vanno imparati tutti oggi: li incontrerai uno alla volta, ognuno quando serve.',
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
            options: ['fēmina', 'aquam', 'portat'],
            answer: 'fēmina',
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
        id: 'u4v',
        title: 'Le preposizioni',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🧭',
            title: 'Preposizioni: parole che reggono un caso',
            body:
              'Hai visto che il caso da solo può esprimere un complemento. Ma il ' +
              'latino usa anche le PREPOSIZIONI, come l’italiano: a, da, con, in, ' +
              'per…\n\n' +
              'Con una differenza che devi sapere subito: ogni preposizione ' +
              'latina PRETENDE un CASO preciso per la parola che segue. Non puoi ' +
              'sceglierlo tu.\n\n' +
              'Sono quasi tutte accusativo oppure ablativo. Le prime dicono ' +
              'movimento e direzione, le seconde stato e provenienza.',
          },
          {
            type: 'table',
            title: 'Preposizioni con l’ACCUSATIVO (dove si va)',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['ad', 'verso, presso'],
              ['in', 'verso, contro (con movimento)'],
              ['per', 'attraverso, per mezzo di'],
              ['ante', 'davanti a, prima di'],
              ['post', 'dietro a, dopo'],
              ['inter', 'fra, tra'],
              ['apud', 'presso, in casa di'],
              ['contrā', 'contro'],
              ['propter', 'a causa di'],
              ['trāns', 'oltre, al di là di'],
            ],
            speakCols: [0],
            note: 'Esempio: «ad villam» = verso la fattoria («villam» è accusativo).',
          },
          {
            type: 'table',
            title: 'Preposizioni con l’ABLATIVO (dove si sta, da dove si viene)',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['in', 'in, dentro (senza movimento)'],
              ['ab, ā', 'da (provenienza, e «da parte di»)'],
              ['ex, ē', 'da, fuori da'],
              ['cum', 'con'],
              ['dē', 'giù da; riguardo a'],
              ['prō', 'davanti a; in favore di'],
              ['sine', 'senza'],
              ['sub', 'sotto'],
            ],
            speakCols: [0],
            note: 'Esempio: «in villā» = nella fattoria («villā» è ablativo). «ab» ed «ex» diventano «ā» ed «ē» davanti a consonante: «ā Rōmā», «ē silvā».',
          },
          {
            type: 'info',
            icon: '↔️',
            title: 'Il caso di «in» cambia il senso',
            body:
              'Questa la trovi in ogni versione, e chi non la sa sbaglia.\n\n' +
              '«in» regge tutti e due i casi, e il caso decide il significato:\n\n' +
              '«in villam» (accusativo) = VERSO la fattoria — ci sto andando\n' +
              '«in villā» (ablativo) = NELLA fattoria — ci sono già\n\n' +
              'Stessa parolina, due sensi opposti: a distinguerli è la desinenza. ' +
              'Un altro motivo per guardare sempre la fine delle parole.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «in silvam»? («silvam» è accusativo)',
            focus: 'in silvam',
            options: ['verso il bosco', 'nel bosco', 'dal bosco'],
            answer: 'verso il bosco',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «cum amīcō»?',
            focus: 'cum amīcō',
            options: ['con l’amico', 'verso l’amico', 'senza l’amico'],
            answer: 'con l’amico',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['sine', 'senza'],
              ['trāns', 'oltre'],
              ['propter', 'a causa di'],
              ['apud', 'presso'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['ex silvā', 'fuori dal bosco'],
              ['ad silvam', 'verso il bosco'],
              ['in silvā', 'nel bosco'],
              ['per silvam', 'attraverso il bosco'],
            ],
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
            body: 'Finora abbiamo visto due casi: nominativo (soggetto) e accusativo (oggetto). Ma nelle frasi diciamo anche «DI chi», «A chi», «CON che cosa»…\n\nIn italiano queste sfumature le rendiamo con le preposizioni (di, a, con, da, in). Il latino, invece, usa altri tre casi. Vediamoli uno alla volta.',
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
            body: 'L’ABLATIVO è il più versatile: dice CON che cosa, DA dove, IN quale luogo, QUANDO… In italiano usiamo preposizioni come «con, da, in»:\n• scrivo CON la penna (mezzo)\n• vengo DA Roma (origine)\n• sono IN casa (luogo)\n\nIn latino «puella» all’ablativo è «puellā», e spesso lo trovi dopo una preposizione:\n→ «in villā» = nella casa.\n\nGli usi dell’ablativo sono molti e li incontrerai a mano a mano: per iniziare tieni «con / da / in».',
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
        id: 'u5v',
        title: 'Parole della prima',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Venti parole del modello «rosa»',
            body:
              'Lo schema lo sai: ora servono le parole su cui applicarlo. Queste ' +
              'venti seguono tutte la prima DECLINAZIONE e sono quasi tutte ' +
              'femminili.\n\n' +
              'Non impararle a memoria tutte adesso: leggile, ascoltale, e ' +
              'torneranno negli esercizi.',
          },
          {
            type: 'table',
            title: 'Nomi della 1ª declinazione (1)',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['via', 'strada, via'],
              ['terra', 'terra'],
              ['patria', 'patria'],
              ['īnsula', 'isola — e anche il palazzo d’affitto'],
              ['porta', 'porta, ingresso'],
              ['mēnsa', 'tavola'],
              ['epistula', 'lettera'],
              ['ancilla', 'serva'],
              ['stēlla', 'stella'],
              ['lūna', 'luna'],
            ],
            speakCols: [0],
          },
          {
            type: 'table',
            title: 'Nomi della 1ª declinazione (2)',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['vīta', 'vita'],
              ['fōrma', 'forma, aspetto, bellezza'],
              ['fāma', 'fama — ma spesso «voce, diceria»'],
              ['glōria', 'gloria'],
              ['victōria', 'vittoria'],
              ['fortūna', 'sorte (buona o cattiva)'],
              ['cūra', 'cura, preoccupazione'],
              ['īra', 'ira, collera'],
              ['poena', 'punizione, castigo'],
              ['hōra', 'ora'],
            ],
            speakCols: [0],
            note: 'Tre da non fraintendere: «fāma» è spesso la voce che gira, non la celebrità; «fortūna» da sola è la sorte, che può essere pessima; «poena» è la punizione (da lì «pena»).',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «epistulam»?',
            focus: 'epistulam',
            options: ['la lettera (oggetto)', 'la lettera (soggetto)', 'delle lettere'],
            answer: 'la lettera (oggetto)',
          },
          {
            type: 'choice',
            prompt: 'In una versione trovi «magna fāma». Cosa vuol dire, probabilmente?',
            focus: 'magna fāma',
            options: [
              'una voce diffusa, una gran diceria',
              'una donna famosa',
              'una grande fame',
            ],
            answer: 'una voce diffusa, una gran diceria',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['via', 'strada'],
              ['mēnsa', 'tavola'],
              ['ancilla', 'serva'],
              ['poena', 'punizione'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['īra', 'collera'],
              ['cūra', 'preoccupazione'],
              ['fōrma', 'aspetto'],
              ['fāma', 'diceria'],
            ],
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
            type: 'analysis',
            sentence: 'Puella rosam poētae dat.',
            word: 'rosam',
            translation: 'La ragazza dà una rosa al poeta.',
            fields: [
              {
                label: 'Caso',
                options: ['Nominativo', 'Accusativo', 'Ablativo'],
                answer: 'Accusativo',
              },
              {
                label: 'Numero',
                options: ['Singolare', 'Plurale'],
                answer: 'Singolare',
              },
              {
                label: 'Funzione',
                options: ['Soggetto', 'Complemento oggetto', 'Complemento di termine'],
                answer: 'Complemento oggetto',
              },
            ],
            note: 'La -am è l’accusativo singolare della 1ª: è la marca dell’oggetto. In italiano l’oggetto si riconosce dalla posizione, in latino dalla desinenza — ed è per questo che l’ordine delle parole può cambiare senza che il senso cambi.',
          },
          {
            type: 'analysis',
            prompt: 'Stessa frase, altra parola: analizza «poētae»',
            sentence: 'Puella rosam poētae dat.',
            word: 'poētae',
            translation: 'La ragazza dà una rosa al poeta.',
            fields: [
              {
                label: 'Caso',
                options: ['Genitivo', 'Dativo', 'Ablativo'],
                answer: 'Dativo',
              },
              {
                label: 'Funzione',
                options: ['Complemento di specificazione', 'Complemento di termine', 'Soggetto'],
                answer: 'Complemento di termine',
              },
            ],
            note: '«poētae» da sola è ambigua: genitivo singolare (del poeta), dativo singolare (al poeta) o nominativo plurale (i poeti). A decidere è il verbo — «dat» chiede a chi si dà, quindi dativo. Nelle versioni funziona sempre così: la forma dà le possibilità, il contesto sceglie.',
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
        id: 'u6v',
        title: 'Parole della seconda',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Maschili in -us, neutri in -um',
            body:
              'Stesso lavoro dell’unità scorsa, per la seconda DECLINAZIONE. Le ' +
              'divido come si dividono da sole: prima i maschili in -us, poi i ' +
              'neutri in -um.\n\n' +
              'Molti di questi nomi sono parole della guerra e della politica: è ' +
              'il vocabolario di Cesare e di Livio, cioè quello delle versioni.',
          },
          {
            type: 'table',
            title: 'Maschili in -us',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['fīlius', 'figlio'],
              ['equus', 'cavallo'],
              ['mūrus', 'muro'],
              ['populus', 'popolo'],
              ['animus', 'animo, coraggio'],
              ['deus', 'dio'],
              ['hortus', 'giardino'],
              ['campus', 'campo, pianura'],
              ['lēgātus', 'luogotenente; ambasciatore'],
              ['socius', 'alleato, compagno'],
            ],
            speakCols: [0],
            note: 'Un paio finiscono in -er ma sono di questa declinazione: «puer, puerī» (ragazzo) e «liber, librī» (libro). Il genitivo in -ī li smaschera.',
          },
          {
            type: 'table',
            title: 'Neutri in -um',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['oppidum', 'città fortificata'],
              ['rēgnum', 'regno'],
              ['perīculum', 'pericolo'],
              ['cōnsilium', 'decisione, piano — e consiglio'],
              ['auxilium', 'aiuto'],
              ['proelium', 'battaglia'],
              ['imperium', 'comando, potere'],
              ['caelum', 'cielo'],
              ['vīnum', 'vino'],
              ['forum', 'piazza, foro'],
            ],
            speakCols: [0],
            note: 'Attenzione a «cōnsilium»: nelle versioni è quasi sempre «il piano, la decisione» («cōnsilium capere» = prendere una decisione), non «il consiglio» che dai a un amico.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «oppidum»?',
            focus: 'oppidum',
            options: ['una città fortificata', 'un accampamento', 'una casa'],
            answer: 'una città fortificata',
          },
          {
            type: 'choice',
            prompt: 'In «Caesar cōnsilium cēpit», che cosa fa Cesare? («cēpit» = prese)',
            focus: 'cōnsilium cēpit',
            options: [
              'prese una decisione',
              'ricevette un consiglio',
              'raccolse un’assemblea',
            ],
            answer: 'prese una decisione',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['equus', 'cavallo'],
              ['lēgātus', 'luogotenente'],
              ['socius', 'alleato'],
              ['animus', 'coraggio'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['proelium', 'battaglia'],
              ['perīculum', 'pericolo'],
              ['auxilium', 'aiuto'],
              ['imperium', 'comando'],
            ],
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
            type: 'analysis',
            sentence: 'Dominus servō dōnum dat.',
            word: 'servō',
            translation: 'Il padrone dà un dono allo schiavo.',
            fields: [
              {
                label: 'Caso',
                options: ['Dativo', 'Ablativo', 'Genitivo'],
                answer: 'Dativo',
              },
              {
                label: 'Numero',
                options: ['Singolare', 'Plurale'],
                answer: 'Singolare',
              },
              {
                label: 'Funzione',
                options: ['Complemento di termine', 'Complemento di mezzo', 'Soggetto'],
                answer: 'Complemento di termine',
              },
            ],
            note: 'La desinenza -ō della 2ª vale sia per il dativo sia per l’ablativo: la forma da sola non decide. Qui il verbo «dat» chiede a chi si dà, e quindi è dativo.',
          },
          {
            type: 'analysis',
            prompt: 'Stessa frase: analizza «dōnum»',
            sentence: 'Dominus servō dōnum dat.',
            word: 'dōnum',
            translation: 'Il padrone dà un dono allo schiavo.',
            fields: [
              {
                label: 'Caso',
                options: ['Nominativo', 'Accusativo', 'Genitivo'],
                answer: 'Accusativo',
              },
              {
                label: 'Genere',
                options: ['Maschile', 'Femminile', 'Neutro'],
                answer: 'Neutro',
              },
              {
                label: 'Funzione',
                options: ['Soggetto', 'Complemento oggetto'],
                answer: 'Complemento oggetto',
              },
            ],
            note: 'Nei neutri nominativo e accusativo sono identici: «dōnum» da sola non dice se è soggetto o oggetto. Lo dice la frase — il soggetto è già «dominus», quindi «dōnum» non può che essere l’oggetto.',
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
            body: 'L’AGGETTIVO è una parola che descrive un nome: grande, buono, piccolo, bello…\n\nGià in italiano l’aggettivo si adatta al nome: diciamo «un ragazzo buono» ma «una ragazza buona». Questo adattarsi si chiama CONCORDANZA.\n\nIl latino fa lo stesso, ma in modo ancora più preciso. Vediamo come.',
          },
          {
            type: 'info',
            icon: '🧩',
            title: 'Concordare in 3 cose',
            body: 'In latino l’aggettivo deve concordare con il suo nome in TRE cose:\n\n1) GENERE (maschile, femminile o neutro)\n2) NUMERO (singolare o plurale)\n3) CASO (nominativo, accusativo, genitivo…)\n\nPer farlo, l’aggettivo cambia la desinenza — proprio come i nomi.\n\nUn’altra cosa da sapere: di solito l’aggettivo VA DOPO il nome — «puella bona», non «bona puella». Si trovano anche invertiti, ma l’ordine normale è questo.',
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
        id: 'u7v',
        title: 'Aggettivi da sapere',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Dieci aggettivi che tornano sempre',
            body:
              'Il meccanismo l’hai capito: ora servono le parole. Questi dieci ' +
              'aggettivi sono fra i più frequenti nei testi latini, e si ' +
              'declinano tutti come «bonus, bona, bonum».\n\n' +
              'Sul vocabolario li trovi scritti così: «bonus, -a, -um». Le due ' +
              'code sono il femminile e il neutro.',
          },
          {
            type: 'table',
            title: 'Aggettivi della 1ª classe',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['bonus', 'buono'],
              ['malus', 'cattivo'],
              ['magnus', 'grande'],
              ['parvus', 'piccolo'],
              ['multus', 'molto, numeroso'],
              ['longus', 'lungo'],
              ['altus', 'alto — ma anche profondo'],
              ['novus', 'nuovo'],
              ['antīquus', 'antico'],
              ['clārus', 'luminoso, famoso'],
            ],
            speakCols: [0],
            note: 'Qui c’è solo il maschile: il femminile fa -a («bona») e il neutro -um («bonum»), come già sai. Due da tenere d’occhio: «altus» vale sia «alto» sia «profondo» (per un romano è la stessa cosa: la distanza da un piano); «clārus» passa da «luminoso» a «illustre, famoso» — da lì viene «clarissimo».',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «antīqua»?',
            focus: 'antīqua',
            options: ['antica', 'alta', 'nuova'],
            answer: 'antica',
          },
          {
            type: 'choice',
            prompt: 'In una versione trovi «alta silva». Come lo traduci?',
            focus: 'alta silva',
            options: [
              'il bosco profondo (o alto)',
              'l’altra selva',
              'il bosco antico',
            ],
            answer: 'il bosco profondo (o alto)',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['novus', 'nuovo'],
              ['longus', 'lungo'],
              ['multus', 'molto'],
              ['clārus', 'famoso'],
            ],
          },
          {
            type: 'build',
            prompt: 'Traduci: «il nuovo tempio» («templum» è neutro)',
            source: 'il nuovo tempio',
            answer: ['templum', 'novum'],
            extra: ['novus', 'nova'],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['magna villa', 'la grande fattoria'],
              ['parva puella', 'la ragazza piccola'],
              ['antīquum templum', 'il tempio antico'],
              ['malus dominus', 'il padrone cattivo'],
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
            type: 'analysis',
            sentence: 'Bonus dominus parvam villam habet.',
            word: 'parvam',
            translation: 'Un buon padrone ha una piccola casa di campagna.',
            fields: [
              {
                label: 'Caso',
                options: ['Nominativo', 'Accusativo', 'Ablativo'],
                answer: 'Accusativo',
              },
              {
                label: 'Genere',
                options: ['Maschile', 'Femminile', 'Neutro'],
                answer: 'Femminile',
              },
              {
                label: 'Concorda con',
                options: ['villam', 'dominus', 'habet'],
                answer: 'villam',
              },
            ],
            note: 'L’aggettivo prende dal nome genere, numero e caso — non la declinazione. «Parvam» è femminile perché lo è «villam», anche se al maschile l’aggettivo fa «parvus» e segue la 2ª.',
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
        id: 'u8v',
        title: 'Verbi da sapere',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Il motore della frase',
            body:
              'Il verbo è la parola che regge tutto: se lo riconosci, la frase si ' +
              'apre. Eccone ventiquattro fra i più frequenti, divisi per ' +
              'CONIUGAZIONE — così vedi anche a quale gruppo appartengono.\n\n' +
              'Li do all’INFINITO, come li trovi sul vocabolario.',
          },
          {
            type: 'table',
            title: '1ª e 2ª coniugazione',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['portāre', 'portare'],
              ['laudāre', 'lodare'],
              ['pugnāre', 'combattere'],
              ['vocāre', 'chiamare'],
              ['nārrāre', 'raccontare'],
              ['parāre', 'preparare'],
              ['superāre', 'superare, vincere'],
              ['habēre', 'avere'],
              ['tenēre', 'tenere'],
              ['timēre', 'temere'],
              ['docēre', 'insegnare'],
              ['manēre', 'restare'],
            ],
            speakCols: [0],
          },
          {
            type: 'table',
            title: '3ª e 4ª coniugazione',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['dūcere', 'condurre, guidare'],
              ['dīcere', 'dire'],
              ['mittere', 'mandare'],
              ['scrībere', 'scrivere'],
              ['vincere', 'vincere'],
              ['agere', 'fare, spingere, trattare'],
              ['gerere', 'portare; fare (la guerra)'],
              ['petere', 'chiedere; dirigersi verso'],
              ['venīre', 'venire'],
              ['invenīre', 'trovare'],
              ['mūnīre', 'fortificare'],
              ['sentīre', 'sentire, accorgersi'],
            ],
            speakCols: [0],
            note: 'Due espressioni da riconoscere al volo: «bellum gerere» = fare la guerra, «cōnsilium capere» = prendere una decisione. In latino tanti significati nascono dall’accoppiata verbo + nome.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «mittere»?',
            focus: 'mittere',
            options: ['mandare', 'mettere', 'mietere'],
            answer: 'mandare',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «bellum gerunt»?',
            focus: 'bellum gerunt',
            options: ['fanno la guerra', 'portano la guerra in spalla', 'temono la guerra'],
            answer: 'fanno la guerra',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['dūcere', 'guidare'],
              ['petere', 'chiedere'],
              ['manēre', 'restare'],
              ['timēre', 'temere'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['invenīre', 'trovare'],
              ['mūnīre', 'fortificare'],
              ['superāre', 'vincere'],
              ['nārrāre', 'raccontare'],
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
            type: 'analysis',
            sentence: 'Puellae rosās portant.',
            word: 'portant',
            translation: 'Le ragazze portano delle rose.',
            fields: [
              {
                label: 'Tempo',
                options: ['Presente', 'Imperfetto', 'Perfetto'],
                answer: 'Presente',
              },
              {
                label: 'Persona',
                options: ['1ª singolare', '3ª singolare', '3ª plurale'],
                answer: '3ª plurale',
              },
              {
                label: 'Coniugazione',
                options: ['1ª', '2ª', '3ª'],
                answer: '1ª',
              },
            ],
            note: 'La desinenza -nt segna la 3ª plurale in tutti i tempi: è la prima cosa da guardare. La -a- che la precede dice che il verbo è della 1ª coniugazione, cioè «portāre».',
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
            body: 'La 3ª declinazione è la più comune nei testi latini — e funziona in modo un po’ diverso dalle prime due.\n\nContiene parole di TUTTI i generi (maschili, femminili e neutri). E soprattutto: il nominativo è imprevedibile. Guarda che varietà:\n• «rēx» = re\n• «lēx» = legge\n• «pater» = padre\n• «corpus» = corpo\n\nNon puoi indovinare le altre forme dal solo nominativo. Serve un trucco.',
          },
          {
            type: 'info',
            icon: '🔑',
            title: 'La chiave: il genitivo',
            body: 'Ecco il trucco: di ogni parola della 3ª si imparano DUE forme — il nominativo E il genitivo. Per questo sul vocabolario trovi scritto «rēx, rēgis».\n\nIl genitivo finisce in «-is». Se togli il «-is», ottieni il TEMA (o radice): la parte fissa su cui si costruiscono tutti gli altri casi.\n\nEsempio: «rēx, rēgis» → tolgo -is → tema «rēg-». Da lì: rēg-em, rēg-ibus, ecc.',
          },
          {
            type: 'table',
            title: 'rēx, rēgis (m.) — «il re»',
            columns: ['Caso', 'Singolare', 'Plurale'],
            rows: [
              ['Nominativo', 'rēx', 'rēgēs'],
              ['Genitivo', 'rēgis', 'rēgum'],
              ['Dativo', 'rēgī', 'rēgibus'],
              ['Accusativo', 'rēgem', 'rēgēs'],
              ['Ablativo', 'rēge', 'rēgibus'],
            ],
            speakCols: [1, 2],
            note: 'Tutte le forme partono dal tema «rēg-», tranne il nominativo singolare «rēx». Ecco perché il genitivo è così importante: è lui a rivelarti il tema.',
          },
          {
            type: 'choice',
            prompt: 'Di ogni parola della 3ª quali DUE forme si imparano?',
            options: ['nominativo e genitivo', 'nominativo e accusativo', 'solo il nominativo'],
            answer: 'nominativo e genitivo',
          },
          {
            type: 'choice',
            prompt: 'Qual è il tema di «rēx, rēgis»?',
            focus: 'rēx, rēgis',
            options: ['rēg-', 'rēx-', 'rēgis-'],
            answer: 'rēg-',
          },
          {
            type: 'choice',
            prompt: 'Qual è l’accusativo singolare di «rēx»?',
            options: ['rēgem', 'rēx', 'rēgis'],
            answer: 'rēgem',
          },
          {
            type: 'match',
            prompt: 'Abbina la forma di «rēx» al caso',
            pairs: [
              ['rēx', 'nominativo'],
              ['rēgem', 'accusativo'],
              ['rēgis', 'genitivo'],
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
            prompt: '«rēgēs» può essere…',
            focus: 'rēgēs',
            options: [
              'nominativo o accusativo plurale (i re)',
              'genitivo singolare',
              'dativo singolare',
            ],
            answer: 'nominativo o accusativo plurale (i re)',
          },
          {
            type: 'choice',
            prompt: 'In «Rēx lēgem videt», che caso è «lēgem»? («lēx, lēgis» = legge)',
            focus: 'Rēx lēgem videt',
            options: ['accusativo (oggetto)', 'nominativo (soggetto)', 'genitivo'],
            answer: 'accusativo (oggetto)',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Il re vede il soldato» («mīles, mīlitis» = soldato → acc. «mīlitem»)',
            source: 'Il re vede il soldato',
            answer: ['Rēx', 'mīlitem', 'videt'],
            extra: ['mīles', 'rēgem'],
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
            body: 'La 3ª ha molti neutri (corpo, nome, tempo…). Valgono le solite due regole dei neutri, che già conosci:\n\n1) nominativo e accusativo sono uguali;\n2) al plurale, nominativo e accusativo finiscono in -a.\n\nModello: «nōmen, nōminis» (il nome) → tema «nōmin-».',
          },
          {
            type: 'table',
            title: 'nōmen, nōminis (n.) — «il nome»',
            columns: ['Caso', 'Singolare', 'Plurale'],
            rows: [
              ['Nominativo', 'nōmen', 'nōmina'],
              ['Genitivo', 'nōminis', 'nōminum'],
              ['Dativo', 'nōminī', 'nōminibus'],
              ['Accusativo', 'nōmen', 'nōmina'],
              ['Ablativo', 'nōmine', 'nōminibus'],
            ],
            speakCols: [1, 2],
            note: 'Nota: nominativo = accusativo (nōmen… nōmen; nōmina… nōmina). Le desinenze di genitivo, dativo e ablativo sono le stesse dei maschili/femminili (-is, -ī, -e / -um, -ibus, -ibus).',
          },
          {
            type: 'choice',
            prompt: 'Qual è il plurale (nom./acc.) di «nōmen»?',
            options: ['nōmina', 'nomines', 'nomeni'],
            answer: 'nōmina',
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
              ['nōmen', 'il nome'],
              ['corpus', 'il corpo'],
              ['tempus', 'il tempo'],
            ],
          },
        ],
      },
      {
        id: 'u9v',
        title: 'Parole della terza',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Le più frequenti di tutte',
            body:
              'La terza DECLINAZIONE è la più affollata, e le sue parole sono ' +
              'quelle che incontrerai più spesso. Come sai, di ognuna si imparano ' +
              'DUE forme: il nominativo e il GENITIVO, perché è il genitivo a ' +
              'darti il TEMA.\n\n' +
              'Guarda quanto cambiano: «rēx» → «rēg-is», «iter» → «itiner-is». ' +
              'Senza il genitivo non sapresti nemmeno da dove partire.',
          },
          {
            type: 'table',
            title: 'Persone',
            lessico: true,
            columns: ['Latino', 'Genitivo', 'Italiano'],
            rows: [
              ['homō', 'hominis', 'uomo, essere umano'],
              ['pater', 'patris', 'padre'],
              ['māter', 'mātris', 'madre'],
              ['frāter', 'frātris', 'fratello'],
              ['soror', 'sorōris', 'sorella'],
              ['dux', 'ducis', 'comandante'],
              ['cōnsul', 'cōnsulis', 'console'],
              ['cīvis', 'cīvis', 'cittadino'],
              ['hostis', 'hostis', 'nemico (in guerra)'],
            ],
            speakCols: [0],
            note: '«hostis» è il nemico pubblico, quello contro cui si combatte; il nemico personale è «inimīcus».',
          },
          {
            type: 'table',
            title: 'Cose e idee',
            lessico: true,
            columns: ['Latino', 'Genitivo', 'Italiano'],
            rows: [
              ['urbs', 'urbis', 'città'],
              ['pars', 'partis', 'parte'],
              ['mors', 'mortis', 'morte'],
              ['nox', 'noctis', 'notte'],
              ['vōx', 'vōcis', 'voce'],
              ['mōns', 'montis', 'monte'],
              ['flūmen', 'flūminis', 'fiume'],
              ['iter', 'itineris', 'viaggio, marcia'],
              ['tempus', 'temporis', 'tempo'],
              ['opus', 'operis', 'opera, lavoro'],
              ['virtūs', 'virtūtis', 'valore, coraggio'],
              ['lībertās', 'lībertātis', 'libertà'],
            ],
            speakCols: [0],
            note: '«virtūs» è il grande falso amico del latino: non è la virtù morale, è il VALORE, il coraggio del soldato (viene da «vir», l’uomo). «Magna virtūs» è un gran coraggio, non una gran bontà.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «virtūs» in una versione di storia?',
            focus: 'virtūs',
            options: ['il valore, il coraggio', 'la virtù morale', 'la forza fisica'],
            answer: 'il valore, il coraggio',
          },
          {
            type: 'choice',
            prompt: 'Qual è il tema di «iter, itineris»?',
            focus: 'iter, itineris',
            options: ['itiner-', 'iter-', 'it-'],
            answer: 'itiner-',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['dux', 'comandante'],
              ['hostis', 'nemico'],
              ['cīvis', 'cittadino'],
              ['homō', 'essere umano'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['flūmen', 'fiume'],
              ['mōns', 'monte'],
              ['nox', 'notte'],
              ['iter', 'marcia'],
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
            type: 'analysis',
            sentence: 'Rēx mīlitibus dōna dat.',
            word: 'mīlitibus',
            translation: 'Il re dà dei doni ai soldati.',
            fields: [
              {
                label: 'Caso',
                options: ['Dativo', 'Ablativo', 'Genitivo'],
                answer: 'Dativo',
              },
              {
                label: 'Numero',
                options: ['Singolare', 'Plurale'],
                answer: 'Plurale',
              },
              {
                label: 'Declinazione',
                options: ['1ª', '2ª', '3ª'],
                answer: '3ª',
              },
            ],
            note: '-ibus è dativo o ablativo plurale della 3ª: la forma non li distingue mai. Anche qui decide il verbo, «dat».',
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
            prompt: 'Traduci: «Vediamo il re» («rēx» → acc. «rēgem»)',
            source: 'Vediamo il re',
            answer: ['Rēgem', 'vidēmus'],
            extra: ['rēx', 'videt'],
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
              ['rēx', 'il re'],
              ['lēx', 'la legge'],
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
            prompt: 'Come traduci «Rēx rēgnābat»? («rēgnāre» = regnare)',
            focus: 'Rēx rēgnābat',
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
        id: 'u10v',
        title: 'I verbi del racconto',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Le azioni che tornano sempre',
            body:
              'Una versione narrativa è fatta di poche azioni ripetute: qualcuno ' +
              'vede, sente, chiede, prende, fugge. Sono verbi che nell’Unità 8 non ' +
              'c’erano e che invece ricorrono a ogni riga.\n\n' +
              'Li diamo all’INFINITO, che è la forma con cui si cercano sul ' +
              'vocabolario. Il tema del perfetto — quello dell’imperfetto e del ' +
              'perfetto appena studiati — lo trovi lì accanto quando servirà.',
          },
          {
            type: 'table',
            title: 'Vedere, sentire, pensare',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['vidēre', 'vedere'],
              ['audīre', 'ascoltare, sentire'],
              ['legere', 'leggere; raccogliere'],
              ['putāre', 'pensare, ritenere'],
              ['crēdere', 'credere (+ dativo)'],
              ['spērāre', 'sperare'],
              ['rogāre', 'chiedere, domandare'],
              ['clāmāre', 'gridare'],
              ['ōrāre', 'pregare, supplicare'],
              ['amāre', 'amare'],
            ],
            speakCols: [0],
            note: '«crēdere» in latino regge il DATIVO, non l’accusativo: «crēdō amīcō» = credo all’amico. Lo stesso vale per «parcere» (risparmiare), «nocēre» (nuocere), «pārēre» (obbedire): sono verbi che in italiano vogliono «a», e il latino li tratta allo stesso modo.',
          },
          {
            type: 'table',
            title: 'Muoversi, prendere, dare',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['dare', 'dare'],
              ['capere', 'prendere, catturare'],
              ['trahere', 'trascinare, tirare'],
              ['fugere', 'fuggire'],
              ['currere', 'correre'],
              ['movēre', 'muovere'],
              ['vertere', 'volgere, girare'],
              ['stāre', 'stare fermo, stare in piedi'],
              ['vīvere', 'vivere'],
              ['dēbēre', 'dovere'],
            ],
            speakCols: [0],
            note: '«capere» e «fugere» finiscono in -ere come «legere», ma alla 1ª persona fanno «capiō» e «fugiō», con la -i-: sono i verbi della 3ª coniugazione detti «in -iō». Stessa cosa per «facere», «accipere», «incipere» che già conosci.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Dux mīlitibus crēdēbat»?',
            focus: 'Dux mīlitibus crēdēbat',
            options: [
              'Il comandante credeva ai soldati',
              'Il comandante credeva i soldati',
              'I soldati credevano al comandante',
            ],
            answer: 'Il comandante credeva ai soldati',
          },
          {
            type: 'choice',
            prompt: 'In una versione trovi «hostēs fūgērunt». Che cosa hanno fatto i nemici?',
            focus: 'hostēs fūgērunt',
            options: ['Sono fuggiti', 'Hanno combattuto', 'Sono stati messi in fuga'],
            answer: 'Sono fuggiti',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['audīre', 'ascoltare'],
              ['putāre', 'pensare'],
              ['ōrāre', 'pregare'],
              ['rogāre', 'chiedere'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['capere', 'prendere'],
              ['trahere', 'trascinare'],
              ['vertere', 'volgere'],
              ['vīvere', 'vivere'],
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
            type: 'analysis',
            sentence: 'Caesar mīlitēs in Galliam dūxit.',
            word: 'dūxit',
            translation: 'Cesare condusse i soldati in Gallia.',
            fields: [
              {
                label: 'Tempo',
                options: ['Perfetto', 'Imperfetto', 'Presente'],
                answer: 'Perfetto',
              },
              {
                label: 'Persona',
                options: ['3ª singolare', '3ª plurale', '1ª singolare'],
                answer: '3ª singolare',
              },
            ],
            note: 'Il perfetto ha un tema tutto suo, spesso lontano da quello del presente: «dūcere» fa «dūx-». È per questo che il vocabolario dà il paradigma intero — «dūcō, dūxī, ductum, dūcere» — e non solo l’infinito.',
          },
          {
            type: 'analysis',
            prompt: 'Stessa frase: analizza «mīlitēs»',
            sentence: 'Caesar mīlitēs in Galliam dūxit.',
            word: 'mīlitēs',
            translation: 'Cesare condusse i soldati in Gallia.',
            fields: [
              {
                label: 'Caso',
                options: ['Nominativo', 'Accusativo', 'Genitivo'],
                answer: 'Accusativo',
              },
              {
                label: 'Funzione',
                options: ['Soggetto', 'Complemento oggetto'],
                answer: 'Complemento oggetto',
              },
            ],
            note: 'Nella 3ª declinazione nominativo e accusativo plurale sono identici: «mīlitēs» vale per tutti e due. Ma il soggetto è già «Caesar», e un verbo ne vuole uno solo: quindi «mīlitēs» è l’oggetto.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Mīlitēs urbem oppugnāvērunt»? («oppugnāre» = assalire, «urbem» = la città)',
            focus: 'Mīlitēs urbem oppugnāvērunt',
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
            prompt: 'Traduci: «Vedevamo il re» («rēx» → acc. «rēgem»; «vedevamo» = vidēbāmus)',
            source: 'Vedevamo il re',
            answer: ['Rēgem', 'vidēbāmus'],
            extra: ['vīdimus', 'rēx'],
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
            body: 'Il pronome relativo latino ha tre forme al nominativo, una per genere:\n\n• «quī» (maschile) = che / il quale\n• «quae» (femminile) = che / la quale\n• «quod» (neutro) = che\n\nCome soggetto della relativa:\n• «Puer quī legit» = il ragazzo che legge\n• «Puella quae cantat» = la ragazza che canta\n• «Templum quod stat» = il tempio che sta',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Puer quī legit»?',
            focus: 'Puer qui legit',
            options: ['il ragazzo che legge', 'il ragazzo legge', 'quale ragazzo legge?'],
            answer: 'il ragazzo che legge',
          },
          {
            type: 'choice',
            prompt: 'Quale forma di «che» va con «puella» (femminile)?',
            focus: 'puella … cantat',
            options: ['quae', 'quī', 'quod'],
            answer: 'quae',
          },
          {
            type: 'match',
            prompt: 'Abbina la forma al genere',
            pairs: [
              ['quī', 'maschile (che)'],
              ['quae', 'femminile (che)'],
              ['quod', 'neutro (che)'],
            ],
          },
          {
            type: 'build',
            prompt: 'Traduci: «La donna che vede» («videt» = vede)',
            source: 'La donna che vede',
            answer: ['Femina', 'quae', 'videt'],
            extra: ['quī', 'quod'],
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
            body: '• «Puer quī legit» = il ragazzo che legge\n  → «quī» è maschile singolare (come puer), ma NOMINATIVO, perché è il soggetto di «legit» (chi legge? lui).\n\n• «Puer quem videō» = il ragazzo che vedo\n  → «quem» è sempre maschile singolare (come puer), ma ACCUSATIVO, perché è l’oggetto di «video» (vedo chi? lui).\n\nStesso antecedente, caso diverso: dipende dal ruolo nella relativa.',
          },
          {
            type: 'table',
            title: 'quī, quae, quod — singolare',
            columns: ['Caso', 'Masch.', 'Femm.', 'Neutro'],
            rows: [
              ['Nominativo', 'quī', 'quae', 'quod'],
              ['Genitivo', 'cuius', 'cuius', 'cuius'],
              ['Dativo', 'cui', 'cui', 'cui'],
              ['Accusativo', 'quem', 'quam', 'quod'],
              ['Ablativo', 'quō', 'quā', 'quō'],
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
            body: 'Oltre a «che» (soggetto o oggetto), il relativo può rendere anche «di cui, a cui, con cui», a seconda del caso:\n\n• GENITIVO «cuius» = di cui / del quale\n• DATIVO «cui» = a cui / al quale\n• ABLATIVO «quō / quā» = con cui / dal quale (spesso con una preposizione)\n\nEsempi:\n• «Vir cuius villa magna est» = l’uomo la cui casa è grande\n• «Puella cui rosam damus» = la ragazza a cui diamo la rosa',
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
        id: 'u11v',
        title: 'Le paroline che legano',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🔗',
            title: 'Piccole, e decisive',
            body:
              'Sono le parole più corte del latino e le più sottovalutate: ' +
              'congiunzioni e avverbi. Non si declinano, non si coniugano, non ' +
              'cambiano mai — c’è solo da riconoscerle.\n\n' +
              'Sono però quelle che dicono come sta insieme il discorso: «ma», ' +
              '«dunque», «infatti», «dopo che». Chi non le sa traduce parole ' +
              'giuste in un ordine che non significa niente.',
          },
          {
            type: 'table',
            title: 'Congiunzioni',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['et, -que, atque', 'e'],
              ['sed', 'ma'],
              ['autem', 'però, invece'],
              ['tamen', 'tuttavia'],
              ['nam, enim', 'infatti'],
              ['itaque, igitur', 'dunque, perciò'],
              ['aut, vel', 'oppure'],
              ['neque, nec', 'e non, né'],
              ['sī', 'se'],
              ['nisi', 'se non, a meno che'],
              ['quod, quia', 'perché (causa)'],
              ['ubi', 'quando; dove'],
              ['postquam', 'dopo che'],
              ['dum', 'mentre'],
            ],
            speakCols: [0],
            note: '«-que» non è una parola a sé: si attacca in fondo alla seconda parola. «Senātus populusque» = il senato E il popolo.',
          },
          {
            type: 'info',
            icon: '🙃',
            title: 'Tre che non stanno mai per prime',
            body:
              'Una stranezza che spiazza: «autem», «enim» e «igitur» non si ' +
              'mettono all’inizio della frase. Il latino le piazza al SECONDO ' +
              'posto, dopo la prima parola.\n\n' +
              '«Caesar autem vēnit» = Cesare però venne\n' +
              '«Erat enim fortis» = era infatti coraggioso\n\n' +
              'Traducendo le sposti dove servono in italiano. Se in una versione ' +
              'trovi una parola strana in seconda posizione, è quasi sempre una ' +
              'di queste.',
          },
          {
            type: 'table',
            title: 'Avverbi',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['nōn', 'non'],
              ['iam', 'già, ormai'],
              ['semper', 'sempre'],
              ['saepe', 'spesso'],
              ['numquam', 'mai'],
              ['statim', 'subito'],
              ['deinde', 'poi, in seguito'],
              ['tum, tunc', 'allora'],
              ['ita, sīc', 'così'],
              ['diū', 'a lungo'],
              ['valdē', 'molto'],
              ['ibi', 'lì'],
            ],
            speakCols: [0],
          },
          {
            type: 'choice',
            prompt: 'Come si traduce «Caesar autem vēnit»?',
            focus: 'Caesar autem vēnit',
            options: ['Cesare però venne', 'Cesare venne da solo', 'Anche Cesare venne'],
            answer: 'Cesare però venne',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «senātus populusque»?',
            focus: 'senātus populusque',
            options: [
              'il senato e il popolo',
              'il senato del popolo',
              'il senato o il popolo',
            ],
            answer: 'il senato e il popolo',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['postquam', 'dopo che'],
              ['tamen', 'tuttavia'],
              ['nisi', 'se non'],
              ['itaque', 'perciò'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['statim', 'subito'],
              ['numquam', 'mai'],
              ['deinde', 'poi'],
              ['diū', 'a lungo'],
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
            type: 'analysis',
            sentence: 'Mīles quī pugnābat vulnus accēpit.',
            word: 'quī',
            translation: 'Il soldato che combatteva ricevette una ferita.',
            fields: [
              {
                label: 'Caso',
                options: ['Nominativo', 'Accusativo', 'Genitivo'],
                answer: 'Nominativo',
              },
              {
                label: 'Numero',
                options: ['Singolare', 'Plurale'],
                answer: 'Singolare',
              },
              {
                label: 'Prende genere e numero da',
                options: ['mīles', 'vulnus', 'pugnābat'],
                answer: 'mīles',
              },
            ],
            note: 'La regola del relativo, in due tempi. Genere e numero vengono dall’antecedente («mīles»: maschile singolare). Il CASO no: quello dipende dalla funzione che il pronome ha nella sua frase — qui è il soggetto di «pugnābat», quindi nominativo.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Puer quī rosam portat»?',
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
            prompt: 'In «Rēx quem mīlitēs amant», che caso è «quem»? («mīlitēs» = i soldati, «amant» = amano)',
            focus: 'Rēx quem mīlitēs amant',
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
            extra: ['quī', 'quem'],
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['quī', 'che (soggetto)'],
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
            body: 'Dipende dal participio:\n\n• con participio PERFETTO (azione già avvenuta):\n«Urbe captā, hostēs fūgērunt» = Presa la città, i nemici fuggirono (= dopo che la città fu presa…).\n\n• con participio PRESENTE (azione contemporanea):\n«Rēge rēgnante, populus gaudēbat» = Regnando il re / mentre il re regnava, il popolo gioiva.',
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
        id: 'u12v',
        title: 'Verbi, secondo giro',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Altri ventiquattro verbi',
            body:
              'I verbi dell’unità 8 erano il nucleo. Questi sono quelli che ' +
              'incontri subito dopo aprendo una pagina di storia: azioni di ' +
              'guerra, di decisione, di movimento.\n\n' +
              'Molti sono composti di verbi che già conosci — «per-venīre», ' +
              '«re-linquere», «con-ficere» — e riconoscere il pezzo di base ' +
              'aiuta a indovinare il senso anche senza vocabolario.',
          },
          {
            type: 'table',
            title: 'Fare, decidere, dire',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['facere', 'fare'],
              ['pōnere', 'porre — «castra pōnere» = accamparsi'],
              ['cōnstituere', 'decidere, stabilire'],
              ['cōgere', 'costringere; radunare'],
              ['iubēre', 'ordinare'],
              ['respondēre', 'rispondere'],
              ['appellāre', 'chiamare, dare il nome di'],
              ['exīstimāre', 'ritenere, giudicare'],
              ['intellegere', 'capire'],
              ['cognōscere', 'venire a sapere'],
              ['accipere', 'ricevere, accogliere'],
              ['incipere', 'cominciare'],
            ],
            speakCols: [0],
            note: '«cognōscere» al perfetto («nōvī») vale «so», perché «sono venuto a sapere» è già un sapere acquisito. È un caso in cui il perfetto latino si traduce con un presente italiano.',
          },
          {
            type: 'table',
            title: 'Guerra e movimento',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['interficere', 'uccidere'],
              ['occīdere', 'uccidere, abbattere'],
              ['expugnāre', 'espugnare, prendere d’assalto'],
              ['vastāre', 'devastare'],
              ['servāre', 'salvare, custodire'],
              ['relinquere', 'lasciare, abbandonare'],
              ['trādere', 'consegnare; tramandare'],
              ['reddere', 'restituire'],
              ['contendere', 'affrettarsi; combattere'],
              ['pervenīre', 'giungere'],
              ['discēdere', 'allontanarsi, andarsene'],
              ['perterrēre', 'spaventare'],
            ],
            speakCols: [0],
            note: '«trādere» è insieme «consegnare al nemico» (da cui «tradire») e «tramandare ai posteri»: lo stesso gesto di passare qualcosa a qualcun altro.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «castra posuērunt»?',
            focus: 'castra posuērunt',
            options: ['posero l’accampamento', 'presero l’accampamento', 'lasciarono l’accampamento'],
            answer: 'posero l’accampamento',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «pervēnērunt»?',
            focus: 'pervēnērunt',
            options: ['giunsero', 'partirono', 'vinsero'],
            answer: 'giunsero',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['relinquere', 'abbandonare'],
              ['cōgere', 'costringere'],
              ['iubēre', 'ordinare'],
              ['discēdere', 'andarsene'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['intellegere', 'capire'],
              ['cognōscere', 'venire a sapere'],
              ['exīstimāre', 'ritenere'],
              ['trādere', 'consegnare'],
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
            type: 'analysis',
            sentence: 'Urbe captā, hostēs discessērunt.',
            word: 'captā',
            translation: 'Presa la città, i nemici se ne andarono.',
            fields: [
              {
                label: 'Caso',
                options: ['Ablativo', 'Nominativo', 'Accusativo'],
                answer: 'Ablativo',
              },
              {
                label: 'Forma',
                options: ['Participio perfetto', 'Participio presente', 'Infinito'],
                answer: 'Participio perfetto',
              },
              {
                label: 'Costrutto',
                options: ['Ablativo assoluto', 'Complemento d’agente', 'Apposizione'],
                answer: 'Ablativo assoluto',
              },
            ],
            note: 'Un nome e un participio, tutti e due in ablativo, staccati dal resto della frase: è l’ablativo assoluto. Si traduce con una frase intera — «dopo che la città fu presa», «presa la città» — scegliendo la sfumatura (tempo, causa, condizione) che il contesto suggerisce.',
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
        id: 'u13v',
        title: 'Dire, sapere, volere',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'I verbi che aprono l’accusativo + infinito',
            body:
              'Il costrutto appena studiato non arriva mai da solo: lo annuncia un ' +
              'verbo. Sono sempre gli stessi — dire, sapere, credere, ordinare — e ' +
              'riconoscerli è metà del lavoro.\n\n' +
              'Quando in una versione vedi uno di questi verbi, fermati e cerca ' +
              'subito la coppia ACCUSATIVO + INFINITO che lo segue: è lì che sta ' +
              'la frase vera.',
          },
          {
            type: 'table',
            title: 'I verbi del dire',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['negāre', 'negare, dire di no'],
              ['nūntiāre', 'annunciare, riferire'],
              ['prōmittere', 'promettere'],
              ['imperāre', 'comandare (+ dativo)'],
              ['vetāre', 'vietare'],
              ['monēre', 'avvertire, ammonire'],
              ['ostendere', 'mostrare, far vedere'],
              ['iūrāre', 'giurare'],
              ['interrogāre', 'interrogare'],
              ['cōnfirmāre', 'assicurare; rafforzare'],
            ],
            speakCols: [0],
            note: '«negāre» non si traduce con «negare»: vale «dire che NON». «Negat sē vēnisse» non è «nega di essere venuto» ma, più naturalmente, «dice di non essere venuto». Il latino mette la negazione nel verbo, l’italiano nella subordinata.',
          },
          {
            type: 'table',
            title: 'Sapere, volere, bisognare',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['scīre', 'sapere'],
              ['nescīre', 'non sapere, ignorare'],
              ['cupere', 'desiderare, bramare'],
              ['optāre', 'desiderare, scegliere'],
              ['dubitāre', 'dubitare; esitare'],
              ['iūdicāre', 'giudicare'],
              ['reperīre', 'trovare, scoprire'],
              ['appārēre', 'apparire; risultare chiaro'],
              ['oportet', 'bisogna, si deve'],
              ['licet', 'è permesso, è lecito'],
            ],
            speakCols: [0],
            note: '«oportet» e «licet» si trovano solo alla 3ª persona singolare: sono verbi IMPERSONALI, come l’italiano «bisogna» e «si può». Non hanno un soggetto che agisce, e reggono l’accusativo + infinito: «oportet tē venīre» = bisogna che tu venga.',
          },
          {
            type: 'choice',
            prompt: 'Come si traduce «Negat sē scīre»?',
            focus: 'Negat sē scīre',
            options: [
              'Dice di non sapere',
              'Nega di sapere di sé',
              'Non sa di dire',
            ],
            answer: 'Dice di non sapere',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Oportet mīlitēs pugnāre»?',
            focus: 'Oportet mīlitēs pugnāre',
            options: [
              'Bisogna che i soldati combattano',
              'I soldati devono essere combattuti',
              'I soldati bisognano combattere',
            ],
            answer: 'Bisogna che i soldati combattano',
          },
          {
            type: 'choice',
            prompt: 'Quale di questi verbi è impersonale, cioè esiste solo alla 3ª singolare?',
            options: ['licet', 'iūrāre', 'reperīre'],
            answer: 'licet',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['nūntiāre', 'annunciare'],
              ['vetāre', 'vietare'],
              ['monēre', 'avvertire'],
              ['ostendere', 'mostrare'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['nescīre', 'ignorare'],
              ['cupere', 'desiderare'],
              ['reperīre', 'trovare'],
              ['dubitāre', 'esitare'],
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
            type: 'analysis',
            sentence: 'Caesar dīcit hostēs venīre.',
            word: 'hostēs',
            translation: 'Cesare dice che i nemici arrivano.',
            fields: [
              {
                label: 'Caso',
                options: ['Accusativo', 'Nominativo', 'Genitivo'],
                answer: 'Accusativo',
              },
              {
                label: 'Funzione',
                options: ['Soggetto dell’infinito', 'Complemento oggetto', 'Soggetto della frase'],
                answer: 'Soggetto dell’infinito',
              },
            ],
            note: 'Qui sta il salto che spiazza chi arriva dall’italiano: «hostēs» è accusativo ma non è l’oggetto — è il SOGGETTO di «venīre». Tradotto, diventa il soggetto di una frase con «che»: «che i nemici arrivano».',
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
  {
    id: 'u14',
    title: 'Unità 14 — I pronomi',
    subtitle: 'Le parole più frequenti del latino',
    color: '#8e2f4f',
    lessons: [
      {
        id: 'u14l1',
        title: 'Io, tu, noi, voi',
        icon: '🙋',
        exercises: [
          {
            type: 'info',
            icon: '🙋',
            title: 'Che cos’è un pronome',
            body:
              'Un PRONOME è una parola che sta al posto di un nome, per non ' +
              'ripeterlo. In italiano: «Marco è arrivato: LUI è stanco» — «lui» ' +
              'sta per Marco.\n\n' +
              'Sono parole cortissime e le più frequenti di tutte: in una pagina ' +
              'di Cesare ne trovi decine. Se non le riconosci, la frase resta ' +
              'chiusa anche se conosci tutti gli altri vocaboli.\n\n' +
              'Cominciamo dai più semplici: io, tu, noi, voi.',
          },
          {
            type: 'info',
            icon: '🤫',
            title: 'Di solito non si scrivono',
            body:
              'Il latino fa come l’italiano: il SOGGETTO pronome si omette, ' +
              'perché lo dice già la desinenza del VERBO.\n\n' +
              '«amō» = (io) amo — non serve scrivere «ego»\n\n' +
              'Se invece «ego» c’è, non è per riempire: serve a INSISTERE, a ' +
              'mettere in contrasto.\n\n' +
              '«ego amō» = io amo (io, non un altro)\n\n' +
              'Quindi, quando in una versione trovi un pronome soggetto scritto, ' +
              'chiediti sempre: contro chi lo sta contrapponendo?',
          },
          {
            type: 'table',
            title: 'ego (io) e tū (tu)',
            columns: ['Caso', 'io', 'tu'],
            rows: [
              ['Nominativo', 'ego', 'tū'],
              ['Genitivo', 'meī', 'tuī'],
              ['Dativo', 'mihi', 'tibi'],
              ['Accusativo', 'mē', 'tē'],
              ['Ablativo', 'mē', 'tē'],
            ],
            speakCols: [1, 2],
            note: 'Accusativo e ablativo sono identici: «mē», «tē». A distinguerli è il contesto — o la preposizione che li precede.',
          },
          {
            type: 'table',
            title: 'nōs (noi) e vōs (voi)',
            columns: ['Caso', 'noi', 'voi'],
            rows: [
              ['Nominativo', 'nōs', 'vōs'],
              ['Genitivo', 'nostrī', 'vestrī'],
              ['Dativo', 'nōbīs', 'vōbīs'],
              ['Accusativo', 'nōs', 'vōs'],
              ['Ablativo', 'nōbīs', 'vōbīs'],
            ],
            speakCols: [1, 2],
          },
          {
            type: 'info',
            icon: '🔗',
            title: 'Il «cum» che si attacca dietro',
            body:
              'Una stranezza che nelle versioni si incontra spessissimo: con ' +
              'questi pronomi la preposizione «cum» non sta davanti, ma si ' +
              'appiccica in fondo.\n\n' +
              '«mēcum» = con me\n' +
              '«tēcum» = con te\n' +
              '«nōbīscum» = con noi\n' +
              '«sēcum» = con sé\n\n' +
              'Non è una parola nuova da imparare: è solo «cum» spostato.',
          },
          {
            type: 'info',
            icon: '🏠',
            title: 'I possessivi',
            body:
              'Da questi pronomi nascono i possessivi, che sono AGGETTIVI ' +
              'normalissimi e concordano col nome:\n\n' +
              '• «meus, -a, -um» = mio\n' +
              '• «tuus, -a, -um» = tuo\n' +
              '• «noster, -tra, -trum» = nostro\n' +
              '• «vester, -tra, -trum» = vostro\n\n' +
              'Attenzione: concordano con la cosa posseduta, non con chi ' +
              'possiede. «Villa mea» = la mia fattoria («mea» è femminile ' +
              'perché lo è «villa», anche se il padrone è un uomo).',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «mēcum»?',
            focus: 'mēcum',
            options: ['con me', 'a me', 'di me'],
            answer: 'con me',
          },
          {
            type: 'choice',
            prompt: 'In una versione trovi «ego dīcō». Perché c’è «ego»?',
            focus: 'ego dīcō',
            options: [
              'per insistere: sono IO a dirlo, non un altro',
              'perché senza non si capirebbe il verbo',
              'perché è obbligatorio in latino',
            ],
            answer: 'per insistere: sono IO a dirlo, non un altro',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['mihi', 'a me'],
              ['tē', 'te'],
              ['nōbīs', 'a noi'],
              ['vestrī', 'di voi'],
            ],
          },
        ],
      },
      {
        id: 'u14l2',
        title: 'Is, ea, id',
        icon: '👉',
        exercises: [
          {
            type: 'info',
            icon: '👉',
            title: 'Il pronome che incontrerai di più',
            body:
              'Il latino non ha un pronome apposta per «lui, lei, loro». Usa ' +
              '«is, ea, id», che fa due mestieri insieme:\n\n' +
              '• come PRONOME → lui, lei, esso, ciò\n' +
              '• come AGGETTIVO → quel, quella (un «quello» debole, senza ' +
              'gesto della mano)\n\n' +
              '«eum videō» = lo vedo (vedo lui)\n' +
              '«eum virum videō» = vedo quell’uomo\n\n' +
              'È fra le parole più frequenti dell’intera lingua latina. Vale la ' +
              'pena imparare bene questa tabella: te la ritroverai ovunque.',
          },
          {
            type: 'table',
            title: 'is, ea, id — singolare',
            columns: ['Caso', 'm.', 'f.', 'n.'],
            rows: [
              ['Nom.', 'is', 'ea', 'id'],
              ['Gen.', 'eius', 'eius', 'eius'],
              ['Dat.', 'eī', 'eī', 'eī'],
              ['Acc.', 'eum', 'eam', 'id'],
              ['Abl.', 'eō', 'eā', 'eō'],
            ],
            speakCols: [1, 2, 3],
            note: 'Genitivo e dativo singolare sono uguali per tutti e tre i generi: «eius» e «eī». Meno forme da imparare di quante sembri.',
          },
          {
            type: 'table',
            title: 'is, ea, id — plurale',
            columns: ['Caso', 'm.', 'f.', 'n.'],
            rows: [
              ['Nom.', 'eī', 'eae', 'ea'],
              ['Gen.', 'eōrum', 'eārum', 'eōrum'],
              ['Dat.', 'eīs', 'eīs', 'eīs'],
              ['Acc.', 'eōs', 'eās', 'ea'],
              ['Abl.', 'eīs', 'eīs', 'eīs'],
            ],
            speakCols: [1, 2, 3],
            note: 'Al plurale dativo e ablativo sono sempre «eīs», per tutti i generi.',
          },
          {
            type: 'info',
            icon: '💡',
            title: '«eius» vuol dire «di lui», «di lei»',
            body:
              '«eius» è un GENITIVO, quindi vale «di lui», «di lei», «di ciò» — ' +
              'e traducendo diventa spesso «suo».\n\n' +
              '«eius villa» = la fattoria di lui / la sua fattoria\n\n' +
              'Non cambia mai forma: non concorda con «villa», perché è un ' +
              'genitivo, non un aggettivo. Chi lo scambia per un aggettivo si ' +
              'aspetta «eia villa» e non trova nulla.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «eam videt»?',
            focus: 'eam videt',
            options: ['la vede (vede lei)', 'lo vede', 'le dà'],
            answer: 'la vede (vede lei)',
          },
          {
            type: 'choice',
            prompt: 'In «eī librum dat», che caso è «eī»?',
            focus: 'eī librum dat',
            options: [
              'dativo: gli dà il libro',
              'nominativo: lui dà il libro',
              'accusativo: dà lui al libro',
            ],
            answer: 'dativo: gli dà il libro',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['eum', 'lui (oggetto)'],
              ['eius', 'di lui'],
              ['eōs', 'loro (oggetto)'],
              ['eīs', 'a loro'],
            ],
          },
        ],
      },
      {
        id: 'u14l3',
        title: 'Questo e quello',
        icon: '👆',
        exercises: [
          {
            type: 'info',
            icon: '👆',
            title: 'Vicino, lontano',
            body:
              'Questi due indicano, e si dividono lo spazio come in italiano:\n\n' +
              '• «hic, haec, hoc» = questo — vicino a chi parla\n' +
              '• «ille, illa, illud» = quello — lontano\n\n' +
              'Nei testi «hic» spesso vale «quest’ultimo» e «ille» «il primo, ' +
              'quell’altro», quando si parla di due persone appena nominate.\n\n' +
              'E «ille» ha un uso tutto suo: davanti a un nome famoso vale ' +
              '«il famoso, il celebre». «Ille Caesar» non è «quel Cesare lì», è ' +
              '«il grande Cesare».',
          },
          {
            type: 'table',
            title: 'hic, haec, hoc (questo) — singolare',
            columns: ['Caso', 'm.', 'f.', 'n.'],
            rows: [
              ['Nom.', 'hic', 'haec', 'hoc'],
              ['Gen.', 'huius', 'huius', 'huius'],
              ['Dat.', 'huic', 'huic', 'huic'],
              ['Acc.', 'hunc', 'hanc', 'hoc'],
              ['Abl.', 'hōc', 'hāc', 'hōc'],
            ],
            speakCols: [1, 2, 3],
            note: 'Al plurale: hī, hae, haec (nom.) — hōrum, hārum, hōrum (gen.) — hīs per dativo e ablativo di tutti i generi.',
          },
          {
            type: 'table',
            title: 'ille, illa, illud (quello) — singolare',
            columns: ['Caso', 'm.', 'f.', 'n.'],
            rows: [
              ['Nom.', 'ille', 'illa', 'illud'],
              ['Gen.', 'illīus', 'illīus', 'illīus'],
              ['Dat.', 'illī', 'illī', 'illī'],
              ['Acc.', 'illum', 'illam', 'illud'],
              ['Abl.', 'illō', 'illā', 'illō'],
            ],
            speakCols: [1, 2, 3],
            note: 'Al plurale «ille» si comporta come un aggettivo normale: illī, illae, illa — illōrum, illārum, illōrum — illīs.',
          },
          {
            type: 'info',
            icon: '🔑',
            title: 'La regola che vale per tutti',
            body:
              'Prima di scoraggiarti davanti a tre tabelle: i pronomi hanno ' +
              'quasi tutti le STESSE due desinenze particolari, e sono le uniche ' +
              'davvero da ricordare.\n\n' +
              '• GENITIVO singolare in «-īus» — uguale nei tre generi\n' +
              '• DATIVO singolare in «-ī» — uguale nei tre generi\n\n' +
              'Vale per «is», per «hic», per «ille» e anche per il relativo ' +
              '«quī» che già conosci. Tutto il resto assomiglia alle desinenze ' +
              'dei nomi.',
          },
          {
            type: 'table',
            title: 'La stessa coppia, ovunque',
            columns: ['Pronome', 'Genitivo', 'Dativo'],
            rows: [
              ['is, ea, id', 'eius', 'eī'],
              ['hic, haec, hoc', 'huius', 'huic'],
              ['ille, illa, illud', 'illīus', 'illī'],
              ['quī, quae, quod', 'cuius', 'cui'],
            ],
            speakCols: [1, 2],
            note: 'Le riconosci a colpo d’occhio: se una parolina finisce in -ius è un genitivo, se finisce in -i è un dativo. E non ti dice il genere, quindi non perderci tempo.',
          },
          {
            type: 'info',
            icon: '🎯',
            title: 'Altri due che tornano sempre',
            body:
              '• «ipse, ipsa, ipsum» = stesso, in persona. Rafforza: ' +
              '«Caesar ipse» = Cesare in persona, proprio Cesare.\n' +
              '• «īdem, eadem, idem» = lo stesso, il medesimo. ' +
              '«eōdem diē» = nello stesso giorno.\n\n' +
              'Occhio a non confonderli: «ipse» sottolinea, «īdem» dice che è ' +
              'proprio quello di prima.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «hunc virum videō»?',
            focus: 'hunc virum videō',
            options: ['vedo quest’uomo', 'vedo quell’uomo', 'quest’uomo vede'],
            answer: 'vedo quest’uomo',
          },
          {
            type: 'choice',
            prompt: 'In una versione trovi «Cicerō ille». Come lo rendi?',
            focus: 'Cicerō ille',
            options: [
              'il celebre Cicerone',
              'quel Cicerone laggiù',
              'lo stesso Cicerone',
            ],
            answer: 'il celebre Cicerone',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Caesar ipse»?',
            focus: 'Caesar ipse',
            options: ['Cesare in persona', 'lo stesso Cesare di prima', 'quel Cesare'],
            answer: 'Cesare in persona',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['huic', 'a costui'],
              ['illīus', 'di quello'],
              ['hanc', 'questa (oggetto)'],
              ['illōs', 'quelli (oggetto)'],
            ],
          },
        ],
      },
      {
        id: 'u14l4',
        title: 'Sé stesso: sē e suus',
        icon: '🪞',
        exercises: [
          {
            type: 'info',
            icon: '🪞',
            title: 'Il pronome riflessivo',
            body:
              'RIFLESSIVO vuol dire che l’azione torna su chi la compie: in ' +
              'italiano «si lava», «pensa a sé».\n\n' +
              'In latino è «sē», e ha una particolarità: non ha il ' +
              'NOMINATIVO. È logico — non può essere il soggetto, visto che ' +
              'rimanda al soggetto.\n\n' +
              'Vale sia per il singolare sia per il plurale: «sē» può essere ' +
              '«sé» o «loro stessi».',
          },
          {
            type: 'table',
            title: 'sē — il riflessivo di 3ª persona',
            columns: ['Caso', 'Forma', 'Significato'],
            rows: [
              ['Nom.', '—', 'non esiste'],
              ['Gen.', 'suī', 'di sé'],
              ['Dat.', 'sibi', 'a sé'],
              ['Acc.', 'sē', 'sé, si'],
              ['Abl.', 'sē', 'da sé, con sé'],
            ],
            speakCols: [1],
            note: 'Ricordi «Caesar dīcit sē vēnisse» dell’unità scorsa? Era proprio questo «sē»: Cesare dice che LUI STESSO è venuto.',
          },
          {
            type: 'info',
            icon: '⚠️',
            title: 'La trappola: «suus» contro «eius»',
            body:
              'Qui si separano quelli che traducono bene e quelli che ' +
              'traducono a caso. Due modi di dire «suo», e significano cose ' +
              'diverse:\n\n' +
              '«suus, -a, -um» = suo PROPRIO — appartiene al soggetto della frase\n' +
              '«eius» = di lui, di lei — appartiene a QUALCUN ALTRO\n\n' +
              '«Caesar suum equum videt» = Cesare vede il proprio cavallo\n' +
              '«Caesar eius equum videt» = Cesare vede il cavallo di lui ' +
              '(di un altro)\n\n' +
              'In italiano diremmo «il suo cavallo» in tutti e due i casi, ed è ' +
              'per questo che l’errore non si sente. In latino la differenza è ' +
              'scritta a chiare lettere.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Dominus servum suum vocat»?',
            focus: 'servum suum',
            options: [
              'il padrone chiama il proprio servo',
              'il padrone chiama il servo di un altro',
              'il servo chiama il proprio padrone',
            ],
            answer: 'il padrone chiama il proprio servo',
          },
          {
            type: 'choice',
            prompt: 'E «Dominus servum eius vocat»?',
            focus: 'servum eius',
            options: [
              'il padrone chiama il servo di un altro',
              'il padrone chiama il proprio servo',
              'il servo del padrone chiama',
            ],
            answer: 'il padrone chiama il servo di un altro',
          },
          {
            type: 'choice',
            prompt: 'Perché «sē» non ha il nominativo?',
            options: [
              'perché rimanda al soggetto, quindi non può esserlo',
              'perché è una parola difettiva senza motivo',
              'perché è sempre plurale',
            ],
            answer: 'perché rimanda al soggetto, quindi non può esserlo',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['sibi', 'a sé'],
              ['sēcum', 'con sé'],
              ['suus', 'suo (del soggetto)'],
              ['eius', 'di lui (di un altro)'],
            ],
          },
        ],
      },
      {
        id: 'u14v',
        title: 'Quanti e quali',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Numeri e quantità',
            body:
              'I pronomi appena studiati hanno dei parenti stretti: le parole che ' +
              'dicono QUANTI. Alcune sono numeri veri e propri, altre — «nessuno», ' +
              '«un altro», «tutti e due» — si comportano come pronomi, e si ' +
              'declinano come loro.\n\n' +
              'Sono parole piccolissime che le versioni usano di continuo, e che ' +
              'chi non le riconosce salta, perdendo il senso della frase.',
          },
          {
            type: 'table',
            title: 'I numeri',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['ūnus, ūna, ūnum', 'uno'],
              ['duo, duae, duo', 'due'],
              ['trēs, tria', 'tre'],
              ['quattuor', 'quattro'],
              ['quīnque', 'cinque'],
              ['sex', 'sei'],
              ['decem', 'dieci'],
              ['centum', 'cento'],
              ['mīlle', 'mille'],
              ['prīmus, prīma, prīmum', 'primo'],
            ],
            speakCols: [0],
            note: 'Solo i primi tre numeri si declinano: da «quattuor» in poi la parola non cambia mai, in nessun caso. «Mīlle» al singolare è invariabile, ma al plurale diventa un neutro («mīlia») che regge il genitivo: «decem mīlia mīlitum» = diecimila soldati, alla lettera «dieci migliaia DI soldati».',
          },
          {
            type: 'table',
            title: 'Quanti, quali, quanto',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['alius, alia, aliud', 'un altro (fra molti)'],
              ['alter, altera, alterum', 'l’altro (fra due)'],
              ['uterque, utraque, utrumque', 'l’uno e l’altro, entrambi'],
              ['nūllus, nūlla, nūllum', 'nessuno'],
              ['sōlus, sōla, sōlum', 'solo, unico'],
              ['tōtus, tōta, tōtum', 'tutto intero'],
              ['cēterī, cēterae, cētera', 'gli altri, i restanti'],
              ['nēmō', 'nessuno (di persona)'],
              ['nihil', 'niente'],
              ['paucī, paucae, pauca', 'pochi'],
            ],
            speakCols: [0],
            note: 'Questi aggettivi sembrano della 1ª classe, ma al genitivo e al dativo singolare seguono i PRONOMI: genitivo in -īus («ūnīus», «tōtīus», «alterīus»), dativo in -ī («ūnī», «tōtī», «alterī»). Sono nove in tutto e si imparano insieme: ūnus, sōlus, tōtus, ūllus, nūllus, alter, uter, neuter, alius.',
          },
          {
            type: 'choice',
            prompt: 'Qual è la differenza fra «alius» e «alter»?',
            options: [
              '«alter» è l’altro di due, «alius» un altro fra molti',
              '«alius» è maschile, «alter» femminile',
              'Nessuna: sono sinonimi',
            ],
            answer: '«alter» è l’altro di due, «alius» un altro fra molti',
          },
          {
            type: 'choice',
            prompt: 'Come si traduce «decem mīlia mīlitum»?',
            focus: 'decem mīlia mīlitum',
            options: ['diecimila soldati', 'dieci soldati scelti', 'mille soldati per dieci volte'],
            answer: 'diecimila soldati',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «tōtīus urbis»?',
            focus: 'tōtīus urbis',
            options: ['di tutta la città', 'a tutta la città', 'in tutta la città'],
            answer: 'di tutta la città',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['trēs', 'tre'],
              ['quīnque', 'cinque'],
              ['centum', 'cento'],
              ['prīmus', 'primo'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['uterque', 'entrambi'],
              ['nēmō', 'nessuno'],
              ['cēterī', 'i restanti'],
              ['paucī', 'pochi'],
            ],
          },
        ],
      },
      {
        id: 'u14l5',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '🧭',
            title: 'Come si affrontano',
            body:
              'Davanti a una parolina corta che non riconosci, fai così:\n\n' +
              '1. Finisce in «-ius»? È un GENITIVO: «di lui», «di questo», ' +
              '«di quello».\n' +
              '2. Finisce in «-ī» o «-ic»? Probabile DATIVO: «a lui», «a costui».\n' +
              '3. Comincia per «h-»? È «questo». Per «ill-»? È «quello». ' +
              'Per «e-» o «i-»? È «is», cioè «lui» o «quel».\n' +
              '4. È «sē» o «suus»? Allora torna al SOGGETTO della frase: è lì ' +
              'che devi guardare.',
          },
          {
            type: 'analysis',
            sentence: 'Rēx fīlium suum vocāvit.',
            word: 'suum',
            translation: 'Il re chiamò suo figlio.',
            fields: [
              {
                label: 'Caso',
                options: ['Accusativo', 'Nominativo', 'Dativo'],
                answer: 'Accusativo',
              },
              {
                label: 'Si riferisce',
                options: ['al soggetto (il re)', 'a un’altra persona', 'a chi parla'],
                answer: 'al soggetto (il re)',
              },
            ],
            note: '«suus» è riflessivo: rimanda sempre al soggetto della frase. Se il figlio fosse di qualcun altro il latino userebbe «eius». In italiano la differenza non si vede — «suo» vale per tutti e due — ed è proprio per questo che va decisa guardando il latino.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Rēx eī urbem dat»?',
            focus: 'Rēx eī urbem dat',
            options: [
              'Il re gli dà la città',
              'Il re dà lui alla città',
              'La città dà il re a lui',
            ],
            answer: 'Il re gli dà la città',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Hic mīles fortis est»? («fortis» = coraggioso)',
            focus: 'Hic mīles fortis est',
            options: [
              'Questo soldato è coraggioso',
              'Qui il soldato è coraggioso',
              'Quel soldato è coraggioso',
            ],
            answer: 'Questo soldato è coraggioso',
          },
          {
            type: 'choice',
            prompt: 'In «Caesar mīlitēs suōs laudat», chi sono i soldati?',
            focus: 'mīlitēs suōs',
            options: [
              'i soldati di Cesare stesso',
              'i soldati di un altro comandante',
              'i soldati nemici',
            ],
            answer: 'i soldati di Cesare stesso',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Cum eō vēnit»?',
            focus: 'Cum eō vēnit',
            options: ['Venne con lui', 'Venne da lui', 'Lui venne'],
            answer: 'Venne con lui',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Lo vedo» (vedo lui)',
            source: 'Lo vedo',
            answer: ['Eum', 'videō'],
            extra: ['is', 'eius'],
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['eum', 'lui (oggetto)'],
              ['hunc', 'costui (oggetto)'],
              ['illum', 'quello (oggetto)'],
              ['sē', 'sé stesso'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['eius villa', 'la fattoria di lui'],
              ['sua villa', 'la propria fattoria'],
              ['haec villa', 'questa fattoria'],
              ['illa villa', 'quella fattoria'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u15',
    title: 'Unità 15 — Il passivo',
    subtitle: 'Quando il soggetto subisce',
    color: '#6b7a2f',
    lessons: [
      {
        id: 'u15l1',
        title: 'Attivo e passivo',
        icon: '🔄',
        exercises: [
          {
            type: 'info',
            icon: '🔄',
            title: 'Le due voci del verbo',
            body:
              'Partiamo dall’italiano, come sempre. La stessa scena si può ' +
              'raccontare in due modi:\n\n' +
              'Il soldato prende la città. → il soggetto AGISCE: è la voce ATTIVA.\n' +
              'La città è presa dal soldato. → il soggetto SUBISCE: è la voce ' +
              'PASSIVA.\n\n' +
              'Cambia chi sta al centro della frase. Nel passivo l’oggetto ' +
              'diventa soggetto, e chi compiva l’azione finisce in coda, ' +
              'introdotto da «da».\n\n' +
              'Gli storici latini usano il passivo di continuo, perché spesso ' +
              'importa più il fatto che l’autore: «la città fu presa», «i ponti ' +
              'furono tagliati».',
          },
          {
            type: 'info',
            icon: '🅁',
            title: 'La marca del passivo è una R',
            body:
              'Non serve imparare un verbo nuovo: cambiano solo le desinenze ' +
              'delle PERSONE, e quasi tutte guadagnano una «r».\n\n' +
              '«amat» = ama → «amātur» = è amato\n\n' +
              'Se in una versione trovi un verbo che finisce in «-tur» o ' +
              '«-ntur», sei quasi certamente davanti a un passivo. È uno dei ' +
              'segnali più affidabili di tutto il latino.',
          },
          {
            type: 'table',
            title: 'Desinenze: attive e passive a confronto',
            columns: ['Persona', 'Attivo', 'Passivo'],
            rows: [
              ['io', '-ō', '-or'],
              ['tu', '-s', '-ris'],
              ['lui/lei', '-t', '-tur'],
              ['noi', '-mus', '-mur'],
              ['voi', '-tis', '-minī'],
              ['loro', '-nt', '-ntur'],
            ],
            note: 'Cinque desinenze su sei aggiungono o contengono una «r». L’unica fuori dal coro è «-minī» della seconda plurale.',
          },
          {
            type: 'table',
            title: 'amāre al presente passivo',
            columns: ['Latino', 'Italiano'],
            rows: [
              ['amor', 'sono amato'],
              ['amāris', 'sei amato'],
              ['amātur', 'è amato'],
              ['amāmur', 'siamo amati'],
              ['amāminī', 'siete amati'],
              ['amantur', 'sono amati'],
            ],
            speakCols: [0],
            note: 'Occhio alla prima persona: «amor» (sono amato) non è «amore». In latino l’amore è «amor, amōris» — stessa forma, parola diversa. Lo capisci dalla frase.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Urbs capitur»?',
            focus: 'Urbs capitur',
            options: ['La città è presa', 'La città prende', 'Prendi la città'],
            answer: 'La città è presa',
          },
          {
            type: 'choice',
            prompt: 'Quale di queste forme è passiva?',
            options: ['vidētur', 'videt', 'vidēre'],
            answer: 'vidētur',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['amat', 'ama'],
              ['amātur', 'è amato'],
              ['amant', 'amano'],
              ['amantur', 'sono amati'],
            ],
          },
        ],
      },
      {
        id: 'u15l2',
        title: 'Da chi? Da che cosa?',
        icon: '🏹',
        exercises: [
          {
            type: 'info',
            icon: '🏹',
            title: 'Chi compie l’azione, nel passivo',
            body:
              'Nella frase passiva chi agisce non è più il soggetto, ma spesso ' +
              'viene detto lo stesso. Il latino distingue due casi, e li ' +
              'distingue bene:\n\n' +
              '• se è una PERSONA → «ā» / «ab» + ABLATIVO\n' +
              '  «ā Caesare» = da Cesare\n' +
              '• se è una COSA → ablativo da solo, senza preposizione\n' +
              '  «gladiō» = dalla spada, con la spada\n\n' +
              'Il primo si chiama complemento d’agente, il secondo di causa ' +
              'efficiente. I nomi contano poco; conta che, vedendo un ablativo ' +
              'senza preposizione accanto a un passivo, tu pensi «per mezzo di».',
          },
          {
            type: 'table',
            title: 'Chi agisce: persona o cosa',
            columns: ['Latino', 'Italiano'],
            rows: [
              ['ā Caesare', 'da Cesare (persona)'],
              ['ā mīlitibus', 'dai soldati (persone)'],
              ['ab hostibus', 'dai nemici (persone)'],
              ['gladiō', 'dalla spada, con la spada (cosa)'],
              ['ignī', 'dal fuoco (cosa)'],
            ],
            speakCols: [0],
            note: '«ab» si usa davanti a vocale, «ā» davanti a consonante: «ab hostibus», «ā Caesare». «gladius» = spada, «ignis» = fuoco.',
          },
          {
            type: 'info',
            icon: '⏳',
            title: 'Il passivo dell’imperfetto',
            body:
              'Anche qui non c’è niente di nuovo: prendi l’imperfetto che già ' +
              'conosci — quello con il «-bā-» — e attacchi le desinenze ' +
              'passive.\n\n' +
              '«amābat» = amava → «amābātur» = era amato\n' +
              '«vidēbant» = vedevano → «vidēbantur» = erano visti\n\n' +
              'Il pezzo che dice il TEMPO e il pezzo che dice la voce sono ' +
              'indipendenti: si sommano.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Urbs ā mīlitibus capitur»?',
            focus: 'Urbs ā mīlitibus capitur',
            options: [
              'La città è presa dai soldati',
              'La città prende i soldati',
              'I soldati sono presi dalla città',
            ],
            answer: 'La città è presa dai soldati',
          },
          {
            type: 'choice',
            prompt: 'In «Hostis gladiō necātur», che funzione ha «gladiō»? («necātur» = è ucciso)',
            focus: 'gladiō necātur',
            options: [
              'dice il mezzo: con la spada',
              'è il soggetto della frase',
              'è il complemento oggetto',
            ],
            answer: 'dice il mezzo: con la spada',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «vidēbāmur»?',
            focus: 'vidēbāmur',
            options: ['eravamo visti', 'vedevamo', 'siamo visti'],
            answer: 'eravamo visti',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['ā rēge', 'dal re'],
              ['ab amīcīs', 'dagli amici'],
              ['ignī', 'dal fuoco'],
              ['vidēbantur', 'erano visti'],
            ],
          },
        ],
      },
      {
        id: 'u15l3',
        title: 'Il passivo del passato',
        icon: '🧩',
        exercises: [
          {
            type: 'info',
            icon: '🧩',
            title: 'Due parole invece di una',
            body:
              'Al perfetto il latino cambia strategia: invece di una desinenza ' +
              'usa DUE parole, esattamente come l’italiano.\n\n' +
              'PARTICIPIO PERFETTO + il verbo «esse»\n\n' +
              '«amātus sum» = sono stato amato / fui amato\n' +
              '«capta est» = è stata presa / fu presa\n\n' +
              'Il participio perfetto lo conosci già dall’unità 12: è quello in ' +
              '«-tus, -a, -um».',
          },
          {
            type: 'table',
            title: 'Il perfetto passivo di amāre',
            columns: ['Latino', 'Italiano'],
            rows: [
              ['amātus sum', 'sono stato amato'],
              ['amātus es', 'sei stato amato'],
              ['amātus est', 'è stato amato'],
              ['amātī sumus', 'siamo stati amati'],
              ['amātī estis', 'siete stati amati'],
              ['amātī sunt', 'sono stati amati'],
            ],
            speakCols: [0],
            note: 'Il participio è un aggettivo, quindi CONCORDA con il soggetto: «amātus est» (un uomo), «amāta est» (una donna), «amātum est» (una cosa neutra), «amātae sunt» (più donne).',
          },
          {
            type: 'info',
            icon: '🚨',
            title: 'La trappola: «amātus est» NON è «è amato»',
            body:
              'Questo è l’errore che fanno tutti, ed è grosso: sposta l’azione ' +
              'di un tempo intero.\n\n' +
              '«amātur» = è amato — adesso, presente\n' +
              '«amātus est» = è STATO amato — passato\n\n' +
              'Il verbo «est» è al presente, e l’occhio ci casca. Ma il tempo ' +
              'della frase lo dà il PARTICIPIO, che è perfetto: l’azione è ' +
              'conclusa.\n\n' +
              'Regola pratica: se vedi un participio in «-tus» accanto a una ' +
              'forma di «esse», traduci al passato.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Urbs capta est»?',
            focus: 'Urbs capta est',
            options: [
              'La città è stata presa',
              'La città è presa (adesso)',
              'La città prende',
            ],
            answer: 'La città è stata presa',
          },
          {
            type: 'choice',
            prompt: 'E «Urbs capitur»?',
            focus: 'Urbs capitur',
            options: [
              'La città è presa (adesso)',
              'La città è stata presa',
              'La città sarà presa',
            ],
            answer: 'La città è presa (adesso)',
          },
          {
            type: 'choice',
            prompt: 'Perché in «Rōma condita est» il participio finisce in -a?',
            focus: 'Rōma condita est',
            options: [
              'perché concorda con «Rōma», femminile',
              'perché il verbo è femminile',
              'perché è un plurale neutro',
            ],
            answer: 'perché concorda con «Rōma», femminile',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['vidētur', 'è visto'],
              ['vīsus est', 'è stato visto'],
              ['vidēbātur', 'era visto'],
              ['vīsī sunt', 'sono stati visti'],
            ],
          },
        ],
      },
      {
        id: 'u15v',
        title: 'La guerra e lo Stato',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Il vocabolario delle versioni',
            body:
              'Se la versione è di storia — e quasi sempre lo è — queste parole ' +
              'compaiono nella prima riga. Vale la pena averle già in tasca.\n\n' +
              'Attenzione a un gruppetto particolare: alcune esistono solo al ' +
              'PLURALE, e al plurale significano una cosa diversa da quello che ' +
              'ti aspetteresti.',
          },
          {
            type: 'table',
            title: 'L’esercito',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['castra, -ōrum (n. pl.)', 'l’accampamento'],
              ['cōpiae, -ārum (f. pl.)', 'le truppe'],
              ['arma, -ōrum (n. pl.)', 'le armi'],
              ['legiō, legiōnis', 'legione'],
              ['equitātus, -ūs', 'cavalleria'],
              ['praesidium', 'presidio, guarnigione'],
              ['tēlum', 'arma da lancio, dardo'],
              ['gladius', 'spada'],
              ['scūtum', 'scudo'],
              ['vulnus, vulneris', 'ferita'],
              ['caedēs, caedis', 'strage'],
              ['praeda', 'bottino'],
            ],
            speakCols: [0],
            note: 'I tre plurali sono la trappola: «castra» è UN accampamento, non «gli accampamenti»; «cōpiae» sono le truppe (al singolare «cōpia» vuol dire abbondanza); «arma» sono le armi e basta. Tradurli al plurale letterale fa dire sciocchezze.',
          },
          {
            type: 'table',
            title: 'Lo Stato',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['imperātor, -ōris', 'comandante (poi: imperatore)'],
              ['magistrātus, -ūs', 'magistrato, carica pubblica'],
              ['prōvincia', 'provincia'],
              ['iūs, iūris', 'diritto'],
              ['officium', 'dovere, incarico'],
              ['honor, honōris', 'carica pubblica; onore'],
              ['obses, obsidis', 'ostaggio'],
              ['pāx, pācis', 'pace'],
              ['imperium', 'comando, potere'],
              ['auctōritās, -ātis', 'autorevolezza, prestigio'],
            ],
            speakCols: [0],
            note: '«imperātor» in Cesare non è ancora «l’imperatore»: è il generale vittorioso acclamato dai soldati. Il senso moderno arriva dopo. E «honor» è più spesso la carica pubblica che il sentimento.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «castra»?',
            focus: 'castra',
            options: ['un accampamento', 'gli accampamenti', 'i castelli'],
            answer: 'un accampamento',
          },
          {
            type: 'choice',
            prompt: 'In una versione di Cesare, «imperātor» è…',
            focus: 'imperātor',
            options: [
              'il generale, il comandante',
              'l’imperatore di Roma',
              'un magistrato civile',
            ],
            answer: 'il generale, il comandante',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['cōpiae', 'le truppe'],
              ['praesidium', 'guarnigione'],
              ['vulnus', 'ferita'],
              ['praeda', 'bottino'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['iūs', 'diritto'],
              ['officium', 'dovere'],
              ['obses', 'ostaggio'],
              ['pāx', 'pace'],
            ],
          },
        ],
      },
      {
        id: 'u15l4',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '🧭',
            title: 'Il metodo',
            body:
              '1. Guarda la fine del verbo: c’è una «r» («-tur», «-ntur», ' +
              '«-mur»)? È un passivo presente o imperfetto.\n' +
              '2. Vedi invece un participio in «-tus, -a, -um» accanto a «est» ' +
              'o «sunt»? È un passivo al passato: traduci «è stato…».\n' +
              '3. Cerca chi agisce: «ā/ab» + ablativo se è una persona, ' +
              'ablativo nudo se è una cosa.\n' +
              '4. Il soggetto del passivo è al NOMINATIVO, e subisce. Non ' +
              'cercargli un oggetto: non ce l’ha.',
          },
          {
            type: 'analysis',
            sentence: 'Urbs ā mīlitibus capta est.',
            word: 'capta est',
            translation: 'La città fu presa dai soldati.',
            fields: [
              {
                label: 'Tempo',
                options: ['Perfetto', 'Presente', 'Imperfetto'],
                answer: 'Perfetto',
              },
              {
                label: 'Diatesi',
                options: ['Passivo', 'Attivo'],
                answer: 'Passivo',
              },
              {
                label: 'Persona',
                options: ['3ª singolare', '3ª plurale'],
                answer: '3ª singolare',
              },
            ],
            note: 'Il perfetto passivo è fatto di due parole: participio perfetto + «esse». La trappola è «est»: non va tradotto con il presente. «Capta est» è «fu presa», non «è presa».',
          },
          {
            type: 'analysis',
            prompt: 'Stessa frase: analizza «mīlitibus»',
            sentence: 'Urbs ā mīlitibus capta est.',
            word: 'mīlitibus',
            translation: 'La città fu presa dai soldati.',
            fields: [
              {
                label: 'Caso',
                options: ['Ablativo', 'Dativo', 'Accusativo'],
                answer: 'Ablativo',
              },
              {
                label: 'Funzione',
                options: ['Complemento d’agente', 'Complemento di termine', 'Complemento di mezzo'],
                answer: 'Complemento d’agente',
              },
            ],
            note: 'La regola è secca: se chi agisce è una PERSONA, il latino mette «ā/ab» + ablativo (complemento d’agente); se è una COSA, ablativo semplice senza preposizione (complemento di mezzo). «ā mīlitibus» = dai soldati; «gladiō» = con la spada.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Rōma ā Rōmulō condita est»? («condere» = fondare)',
            focus: 'Rōma ā Rōmulō condita est',
            options: [
              'Roma fu fondata da Romolo',
              'Roma fonda Romolo',
              'Romolo è fondato da Roma',
            ],
            answer: 'Roma fu fondata da Romolo',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Epistulae ā rēge mittuntur»?',
            focus: 'Epistulae ā rēge mittuntur',
            options: [
              'Le lettere sono mandate dal re',
              'Il re manda una lettera',
              'Le lettere mandano il re',
            ],
            answer: 'Le lettere sono mandate dal re',
          },
          {
            type: 'choice',
            prompt: 'In «Oppidum mūnītum est», cosa è successo? («mūnīre» = fortificare)',
            focus: 'Oppidum mūnītum est',
            options: [
              'la città è stata fortificata',
              'la città fortifica',
              'la città viene fortificata adesso',
            ],
            answer: 'la città è stata fortificata',
          },
          {
            type: 'choice',
            prompt: 'Trasforma in passivo: «Mīles urbem capit» diventa…',
            focus: 'Mīles urbem capit',
            options: [
              'Urbs ā mīlite capitur',
              'Urbs mīlitem capit',
              'Mīles ab urbe capitur',
            ],
            answer: 'Urbs ā mīlite capitur',
          },
          {
            type: 'build',
            prompt: 'Traduci: «La città è vista dal re»',
            source: 'La città è vista dal re',
            answer: ['Urbs', 'ā', 'rēge', 'vidētur'],
            extra: ['videt', 'rēx'],
          },
          {
            type: 'info',
            icon: '🔗',
            title: 'Dove l’avevi già visto',
            body:
              'Il passivo del passato non è arrivato oggi: lo usavi già senza ' +
              'chiamarlo così.\n\n' +
              '«Urbe captā» (unità 12) = presa la città — participio perfetto ' +
              'passivo in un ablativo assoluto.\n' +
              '«urbem captam esse» (unità 13) = che la città è stata presa — lo ' +
              'stesso participio, con l’infinito di «esse».\n\n' +
              'Sono tre facce dello stesso pezzo. Da qui in avanti li ' +
              'riconoscerai tutti e tre.',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['capitur', 'è presa'],
              ['capiēbātur', 'era presa'],
              ['capta est', 'è stata presa'],
              ['ā mīlitibus', 'dai soldati'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u16',
    title: 'Unità 16 — Il congiuntivo',
    subtitle: 'Le forme: quattro tempi, due scorciatoie',
    color: '#4a5568',
    lessons: [
      {
        id: 'u16l1',
        title: 'Che cos’è il congiuntivo',
        icon: '🌫️',
        exercises: [
          {
            type: 'info',
            icon: '🌫️',
            title: 'Il modo dell’incerto',
            body:
              'Fin qui i verbi erano all’INDICATIVO: il modo dei fatti. ' +
              '«Cesare viene» — è così.\n\n' +
              'Il CONGIUNTIVO è il modo di quello che non è un fatto secco: ' +
              'possibilità, volontà, scopo, dubbio. Esiste anche in italiano, e ' +
              'lo usi già:\n\n' +
              '• penso che Cesare venga\n' +
              '• affinché tu capisca\n' +
              '• se io fossi ricco\n\n' +
              'Nota che in italiano il congiuntivo compare quasi sempre in una ' +
              'frase SUBORDINATA, cioè agganciata a un’altra. In latino è lo ' +
              'stesso — solo molto, molto più spesso.',
          },
          {
            type: 'info',
            icon: '🔁',
            title: 'La cosa da sapere prima di tutto',
            body:
              'Ecco l’avvertenza che vale più di tutte le tabelle: il ' +
              'congiuntivo latino, quasi sempre, in italiano NON si traduce con ' +
              'un congiuntivo.\n\n' +
              'Il latino lo mette per segnalare che la frase è subordinata; ' +
              'l’italiano lì userebbe un indicativo, o un gerundio, o un ' +
              'infinito.\n\n' +
              '«cum vēnisset» = dopo che era venuto (indicativo!)\n' +
              '«ut vidēret» = per vedere (infinito!)\n\n' +
              'Quindi: riconosci il congiuntivo, capisci che tipo di ' +
              'subordinata regge, e poi traduci in italiano naturale. Non ' +
              'cercare di mettere un congiuntivo a tutti i costi.',
          },
          {
            type: 'info',
            icon: '🔤',
            title: 'Il presente: cambia la vocale',
            body:
              'Le desinenze delle PERSONE restano quelle di sempre ' +
              '(-m, -s, -t, -mus, -tis, -nt). Cambia la vocale che le precede, ' +
              'e la regola è a due righe:\n\n' +
              '• 1ª coniugazione (-āre): la a diventa E → «amet»\n' +
              '• tutte le altre: compare una A → «legat», «moneat», «audiat»\n\n' +
              'Confronta con l’indicativo e senti la differenza: «amat» ' +
              '(indicativo) contro «amet» (congiuntivo); «legit» contro ' +
              '«legat».',
          },
          {
            type: 'table',
            title: 'Presente congiuntivo — le 4 coniugazioni',
            columns: ['Persona', '1ª amāre', '2ª monēre', '3ª legere', '4ª audīre'],
            rows: [
              ['io', 'amem', 'moneam', 'legam', 'audiam'],
              ['tu', 'amēs', 'moneās', 'legās', 'audiās'],
              ['lui/lei', 'amet', 'moneat', 'legat', 'audiat'],
              ['noi', 'amēmus', 'moneāmus', 'legāmus', 'audiāmus'],
              ['voi', 'amētis', 'moneātis', 'legātis', 'audiātis'],
              ['loro', 'ament', 'moneant', 'legant', 'audiant'],
            ],
            note: 'Guarda la colonna della 1ª: è l’unica con la E. Tutte le altre hanno la A. Se ti ricordi questo, il presente congiuntivo lo riconosci sempre.',
          },
          {
            type: 'table',
            title: 'esse — presente congiuntivo',
            columns: ['Latino', 'Italiano'],
            rows: [
              ['sim', 'io sia'],
              ['sīs', 'tu sia'],
              ['sit', 'lui/lei sia'],
              ['sīmus', 'noi siamo'],
              ['sītis', 'voi siate'],
              ['sint', 'loro siano'],
            ],
            speakCols: [0],
            note: 'Irregolare come sempre, ma corto e frequentissimo: «sit» e «sint» li incontrerai in continuazione.',
          },
          {
            type: 'choice',
            prompt: '«amat» o «amet»: quale è al congiuntivo?',
            options: ['amet', 'amat', 'tutte e due'],
            answer: 'amet',
          },
          {
            type: 'choice',
            prompt: 'Come si forma il presente congiuntivo della 3ª coniugazione?',
            focus: 'legere',
            options: [
              'con la A: «legat»',
              'con la E: «leget»',
              'non cambia: «legit»',
            ],
            answer: 'con la A: «legat»',
          },
          {
            type: 'match',
            prompt: 'Abbina al modo',
            pairs: [
              ['amat', 'indicativo: ama'],
              ['amet', 'congiuntivo: ami'],
              ['est', 'indicativo: è'],
              ['sit', 'congiuntivo: sia'],
            ],
          },
        ],
      },
      {
        id: 'u16l2',
        title: 'L’imperfetto: il più facile',
        icon: '🎁',
        exercises: [
          {
            type: 'info',
            icon: '🎁',
            title: 'Infinito più desinenza. Basta.',
            body:
              'Questo è un regalo, e nei manuali passa quasi inosservato: ' +
              'l’imperfetto congiuntivo si fa prendendo l’INFINITO presente — ' +
              'quello del vocabolario — e attaccandoci le desinenze delle ' +
              'persone.\n\n' +
              'amāre + m → «amārem»\n' +
              'legere + t → «legeret»\n' +
              'audīre + nt → «audīrent»\n' +
              'esse + m → «essem»\n\n' +
              'Nessuna eccezione da imparare, nemmeno per «esse». Ed è il tempo ' +
              'che nelle versioni storiche incontrerai più di ogni altro, perché ' +
              'il racconto è al passato.',
          },
          {
            type: 'table',
            title: 'Imperfetto congiuntivo — le 4 coniugazioni',
            columns: ['Persona', '1ª amāre', '3ª legere', '4ª audīre', 'esse'],
            rows: [
              ['io', 'amārem', 'legerem', 'audīrem', 'essem'],
              ['tu', 'amārēs', 'legerēs', 'audīrēs', 'essēs'],
              ['lui/lei', 'amāret', 'legeret', 'audīret', 'esset'],
              ['noi', 'amārēmus', 'legerēmus', 'audīrēmus', 'essēmus'],
              ['voi', 'amārētis', 'legerētis', 'audīrētis', 'essētis'],
              ['loro', 'amārent', 'legerent', 'audīrent', 'essent'],
            ],
            note: 'Copri la prima colonna e leggi: sono tutti «infinito + m/s/t/mus/tis/nt». «esset» ed «essent» sono fra le parole più comuni delle versioni.',
          },
          {
            type: 'choice',
            prompt: 'Qual è l’imperfetto congiuntivo, 3ª persona singolare, di «vidēre»?',
            focus: 'vidēre',
            options: ['vidēret', 'videat', 'vidēbat'],
            answer: 'vidēret',
          },
          {
            type: 'choice',
            prompt: 'Da quale forma si costruisce l’imperfetto congiuntivo?',
            options: [
              'dall’infinito presente',
              'dal tema del perfetto',
              'dal participio',
            ],
            answer: 'dall’infinito presente',
          },
          {
            type: 'choice',
            prompt: 'Che cos’è «essent»?',
            focus: 'essent',
            options: [
              'imperfetto congiuntivo di esse',
              'presente congiuntivo di esse',
              'infinito di esse',
            ],
            answer: 'imperfetto congiuntivo di esse',
          },
          {
            type: 'match',
            prompt: 'Abbina al verbo di partenza',
            pairs: [
              ['amāret', 'amāre'],
              ['legerent', 'legere'],
              ['audīrem', 'audīre'],
              ['esset', 'esse'],
            ],
          },
        ],
      },
      {
        id: 'u16l3',
        title: 'Perfetto e piuccheperfetto',
        icon: '⏮️',
        exercises: [
          {
            type: 'info',
            icon: '⏮️',
            title: 'Gli altri due tempi',
            body:
              'Il congiuntivo ha quattro tempi in tutto. Ne hai visti due; ' +
              'restano quelli che guardano al passato.\n\n' +
              '• PERFETTO congiuntivo: tema del perfetto + «-erim»\n' +
              '  amāv- + erim → «amāverim»\n' +
              '• PIUCCHEPERFETTO congiuntivo: infinito perfetto + desinenze\n' +
              '  amāvisse + m → «amāvissem»\n\n' +
              'Il secondo è la stessa scorciatoia dell’imperfetto: prendi un ' +
              'infinito e ci attacchi la persona. Due tempi su quattro si fanno ' +
              'così.',
          },
          {
            type: 'table',
            title: 'Perfetto e piuccheperfetto congiuntivo di amāre',
            columns: ['Persona', 'Perfetto', 'Piuccheperfetto'],
            rows: [
              ['io', 'amāverim', 'amāvissem'],
              ['tu', 'amāverīs', 'amāvissēs'],
              ['lui/lei', 'amāverit', 'amāvisset'],
              ['noi', 'amāverīmus', 'amāvissēmus'],
              ['voi', 'amāverītis', 'amāvissētis'],
              ['loro', 'amāverint', 'amāvissent'],
            ],
            note: 'Da «esse»: «fuerim» (perfetto) e «fuissem» (piuccheperfetto). Anche qui vale la scorciatoia: fuisse + m → fuissem.',
          },
          {
            type: 'table',
            title: 'I quattro tempi, tutti insieme',
            columns: ['Tempo', 'Come si fa', 'Esempio'],
            rows: [
              ['presente', 'vocale E (1ª) o A (altre)', 'amet, legat'],
              ['imperfetto', 'infinito presente + desinenza', 'amāret'],
              ['perfetto', 'tema del perfetto + -erim', 'amāverit'],
              ['piuccheperfetto', 'infinito perfetto + desinenza', 'amāvisset'],
            ],
            note: 'Nelle versioni di storia i due che incontri di più sono di gran lunga l’imperfetto («amāret») e il piuccheperfetto («amāvisset»): il racconto è al passato, e questi sono i suoi tempi.',
          },
          {
            type: 'choice',
            prompt: 'Che cos’è «vēnisset»?',
            focus: 'vēnisset',
            options: [
              'piuccheperfetto congiuntivo di venīre',
              'imperfetto congiuntivo di venīre',
              'perfetto indicativo di venīre',
            ],
            answer: 'piuccheperfetto congiuntivo di venīre',
          },
          {
            type: 'choice',
            prompt: 'Da «fuisse» come ricavi il piuccheperfetto congiuntivo?',
            focus: 'fuisse',
            options: [
              'attaccando le desinenze: «fuissem»',
              'togliendo -isse: «fum»',
              'non si può: è irregolare',
            ],
            answer: 'attaccando le desinenze: «fuissem»',
          },
          {
            type: 'match',
            prompt: 'Abbina al tempo del congiuntivo',
            pairs: [
              ['amet', 'presente'],
              ['amāret', 'imperfetto'],
              ['amāverit', 'perfetto'],
              ['amāvisset', 'piuccheperfetto'],
            ],
          },
        ],
      },
      {
        id: 'u16v',
        title: 'Animali e natura',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Le parole delle favole',
            body:
              'Non tutte le versioni sono battaglie. I brani più facili — quelli ' +
              'che si danno a chi comincia — sono spesso FAVOLE: Fedro, Esopo ' +
              'tradotto, gli animali che parlano.\n\n' +
              'Hanno un vocabolario tutto loro, concreto e ristretto: una volpe, un ' +
              'lupo, un albero, un fiume. Sono venti parole che aprono un intero ' +
              'genere di testi.',
          },
          {
            type: 'table',
            title: 'Gli animali',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['canis, canis', 'cane'],
              ['lupus, lupī', 'lupo'],
              ['leō, leōnis', 'leone'],
              ['agnus, agnī', 'agnello'],
              ['ovis, ovis', 'pecora'],
              ['bōs, bovis', 'bue'],
              ['avis, avis', 'uccello'],
              ['piscis, piscis', 'pesce'],
              ['serpēns, serpentis', 'serpente'],
              ['cervus, cervī', 'cervo'],
            ],
            speakCols: [0],
            note: '«bōs, bovis» è irregolare: il tema del nominativo (bō-) non è quello degli altri casi (bov-), e al genitivo plurale fa «boum». È una delle poche parole che vanno imparate a memoria così com’è.',
          },
          {
            type: 'table',
            title: 'La natura',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['arbor, arboris', 'albero'],
              ['flōs, flōris', 'fiore'],
              ['herba, herbae', 'erba'],
              ['ignis, ignis', 'fuoco'],
              ['ventus, ventī', 'vento'],
              ['mare, maris', 'mare'],
              ['unda, undae', 'onda'],
              ['saxum, saxī', 'sasso, roccia'],
              ['umbra, umbrae', 'ombra'],
              ['sōl, sōlis', 'sole'],
            ],
            speakCols: [0],
            note: '«arbor» è FEMMINILE, anche se finisce in -or come «dolor» e «honor», che sono maschili: «alta arbor» = l’albero alto, con l’aggettivo al femminile. «Mare» è neutro e appartiene ai neutri della 3ª in -e, con l’ablativo in -ī: «in marī» = in mare.',
          },
          {
            type: 'choice',
            prompt: 'Come si dice «l’albero alto»?',
            options: ['alta arbor', 'altus arbor', 'altum arbor'],
            answer: 'alta arbor',
          },
          {
            type: 'choice',
            prompt: 'In una favola trovi «lupus et agnus». Chi sono?',
            focus: 'lupus et agnus',
            options: ['Il lupo e l’agnello', 'Il lupo e il cane', 'Il leone e l’agnello'],
            answer: 'Il lupo e l’agnello',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['leō', 'leone'],
              ['ovis', 'pecora'],
              ['avis', 'uccello'],
              ['bōs', 'bue'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['arbor', 'albero'],
              ['ignis', 'fuoco'],
              ['saxum', 'roccia'],
              ['umbra', 'ombra'],
            ],
          },
        ],
      },
      {
        id: 'u16l4',
        title: 'Riconoscilo al volo',
        icon: '🔎',
        exercises: [
          {
            type: 'info',
            icon: '🔎',
            title: 'I segnali',
            body:
              'Non devi ricostruire la coniugazione ogni volta: ti bastano ' +
              'quattro spie.\n\n' +
              '• «-re-» prima della desinenza → imperfetto ' +
              '(amāREt, legeREnt)\n' +
              '• «-isse-» → piuccheperfetto (amāvISSEt, vēnISSEnt)\n' +
              '• una A dove ti aspettavi altro → presente (legAt, audiAnt)\n' +
              '• «sit», «sint», «esset», «essent» → è «esse», impara queste ' +
              'quattro a memoria e hai risolto metà delle occorrenze.',
          },
          {
            type: 'analysis',
            sentence: 'Cum hostēs venīrent, cīvēs fūgērunt.',
            word: 'venīrent',
            translation: 'Quando i nemici arrivavano, i cittadini fuggirono.',
            fields: [
              {
                label: 'Modo',
                options: ['Congiuntivo', 'Indicativo'],
                answer: 'Congiuntivo',
              },
              {
                label: 'Tempo',
                options: ['Imperfetto', 'Presente', 'Perfetto'],
                answer: 'Imperfetto',
              },
              {
                label: 'Persona',
                options: ['3ª plurale', '3ª singolare', '2ª plurale'],
                answer: '3ª plurale',
              },
            ],
            note: 'Il congiuntivo imperfetto è la forma più facile da riconoscere di tutto il congiuntivo: è l’INFINITO più le desinenze personali. «venīre» + «-nt» → «venīrent».',
          },
          {
            type: 'choice',
            prompt: 'Che cos’è «legeret»?',
            focus: 'legeret',
            options: [
              'imperfetto congiuntivo (leggesse)',
              'presente congiuntivo (legga)',
              'imperfetto indicativo (leggeva)',
            ],
            answer: 'imperfetto congiuntivo (leggesse)',
          },
          {
            type: 'choice',
            prompt: 'E «legēbat»?',
            focus: 'legēbat',
            options: [
              'imperfetto indicativo (leggeva)',
              'imperfetto congiuntivo (leggesse)',
              'presente congiuntivo',
            ],
            answer: 'imperfetto indicativo (leggeva)',
          },
          {
            type: 'choice',
            prompt: 'Che cos’è «audīvissent»?',
            focus: 'audīvissent',
            options: [
              'piuccheperfetto congiuntivo',
              'imperfetto congiuntivo',
              'perfetto indicativo',
            ],
            answer: 'piuccheperfetto congiuntivo',
          },
          {
            type: 'choice',
            prompt: 'Quale di queste NON è un congiuntivo?',
            options: ['vidēbat', 'vidēret', 'videat'],
            answer: 'vidēbat',
          },
          {
            type: 'info',
            icon: '⚠️',
            title: 'Due coppie che si somigliano',
            body:
              'Attento a queste, perché differiscono per una lettera e cambiano ' +
              'tutto:\n\n' +
              '«legēbat» = leggeva — indicativo, c’è il «-bā-»\n' +
              '«legeret» = leggesse — congiuntivo, c’è il «-re-»\n\n' +
              '«amāvit» = amò — indicativo perfetto\n' +
              '«amāverit» = abbia amato — congiuntivo perfetto\n\n' +
              'Nel dubbio guarda la sillaba in mezzo: è lei che porta ' +
              'l’informazione.',
          },
          {
            type: 'match',
            prompt: 'Abbina alla descrizione',
            pairs: [
              ['legeret', 'congiuntivo imperfetto'],
              ['legēbat', 'indicativo imperfetto'],
              ['lēgisset', 'congiuntivo piuccheperfetto'],
              ['amāvit', 'indicativo perfetto'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u17',
    title: 'Unità 17 — Le subordinate',
    subtitle: 'A che serve, tutto quel congiuntivo',
    color: '#9c3f1f',
    lessons: [
      {
        id: 'u17l1',
        title: 'Il «cum» narrativo',
        icon: '📜',
        exercises: [
          {
            type: 'info',
            icon: '📜',
            title: 'La parolina più frequente delle versioni',
            body:
              'Conosci già «cum» come preposizione: «cum amīcō» = con l’amico, ' +
              'seguito da un ABLATIVO.\n\n' +
              'Ma «cum» ha un secondo mestiere, e nelle versioni di storia è ' +
              'quello che conta: introduce una frase subordinata con il verbo al ' +
              'CONGIUNTIVO. Si chiama «cum narrativo».\n\n' +
              'Come li distingui? Guarda cosa segue.\n' +
              '• «cum» + un nome in ablativo → è «con»\n' +
              '• «cum» + un verbo al congiuntivo → è il cum narrativo',
          },
          {
            type: 'info',
            icon: '🔀',
            title: 'Come si traduce',
            body:
              'Il cum narrativo racconta la circostanza in cui succede la frase ' +
              'principale: quando, dopo che, poiché, benché. Quale delle quattro? ' +
              'Lo dice il senso, non la grammatica.\n\n' +
              'Il tempo del congiuntivo ti dice invece il rapporto:\n' +
              '• IMPERFETTO (esset, vidēret) → azione insieme alla principale\n' +
              '• PIUCCHEPERFETTO (fuisset, vīdisset) → azione già finita prima\n\n' +
              '«Cum Caesar vēnisset, hostēs fūgērunt» = Quando Cesare fu ' +
              'arrivato, i nemici fuggirono.\n' +
              '«Cum in Galliā esset, epistulās scrībēbat» = Mentre era in ' +
              'Gallia, scriveva lettere.',
          },
          {
            type: 'table',
            title: 'Le due facce di «cum»',
            columns: ['Frase', 'Che cos’è', 'Traduzione'],
            rows: [
              ['cum amīcō', 'preposizione + ablativo', 'con l’amico'],
              ['cum mīlitibus', 'preposizione + ablativo', 'con i soldati'],
              ['cum vēnisset', 'cum + congiuntivo', 'dopo che era venuto'],
              ['cum vidēret', 'cum + congiuntivo', 'mentre vedeva'],
            ],
            speakCols: [0],
            note: 'La regola pratica: se dopo «cum» c’è un verbo, non è «con». E in italiano quel congiuntivo diventa quasi sempre un indicativo.',
          },
          {
            type: 'choice',
            prompt: 'In «cum hostibus pugnat», che cos’è «cum»?',
            focus: 'cum hostibus pugnat',
            options: [
              'la preposizione: combatte con i nemici',
              'il cum narrativo',
              'una congiunzione che significa «quando»',
            ],
            answer: 'la preposizione: combatte con i nemici',
          },
          {
            type: 'choice',
            prompt: 'Come traduci «Cum urbem vīdisset, tacuit»? («tacuit» = tacque)',
            focus: 'Cum urbem vīdisset',
            options: [
              'Dopo che ebbe visto la città, tacque',
              'Con la città vista, tacque',
              'Vede la città e tace',
            ],
            answer: 'Dopo che ebbe visto la città, tacque',
          },
          {
            type: 'choice',
            prompt: 'In un cum narrativo, il congiuntivo IMPERFETTO indica un’azione…',
            options: [
              'contemporanea alla principale',
              'avvenuta prima della principale',
              'futura',
            ],
            answer: 'contemporanea alla principale',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['cum rēge', 'con il re'],
              ['cum rēx vēnisset', 'dopo che il re era venuto'],
              ['cum rēx esset', 'mentre era re'],
              ['cum mīlitibus', 'con i soldati'],
            ],
          },
        ],
      },
      {
        id: 'u17l2',
        title: 'Per fare che cosa: le finali',
        icon: '🎯',
        exercises: [
          {
            type: 'info',
            icon: '🎯',
            title: 'Lo scopo',
            body:
              'Una proposizione FINALE dice lo scopo dell’azione: perché lo fa, ' +
              'a che fine. In italiano: «vengo PER vedere», «te lo dico ' +
              'AFFINCHÉ tu capisca».\n\n' +
              'In latino si fa con «ut» + CONGIUNTIVO. Se lo scopo è negativo ' +
              '— per NON fare qualcosa — al posto di «ut» c’è «nē».\n\n' +
              '«Vēnit ut urbem vidēret» = Venne per vedere la città.\n' +
              '«Fūgērunt nē caperentur» = Fuggirono per non essere catturati.',
          },
          {
            type: 'info',
            icon: '🇮🇹',
            title: 'In italiano diventa un infinito',
            body:
              'Ecco di nuovo l’avvertenza dell’unità scorsa, applicata: quel ' +
              'congiuntivo in italiano non resta congiuntivo.\n\n' +
              'Se il soggetto della finale è lo stesso della principale, in ' +
              'italiano usi «per» + INFINITO — che è la traduzione più naturale ' +
              'e quella che ti conviene:\n\n' +
              '«Vēnit ut vidēret» → alla lettera «venne affinché vedesse», ma si ' +
              'dice «venne per vedere».\n\n' +
              'Se invece il soggetto cambia, allora sì che serve «perché» o ' +
              '«affinché»: «Vēnit ut eum vidērēmus» = venne perché lo vedessimo.',
          },
          {
            type: 'table',
            title: 'Finali: ut e nē',
            columns: ['Latino', 'Traduzione'],
            rows: [
              ['ut vidēret', 'per vedere'],
              ['ut audīrent', 'per ascoltare'],
              ['nē caperētur', 'per non essere catturato'],
              ['nē vidērent', 'perché non vedessero'],
            ],
            speakCols: [0],
            note: '«nē» è semplicemente «ut» + non: quando lo vedi, mettici un «non» nella traduzione.',
          },
          {
            type: 'choice',
            prompt: 'Come traduci «Mīlitēs vēnērunt ut urbem caperent»?',
            focus: 'ut urbem caperent',
            options: [
              'I soldati vennero per prendere la città',
              'I soldati vennero con la città presa',
              'I soldati che presero la città vennero',
            ],
            answer: 'I soldati vennero per prendere la città',
          },
          {
            type: 'choice',
            prompt: 'Che differenza c’è fra «ut» e «nē» in una finale?',
            options: [
              '«nē» introduce uno scopo negativo: «per non…»',
              '«nē» si usa al passato, «ut» al presente',
              'nessuna: sono sinonimi',
            ],
            answer: '«nē» introduce uno scopo negativo: «per non…»',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['ut pugnāret', 'per combattere'],
              ['nē pugnāret', 'per non combattere'],
              ['ut scrīberent', 'per scrivere'],
              ['nē fugerent', 'perché non fuggissero'],
            ],
          },
        ],
      },
      {
        id: 'u17l3',
        title: 'Al punto che: le consecutive',
        icon: '➡️',
        exercises: [
          {
            type: 'info',
            icon: '➡️',
            title: 'La conseguenza',
            body:
              'Una CONSECUTIVA dice l’effetto, la conseguenza: «era così stanco ' +
              'CHE si addormentò».\n\n' +
              'Il problema è che in latino si fa anche questa con «ut» + ' +
              'CONGIUNTIVO — la stessa identica coppia della finale. Come si ' +
              'distinguono?\n\n' +
              'Dalla SPIA nella frase principale. La consecutiva è quasi sempre ' +
              'annunciata da una di queste parole:\n' +
              '• «tam», «ita», «sīc» = così, talmente\n' +
              '• «tantus, -a, -um» = così grande\n' +
              '• «adeō» = a tal punto\n\n' +
              'Se prima di «ut» trovi una di queste, non è scopo: è ' +
              'conseguenza.',
          },
          {
            type: 'table',
            title: 'Finale o consecutiva?',
            columns: ['Latino', 'Che cos’è', 'Traduzione'],
            rows: [
              ['Vēnit ut vidēret', 'finale', 'venne per vedere'],
              ['Tam fessus erat ut dormīret', 'consecutiva', 'era così stanco che dormì'],
              ['Ita pugnāvit ut vinceret', 'consecutiva', 'combatté così bene che vinse'],
              ['Fūgit nē caperētur', 'finale', 'fuggì per non essere preso'],
            ],
            speakCols: [0],
            note: '«fessus» = stanco. Nella consecutiva la negazione è «ut… nōn» (non «nē»): un altro modo per distinguerle.',
          },
          {
            type: 'choice',
            prompt: 'In «Tanta erat virtūs ut hostēs fugerent», che tipo di frase è «ut hostēs fugerent»?',
            focus: 'Tanta erat virtūs ut hostēs fugerent',
            options: [
              'consecutiva: c’è «tanta» che l’annuncia',
              'finale: dice lo scopo',
              'relativa',
            ],
            answer: 'consecutiva: c’è «tanta» che l’annuncia',
          },
          {
            type: 'choice',
            prompt: 'Come traduci «Ita scrīpsit ut omnēs legerent»? («omnēs» = tutti)',
            focus: 'Ita scrīpsit ut omnēs legerent',
            options: [
              'Scrisse così bene che tutti leggevano',
              'Scrisse per far leggere tutti',
              'Scrisse quello che tutti leggevano',
            ],
            answer: 'Scrisse così bene che tutti leggevano',
          },
          {
            type: 'choice',
            prompt: 'Quale parola ti fa sospettare una consecutiva?',
            options: ['tam', 'cum', 'quī'],
            answer: 'tam',
          },
          {
            type: 'match',
            prompt: 'Abbina alla parola-spia',
            pairs: [
              ['tam', 'così, talmente'],
              ['ita', 'in questo modo'],
              ['tantus', 'così grande'],
              ['adeō', 'a tal punto'],
            ],
          },
        ],
      },
      {
        id: 'u17l4',
        title: 'Chiedere e domandare',
        icon: '❓',
        exercises: [
          {
            type: 'info',
            icon: '❓',
            title: 'Le domande riferite',
            body:
              'Un ultimo uso, e poi hai coperto quasi tutto quello che serve.\n\n' +
              'Quando una domanda viene RIFERITA invece che fatta, il latino ' +
              'mette il verbo al CONGIUNTIVO. Si chiama interrogativa indiretta.\n\n' +
              'Domanda diretta: «Quis venit?» = Chi viene?\n' +
              'Domanda riferita: «Rogō quis veniat» = Chiedo chi venga.\n\n' +
              'Le parole che la introducono sono quelle delle domande: «quis» ' +
              '(chi), «quid» (che cosa), «cūr» (perché), «ubi» (dove), «quandō» ' +
              '(quando), «num» e «-ne» (se).',
          },
          {
            type: 'info',
            icon: '🙏',
            title: 'Chiedere che qualcuno faccia',
            body:
              'Attenzione a non confonderla con un’altra cosa che le somiglia: ' +
              'i verbi di CHIEDERE e ORDINARE reggono «ut» + congiuntivo, e in ' +
              'italiano diventa «di» + infinito.\n\n' +
              '«Rogō ut veniās» = Ti chiedo di venire.\n' +
              '«Imperāvit ut mīlitēs pugnārent» = Ordinò che i soldati ' +
              'combattessero.\n\n' +
              'Verbi da riconoscere: «rogāre» (chiedere), «petere» (chiedere), ' +
              '«imperāre» (comandare), «persuādēre» (convincere).',
          },
          {
            type: 'table',
            title: 'Tre «ut» diversi',
            columns: ['Latino', 'Tipo', 'Traduzione'],
            rows: [
              ['Vēnit ut vidēret', 'finale', 'venne per vedere'],
              ['Tam fortis ut vinceret', 'consecutiva', 'così forte che vinse'],
              ['Rogāvit ut venīret', 'domanda/ordine', 'chiese di venire'],
            ],
            speakCols: [0],
            note: 'Sempre «ut» + congiuntivo, tre sensi diversi. A deciderlo è quello che c’è PRIMA: un verbo di movimento (finale), una parola-spia come tam/ita (consecutiva), un verbo di chiedere o ordinare.',
          },
          {
            type: 'choice',
            prompt: 'Come traduci «Quaerō ubi sit»?',
            focus: 'Quaerō ubi sit',
            options: [
              'Chiedo dove sia',
              'Chiedo se c’è',
              'Cerco dov’è stato',
            ],
            answer: 'Chiedo dove sia',
          },
          {
            type: 'choice',
            prompt: 'Come traduci «Imperāvit ut fugerent»?',
            focus: 'Imperāvit ut fugerent',
            options: [
              'Ordinò di fuggire',
              'Ordinò per fuggire',
              'Fuggì così che comandò',
            ],
            answer: 'Ordinò di fuggire',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['quis', 'chi'],
              ['quid', 'che cosa'],
              ['cūr', 'perché'],
              ['quandō', 'quando'],
            ],
          },
        ],
      },
      {
        id: 'u17v',
        title: 'Quando e dove',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Le coordinate del racconto',
            body:
              'Una versione storica dice in continuazione quando e dove succede ' +
              'qualcosa. Sono parole corte, si saltano leggendo — e poi la ' +
              'traduzione non torna.',
          },
          {
            type: 'table',
            title: 'Il tempo',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['annus', 'anno'],
              ['mēnsis, mēnsis', 'mese'],
              ['aestās, aestātis', 'estate'],
              ['hiems, hiemis', 'inverno'],
              ['lūx, lūcis', 'luce — «prīmā lūce» = all’alba'],
              ['hodiē', 'oggi'],
              ['herī', 'ieri'],
              ['crās', 'domani'],
              ['mox', 'presto, fra poco'],
              ['tandem', 'finalmente, alla fine'],
              ['cotīdiē', 'ogni giorno'],
              ['prīdiē', 'il giorno prima'],
            ],
            speakCols: [0],
            note: '«prīmā lūce» è un ablativo di tempo: niente preposizione, e vale «alle prime luci». Le indicazioni di tempo in latino stanno spesso in ablativo da sole — «eō annō» = in quell’anno, «hieme» = d’inverno.',
          },
          {
            type: 'table',
            title: 'Il luogo',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['locus, locī', 'luogo (al plurale: «loca», neutro)'],
              ['ager, agrī', 'campo; territorio'],
              ['fīnēs, fīnium (pl.)', 'il territorio, i confini'],
              ['rūs, rūris', 'la campagna'],
              ['domus, domūs', 'casa'],
              ['castellum', 'fortino'],
              ['prope', 'vicino'],
              ['procul', 'lontano'],
              ['inde', 'da lì'],
              ['unde', 'da dove'],
              ['ubīque', 'dappertutto'],
              ['hīc', 'qui'],
            ],
            speakCols: [0],
            note: '«fīnēs» al plurale non sono «i confini» ma il territorio che quei confini racchiudono: «in fīnēs Helvētiōrum» = nel territorio degli Elvezi.',
          },
          {
            type: 'info',
            icon: '📍',
            title: 'Le città non vogliono preposizione',
            body:
              'Una regola piccola che nelle versioni serve a ogni pagina.\n\n' +
              'Con i nomi di CITTÀ (e con «domus» e «rūs») il latino NON mette ' +
              'la preposizione:\n\n' +
              '«Rōmam vēnit» = venne a Roma (accusativo, moto a luogo)\n' +
              '«Rōmā discessit» = partì da Roma (ablativo, moto da luogo)\n' +
              '«Rōmae fuit» = fu a Roma\n\n' +
              'Quel «Rōmae» non è un genitivo: è un caso in più, sopravvissuto ' +
              'solo qui, che si chiama LOCATIVO. Vale anche per «domī» (a casa) ' +
              'e «rūrī» (in campagna).',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Rōmam vēnit»?',
            focus: 'Rōmam vēnit',
            options: ['Venne a Roma', 'Venne da Roma', 'Fu a Roma'],
            answer: 'Venne a Roma',
          },
          {
            type: 'choice',
            prompt: 'E «domī manēbat»?',
            focus: 'domī manēbat',
            options: ['Restava a casa', 'Tornava a casa', 'Usciva di casa'],
            answer: 'Restava a casa',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «prīmā lūce»?',
            focus: 'prīmā lūce',
            options: ['all’alba', 'a mezzogiorno', 'con la prima luce accesa'],
            answer: 'all’alba',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['hiems', 'inverno'],
              ['aestās', 'estate'],
              ['tandem', 'finalmente'],
              ['mox', 'fra poco'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['procul', 'lontano'],
              ['inde', 'da lì'],
              ['ubīque', 'dappertutto'],
              ['fīnēs', 'il territorio'],
            ],
          },
        ],
      },
      {
        id: 'u17l5',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '🧭',
            title: 'Il diagramma di flusso',
            body:
              'Trovi un congiuntivo. Non chiederti come si traduce: chiediti ' +
              'chi lo ha chiamato. Guarda la parola che apre la subordinata.\n\n' +
              '• «cum» → circostanza: quando, dopo che, poiché\n' +
              '• «ut» o «nē», e prima c’è tam/ita/tantus → conseguenza: ' +
              '«così… che»\n' +
              '• «ut» o «nē», e prima c’è un verbo di chiedere o ordinare → ' +
              '«di» + infinito\n' +
              '• «ut» o «nē», e non c’è nessuna delle due → scopo: «per…»\n' +
              '• «quis, quid, cūr, ubi» dopo un verbo di domandare → domanda ' +
              'riferita\n\n' +
              'Poi traduci in italiano naturale, che quasi sempre vuol dire ' +
              'senza congiuntivo.',
          },
          {
            type: 'analysis',
            sentence: 'Caesar mīlitēs mīsit ut urbem caperent.',
            word: 'caperent',
            translation: 'Cesare mandò i soldati perché prendessero la città.',
            fields: [
              {
                label: 'Modo',
                options: ['Congiuntivo', 'Indicativo'],
                answer: 'Congiuntivo',
              },
              {
                label: 'Tempo',
                options: ['Imperfetto', 'Presente'],
                answer: 'Imperfetto',
              },
              {
                label: 'Proposizione',
                options: ['Finale', 'Consecutiva', 'Interrogativa indiretta'],
                answer: 'Finale',
              },
            ],
            note: '«ut» + congiuntivo: se risponde a «per fare che cosa?» è finale, e in italiano diventa «perché» + congiuntivo oppure «per» + infinito. La consecutiva è quasi sempre annunciata da un avverbio nella reggente — «tam», «ita», «tantus» — che qui non c’è.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Cum Rōmam vēnisset, senātum convocāvit»? («convocāre» = convocare)',
            focus: 'Cum Rōmam vēnisset',
            options: [
              'Dopo essere arrivato a Roma, convocò il senato',
              'Con Roma venuta, convocò il senato',
              'Venne a Roma con il senato convocato',
            ],
            answer: 'Dopo essere arrivato a Roma, convocò il senato',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Mīlitēs mīsit ut oppidum mūnīrent»?',
            focus: 'ut oppidum mūnīrent',
            options: [
              'Mandò i soldati a fortificare la città',
              'Mandò i soldati con la città fortificata',
              'I soldati che fortificarono la città furono mandati',
            ],
            answer: 'Mandò i soldati a fortificare la città',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Tanta erat fāma ut omnēs venīrent»?',
            focus: 'Tanta erat fāma ut omnēs venīrent',
            options: [
              'La voce era tale che tutti venivano',
              'La fama era grande per far venire tutti',
              'Tutti venivano con grande fama',
            ],
            answer: 'La voce era tale che tutti venivano',
          },
          {
            type: 'choice',
            prompt: 'In «Rogāvit cūr hostēs fūgissent», che frase è «cūr hostēs fūgissent»?',
            focus: 'Rogāvit cūr hostēs fūgissent',
            options: [
              'una domanda riferita: chiese perché i nemici fossero fuggiti',
              'una finale: chiese per far fuggire i nemici',
              'una consecutiva',
            ],
            answer: 'una domanda riferita: chiese perché i nemici fossero fuggiti',
          },
          {
            type: 'choice',
            prompt: 'In «Cum mīlitibus vēnit», «cum» è…',
            focus: 'Cum mīlitibus vēnit',
            options: [
              'la preposizione: venne con i soldati',
              'il cum narrativo',
              'una congiunzione finale',
            ],
            answer: 'la preposizione: venne con i soldati',
          },
          {
            type: 'match',
            prompt: 'Abbina al tipo di subordinata',
            pairs: [
              ['cum vēnisset', 'circostanza (dopo che era venuto)'],
              ['ut vidēret', 'scopo (per vedere)'],
              ['ita… ut vinceret', 'conseguenza (così che vinse)'],
              ['rogāvit ut venīret', 'richiesta (chiese di venire)'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u18',
    title: 'Unità 18 — Futuro e piuccheperfetto',
    subtitle: 'Completiamo l’indicativo',
    color: '#365a8c',
    lessons: [
      {
        id: 'u18l1',
        title: 'Il futuro',
        icon: '🔮',
        exercises: [
          {
            type: 'info',
            icon: '🔮',
            title: 'Due modi, secondo la coniugazione',
            body:
              'Il futuro latino si fa in due modi diversi, e quale dei due ' +
              'dipende dalla CONIUGAZIONE del verbo. È l’unico punto scomodo: ' +
              'per il resto è meccanico.\n\n' +
              '• 1ª e 2ª coniugazione → si infila un «-bi-»\n' +
              '  «amābō, amābis, amābit» = amerò, amerai, amerà\n' +
              '• 3ª e 4ª coniugazione → niente «-bi-», ma le vocali A ed E\n' +
              '  «legam, legēs, leget» = leggerò, leggerai, leggerà',
          },
          {
            type: 'info',
            icon: '👀',
            title: 'Il «-bi-» è il fratello del «-bā-»',
            body:
              'Ti ricordi il segnale dell’imperfetto, il «-bā-» dell’unità 10? ' +
              'Il futuro della 1ª e 2ª usa la stessa posizione con un’altra ' +
              'vocale.\n\n' +
              '«amābam» = amavo (passato)\n' +
              '«amābō» = amerò (futuro)\n\n' +
              'Stessa B, tempo opposto. Guarda la lettera dopo: A ti porta ' +
              'indietro, I (o O) ti porta avanti.',
          },
          {
            type: 'table',
            title: 'Futuro — 1ª e 2ª coniugazione',
            columns: ['Persona', 'amāre', 'monēre', 'Italiano'],
            rows: [
              ['io', 'amābō', 'monēbō', 'amerò'],
              ['tu', 'amābis', 'monēbis', 'amerai'],
              ['lui/lei', 'amābit', 'monēbit', 'amerà'],
              ['noi', 'amābimus', 'monēbimus', 'ameremo'],
              ['voi', 'amābitis', 'monēbitis', 'amerete'],
              ['loro', 'amābunt', 'monēbunt', 'ameranno'],
            ],
            note: 'Solo la prima persona e la terza plurale escono dallo schema: «amābō» (non «amābiō») e «amābunt» (non «amābint»).',
          },
          {
            type: 'table',
            title: 'Futuro — 3ª e 4ª coniugazione',
            columns: ['Persona', 'legere', 'audīre', 'Italiano'],
            rows: [
              ['io', 'legam', 'audiam', 'leggerò'],
              ['tu', 'legēs', 'audiēs', 'leggerai'],
              ['lui/lei', 'leget', 'audiet', 'leggerà'],
              ['noi', 'legēmus', 'audiēmus', 'leggeremo'],
              ['voi', 'legētis', 'audiētis', 'leggerete'],
              ['loro', 'legent', 'audient', 'leggeranno'],
            ],
            note: 'Qui il segnale è la E lunga: legĒs, legĒmus. Solo la prima persona fa eccezione con la A: «legam».',
          },
          {
            type: 'table',
            title: 'esse — futuro',
            columns: ['Latino', 'Italiano'],
            rows: [
              ['erō', 'sarò'],
              ['eris', 'sarai'],
              ['erit', 'sarà'],
              ['erimus', 'saremo'],
              ['eritis', 'sarete'],
              ['erunt', 'saranno'],
            ],
            speakCols: [0],
            note: 'Confronta con l’imperfetto «eram, erās, erat» (ero, eri, era): cambia una vocale e cambia il tempo.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «amābit»?',
            focus: 'amābit',
            options: ['amerà', 'amava', 'ama'],
            answer: 'amerà',
          },
          {
            type: 'choice',
            prompt: 'E «amābat»?',
            focus: 'amābat',
            options: ['amava', 'amerà', 'amò'],
            answer: 'amava',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['erit', 'sarà'],
              ['erat', 'era'],
              ['leget', 'leggerà'],
              ['legēbat', 'leggeva'],
            ],
          },
        ],
      },
      {
        id: 'u18l2',
        title: 'Il piuccheperfetto',
        icon: '⏪',
        exercises: [
          {
            type: 'info',
            icon: '⏪',
            title: 'Il passato del passato',
            body:
              'Il PIUCCHEPERFETTO indica un’azione avvenuta prima di un’altra ' +
              'azione passata. In italiano è «avevo fatto»:\n\n' +
              'Quando arrivai, lui era già partito.\n\n' +
              'Nei racconti storici serve continuamente, perché il narratore ' +
              'torna indietro a spiegare l’antefatto.\n\n' +
              'Si fa così: TEMA DEL PERFETTO + l’imperfetto di «esse».\n' +
              'amāv- + eram → «amāveram» = avevo amato',
          },
          {
            type: 'table',
            title: 'Piuccheperfetto indicativo di amāre',
            columns: ['Persona', 'Latino', 'Italiano'],
            rows: [
              ['io', 'amāveram', 'avevo amato'],
              ['tu', 'amāverās', 'avevi amato'],
              ['lui/lei', 'amāverat', 'aveva amato'],
              ['noi', 'amāverāmus', 'avevamo amato'],
              ['voi', 'amāverātis', 'avevate amato'],
              ['loro', 'amāverant', 'avevano amato'],
            ],
            speakCols: [1],
            note: 'Leggilo come una somma: «amāv-» (il tema del perfetto, dall’unità 10) più «eram, erās, erat…» (l’imperfetto di esse). Da «esse»: «fueram» = ero stato.',
          },
          {
            type: 'info',
            icon: '⏩',
            title: 'E il futuro anteriore',
            body:
              'Stessa ricetta, altro ingrediente: TEMA DEL PERFETTO + il futuro ' +
              'di «esse».\n\n' +
              'amāv- + erō → «amāverō» = avrò amato\n\n' +
              'Indica un’azione futura ma già conclusa quando ne comincia ' +
              'un’altra: «quando avrò letto, ti dirò». In latino si usa molto ' +
              'più che in italiano, soprattutto dopo «cum», «sī», «ubi».',
          },
          {
            type: 'table',
            title: 'I tempi costruiti sul tema del perfetto',
            columns: ['Tempo', 'Si aggiunge', 'Esempio'],
            rows: [
              ['perfetto', '-ī, -istī, -it…', 'amāvit (amò)'],
              ['piuccheperfetto', 'eram, erās, erat…', 'amāverat (aveva amato)'],
              ['futuro anteriore', 'erō, eris, erit…', 'amāverit (avrà amato)'],
            ],
            note: 'Tre tempi, un solo tema da imparare. È per questo che il vocabolario ti dà «amō, amāre, amāvī»: quel terzo pezzo apre tre tempi in una volta.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «vīderat»?',
            focus: 'vīderat',
            options: ['aveva visto', 'vedeva', 'vide'],
            answer: 'aveva visto',
          },
          {
            type: 'choice',
            prompt: 'Come si costruisce il piuccheperfetto?',
            options: [
              'tema del perfetto + imperfetto di esse',
              'infinito + desinenze',
              'tema del presente + -ba-',
            ],
            answer: 'tema del perfetto + imperfetto di esse',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['amāvit', 'amò'],
              ['amāverat', 'aveva amato'],
              ['amābat', 'amava'],
              ['amābit', 'amerà'],
            ],
          },
        ],
      },
      {
        id: 'u18l3',
        title: 'Forme che si somigliano',
        icon: '🪤',
        exercises: [
          {
            type: 'info',
            icon: '🪤',
            title: 'Quando due tempi si scrivono uguali',
            body:
              'Adesso che i tempi sono tanti, alcune forme finiscono per ' +
              'coincidere. Non è un errore del latino: è un’ambiguità vera, e ' +
              'la sciogli con il contesto.\n\n' +
              'Le due che contano davvero:\n\n' +
              '«legam» = leggerò (futuro) oppure legga (congiuntivo presente)\n' +
              '«amāverit» = avrà amato (futuro anteriore) oppure abbia amato ' +
              '(congiuntivo perfetto)\n\n' +
              'Come decidi? Guardi la frase. Se è una principale, è ' +
              'indicativo. Se è retta da «ut», «cum», «nē» o da un verbo di ' +
              'domandare, è congiuntivo.',
          },
          {
            type: 'table',
            title: 'Coppie da non confondere',
            columns: ['Forma', 'Prima lettura', 'Seconda lettura'],
            rows: [
              ['amābat', 'amava (imperfetto)', '—'],
              ['amābit', 'amerà (futuro)', '—'],
              ['amāret', 'amasse (congiuntivo)', '—'],
              ['legam', 'leggerò (futuro)', 'legga (congiuntivo)'],
              ['amāverit', 'avrà amato (futuro ant.)', 'abbia amato (cong.)'],
            ],
            note: 'Le prime tre differiscono per una vocale o una sillaba: «-bā-» passato, «-bi-» futuro, «-re-» congiuntivo. Le ultime due sono davvero identiche e le decide la frase.',
          },
          {
            type: 'choice',
            prompt: 'In «Librum legam», che cos’è «legam»?',
            focus: 'Librum legam',
            options: [
              'futuro: leggerò il libro',
              'congiuntivo: che io legga il libro',
              'imperfetto: leggevo il libro',
            ],
            answer: 'futuro: leggerò il libro',
          },
          {
            type: 'choice',
            prompt: 'E in «Vēnit ut librum legam»?',
            focus: 'ut librum legam',
            options: [
              'congiuntivo: venne perché io legga il libro',
              'futuro: venne e leggerò il libro',
              'imperfetto',
            ],
            answer: 'congiuntivo: venne perché io legga il libro',
          },
          {
            type: 'choice',
            prompt: 'Quale di queste è un futuro?',
            options: ['monēbit', 'monēbat', 'monēret'],
            answer: 'monēbit',
          },
          {
            type: 'choice',
            prompt: 'E quale è un congiuntivo?',
            options: ['monēret', 'monēbit', 'monēbat'],
            answer: 'monēret',
          },
          {
            type: 'match',
            prompt: 'Abbina alla descrizione',
            pairs: [
              ['amābat', 'imperfetto indicativo'],
              ['amābit', 'futuro'],
              ['amāret', 'imperfetto congiuntivo'],
              ['amāverat', 'piuccheperfetto indicativo'],
            ],
          },
        ],
      },
      {
        id: 'u18v',
        title: 'Il corpo e i sentimenti',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Quello che si prova',
            body:
              'Fin qui il lessico è stato quasi tutto pubblico: eserciti, ' +
              'magistrati, territori. Ma le versioni d’autore — Cicerone, Seneca, ' +
              'e le pagine di storia in cui qualcuno ha paura o si vendica — ' +
              'girano intorno a un vocabolario diverso.\n\n' +
              'Il corpo e i sentimenti: sono parole che in italiano sopravvivono ' +
              'quasi tutte, e che quindi si imparano in fretta.',
          },
          {
            type: 'table',
            title: 'Il corpo',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['caput, capitis', 'testa; capo'],
              ['oculus, oculī', 'occhio'],
              ['auris, auris', 'orecchio'],
              ['ōs, ōris', 'bocca; volto'],
              ['pēs, pedis', 'piede'],
              ['cor, cordis', 'cuore'],
              ['sanguis, sanguinis', 'sangue'],
              ['vultus, vultūs', 'volto, espressione'],
            ],
            speakCols: [0],
            note: 'Attenzione a «ōs, ōris» (bocca, neutro) e «os, ossis» (osso, neutro): cambia solo la lunghezza della vocale, che nei testi non è segnata. Le distingui dal genitivo — «ōris» contro «ossis» — e dal senso della frase.',
          },
          {
            type: 'table',
            title: 'I sentimenti',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['gaudium, gaudiī', 'gioia'],
              ['dolor, dolōris', 'dolore'],
              ['timor, timōris', 'paura'],
              ['amor, amōris', 'amore'],
              ['odium, odiī', 'odio'],
              ['voluptās, voluptātis', 'piacere'],
              ['cupiditās, cupiditātis', 'desiderio, brama'],
              ['audācia, audāciae', 'audacia, sfrontatezza'],
              ['superbia, superbiae', 'superbia, arroganza'],
              ['invidia, invidiae', 'invidia; odio altrui'],
            ],
            speakCols: [0],
            note: '«audācia» in latino è quasi sempre negativa: non il coraggio (che è «virtūs» o «fortitūdō») ma la sfrontatezza di chi osa troppo. E «invidia» spesso non è il sentimento di chi invidia, ma l’odio che uno si tira addosso: «in invidiā esse» = essere malvisto.',
          },
          {
            type: 'choice',
            prompt: 'In Cicerone «hominis audācia» ha un tono...',
            focus: 'hominis audācia',
            options: ['negativo: la sfrontatezza', 'positivo: il coraggio', 'neutro: la decisione'],
            answer: 'negativo: la sfrontatezza',
          },
          {
            type: 'choice',
            prompt: 'Trovi «ossis» in una versione. Di quale parola è il genitivo?',
            focus: 'ossis',
            options: ['os, ossis = osso', 'ōs, ōris = bocca', 'ovis, ovis = pecora'],
            answer: 'os, ossis = osso',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['caput', 'testa'],
              ['pēs', 'piede'],
              ['cor', 'cuore'],
              ['sanguis', 'sangue'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['dolor', 'dolore'],
              ['timor', 'paura'],
              ['odium', 'odio'],
              ['voluptās', 'piacere'],
            ],
          },
        ],
      },
      {
        id: 'u18l4',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '🧭',
            title: 'Tutti i tempi dell’indicativo, in una riga',
            body:
              'Ora li hai tutti. Il riassunto sta in poche spie:\n\n' +
              '• «-bā-» → imperfetto (amāva)\n' +
              '• «-bi-» / «-b-» → futuro (amerà)\n' +
              '• tema del perfetto nudo → perfetto (amò)\n' +
              '• tema del perfetto + «era-» → piuccheperfetto (aveva amato)\n' +
              '• tema del perfetto + «eri-» → futuro anteriore (avrà amato)\n\n' +
              'Nelle versioni di storia i tempi del racconto restano perfetto e ' +
              'imperfetto; il piuccheperfetto compare quando l’autore torna ' +
              'indietro.',
          },
          {
            type: 'analysis',
            sentence: 'Hostēs, quī fūgerant, nōn iam pugnābunt.',
            word: 'fūgerant',
            translation: 'I nemici, che erano fuggiti, non combatteranno più.',
            fields: [
              {
                label: 'Tempo',
                options: ['Piuccheperfetto', 'Perfetto', 'Imperfetto'],
                answer: 'Piuccheperfetto',
              },
              {
                label: 'Modo',
                options: ['Indicativo', 'Congiuntivo'],
                answer: 'Indicativo',
              },
              {
                label: 'Persona',
                options: ['3ª plurale', '3ª singolare'],
                answer: '3ª plurale',
              },
            ],
            note: 'Il piuccheperfetto è il tema del perfetto più le forme di «eram»: «fūg-erant». Racconta un’azione già conclusa prima di un’altra azione passata — in italiano «erano fuggiti».',
          },
          {
            type: 'analysis',
            prompt: 'Stessa frase: analizza «pugnābunt»',
            sentence: 'Hostēs, quī fūgerant, nōn iam pugnābunt.',
            word: 'pugnābunt',
            translation: 'I nemici, che erano fuggiti, non combatteranno più.',
            fields: [
              {
                label: 'Tempo',
                options: ['Futuro', 'Imperfetto', 'Presente'],
                answer: 'Futuro',
              },
              {
                label: 'Persona',
                options: ['3ª plurale', '3ª singolare'],
                answer: '3ª plurale',
              },
            ],
            note: 'Trappola da tenere a mente: «-bunt» è futuro (combatteranno), «-bant» è imperfetto (combattevano). Cambia una vocale e cambia il tempo del racconto — è uno degli errori più frequenti nelle versioni.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Hostēs urbem oppugnāverant»?',
            focus: 'Hostēs urbem oppugnāverant',
            options: [
              'I nemici avevano assalito la città',
              'I nemici assaliranno la città',
              'I nemici assalivano la città',
            ],
            answer: 'I nemici avevano assalito la città',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Rēx epistulam mittet»?',
            focus: 'Rēx epistulam mittet',
            options: [
              'Il re manderà una lettera',
              'Il re mandava una lettera',
              'Il re mandò una lettera',
            ],
            answer: 'Il re manderà una lettera',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Cum vēnissem, omnēs fūgerant»?',
            focus: 'Cum vēnissem, omnēs fūgerant',
            options: [
              'Quando arrivai, erano già fuggiti tutti',
              'Quando arriverò, fuggiranno tutti',
              'Arrivo e tutti fuggono',
            ],
            answer: 'Quando arrivai, erano già fuggiti tutti',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Il re sarà buono»',
            source: 'Il re sarà buono',
            answer: ['Rēx', 'bonus', 'erit'],
            extra: ['erat', 'est'],
          },
          {
            type: 'match',
            prompt: 'Abbina al tempo',
            pairs: [
              ['vidēbat', 'imperfetto'],
              ['vīdit', 'perfetto'],
              ['vīderat', 'piuccheperfetto'],
              ['vidēbit', 'futuro'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u19',
    title: 'Unità 19 — Le ultime declinazioni',
    subtitle: 'La 4ª, la 5ª e gli aggettivi che mancavano',
    color: '#7a5c1f',
    lessons: [
      {
        id: 'u19l1',
        title: 'La quarta: manus',
        icon: '✋',
        exercises: [
          {
            type: 'info',
            icon: '✋',
            title: 'Poche parole, ma pesanti',
            body:
              'La quarta DECLINAZIONE è piccola: contiene poche parole. Il ' +
              'guaio è che sono parole che nelle versioni di storia tornano a ' +
              'ogni pagina — «exercitus» (esercito), «impetus» (assalto), ' +
              '«adventus» (arrivo).\n\n' +
              'Il segno di riconoscimento è il GENITIVO in «-ūs». Sul ' +
              'vocabolario la trovi scritta «manus, manūs».\n\n' +
              'Attenzione a non confonderla con la seconda: «dominus» fa ' +
              '«dominī» al genitivo, «manus» fa «manūs». Il genitivo, come ' +
              'sempre, è il giudice.',
          },
          {
            type: 'table',
            title: 'manus, manūs (f.) — «la mano»',
            columns: ['Caso', 'Singolare', 'Plurale'],
            rows: [
              ['Nominativo', 'manus', 'manūs'],
              ['Genitivo', 'manūs', 'manuum'],
              ['Dativo', 'manuī', 'manibus'],
              ['Accusativo', 'manum', 'manūs'],
              ['Ablativo', 'manū', 'manibus'],
            ],
            speakCols: [1, 2],
            note: 'Nominativo singolare, genitivo singolare, nominativo e accusativo plurale si scrivono tutti «manus» o «manūs»: qui più che mai è la frase a dirti il caso.',
          },
          {
            type: 'table',
            title: 'Parole della 4ª declinazione',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['exercitus', 'esercito'],
              ['impetus', 'assalto, carica'],
              ['adventus', 'arrivo'],
              ['senātus', 'senato'],
              ['metus', 'paura'],
              ['portus', 'porto'],
              ['cōnsulātus', 'consolato'],
              ['manus', 'mano — ma anche schiera armata'],
              ['cornū (n.)', 'corno — e ala dell’esercito'],
            ],
            speakCols: [0],
            note: '«manus» e «cornū» hanno un secondo senso militare che nelle versioni è più frequente del primo: «manus mīlitum» è un drappello, «in dextrō cornū» vuol dire «all’ala destra».',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «exercitūs» (genitivo)?',
            focus: 'exercitūs',
            options: ['dell’esercito', 'all’esercito', 'con l’esercito'],
            answer: 'dell’esercito',
          },
          {
            type: 'choice',
            prompt: 'In una versione di guerra trovi «in dextrō cornū». Cosa vuol dire?',
            focus: 'in dextrō cornū',
            options: [
              'all’ala destra dello schieramento',
              'nel corno destro dell’animale',
              'con la tromba a destra',
            ],
            answer: 'all’ala destra dello schieramento',
          },
          {
            type: 'choice',
            prompt: 'Come riconosci una parola della 4ª declinazione?',
            options: [
              'dal genitivo in «-ūs»',
              'dal nominativo in «-us»',
              'dall’accusativo in «-um»',
            ],
            answer: 'dal genitivo in «-ūs»',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['exercitus', 'esercito'],
              ['impetus', 'assalto'],
              ['adventus', 'arrivo'],
              ['metus', 'paura'],
            ],
          },
        ],
      },
      {
        id: 'u19l2',
        title: 'La quinta: rēs',
        icon: '🌀',
        exercises: [
          {
            type: 'info',
            icon: '🌀',
            title: 'La più piccola, con la parola più grande',
            body:
              'La quinta DECLINAZIONE è ancora più piccola: praticamente due ' +
              'parole importanti, «rēs» e «diēs». Ma «rēs» è forse il vocabolo ' +
              'più camaleontico del latino.\n\n' +
              'Il segno è il GENITIVO in «-eī» o «-ēī»: «rēs, reī».\n\n' +
              'Quasi tutte sono femminili. «diēs» fa eccezione: di solito è ' +
              'maschile («il giorno»), ma diventa femminile quando indica una ' +
              'data stabilita.',
          },
          {
            type: 'table',
            title: 'rēs, reī (f.) — «la cosa»',
            columns: ['Caso', 'Singolare', 'Plurale'],
            rows: [
              ['Nominativo', 'rēs', 'rēs'],
              ['Genitivo', 'reī', 'rērum'],
              ['Dativo', 'reī', 'rēbus'],
              ['Accusativo', 'rem', 'rēs'],
              ['Ablativo', 'rē', 'rēbus'],
            ],
            speakCols: [1, 2],
            note: 'Come «diēs, diēī» (il giorno): diem, diē, diēs, diērum, diēbus.',
          },
          {
            type: 'info',
            icon: '🎭',
            title: '«rēs» vuol dire tutto',
            body:
              'Tradurre «rēs» con «cosa» funziona quasi mai. È una parola ' +
              'passe-partout, e il senso lo dà il contesto:\n\n' +
              '• il fatto, l’avvenimento — «rēs gestae» = le imprese compiute\n' +
              '• la situazione — «rēs male sē habet» = la cosa va male\n' +
              '• l’interesse pubblico — «rēs pūblica» = lo Stato ' +
              '(letteralmente «la cosa di tutti»: da lì «repubblica»)\n' +
              '• i beni, il patrimonio — «rem familiārem» = il patrimonio\n\n' +
              'Quando la incontri, non tradurla subito: chiediti di che cosa ' +
              'sta parlando la frase.',
          },
          {
            type: 'table',
            title: 'Parole della 5ª declinazione',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['rēs', 'cosa, fatto, situazione'],
              ['diēs', 'giorno'],
              ['fidēs', 'fedeltà, lealtà — e fiducia'],
              ['spēs', 'speranza'],
              ['aciēs', 'schieramento di battaglia'],
            ],
            speakCols: [0],
            note: '«fidēs» in Cesare è quasi sempre la lealtà o la parola data, non la fede religiosa. «aciēs» vale anche «sguardo acuto», ma nelle versioni è lo schieramento.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «rēs pūblica»?',
            focus: 'rēs pūblica',
            options: [
              'lo Stato, la cosa pubblica',
              'una cosa qualsiasi',
              'la piazza',
            ],
            answer: 'lo Stato, la cosa pubblica',
          },
          {
            type: 'choice',
            prompt: 'In «rēs gestae», cosa sono?',
            focus: 'rēs gestae',
            options: ['le imprese compiute', 'le cose portate', 'gli affari'],
            answer: 'le imprese compiute',
          },
          {
            type: 'choice',
            prompt: 'Che caso è «rem»?',
            focus: 'rem',
            options: ['accusativo singolare', 'nominativo plurale', 'genitivo'],
            answer: 'accusativo singolare',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['diēs', 'giorno'],
              ['spēs', 'speranza'],
              ['fidēs', 'lealtà'],
              ['aciēs', 'schieramento'],
            ],
          },
        ],
      },
      {
        id: 'u19l3',
        title: 'Aggettivi della 2ª classe',
        icon: '💪',
        exercises: [
          {
            type: 'info',
            icon: '💪',
            title: 'Gli altri aggettivi',
            body:
              'Gli aggettivi che conosci — «bonus, bona, bonum» — seguono la 1ª ' +
              'e la 2ª declinazione: si chiamano di PRIMA classe.\n\n' +
              'Ce n’è un secondo gruppo, che segue invece la 3ª declinazione. ' +
              'Sono i più frequenti in assoluto: «omnis» (tutto), «fortis» ' +
              '(forte), «gravis» (pesante, grave), «ingēns» (enorme).\n\n' +
              'Li riconosci perché non finiscono in «-us, -a, -um».',
          },
          {
            type: 'table',
            title: 'Tre gruppi, secondo quante uscite hanno',
            columns: ['Tipo', 'Come si presenta', 'Esempio'],
            rows: [
              ['due uscite', 'una per m./f., una per il neutro', 'fortis, forte'],
              ['tre uscite', 'una per genere', 'ācer, ācris, ācre'],
              ['una uscita', 'una sola, e il genitivo', 'ingēns, ingentis'],
            ],
            note: 'Sono differenze di facciata: si declinano tutti allo stesso modo, come i nomi della 3ª. Con tre particolarità: ablativo singolare in «-ī» (non -e), genitivo plurale in «-ium», neutro plurale in «-ia».',
          },
          {
            type: 'table',
            title: 'fortis, forte — singolare',
            columns: ['Caso', 'm. e f.', 'neutro'],
            rows: [
              ['Nominativo', 'fortis', 'forte'],
              ['Genitivo', 'fortis', 'fortis'],
              ['Dativo', 'fortī', 'fortī'],
              ['Accusativo', 'fortem', 'forte'],
              ['Ablativo', 'fortī', 'fortī'],
            ],
            speakCols: [1, 2],
            note: 'Al plurale: fortēs (m./f.) e fortia (n.) al nominativo, fortium al genitivo, fortibus per dativo e ablativo.',
          },
          {
            type: 'table',
            title: 'Aggettivi della 2ª classe da sapere',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['omnis, omne', 'tutto, ogni'],
              ['fortis, forte', 'forte, coraggioso'],
              ['gravis, grave', 'pesante, grave, serio'],
              ['brevis, breve', 'breve'],
              ['facilis, facile', 'facile'],
              ['difficilis, difficile', 'difficile'],
              ['nōbilis, nōbile', 'famoso, illustre'],
              ['ācer, ācris, ācre', 'acuto, accanito'],
              ['ingēns, ingentis', 'enorme'],
              ['potēns, potentis', 'potente'],
            ],
            speakCols: [0],
            note: '«nōbilis» non è il nobile di sangue ma chi è conosciuto, illustre (viene da «nōscere», conoscere). «ācer» descrive una battaglia accanita più spesso di un sapore acuto.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «omnēs mīlitēs»?',
            focus: 'omnēs mīlitēs',
            options: ['tutti i soldati', 'gli stessi soldati', 'i soldati forti'],
            answer: 'tutti i soldati',
          },
          {
            type: 'choice',
            prompt: 'Quale forma va con «bellum» (neutro)?',
            focus: 'bellum …',
            options: ['grave', 'gravis', 'gravem'],
            answer: 'grave',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['ingēns', 'enorme'],
              ['gravis', 'pesante'],
              ['ācer', 'accanito'],
              ['nōbilis', 'illustre'],
            ],
          },
        ],
      },
      {
        id: 'u19l4',
        title: 'Più di, il più di tutti',
        icon: '🏆',
        exercises: [
          {
            type: 'info',
            icon: '🏆',
            title: 'Comparativo e superlativo',
            body:
              'In italiano diciamo «più alto» e «altissimo» aggiungendo parole ' +
              'o desinenze. Il latino fa lo stesso, con due suffissi:\n\n' +
              '• COMPARATIVO: tema + «-ior» (neutro «-ius») = più alto\n' +
              '  altus → «altior, altius»\n' +
              '• SUPERLATIVO: tema + «-issimus, -a, -um» = altissimo, il più alto\n' +
              '  altus → «altissimus»\n\n' +
              'Il comparativo si declina come un aggettivo della 2ª classe ' +
              '(genitivo «altiōris»); il superlativo come «bonus».',
          },
          {
            type: 'info',
            icon: '⚖️',
            title: 'Più alto DI chi?',
            body:
              'Per dire il secondo termine di paragone ci sono due modi, ed ' +
              'entrambi si incontrano:\n\n' +
              '• «quam» + lo stesso caso del primo termine\n' +
              '  «Caesar fortior quam Pompēius» = Cesare più forte di Pompeo\n' +
              '• l’ABLATIVO da solo, senza niente davanti\n' +
              '  «Caesar fortior Pompēiō» = stessa cosa\n\n' +
              'Il secondo si chiama ablativo di paragone, e spiazza: vedi un ' +
              'ablativo isolato accanto a un comparativo e sembra un ' +
              'complemento. È il termine di paragone.',
          },
          {
            type: 'table',
            title: 'I cinque irregolari da sapere a memoria',
            columns: ['Positivo', 'Comparativo', 'Superlativo'],
            rows: [
              ['bonus (buono)', 'melior', 'optimus'],
              ['malus (cattivo)', 'peior', 'pessimus'],
              ['magnus (grande)', 'maior', 'maximus'],
              ['parvus (piccolo)', 'minor', 'minimus'],
              ['multus (molto)', 'plūs', 'plūrimus'],
            ],
            speakCols: [1, 2],
            note: 'Li riconosci perché li usiamo ancora: ottimo, pessimo, massimo, minimo. Sono gli stessi identici aggettivi, arrivati in italiano senza passare dal comparativo.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «altissimus mōns»?',
            focus: 'altissimus mōns',
            options: [
              'il monte altissimo / il più alto',
              'il monte più alto di quello',
              'un monte alto',
            ],
            answer: 'il monte altissimo / il più alto',
          },
          {
            type: 'choice',
            prompt: 'In «Caesar fortior Pompēiō erat», che funzione ha «Pompēiō»?',
            focus: 'fortior Pompēiō',
            options: [
              'è il secondo termine di paragone: più forte DI Pompeo',
              'è il complemento di mezzo',
              'è il soggetto',
            ],
            answer: 'è il secondo termine di paragone: più forte DI Pompeo',
          },
          {
            type: 'choice',
            prompt: 'Qual è il comparativo di «bonus»?',
            focus: 'bonus',
            options: ['melior', 'bonior', 'optimus'],
            answer: 'melior',
          },
          {
            type: 'match',
            prompt: 'Abbina al significato',
            pairs: [
              ['maior', 'più grande'],
              ['maximus', 'il più grande'],
              ['minor', 'più piccolo'],
              ['pessimus', 'il peggiore'],
            ],
          },
        ],
      },
      {
        id: 'u19v',
        title: 'Persone e società',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Chi popola i testi',
            body:
              'Le persone che compaiono nelle versioni non sono solo re e ' +
              'soldati. E qui si nascondono due dei falsi amici peggiori del ' +
              'latino, che sembrano trasparenti e non lo sono affatto.',
          },
          {
            type: 'table',
            title: 'La famiglia',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['uxor, uxōris', 'moglie'],
              ['coniūnx, coniugis', 'coniuge (marito o moglie)'],
              ['līberī, -ōrum (pl.)', 'i figli'],
              ['familia', 'la servitù di casa; il casato'],
              ['mulier, mulieris', 'donna'],
              ['senex, senis', 'vecchio'],
              ['iuvenis, iuvenis', 'giovane'],
              ['incola, -ae', 'abitante'],
            ],
            speakCols: [0],
            note: 'I due falsi amici: «līberī» sono i figli, non «i liberi» (erano i figli liberi del padrone, in contrapposizione ai servi). E «familia» è l’insieme dei servi e dei beni di una casa — la famiglia come la intendiamo noi si dice piuttosto «domus».',
          },
          {
            type: 'table',
            title: 'Mestieri e folla',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['nauta, -ae (m.)', 'marinaio'],
              ['agricola, -ae (m.)', 'contadino'],
              ['scrība, -ae (m.)', 'scrivano'],
              ['sacerdōs, sacerdōtis', 'sacerdote'],
              ['dea, -ae', 'dea'],
              ['inimīcus', 'nemico personale'],
              ['turba, -ae', 'folla'],
              ['multitūdō, -inis', 'moltitudine'],
              ['plēbs, plēbis', 'plebe'],
              ['servitūs, -ūtis', 'schiavitù'],
            ],
            speakCols: [0],
            note: 'Guarda i primi tre: finiscono in -a come «rosa» e si declinano come lei, ma sono MASCHILI — «nauta bonus», non «nauta bona». Il genere di un nome non si deduce dalla desinenza: va imparato con la parola.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «līberī»?',
            focus: 'līberī',
            options: ['i figli', 'gli uomini liberi', 'i libri'],
            answer: 'i figli',
          },
          {
            type: 'choice',
            prompt: 'Come si dice «il buon marinaio»?',
            focus: 'nauta',
            options: ['nauta bonus', 'nauta bona', 'nautus bonus'],
            answer: 'nauta bonus',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['uxor', 'moglie'],
              ['mulier', 'donna'],
              ['senex', 'vecchio'],
              ['incola', 'abitante'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['agricola', 'contadino'],
              ['sacerdōs', 'sacerdote'],
              ['turba', 'folla'],
              ['plēbs', 'plebe'],
            ],
          },
        ],
      },
      {
        id: 'u19l5',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '🧭',
            title: 'Le cinque declinazioni, in una tabella sola',
            body:
              'Da qui in poi ogni nome latino che incontri appartiene a uno di ' +
              'questi cinque gruppi, e a dirti quale è sempre il GENITIVO ' +
              'singolare.\n\n' +
              'Ecco l’unica cosa da ricordare per riconoscerli.',
          },
          {
            type: 'analysis',
            sentence: 'Rēs pūblica in manū cōnsulis erat.',
            word: 'manū',
            translation: 'Lo Stato era nelle mani del console.',
            fields: [
              {
                label: 'Caso',
                options: ['Ablativo', 'Dativo', 'Genitivo'],
                answer: 'Ablativo',
              },
              {
                label: 'Numero',
                options: ['Singolare', 'Plurale'],
                answer: 'Singolare',
              },
              {
                label: 'Declinazione',
                options: ['4ª', '2ª', '3ª'],
                answer: '4ª',
              },
            ],
            note: 'La 4ª declinazione ha la -u- dappertutto: «manus, manūs, manuī, manum, manū». La riconosci dal genitivo in -ūs, che il vocabolario dà sempre accanto al nominativo.',
          },
          {
            type: 'analysis',
            sentence: 'Mīlitēs fortēs hostium multitūdinem nōn timuērunt.',
            word: 'fortēs',
            translation: 'I soldati coraggiosi non temettero la moltitudine dei nemici.',
            fields: [
              {
                label: 'Caso',
                options: ['Nominativo', 'Accusativo', 'Genitivo'],
                answer: 'Nominativo',
              },
              {
                label: 'Classe',
                options: ['2ª classe', '1ª classe'],
                answer: '2ª classe',
              },
              {
                label: 'Concorda con',
                options: ['mīlitēs', 'multitūdinem', 'hostium'],
                answer: 'mīlitēs',
              },
            ],
            note: '«fortēs» potrebbe essere nominativo o accusativo plurale: le due forme sono identiche. Decide la concordanza — sta con «mīlitēs», che è il soggetto, quindi è nominativo. Gli aggettivi della 2ª classe seguono la 3ª declinazione, ed è per questo che hanno le stesse desinenze di «mīles, mīlitis».',
          },
          {
            type: 'table',
            title: 'Riconoscere la declinazione dal genitivo',
            columns: ['Genitivo', 'Declinazione', 'Modello'],
            rows: [
              ['-ae', '1ª', 'rosa, rosae'],
              ['-ī', '2ª', 'dominus, dominī'],
              ['-is', '3ª', 'rēx, rēgis'],
              ['-ūs', '4ª', 'manus, manūs'],
              ['-eī', '5ª', 'rēs, reī'],
            ],
            note: 'È per questo che il vocabolario dà sempre due forme: senza il genitivo non sapresti né la declinazione né il tema. Cinque desinenze e hai il quadro completo.',
          },
          {
            type: 'choice',
            prompt: 'Trovi «diēī» sul vocabolario. Che declinazione è?',
            focus: 'diēs, diēī',
            options: ['la 5ª', 'la 4ª', 'la 2ª'],
            answer: 'la 5ª',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Hostium impetus ācer erat»?',
            focus: 'Hostium impetus ācer erat',
            options: [
              'L’assalto dei nemici era accanito',
              'I nemici assalirono l’accampamento',
              'L’assalto era contro i nemici',
            ],
            answer: 'L’assalto dei nemici era accanito',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Omnēs rēs in manū rēgis erant»?',
            focus: 'Omnēs rēs in manū rēgis erant',
            options: [
              'Tutto era nelle mani del re',
              'Il re aveva tutte le cose in mano destra',
              'Tutti i re avevano le cose',
            ],
            answer: 'Tutto era nelle mani del re',
          },
          {
            type: 'build',
            prompt: 'Traduci: «il giorno più lungo»',
            source: 'il giorno più lungo',
            answer: ['diēs', 'longior'],
            extra: ['longus', 'diem'],
          },
          {
            type: 'match',
            prompt: 'Abbina alla declinazione',
            pairs: [
              ['rosa, rosae', '1ª'],
              ['dominus, dominī', '2ª'],
              ['manus, manūs', '4ª'],
              ['rēs, reī', '5ª'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u20',
    title: 'Unità 20 — Irregolari e deponenti',
    subtitle: 'Gli ultimi verbi da riconoscere',
    color: '#0f6b6b',
    lessons: [
      {
        id: 'u20l1',
        title: 'Potere: possum',
        icon: '💪',
        exercises: [
          {
            type: 'info',
            icon: '💪',
            title: 'Un verbo fatto con «esse»',
            body:
              '«possum» (potere) è il più frequente dei verbi irregolari, e la ' +
              'sua irregolarità ha una spiegazione: è nato dall’unione di «pot-» ' +
              '(che vale «capace») con il verbo «esse».\n\n' +
              'Se lo guardi così, non è più un mistero:\n' +
              '«pot- + sum» → «possum» (la t davanti alla s diventa s)\n' +
              '«pot- + est» → «potest»\n\n' +
              'Regge sempre un INFINITO, come in italiano: «possum venīre» = ' +
              'posso venire.',
          },
          {
            type: 'table',
            title: 'possum (potere) — presente',
            columns: ['Persona', 'Latino', 'Italiano'],
            rows: [
              ['io', 'possum', 'posso'],
              ['tu', 'potes', 'puoi'],
              ['lui/lei', 'potest', 'può'],
              ['noi', 'possumus', 'possiamo'],
              ['voi', 'potestis', 'potete'],
              ['loro', 'possunt', 'possono'],
            ],
            speakCols: [1],
            note: 'La regola è meccanica: davanti a una forma di «esse» che comincia per s si scrive «pos-», davanti alle altre «pot-». Gli altri tempi seguono «esse»: «poteram» (potevo), «poterō» (potrò), «possem» (potessi). Il perfetto è «potuī» e l’infinito «posse».',
          },
          {
            type: 'info',
            icon: '🧲',
            title: 'Gli altri parenti di «esse»',
            body:
              'Lo stesso trucco vale per una piccola famiglia di verbi: sono ' +
              '«esse» con un pezzetto davanti, e si coniugano identici.\n\n' +
              '• «adsum» = sono presente, assisto\n' +
              '• «absum» = sono assente, disto\n' +
              '• «praesum» = sono a capo (+ dativo)\n' +
              '• «dēsum» = manco\n\n' +
              'Se riconosci «-sum», «-est», «-erat» in coda, sai già coniugarli ' +
              'tutti.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Nōn possum venīre»?',
            focus: 'Nōn possum venīre',
            options: ['Non posso venire', 'Non voglio venire', 'Non verrò'],
            answer: 'Non posso venire',
          },
          {
            type: 'choice',
            prompt: 'Che cos’è «poterat»?',
            focus: 'poterat',
            options: ['poteva', 'potrà', 'potesse'],
            answer: 'poteva',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['potest', 'può'],
              ['poterat', 'poteva'],
              ['poterit', 'potrà'],
              ['posse', 'potere'],
            ],
          },
        ],
      },
      {
        id: 'u20l2',
        title: 'Andare, portare, volere',
        icon: '🚶',
        exercises: [
          {
            type: 'info',
            icon: '🚶',
            title: 'Quattro verbi cortissimi',
            body:
              'Restano quattro irregolari, e sono irregolari proprio perché ' +
              'usatissimi: le parole che si dicono di continuo si consumano e ' +
              'perdono i pezzi.\n\n' +
              '• «eō, īre» = andare\n' +
              '• «ferō, ferre» = portare\n' +
              '• «volō, velle» = volere\n' +
              '• «fīō, fierī» = diventare, accadere\n\n' +
              'Non c’è una regola: vanno riconosciuti. Ma sono corti, e proprio ' +
              'per questo saltano all’occhio.',
          },
          {
            type: 'table',
            title: 'eō (andare), ferō (portare), volō (volere)',
            columns: ['Persona', 'eō', 'ferō', 'volō'],
            rows: [
              ['io', 'eō', 'ferō', 'volō'],
              ['tu', 'īs', 'fers', 'vīs'],
              ['lui/lei', 'it', 'fert', 'vult'],
              ['noi', 'īmus', 'ferimus', 'volumus'],
              ['voi', 'ītis', 'fertis', 'vultis'],
              ['loro', 'eunt', 'ferunt', 'volunt'],
            ],
            note: 'Occhio a «it» (va) e «vīs» (vuoi): sono parole di due lettere che si confondono con tutto. Perfetti: «iī» (o «īvī»), «tulī», «voluī». Da «volō» nascono «nōlō» (non volere) e «mālō» (preferire).',
          },
          {
            type: 'info',
            icon: '🔁',
            title: '«fīō»: il passivo di «faciō»',
            body:
              '«faciō» (fare) è regolare, ma il suo passivo non esiste: al suo ' +
              'posto il latino usa un altro verbo, «fīō».\n\n' +
              '«fīō» = divento, sono fatto, accado\n' +
              '«fit» = accade, avviene\n\n' +
              'Nelle versioni «fit» e «factum est» valgono spesso «avvenne», ' +
              '«accadde»: sono i verbi con cui l’autore introduce un fatto ' +
              'nuovo.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «In urbem it»?',
            focus: 'In urbem it',
            options: ['Va in città', 'È in città', 'Porta in città'],
            answer: 'Va in città',
          },
          {
            type: 'choice',
            prompt: 'Che cos’è «vult»?',
            focus: 'vult',
            options: ['vuole', 'va', 'porta'],
            answer: 'vuole',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['it', 'va'],
              ['fert', 'porta'],
              ['vult', 'vuole'],
              ['fit', 'accade'],
            ],
          },
        ],
      },
      {
        id: 'u20l3',
        title: 'I deponenti',
        icon: '🎭',
        exercises: [
          {
            type: 'info',
            icon: '🎭',
            title: 'Passivi fuori, attivi dentro',
            body:
              'Ed eccoci all’ultimo ostacolo vero del latino, quello che fa ' +
              'sbagliare più traduzioni di ogni altra cosa.\n\n' +
              'Alcuni verbi hanno la forma PASSIVA ma il significato ATTIVO. Si ' +
              'chiamano DEPONENTI, perché hanno «deposto» il senso passivo.\n\n' +
              '«hortātur» sembra «è esortato». Vuol dire «esorta».\n' +
              '«sequitur» sembra «è seguito». Vuol dire «segue».\n\n' +
              'Non c’è niente da capire: c’è da riconoscerli. E per fortuna il ' +
              'vocabolario li tradisce subito.',
          },
          {
            type: 'info',
            icon: '🔍',
            title: 'Come li smaschera il vocabolario',
            body:
              'Un verbo normale ha quattro forme sul vocabolario: «amō, amāre, ' +
              'amāvī, amātum».\n\n' +
              'Un deponente ne ha TRE, e sono tutte di aspetto passivo:\n' +
              '«hortor, hortārī, hortātus sum» = esortare\n\n' +
              'Se la prima forma finisce in «-or» e l’infinito in «-ārī, -ērī, ' +
              '-ī, -īrī», è un deponente. Traducilo all’attivo e non pensarci ' +
              'più.',
          },
          {
            type: 'table',
            title: 'I deponenti che incontrerai',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['hortor, hortārī', 'esortare, incoraggiare'],
              ['sequor, sequī', 'seguire'],
              ['loquor, loquī', 'parlare'],
              ['morior, morī', 'morire'],
              ['patior, patī', 'subire, sopportare'],
              ['ūtor, ūtī', 'usare (+ ablativo)'],
              ['proficīscor, proficīscī', 'partire'],
              ['arbitror, arbitrārī', 'ritenere, giudicare'],
              ['vereor, verērī', 'temere'],
              ['nāscor, nāscī', 'nascere'],
            ],
            speakCols: [0],
            note: '«ūtor» regge l’ablativo, non l’accusativo: «gladiō ūtitur» = usa la spada (alla lettera «si serve con la spada»). È l’unico che chiede attenzione al caso.',
          },
          {
            type: 'info',
            icon: '⚠️',
            title: 'Il participio dei deponenti è attivo',
            body:
              'Conseguenza importante, e nelle versioni pesa: il participio ' +
              'perfetto di un deponente ha senso ATTIVO, non passivo.\n\n' +
              '«locūtus» = avendo parlato (non «essendo stato parlato»)\n' +
              '«profectus» = essendo partito\n' +
              '«secūtus» = avendo seguito\n\n' +
              'È uno dei pochi modi che il latino ha per dire «avendo fatto» ' +
              'riferito al soggetto — e per questo gli autori ne abusano.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Caesar mīlitēs hortātur»?',
            focus: 'mīlitēs hortātur',
            options: [
              'Cesare esorta i soldati',
              'Cesare è esortato dai soldati',
              'I soldati esortano Cesare',
            ],
            answer: 'Cesare esorta i soldati',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Hostēs secūtī sunt»?',
            focus: 'Hostēs secūtī sunt',
            options: [
              'I nemici seguirono',
              'I nemici furono seguiti',
              'I nemici saranno seguiti',
            ],
            answer: 'I nemici seguirono',
          },
          {
            type: 'choice',
            prompt: 'Come riconosci un deponente sul vocabolario?',
            options: [
              'ha tre forme e finiscono tutte come un passivo',
              'ha quattro forme come gli altri',
              'ha l’infinito in -āre',
            ],
            answer: 'ha tre forme e finiscono tutte come un passivo',
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['loquitur', 'parla'],
              ['sequitur', 'segue'],
              ['moritur', 'muore'],
              ['proficīscitur', 'parte'],
            ],
          },
        ],
      },
      {
        id: 'u20v',
        title: 'Le parole delle idee',
        icon: '🗂️',
        exercises: [
          {
            type: 'info',
            icon: '🗂️',
            title: 'Gli astratti, e perché sono difficili',
            body:
              'Ultimo gruppo, e il più insidioso. Sono parole astratte, quindi ' +
              'quasi tutte hanno passato la loro forma all’italiano — e quasi ' +
              'tutte hanno cambiato senso per strada.\n\n' +
              'Con queste, la regola dell’unità 1 vale al massimo grado: se una ' +
              'parola ti sembra ovvia, controllala lo stesso.',
          },
          {
            type: 'table',
            title: 'Mente e parola',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['mēns, mentis', 'mente, intenzione'],
              ['ratiō, ratiōnis', 'ragione; metodo; conto'],
              ['cōnsilium', 'decisione, piano'],
              ['sententia', 'opinione, parere'],
              ['ōrātiō, ōrātiōnis', 'discorso'],
              ['memoria', 'memoria, ricordo'],
              ['exemplum', 'esempio, precedente'],
              ['causa', 'motivo — «meā causā» = per causa mia'],
            ],
            speakCols: [0],
            note: '«ratiō» è camaleontica quanto «rēs»: è la ragione, ma anche il metodo, il piano, e perfino il conto in denaro. «Quā ratiōne?» non è «per quale ragione?» ma «in che modo?».',
          },
          {
            type: 'table',
            title: 'Forza, ordine, costume',
            lessico: true,
            columns: ['Latino', 'Italiano'],
            rows: [
              ['vīs (vim, vī)', 'forza, violenza'],
              ['vīrēs, vīrium (pl.)', 'le forze fisiche'],
              ['salūs, salūtis', 'salvezza; salute'],
              ['mōs, mōris', 'costume, usanza'],
              ['mōrēs, mōrum (pl.)', 'il carattere, i costumi'],
              ['ōrdō, ōrdinis', 'ordine, fila; ceto sociale'],
              ['genus, generis', 'stirpe, genere, specie'],
              ['initium', 'inizio'],
              ['fīnis, fīnis', 'fine, limite'],
              ['numerus', 'numero'],
            ],
            speakCols: [0],
            note: '«vīs» è irregolare e cortissima: al singolare fa «vīs, vim, vī», al plurale cambia tema e diventa «vīrēs». E «salūs» è più spesso la salvezza (scampare a un pericolo) che la salute del corpo.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Quā ratiōne id fēcit?»',
            focus: 'Quā ratiōne',
            options: ['In che modo lo fece?', 'Per quale ragione lo fece?', 'Con quale conto lo fece?'],
            answer: 'In che modo lo fece?',
          },
          {
            type: 'choice',
            prompt: 'In «salūtem petīvērunt», che cosa cercavano?',
            focus: 'salūtem petīvērunt',
            options: ['la salvezza', 'la salute', 'il saluto'],
            answer: 'la salvezza',
          },
          {
            type: 'choice',
            prompt: 'Cosa sono i «mōrēs» di un popolo?',
            focus: 'mōrēs',
            options: ['i costumi, il carattere', 'le mura', 'le morti'],
            answer: 'i costumi, il carattere',
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['mēns', 'mente'],
              ['ōrātiō', 'discorso'],
              ['sententia', 'parere'],
              ['exemplum', 'precedente'],
            ],
          },
          {
            type: 'match',
            prompt: 'Abbina all’italiano',
            pairs: [
              ['vīs', 'violenza'],
              ['ōrdō', 'ceto sociale'],
              ['genus', 'stirpe'],
              ['initium', 'inizio'],
            ],
          },
        ],
      },
      {
        id: 'u20l4',
        title: 'Analizza e traduci',
        icon: '📖',
        exercises: [
          {
            type: 'info',
            icon: '🧭',
            title: 'Attivo o deponente?',
            body:
              'Da qui in avanti, davanti a un verbo dall’aria passiva fatti una ' +
              'domanda sola: c’è un complemento d’agente?\n\n' +
              '• «ā/ab» + ablativo, oppure un ablativo di mezzo → è un vero ' +
              'PASSIVO: «ā mīlitibus capitur» = è preso dai soldati\n' +
              '• niente agente, e magari c’è un complemento OGGETTO in ' +
              'accusativo → è un DEPONENTE: «mīlitēs hortātur» = esorta i ' +
              'soldati\n\n' +
              'Un passivo non può avere un oggetto. Se ce l’ha, il verbo è ' +
              'deponente.',
          },
          {
            type: 'analysis',
            sentence: 'Caesar mīlitēs hortātus est.',
            word: 'hortātus est',
            translation: 'Cesare esortò i soldati.',
            fields: [
              {
                label: 'Forma',
                options: ['Passiva', 'Attiva'],
                answer: 'Passiva',
              },
              {
                label: 'Significato',
                options: ['Attivo', 'Passivo'],
                answer: 'Attivo',
              },
              {
                label: 'Tempo',
                options: ['Perfetto', 'Presente'],
                answer: 'Perfetto',
              },
            ],
            note: 'È un deponente: forma passiva, senso attivo. La prova del nove è l’oggetto — «mīlitēs» è accusativo, e un passivo vero non può reggere un complemento oggetto. Forma passiva + accusativo accanto = deponente.',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Dux mīlitēs hortātus est»?',
            focus: 'Dux mīlitēs hortātus est',
            options: [
              'Il comandante esortò i soldati',
              'Il comandante fu esortato dai soldati',
              'I soldati furono esortati',
            ],
            answer: 'Il comandante esortò i soldati',
          },
          {
            type: 'choice',
            prompt: 'E «Dux ā mīlitibus vīsus est»?',
            focus: 'Dux ā mīlitibus vīsus est',
            options: [
              'Il comandante fu visto dai soldati',
              'Il comandante vide i soldati',
              'Il comandante seguì i soldati',
            ],
            answer: 'Il comandante fu visto dai soldati',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Cum profectus esset, urbs capta est»?',
            focus: 'Cum profectus esset',
            options: [
              'Dopo che era partito, la città fu presa',
              'Dopo che fu spedito, la città fu presa',
              'Partendo, prese la città',
            ],
            answer: 'Dopo che era partito, la città fu presa',
          },
          {
            type: 'choice',
            prompt: 'Cosa significa «Nōn potuit gladiō ūtī»?',
            focus: 'gladiō ūtī',
            options: [
              'Non poté usare la spada',
              'Non fu ucciso con la spada',
              'Non volle la spada',
            ],
            answer: 'Non poté usare la spada',
          },
          {
            type: 'build',
            prompt: 'Traduci: «Il comandante parla»',
            source: 'Il comandante parla',
            answer: ['Dux', 'loquitur'],
            extra: ['loquī', 'ducis'],
          },
          {
            type: 'match',
            prompt: 'Abbina alla traduzione',
            pairs: [
              ['hortātus est', 'esortò'],
              ['vīsus est', 'fu visto'],
              ['profectus est', 'partì'],
              ['captus est', 'fu preso'],
            ],
          },
        ],
      },
    ],
  },
]
