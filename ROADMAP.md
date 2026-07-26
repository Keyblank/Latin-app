# 🗺️ Piano di sviluppo — Ianua

Questo documento tiene traccia di **dove siamo** e **dove andiamo**. È vivo:
va aggiornato man mano che le cose vengono fatte.

## 🎯 Obiettivo

Un'app di apprendimento gamificata che porti **da zero** studenti di liceo o
università (che non hanno mai fatto latino) fino a essere in grado di
**tradurre versioni** — cioè leggere e volgere in italiano brani latini,
tipicamente narrativi (storici, favole).

**Caso d'uso principale**: uno studente che deve affrontare *letteratura latina*
all'università **senza aver mai fatto latino**. All'esame la storia letteraria
si studia in italiano; il vero scoglio è la **lingua**, cioè tradurre i brani
in programma (spesso di autori precisi: Cicerone, Virgilio, Seneca, Cesare…) ed
eventualmente superare una **prova/idoneità di latino**. L'app punta a questo:
dare grammatica e pratica di **traduzione**. Per questo motivo, oltre ai
contenuti, hanno **alta priorità** due strumenti: la sezione «Grammatica»
consultabile e la modalità «Versione».

Principi guida:
- **Non dare nulla per scontato**: ogni termine tecnico va definito la prima
  volta che compare, partendo sempre dall'italiano che già si conosce.
- **Verticale verso la lettura**: privilegiare ciò che serve a tradurre testi
  narrativi (tempi passati, relative, participi, costrutti) rispetto alle
  rarità.
- **Imparare giocando**: gradualità, ripetizione, feedback immediato.

---

## ✅ Dove siamo (fatto)

### Contenuti (21 sezioni, 93 lezioni, 390 vocaboli + i pronomi)

