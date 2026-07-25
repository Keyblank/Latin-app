// Le battute della mascotte (il busto di marmo sarcastico).
// Tono: ironico, latino, per un pubblico da liceo/università. Mai cattivo.
// Facile da modificare: aggiungi o togli frasi dalle liste.

export type QuipKind = 'home' | 'correct' | 'wrong' | 'win' | 'fail'

const QUIPS: Record<QuipKind, string[]> = {
  home: [
    'Ave. Vediamo se oggi combini qualcosa di buono.',
    'Di nuovo tu? I Romani apprezzano la costanza. Io mi accontento.',
    'Salve. La gloria di Roma può attendere, ma non in eterno.',
    'Sono qui da duemila anni. Cosa vuoi che sia un’altra lezione.',
    'Bentornato. Cicerone chiedeva di te. Mentiva, ovviamente.',
    'Coraggio: peggio dei barbari non puoi fare. Spero.',
  ],
  correct: [
    'Corretto. Che colpo di fortuna.',
    'Esatto. Non lo dirò a nessuno, ma sono colpito.',
    'Giusto. Roma è orgogliosa. Con moderazione.',
    'Bene. Cicerone approva, a denti stretti.',
    'Perfetto. Continua così e diventerai quasi bravo.',
    'Ottimo. Persino un senatore annuirebbe.',
  ],
  wrong: [
    'No. Nemmeno i barbari, dai.',
    'Ahi. I Romani, dall’aldilà, sospirano.',
    'Sbagliato. Ma con grande sicurezza, complimenti.',
    'No. Questo lo teniamo tra noi due.',
    'Errore. Cesare ha appena chiuso gli occhi.',
    'Non proprio. Ci hai messo del sentimento, però.',
  ],
  win: [
    'Sopravvissuto. Roma non è caduta, oggi.',
    'Fatto. Un sospiro di sollievo per Cicerone.',
    'Lezione domata. Il Senato prende nota.',
    'Non male. Quasi quasi ti do la cittadinanza.',
  ],
  fail: [
    'Vite finite, come la Repubblica.',
    'Sconfitta. Ma anche Roma perse qualche battaglia.',
    'Basta per oggi. Ritírati con dignità, da bravo stoico.',
  ],
}

/** Restituisce una battuta a caso del tipo richiesto. */
export function pickQuip(kind: QuipKind): string {
  const list = QUIPS[kind]
  return list[Math.floor(Math.random() * list.length)]
}
