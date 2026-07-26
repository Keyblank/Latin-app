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

### Contenuti (15 sezioni, 57 lezioni, ~200 vocaboli + i pronomi)

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

Ogni unità di grammatica chiude con una lezione **"Analizza e traduci"**
(anche latino → italiano, il verso della versione).

Accanto alla grammatica c'è un **binario di lessico**: lezioni di vocaboli con
audio, agganciate all'unità che ne insegna la forma — preposizioni (U4), nomi
della 1ª (U5), della 2ª (U6), aggettivi (U7), verbi (U8), nomi della 3ª (U9),
congiunzioni e avverbi (U11). Ognuna segnala i **falsi amici** (*virtūs* =
valore, *cōnsilium* = decisione, *fāma* = diceria).

### Funzionalità

- ✅ Percorso a lezioni con blocco/sblocco + **modalità libera**
- ✅ 5 tipi di esercizio: scheda, **tabella** (con audio), scelta, costruzione
  frase, abbinamento
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
- ✅ Salvataggio locale dei progressi
- ✅ **Pubblicazione**: sito pubblico su GitHub Pages (auto-deploy a ogni push)
  + build a file singolo

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
- ⬜ **Congiuntivo** + subordinate: *cum* narrativo, finali (*ut/ne*),
  consecutive, temporali/causali
- ⬜ **Il passivo** (presente e passato)
- ⬜ Tempi restanti dell'indicativo: **futuro**, **piuccheperfetto**

### Fase D — completamento e pratica
- ⬜ **4ª e 5ª declinazione**
- ⬜ **Aggettivi della 2ª classe** (*fortis, acer*) e **comparativi/superlativi**
- ⬜ **Verbi irregolari** (*possum, eo, fero, volo/nolo/malo*, *fio*) e **deponenti**
- ⬜ **Numerali, avverbi, preposizioni** (in modo sistematico)
- ⬜ **Traduzione graduata**: dalle frasi ai **brani adattati** ad autori facili
  (Eutropio, *Fabulae*, Cesare semplificato)
- ⬜ **Lessico, secondo giro**: da ~200 a ~400 vocaboli (è la soglia sotto cui
  una versione resta illeggibile anche sapendo tutta la grammatica)

---

## 🛠️ Dove andiamo (piano funzionalità)

- ⬜ **Sezione "Grammatica" consultabile** ⭐ — tutte le tabelle sempre a portata,
  come un mini-manuale (fondamentale per chi traduce all'università)
- ⬜ **Modalità "Versione"** ⭐ — un brano latino con aiuti sulle parole al tocco,
  poi confronto con la traduzione: il ponte verso l'esame
- ⬜ **Badge / traguardi** latini da collezionare
- ⬜ Più esercizi **latino → italiano** e un esercizio di **analisi** dedicato
  (di' caso, numero, tempo…)
- ⬜ Audio anche sulle **frasi**; migliorare l'**accento** della sintesi vocale
- ⬜ (Eventuale) Account e sincronizzazione tra dispositivi

---

## ⚠️ Limiti noti

- L'**accento** della pronuncia automatica non è sempre corretto (per le parole
  con accento sulla terzultima): dove conta, lo mostriamo scritto in MAIUSCOLO.
- I contenuti coprono le **fondamenta** più i primi costrutti (participi,
  ablativo assoluto, acc.+inf.): per tradurre versioni vere manca ancora il
  resto della Fase C (congiuntivo e subordinate, passivo, futuro) e la Fase D. È un
  percorso, non un traguardo già raggiunto.

---

## 🧩 Come estendere il corso

Tutto il contenuto è in **`src/data/curriculum.ts`** (unità → lezioni →
esercizi). I tipi di esercizio sono in `src/types.ts`. Le regole di gioco
(ranghi, obiettivo) in `src/gamification.ts`, le battute in `src/quips.ts`.
Basta seguire gli esempi già presenti.
