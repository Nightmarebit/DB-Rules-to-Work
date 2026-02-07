export type MeasureType = 'uv-sperrung' | 'annäherungsstrecke' | 'v11' | 'forbidden';

export interface DecisionNode {
  id: string;
  type: 'question' | 'result';
  question?: { de: string; ru: string; en: string; ar: string };
  options?: {
    label: { de: string; ru: string; en: string; ar: string };
    nextNodeId: string;
  }[];
  result?: {
    measure: MeasureType;
    title: { de: string; ru: string; en: string; ar: string };
    explanation: { de: string; ru: string; en: string; ar: string };
    procedure: { de: string[]; ru: string[]; en: string[]; ar: string[] };
  };
}

export const decisionTree: DecisionNode[] = [
  {
    id: 'start',
    type: 'question',
    question: {
      de: 'Was ist die maximale Zuggeschwindigkeit?',
      ru: 'Какая максимальная скорость поезда?',
      en: 'What is the maximum train speed?',
      ar: 'ما هي السرعة القصوى للقطار؟',
    },
    options: [
      {
        label: { de: '> 200 km/h', ru: '> 200 км/ч', en: '> 200 km/h', ar: '> 200 كم/ساعة' },
        nextNodeId: 'result-uv-mandatory',
      },
      {
        label: { de: '≤ 200 km/h', ru: '≤ 200 км/ч', en: '≤ 200 km/h', ar: '≤ 200 كم/ساعة' },
        nextNodeId: 'q-sichtweite',
      },
    ],
  },
  {
    id: 'q-sichtweite',
    type: 'question',
    question: {
      de: 'Wie ist die Sichtweite?',
      ru: 'Какая видимость?',
      en: 'What is the visibility?',
      ar: 'ما مدى الرؤية؟',
    },
    options: [
      {
        label: { de: '< 500 m (Nebel, Dunkelheit)', ru: '< 500 м (туман, темнота)', en: '< 500 m (fog, darkness)', ar: '< 500 م (ضباب، ظلام)' },
        nextNodeId: 'result-uv-only',
      },
      {
        label: { de: '≥ 500 m', ru: '≥ 500 м', en: '≥ 500 m', ar: '≥ 500 م' },
        nextNodeId: 'q-v11-zertifikat',
      },
    ],
  },
  {
    id: 'q-v11-zertifikat',
    type: 'question',
    question: {
      de: 'Sind Sie V11-zertifiziert?',
      ru: 'У вас есть сертификат V11?',
      en: 'Are you V11 certified?',
      ar: 'هل أنت حاصل على شهادة V11؟',
    },
    options: [
      { label: { de: 'Ja', ru: 'Да', en: 'Yes', ar: 'نعم' }, nextNodeId: 'q-gleislage' },
      { label: { de: 'Nein', ru: 'Нет', en: 'No', ar: 'لا' }, nextNodeId: 'result-annaherung-uv' },
    ],
  },
  {
    id: 'q-gleislage',
    type: 'question',
    question: {
      de: 'Welche Gleislage?',
      ru: 'Какой тип пути?',
      en: 'What track type?',
      ar: 'ما نوع المسار؟',
    },
    options: [
      {
        label: { de: 'Innengleis (Züge von beiden Seiten)', ru: 'Внутренний путь (поезда с двух сторон)', en: 'Inner track (trains both sides)', ar: 'مسار داخلي (قطارات من الجانبين)' },
        nextNodeId: 'result-uv-only',
      },
      {
        label: { de: 'Arbeitsgleis mit Sicherheitsraum', ru: 'Рабочий путь с зоной безопасности', en: 'Working track with safety space', ar: 'مسار عمل مع مساحة سلامة' },
        nextNodeId: 'result-v11-or-annaherung',
      },
    ],
  },
  {
    id: 'result-uv-mandatory',
    type: 'result',
    result: {
      measure: 'uv-sperrung',
      title: { de: 'UV-Sperrung erforderlich', ru: 'Требуется UV-Sperrung', en: 'UV-Sperrung required', ar: 'UV-Sperrung مطلوبة' },
      explanation: {
        de: 'Bei Geschwindigkeiten über 200 km/h ist nur UV-Sperrung zulässig.',
        ru: 'При скорости более 200 км/ч допускается только UV-Sperrung.',
        en: 'At speeds over 200 km/h only UV-Sperrung is allowed.',
        ar: 'عند سرعات فوق 200 كم/ساعة يُسمح فقط بـ UV-Sperrung.',
      },
      procedure: {
        de: ['UV-Sperrung bei Fdl anfordern', 'Freigabe abwarten', 'Arbeit aufnehmen', 'LÜ-Sendung nach Ende'],
        ru: ['Запросить UV-Sperrung у диспетчера', 'Дождаться разрешения', 'Приступить к работе', 'Передать LÜ-Sendung по окончании'],
        en: ['Request UV-Sperrung from signaller', 'Wait for clearance', 'Start work', 'Send LÜ after completion'],
        ar: ['طلب UV-Sperrung من المراقب', 'انتظار الإذن', 'بدء العمل', 'إرسال LÜ بعد الانتهاء'],
      },
    },
  },
  {
    id: 'result-uv-only',
    type: 'result',
    result: {
      measure: 'uv-sperrung',
      title: { de: 'Nur UV-Sperrung', ru: 'Только UV-Sperrung', en: 'UV-Sperrung only', ar: 'UV-Sperrung فقط' },
      explanation: {
        de: 'Sichtweite unter 500 m oder Innengleis — V11 und Annäherungsstrecke nicht zulässig.',
        ru: 'Видимость менее 500 м или внутренний путь — V11 и Annäherungsstrecke не допускаются.',
        en: 'Visibility under 500 m or inner track — V11 and train approach not allowed.',
        ar: 'رؤية أقل من 500 م أو مسار داخلي — V11 ومراقبة الاقتراب غير مسموح.',
      },
      procedure: {
        de: ['UV-Sperrung bei Fdl anfordern', 'Freigabe abwarten', 'Arbeit aufnehmen'],
        ru: ['Запросить UV-Sperrung у Fdl', 'Дождаться разрешения', 'Приступить к работе'],
        en: ['Request UV-Sperrung from Fdl', 'Wait for clearance', 'Start work'],
        ar: ['طلب UV-Sperrung من Fdl', 'انتظار الإذن', 'بدء العمل'],
      },
    },
  },
  {
    id: 'result-annaherung-uv',
    type: 'result',
    result: {
      measure: 'annäherungsstrecke',
      title: { de: 'Annäherungsstrecke oder UV-Sperrung', ru: 'Annäherungsstrecke или UV-Sperrung', en: 'Train approach or UV-Sperrung', ar: 'مراقبة الاقتراب أو UV-Sperrung' },
      explanation: {
        de: 'Ohne V11-Zertifikat: Annäherungsstrecke anfordern oder UV-Sperrung.',
        ru: 'Без сертификата V11: запросить Annäherungsstrecke или UV-Sperrung.',
        en: 'Without V11: request train approach monitoring or UV-Sperrung.',
        ar: 'بدون V11: طلب مراقبة الاقتراب أو UV-Sperrung.',
      },
      procedure: {
        de: ['Bei Fdl Annäherungsstrecke oder UV-Sperrung anfordern', 'Rückweiche festlegen', 'Arbeit aufnehmen'],
        ru: ['Запросить у Fdl Annäherungsstrecke или UV-Sperrung', 'Определить убежище', 'Приступить к работе'],
        en: ['Request train approach or UV-Sperrung from Fdl', 'Identify escape route', 'Start work'],
        ar: ['طلب مراقبة الاقتراب أو UV-Sperrung من Fdl', 'تحديد مسار الهروب', 'بدء العمل'],
      },
    },
  },
  {
    id: 'result-v11-or-annaherung',
    type: 'result',
    result: {
      measure: 'v11',
      title: { de: 'V11 oder Annäherungsstrecke möglich', ru: 'Возможны V11 или Annäherungsstrecke', en: 'V11 or train approach possible', ar: 'V11 أو مراقبة الاقتراب ممكنة' },
      explanation: {
        de: 'Sichtweite ≥ 500 m, V11-zertifiziert, Sicherheitsraum — Sie können V11 (Selbstsicherer) oder Annäherungsstrecke wählen.',
        ru: 'Видимость ≥ 500 м, сертификат V11, зона безопасности — можно выбрать V11 или Annäherungsstrecke.',
        en: 'Visibility ≥ 500 m, V11 certified, safety space — you may choose V11 or train approach.',
        ar: 'رؤية ≥ 500 م، شهادة V11، مساحة سلامة — يمكنك اختيار V11 أو مراقبة الاقتراب.',
      },
      procedure: {
        de: ['V11: Rückweiche festlegen, Gleis beobachten', 'Oder Annäherungsstrecke bei Fdl anfordern', 'Arbeit aufnehmen'],
        ru: ['V11: определить убежище, наблюдать за путём', 'Или запросить Annäherungsstrecke у Fdl', 'Приступить к работе'],
        en: ['V11: identify escape route, watch track', 'Or request train approach from Fdl', 'Start work'],
        ar: ['V11: حدد مسار الهروب، راقب المسار', 'أو اطلب مراقبة الاقتراب من Fdl', 'ابدأ العمل'],
      },
    },
  },
];