- ✅ **Pronuntiatio** — suoni e accento (pronuncia ecclesiastica), con audio
- ✅ **U1–U3** — vocaboli, verbo *essere* (est/sunt), verbi base, frase S-V-O
- ✅ **U4 — I casi latini** — funzione dei casi (nom/acc/gen/dat/abl)
- ✅ **U5 — 1ª declinazione** (*rosa*)
- ✅ **U6 — 2ª declinazione** (*dominus*, *templum*, neutri)
- ✅ **U7 — Aggettivi** (concordanza: genere, numero, caso)
- ✅ **U8 — Verbi, presente** (4 coniugazioni + *esse*)
- ✅ **U9 — 3ª declinazione** (tema dal genitivo; *rex, regis*; neutri)
- ✅ **U10 — Il passato** (imperfetto e perfetto)
- ✅ **U11 — Il pronome relativo** (*qui, quae, quod*)
- ✅ **U12 — Participi e ablativo assoluto**
- ✅ **U13 — Infinito e accusativo + infinito** (discorso indiretto)
- ✅ **U14 — I pronomi** (personali, is/hic/ille, riflessivi; suus vs eius)
- ✅ **U15 — Il passivo** (presente, imperfetto, perfetto; agente e mezzo)
- ✅ **U16 — Il congiuntivo** (le forme: i quattro tempi, e come riconoscerli)
- ✅ **U17 — Le subordinate** (cum narrativo, finali, consecutive, interrogative indirette)
- ✅ **U18 — Futuro e piuccheperfetto** (l'indicativo è completo)
- ✅ **U19 — 4ª e 5ª declinazione**, aggettivi della 2ª classe, comparativi e superlativi
- ✅ **U20 — Verbi irregolari e deponenti** (*possum*, *eō/ferō/volō*, i deponenti)

Ogni unità di grammatica chiude con una lezione **"Analizza e traduci"**
(anche latino → italiano, il verso della versione).

Accanto alla grammatica c'è un **binario di lessico**: lezioni di vocaboli con
audio, agganciate all'unità che ne insegna la forma — preposizioni (U4), nomi
della 1ª (U5), della 2ª (U6), aggettivi (U7), verbi (U8), nomi della 3ª (U9),
congiunzioni e avverbi (U11). Poi un **secondo giro** su temi: altri verbi
(U12), la guerra e lo Stato (U15), il tempo e il luogo (U17), persone e
società (U19), le parole astratte (U20). E un **terzo giro** che copre quello
che le versioni chiedono e la grammatica non porta con sé: i verbi del racconto
(U10), i verbi che aprono l'accusativo + infinito (U13), numeri e quantità
(U14), gli animali e la natura delle favole (U16), il corpo e i sentimenti
(U18). Ognuna segnala i **falsi amici**
(*virtūs* = valore, *cōnsilium* = decisione, *līberī* = i figli, *familia* =
la servitù) e le trappole di forma (i plurali *castra*/*cōpiae*/*fīnēs*, i
maschili della 1ª come *nauta* e *agricola*).

### Funzionalità

- ✅ Percorso a lezioni con blocco/sblocco + **modalità libera**
- ✅ 6 tipi di esercizio: scheda, **tabella** (con audio), scelta, costruzione
  frase, abbinamento, **analisi grammaticale**
- ✅ Gamification: **XP, vite, streak**, **ranghi latini**, **obiettivo
  giornaliero** (*Pensum diei*), **ripasso degli errori** (*Repetitio*)
- ✅ **Urbs** — città romana in **3D** da costruire spendendo **denarii**
  guadagnati studiando: posizionamento libero, rotazione, strade, demolizione,
  terreno ampliabile; 17 edifici con nome latino, sbloccati per progressi
- ✅ **Pronuncia audio** ecclesiastica (con "traduttore di pronuncia" ae→e,
  ti→zi, ph/th/ch…) e scelta della voce
- ✅ **Mascotte** (busto di marmo, 3 umori animati) + **battute ironiche**
- ✅ **Suoni ed effetti a tema romano** (lira / corno / fanfara, coriandoli di
  alloro e oro), con interruttore
- ✅ **Vocābula** — ripasso del lessico a scadenze crescenti (1, 3, 7, 16, 35,
  90 giorni), 5 parole nuove al giorno
- ✅ Salvataggio locale dei progressi, con **esporta/importa su file** e
  richiesta di archiviazione durevole al browser
- ✅ **Pubblicazione**: sito pubblico su GitHub Pages (auto-deploy a ogni push)
  + build a file singolo
- ✅ **Controllo automatico del latino** (`npm run check`): i paradigmi corretti
  sono scritti nello script e confrontati con le tabelle del corso; gira in CI
  prima del deploy

---

## 🚧 Dove andiamo (piano contenuti)

Ordine pensato per arrivare prima possibile a leggere testi narrativi.

### Fase B — completare la base morfologica *(in corso)*
- ✅ 3ª declinazione
- ✅ Imperfetto e perfetto
- ✅ Pronome relativo
- ✅ **Pronomi**: personali (ego, tū), dimostrativi (is, hic, ille, ipse, īdem), riflessivi (sē, suus)

### Fase C — gli "sblocca-lettura" *(priorità per le versioni)*
- ✅ **Participi** (presente e perfetto) → **Ablativo assoluto**
- ✅ **Infinito** (presente e perfetto) → **Accusativo + infinito** (discorso indiretto) ⭐
- ✅ **Congiuntivo** (le forme) + subordinate: *cum* narrativo, finali
  (*ut/nē*), consecutive, interrogative indirette, verbi di chiedere e ordinare
- ✅ **Il passivo** (presente, imperfetto e perfetto) + complemento d'agente
- ✅ Tempi restanti dell'indicativo: **futuro**, **piuccheperfetto**, futuro anteriore

### Fase D — completamento e pratica
- ✅ **4ª e 5ª declinazione** (*manus*, *rēs*)
- ✅ **Aggettivi della 2ª classe** (*fortis, ācer*) e **comparativi/superlativi**
- ✅ **Verbi irregolari** (*possum, eō, ferō, volō/nōlō/mālō*, *fīō*) e **deponenti**
- ✅ **Numerali** (uno-mille, e i nove aggettivi pronominali: ūnus, sōlus,
  tōtus, nūllus, alter, alius…); avverbi e preposizioni erano già in U4 e U11
- ✅ **Traduzione graduata**: sette **brani adattati**, dalla favola di Fedro
  all'oratoria di Cicerone, sbloccati man mano che il corso spiega ciò che
  contengono
- ✅ **Lessico, terzo giro**: 390 voci — la soglia utile per leggere una
  versione facile è intorno ai 400, e ci siamo

---

## 🛠️ Dove andiamo (piano funzionalità)

- ✅ **Sezione "Grammatica" consultabile** ⭐ — le 103 tabelle del corso raccolte
  per unità, con ricerca per forma che ignora le lineette; generata dalle
  lezioni, quindi sempre allineata
- ✅ **Modalità "Versione"** ⭐ — sette brani adattati con il vocabolario al
  tocco, traduzione frase per frase e nota sul punto difficile
- ✅ **Ripasso del lessico a distanza** (*Vocābula*) ⭐ — ogni parola ha una
  scadenza che si allunga se la ricordi (1, 3, 7, 16, 35, 90 giorni) e torna a
  zero se la sbagli; 5 parole nuove al giorno, 12 per sessione. Le 390 voci
  sono lette dalle tabelle marcate `lessico: true`, non da un elenco a parte
- ✅ **Analisi grammaticale** ⭐ — 22 esercizi nelle lezioni di chiusura di
  U5–U20: una parola evidenziata dentro una frase, e si risponde a due o tre
  domande insieme (caso, numero, funzione; modo, tempo, persona). La
  traduzione compare solo dopo, con la nota sul punto in gioco: le ambiguità
  vere del latino (-ibus dativo o ablativo, «poētae» tre casi in una forma,
  nominativo e accusativo neutri identici) si sciolgono col contesto, ed è
  quello che l'esercizio insegna a fare
- ⬜ **Badge / traguardi** latini da collezionare
- ⬜ Audio anche sulle **frasi**; migliorare l'**accento** della sintesi vocale
- ⬜ (Eventuale) Account e sincronizzazione tra dispositivi. Il primo passo è
  fatto: i progressi si esportano e si reimportano come file, quindi cambiare
  telefono non costa più mesi di studio. Resta scoperta solo la sincronia vera
  fra due dispositivi usati in parallelo, che richiede un server
- ⬜ (Eventuale) Pubblicazione su **Google Play**. Servirebbe prima farne una
  **PWA** (manifest, service worker, icone), che da sola la rende già
  installabile e utilizzabile offline. Attenzione a un equivoco: l'account
  Google **non** salva i dati dell'app da solo — *Android Auto Backup* copre
  la cartella dell'app, e in un guscio TWA i dati stanno in Chrome, quindi non
  ci rientrano. Con Capacitor invece sì. È il motivo per cui l'esporta/importa
  viene prima di tutto il resto

---

## ⚠️ Limiti noti

- L'**accento** della pronuncia automatica non è sempre corretto (per le parole
  con accento sulla terzultima): dove conta, lo mostriamo scritto in MAIUSCOLO.
- La morfologia è **completa**: cinque declinazioni, due classi di aggettivi,
  tutti i tempi dell'indicativo e del congiuntivo, attivi e passivi, participi,
  irregolari e deponenti, più i costrutti (ablativo assoluto, acc.+inf.,
  subordinate), il lessico è a 390 voci con il ripasso a distanza, e ci sono
  sette versioni. Restano aperti soprattutto i **numerali** in modo sistematico
  e un esercizio di **analisi** dedicato (di' caso, numero, tempo…).

---

## 🧩 Come estendere il corso

Tutto il contenuto è in **`src/data/curriculum.ts`** (unità → lezioni →
esercizi). I tipi di esercizio sono in `src/types.ts`. Le regole di gioco
(ranghi, obiettivo) in `src/gamification.ts`, le battute in `src/quips.ts`.
Basta seguire gli esempi già presenti.

Se aggiungi una tabella di **vocaboli**, marcala con `lessico: true` (prima
colonna «Latino», ultima «Italiano»): così entra da sola nel ripasso *Vocābula*
e nella sezione Grammatica. Se te ne dimentichi, `npm run check` se ne accorge
e si ferma.
