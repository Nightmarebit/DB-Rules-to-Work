export type RuleCategory =
  | 'v11'
  | 'uv-sperrung'
  | 'annäherungsstrecke'
  | 'forbidden'
  | 'golden'
  | 'common-mistakes'
  | 'oberleitung'
  | 'abstand'
  | 'kleidung';

export interface RuleItem {
  id: string;
  category: RuleCategory;
  title: { de: string; ru: string; en: string; ar: string };
  /** Short plain-language explanation (e.g. what V11 means and why) */
  explanation?: { de: string; ru: string; en: string; ar: string };
  content: { de: string[]; ru: string[]; en: string[]; ar: string[] };
  severity?: 'warning' | 'info' | 'success';
}

export const rules: RuleItem[] = [
  {
    id: 'v11-sichtweite',
    category: 'v11',
    title: { de: 'V11: Sichtweite', ru: 'V11: Видимость', en: 'V11: Visibility', ar: 'V11: الرؤية' },
    explanation: {
      de: 'V11 ist Arbeit im Gleis mit Selbstsicherung: Du beobachtest selbst herannahende Züge. Dafür brauchst du freie Sicht.',
      ru: 'V11 — это работа на пути с самоконтролем: ты сам следишь за приближающимися поездами. Поэтому нужна хорошая видимость.',
      en: 'V11 is track work with self-protection: you watch for approaching trains yourself. That’s why you need clear visibility.',
      ar: 'V11 هو العمل على المسار مع المراقبة الذاتية: أنت تراقب القطارات القادمة. لذلك تحتاج رؤية جيدة.',
    },
    content: {
      de: ['Mindest-Sichtweite 500 m.', 'Bei Nebel, Dunkelheit oder Sicht unter 500 m ist V11 verboten.'],
      ru: ['Минимальная видимость 500 м.', 'При тумане, темноте или видимости менее 500 м V11 запрещён.'],
      en: ['Minimum visibility 500 m.', 'In fog, darkness or visibility under 500 m, V11 is forbidden.'],
      ar: ['الحد الأدنى للرؤية 500 م.', 'في الضباب أو الظلام أو رؤية أقل من 500 م، V11 ممنوع.'],
    },
    severity: 'warning',
  },
  {
    id: 'v11-zertifikat',
    category: 'v11',
    title: { de: 'V11: Zertifizierung', ru: 'V11: Сертификация', en: 'V11: Certification', ar: 'V11: الشهادة' },
    explanation: {
      de: 'Für V11 musst du geschult und zertifiziert sein. Du kennst die Rückweiche und kannst sie schnell erreichen.',
      ru: 'Для работы по V11 нужна учёба и сертификат. Ты должен знать убежище (Rückweiche) и уметь быстро туда отойти.',
      en: 'For V11 you must be trained and certified. You know the escape point (Rückweiche) and can reach it quickly.',
      ar: 'للعمل بـ V11 تحتاج تدريباً وشهادة. تعرف نقطة الهروب (Rückweiche) وتستطيع الوصول إليها بسرعة.',
    },
    content: {
      de: ['Nur mit gültigem V11-Zertifikat.', 'Rückweiche muss bekannt und erreichbar sein.'],
      ru: ['Только при наличии действующего сертификата V11.', 'Убежище должно быть известно и достижимо.'],
      en: ['Only with valid V11 certification.', 'Escape route must be known and reachable.'],
      ar: ['فقط بشهادة V11 سارية.', 'يجب أن يكون مسار الهروب معروفاً وقابلاً للوصول.'],
    },
    severity: 'info',
  },
  {
    id: 'uv-anfordern',
    category: 'uv-sperrung',
    title: { de: 'UV-Sperrung anfordern', ru: 'Запрос UV-Sperrung', en: 'Request UV-Sperrung', ar: 'طلب UV-Sperrung' },
    explanation: {
      de: 'UV-Sperrung heißt: Der Fdl sperrt das Gleis für Züge. Du arbeitest, ohne selbst nach Zügen schauen zu müssen.',
      ru: 'UV-Sperrung — это когда диспетчер закрывает путь для поездов. Ты работаешь, не следя сам за поездами.',
      en: 'UV-Sperrung means the signaller blocks the track for trains. You work without having to watch for trains yourself.',
      ar: 'UV-Sperrung تعني أن المراقب يغلق المسار أمام القطارات. تعمل دون أن تراقب القطارات بنفسك.',
    },
    content: {
      de: ['Immer bei Fdl (Fahrdienstleiter) anfordern.', 'Gleis, Streckenbereich (km) und Art der Arbeit angeben.', 'Erst nach Freigabe Arbeit aufnehmen.'],
      ru: ['Всегда запрашивать у Fdl (диспетчера).', 'Указать путь, участок (км) и вид работ.', 'Приступать к работе только после разрешения.'],
      en: ['Always request from Fdl (signaller).', 'Specify track, section (km) and type of work.', 'Start work only after clearance.'],
      ar: ['اطلب دائماً من Fdl (المراقب).', 'حدد المسار والقطاع (كم) ونوع العمل.', 'ابدأ العمل فقط بعد الإذن.'],
    },
    severity: 'info',
  },
  {
    id: 'lü-sendung',
    category: 'uv-sperrung',
    title: { de: 'LÜ-Sendung nach Arbeit', ru: 'LÜ-Sendung после работ', en: 'LÜ-Sendung after work', ar: 'LÜ-Sendung بعد العمل' },
    explanation: {
      de: 'LÜ-Sendung = Rückmeldung an Fdl: „Arbeit beendet, Gleis frei“. Erst dann darf der Fdl Züge wieder durchlassen.',
      ru: 'LÜ-Sendung — это отбой диспетчеру: «Работы закончены, путь свободен». Только после этого Fdl снова пускает поезда.',
      en: 'LÜ-Sendung = report to Fdl: “Work finished, track clear”. Only then may the signaller allow trains again.',
      ar: 'LÜ-Sendung = تقرير لـ Fdl: «انتهى العمل، المسار حر». فقط بعدها يسمح المراقب للقطارات بالمرور.',
    },
    content: {
      de: ['Nach Ende der Arbeit LÜ-Sendung an Fdl melden.', 'Gleis erst nach Freigabe durch Fdl wieder befahrbar.'],
      ru: ['После окончания работ передать LÜ-Sendung диспетчеру.', 'Путь снова открыт только после разрешения Fdl.'],
      en: ['Report LÜ-Sendung to Fdl after work end.', 'Track open again only after Fdl clearance.'],
      ar: ['أبلغ Fdl بـ LÜ-Sendung بعد انتهاء العمل.', 'المسار مفتوح مرة أخرى فقط بعد إذن Fdl.'],
    },
    severity: 'success',
  },
  {
    id: 'annaherung-nebel',
    category: 'annäherungsstrecke',
    title: { de: 'Annäherungsstrecke: Wetter', ru: 'Annäherungsstrecke: Погода', en: 'Train approach: Weather', ar: 'مراقبة الاقتراب: الطقس' },
    explanation: {
      de: 'Annäherungsstrecke = Du beobachtest die Strecke in eine Richtung. Bei schlechter Sicht siehst du den Zug zu spät.',
      ru: 'Annäherungsstrecke — ты наблюдаешь за участком в одну сторону. При плохой видимости поезд заметишь слишком поздно.',
      en: 'Annäherungsstrecke = you watch the line in one direction. In poor visibility you’d see the train too late.',
      ar: 'Annäherungsstrecke = تراقب الخط في اتجاه واحد. في رؤية ضعيفة سترى القطار متأخراً.',
    },
    content: {
      de: ['Nicht bei Nebel, starkem Regen oder Dunkelheit.', 'Sichtweite mindestens 500 m erforderlich.'],
      ru: ['Не применять при тумане, сильном дожде или темноте.', 'Требуется видимость не менее 500 м.'],
      en: ['Not in fog, heavy rain or darkness.', 'Visibility at least 500 m required.'],
      ar: ['ليس في الضباب أو المطر الغزير أو الظلام.', 'رؤية 500 م على الأقل مطلوبة.'],
    },
    severity: 'warning',
  },
  {
    id: 'forbidden-ohne-freigabe',
    category: 'forbidden',
    title: { de: 'Betreten ohne Freigabe', ru: 'Вход без разрешения', en: 'Entering without clearance', ar: 'الدخول دون إذن' },
    explanation: {
      de: 'Ohne Freigabe weiß der Fdl nicht, dass du im Gleis bist. Züge können jederzeit kommen — Lebensgefahr.',
      ru: 'Без разрешения диспетчер не знает, что ты на пути. Поезда могут пойти в любой момент — смертельный риск.',
      en: 'Without clearance the signaller doesn’t know you’re on the track. Trains can come at any time — mortal danger.',
      ar: 'بدون إذن المراقب لا يعرف أنك على المسار. القطارات قد تأتي في أي وقت — خطر مميت.',
    },
    content: {
      de: ['Gleisbereich ohne Freigabe der Fdl nicht betreten.', 'Lebensgefahr durch Züge.'],
      ru: ['Не входить в зону путей без разрешения Fdl.', 'Смертельная опасность от поездов.'],
      en: ['Do not enter track area without Fdl clearance.', 'Mortal danger from trains.'],
      ar: ['لا تدخل منطقة المسار دون إذن Fdl.', 'خطر مميت من القطارات.'],
    },
    severity: 'warning',
  },
  {
    id: 'golden-1',
    category: 'golden',
    title: { de: 'Goldene Regel 1', ru: 'Золотое правило 1', en: 'Golden rule 1', ar: 'القاعدة الذهبية 1' },
    content: {
      de: ['Immer zuerst bei Fdl anfragen. Nie ohne Freigabe arbeiten.'],
      ru: ['Всегда сначала запрашивать у Fdl. Никогда не работать без разрешения.'],
      en: ['Always ask Fdl first. Never work without clearance.'],
      ar: ['اسأل Fdl أولاً دائماً. لا تعمل أبداً دون إذن.'],
    },
    severity: 'success',
  },
  {
    id: 'golden-2',
    category: 'golden',
    title: { de: 'Goldene Regel 2', ru: 'Золотое правило 2', en: 'Golden rule 2', ar: 'القاعدة الذهبية 2' },
    content: {
      de: ['Sichtweite und Gleislage prüfen. Richtige Sicherungsmaßnahme wählen (Entscheidungsbaum).'],
      ru: ['Проверять видимость и тип пути. Выбирать правильную меру (дерево решений).'],
      en: ['Check visibility and track type. Choose correct safety measure (decision tree).'],
      ar: ['تحقق من الرؤية ونوع المسار. اختر إجراء السلامة الصحيح (شجرة القرار).'],
    },
    severity: 'success',
  },
  // Oberleitung / контактная сеть
  {
    id: 'oberleitung-abstand',
    category: 'oberleitung',
    title: { de: 'Oberleitung: Abstand', ru: 'Контактная сеть: дистанция', en: 'Overhead line: distance', ar: 'خط الاتصال: المسافة' },
    explanation: {
      de: 'Die Oberleitung führt Strom für die Züge. Ohne Freigabe „spannungsfrei“ darfst du nicht in Reichweite — Stromschlag- und Lichtbogengefahr.',
      ru: 'Контактная сеть — это провод под напряжением для поездов. Без разрешения «spannungsfrei» приближаться нельзя: риск удара током и дугового разряда.',
      en: 'The overhead line carries power for trains. Without „spannungsfrei“ clearance you must not get in range — risk of electrocution and arc.',
      ar: 'خط الاتصال يحمل التيار للقطارات. دون إذن «spannungsfrei» لا تقترب — خطر الصعقة والقوس.',
    },
    content: {
      de: ['Mindestabstand 1,5 m zur unter Spannung stehenden Oberleitung.', 'Nur mit Freigabe „Oberleitung spannungsfrei“ arbeiten.'],
      ru: ['Минимальная дистанция 1,5 м до контактной сети под напряжением.', 'Работать только при разрешении «Оberleitung spannungsfrei».'],
      en: ['Minimum distance 1.5 m to live overhead line.', 'Work only after clearance „Oberleitung spannungsfrei“.'],
      ar: ['الحد الأدنى للمسافة 1.5 م من الخط تحت الجهد.', 'اعمل فقط بعد إذن «Oberleitung spannungsfrei».'],
    },
    severity: 'warning',
  },
  {
    id: 'oberleitung-leitern',
    category: 'oberleitung',
    title: { de: 'Oberleitung: Leitern & Geräte', ru: 'Контактная сеть: лестницы и техника', en: 'Overhead: ladders & equipment', ar: 'الخط: سلالم ومعدات' },
    explanation: {
      de: 'Schon in der Nähe der Oberleitung kann ein Lichtbogen entstehen — auch ohne Berührung. Leitern und Stangen vergrößern die Reichweite.',
      ru: 'Дуговой разряд может возникнуть уже вблизи контактной сети — даже без касания. Лестницы и штанги увеличивают опасную зону.',
      en: 'An arc can form just near the overhead line — even without contact. Ladders and poles extend the danger zone.',
      ar: 'قد ينشأ قوس قرب الخط حتى دون تلامس. السلالم والقضبان تزيد المنطقة الخطرة.',
    },
    content: {
      de: ['Keine Leitern, Stangen oder Geräte in Richtung Oberleitung recken.', 'Gefahr durch Lichtbogen auch ohne direkten Kontakt.'],
      ru: ['Не поднимать лестницы, штанги и оборудование в сторону контактной сети.', 'Опасность дугового разряда даже без касания.'],
      en: ['Do not extend ladders, poles or equipment toward overhead line.', 'Arc hazard even without direct contact.'],
      ar: ['لا تمد السلالم أو القضبان أو المعدات نحو الخط.', 'خطر القوس حتى دون تلامس مباشر.'],
    },
    severity: 'warning',
  },
  // Sicherheitsabstand
  {
    id: 'abstand-zug',
    category: 'abstand',
    title: { de: 'Sicherheitsabstand zum Zug', ru: 'Безопасная дистанция до поезда', en: 'Safe distance from train', ar: 'المسافة الآمنة من القطار' },
    explanation: {
      de: 'Vorbeifahrende Züge haben Überhang und Sog. 2 m Abstand mindern das Risiko, erfasst oder mitgerissen zu werden.',
      ru: 'У проходящего поезда есть габарит и воздушный поток. 2 м — минимум, чтобы не зацепило и не затянуло.',
      en: 'Passing trains have overhang and suction. 2 m distance reduces the risk of being hit or pulled in.',
      ar: 'القطارات المارة لها بروز وسحب. 2 م تقلل خطر الاصطدام أو الجذب.',
    },
    content: {
      de: ['Mindestens 2 m Abstand von vorbeifahrenden Zügen.', 'In Gleisnähe immer auf durchfahrende Züge achten.'],
      ru: ['Не менее 2 м от проходящих поездов.', 'Вблизи пути всегда следить за проходящими поездами.'],
      en: ['At least 2 m from passing trains.', 'Near track always watch for passing trains.'],
      ar: ['2 م على الأقل من القطارات المارة.', 'قرب المسار راقب دائماً القطارات المارة.'],
    },
    severity: 'warning',
  },
  {
    id: 'abstand-gleisrand',
    category: 'abstand',
    title: { de: 'Abstand Gleisrand', ru: 'Дистанция от края пути', en: 'Distance from track edge', ar: 'المسافة من حافة المسار' },
    content: {
      de: ['Arbeiten nur in ausreichendem Abstand vom Gleisrand.', 'Rückweiche bzw. sichere Stelle immer kennen.'],
      ru: ['Работать только на достаточном расстоянии от края пути.', 'Всегда знать убежище или безопасное место.'],
      en: ['Work only at sufficient distance from track edge.', 'Always know escape route or safe spot.'],
      ar: ['اعمل فقط على مسافة كافية من حافة المسار.', 'اعرف دائماً مسار الهروب أو النقطة الآمنة.'],
    },
    severity: 'info',
  },
  // Warnkleidung / СИЗ
  {
    id: 'kleidung-pflicht',
    category: 'kleidung',
    title: { de: 'Warnkleidung Pflicht', ru: 'Сигнальная одежда обязательна', en: 'High-vis clothing required', ar: 'الملابس العاكسة إلزامية' },
    explanation: {
      de: 'Im Gleis müssen dich Triebfahrzeugführer und Kollegen sofort erkennen. Warnkleidung (reflektierend, Signalfarbe) ist Pflicht.',
      ru: 'На путях тебя должны сразу видеть машинисты и коллеги. Сигнальная одежда (световозвращатели, сигнальный цвет) обязательна.',
      en: 'On track you must be visible at once to drivers and colleagues. High-vis (reflective, signal colour) is mandatory.',
      ar: 'على المسار يجب أن يراك القائديون والزملاء فوراً. الملابس العاكسة إلزامية.',
    },
    content: {
      de: ['Im Gleisbereich immer Warnkleidung (EN 471) tragen.', 'Reflexstreifen und Signalfarbe für Sichtbarkeit.'],
      ru: ['В зоне путей всегда носить сигнальную одежду (EN 471).', 'Световозвращающие полосы и сигнальный цвет.'],
      en: ['Always wear high-vis (EN 471) in track area.', 'Reflective strips and signal colour for visibility.'],
      ar: ['ارتدِ دائماً الملابس العاكسة (EN 471) في منطقة المسار.', 'شرائط عاكسة ولون إشارة للرؤية.'],
    },
    severity: 'warning',
  },
  {
    id: 'kleidung-schutz',
    category: 'kleidung',
    title: { de: 'Schutzhelm & Schuhe', ru: 'Каска и обувь', en: 'Helmet & safety shoes', ar: 'الخوذة والحذاء الآمن' },
    content: {
      de: ['Schutzhelm im Gleisbereich tragen. Festes, geschlossenes Schuhwerk.'],
      ru: ['Носить каску в зоне путей. Прочная закрытая обувь.'],
      en: ['Wear helmet in track area. Sturdy closed footwear.'],
      ar: ['ارتدِ الخوذة في منطقة المسار. حذاء مغلق ومتين.'],
    },
    severity: 'info',
  },
  // Verboten
  {
    id: 'forbidden-handy',
    category: 'forbidden',
    title: { de: 'Kein Handy auf dem Gleis', ru: 'Не пользоваться телефоном на путях', en: 'No phone on track', ar: 'لا هاتف على المسار' },
    content: {
      de: ['Kein privates Handy beim Gehen oder Arbeiten im Gleisbereich.', 'Ablenkung gefährdet Leben.'],
      ru: ['Не пользоваться личным телефоном при движении или работе в зоне путей.', 'Отвлечение создаёт опасность для жизни.'],
      en: ['No private phone while walking or working in track area.', 'Distraction endangers lives.'],
      ar: ['لا هاتف خاص أثناء المشي أو العمل في منطقة المسار.', 'التشويش يهدد الأرواح.'],
    },
    severity: 'warning',
  },
  {
    id: 'forbidden-rauchen',
    category: 'forbidden',
    title: { de: 'Kein Rauchen im Gleisbereich', ru: 'Не курить в зоне путей', en: 'No smoking in track area', ar: 'لا تدخين في منطقة المسار' },
    content: {
      de: ['Rauchen und offenes Feuer im Gleisbereich verboten.', 'Brand- und Explosionsgefahr, Funken.'],
      ru: ['Курение и открытый огонь в зоне путей запрещены.', 'Риск возгорания и искрообразования.'],
      en: ['Smoking and open fire forbidden in track area.', 'Fire and spark hazard.'],
      ar: ['التدخين والنار المكشوفة ممنوعان في منطقة المسار.', 'خطر الحريق والشرر.'],
    },
    severity: 'warning',
  },
  // Typische Fehler (common-mistakes)
  {
    id: 'mistake-ohne-freigabe',
    category: 'common-mistakes',
    title: { de: 'Fehler: Ohne Freigabe angefangen', ru: 'Ошибка: начать без разрешения', en: 'Mistake: Starting without clearance', ar: 'خطأ: البدء دون إذن' },
    content: {
      de: ['Arbeit erst nach ausdrücklicher Freigabe der Fdl aufnehmen.', '„Ich dachte, es war schon frei“ gilt nicht.'],
      ru: ['Приступать к работе только после явного разрешения Fdl.', '«Я думал, уже свободно» — не оправдание.'],
      en: ['Start work only after explicit Fdl clearance.', '„I thought it was clear“ is not valid.'],
      ar: ['ابدأ العمل فقط بعد إذن صريح من Fdl.', '«ظننت أنه مُحرر» غير مقبول.'],
    },
    severity: 'warning',
  },
  {
    id: 'mistake-v11-nebel',
    category: 'common-mistakes',
    title: { de: 'Fehler: V11 bei schlechter Sicht', ru: 'Ошибка: V11 при плохой видимости', en: 'Mistake: V11 in poor visibility', ar: 'خطأ: V11 في رؤية ضعيفة' },
    content: {
      de: ['V11 nur bei Sichtweite mind. 500 m. Bei Nebel/Dunkelheit UV oder Annäherungsstrecke.', 'Sonst Lebensgefahr.'],
      ru: ['V11 только при видимости не менее 500 м. В тумане/темноте — UV или Annäherungsstrecke.', 'Иначе смертельный риск.'],
      en: ['V11 only with visibility ≥500 m. In fog/dark use UV or Annäherungsstrecke.', 'Otherwise mortal danger.'],
      ar: ['V11 فقط برؤية 500 م على الأقل. في الضباب/الظلام استخدم UV أو Annäherungsstrecke.', 'وإلا خطر مميت.'],
    },
    severity: 'warning',
  },
  {
    id: 'mistake-allein',
    category: 'common-mistakes',
    title: { de: 'Fehler: Allein im Gefahrenbereich', ru: 'Ошибка: один в опасной зоне', en: 'Mistake: Alone in danger zone', ar: 'خطأ: وحيد في منطقة الخطر' },
    content: {
      de: ['Wo vorgeschrieben: zu zweit oder mit Rückmeldung arbeiten.', 'Nie „schnell mal eben“ ohne Absicherung.'],
      ru: ['Где предписано: работать в паре или с обратной связью.', 'Никогда «быстро на минуту» без обеспечения безопасности.'],
      en: ['Where required: work in pairs or with check-in.', 'Never „quickly“ without proper protection.'],
      ar: ['حيث مطلوب: اعمل ثنائياً أو مع تسجيل الوصول.', 'لا «بسرعة» أبداً دون حماية مناسبة.'],
    },
    severity: 'warning',
  },
];
