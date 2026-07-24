# 🏛️ Latino — impara da zero

Un'app in stile **Duolingo** per imparare il **latino** partendo da zero, pensata
per chi non ha mai studiato la lingua. Interfaccia in italiano.

## Cosa fa

- **Percorso a lezioni** organizzato in unità (come la mappa di Duolingo).
- **Esercizi interattivi** di più tipi:
  - carte didattiche che spiegano i concetti;
  - tabelle di grammatica (es. le declinazioni);
  - scelta multipla (anche per l'analisi: «che caso è questa parola?»);
  - costruzione della frase toccando le parole;
  - abbinamento parola ↔ significato.
- **Gamification**: punti XP ⭐, vite ❤️, giorni di fila 🔥 (streak).
- **Salvataggio automatico** dei progressi nel browser (localStorage).
- **Responsive**: funziona bene anche da telefono.

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

## Come aggiungere lezioni

Tutto il corso è in un unico file, facile da modificare:

```
src/data/curriculum.ts
```

Ogni **unità** contiene delle **lezioni**, e ogni lezione contiene una lista di
**esercizi**. I tipi di esercizio disponibili (`info`, `choice`, `build`, `match`)
tipi di esercizio disponibili (`info`, `table`, `choice`, `build`, `match`)
sono documentati in `src/types.ts`. Per aggiungere contenuti basta seguire gli
esempi già presenti.

## Contenuto attuale

- **Unità 1–3** — primo contatto: saluti, persone, cose, il verbo *essere*,
  aggettivi e prime frasi complete (livello «mai visto il latino»).
- **Unità 4 — I casi latini** — cosa sono i casi, la funzione di ognuno,
  soggetto/oggetto e i complementi (genitivo, dativo, ablativo).
- **Unità 5 — La prima declinazione** — il modello *rosa, rosae*, le desinenze,
  e i primi esercizi di analisi e traduzione (livello base universitario).

Le unità 4 e 5 sono pensate per chi deve affrontare un corso universitario di
letteratura latina partendo da zero: introducono la morfologia e l'analisi, il
vero cuore dello studio del latino.

## Struttura del progetto

```
src/
  data/curriculum.ts   → il contenuto del corso (parole, frasi, esercizi)
  types.ts             → i tipi degli esercizi
  useProgress.ts       → salvataggio progressi, XP e streak
  components/
    Home.tsx           → mappa delle lezioni
    LessonPlayer.tsx   → svolgimento di una lezione
    Exercises.tsx      → i quattro tipi di esercizio
  styles.css           → grafica in stile Duolingo
```

## Idee per il futuro

- Audio con la pronuncia delle parole latine.
- Più unità (casi, tempi verbali, testi originali).
- Ripasso delle parole sbagliate (spaced repetition).
- Account e sincronizzazione tra dispositivi.
