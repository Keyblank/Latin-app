// Le VERSIONI: brani latini continui da tradurre, con l'aiuto sulle parole.
//
// È la differenza fra saper tradurre una frase e saper tradurre un testo: in
// un brano le frasi si tengono, i soggetti restano sottintesi da una riga
// all'altra, e bisogna decidere cosa sta con cosa. È quello che chiedono
// all'esame.
//
// I brani sono ADATTATI: rispettano la sintassi latina ma usano solo la
// grammatica e il lessico che il corso ha già insegnato. Un Cesare vero,
// preso di peso, sarebbe illeggibile e non insegnerebbe niente.
//
// ►► COME AGGIUNGERNE UNA ◄◄
// Serve: il testo diviso in frasi, la traduzione di ognuna, e il glossario
// delle parole (chiave = la forma COME COMPARE nel testo). Le parole senza
// voce nel glossario restano non toccabili: meglio metterle tutte.

/** Una parola del brano su cui si può toccare per avere l'aiuto. */
export interface Gloss {
  /** Come si cerca sul vocabolario (es. «rēx, rēgis»). */
  lemma: string
  /** Che cosa vuol dire, qui. */
  senso: string
  /** Analisi della forma: caso, tempo, funzione. */
  forma?: string
}

/** Una frase del brano: latino, traduzione, ed eventuale commento. */
export interface Frase {
  lat: string
  ita: string
  /** Nota che spiega il punto difficile della frase. */
  nota?: string
}

export interface Versio {
  id: string
  titolo: string
  /** Da dove viene, o a cosa si ispira. */
  fonte: string
  icona: string
  /** Lezioni da completare per sbloccarla. */
  unlock: number
  /** Difficoltà dichiarata, per farsi un'idea. */
  livello: 'facile' | 'media' | 'impegnativa'
  /** Cosa serve sapere: si mostra prima di cominciare. */
  intro: string
  /** Le costruzioni che il brano mette alla prova. */
  costrutti: string[]
  frasi: Frase[]
  /** Glossario: la chiave è la forma esatta che compare nel testo. */
  parole: Record<string, Gloss>
}

