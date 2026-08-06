# 🏛️ Ianua — impara il latino da zero

**Ianua** (in latino «porta, ingresso») è un'app di apprendimento **gamificata**
per imparare il **latino** partendo da zero, pensata per chi non ha mai studiato
la lingua. Interfaccia in italiano.

## Cosa fa

- **Percorso a lezioni** organizzato in unità, con progressione a tappe. La
  schermata iniziale apre su una **dashboard**: un pulsante «Riprendi da qui»
  che porta dritto alla lezione a cui sei arrivato, e cinque piastrelle per le
  altre attività (Vocābula, Repetitio, Versiones, Grammatica, Urbs), ognuna con
  quanto c'è da fare. Le piastrelle restano sempre al loro posto — spente
  quando non c'è niente da fare — così si impara dove sono le cose. Le unità
  già completate si mostrano **ripiegate**: con ventun unità, tenerle tutte
  aperte voleva dire scorrere per minuti prima di arrivare a dove si è.
- **Esercizi interattivi** di più tipi:
  - carte didattiche che spiegano i concetti;
  - tabelle di grammatica (es. le declinazioni);
  - scelta multipla (anche per l'analisi: «che caso è questa parola?»);
  - costruzione della frase toccando le parole;
  - abbinamento parola ↔ significato — e i tentativi a vuoto **contano**: un
    abbinamento si chiude sempre, basta insistere, quindi senza contarli
    tirare a indovinare costerebbe come saperlo;
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
  - **vite** proporzionate alla lezione: mai più dei quesiti che contiene,
    altrimenti in una lezione da tre domande non si potrebbero perdere e il
    contatore sarebbe una decorazione;
  - **secondo giro** a fine lezione: i quesiti sbagliati si rifanno subito,
    senza XP e senza vite in gioco. Non cancellano l'errore dal *Repetitio* —
    indovinare dieci secondi dopo aver letto la risposta non dimostra niente —
    ma evitano di uscire dalla lezione con in mente la risposta sbagliata;
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
  corso e non torna più. Qui invece ogni parola ha una sua scadenza.

  **Quando entrano.** Finita una lezione, le parole che ha insegnato entrano in
  calendario e tornano il giorno dopo: la lezione è la prima esposizione,
  l'apprendimento vero avviene nelle settimane successive.

  **Quando tornano.** Gli intervalli crescono a ogni risposta giusta — 1, 3, 7,
  16, 35, 90 giorni — ma non sono uguali per tutti: ogni parola ha una
  **facilità** che sale se la indovini e scende se la manchi, e moltiplica
  l'attesa. Due parole allo stesso livello tornano una fra venticinque giorni e
  l'altra fra dieci, secondo quanto ti costano. Sbagliare non azzera tutto: si
  scende di due livelli, perché una parola tenuta per tre mesi e mancata una
  volta non è tornata sconosciuta.

  **Come vengono chieste.** In tre modi, non sempre lo stesso: **latino →
  italiano** (riconoscerla leggendo), **italiano → latino** (tirarla fuori dal
  nulla) e — dal terzo passaggio, quando il corso ha una frase che la contiene
  — **dentro quella frase**, nella forma in cui il testo la usa: «silvā», non
  «silva». È così che dovrai riconoscerla traducendo. Le frasi vengono dalle
  versioni, dove ogni parola ha già lemma e analisi controllati (106 vocaboli
  su 390 ne hanno una).

  Si incontrano al massimo **5 parole nuove al giorno** e se ne ripassano **12
  per sessione**. L'elenco non è scritto a mano: le 390 voci sono lette dalle
  tabelle del corso marcate `lessico: true`.
- **Grammatica** 📚: un mini-manuale consultabile in qualunque momento, con
  **tutte le 103 tabelle** del corso raccolte per unità e la ricerca per forma —
  scrivi `eius` o `ibus` e trovi le tabelle che la contengono, senza doverti
  ricordare le lineette. Non duplica niente: legge le tabelle dalle lezioni,
  quindi resta sempre allineato al corso.
- **Salvataggio automatico** dei progressi nel browser (localStorage), con
  **esporta/importa**: dalla schermata iniziale scarichi un file `.json` con
  tutto — lezioni, XP, streak, città, vocaboli in memoria, versioni tradotte —
  e lo ricarichi su un altro dispositivo o dopo aver cambiato telefono. Serve
  perché il localStorage vive in *quel* browser su *quel* dispositivo: cancelli
  i dati di navigazione e mesi di studio spariscono senza preavviso.
  L'importazione sovrascrive tutto, quindi prima mostra cosa c'è nel file e
  cosa c'è adesso, e chiede conferma. L'app chiede anche al browser di rendere
  **durevole** l'archiviazione (`navigator.storage.persist()`), così il
  salvataggio non viene buttato via quando lo spazio scarseggia.
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

Due controlli meritano una parola in più, perché proteggono da errori
*silenziosi*.

Il primo: ogni parola messa in una tabella di lessico dev'essere ripresa da
almeno un quesito della sua lezione. Senza, una parola può essere «insegnata»
comparendo una volta in tabella e mai più — e infatti metà del vocabolario era
in quella condizione. Fanno eccezione le parole identiche all'italiano
(*mare*, *dea*, *patria*), che non hanno niente da insegnare.

Il secondo:
ogni tabella con le colonne «Latino … Italiano» dev'essere o marcata
`lessico: true` (e allora finisce nel ripasso *Vocābula*) o dichiarata
esplicitamente come non-lessico dentro lo script. Senza questo, una tabella di
vocaboli aggiunta e non marcata non darebbe nessun errore: semplicemente quelle
parole non si ripasserebbero mai, e non se ne accorgerebbe nessuno.

Gira anche a ogni push, prima della pubblicazione: se una forma latina è
sbagliata, il sito non viene aggiornato.

## Controllo contro fonti esterne

```bash
npm run lemmi             # scarica i dati (una volta, vanno in .cache/)
npm run check:quantita    # desinenze e lineette, contro Collatinus
npm run check:morfologia  # le frasi, contro Whitaker's Words
```

`npm run check` verifica che il corso sia coerente **con sé stesso**: i
paradigmi giusti sono scritti dentro lo script, dalla stessa mano che ha
scritto il corso. Questi due verificano il latino contro **fonti indipendenti**.

### Le desinenze e le lineette — [Collatinus](https://github.com/biblissima/collatinus)

Il lessico del lemmatizzatore di Yves Ouvrard e Philippe Verkerk (GPL): 24 000
lemmi con le quantità vocaliche e le desinenze di ogni modello di flessione.

**Le desinenze** sono la verifica che vale di più, perché lì un errore sarebbe
sistematico: sbagliata una desinenza, è sbagliata in ogni parola di quella
declinazione. Le 71 celle delle cinque declinazioni — neutri e lineette
compresi — coincidono con i modelli.

**Le lineette** vanno prese con cautela, e vale la pena spiegare perché.
Collatinus marca le quantità per la **scansione metrica**, che include
l'allungamento *per posizione*: scrive «tērra» perché la sillaba è chiusa,
benché la *e* sia breve per natura. La lineetta del vocabolario indica invece
solo la quantità **per natura**. Confrontarle alla cieca dà centinaia di falsi
allarmi. Resta valida una direzione, ed è la più importante: la posizione può
solo *allungare* una sillaba, mai accorciarla, quindi una vocale marcata breve
è breve per natura senza discussione. Su quel verso il corso è pulito.

Il verso opposto — la lineetta che **manca** — sembrava fuori portata, perché
quando la fonte marca una vocale lunga non si sa se lo sia per natura o solo
per posizione. C'è però un caso in cui si sa: la **sillaba aperta**. Se dopo la
vocale c'è al più una consonante prima della vocale seguente (*a-mī-cus*,
*nā-ti-o*), la sillaba non è chiusa da niente e la posizione non c'entra:
quella lunga è per natura, e se il corso non ha messo la lineetta, manca. Il
controllo gira su vocabolario, colonne latine delle tabelle e latino fra
virgolette basse nelle schede. Ha trovato **amīcus** — scritto «amicus» perfino
nella tabella dell'accento, dove la lineetta *è* la spiegazione del perché la
voce batte su *-MÌ-* — più *dōnum*, *prōfectus*, *Fēmina*, *rēgnante*. Restano
fuori le sillabe chiuse (*mēnsa*, *gēns*): lì il dubbio resta e non si segnala
niente.

