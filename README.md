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
  - abbinamento parola ↔ significato.
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
- **Salvataggio automatico** dei progressi nel browser (localStorage).
- **Mascotte animata** 🗿: un busto di marmo romano dall'aria sarcastica, con
  tre umori animati e **battute ironiche** a rotazione (saluti, feedback,
  fine lezione). Le frasi sono in `src/quips.ts`, facilissime da modificare.
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

- **Pronuntiatio** — come si legge il latino: suoni particolari e accento (con audio).
- **Unità 1–3** — primo contatto: saluti, persone, cose, il verbo *essere*,
  aggettivi e prime frasi complete (livello «mai visto il latino»).
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

Le unità di grammatica sono pensate per chi deve affrontare un corso
universitario di letteratura latina partendo da zero: introducono la morfologia
e l'analisi, il vero cuore dello studio del latino.

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
  styles.css           → grafica e identità visiva di Ianua
```

## Idee per il futuro

- Audio con la pronuncia delle parole latine.
- Più unità (casi, tempi verbali, testi originali).
- Ripasso delle parole sbagliate (spaced repetition).
- Account e sincronizzazione tra dispositivi.
