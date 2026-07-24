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
]
