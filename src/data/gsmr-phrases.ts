export interface GSMRPhrase {
  id: string;
  category: 'request' | 'confirm' | 'report' | 'emergency';
  scenario: { de: string; ru: string; en: string; ar: string };
  speaker: 'worker' | 'fdl';
  phrase: { de: string; ru: string; en: string; ar: string };
  blanks?: { position: number; type: 'name' | 'track' | 'km' | 'work' | 'time'; hint: { de: string; ru: string; en: string; ar: string } }[];
  pronunciation: { de: string; ru: string };
  audioFile?: string;
}

export const gsmrPhrases: GSMRPhrase[] = [
  {
    id: 'request-uv-sperrung',
    category: 'request',
    scenario: {
      de: 'UV-Sperrung anfordern',
      ru: 'Запрос UV-Sperrung',
      en: 'Request UV-Sperrung',
      ar: 'طلب UV-Sperrung',
    },
    speaker: 'worker',
    phrase: {
      de: 'Hier [Name], ich benötige eine UV-Sperrung für Gleis [X] von Kilometer [Y] bis Kilometer [Z] für [Arbeit].',
      ru: 'Hier [Имя], ich benötige eine UV-Sperrung für Gleis [X] von Kilometer [Y] bis Kilometer [Z] für [работа].',
      en: 'Here [Name], I need a UV-Sperrung for Track [X] from Kilometer [Y] to Kilometer [Z] for [work].',
      ar: 'هنا [الاسم]، أحتاج UV-Sperrung للمسار [X] من الكيلومتر [Y] إلى [Z] لـ [العمل].',
    },
    blanks: [
      { position: 5, type: 'name', hint: { de: 'Ihr Name', ru: 'Ваше имя', en: 'Your name', ar: 'اسمك' } },
      { position: 1, type: 'track', hint: { de: 'Gleisnummer', ru: 'Номер пути', en: 'Track number', ar: 'رقم المسار' } },
      { position: 2, type: 'km', hint: { de: 'Von km', ru: 'От км', en: 'From km', ar: 'من كم' } },
      { position: 3, type: 'km', hint: { de: 'Bis km', ru: 'До км', en: 'To km', ar: 'إلى كم' } },
      { position: 4, type: 'work', hint: { de: 'Art der Arbeit', ru: 'Вид работ', en: 'Type of work', ar: 'نوع العمل' } },
    ],
    pronunciation: {
      de: 'hiːɐ̯ | ɪç bəˈnøːtɪɡə ˈaɪnə uːfaʊ̯ ˈʃpɛʁʊŋ',
      ru: 'ХИР | ихь бе-НЁ-ти-ге АЙ-не У-ФАУ ШПЕ-рунг',
    },
  },
  {
    id: 'confirm-uv-sperrung',
    category: 'confirm',
    scenario: { de: 'UV-Sperrung bestätigen', ru: 'Подтверждение UV-Sperrung', en: 'Confirm UV-Sperrung', ar: 'تأكيد UV-Sperrung' },
    speaker: 'fdl',
    phrase: {
      de: 'UV-Sperrung für Gleis [X] von Kilometer [Y] bis Kilometer [Z] ist erteilt. Sie können die Arbeit aufnehmen.',
      ru: 'UV-Sperrung для пути [X] с км [Y] по км [Z] выдана. Можете приступать к работе.',
      en: 'UV-Sperrung for Track [X] from km [Y] to km [Z] is granted. You may start work.',
      ar: 'UV-Sperrung للمسار [X] من كم [Y] إلى [Z] ممنوحة. يمكنك بدء العمل.',
    },
    blanks: [
      { position: 1, type: 'track', hint: { de: 'Gleisnummer', ru: 'Номер пути', en: 'Track number', ar: 'رقم المسار' } },
      { position: 2, type: 'km', hint: { de: 'Von km', ru: 'От км', en: 'From km', ar: 'من كم' } },
      { position: 3, type: 'km', hint: { de: 'Bis km', ru: 'До км', en: 'To km', ar: 'إلى كم' } },
    ],
    pronunciation: { de: 'uːfaʊ̯ ˈʃpɛʁʊŋ ɪst ɛɐ̯ˈtaɪ̯lt', ru: 'У-ФАУ ШПЕ-рунг ист эр-ТАЙЛЬТ' },
  },
  {
    id: 'report-track-clear',
    category: 'report',
    scenario: { de: 'Gleis freigeben melden', ru: 'Сообщить об освобождении пути', en: 'Report track clear', ar: 'الإبلاغ عن تحرير المسار' },
    speaker: 'worker',
    phrase: {
      de: 'Hier [Name], Gleis [X] von Kilometer [Y] bis Kilometer [Z] ist frei. LÜ-Sendung.',
      ru: 'Hier [Имя], путь [X] с км [Y] по км [Z] свободен. LÜ-Sendung.',
      en: 'Here [Name], Track [X] from km [Y] to km [Z] is clear. LÜ-Sendung.',
      ar: 'هنا [الاسم]، المسار [X] من [Y] إلى [Z] حر. LÜ-Sendung.',
    },
    blanks: [
      { position: 1, type: 'name', hint: { de: 'Ihr Name', ru: 'Ваше имя', en: 'Your name', ar: 'اسمك' } },
      { position: 2, type: 'track', hint: { de: 'Gleisnummer', ru: 'Номер пути', en: 'Track number', ar: 'رقم المسار' } },
      { position: 3, type: 'km', hint: { de: 'Von km', ru: 'От км', en: 'From km', ar: 'من كم' } },
      { position: 4, type: 'km', hint: { de: 'Bis km', ru: 'До км', en: 'To km', ar: 'إلى كم' } },
    ],
    pronunciation: { de: 'ɡlaɪs ɪst fʁaɪ | elʔyː ˈzɛndʊŋ', ru: 'ГЛАЙС ист ФРАЙ | LÜ-Sendung' },
  },
  {
    id: 'emergency-stop',
    category: 'emergency',
    scenario: { de: 'Notfall melden', ru: 'Сообщить о чрезвычайной ситуации', en: 'Report emergency', ar: 'الإبلاغ عن طوارئ' },
    speaker: 'worker',
    phrase: {
      de: 'Achtung! Hier [Name], Notfall auf Gleis [X] bei Kilometer [Y]. Sofort alle Arbeiten einstellen!',
      ru: 'Внимание! Hier [Имя], чрезвычайная ситуация на пути [X] у км [Y]. Немедленно прекратить все работы!',
      en: 'Attention! Here [Name], emergency on Track [X] at km [Y]. Stop all work immediately!',
      ar: 'انتباه! هنا [الاسم]، طوارئ على المسار [X] عند كم [Y]. أوقفوا كل العمل فوراً!',
    },
    blanks: [
      { position: 1, type: 'name', hint: { de: 'Ihr Name', ru: 'Ваше имя', en: 'Your name', ar: 'اسمك' } },
      { position: 2, type: 'track', hint: { de: 'Gleisnummer', ru: 'Номер пути', en: 'Track number', ar: 'رقم المسار' } },
      { position: 3, type: 'km', hint: { de: 'Kilometer', ru: 'Километр', en: 'Kilometer', ar: 'الكيلومتر' } },
    ],
    pronunciation: { de: 'ˈaxtʊŋ | ˈnɔtˌfal', ru: 'АХ-тунг | НОТ-фаль' },
  },
  {
    id: 'request-annäherungsstrecke',
    category: 'request',
    scenario: { de: 'Annäherungsstrecke anfordern', ru: 'Запрос Annäherungsstrecke', en: 'Request train approach monitoring', ar: 'طلب مراقبة الاقتراب' },
    speaker: 'worker',
    phrase: {
      de: 'Hier [Name], ich benötige Annäherungsstrecke für Gleis [X] von Kilometer [Y] bis Kilometer [Z] für [Arbeit].',
      ru: 'Hier [Имя], ich benötige Annäherungsstrecke для пути [X] с км [Y] по км [Z] для [работа].',
      en: 'Here [Name], I need train approach monitoring for Track [X] from km [Y] to km [Z] for [work].',
      ar: 'هنا [الاسم]، أحتاج مراقبة الاقتراب للمسار [X] من [Y] إلى [Z] لـ [العمل].',
    },
    blanks: [
      { position: 1, type: 'name', hint: { de: 'Ihr Name', ru: 'Ваше имя', en: 'Your name', ar: 'اسمك' } },
      { position: 2, type: 'track', hint: { de: 'Gleisnummer', ru: 'Номер пути', en: 'Track number', ar: 'رقم المسار' } },
      { position: 3, type: 'km', hint: { de: 'Von km', ru: 'От км', en: 'From km', ar: 'من كم' } },
      { position: 4, type: 'km', hint: { de: 'Bis km', ru: 'До км', en: 'To km', ar: 'إلى كم' } },
      { position: 5, type: 'work', hint: { de: 'Art der Arbeit', ru: 'Вид работ', en: 'Type of work', ar: 'نوع العمل' } },
    ],
    pronunciation: { de: 'ˈanˌnɛːəʁʊŋsˌʃtʁɛkə', ru: 'АН-не-хе-рунгс-штре-ке' },
  },
];
