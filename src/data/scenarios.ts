export interface Scenario {
  id: string;
  title: { de: string; ru: string; en: string; ar: string };
  situationText: { de: string; ru: string; en: string; ar: string };
  question: { de: string; ru: string; en: string; ar: string };
  options: {
    id: string;
    text: { de: string; ru: string; en: string; ar: string };
    isCorrect: boolean;
  }[];
  explanation: { de: string; ru: string; en: string; ar: string };
  relatedRules?: string[];
}

export const scenarios: Scenario[] = [
  {
    id: 'scenario-fog',
    title: {
      de: 'Schneeräumung bei Nebel',
      ru: 'Уборка снега в тумане',
      en: 'Snow removal in fog',
      ar: 'إزالة الثلوج في الضباب',
    },
    situationText: {
      de: 'Sie sollen Schnee von Gleis 2 räumen. Es ist neblig, Sichtweite 150 m. Höchstgeschwindigkeit 120 km/h. Sie sind V11-zertifiziert.',
      ru: 'Вам нужно убрать снег с пути 2. Туман, видимость 150 м. Макс. скорость 120 км/ч. У вас сертификат V11.',
      en: 'You need to clear snow from Track 2. Foggy, visibility 150 m. Max speed 120 km/h. You are V11 certified.',
      ar: 'تحتاج إزالة الثلوج من المسار 2. ضباب، رؤية 150 م. السرعة القصوى 120 كم/ساعة. أنت حاصل على V11.',
    },
    question: {
      de: 'Welche Sicherungsmaßnahme ist erforderlich?',
      ru: 'Какая мера безопасности требуется?',
      en: 'What safety measure is required?',
      ar: 'ما إجراء السلامة المطلوب؟',
    },
    options: [
      { id: 'a', text: { de: 'V11', ru: 'V11', en: 'V11', ar: 'V11' }, isCorrect: false },
      { id: 'b', text: { de: 'Annäherungsstrecke', ru: 'Annäherungsstrecke', en: 'Train approach', ar: 'مراقبة الاقتراب' }, isCorrect: false },
      { id: 'c', text: { de: 'UV-Sperrung', ru: 'UV-Sperrung', en: 'UV-Sperrung', ar: 'UV-Sperrung' }, isCorrect: true },
      { id: 'd', text: { de: 'Keine', ru: 'Не требуется', en: 'None', ar: 'لا شيء' }, isCorrect: false },
    ],
    explanation: {
      de: 'Sichtweite 150 m < 500 m → V11 verboten. Nebel → Annäherungsstrecke verboten. Nur UV-Sperrung.',
      ru: 'Видимость 150 м < 500 м → V11 запрещён. Туман → Annäherungsstrecke запрещена. Только UV-Sperrung.',
      en: 'Visibility 150 m < 500 m → V11 forbidden. Fog → train approach forbidden. Only UV-Sperrung.',
      ar: 'الرؤية 150 م < 500 م → V11 ممنوع. الضباب → مراقبة الاقتراب ممنوعة. فقط UV-Sperrung.',
    },
    relatedRules: ['v11-requirements', 'visibility-rules'],
  },
  {
    id: 'scenario-clear',
    title: {
      de: 'Schneeräumung bei guter Sicht',
      ru: 'Уборка снега при хорошей видимости',
      en: 'Snow removal in clear weather',
      ar: 'إزالة الثلوج في طقس صافٍ',
    },
    situationText: {
      de: 'Gleis 3, Schneeräumung. Sichtweite 600 m, 80 km/h. V11-zertifiziert. Sicherheitsraum vorhanden.',
      ru: 'Путь 3, уборка снега. Видимость 600 м, 80 км/ч. Сертификат V11. Зона безопасности есть.',
      en: 'Track 3, snow removal. Visibility 600 m, 80 km/h. V11 certified. Safety space available.',
      ar: 'المسار 3، إزالة ثلوج. رؤية 600 م، 80 كم/س. شهادة V11. مساحة سلامة متوفرة.',
    },
    question: {
      de: 'Was ist zulässig?',
      ru: 'Что допускается?',
      en: 'What is allowed?',
      ar: 'ما المسموح؟',
    },
    options: [
      { id: 'a', text: { de: 'Nur UV-Sperrung', ru: 'Только UV-Sperrung', en: 'Only UV-Sperrung', ar: 'فقط UV-Sperrung' }, isCorrect: false },
      { id: 'b', text: { de: 'V11 oder Annäherungsstrecke oder UV-Sperrung', ru: 'V11 или Annäherungsstrecke или UV-Sperrung', en: 'V11 or train approach or UV-Sperrung', ar: 'V11 أو مراقبة الاقتراب أو UV-Sperrung' }, isCorrect: true },
      { id: 'c', text: { de: 'Ohne Sicherung', ru: 'Без защиты', en: 'No safety', ar: 'بدون سلامة' }, isCorrect: false },
    ],
    explanation: {
      de: 'Sicht ≥ 500 m, V11, Sicherheitsraum → V11, Annäherungsstrecke oder UV-Sperrung möglich.',
      ru: 'Видимость ≥ 500 м, V11, зона безопасности → возможны V11, Annäherungsstrecke или UV-Sperrung.',
      en: 'Visibility ≥ 500 m, V11, safety space → V11, train approach or UV-Sperrung possible.',
      ar: 'رؤية ≥ 500 م، V11، مساحة سلامة → V11 أو مراقبة الاقتراب أو UV-Sperrung ممكنة.',
    },
  },
  {
    id: 'scenario-highspeed',
    title: {
      de: 'Arbeit an der Hochgeschwindigkeitsstrecke',
      ru: 'Работа на высокоскоростной линии',
      en: 'Work on high-speed line',
      ar: 'العمل على خط السرعة العالية',
    },
    situationText: {
      de: 'Arbeit an Gleis mit 250 km/h. Gute Sicht, V11-zertifiziert.',
      ru: 'Работа на пути с 250 км/ч. Хорошая видимость, сертификат V11.',
      en: 'Work on track with 250 km/h. Good visibility, V11 certified.',
      ar: 'عمل على مسار 250 كم/س. رؤية جيدة، شهادة V11.',
    },
    question: {
      de: 'Welche Maßnahme?',
      ru: 'Какая мера?',
      en: 'What measure?',
      ar: 'ما الإجراء؟',
    },
    options: [
      { id: 'a', text: { de: 'V11', ru: 'V11', en: 'V11', ar: 'V11' }, isCorrect: false },
      { id: 'b', text: { de: 'UV-Sperrung', ru: 'UV-Sperrung', en: 'UV-Sperrung', ar: 'UV-Sperrung' }, isCorrect: true },
    ],
    explanation: {
      de: '> 200 km/h → nur UV-Sperrung. V11 und Annäherungsstrecke nicht zulässig.',
      ru: '> 200 км/ч → только UV-Sperrung. V11 и Annäherungsstrecke не допускаются.',
      en: '> 200 km/h → UV-Sperrung only. V11 and train approach not allowed.',
      ar: '> 200 كم/س → UV-Sperrung فقط. V11 ومراقبة الاقتراب غير مسموح.',
    },
  },
  {
    id: 'scenario-innengleis',
    title: {
      de: 'Arbeit auf dem Innengleis',
      ru: 'Работа на внутреннем пути',
      en: 'Work on inner track',
      ar: 'العمل على المسار الداخلي',
    },
    situationText: {
      de: 'Innengleis, Sichtweite 600 m, V11-zertifiziert.',
      ru: 'Внутренний путь, видимость 600 м, сертификат V11.',
      en: 'Inner track, visibility 600 m, V11 certified.',
      ar: 'مسار داخلي، رؤية 600 م، شهادة V11.',
    },
    question: {
      de: 'Was gilt?',
      ru: 'Что применяется?',
      en: 'What applies?',
      ar: 'ما ينطبق؟',
    },
    options: [
      { id: 'a', text: { de: 'V11 möglich', ru: 'V11 возможен', en: 'V11 possible', ar: 'V11 ممكن' }, isCorrect: false },
      { id: 'b', text: { de: 'Nur UV-Sperrung (Züge von beiden Seiten)', ru: 'Только UV-Sperrung (поезда с двух сторон)', en: 'UV-Sperrung only (trains both sides)', ar: 'UV-Sperrung فقط (قطارات من الجانبين)' }, isCorrect: true },
    ],
    explanation: {
      de: 'Innengleis → Züge von beiden Seiten. V11 und Annäherungsstrecke nicht zulässig. Nur UV-Sperrung.',
      ru: 'Внутренний путь → поезда с двух сторон. V11 и Annäherungsstrecke не допускаются. Только UV-Sperrung.',
      en: 'Inner track → trains from both sides. V11 and train approach not allowed. UV-Sperrung only.',
      ar: 'مسار داخلي → قطارات من الجانبين. V11 ومراقبة الاقتراب غير مسموح. UV-Sperrung فقط.',
    },
  },
  {
    id: 'scenario-no-v11',
    title: {
      de: 'Ohne V11-Zertifikat',
      ru: 'Без сертификата V11',
      en: 'Without V11 certification',
      ar: 'بدون شهادة V11',
    },
    situationText: {
      de: 'Gute Sicht 600 m, Arbeitsgleis mit Sicherheitsraum. Sie haben kein V11-Zertifikat.',
      ru: 'Хорошая видимость 600 м, рабочий путь с зоной безопасности. У вас нет сертификата V11.',
      en: 'Good visibility 600 m, working track with safety space. You do not have V11.',
      ar: 'رؤية جيدة 600 م، مسار عمل مع مساحة سلامة. ليس لديك V11.',
    },
    question: {
      de: 'Was können Sie anfordern?',
      ru: 'Что вы можете запросить?',
      en: 'What can you request?',
      ar: 'ماذا يمكنك طلبه؟',
    },
    options: [
      { id: 'a', text: { de: 'V11', ru: 'V11', en: 'V11', ar: 'V11' }, isCorrect: false },
      { id: 'b', text: { de: 'Annäherungsstrecke oder UV-Sperrung', ru: 'Annäherungsstrecke или UV-Sperrung', en: 'Train approach or UV-Sperrung', ar: 'مراقبة الاقتراب أو UV-Sperrung' }, isCorrect: true },
    ],
    explanation: {
      de: 'Ohne V11-Zertifikat ist V11 nicht zulässig. Annäherungsstrecke oder UV-Sperrung bei Fdl anfordern.',
      ru: 'Без сертификата V11 применение V11 не допускается. Запросить Annäherungsstrecke или UV-Sperrung у Fdl.',
      en: 'Without V11 certification, V11 is not allowed. Request train approach or UV-Sperrung from Fdl.',
      ar: 'بدون شهادة V11، V11 غير مسموح. اطلب مراقبة الاقتراب أو UV-Sperrung من Fdl.',
    },
  },
];