### Le frasi — [Whitaker's Words](https://github.com/mk270/whitakers-words)

Le tabelle sono verificate, ma le **frasi** degli esercizi e delle versioni no:
sono scritte a mano, e un errore lì non lo vedeva nessuno.

`scripts/morfologia.mjs` è un analizzatore morfologico latino costruito sui due
archivi di William Whitaker (pubblico dominio): `INFLECTS.LAT`, che elenca ogni
desinenza latina con la sua analisi, e `DICTLINE.GEN`, che elenca 39 000 lemmi
con i loro temi. L'algoritmo è quello di Whitaker: si prova a spezzare la parola
in tema + desinenza in tutti i modi possibili, e la lettura vale se la desinenza
esiste per quella flessione e il tema è quello di un lemma della stessa
flessione. Gestisce le enclitiche (*populusque*), i perfetti contratti
(*trānsīsse* per *trānsiisse*) e le forme di *esse*, che Whitaker tiene fuori
dal dizionario perché troppo irregolari.

Con quello si controllano due cose:

1. **Ogni parola latina delle frasi esiste?** 885 parole, tutte analizzabili.
   I nomi propri stanno in un elenco esplicito nello script — non si ignora in
   blocco tutto ciò che comincia per maiuscola, così una parola nuova che non
   si analizza salta fuori.
