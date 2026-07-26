# 🏛️ Ianua — impara il latino da zero

**Ianua** (in latino «porta, ingresso») è un'app di apprendimento **gamificata**
per imparare il **latino** partendo da zero, pensata per chi non ha mai studiato
la lingua. Interfaccia in italiano.

## Cosa fa

- **Percorso a lezioni** organizzato in unità, con progressione a tappe.
- **Esercizi interattivi** di più tipi:
  - carte didattiche che spiegano i concetti;
  - tabelle di grammatica (es. le declinazioni);
  - scelta multipla (anche per l'analisi: «che caso è questa parola?»);
  - costruzione della frase toccando le parole;
  - abbinamento parola ↔ significato;
  - **analisi grammaticale**: una parola dentro una frase, e si dice che cos'è —
    caso, numero, tempo, funzione — rispondendo a tutte le domande insieme.
    È l'esercizio che somiglia di più a quello che si fa all'esame, e l'unico
    in cui la domanda non è «che cosa vuol dire» ma «come è fatta». La
    traduzione della frase resta nascosta finché non hai risposto: se si
    vedesse prima, l'analisi si indovinerebbe dall'italiano invece che dalla
    forma. Dopo, arriva insieme alla spiegazione del punto in gioco.
- **Gamification a tema romano**:
  - punti XP ⭐, vite ❤️, giorni di fila 🔥 (streak);
  - **ranghi latini** legati agli XP (Tiro → Discipulus → Scriba → … → Imperator);
  - **obiettivo giornaliero** (*Pensum diei*);
  - **ripasso degli errori** (*Repetitio*): le domande sbagliate ritornano
    finché non le indovini (ripetizione dilazionata di base).
- **Pronuncia con audio** 🔊: sezione *Pronuntiatio* (suoni e accento) e pulsanti
  per ascoltare parole e declinazioni. Usa la sintesi vocale del browser con voce
  italiana → pronuncia **ecclesiastica/italiana**, gratis e senza account.
  L'app sceglie automaticamente la voce migliore (es. «Google italiano» su Chrome)
  e permette di sceglierne una dal menù *Vox*.
- **Versiones** 📜: brani latini **continui** da tradurre, con il vocabolario
  al tocco. Tocchi una parola e ottieni lemma, significato e analisi della
  forma; provi a tradurre la frase; poi scopri la traduzione e la nota che
  spiega il punto difficile. Si va **una frase alla volta**, perché è così che
  si traduce davvero. Sette brani, dalla favola di Fedro all'oratoria di
  Cicerone, ognuno sbloccato solo dopo che il corso ha spiegato tutto quello
  che contiene. Sono in `src/data/versiones.ts`.
- **Vocābula** 🧠: il **ripasso del lessico a distanza**. Il *Repetitio*
  riprende solo le domande sbagliate: una parola indovinata per caso esce dal
  corso e non torna più. Qui invece ogni parola ha una sua scadenza, che si
  allunga ogni volta che la ricordi (**1, 3, 7, 16, 35, 90 giorni**) e torna a
  zero quando la sbagli. Si incontrano al massimo **5 parole nuove al giorno** e
  se ne ripassano **12 per sessione**: poche parole riviste a distanza si
  ricordano, molte in una sera no. Il pulsante compare solo quando c'è
  qualcosa in scadenza. L'elenco non è scritto a mano: le 390 voci sono lette
  dalle tabelle del corso marcate `lessico: true`.
- **Grammatica** 📚: un mini-manuale consultabile in qualunque momento, con
  **tutte le 103 tabelle** del corso raccolte per unità e la ricerca per forma —
  scrivi `eius` o `ibus` e trovi le tabelle che la contengono, senza doverti
  ricordare le lineette. Non duplica niente: legge le tabelle dalle lezioni,
  quindi resta sempre allineato al corso.
- **Salvataggio automatico** dei progressi nel browser (localStorage).
- **Mascotte animata** 🗿: un busto di marmo romano dall'aria sarcastica, con
  tre umori animati e **battute ironiche** a rotazione (saluti, feedback,
  fine lezione). Le frasi sono in `src/quips.ts`, facilissime da modificare.
- **Urbs — costruisci la tua Roma** 🏛️: guadagni **denarii** studiando (in
  parallelo agli XP) e li spendi per costruire edifici romani con nome latino
  (*Domus, Templum, Thermae, Amphitheatrum*…); i più grandi si sbloccano
  avanzando nel corso. La città è mostrata in **vista isometrica** e cresce
  a ogni costruzione.

### I modelli della città

Gli edifici sono **generati da geometria** in `src/components/City3D.tsx`
(nessun asset da scaricare): prismi con spigoli arrotondati, tetti a due falde,
colonnati, cupole, arcate. Per aggiungere un edificio basta un elemento in
`src/data/city.ts` (nome, prezzo, sblocco, ingombro) e un caso nel `switch`
di `buildMesh`.
- **Suoni ed effetti a tema romano** 🔔: suoni sintetizzati al volo (Web Audio) —
  arpeggio di **lira** (risposta giusta), **corno** grave (errore) e **fanfara di
  trionfo** (fine lezione) — più una pioggia di **foglie d'alloro e oro** sulla
  schermata di vittoria. Con interruttore per attivarli/spegnerli.
- **Responsive**: funziona bene anche da telefono.

Le regole di gioco (ranghi e obiettivo) sono in `src/gamification.ts`, facili da
ritoccare.

### Sostituire la mascotte con una tua immagine

La mascotte (`src/components/Mascot.tsx`) è un **segnaposto** disegnato in SVG.
Per usare una tua illustrazione (es. creata con un generatore text-to-image):

1. Prepara le immagini con **sfondo trasparente**, una per umore:
   `mascot-idle.png`, `mascot-happy.png`, `mascot-sad.png`.
2. Mettile in `src/assets/`.
3. In `Mascot.tsx`, sostituisci l'SVG con un tag `<img>` che punta a
   `../assets/mascot-<mood>.png` (istruzioni nel commento in cima al file).

Le animazioni (dondolio, salto, tremolio) continuano a funzionare da sole.

## Come avviarla

Serve [Node.js](https://nodejs.org) (versione 18 o superiore).

```bash
npm install      # installa le dipendenze (solo la prima volta)
npm run dev      # avvia in modalità sviluppo
```

Poi apri l'indirizzo che appare nel terminale (di solito `http://localhost:5173`).

Per creare la versione ottimizzata per la pubblicazione:

```bash
npm run build    # genera la cartella dist/
npm run preview  # anteprima della versione compilata
```

## Controllo automatico del corso

```bash
npm run check
```

Verifica il contenuto di `src/data/curriculum.ts`. Serve perché chi sviluppa
l'app può non sapere il latino: le forme non vanno prese sulla fiducia.

Lo script (`scripts/check-latino.mjs`) contiene i **paradigmi corretti scritti
a mano**, con le lineette delle vocali lunghe, e li confronta con le tabelle
del corso: le cinque declinazioni viste, i tempi di *amāre* e *esse*, il
passivo, i pronomi. Controlla inoltre che ogni domanda a scelta multipla abbia
la risposta fra le opzioni, che le parole delle traduzioni da comporre siano
nel banco, che non ci siano coppie di abbinamento inutili (*rosa → rosa*) o id
di lezione ripetuti. E per le **versioni**: che ogni parola del brano abbia la
sua voce nel glossario, e che il glossario non contenga parole assenti dal testo.

Un controllo merita una parola in più, perché protegge da un errore *silenzioso*:
ogni tabella con le colonne «Latino … Italiano» dev'essere o marcata
`lessico: true` (e allora finisce nel ripasso *Vocābula*) o dichiarata
esplicitamente come non-lessico dentro lo script. Senza questo, una tabella di
vocaboli aggiunta e non marcata non darebbe nessun errore: semplicemente quelle
parole non si ripasserebbero mai, e non se ne accorgerebbe nessuno.

Gira anche a ogni push, prima della pubblicazione: se una forma latina è
sbagliata, il sito non viene aggiornato.

## Come aggiungere lezioni

Tutto il corso è in un unico file, facile da modificare:

```
src/data/curriculum.ts
```

Ogni **unità** contiene delle **lezioni**, e ogni lezione contiene una lista di
**esercizi**. I tipi disponibili (`info`, `table`, `choice`, `build`, `match`,
`analysis`) sono documentati in `src/types.ts`. Per aggiungere contenuti basta
seguire gli esempi già presenti.

## Contenuto attuale

- **Pronuntiatio** — come si legge il latino: suoni particolari e accento (con audio).
- **Unità 1–3** — primo contatto: saluti, persone, cose, il verbo *essere*,
  aggettivi e prime frasi complete (livello «mai visto il latino»), compresi i
  primi **falsi amici** (*casa* = capanna, non «casa»).
- **Unità 4 — I casi latini** — cosa sono i casi, la funzione di ognuno,
  soggetto/oggetto e i complementi (genitivo, dativo, ablativo).
- **Unità 5 — La prima declinazione** — il modello *rosa, rosae*, le desinenze,
  analisi e traduzione.
- **Unità 6 — La seconda declinazione** — maschili in *-us* (*dominus*) e neutri
  in *-um* (*templum*), con la regola dei neutri.
- **Unità 7 — Gli aggettivi** — la concordanza (genere, numero, caso) con il
  modello *bonus, bona, bonum*.
- **Unità 8 — I verbi (presente)** — le 4 coniugazioni (*amāre, monēre, legere,
  audīre*) e il verbo *esse*, con tabelle, audio e traduzione.
- **Unità 9 — La terza declinazione** — la più frequente: il ruolo del genitivo
  e del tema (*rex, regis*), le desinenze, i neutri (*nomen, nominis*) e la
  pratica di traduzione.
- **Unità 10 — Il passato** — imperfetto (il segnale *-ba-*) e perfetto (il tema
  del perfetto, *amāvī*), la differenza di senso tra i due, e traduzione di frasi
  al passato (i tempi del racconto).
- **Unità 11 — Il pronome relativo** — *qui, quae, quod*: le proposizioni
  relative, la regola d'oro (genere/numero dall'antecedente, caso dalla funzione)
  e i vari sensi (*che, di cui, a cui*).
- **Unità 12 — Participi e ablativo assoluto** — participio presente (*amāns*) e
  perfetto (*amātus*), e l'**ablativo assoluto** (*Urbe captā…*), il costrutto più
  frequente nelle versioni.
- **Unità 13 — L'infinito e l'accusativo + infinito** — l'infinito presente e
  perfetto (*amāre / amāvisse*) e il **discorso indiretto**: il latino non ha il
  «che», mette il soggetto in accusativo e il verbo all'infinito
  (*Dīcō Caesarem venīre* = «dico che Cesare viene»), con il tempo relativo
  (contemporaneo / anteriore) e il caso di *sē*.
- **Unità 14 — I pronomi** — le parole più frequenti del latino: personali
  (*ego, tū, nōs, vōs*), *is, ea, id* (lui/lei e «quel»), i dimostrativi
  *hic* e *ille* (più *ipse* e *īdem*), il riflessivo *sē* — e la trappola
  *suus* (del soggetto) contro *eius* (di un altro).
- **Unità 15 — Il passivo** — la marca «-r» delle desinenze passive
  (*amātur* = è amato), l'imperfetto (*amābātur*), il perfetto a due parole
  (*capta est*) con la trappola classica — *amātus est* è «è **stato** amato»,
  non «è amato» — e chi compie l'azione: *ā/ab* + ablativo per le persone,
  ablativo nudo per le cose.
- **Unità 16 — Il congiuntivo** — le forme dei quattro tempi, con due
  scorciatoie che i manuali non mettono in evidenza: l'imperfetto è
  *infinito + desinenza* (**amāre** + m → *amārem*) e il piuccheperfetto è
  *infinito perfetto + desinenza* (**amāvisse** + m → *amāvissem*). Più
  l'avvertenza che conta di più: il congiuntivo latino in italiano quasi mai
  si traduce con un congiuntivo.
- **Unità 17 — Le subordinate** — a che serve tutto quel congiuntivo: il
  ***cum* narrativo** (e come distinguerlo dal *cum* «con»), le **finali**
  con *ut/nē*, le **consecutive** e le loro parole-spia (*tam, ita, tantus*),
  le **interrogative indirette** e i verbi di chiedere e ordinare. Chiude con
  un diagramma di flusso: trovato un congiuntivo, chiediti *chi lo ha
  chiamato*.
- **Unità 18 — Futuro e piuccheperfetto** — con questi l'indicativo è
  completo. Il futuro nei suoi due modelli (*amābit* con il «-bi-» fratello
  del «-bā-» dell'imperfetto; *leget* con la E), il piuccheperfetto come somma
  (tema del perfetto + imperfetto di *esse* → *amāverat*), e una lezione sulle
  **forme che si somigliano**: *legam* è «leggerò» ma anche «legga».
- **Unità 19 — Le ultime declinazioni** — la **4ª** (*manus, manūs*: e con
  essa *exercitus, impetus, adventus*) e la **5ª** (*rēs, reī* — la parola
  passe-partout del latino: *rēs pūblica*, *rēs gestae*), gli **aggettivi
  della 2ª classe** (*omnis, fortis, ingēns*) e **comparativi e superlativi**,
  compreso l'ablativo di paragone e i cinque irregolari che in italiano sono
  diventati ottimo, pessimo, massimo, minimo.
- **Unità 20 — Irregolari e deponenti** — *possum* spiegato per quello che è
  (*pot-* + *esse*), i quattro cortissimi *eō, ferō, volō, fīō*, e infine i
  **deponenti**: forma passiva, significato attivo (*hortātur* = «esorta»,
  non «è esortato»). Con la prova del nove per distinguerli da un passivo
  vero: un passivo non può avere un complemento oggetto.

### Il lessico

Accanto alla grammatica c'è un **binario di vocaboli** (390 voci distinte):
lezioni di lessico con audio, agganciate all'unità che ne insegna la forma —
**preposizioni** e il caso che reggono (U4), nomi della **1ª** (U5) e della
**2ª** (U6), **aggettivi** (U7), **verbi** per coniugazione (U8), nomi della
**3ª** con il genitivo (U9), **congiunzioni e avverbi** (U11). Poi un secondo
giro per temi: altri **verbi** (U12), **la guerra e lo Stato** (U15), **il
tempo e il luogo** (U17), **persone e società** (U19), **le parole astratte**
(U20). Infine un terzo giro su quello che le versioni chiedono e la grammatica
non porta con sé: **i verbi del racconto** (U10), **i verbi che aprono
l'accusativo + infinito** (U13), **numeri e quantità** (U14), **gli animali e
la natura** delle favole (U16), **il corpo e i sentimenti** (U18).

Ogni lezione segnala i **falsi amici**, quelli che nelle versioni fanno perdere
punti: *virtūs* = valore (non «virtù»), *cōnsilium* = decisione, *fāma* =
diceria, *līberī* = i figli (non «i liberi»), *familia* = la servitù di casa,
*casa* = capanna. E le trappole di forma: i plurali che cambiano senso
(*castra* = **un** accampamento, *cōpiae* = le truppe, *fīnēs* = il
territorio) e i maschili della 1ª declinazione (*nauta bonus*, non *bona*).

Le unità di grammatica sono pensate per chi deve affrontare un corso
universitario di letteratura latina partendo da zero: introducono la morfologia
e l'analisi, il vero cuore dello studio del latino.

## Struttura del progetto

```
src/
  data/curriculum.ts   → il contenuto del corso (parole, frasi, esercizi)
  data/versiones.ts    → i brani da tradurre, con glossario e traduzione
  types.ts             → i tipi degli esercizi
  vocabolario.ts       → il lessico ricavato dal corso + le scadenze del ripasso
  useProgress.ts       → salvataggio progressi, XP e streak
  components/
    Home.tsx           → mappa delle lezioni
    LessonPlayer.tsx   → svolgimento di una lezione
    Exercises.tsx      → i sei tipi di esercizio
    Versio.tsx         → la traduzione di un brano, frase per frase
    Grammatica.tsx     → il mini-manuale consultabile
    Vocabula.tsx       → il ripasso del lessico
  styles.css           → grafica e identità visiva di Ianua
```

## Idee per il futuro

- Audio con la pronuncia delle parole latine.
- Più unità (casi, tempi verbali, testi originali).
- Ripasso delle parole sbagliate (spaced repetition).
- Account e sincronizzazione tra dispositivi.
