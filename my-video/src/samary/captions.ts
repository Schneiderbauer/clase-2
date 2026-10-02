// Word timings from Whisper (large-v3) transcription, refined with
// wav2vec2 forced alignment against the actual audio. Times are in ms on the
// SamaryVideo timeline. The text is what she actually says on camera.
export type CaptionWord = {
  readonly text: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly key?: boolean;
};

export const CAPTION_PAGES: CaptionWord[][] = [
  [
    { text: "Te", startMs: 140, endMs: 220 },
    { text: "falta", startMs: 280, endMs: 520 },
    { text: "el", startMs: 540, endMs: 580 },
    { text: "aire,", startMs: 640, endMs: 903, key: true },
  ],
  [
    { text: "el", startMs: 1063, endMs: 1103 },
    { text: "corazón", startMs: 1143, endMs: 1443, key: true },
    { text: "se", startMs: 1483, endMs: 1563 },
    { text: "te", startMs: 1623, endMs: 1683 },
    { text: "acelera,", startMs: 1723, endMs: 2163 },
  ],
  [
    { text: "tenés", startMs: 2523, endMs: 2763 },
    { text: "miedo", startMs: 2843, endMs: 3107 },
  ],
  [
    { text: "porque", startMs: 3183, endMs: 3367 },
    { text: "no", startMs: 3387, endMs: 3427 },
    { text: "tenés", startMs: 3467, endMs: 3667 },
    { text: "control", startMs: 3727, endMs: 4127, key: true },
  ],
  [
    { text: "de", startMs: 4167, endMs: 4207 },
    { text: "la", startMs: 4247, endMs: 4307 },
    { text: "situación", startMs: 4367, endMs: 4927 },
  ],
  [
    { text: "y", startMs: 5067, endMs: 5087 },
    { text: "pensás", startMs: 5147, endMs: 5367 },
    { text: "que", startMs: 5407, endMs: 5487 },
    { text: "probablemente", startMs: 5547, endMs: 6090 },
  ],
  [
    { text: "te", startMs: 6170, endMs: 6230 },
    { text: "puede", startMs: 6290, endMs: 6450 },
    { text: "pasar", startMs: 6510, endMs: 6730 },
    { text: "algo", startMs: 6790, endMs: 6930 },
    { text: "grave.", startMs: 6990, endMs: 7270, key: true },
  ],
  [
    { text: "Eso", startMs: 7933, endMs: 8153 },
    { text: "puede", startMs: 8293, endMs: 8433 },
    { text: "llegar", startMs: 8453, endMs: 8633 },
    { text: "a", startMs: 8713, endMs: 8733 },
    { text: "ser", startMs: 8793, endMs: 8933 },
  ],
  [
    { text: "un", startMs: 9093, endMs: 9153 },
    { text: "ataque", startMs: 9193, endMs: 9413 },
    { text: "de", startMs: 9433, endMs: 9473 },
    { text: "pánico.", startMs: 9553, endMs: 9853, key: true },
  ],
  [
    { text: "Un", startMs: 10020, endMs: 10060 },
    { text: "ataque", startMs: 10120, endMs: 10300 },
    { text: "de", startMs: 10340, endMs: 10380 },
    { text: "pánico", startMs: 10420, endMs: 10720, key: true },
  ],
  [
    { text: "puede", startMs: 10900, endMs: 11040 },
    { text: "aparecer", startMs: 11080, endMs: 11360 },
    { text: "de", startMs: 11420, endMs: 11460 },
    { text: "golpe", startMs: 11520, endMs: 11860, key: true },
  ],
  [
    { text: "y", startMs: 12043, endMs: 12063 },
    { text: "sentirse", startMs: 12123, endMs: 12403 },
    { text: "muy", startMs: 12463, endMs: 12563 },
    { text: "intenso.", startMs: 12623, endMs: 13063, key: true },
  ],
  [
    { text: "Puede", startMs: 13403, endMs: 13583 },
    { text: "sentir", startMs: 13603, endMs: 13823 },
    { text: "mareos,", startMs: 13863, endMs: 14383 },
  ],
  [{ text: "temblores,", startMs: 14483, endMs: 15063 }],
  [
    { text: "presión", startMs: 15183, endMs: 15463 },
    { text: "en", startMs: 15483, endMs: 15543 },
    { text: "el", startMs: 15623, endMs: 15683 },
    { text: "pecho", startMs: 15763, endMs: 16103 },
  ],
  [
    { text: "o", startMs: 16463, endMs: 16487 },
    { text: "simplemente", startMs: 16567, endMs: 17083 },
    { text: "sentir", startMs: 17403, endMs: 17647 },
  ],
  [
    { text: "que", startMs: 17667, endMs: 17747 },
    { text: "algo", startMs: 17767, endMs: 17887 },
    { text: "malo", startMs: 17947, endMs: 18067, key: true },
    { text: "está", startMs: 18107, endMs: 18207 },
    { text: "por", startMs: 18267, endMs: 18347 },
    { text: "pasar.", startMs: 18407, endMs: 18647 },
  ],
  [
    { text: "Ahí", startMs: 19020, endMs: 19080 },
    { text: "ya", startMs: 19160, endMs: 19240 },
    { text: "no", startMs: 19300, endMs: 19340 },
    { text: "alcanza", startMs: 19420, endMs: 19843 },
  ],
  [
    { text: "con", startMs: 19883, endMs: 19963 },
    { text: "respirar", startMs: 20023, endMs: 20283 },
    { text: "profundo,", startMs: 20323, endMs: 20763 },
  ],
  [
    { text: "hace", startMs: 21027, endMs: 21203 },
    { text: "falta", startMs: 21247, endMs: 21407 },
    { text: "un", startMs: 21427, endMs: 21507 },
  ],
  [
    { text: "abordaje", startMs: 21527, endMs: 21847 },
    { text: "terapéutico.", startMs: 21887, endMs: 22590, key: true },
  ],
  [
    { text: "Si", startMs: 23030, endMs: 23090 },
    { text: "te", startMs: 23130, endMs: 23190 },
    { text: "pasa", startMs: 23250, endMs: 23430 },
    { text: "esto", startMs: 23550, endMs: 23730 },
    { text: "seguido,", startMs: 23830, endMs: 24173 },
  ],
  [
    { text: "dejanos", startMs: 24233, endMs: 24513 },
    { text: "un", startMs: 24573, endMs: 24613 },
    { text: "mensaje", startMs: 24633, endMs: 25053, key: true },
  ],
  [
    { text: "que", startMs: 25153, endMs: 25253 },
    { text: "vamos", startMs: 25297, endMs: 25453 },
    { text: "a", startMs: 25497, endMs: 25517 },
    { text: "contarte", startMs: 25553, endMs: 25877 },
  ],
  [
    { text: "cómo", startMs: 25937, endMs: 26057 },
    { text: "te", startMs: 26117, endMs: 26177 },
    { text: "podemos", startMs: 26237, endMs: 26457 },
    { text: "ayudar.", startMs: 26517, endMs: 26797, key: true },
  ],
];