2. **Le analisi che il corso dichiara sono giuste?** Gli esercizi di analisi
   affermano che una certa parola è accusativo singolare, o congiuntivo
   imperfetto: sono l'unica parte del corso che fa un'affermazione
   grammaticale verificabile parola per parola. Ventuno su ventidue sono
   confermate dall'analizzatore (la ventiduesima è una forma composta, dove il
   tempo appartiene alla coppia participio + *esse* e non al participio da solo).

I due controlli sanno fallire: introducendo di proposito una forma inesistente
(*rosābem*) e un'analisi sbagliata (*mīlitibus* dichiarato genitivo singolare),
entrambi le segnalano.

### Gli errori di senso — `npm run check:sensi`

L'errore su `in` non lo trovava nessun controllo: le forme erano tutte
corrette, e sbagliata era solo la traduzione. Ma aveva **due firme
riconoscibili**, e adesso le cerca uno script.

**Due espressioni latine con la stessa identica traduzione italiana.** `ad
silvam` e `in silvam` erano tutte e due «verso il bosco», nella stessa unità:
una delle due doveva essere sbagliata. Lo script raccoglie ogni coppia
latino → italiano del corso (abbinamenti, tabelle di lessico, domande di
traduzione) e segnala le collisioni. Molte sono legittime — `timēre` e
`vereor` sono davvero tutti e due «temere» — e stanno in un registro con il
motivo, `scripts/collisioni-accettate.txt`, così restano visibili solo quelle
nuove. Fra le accettate ci sono anche le omografie dell'**italiano**: «porta»
è tanto la porta quanto «lui porta».

