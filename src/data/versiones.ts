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
  // ───────────────────────────── 1 ─────────────────────────────
  {
    id: 'romulus',
    titolo: 'Rōmulus et Remus',
    fonte: 'la leggenda della fondazione, adattata',
    icona: '🐺',
    unlock: 30,
    livello: 'facile',
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
    unlock: 55,
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

  // ───────────────────────────── 3 ─────────────────────────────
  {
    id: 'hannibal',
    titolo: 'Hannibal ad portās',
    fonte: 'ispirata a Livio ed Eutropio',
    icona: '🐘',
    unlock: 80,
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