export const versiones: Versio[] = [
  // ───────────────────────────── vulpes ─────────────────────────────
  {
    id: 'vulpes',
    titolo: 'Vulpēs et corvus',
    fonte: 'la favola di Fedro, adattata',
    icona: '🦊',
    unlock: 46,
    livello: 'facile',
    intro:
      'La prima versione: una favola corta, tutta al passato. Non c’è niente ' +
      'che non hai già visto — imperfetti, perfetti, e i casi. Serve solo a ' +
      'farti l’occhio a un testo che continua invece di frasi staccate.',
    costrutti: ['imperfetto e perfetto', 'accusativo oggetto', 'discorso diretto'],
    frasi: [
      {
        lat: 'Corvus in arbore sedēbat et cāseum in ōre tenēbat.',
        ita: 'Un corvo stava seduto su un albero e teneva un formaggio nel becco.',
        nota: 'Due «in» con l’ablativo: nessun movimento, solo il luogo dove uno sta.',
      },
      {
        lat: 'Vulpēs corvum vīdit et cāseum cupīvit.',
        ita: 'Una volpe vide il corvo e desiderò il formaggio.',
      },
      {
        lat: 'Itaque vulpēs corvum laudāre incēpit.',
        ita: 'Perciò la volpe cominciò a lodare il corvo.',
        nota: '«laudāre» è un infinito retto da «incēpit»: come in italiano, «cominciò a lodare».',
      },
      {
        lat: 'Pulcher es, dīxit, sed vōcem nōn audīvī.',
        ita: '«Sei bello», disse, «ma non ho sentito la tua voce.»',
        nota: 'Il soggetto di «es» è il corvo, e non c’è scritto: lo dice la desinenza.',
      },
      {
        lat: 'Corvus laetus cantāre temptāvit.',
        ita: 'Il corvo, contento, provò a cantare.',
      },
      {
        lat: 'Statim cāseus ad terram cecidit.',
        ita: 'Subito il formaggio cadde a terra.',
        nota: '«ad» con l’accusativo: qui c’è movimento, e infatti «terram» è accusativo.',
      },
      {
        lat: 'Ita vulpēs praedam habuit, corvus nihil.',
        ita: 'Così la volpe ebbe la preda, il corvo niente.',
        nota: 'Nella seconda parte il verbo non c’è: si sottintende «habuit». Il latino lo fa spesso.',
      },
    ],
    parole: {
      'Corvus': { lemma: 'corvus, -ī', senso: 'corvo', forma: 'nominativo, soggetto' },
      'in': { lemma: 'in', senso: 'in, su', forma: 'con l’ablativo: dove si sta' },
      'arbore': { lemma: 'arbor, arboris', senso: 'albero', forma: 'ablativo' },
      'sedēbat': { lemma: 'sedēre', senso: 'stava seduto', forma: 'imperfetto' },
      'et': { lemma: 'et', senso: 'e' },
      'cāseum': { lemma: 'cāseus, -ī', senso: 'formaggio', forma: 'accusativo, oggetto' },
      'ōre': { lemma: 'ōs, ōris', senso: 'bocca, becco', forma: 'ablativo' },
      'tenēbat': { lemma: 'tenēre', senso: 'teneva', forma: 'imperfetto' },
      'Vulpēs': { lemma: 'vulpēs, vulpis', senso: 'volpe', forma: 'nominativo, soggetto' },
      'corvum': { lemma: 'corvus, -ī', senso: 'il corvo', forma: 'accusativo, oggetto' },
      'vīdit': { lemma: 'vidēre', senso: 'vide', forma: 'perfetto' },
      'cupīvit': { lemma: 'cupere', senso: 'desiderò', forma: 'perfetto' },
      'Itaque': { lemma: 'itaque', senso: 'perciò, così' },
      'vulpēs': { lemma: 'vulpēs, vulpis', senso: 'la volpe', forma: 'nominativo, soggetto' },
      'laudāre': { lemma: 'laudāre', senso: 'lodare', forma: 'infinito, retto da «incēpit»' },
      'incēpit': { lemma: 'incipere', senso: 'cominciò', forma: 'perfetto' },
      'Pulcher': { lemma: 'pulcher, -chra, -chrum', senso: 'bello', forma: 'nominativo' },
      'es': { lemma: 'esse', senso: 'sei', forma: 'presente, 2ª singolare' },
      'dīxit': { lemma: 'dīcere', senso: 'disse', forma: 'perfetto' },
      'sed': { lemma: 'sed', senso: 'ma' },
      'vōcem': { lemma: 'vōx, vōcis', senso: 'voce', forma: 'accusativo, oggetto' },
      'nōn': { lemma: 'nōn', senso: 'non' },
      'audīvī': { lemma: 'audīre', senso: 'ho sentito', forma: 'perfetto, 1ª singolare' },
      'laetus': { lemma: 'laetus, -a, -um', senso: 'contento', forma: 'nominativo, riferito al corvo' },
      'cantāre': { lemma: 'cantāre', senso: 'cantare', forma: 'infinito' },
      'temptāvit': { lemma: 'temptāre', senso: 'provò, tentò', forma: 'perfetto' },
      'Statim': { lemma: 'statim', senso: 'subito' },
      'cāseus': { lemma: 'cāseus, -ī', senso: 'il formaggio', forma: 'nominativo, soggetto' },
      'ad': { lemma: 'ad', senso: 'verso, a', forma: 'con l’accusativo: movimento' },
      'terram': { lemma: 'terra, -ae', senso: 'terra', forma: 'accusativo' },
      'cecidit': { lemma: 'cadere', senso: 'cadde', forma: 'perfetto' },
      'Ita': { lemma: 'ita', senso: 'così' },
      'praedam': { lemma: 'praeda, -ae', senso: 'preda, bottino', forma: 'accusativo, oggetto' },
      'habuit': { lemma: 'habēre', senso: 'ebbe', forma: 'perfetto' },
      'corvus': { lemma: 'corvus, -ī', senso: 'il corvo', forma: 'nominativo' },
      'nihil': { lemma: 'nihil', senso: 'niente' },
    },
  },

  // ───────────────────────────── mucius ─────────────────────────────
  {
    id: 'mucius',
    titolo: 'Mūcius Scaevola',
    fonte: 'ispirata a Livio',
    icona: '🔥',
    unlock: 58,
    livello: 'facile',
    intro:
      'Una scena famosa dell’assedio di Roma. Qui trovi i participi e un ' +
      'ablativo assoluto: due parole in ablativo che raccontano la circostanza ' +
      'e stanno un po’ per conto loro.',
    costrutti: ['participio perfetto', 'ablativo assoluto', 'perfetto narrativo'],
    frasi: [
      {
        lat: 'Porsenna, rēx Etrūscōrum, Rōmam obsidēbat.',
        ita: 'Porsenna, re degli Etruschi, assediava Roma.',
        nota: '«rēx Etrūscōrum» è un’apposizione: sta accanto al nome e lo spiega, nello stesso caso.',
      },
      {
        lat: 'Mūcius, iuvenis Rōmānus, rēgem necāre cōnstituit.',
        ita: 'Muzio, un giovane romano, decise di uccidere il re.',
      },
      {
        lat: 'In castra hostium vēnit et virum ōrnātum necāvit.',
        ita: 'Venne nell’accampamento dei nemici e uccise un uomo ben vestito.',
        nota: '«castra» è un accampamento solo, anche se ha forma plurale. E «ōrnātum» è un participio perfetto usato come aggettivo.',
      },
      {
        lat: 'Sed nōn rēx erat: scrība erat.',
        ita: 'Ma non era il re: era uno scrivano.',
      },
      {
        lat: 'Mīlitēs Mūcium cēpērunt et ad rēgem dūxērunt.',
        ita: 'I soldati presero Muzio e lo condussero dal re.',
      },
      {
        lat: 'Tum iuvenis manum in ignem posuit et rēgem spectābat.',
        ita: 'Allora il giovane mise la mano nel fuoco e guardava il re.',
        nota: 'Il perfetto «posuit» dice il gesto, l’imperfetto «spectābat» la scena che dura: i due tempi lavorano insieme.',
      },
      {
        lat: 'Porsenna, hōc factō territus, Mūcium dīmīsit.',
        ita: 'Porsenna, spaventato da questo gesto, lasciò andare Muzio.',
        nota: '«hōc factō» è un ablativo assoluto — o, se preferisci, un ablativo di causa: «per questo gesto».',
      },
      {
        lat: 'Ita Mūcius cognōmen Scaevola accēpit.',
        ita: 'Così Muzio ricevette il soprannome «Scevola» (il mancino).',
      },
    ],
    parole: {
      'Porsenna': { lemma: 'Porsenna, -ae', senso: 'Porsenna', forma: 'nominativo, soggetto' },
      'rēx': { lemma: 'rēx, rēgis', senso: 're', forma: 'nominativo, apposizione' },
      'Etrūscōrum': { lemma: 'Etrūscī, -ōrum', senso: 'degli Etruschi', forma: 'genitivo plurale' },
      'Rōmam': { lemma: 'Rōma, -ae', senso: 'Roma', forma: 'accusativo, oggetto' },
      'obsidēbat': { lemma: 'obsidēre', senso: 'assediava', forma: 'imperfetto' },
      'Mūcius': { lemma: 'Mūcius, -ī', senso: 'Muzio', forma: 'nominativo, soggetto' },
      'iuvenis': { lemma: 'iuvenis, iuvenis', senso: 'giovane', forma: 'nominativo, apposizione' },
      'Rōmānus': { lemma: 'Rōmānus, -a, -um', senso: 'romano', forma: 'nominativo' },
      'rēgem': { lemma: 'rēx, rēgis', senso: 'il re', forma: 'accusativo, oggetto' },
      'necāre': { lemma: 'necāre', senso: 'uccidere', forma: 'infinito, retto da «cōnstituit»' },
      'cōnstituit': { lemma: 'cōnstituere', senso: 'decise', forma: 'perfetto' },
      'In': { lemma: 'in', senso: 'in, dentro', forma: 'con l’accusativo: movimento' },
      'castra': { lemma: 'castra, -ōrum', senso: 'l’accampamento', forma: 'accusativo' },
      'hostium': { lemma: 'hostis, hostis', senso: 'dei nemici', forma: 'genitivo plurale' },
      'vēnit': { lemma: 'venīre', senso: 'venne', forma: 'perfetto' },
      'et': { lemma: 'et', senso: 'e' },
      'virum': { lemma: 'vir, virī', senso: 'un uomo', forma: 'accusativo, oggetto' },
      'ōrnātum': { lemma: 'ōrnāre', senso: 'ben vestito, ornato', forma: 'participio perfetto, con «virum»' },
      'necāvit': { lemma: 'necāre', senso: 'uccise', forma: 'perfetto' },
      'Sed': { lemma: 'sed', senso: 'ma' },
      'nōn': { lemma: 'nōn', senso: 'non' },
      'erat': { lemma: 'esse', senso: 'era', forma: 'imperfetto' },
      'scrība': { lemma: 'scrība, -ae (m.)', senso: 'scrivano', forma: 'nominativo — maschile, anche se finisce in -a' },
      'Mīlitēs': { lemma: 'mīles, mīlitis', senso: 'i soldati', forma: 'nominativo plurale, soggetto' },
      'Mūcium': { lemma: 'Mūcius, -ī', senso: 'Muzio', forma: 'accusativo, oggetto' },
      'cēpērunt': { lemma: 'capere', senso: 'presero', forma: 'perfetto, 3ª plurale' },
      'ad': { lemma: 'ad', senso: 'verso, da', forma: 'con l’accusativo' },
      'dūxērunt': { lemma: 'dūcere', senso: 'condussero', forma: 'perfetto, 3ª plurale' },
      'Tum': { lemma: 'tum', senso: 'allora' },
      'manum': { lemma: 'manus, manūs', senso: 'la mano', forma: 'accusativo, 4ª declinazione' },
      'in': { lemma: 'in', senso: 'in, dentro', forma: 'con l’accusativo: movimento' },
      'ignem': { lemma: 'ignis, ignis', senso: 'il fuoco', forma: 'accusativo' },
      'posuit': { lemma: 'pōnere', senso: 'mise', forma: 'perfetto' },
      'spectābat': { lemma: 'spectāre', senso: 'guardava', forma: 'imperfetto' },
      'hōc': { lemma: 'hic, haec, hoc', senso: 'questo', forma: 'ablativo, con «factō»' },
      'factō': { lemma: 'factum, -ī', senso: 'gesto, fatto', forma: 'ablativo: ablativo assoluto' },
      'territus': { lemma: 'terrēre', senso: 'spaventato', forma: 'participio perfetto, riferito a Porsenna' },
      'dīmīsit': { lemma: 'dīmittere', senso: 'lasciò andare', forma: 'perfetto' },
      'Ita': { lemma: 'ita', senso: 'così' },
      'cognōmen': { lemma: 'cognōmen, -inis', senso: 'soprannome', forma: 'accusativo, oggetto' },
      'Scaevola': { lemma: 'Scaevola, -ae', senso: 'Scevola, «il mancino»', forma: 'accusativo' },
      'accēpit': { lemma: 'accipere', senso: 'ricevette', forma: 'perfetto' },
    },
  },

  // ───────────────────────────── daedalus ─────────────────────────────
  {
    id: 'daedalus',
    titolo: 'Daedalus et Īcarus',
    fonte: 'ispirata a Ovidio',
    icona: '🪶',
    unlock: 71,
    livello: 'media',
    intro:
      'Un mito, e quindi un racconto con due personaggi che si scambiano il ' +
      'ruolo di soggetto. Fai attenzione ai pronomi: «eius» e «suus» non ' +
      'dicono la stessa cosa, e qui la differenza si vede.',
    costrutti: ['pronomi', 'accusativo + infinito', 'ablativo assoluto'],
    frasi: [
      {
        lat: 'Daedalus et fīlius eius Īcarus in īnsulā Crētā erant.',
        ita: 'Dedalo e suo figlio Icaro erano nell’isola di Creta.',
        nota: '«eius» = di lui: il figlio è di Dedalo. Non «suus», perché il soggetto della frase sono tutti e due.',
      },
      {
        lat: 'Rēx eōs discēdere nōn sinēbat.',
        ita: 'Il re non permetteva loro di andarsene.',
        nota: '«eōs discēdere» è un accusativo + infinito: «eōs» è il soggetto di «discēdere», non l’oggetto di «sinēbat».',
      },
      {
        lat: 'Itaque Daedalus ālās sibi et fīliō suō fēcit.',
        ita: 'Perciò Dedalo fece delle ali per sé e per il proprio figlio.',
        nota: 'Qui invece «suō», perché il soggetto è Dedalo e il figlio è il suo. Confronta con la prima frase.',
      },
      {
        lat: 'Puerum monuit: sōlem petere perīculōsum esse.',
        ita: 'Avvertì il ragazzo: che avvicinarsi al sole era pericoloso.',
        nota: 'Discorso indiretto: «perīculōsum esse» è l’infinito, e il soggetto è tutto il gruppo «sōlem petere».',
      },
      {
        lat: 'Sed Īcarus, laetus, patrem nōn audīvit et ad sōlem volāvit.',
        ita: 'Ma Icaro, contento, non ascoltò il padre e volò verso il sole.',
      },
      {
        lat: 'Sōl cēram ālārum solvit, et puer in mare cecidit.',
        ita: 'Il sole sciolse la cera delle ali, e il ragazzo cadde in mare.',
        nota: '«in mare» con l’accusativo: c’è movimento, ci finisce dentro.',
      },
      {
        lat: 'Pater, fīliō āmissō, terram petīvit et diū flēvit.',
        ita: 'Il padre, perduto il figlio, raggiunse la terraferma e pianse a lungo.',
        nota: 'Ablativo assoluto: «fīliō āmissō», due parole in ablativo che dicono la circostanza.',
      },
    ],
    parole: {
      'Daedalus': { lemma: 'Daedalus, -ī', senso: 'Dedalo', forma: 'nominativo, soggetto' },
      'et': { lemma: 'et', senso: 'e' },
      'fīlius': { lemma: 'fīlius, -ī', senso: 'figlio', forma: 'nominativo, soggetto' },
      'eius': { lemma: 'is, ea, id', senso: 'di lui', forma: 'genitivo — di un altro, non del soggetto' },
      'Īcarus': { lemma: 'Īcarus, -ī', senso: 'Icaro', forma: 'nominativo, apposizione' },
      'in': { lemma: 'in', senso: 'in', forma: 'con l’ablativo: dove si sta' },
      'īnsulā': { lemma: 'īnsula, -ae', senso: 'isola', forma: 'ablativo' },
      'Crētā': { lemma: 'Crēta, -ae', senso: 'Creta', forma: 'ablativo, apposizione' },
      'erant': { lemma: 'esse', senso: 'erano', forma: 'imperfetto' },
      'Rēx': { lemma: 'rēx, rēgis', senso: 'il re', forma: 'nominativo, soggetto' },
      'eōs': { lemma: 'is, ea, id', senso: 'loro', forma: 'accusativo plurale: soggetto dell’infinito' },
      'discēdere': { lemma: 'discēdere', senso: 'andarsene', forma: 'infinito' },
      'nōn': { lemma: 'nōn', senso: 'non' },
      'sinēbat': { lemma: 'sinere', senso: 'permetteva', forma: 'imperfetto' },
      'Itaque': { lemma: 'itaque', senso: 'perciò' },
      'ālās': { lemma: 'āla, -ae', senso: 'ali', forma: 'accusativo plurale, oggetto' },
      'sibi': { lemma: 'sē', senso: 'per sé', forma: 'dativo del riflessivo' },
      'fīliō': { lemma: 'fīlius, -ī', senso: 'al figlio', forma: 'dativo' },
      'suō': { lemma: 'suus, -a, -um', senso: 'proprio (del soggetto)', forma: 'dativo, con «fīliō»' },
      'fēcit': { lemma: 'facere', senso: 'fece', forma: 'perfetto' },
      'Puerum': { lemma: 'puer, puerī', senso: 'il ragazzo', forma: 'accusativo, oggetto' },
      'monuit': { lemma: 'monēre', senso: 'avvertì', forma: 'perfetto' },
      'sōlem': { lemma: 'sōl, sōlis', senso: 'il sole', forma: 'accusativo, oggetto di «petere»' },
      'petere': { lemma: 'petere', senso: 'dirigersi verso, cercare', forma: 'infinito' },
      'perīculōsum': { lemma: 'perīculōsus, -a, -um', senso: 'pericoloso', forma: 'accusativo neutro, con «esse»' },
      'esse': { lemma: 'esse', senso: 'essere', forma: 'infinito del discorso indiretto' },
      'Sed': { lemma: 'sed', senso: 'ma' },
      'laetus': { lemma: 'laetus, -a, -um', senso: 'contento', forma: 'nominativo, riferito a Icaro' },
      'patrem': { lemma: 'pater, patris', senso: 'il padre', forma: 'accusativo, oggetto' },
      'audīvit': { lemma: 'audīre', senso: 'ascoltò', forma: 'perfetto' },
      'ad': { lemma: 'ad', senso: 'verso', forma: 'con l’accusativo' },
      'volāvit': { lemma: 'volāre', senso: 'volò', forma: 'perfetto' },
      'Sōl': { lemma: 'sōl, sōlis', senso: 'il sole', forma: 'nominativo, soggetto' },
      'cēram': { lemma: 'cēra, -ae', senso: 'la cera', forma: 'accusativo, oggetto' },
      'ālārum': { lemma: 'āla, -ae', senso: 'delle ali', forma: 'genitivo plurale' },
      'solvit': { lemma: 'solvere', senso: 'sciolse', forma: 'perfetto' },
      'puer': { lemma: 'puer, puerī', senso: 'il ragazzo', forma: 'nominativo, soggetto' },
      'mare': { lemma: 'mare, maris', senso: 'il mare', forma: 'accusativo: ci finisce dentro' },
      'cecidit': { lemma: 'cadere', senso: 'cadde', forma: 'perfetto' },
      'Pater': { lemma: 'pater, patris', senso: 'il padre', forma: 'nominativo, soggetto' },
      'āmissō': { lemma: 'āmittere', senso: 'perduto', forma: 'participio perfetto: ablativo assoluto' },
      'terram': { lemma: 'terra, -ae', senso: 'la terraferma', forma: 'accusativo, oggetto' },
      'petīvit': { lemma: 'petere', senso: 'raggiunse', forma: 'perfetto' },
      'diū': { lemma: 'diū', senso: 'a lungo' },
      'flēvit': { lemma: 'flēre', senso: 'pianse', forma: 'perfetto' },
    },
  },

  // ───────────────────────────── 1 ─────────────────────────────
  {
    id: 'romulus',
    titolo: 'Rōmulus et Remus',
    fonte: 'la leggenda della fondazione, adattata',
    icona: '🐺',
    unlock: 83,
    livello: 'media',
    intro:
      'La storia che ogni romano conosceva a memoria. Il brano è al passato, ' +
      'come tutti i racconti: troverai imperfetti e perfetti. Attento ai ' +
      'soggetti sottintesi — spesso la frase non lo ripete, e devi tenerlo a ' +
      'mente dalla riga prima.',
    costrutti: ['imperfetto e perfetto', 'soggetto sottinteso', 'ablativo di mezzo'],
    frasi: [
      {
        lat: 'Rōmulus et Remus frātrēs erant.',
        ita: 'Romolo e Remo erano fratelli.',
      },
      {
        lat: 'Puerī in silvā habitābant, quod rēx eōs necāre volēbat.',
        ita: 'I bambini vivevano nel bosco, perché il re voleva ucciderli.',
        nota: '«quod» qui è la congiunzione «perché», non il pronome relativo neutro. Lo capisci perché non c’è nessun antecedente a cui riferirlo.',
      },
      {
        lat: 'Lupa eōs cūrābat et servābat.',
        ita: 'Una lupa li accudiva e li salvava.',
        nota: 'Un solo «eōs» vale per tutti e due i verbi: il latino non lo ripete.',
      },
      {
        lat: 'Posteā, cum virī factī essent, novam urbem condere cōnstituērunt.',
        ita: 'Poi, quando furono diventati uomini, decisero di fondare una nuova città.',
        nota: '«cum» + congiuntivo: è il cum narrativo, non «con». E «factī essent» è il piuccheperfetto congiuntivo di «fīō»: erano diventati.',
      },
      {
        lat: 'Sed frātrēs dē locō urbis nōn cōnsentiēbant.',
        ita: 'Ma i fratelli non erano d’accordo sul luogo della città.',
      },
      {
        lat: 'Ita Rōmulus frātrem suum occīdit et sōlus rēgnāvit.',
        ita: 'Così Romolo uccise il proprio fratello e regnò da solo.',
        nota: '«suum», non «eius»: il fratello è di Romolo stesso, che è il soggetto.',
      },
      {
        lat: 'Urbs, ā nōmine eius, Rōma appellāta est.',
        ita: 'La città, dal suo nome, fu chiamata Roma.',
        nota: '«appellāta est» è un perfetto passivo: «fu chiamata», non «è chiamata». E «eius» — non «suum» — perché il nome è di Romolo ma il soggetto della frase è «urbs».',
      },
    ],
    parole: {
      'Rōmulus': { lemma: 'Rōmulus, -ī', senso: 'Romolo' },
      'Remus': { lemma: 'Remus, -ī', senso: 'Remo' },
      'et': { lemma: 'et', senso: 'e' },
      'frātrēs': { lemma: 'frāter, frātris', senso: 'fratelli', forma: 'nominativo plurale' },
      'erant': { lemma: 'esse', senso: 'erano', forma: 'imperfetto, 3ª plurale' },
      'Puerī': { lemma: 'puer, puerī', senso: 'i bambini', forma: 'nominativo plurale, soggetto' },
      'in': { lemma: 'in', senso: 'in, dentro', forma: 'con l’ablativo: stato in luogo' },
      'silvā': { lemma: 'silva, -ae', senso: 'bosco', forma: 'ablativo: dove' },
      'habitābant': { lemma: 'habitāre', senso: 'abitavano', forma: 'imperfetto, 3ª plurale' },
      'quod': { lemma: 'quod', senso: 'perché', forma: 'congiunzione causale' },
      'rēx': { lemma: 'rēx, rēgis', senso: 'il re', forma: 'nominativo, soggetto' },
      'eōs': { lemma: 'is, ea, id', senso: 'loro, li', forma: 'accusativo plurale' },
      'necāre': { lemma: 'necāre', senso: 'uccidere', forma: 'infinito, retto da «volēbat»' },
      'volēbat': { lemma: 'velle', senso: 'voleva', forma: 'imperfetto, 3ª singolare' },
      'cūrābat': { lemma: 'cūrāre', senso: 'si prendeva cura di', forma: 'imperfetto' },
      'Lupa': { lemma: 'lupa, -ae', senso: 'una lupa', forma: 'nominativo, soggetto' },
      'servābat': { lemma: 'servāre', senso: 'salvava, proteggeva', forma: 'imperfetto' },
      'Posteā': { lemma: 'posteā', senso: 'poi, in seguito' },
      'cum': { lemma: 'cum', senso: 'quando, dopo che', forma: 'con il congiuntivo: cum narrativo' },
      'virī': { lemma: 'vir, virī', senso: 'uomini', forma: 'nominativo plurale' },
      'factī': { lemma: 'fīō, fierī', senso: 'diventati', forma: 'participio perfetto, con «essent»' },
      'essent': { lemma: 'esse', senso: '(erano)', forma: 'congiuntivo, forma il piuccheperfetto' },
      'novam': { lemma: 'novus, -a, -um', senso: 'nuova', forma: 'accusativo, concorda con «urbem»' },
      'urbem': { lemma: 'urbs, urbis', senso: 'città', forma: 'accusativo, oggetto' },
      'condere': { lemma: 'condere', senso: 'fondare', forma: 'infinito, retto da «cōnstituērunt»' },
      'cōnstituērunt': { lemma: 'cōnstituere', senso: 'decisero', forma: 'perfetto, 3ª plurale' },
      'Sed': { lemma: 'sed', senso: 'ma' },
      'dē': { lemma: 'dē', senso: 'riguardo a', forma: 'con l’ablativo' },
      'locō': { lemma: 'locus, locī', senso: 'luogo', forma: 'ablativo' },
      'urbis': { lemma: 'urbs, urbis', senso: 'della città', forma: 'genitivo' },
      'nōn': { lemma: 'nōn', senso: 'non' },
      'cōnsentiēbant': { lemma: 'cōnsentīre', senso: 'erano d’accordo', forma: 'imperfetto, 3ª plurale' },
      'Ita': { lemma: 'ita', senso: 'così' },
      'frātrem': { lemma: 'frāter, frātris', senso: 'il fratello', forma: 'accusativo, oggetto' },
      'suum': { lemma: 'suus, -a, -um', senso: 'proprio (del soggetto)', forma: 'accusativo, concorda con «frātrem»' },
      'occīdit': { lemma: 'occīdere', senso: 'uccise', forma: 'perfetto, 3ª singolare' },
      'sōlus': { lemma: 'sōlus, -a, -um', senso: 'da solo', forma: 'nominativo, riferito al soggetto' },
      'rēgnāvit': { lemma: 'rēgnāre', senso: 'regnò', forma: 'perfetto, 3ª singolare' },
      'Urbs': { lemma: 'urbs, urbis', senso: 'la città', forma: 'nominativo, soggetto' },
      'ā': { lemma: 'ā, ab', senso: 'da', forma: 'con l’ablativo' },
      'nōmine': { lemma: 'nōmen, nōminis', senso: 'nome', forma: 'ablativo' },
      'eius': { lemma: 'is, ea, id', senso: 'di lui', forma: 'genitivo — di un altro, non del soggetto' },
      'Rōma': { lemma: 'Rōma, -ae', senso: 'Roma', forma: 'nominativo: il nome che le viene dato' },
      'appellāta': { lemma: 'appellāre', senso: 'chiamata', forma: 'participio perfetto, con «est»' },
      'est': { lemma: 'esse', senso: '(fu)', forma: 'forma il perfetto passivo' },
    },
  },

  // ───────────────────────────── 2 ─────────────────────────────
  {
    id: 'gallia',
    titolo: 'Caesar in Galliam contendit',
    fonte: 'ispirata al De bello Gallico',
    icona: '⚔️',
    unlock: 90,
    livello: 'media',
    intro:
      'Il registro di Cesare: frasi asciutte, molti ablativi assoluti, e ' +
      'discorsi riferiti invece che citati. Cesare parla di sé in terza ' +
      'persona — quindi «Caesar» è il soggetto anche quando la frase sembra ' +
      'parlare d’altri.',
    costrutti: ['ablativo assoluto', 'accusativo + infinito', 'cum narrativo', 'passivo'],
    frasi: [
      {
        lat: 'Caesar, cum in Galliā esset, dē adventū hostium certior factus est.',
        ita: 'Cesare, mentre era in Gallia, fu informato dell’arrivo dei nemici.',
        nota: '«certior factus est» è un’espressione fissa: alla lettera «fu fatto più certo», cioè «fu informato». Il latino ne è pieno.',
      },
      {
        lat: 'Statim lēgātōs mīsit, ut cōpiās convocārent.',
        ita: 'Subito mandò i luogotenenti, perché radunassero le truppe.',
        nota: '«ut» + congiuntivo dopo un verbo di movimento: è una finale. In italiano «perché radunassero», o anche «a radunare».',
      },
      {
        lat: 'Nūntius dīxit hostēs iam flūmen trānsīsse.',
        ita: 'Un messaggero disse che i nemici avevano già attraversato il fiume.',
        nota: 'Accusativo + infinito: «hostēs» è il soggetto di «trānsīsse», non l’oggetto di «dīxit». E l’infinito perfetto dice che l’azione era già avvenuta.',
      },
      {
        lat: 'Hīs rēbus cognitīs, Caesar castra mūnīre cōnstituit.',
        ita: 'Sapute queste cose, Cesare decise di fortificare l’accampamento.',
        nota: 'Ablativo assoluto: due parole in ablativo, staccate dal resto. «castra» è un accampamento solo, non «gli accampamenti».',
      },
      {
        lat: 'Mīlitēs, quī fortissimī erant, tōtam noctem labōrāvērunt.',
        ita: 'I soldati, che erano fortissimi, lavorarono tutta la notte.',
        nota: '«quī» è relativo: prende genere e numero da «mīlitēs», ma è nominativo perché nella sua frase fa il soggetto.',
      },
      {
        lat: 'Prīmā lūce hostēs impetum fēcērunt, sed ā Rōmānīs repulsī sunt.',
        ita: 'All’alba i nemici attaccarono, ma furono respinti dai Romani.',
        nota: '«prīmā lūce» è un ablativo di tempo senza preposizione. «repulsī sunt» è passivo: c’è l’agente «ā Rōmānīs».',
      },
      {
        lat: 'Caesar, victōriā partā, mīlitēs suōs laudāvit.',
        ita: 'Ottenuta la vittoria, Cesare lodò i propri soldati.',
        nota: 'Altro ablativo assoluto, e «suōs» perché i soldati sono di Cesare, il soggetto.',
      },
    ],
    parole: {
      'Caesar': { lemma: 'Caesar, Caesaris', senso: 'Cesare', forma: 'nominativo, soggetto' },
      'cum': { lemma: 'cum', senso: 'mentre', forma: 'con il congiuntivo: cum narrativo' },
      'in': { lemma: 'in', senso: 'in', forma: 'con l’ablativo: stato in luogo' },
      'Galliā': { lemma: 'Gallia, -ae', senso: 'Gallia', forma: 'ablativo' },
      'esset': { lemma: 'esse', senso: 'era', forma: 'imperfetto congiuntivo' },
      'dē': { lemma: 'dē', senso: 'riguardo a, di', forma: 'con l’ablativo' },
      'adventū': { lemma: 'adventus, -ūs', senso: 'arrivo', forma: 'ablativo, 4ª declinazione' },
      'hostium': { lemma: 'hostis, hostis', senso: 'dei nemici', forma: 'genitivo plurale' },
      'certior': { lemma: 'certus, -a, -um', senso: 'più certo', forma: 'comparativo — con «factus est»: informato' },
      'factus': { lemma: 'fīō, fierī', senso: 'fatto, reso', forma: 'participio perfetto' },
      'est': { lemma: 'esse', senso: '(fu)', forma: 'forma il perfetto passivo' },
      'Statim': { lemma: 'statim', senso: 'subito' },
      'lēgātōs': { lemma: 'lēgātus, -ī', senso: 'i luogotenenti', forma: 'accusativo plurale, oggetto' },
      'mīsit': { lemma: 'mittere', senso: 'mandò', forma: 'perfetto, 3ª singolare' },
      'ut': { lemma: 'ut', senso: 'perché, affinché', forma: 'con il congiuntivo: finale' },
      'cōpiās': { lemma: 'cōpiae, -ārum', senso: 'le truppe', forma: 'accusativo plurale' },
      'convocārent': { lemma: 'convocāre', senso: 'radunassero', forma: 'imperfetto congiuntivo' },
      'Nūntius': { lemma: 'nūntius, -ī', senso: 'messaggero', forma: 'nominativo, soggetto' },
      'dīxit': { lemma: 'dīcere', senso: 'disse', forma: 'perfetto, 3ª singolare' },
      'hostēs': { lemma: 'hostis, hostis', senso: 'i nemici', forma: 'accusativo: soggetto dell’infinito' },
      'iam': { lemma: 'iam', senso: 'già' },
      'flūmen': { lemma: 'flūmen, flūminis', senso: 'il fiume', forma: 'accusativo, oggetto' },
      'trānsīsse': { lemma: 'trānsīre', senso: 'aver attraversato', forma: 'infinito perfetto: azione anteriore' },
      'Hīs': { lemma: 'hic, haec, hoc', senso: 'queste', forma: 'ablativo plurale' },
      'rēbus': { lemma: 'rēs, reī', senso: 'cose, fatti', forma: 'ablativo plurale' },
      'cognitīs': { lemma: 'cognōscere', senso: 'venute a sapere', forma: 'participio perfetto: ablativo assoluto' },
      'castra': { lemma: 'castra, -ōrum', senso: 'l’accampamento', forma: 'accusativo, oggetto' },
      'mūnīre': { lemma: 'mūnīre', senso: 'fortificare', forma: 'infinito' },
      'cōnstituit': { lemma: 'cōnstituere', senso: 'decise', forma: 'perfetto' },
      'Mīlitēs': { lemma: 'mīles, mīlitis', senso: 'i soldati', forma: 'nominativo plurale, soggetto' },
      'quī': { lemma: 'quī, quae, quod', senso: 'che, i quali', forma: 'nominativo plurale: soggetto della relativa' },
      'fortissimī': { lemma: 'fortis, forte', senso: 'fortissimi', forma: 'superlativo, nominativo plurale' },
      'erant': { lemma: 'esse', senso: 'erano', forma: 'imperfetto' },
      'tōtam': { lemma: 'tōtus, -a, -um', senso: 'tutta', forma: 'accusativo, concorda con «noctem»' },
      'noctem': { lemma: 'nox, noctis', senso: 'notte', forma: 'accusativo di tempo continuato' },
      'labōrāvērunt': { lemma: 'labōrāre', senso: 'lavorarono', forma: 'perfetto, 3ª plurale' },
      'Prīmā': { lemma: 'prīmus, -a, -um', senso: 'prima', forma: 'ablativo, con «lūce»' },
      'lūce': { lemma: 'lūx, lūcis', senso: 'luce', forma: 'ablativo di tempo: all’alba' },
      'impetum': { lemma: 'impetus, -ūs', senso: 'assalto', forma: 'accusativo, 4ª declinazione' },
      'fēcērunt': { lemma: 'facere', senso: 'fecero', forma: 'perfetto, 3ª plurale' },
      'sed': { lemma: 'sed', senso: 'ma' },
      'ā': { lemma: 'ā, ab', senso: 'da', forma: 'con l’ablativo: complemento d’agente' },
      'Rōmānīs': { lemma: 'Rōmānus, -ī', senso: 'dai Romani', forma: 'ablativo plurale' },
      'repulsī': { lemma: 'repellere', senso: 'respinti', forma: 'participio perfetto' },
      'sunt': { lemma: 'esse', senso: '(furono)', forma: 'forma il perfetto passivo' },
      'victōriā': { lemma: 'victōria, -ae', senso: 'vittoria', forma: 'ablativo: ablativo assoluto' },
      'partā': { lemma: 'parere', senso: 'ottenuta', forma: 'participio perfetto, con «victōriā»' },
      'mīlitēs': { lemma: 'mīles, mīlitis', senso: 'i soldati', forma: 'accusativo plurale, oggetto' },
      'suōs': { lemma: 'suus, -a, -um', senso: 'propri (di Cesare)', forma: 'accusativo plurale' },
      'laudāvit': { lemma: 'laudāre', senso: 'lodò', forma: 'perfetto' },
    },
  },

  // ───────────────────────────── cicero ─────────────────────────────
  {
    id: 'cicero',
    titolo: 'Cicerō contrā Catilīnam',
    fonte: 'ispirata alle Catilinarie',
    icona: '🏛️',
    unlock: 109,
    livello: 'impegnativa',
    intro:
      'Il registro dell’oratoria, che è un’altra cosa dal racconto: periodi ' +
      'lunghi, subordinate incastrate, e la domanda retorica — che non aspetta ' +
      'risposta ma accusa. C’è anche un deponente. Trova prima il verbo ' +
      'principale di ogni periodo, e il resto viene dietro.',
    costrutti: ['subordinate incastrate', 'domanda retorica', 'deponenti', 'discorso indiretto'],
    frasi: [
      {
        lat: 'Catilīna, vir nōbilis sed audāx, cōnsilium contrā rem pūblicam cēperat.',
        ita: 'Catilina, uomo illustre ma audace, aveva ordito un piano contro lo Stato.',
        nota: '«cōnsilium capere» = prendere una decisione, fare un piano. E «rēs pūblica» è lo Stato, non «la cosa pubblica».',
      },
      {
        lat: 'Cicerō, cum haec cognōvisset, in senātū ōrātiōnem habuit.',
        ita: 'Cicerone, dopo che ebbe saputo queste cose, tenne un discorso in senato.',
        nota: '«ōrātiōnem habēre» = tenere un discorso: un’altra coppia verbo + nome da riconoscere in blocco.',
      },
      {
        lat: 'Quam diū, Catilīna, patientiā nostrā abūtēris?',
        ita: 'Fino a quando, Catilina, abuserai della nostra pazienza?',
        nota: '«abūtēris» è un deponente: forma passiva, senso attivo. E regge l’ablativo, come «ūtor».',
      },
      {
        lat: 'Senātōrēs, quī omnia audīverant, tacēbant.',
        ita: 'I senatori, che avevano sentito tutto, tacevano.',
      },
      {
        lat: 'Cicerō dīxit coniūrātōs parātōs esse ut urbem incenderent.',
        ita: 'Cicerone disse che i congiurati erano pronti a incendiare la città.',
        nota: 'Due costrutti insieme: accusativo + infinito («coniūrātōs… esse») e dentro una finale («ut… incenderent»).',
      },
      {
        lat: 'Catilīna, cum omnēs sē accūsāre vidēret, ex urbe discessit.',
        ita: 'Catilina, vedendo che tutti lo accusavano, se ne andò dalla città.',
        nota: '«sē» è l’oggetto di «accūsāre» e rimanda a Catilina, il soggetto della principale.',
      },
      {
        lat: 'Ita rēs pūblica servāta est, et Cicerō pater patriae appellātus est.',
        ita: 'Così lo Stato fu salvato, e Cicerone fu chiamato padre della patria.',
        nota: 'Due passivi al perfetto: participio + «est», e vogliono il passato — «fu salvato», non «è salvato».',
      },
    ],
    parole: {
      'Catilīna': { lemma: 'Catilīna, -ae (m.)', senso: 'Catilina', forma: 'nominativo, soggetto' },
      'vir': { lemma: 'vir, virī', senso: 'uomo', forma: 'nominativo, apposizione' },
      'nōbilis': { lemma: 'nōbilis, nōbile', senso: 'illustre, di famiglia nota', forma: 'nominativo' },
      'sed': { lemma: 'sed', senso: 'ma' },
      'audāx': { lemma: 'audāx, audācis', senso: 'audace, temerario', forma: 'nominativo' },
      'cōnsilium': { lemma: 'cōnsilium, -ī', senso: 'piano, decisione', forma: 'accusativo, oggetto' },
      'contrā': { lemma: 'contrā', senso: 'contro', forma: 'con l’accusativo' },
      'rem': { lemma: 'rēs, reī', senso: 'cosa', forma: 'accusativo — con «pūblicam»: lo Stato' },
      'pūblicam': { lemma: 'pūblicus, -a, -um', senso: 'pubblica', forma: 'accusativo, con «rem»' },
      'cēperat': { lemma: 'capere', senso: 'aveva preso, aveva ordito', forma: 'piuccheperfetto' },
      'Cicerō': { lemma: 'Cicerō, Cicerōnis', senso: 'Cicerone', forma: 'nominativo, soggetto' },
      'cum': { lemma: 'cum', senso: 'dopo che', forma: 'con il congiuntivo: cum narrativo' },
      'haec': { lemma: 'hic, haec, hoc', senso: 'queste cose', forma: 'accusativo neutro plurale' },
      'cognōvisset': { lemma: 'cognōscere', senso: 'ebbe saputo', forma: 'piuccheperfetto congiuntivo' },
      'in': { lemma: 'in', senso: 'in', forma: 'con l’ablativo' },
      'senātū': { lemma: 'senātus, -ūs', senso: 'senato', forma: 'ablativo, 4ª declinazione' },
      'ōrātiōnem': { lemma: 'ōrātiō, ōrātiōnis', senso: 'discorso', forma: 'accusativo, oggetto' },
      'habuit': { lemma: 'habēre', senso: 'tenne', forma: 'perfetto' },
      'Quam': { lemma: 'quam', senso: 'quanto', forma: 'con «diū»: fino a quando' },
      'diū': { lemma: 'diū', senso: 'a lungo' },
      'patientiā': { lemma: 'patientia, -ae', senso: 'pazienza', forma: 'ablativo, retto da «abūtēris»' },
      'nostrā': { lemma: 'noster, -tra, -trum', senso: 'nostra', forma: 'ablativo' },
      'abūtēris': { lemma: 'abūtor, abūtī', senso: 'abuserai', forma: 'deponente, futuro: forma passiva, senso attivo' },
      'Senātōrēs': { lemma: 'senātor, -ōris', senso: 'i senatori', forma: 'nominativo plurale, soggetto' },
      'quī': { lemma: 'quī, quae, quod', senso: 'che, i quali', forma: 'nominativo plurale: soggetto della relativa' },
      'omnia': { lemma: 'omnis, omne', senso: 'tutto, ogni cosa', forma: 'accusativo neutro plurale' },
      'audīverant': { lemma: 'audīre', senso: 'avevano sentito', forma: 'piuccheperfetto' },
      'tacēbant': { lemma: 'tacēre', senso: 'tacevano', forma: 'imperfetto' },
      'dīxit': { lemma: 'dīcere', senso: 'disse', forma: 'perfetto' },
      'coniūrātōs': { lemma: 'coniūrātus, -ī', senso: 'i congiurati', forma: 'accusativo: soggetto dell’infinito' },
      'parātōs': { lemma: 'parātus, -a, -um', senso: 'pronti', forma: 'accusativo, con «coniūrātōs»' },
      'esse': { lemma: 'esse', senso: 'essere', forma: 'infinito del discorso indiretto' },
      'ut': { lemma: 'ut', senso: 'per, ad', forma: 'con il congiuntivo: finale' },
      'urbem': { lemma: 'urbs, urbis', senso: 'la città', forma: 'accusativo, oggetto' },
      'incenderent': { lemma: 'incendere', senso: 'incendiassero', forma: 'imperfetto congiuntivo' },
      'omnēs': { lemma: 'omnis, omne', senso: 'tutti', forma: 'nominativo plurale: soggetto di «accūsāre»' },
      'sē': { lemma: 'sē', senso: 'lui (Catilina)', forma: 'accusativo del riflessivo, oggetto di «accūsāre»' },
      'accūsāre': { lemma: 'accūsāre', senso: 'accusare', forma: 'infinito' },
      'vidēret': { lemma: 'vidēre', senso: 'vedeva', forma: 'imperfetto congiuntivo' },
      'ex': { lemma: 'ex, ē', senso: 'da, fuori da', forma: 'con l’ablativo' },
      'urbe': { lemma: 'urbs, urbis', senso: 'la città', forma: 'ablativo' },
      'discessit': { lemma: 'discēdere', senso: 'se ne andò', forma: 'perfetto' },
      'Ita': { lemma: 'ita', senso: 'così' },
      'rēs': { lemma: 'rēs, reī', senso: 'cosa', forma: 'nominativo — con «pūblica»: lo Stato' },
      'pūblica': { lemma: 'pūblicus, -a, -um', senso: 'pubblica', forma: 'nominativo, con «rēs»' },
      'servāta': { lemma: 'servāre', senso: 'salvata', forma: 'participio perfetto, con «est»' },
      'est': { lemma: 'esse', senso: '(fu)', forma: 'con il participio forma il perfetto passivo' },
      'et': { lemma: 'et', senso: 'e' },
      'pater': { lemma: 'pater, patris', senso: 'padre', forma: 'nominativo, predicativo' },
      'patriae': { lemma: 'patria, -ae', senso: 'della patria', forma: 'genitivo' },
      'appellātus': { lemma: 'appellāre', senso: 'chiamato', forma: 'participio perfetto, con «est»' },
    },
  },

  // ───────────────────────────── 3 ─────────────────────────────
  {
    id: 'hannibal',
    titolo: 'Hannibal ad portās',
    fonte: 'ispirata a Livio ed Eutropio',
    icona: '🐘',
    unlock: 109,
    livello: 'impegnativa',
    intro:
      'La più difficile delle tre: periodi più lunghi, subordinate dentro ' +
      'altre subordinate, e un deponente. Prendi le frasi un pezzo alla ' +
      'volta — trova prima il verbo principale, poi aggancia il resto.',
    costrutti: ['subordinate incastrate', 'deponenti', 'consecutiva', 'discorso indiretto'],
    frasi: [
      {
        lat: 'Hannibal, dux Poenōrum, tantā virtūte erat ut Rōmānī eum valdē timērent.',
        ita: 'Annibale, comandante dei Cartaginesi, era di tanto valore che i Romani lo temevano molto.',
        nota: 'Consecutiva: la spia è «tantā». E «virtūs» qui è il valore militare, non la virtù morale.',
      },
      {
        lat: 'Cum Alpēs trānsiisset, in Italiam pervēnit et multās urbēs cēpit.',
        ita: 'Dopo che ebbe attraversato le Alpi, giunse in Italia e prese molte città.',
        nota: 'Il soggetto («Hannibal») non è ripetuto: resta quello della frase prima. Succede in continuazione.',
      },
      {
        lat: 'Rōmānī, hīs rēbus perterritī, novum imperātōrem creāre cōnstituērunt.',
        ita: 'I Romani, spaventati da queste cose, decisero di nominare un nuovo comandante.',
        nota: '«hīs rēbus» è ablativo di causa: «da queste cose». Non c’è «ab» perché non sono persone.',
      },
      {
        lat: 'Fabius, quī cōnsul creātus erat, cum hoste pugnāre nōlēbat.',
        ita: 'Fabio, che era stato nominato console, non voleva combattere con il nemico.',
        nota: 'Qui «cum» è la preposizione «con»: lo capisci perché regge «hoste», un ablativo, e non un verbo.',
      },
      {
        lat: 'Cīvēs eum accūsābant, sed ille respondit sē patriam servāre velle.',
        ita: 'I cittadini lo accusavano, ma quello rispose che voleva salvare la patria.',
        nota: 'Accusativo + infinito con «sē»: il soggetto dell’infinito è lo stesso di «respondit», cioè Fabio. In italiano diventa «di voler salvare».',
      },
      {
        lat: 'Tandem, multīs post annīs, Scīpiō in Āfricam profectus est.',
        ita: 'Finalmente, molti anni dopo, Scipione partì per l’Africa.',
        nota: '«profectus est» è un deponente: forma passiva, senso attivo. Non «fu partito» ma «partì».',
      },
      {
        lat: 'Ibi Hannibalem vīcit, et bellum, quod tam diū gestum erat, fīnem habuit.',
        ita: 'Lì sconfisse Annibale, e la guerra, che era stata combattuta così a lungo, ebbe fine.',
        nota: '«gestum erat» è un piuccheperfetto passivo: «era stata combattuta». «bellum gerere» = fare la guerra.',
      },
    ],
    parole: {
      'Hannibal': { lemma: 'Hannibal, -alis', senso: 'Annibale', forma: 'nominativo, soggetto' },
      'dux': { lemma: 'dux, ducis', senso: 'comandante', forma: 'nominativo, apposizione' },
      'Poenōrum': { lemma: 'Poenī, -ōrum', senso: 'dei Cartaginesi', forma: 'genitivo plurale' },
      'tantā': { lemma: 'tantus, -a, -um', senso: 'così grande', forma: 'ablativo — annuncia la consecutiva' },
      'virtūte': { lemma: 'virtūs, virtūtis', senso: 'valore, coraggio', forma: 'ablativo di qualità' },
      'erat': { lemma: 'esse', senso: 'era', forma: 'imperfetto — accanto a un participio forma il piuccheperfetto passivo' },
      'ut': { lemma: 'ut', senso: 'che', forma: 'con il congiuntivo: consecutiva' },
      'Rōmānī': { lemma: 'Rōmānus, -ī', senso: 'i Romani', forma: 'nominativo plurale' },
      'eum': { lemma: 'is, ea, id', senso: 'lui, lo', forma: 'accusativo' },
      'valdē': { lemma: 'valdē', senso: 'molto' },
      'timērent': { lemma: 'timēre', senso: 'temessero', forma: 'imperfetto congiuntivo' },
      'Cum': { lemma: 'cum', senso: 'dopo che', forma: 'con il congiuntivo: cum narrativo' },
      'Alpēs': { lemma: 'Alpēs, -ium', senso: 'le Alpi', forma: 'accusativo plurale' },
      'trānsiisset': { lemma: 'trānsīre', senso: 'ebbe attraversato', forma: 'piuccheperfetto congiuntivo' },
      'in': { lemma: 'in', senso: 'in, verso', forma: 'con l’accusativo: moto a luogo' },
      'Italiam': { lemma: 'Italia, -ae', senso: 'Italia', forma: 'accusativo' },
      'pervēnit': { lemma: 'pervenīre', senso: 'giunse', forma: 'perfetto' },
      'et': { lemma: 'et', senso: 'e' },
      'multās': { lemma: 'multus, -a, -um', senso: 'molte', forma: 'accusativo plurale' },
      'urbēs': { lemma: 'urbs, urbis', senso: 'città', forma: 'accusativo plurale, oggetto' },
      'cēpit': { lemma: 'capere', senso: 'prese', forma: 'perfetto' },
      'hīs': { lemma: 'hic, haec, hoc', senso: 'queste', forma: 'ablativo plurale' },
      'rēbus': { lemma: 'rēs, reī', senso: 'cose, fatti', forma: 'ablativo: da che cosa' },
      'perterritī': { lemma: 'perterrēre', senso: 'spaventati', forma: 'participio perfetto, riferito ai Romani' },
      'novum': { lemma: 'novus, -a, -um', senso: 'nuovo', forma: 'accusativo' },
      'imperātōrem': { lemma: 'imperātor, -ōris', senso: 'comandante', forma: 'accusativo, oggetto' },
      'creāre': { lemma: 'creāre', senso: 'nominare, eleggere', forma: 'infinito' },
      'cōnstituērunt': { lemma: 'cōnstituere', senso: 'decisero', forma: 'perfetto, 3ª plurale' },
      'Fabius': { lemma: 'Fabius, -ī', senso: 'Fabio', forma: 'nominativo, soggetto' },
      'quī': { lemma: 'quī, quae, quod', senso: 'che, il quale', forma: 'nominativo: soggetto della relativa' },
      'cōnsul': { lemma: 'cōnsul, cōnsulis', senso: 'console', forma: 'nominativo' },
      'creātus': { lemma: 'creāre', senso: 'nominato', forma: 'participio perfetto' },
      'cum': { lemma: 'cum', senso: 'con', forma: 'con l’ablativo: qui è la preposizione' },
      'hoste': { lemma: 'hostis, hostis', senso: 'il nemico', forma: 'ablativo' },
      'pugnāre': { lemma: 'pugnāre', senso: 'combattere', forma: 'infinito' },
      'nōlēbat': { lemma: 'nōlle', senso: 'non voleva', forma: 'imperfetto' },
      'Cīvēs': { lemma: 'cīvis, cīvis', senso: 'i cittadini', forma: 'nominativo plurale' },
      'accūsābant': { lemma: 'accūsāre', senso: 'accusavano', forma: 'imperfetto' },
      'sed': { lemma: 'sed', senso: 'ma' },
      'ille': { lemma: 'ille, illa, illud', senso: 'quello, egli', forma: 'nominativo' },
      'respondit': { lemma: 'respondēre', senso: 'rispose', forma: 'perfetto' },
      'sē': { lemma: 'sē', senso: 'sé, lui stesso', forma: 'accusativo: soggetto dell’infinito' },
      'patriam': { lemma: 'patria, -ae', senso: 'la patria', forma: 'accusativo, oggetto' },
      'servāre': { lemma: 'servāre', senso: 'salvare', forma: 'infinito' },
      'velle': { lemma: 'velle', senso: 'volere', forma: 'infinito, retto da «respondit»' },
      'Tandem': { lemma: 'tandem', senso: 'finalmente' },
      'multīs': { lemma: 'multus, -a, -um', senso: 'molti', forma: 'ablativo plurale' },
      'post': { lemma: 'post', senso: 'dopo' },
      'annīs': { lemma: 'annus, -ī', senso: 'anni', forma: 'ablativo: molti anni dopo' },
      'Scīpiō': { lemma: 'Scīpiō, -ōnis', senso: 'Scipione', forma: 'nominativo, soggetto' },
      'Āfricam': { lemma: 'Āfrica, -ae', senso: 'Africa', forma: 'accusativo: moto a luogo' },
      'profectus': { lemma: 'proficīscor, proficīscī', senso: 'partito', forma: 'participio di un deponente: senso attivo' },
      'est': { lemma: 'esse', senso: '(è)', forma: 'con il participio forma il perfetto' },
      'Ibi': { lemma: 'ibi', senso: 'lì' },
      'Hannibalem': { lemma: 'Hannibal, -alis', senso: 'Annibale', forma: 'accusativo, oggetto' },
      'vīcit': { lemma: 'vincere', senso: 'vinse, sconfisse', forma: 'perfetto' },
      'bellum': { lemma: 'bellum, -ī', senso: 'la guerra', forma: 'nominativo, soggetto' },
      'quod': { lemma: 'quī, quae, quod', senso: 'che', forma: 'nominativo neutro: relativo' },
      'tam': { lemma: 'tam', senso: 'così, tanto' },
      'diū': { lemma: 'diū', senso: 'a lungo' },
      'gestum': { lemma: 'gerere', senso: 'combattuta', forma: 'participio perfetto — «bellum gerere» = fare la guerra' },
      'fīnem': { lemma: 'fīnis, fīnis', senso: 'fine', forma: 'accusativo, oggetto' },
      'habuit': { lemma: 'habēre', senso: 'ebbe', forma: 'perfetto' },
    },
  },
]
