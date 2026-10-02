// Word timings from Whisper large-v3 + wav2vec2 forced alignment (ms).
export type Word = {
  readonly text: string;
  readonly startMs: number;
  readonly endMs: number;
  readonly key?: boolean;
};

export const PAGES: Word[][] = [
  [
    { text: "¿Tenés", startMs: 80, endMs: 300 },
    { text: "un", startMs: 340, endMs: 400 },
    { text: "amigo", startMs: 440, endMs: 681, key: true },
    { text: "o", startMs: 741, endMs: 761 },
    { text: "familiar", startMs: 821, endMs: 1161, key: true },
  ],
  [
    { text: "que", startMs: 1221, endMs: 1281 },
    { text: "tiene", startMs: 1341, endMs: 1501 },
    { text: "que", startMs: 1542, endMs: 1602 },
    { text: "asegurar", startMs: 1622, endMs: 1962 },
  ],
  [
    { text: "su", startMs: 2062, endMs: 2142 },
    { text: "auto", startMs: 2222, endMs: 2462, key: true },
    { text: "o", startMs: 2583, endMs: 2603 },
    { text: "moto?", startMs: 2663, endMs: 2883, key: true },
  ],
  [
    { text: "Quedate", startMs: 3163, endMs: 3403 },
    { text: "viendo", startMs: 3443, endMs: 3583 },
    { text: "este", startMs: 3624, endMs: 3724 },
    { text: "video.", startMs: 3744, endMs: 3924 },
  ],
  [
    { text: "En", startMs: 4024, endMs: 4084 },
    { text: "Mundo", startMs: 4104, endMs: 4264, key: true },
    { text: "Seguro", startMs: 4344, endMs: 4604, key: true },
  ],
  [
    { text: "tenemos", startMs: 4725, endMs: 4965 },
    { text: "una", startMs: 5045, endMs: 5125 },
    { text: "promoción", startMs: 5185, endMs: 5565, key: true },
    { text: "especial.", startMs: 5666, endMs: 6006, key: true },
  ],
  [
    { text: "Si", startMs: 6086, endMs: 6146 },
    { text: "tenés", startMs: 6186, endMs: 6366 },
    { text: "un", startMs: 6426, endMs: 6466 },
    { text: "recomendado", startMs: 6506, endMs: 6927, key: true },
  ],
  [
    { text: "que", startMs: 6987, endMs: 7067 },
    { text: "quiera", startMs: 7087, endMs: 7247 },
    { text: "asegurar", startMs: 7287, endMs: 7567 },
    { text: "su", startMs: 7607, endMs: 7687 },
    { text: "vehículo,", startMs: 7728, endMs: 8068 },
  ],
  [
    { text: "tiene", startMs: 8148, endMs: 8288 },
    { text: "un", startMs: 8308, endMs: 8348 },
    { text: "30%", startMs: 8408, endMs: 9009, key: true },
  ],
  [
    { text: "de", startMs: 9049, endMs: 9089 },
    { text: "descuento", startMs: 9109, endMs: 9389, key: true },
  ],
  [
    { text: "en", startMs: 9529, endMs: 9589 },
    { text: "la", startMs: 9609, endMs: 9649 },
    { text: "próxima", startMs: 9709, endMs: 9990 },
    { text: "póliza.", startMs: 10070, endMs: 10350, key: true },
  ],
  [
    { text: "Mandanos", startMs: 10450, endMs: 10730 },
    { text: "un", startMs: 10771, endMs: 10811 },
    { text: "mensaje", startMs: 10851, endMs: 11131, key: true },
  ],
  [
    { text: "por", startMs: 11191, endMs: 11271 },
    { text: "privado", startMs: 11331, endMs: 11651, key: true },
  ],
  [
    { text: "o", startMs: 11892, endMs: 11912 },
    { text: "envíale", startMs: 12012, endMs: 12412 },
    { text: "este", startMs: 12512, endMs: 12652 },
    { text: "video", startMs: 12692, endMs: 12953, key: true },
  ],
  [
    { text: "a", startMs: 13073, endMs: 13093 },
    { text: "esa", startMs: 13153, endMs: 13273 },
    { text: "persona.", startMs: 13353, endMs: 13613, key: true },
  ],
];