**Le preposizioni contro il dizionario.** Sono una classe chiusa — una
ventina di parole, sempre le stesse — e per quelle il confronto
italiano/inglese si può fare davvero, con una tabellina di equivalenze
scritta a mano: «verso» è *towards*, «dentro» è *into*, «sotto» è *under*. Se
un senso che il corso attribuisce a una preposizione non compare nella voce
del dizionario, viene segnalato. Con la vecchia glossa questo controllo
diceva: *«in» — il corso dice «verso»*, e il dizionario per `in` non ha
*towards* (ce l'ha per `ad`).

Reintroducendo l'errore originale, **entrambi i meccanismi lo trovano**,
indipendentemente l'uno dall'altro.

Questo controllo ha anche stabilito una regola che vale la pena scrivere: la
**glossa** — che è il dato controllato ed esercitato — contiene solo quello
che una fonte conferma; i sensi secondari veri ma non attestati dal
dizionario stanno nella **nota**, in prosa. Così `in` + accusativo vale
«contro» in contesto di guerra (`in hostēs impetum fēcit`), ma lo dice la
nota, non la glossa.

### I significati — il registro delle glosse

```bash
npm run check:glosse
```

Gli altri controlli guardano le **forme**. Nessuno guarda il **senso**, ed è lì
che è passato l'errore peggiore che abbiamo trovato: `in` + accusativo glossato
«verso» invece che «dentro» — tutte le forme corrette, la traduzione sbagliata,
e per giunta in concorrenza con `ad`, che «verso» lo significa davvero.

Questo script mette ogni voce del vocabolario accanto alla glossa inglese di
Whitaker. Il confronto italiano/inglese non si automatizza in modo affidabile,
quindi lo script **non giudica: presenta**. Quello che automatizza è il
*ricordarsi*: le voci già lette stanno in `scripts/glosse-riviste.txt` con la
glossa approvata, e ricompaiono solo se la glossa cambia. Le 389 voci
confrontabili sono state lette una per una; una parola nuova costa solo la sua
riga.

Lo stesso vale per le **regole** delle schede: le 189 affermazioni traducibili
(«questa frase latina significa questo») sono state rilette una per una dopo
l'errore su `in`. Non c'è modo di automatizzarlo — una regola non è una voce di
dizionario — ma è un insieme finito, e sta scritto qui che è stato fatto.

### Quello che nessuno di questi controlli può fare

Dicono che ogni forma **esiste**, che ogni analisi dichiarata è **possibile** e
che ogni glossa è stata confrontata con un dizionario. Non dicono se una frase
è *sintatticamente* corretta, se suona latina, o se una spiegazione è la più
chiara possibile.

E vale la pena essere espliciti su una cosa: il corso non è stato scritto
copiando da una grammatica, ma **a memoria**. Per materiale standard da liceo
quella memoria è affidabile, ma produce esattamente errori come quello su `in`:
non forme sbagliate, ma glosse *quasi* giuste che sopravvivono perché suonano
bene. I controlli esterni servono a spezzare quel circolo — il primo controllo
automatico aveva lo stesso difetto, perché i paradigmi «corretti» dentro lo
script li aveva scritti la stessa mano che aveva scritto il corso.

Nessuno dei due gira in CI: dipendono da risorse esterne e le divergenze vanno
lette una per una.

### L'ultimo controllo sono le persone — il ⚑ dentro ogni esercizio

Tutto quello che sta sopra verifica le **forme** e i **significati**. Restano
fuori la sintassi delle frasi e la chiarezza delle spiegazioni, e lì l'unico
strumento è qualcuno che legge. Perciò ogni esercizio ha una bandierina in alto
a destra.

Il punto delicato non è convincere qualcuno a segnalare: è che dalla
segnalazione si arrivi alla correzione senza lavoro di mezzo. Perciò il foglio
**non chiede in quale esercizio sei** — lo sa già, e allega la coordinata al
messaggio:

```
[ianua 51712f3 · ms4jfyox-rb8dh] u19 · u19l4 · esercizio 5
Errore di latino — In «Caesar fortior Pompēiō erat», che funzione ha «Pompēiō»?

secondo me qui manca una spiegazione
```

Nella prima riga ci sono il commit da cui l'app è stata costruita e l'**id**
della segnalazione. L'id serve perché la stessa segnalazione può arrivare due
volte per due strade — incollata da una chat e dentro il file esportato — e
senza di lui la seconda diventerebbe una issue doppia.

Quella prima riga è pensata per essere letta da uno script. Il messaggio si
incolla così com'è:

```bash
pbpaste | npm run segnalazioni                    # incollato da WhatsApp
npm run segnalazioni -- ianua-segnalazioni.json   # scaricato dal quaderno
npm run segnalazioni -- u19l4 5                   # a mano
```

e viene fuori `src/data/curriculum.ts:10932`, più l'esercizio **com'è adesso**
— che serve, perché fra la segnalazione e la lettura può essere già stato
corretto.

### Il registro vero sono le issue

Una segnalazione dentro una chat si perde; una issue no. Perciò le segnalazioni
finiscono su GitHub, con l'etichetta `segnalazione` più una per categoria, e
[il registro si guarda da lì](https://github.com/Keyblank/ianua/issues?q=label%3Asegnalazione).
Ci si arriva per due strade, perché servono a due persone diverse.

**Chi ha un account GitHub** usa il link «…oppure aprila su GitHub» dentro il
foglio: apre una issue già compilata — titolo, corpo, etichette — e deve solo
confermare. Nessun server, nessuna chiave: è GitHub stesso a leggere tutto
dall'indirizzo.

**Per tutti gli altri** — cioè quasi tutti gli amici — la segnalazione arriva
come messaggio, e la si versa nel registro da qui:

```bash
GITHUB_TOKEN=github_pat_... npm run segnalazioni -- segnalazioni.json --github
npm run segnalazioni -- segnalazioni.json --github --prova   # dice cosa aprirebbe
```

Il token è fine-grained, con accesso al solo `Keyblank/ianua` e il permesso
`Issues: write`; sta in una variabile d'ambiente e non entra mai nel bundle.
Ogni issue porta in fondo un'impronta `<!-- ianua:id -->`, e le impronte già
presenti si saltano: reincollare due volte lo stesso messaggio non raddoppia
niente. Il corpo della issue contiene anche il **link alla riga** di
`curriculum.ts`.

La prima esecuzione crea le etichette che mancano — senza, GitHub le ignora in
silenzio.

**Quello che questo giro non fa** è popolare il registro *da solo*, senza che
nessuno tocchi niente: per farlo servirebbe una credenziale di scrittura
raggiungibile dal browser, cioè un piccolo relay (una funzione serverless che
tiene il token). È l'unica parte che richiederebbe un server, e per ora non c'è.

**Anche le spiegazioni si segnalano**, e sono anzi il caso che conta di più,
perché è l'unico che nessuno script sa controllare. Schede e tabelle sono
esercizi come gli altri, quindi hanno il loro ⚑; ce l'ha anche ogni tabella
della **Grammatica**, che è dove le spiegazioni si rileggono a mente fredda.

Su una scheda lunga, però, «Scheda "Il participio perfetto"» non basta a dire
dove guardare. Perciò: se prima di toccare ⚑ si **evidenzia** la frase
incriminata, quella frase viaggia con la segnalazione —

```
[ianua abc1234 · m1p9x-q4tz2] u12 · u12l2 · esercizio 1
Spiegato male — Scheda «Il participio perfetto»

sul punto: «Finisce in «-tus, -a, -um» (a volte «-sus»)»

ma quando è -sus? non lo dice
```

— e lo script la ristampa insieme alla riga. La selezione si legge sul
`pointerdown` del pulsante, prima che il click porti via il fuoco e la
cancelli.

Nel Repetitio gli esercizi arrivano sciolti, senza più la lezione da cui
vengono: la posizione si ritrova confrontandoli per contenuto con il
curriculum. Lo stesso indice serve alla Grammatica, dove la lezione non c'è
affatto e la tabella si ritrova comunque. Le segnalazioni restano nel browser
di chi le fa (quaderno
«Segnalazioni» nella schermata iniziale, per mandarle in blocco a fine giro) e
non passano da nessun server, come tutto il resto dell'app.

## Se GitHub Pages smette di pubblicare

Questa sezione esiste perché è costata una giornata, e fra sei mesi nessuno se
la ricorderà.

**Non mettere privato un repository che pubblica con Pages.** Sul piano
gratuito il sito viene *cancellato*, e rimettendo pubblico il repo **non viene
ricreato**: le richieste di pubblicazione entrano in coda e non escono più. La
build resta verde, l'artefatto viene caricato, e da fuori sembra tutto a posto
tranne il sito — che è il modo peggiore in cui un guasto possa presentarsi.

Nel districare quella matassa sono emersi tre problemi impilati, e ognuno
nascondeva il successivo:

1. **Il sito cancellato** dal passaggio a privato. Sintomo: `deploy-pages`
   resta in `deployment_queued` per dieci minuti e poi va in timeout. Nella
   pagina delle impostazioni manca il riquadro «Your site is live at…».
2. **Deployment che si annullano a vicenda.** Su un sito Pages ne può vivere
   uno solo. Spingere su due rami che attivano lo stesso workflow, o lasciare
   che la pubblicazione «vecchio stile» parta mentre la nostra è in coda, fa
   morire entrambe: «Deployment cancelled». Da qui la regola di **spingere su
   un ramo solo**.
3. **La regola dell'ambiente `github-pages`.** In *Settings → Environments*
   l'ambiente ha una lista di rami autorizzati a pubblicare. Era stata scritta
   quando l'unico ramo si chiamava `claude/duolingo-latin-app-pst7r4`, e ha
   respinto ogni deploy da `main`. Il messaggio non è nei log del job ma negli
   **annotamenti della run**: `Branch "main" is not allowed to deploy to
   github-pages due to environment protection rules`.

**Dove guardare, in ordine.** Gli annotamenti della run (non solo i log), poi
*Settings → Pages* (Source dev'essere «GitHub Actions»), poi *Settings →
Environments → github-pages*.

`BASE_PATH` si ricava da `github.event.repository.name`: rinominare il
repository non rompe il sito. Serve davvero, perché rinominare — che crea un
sito Pages con un'altra identità — è l'ultima leva quando la coda è inceppata.

**E se non basta niente:** `npm run build:singlefile` impacchetta tutta l'app
in un unico `index.html` da 2,6 MB, senza una singola richiesta esterna. Si
apre con un doppio clic e si manda per messaggio. Un sito dipende da un
servizio che può fermarsi; un file no.

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

**Come sono fatte le lezioni di vocaboli.** Ogni parola nuova viene chiesta
**almeno tre volte, in modi diversi e a distanza crescente** dentro la stessa
lezione:

1. **riconoscere** — abbinamento latino ↔ italiano, con la parola sotto gli occhi;
2. **richiamare** — scelta multipla, alternando i due versi (dal latino e verso
   il latino);
3. **rimescolare** — di nuovo un abbinamento, ma con compagni diversi, così non
   si impara la posizione invece della parola.

Gli abbinamenti del terzo giro sono intercalati fra le domande, non messi in
fondo: cambia il tipo di richiesta e cresce la distanza fra un passaggio e
l'altro sulla stessa parola. Per far stare tre passaggi in una lezione di
lunghezza ragionevole, **ogni tabella è una lezione a sé** (8-14 parole) invece
che venti tutte insieme — che sono comunque troppe da imparare in un colpo.

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
    Versiones.tsx      → l'elenco dei brani da tradurre
    Salvataggio.tsx    → esporta/importa i progressi
  salvataggio.ts       → formato del file di salvataggio e lettura
  styles.css           → grafica e identità visiva di Ianua
```

## Idee per il futuro

- Audio con la pronuncia delle parole latine.
- Più unità (casi, tempi verbali, testi originali).
- Ripasso delle parole sbagliate (spaced repetition).
- Account e sincronizzazione tra dispositivi.
