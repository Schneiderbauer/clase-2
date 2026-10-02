// Word timings estimated from the script (Guion_Samary_02_Psiquiatria.pdf)
// distributed over each clip's speech by syllable count. Times are in ms on
// the SamaryVideo timeline. Adjust startMs here if a word drifts.
export type CaptionWord = {
  readonly text: string;
  readonly startMs: number;
  readonly key?: boolean;
};

export const CAPTION_PAGES: CaptionWord[][] = [
  [
    { text: "Te", startMs: 70 },
    { text: "falta", startMs: 190 },
    { text: "el", startMs: 430 },
    { text: "aire,", startMs: 550, key: true },
  ],
  [
    { text: "el", startMs: 1010 },
    { text: "corazón", startMs: 1130, key: true },
    { text: "se", startMs: 1490 },
    { text: "acelera", startMs: 1610 },
  ],
  [
    { text: "y", startMs: 2090 },
    { text: "pensás", startMs: 2210 },
    { text: "que", startMs: 2450 },
    { text: "te", startMs: 2570 },
    { text: "va", startMs: 2690 },
  ],
  [
    { text: "a", startMs: 2810 },
    { text: "dar", startMs: 2930 },
    { text: "algo", startMs: 3050 },
    { text: "grave:", startMs: 3290 },
  ],
  [
    { text: "probablemente", startMs: 3980 },
    { text: "sea", startMs: 4580 },
  ],
  [
    { text: "un", startMs: 4820 },
    { text: "ataque", startMs: 4940 },
    { text: "de", startMs: 5300 },
    { text: "pánico,", startMs: 5420, key: true },
  ],
  [
    { text: "no", startMs: 6000 },
    { text: "un", startMs: 6120 },
    { text: "infarto.", startMs: 6240, key: true },
  ],
  [
    { text: "Es", startMs: 7050 },
    { text: "una", startMs: 7170 },
    { text: "descarga", startMs: 7410 },
    { text: "real", startMs: 7770, key: true },
  ],
  [
    { text: "de", startMs: 8010 },
    { text: "tu", startMs: 8130 },
    { text: "cuerpo,", startMs: 8250 },
  ],
  [
    { text: "no", startMs: 8710 },
    { text: "está", startMs: 8830 },
    { text: "en", startMs: 9070 },
    { text: "tu", startMs: 9190 },
    { text: "cabeza.", startMs: 9310, key: true },
  ],
  [
    { text: "El", startMs: 9750 },
    { text: "problema", startMs: 9871 },
    { text: "es", startMs: 10233 },
    { text: "cuando", startMs: 10354 },
  ],
  [
    { text: "empieza", startMs: 10596 },
    { text: "a", startMs: 10958 },
    { text: "pasar", startMs: 11079 },
    { text: "seguido", startMs: 11321, key: true },
  ],
  [
    { text: "y", startMs: 11684 },
    { text: "organizás", startMs: 11804 },
    { text: "tu", startMs: 12288 },
    { text: "vida", startMs: 12409, key: true },
  ],
  [
    { text: "para", startMs: 12650 },
    { text: "evitar", startMs: 12892 },
    { text: "que", startMs: 13255 },
    { text: "vuelva.", startMs: 13375 },
  ],
  [
    { text: "Ahí", startMs: 14067 },
    { text: "ya", startMs: 14309 },
    { text: "no", startMs: 14430 },
    { text: "alcanza", startMs: 14551 },
  ],
  [
    { text: "con", startMs: 14913 },
    { text: "respirar", startMs: 15034, key: true },
    { text: "profundo:", startMs: 15396, key: true },
  ],
  [
    { text: "hace", startMs: 16209 },
    { text: "falta", startMs: 16451 },
    { text: "un", startMs: 16692 },
  ],
  [
    { text: "abordaje", startMs: 16813, key: true },
    { text: "profesional,", startMs: 17297, key: true },
  ],
  [
    { text: "con", startMs: 17940 },
    { text: "terapia", startMs: 18063, key: true },
    { text: "y,", startMs: 18431 },
  ],
  [
    { text: "si", startMs: 18774 },
    { text: "hace", startMs: 18896 },
    { text: "falta,", startMs: 19142 },
  ],
  [
    { text: "medicación", startMs: 19607, key: true },
    { text: "bien", startMs: 20098 },
    { text: "indicada.", startMs: 20221 },
  ],
  [
    { text: "Si", startMs: 21162 },
    { text: "esto", startMs: 21285 },
    { text: "te", startMs: 21530 },
    { text: "pasa", startMs: 21653 },
    { text: "seguido,", startMs: 21899, key: true },
  ],
  [
    { text: "escribinos", startMs: 22487 },
    { text: "por", startMs: 22978 },
    { text: "DM", startMs: 23101, key: true },
  ],
  [
    { text: "y", startMs: 23469 },
    { text: "te", startMs: 23592 },
    { text: "contamos", startMs: 23714 },
  ],
  [
    { text: "cómo", startMs: 24083 },
    { text: "podemos", startMs: 24328 },
    { text: "acompañarte.", startMs: 24696, key: true },
  ],
];
