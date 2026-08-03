/* Bilingual EN <-> AR for the static site.
   Approach: the HTML ships in English; this script swaps visible text to Arabic
   (keyed by the English string) and flips the document to RTL. The English is
   captured per text node on first run, so switching back is lossless. */
(function () {
  var AR = {
    /* Chrome: nav, header, buttons, footer, skip link */
    'Skip to content': 'تخطَّ إلى المحتوى',
    'About': 'من نحن',
    'Capabilities': 'القدرات',
    'Industries': 'القطاعات',
    'Projects': 'المشاريع',
    'Contact': 'تواصل',
    'Request a proposal': 'اطلب عرضاً',
    'Start a conversation': 'ابدأ محادثة',
    'Our capabilities': 'قدراتنا',
    'Our delivery logic': 'منطق التسليم لدينا',
    'Explore our delivery approach': 'استكشف منهجية التسليم',
    'Contact ProBase Global': 'تواصل مع بروبيس جلوبال',
    'Talk to ProBase Global': 'تحدّث مع بروبيس جلوبال',
    'Send an enquiry': 'أرسل استفساراً',
    'Explore': 'استكشف',
    'Integrated technology, engineering and infrastructure delivery.': 'تسليم متكامل للتقنية والهندسة والبنية التحتية.',
    'Integrated delivery': 'تسليم متكامل',
    'Illustrative capability image': 'صورة توضيحية للقدرات',
    'SYSTEM / PBG — MODE / DIRECTED': 'النظام / PBG — الوضع / موجّه',

    /* Section labels */
    'PBG / OVERVIEW': 'PBG / نظرة عامة',
    'PBG / CAPABILITY LAYERS': 'PBG / طبقات القدرات',
    'PBG / DELIVERY OUTCOMES': 'PBG / مخرجات التسليم',
    'PBG / FAQ': 'PBG / الأسئلة الشائعة',
    'PBG / NEXT STEP': 'PBG / الخطوة التالية',
    'PBG / CAPABILITY MAP': 'PBG / خريطة القدرات',
    'PBG / INDUSTRY DIRECTORY': 'PBG / دليل القطاعات',
    'PBG / VERIFICATION BOUNDARY': 'PBG / حدود التحقق',
    'PBG / REPRESENTATIVE ENGAGEMENTS': 'PBG / مشاريع تمثيلية',
    'PBG / ENQUIRY ROUTING': 'PBG / توجيه الاستفسار',
    'PBG / CONTACT PATH': 'PBG / مسار التواصل',
    'PBG / LEADERSHIP': 'PBG / القيادة',

    /* Shared headings + lists */
    'The capabilities that shape the pathway.': 'القدرات التي تُشكّل المسار.',
    'What the operating model is intended to improve.': 'ما الذي يهدف نموذج التشغيل إلى تحسينه.',
    'Questions at the start of a complex brief.': 'أسئلة في بداية أي مشروع معقّد.',
    'Start with the requirement, then build the right operating path.': 'ابدأ بالمتطلّب، ثم ابنِ المسار التشغيلي الصحيح.',
    'Share the programme context, service interest and timing. The enquiry route will prepare a message for the right conversation.': 'شارِكنا سياق البرنامج والخدمة المطلوبة والتوقيت، وسيُجهّز مسار الاستفسار رسالة للمحادثة المناسبة.',
    'Integrated programme perspective': 'منظور متكامل للبرنامج',
    'Illustrative capability context': 'سياق توضيحي للقدرات',
    'Evidence-led publication': 'نشر قائم على الأدلة',
    'PATH STATUS: REVIEW READY': 'حالة المسار: جاهز للمراجعة',
    'Active system node': 'عنصر نظام نشط',

    /* Home */
    'Integrated delivery group': 'مجموعة تسليم متكامل',
    'Build with clarity. Deliver with confidence.': 'ابنِ بوضوح. سلّم بثقة.',
    'ProBase Global brings technology, engineering, infrastructure and operations together through one accountable delivery approach.': 'تجمع بروبيس جلوبال التقنية والهندسة والبنية التحتية والتشغيل عبر منهجية تسليم واحدة مسؤولة.',
    'Our approach': 'منهجيتنا',
    'One partner across the layers that make delivery work.': 'شريك واحد عبر الطبقات التي يقوم عليها التسليم.',
    'We connect the practical requirements of complex programmes—from technical systems and field delivery to operational continuity—with structured coordination at every stage.': 'نربط المتطلبات العملية للبرامج المعقّدة، من الأنظمة التقنية والتنفيذ الميداني إلى استمرارية التشغيل، بتنسيق منظّم في كل مرحلة.',
    'What we do': 'ما نقوم به',
    'Capabilities built to work together.': 'قدرات مبنية لتعمل معاً.',
    'View all capabilities →': 'عرض كل القدرات ←',
    'Technology': 'التقنية',
    'Telecommunications': 'الاتصالات',
    'Engineering': 'الهندسة',
    'Operations': 'العمليات',
    'Delivery discipline': 'انضباط التسليم',
    'Clear scope. Coordinated delivery. Visible accountability.': 'نطاق واضح. تسليم منسّق. مساءلة ظاهرة.',
    'Our role is to make the interfaces between people, systems, assets and the site easier to understand and manage.': 'دورنا أن نجعل التداخلات بين الأفراد والأنظمة والأصول والموقع أسهل فهماً وإدارة.',
    'By the numbers': 'بالأرقام',
    'Sample figures: replace with verified numbers.': 'أرقام تجريبية: استبدلها بأرقام موثّقة.',
    'Years of combined delivery experience': 'سنوات من الخبرة المجمّعة في التسليم',
    'Specialists across disciplines': 'متخصص عبر التخصصات',
    'Core capability areas': 'مجالات القدرة الأساسية',
    'Priority sectors covered': 'قطاعات ذات أولوية مغطّاة',
    'Ecosystem and standards': 'المنظومة والمعايير',
    'Delivered with an accredited partner and standards base.': 'نُنفّذ باعتماد شركاء وقاعدة معايير.',
    'Sample placeholders: replace with your verified partners, certifications and accreditations.': 'عناصر تجريبية: استبدلها بشركائك وشهاداتك واعتماداتك الموثّقة.',
    'Enterprise software partner': 'شريك برمجيات المؤسسات',
    'Network and connectivity partner': 'شريك الشبكات والاتصال',
    'Cloud and data centre partner': 'شريك السحابة ومراكز البيانات',
    'Building systems partner': 'شريك أنظمة المباني',
    'PMP certified team': 'فريق معتمد PMP',
    'Local content ready': 'جاهزية المحتوى المحلي',
    'Positioned to support': 'مهيّأة لدعم',
    'Saudi Vision 2030': 'رؤية السعودية 2030',
    'programmes across digital infrastructure, smart cities and sector modernisation.': 'في برامج البنية التحتية الرقمية والمدن الذكية وتحديث القطاعات.',
    'Start here': 'ابدأ هنا',
    'Tell us what needs to move.': 'أخبرنا بما يحتاج أن يتحرّك.',
    'Share the programme context, service interest and timing. We will prepare the right next conversation.': 'شارِكنا سياق البرنامج والخدمة والتوقيت، وسنجهّز المحادثة القادمة المناسبة.',

    /* About */
    'Company overview': 'نبذة عن الشركة',
    'A delivery group designed for complexity.': 'مجموعة تسليم مُصمّمة للتعقيد.',
    'A focused view of how ProBase Global aligns specialist capabilities around institutional ambitions.': 'نظرة مركّزة على كيفية مواءمة بروبيس جلوبال للقدرات المتخصصة حول الطموحات المؤسسية.',
    'System view / 01': 'عرض النظام / 01',
    'ProBase Global is positioned as an integrated technology, engineering and infrastructure delivery group. Our approach connects advisory thinking with executable systems, field disciplines and operational continuity.': 'بروبيس جلوبال مجموعة تسليم متكاملة في التقنية والهندسة والبنية التحتية. تربط منهجيتنا التفكير الاستشاري بأنظمة قابلة للتنفيذ وتخصصات ميدانية واستمرارية تشغيلية.',
    'Integrated capability architecture': 'بنية قدرات متكاملة',
    'Programme-level coordination': 'تنسيق على مستوى البرنامج',
    'Responsible, evidence-led delivery': 'تسليم مسؤول قائم على الأدلة',
    'Sample placeholders: replace with real names, roles and photos.': 'عناصر تجريبية: استبدلها بأسماء وأدوار وصور حقيقية.',
    'The people accountable for delivery.': 'الأشخاص المسؤولون عن التسليم.',
    '[Name]': '[الاسم]',
    'Managing Director': 'العضو المنتدب',
    'Head of Technology': 'رئيس التقنية',
    'Head of Engineering and Infrastructure': 'رئيس الهندسة والبنية التحتية',
    'Head of Operations': 'رئيس العمليات',
    'One operating language across disciplines': 'لغة تشغيل موحّدة عبر التخصصات',
    'Decisions traceable to programme outcomes': 'قرارات قابلة للتتبّع إلى مخرجات البرنامج',
    'Clear handovers between delivery stages': 'تسليمات واضحة بين مراحل التنفيذ',
    'What kind of organisations does ProBase Global work with?': 'مع أي نوع من المؤسسات تعمل بروبيس جلوبال؟',
    'The model is built for institutions running complex, multi discipline programmes where technology, engineering, infrastructure and operations need to move together.': 'صُمّم النموذج للمؤسسات التي تدير برامج معقّدة متعددة التخصصات، حيث تحتاج التقنية والهندسة والبنية التحتية والتشغيل أن تتحرّك معاً.',
    'How does ProBase Global stay accountable across disciplines?': 'كيف تحافظ بروبيس جلوبال على المساءلة عبر التخصصات؟',
    'One team owns the interfaces between disciplines, so scope, decisions and handovers stay visible from strategy through to operations.': 'فريق واحد يتولّى التداخلات بين التخصصات، فيبقى النطاق والقرارات والتسليمات واضحة من الاستراتيجية حتى التشغيل.',

    /* Capabilities */
    'Capability architecture': 'بنية القدرات',
    'One platform. Multiple disciplines. One delivery logic.': 'منصة واحدة. تخصصات متعددة. منطق تسليم واحد.',
    'A connected capability portfolio spanning enterprise technology, infrastructure, engineering and operations.': 'محفظة قدرات مترابطة تمتد عبر تقنية المؤسسات والبنية التحتية والهندسة والعمليات.',
    'Architecture / 01': 'البنية / 01',
    'Capability is most valuable when it is designed to work together. ProBase Global organizes relevant disciplines around a single delivery logic.': 'تكون القدرة أكثر قيمة حين تُصمّم لتعمل معاً. تنظّم بروبيس جلوبال التخصصات ذات الصلة حول منطق تسليم واحد.',
    'Enterprise technology and advisory': 'تقنية المؤسسات والاستشارات',
    'Connected infrastructure and telecommunications': 'البنية التحتية المتصلة والاتصالات',
    'Engineering systems and technical delivery': 'الأنظمة الهندسية والتنفيذ التقني',
    'Facility, asset and operational management': 'إدارة المرافق والأصول والتشغيل',
    'An architecture map for the programme, not a catalogue of isolated services.': 'خريطة بنيوية للبرنامج، لا قائمة خدمات منفصلة.',
    'Each node is treated as an interface with decisions, controls and accountable handoffs.': 'يُعامَل كل عنصر كواجهة لها قرارات وضوابط وتسليمات مسؤولة.',
    'Strategic intent': 'التوجّه الاستراتيجي',
    'Technical architecture': 'البنية التقنية',
    'Field delivery': 'التنفيذ الميداني',
    'Operating continuity': 'استمرارية التشغيل',
    'Reduced coordination friction': 'تقليل احتكاك التنسيق',
    'Aligned technical workstreams': 'مسارات عمل تقنية متوائمة',
    'Better readiness for handover and operations': 'جاهزية أفضل للتسليم والتشغيل',
    'Can we engage a single capability rather than the whole platform?': 'هل يمكننا التعاقد على قدرة واحدة بدل المنصة كاملة؟',
    'Yes. Capabilities can be scoped on their own or combined, and they share one delivery logic so they still connect cleanly.': 'نعم. يمكن تحديد نطاق القدرات بمفردها أو دمجها، وهي تشترك في منطق تسليم واحد فتبقى مترابطة بوضوح.',
    'How do the capability areas work together on one programme?': 'كيف تعمل مجالات القدرة معاً في برنامج واحد؟',
    'Each area is treated as an interface with defined decisions and handoffs, coordinated centrally rather than left to separate vendors.': 'يُعامَل كل مجال كواجهة لها قرارات وتسليمات محدّدة، تُنسَّق مركزياً بدل تركها لموردين منفصلين.',

    /* Industries */
    'Sector insight. Integrated response.': 'فهم القطاع. استجابة متكاملة.',
    'Solutions and delivery pathways organized around the operating realities of priority sectors.': 'حلول ومسارات تنفيذ منظّمة حول الواقع التشغيلي للقطاعات ذات الأولوية.',
    'Every sector has different asset, governance, continuity and user requirements. ProBase Global brings a consistent capability model to each context.': 'لكل قطاع متطلبات مختلفة من الأصول والحوكمة والاستمرارية والمستخدمين. تقدّم بروبيس جلوبال نموذج قدرات ثابتاً لكل سياق.',
    'Government and public environments': 'الحكومة والبيئات العامة',
    'Enterprise, real estate and hospitality': 'المؤسسات والعقار والضيافة',
    'Healthcare, education and retail': 'الرعاية الصحية والتعليم والتجزئة',
    'Industrial, energy and smart urban systems': 'الصناعة والطاقة والأنظمة الحضرية الذكية',
    'Explore industry perspectives.': 'استكشف منظورات القطاعات.',
    'Government': 'الحكومة',
    'Real estate': 'العقار',
    'Healthcare': 'الرعاية الصحية',
    'Education': 'التعليم',
    'Hospitality': 'الضيافة',
    'Retail': 'التجزئة',
    'Industrial': 'الصناعة',
    'Energy': 'الطاقة',
    'Smart cities': 'المدن الذكية',
    'Capabilities contextualized to the sector': 'قدرات مُهيّأة لسياق القطاع',
    'Solutions aligned to operating constraints': 'حلول متوائمة مع قيود التشغيل',
    'A clearer route from challenge to delivery': 'مسار أوضح من التحدّي إلى التسليم',
    'Do you tailor the approach to each sector?': 'هل تُكيّفون المنهجية لكل قطاع؟',
    'The capability model stays consistent, but it is shaped to the asset, governance, continuity and user requirements of each sector.': 'يبقى نموذج القدرات ثابتاً، لكنه يُشكَّل وفق متطلبات الأصول والحوكمة والاستمرارية والمستخدمين لكل قطاع.',
    'Which sectors are the current focus?': 'ما القطاعات محل التركيز حالياً؟',
    'Government, enterprise, real estate, healthcare, education, hospitality, retail, industrial, energy and smart urban systems.': 'الحكومة والمؤسسات والعقار والرعاية الصحية والتعليم والضيافة والتجزئة والصناعة والطاقة والأنظمة الحضرية الذكية.',

    /* Projects */
    'Capabilities, not project claims': 'قدرات، لا ادّعاءات مشاريع',
    'Representative project capabilities.': 'قدرات مشاريع تمثيلية.',
    'A structured view of the programme types and solution scenarios the capability architecture is designed to address.': 'نظرة منظّمة لأنواع البرامج وسيناريوهات الحلول التي صُمّمت بنية القدرات لمعالجتها.',
    'Until verified project information is supplied and approved for publication, this section illustrates representative capability scenarios only.': 'حتى تُقدَّم معلومات مشاريع موثّقة وتُعتمد للنشر، يعرض هذا القسم سيناريوهات قدرات تمثيلية فقط.',
    'Enterprise digital transformation': 'التحول الرقمي للمؤسسات',
    'Fiber, ICT and data center infrastructure': 'الألياف وتقنية المعلومات والاتصالات وبنية مراكز البيانات',
    'Smart building and connected workplace': 'المباني الذكية ومكان العمل المتصل',
    'Facility operations and technical maintenance': 'تشغيل المرافق والصيانة التقنية',
    'Sample content: replace with verified project details before publishing.': 'محتوى تجريبي: استبدله بتفاصيل مشاريع موثّقة قبل النشر.',
    'How the operating model shows up on a live programme.': 'كيف يظهر نموذج التشغيل في برنامج فعلي.',
    'Government · Smart infrastructure': 'حكومي · بنية تحتية ذكية',
    'Healthcare · Smart building': 'رعاية صحية · مبنى ذكي',
    'Enterprise · Digital transformation': 'مؤسسي · تحول رقمي',
    'National services data centre and connectivity backbone': 'مركز بيانات للخدمات الوطنية وشبكة ربط أساسية',
    'Connected hospital systems and operations readiness': 'أنظمة مستشفى متصلة وجاهزية تشغيلية',
    'Enterprise platform deployment and process alignment': 'نشر منصة مؤسسية ومواءمة العمليات',
    'Challenge': 'التحدّي',
    'Delivered': 'المُنفَّذ',
    'Outcome': 'النتيجة',
    'A public entity needed a resilient data centre and a fibre backbone to consolidate fragmented systems across regional offices.': 'احتاجت جهة حكومية مركز بيانات مرناً وشبكة ألياف أساسية لتوحيد أنظمة مبعثرة عبر مكاتب إقليمية.',
    'Design, build and commissioning of the facility, structured cabling and the core network, coordinated as one accountable programme.': 'تصميم وبناء وتشغيل المنشأة، والكابلات المنظّمة، والشبكة الأساسية، بتنسيق ضمن برنامج واحد مسؤول.',
    'A consolidated platform ready for operations, with clear handover documentation and a defined maintenance model.': 'منصة موحّدة جاهزة للتشغيل، مع توثيق تسليم واضح ونموذج صيانة محدّد.',
    'A new healthcare facility required integrated building, security and low current systems aligned to clinical operating needs.': 'تطلّبت منشأة رعاية صحية جديدة أنظمة مبانٍ وأمن وتيار خفيف متكاملة تتوافق مع احتياجات التشغيل السريري.',
    'Systems integration across MEP, ELV and building management, with commissioning and staff readiness support.': 'تكامل أنظمة عبر الميكانيكا والكهرباء والسباكة والتيار الخفيف وإدارة المباني، مع التشغيل ودعم جاهزية الكوادر.',
    'A single operating view of the facility, with maintenance and continuity planned from day one.': 'رؤية تشغيلية موحّدة للمنشأة، مع تخطيط الصيانة والاستمرارية منذ اليوم الأول.',
    'An organisation running disconnected tools needed a consolidated enterprise platform and aligned processes.': 'احتاجت مؤسسة تعمل بأدوات غير مترابطة منصة مؤسسية موحّدة وعمليات متوائمة.',
    'Advisory, platform deployment and change support, sequenced to limit disruption to live operations.': 'استشارات ونشر منصة ودعم التغيير، بتسلسل يحدّ من تعطيل العمليات القائمة.',
    'Aligned workstreams and a clearer route from planning into sustained operations.': 'مسارات عمل متوائمة ومسار أوضح من التخطيط إلى تشغيل مستدام.',
    'Programme duration': 'مدة البرنامج',
    'Regional offices linked': 'مكاتب إقليمية مرتبطة',
    'Design availability target': 'هدف توافر التصميم',
    'Integrated systems': 'أنظمة متكاملة',
    'Operations model': 'نموذج التشغيل',
    'Unified building platform': 'منصة مبنى موحّدة',
    'Rollout window': 'نافذة الإطلاق',
    'Processes mapped': 'عمليات موثّقة',
    'Platform of record': 'منصة مرجعية',
    'A reusable case-study structure': 'بنية دراسة حالة قابلة لإعادة الاستخدام',
    'Clear distinction between capabilities and claims': 'تمييز واضح بين القدرات والادعاءات',
    'Ready for verified project conversion': 'جاهزة للتحويل إلى مشاريع موثّقة',
    'Why are there no named projects yet?': 'لماذا لا توجد مشاريع بأسماء حتى الآن؟',
    'Client names, metrics and outcomes are only published once verified and approved. Until then this area shows representative scenarios.': 'لا تُنشر أسماء العملاء والأرقام والنتائج إلا بعد التحقق والاعتماد. حتى ذلك الحين يعرض هذا القسم سيناريوهات تمثيلية.',
    'Can you share references during an engagement?': 'هل يمكن مشاركة مراجع خلال التعاقد؟',
    'Verified references can be shared directly as part of a specific conversation, outside the public site.': 'يمكن مشاركة المراجع الموثّقة مباشرة ضمن محادثة محدّدة، خارج الموقع العام.',

    /* Delivery */
    'Delivery methodology': 'منهجية التسليم',
    'A controlled line from strategy to operations.': 'خط مُحكَم من الاستراتيجية إلى التشغيل.',
    'A practical delivery model that connects advisory, design, implementation, commissioning and operational continuity.': 'نموذج تسليم عملي يربط الاستشارة والتصميم والتنفيذ والتشغيل واستمرارية العمليات.',
    'The delivery pathway is structured around the decisions and interfaces that shape programme confidence.': 'يُبنى مسار التسليم حول القرارات والتداخلات التي تُشكّل الثقة في البرنامج.',
    'Discover and align': 'الاكتشاف والمواءمة',
    'Design and coordinate': 'التصميم والتنسيق',
    'Execute and control': 'التنفيذ والضبط',
    'Commission and sustain': 'التشغيل والاستدامة',
    'A shared view of delivery dependencies': 'رؤية مشتركة لتبعيات التسليم',
    'Clearer readiness gates': 'بوابات جاهزية أوضح',
    'A feedback loop into operations': 'حلقة تغذية راجعة إلى التشغيل',
    'How does a delivery engagement begin?': 'كيف يبدأ تعاقد التسليم؟',
    'It starts by clarifying the operating need, scope boundaries, stakeholders and dependencies before a pathway is proposed.': 'يبدأ بتوضيح الحاجة التشغيلية وحدود النطاق وأصحاب المصلحة والتبعيات قبل اقتراح المسار.',
    'How is progress kept visible across stages?': 'كيف يبقى التقدّم واضحاً عبر المراحل؟',
    'Readiness gates and clear handovers between stages give a shared view of dependencies and status.': 'بوابات الجاهزية والتسليمات الواضحة بين المراحل تمنح رؤية مشتركة للتبعيات والحالة.',

    /* Contact */
    'Start with the need. We will shape the path forward.': 'ابدأ بالحاجة، ونحن نرسم المسار القادم.',
    'Choose the context of your enquiry so the right conversation can begin with the right information.': 'اختر سياق استفسارك لتبدأ المحادثة المناسبة بالمعلومات الصحيحة.',
    'Intake / 01': 'الاستقبال / 01',
    'Use the enquiry form to share your requirement, or contact us directly by phone or email. Office addresses and regional presence will be published only after verification.': 'استخدم نموذج الاستفسار لمشاركة متطلبك، أو تواصل معنا مباشرة عبر الهاتف أو البريد. ستُنشر عناوين المكاتب والحضور الإقليمي بعد التحقق فقط.',
    'A controlled intake path for the next conversation.': 'مسار استقبال مُحكَم للمحادثة القادمة.',
    'Capture': 'الالتقاط',
    'Route': 'التوجيه',
    'Respond': 'الاستجابة',
    'Tell us the programme context, service interest and timing.': 'أخبرنا بسياق البرنامج والخدمة المطلوبة والتوقيت.',
    'The message is prepared for the approved company inbox.': 'يُجهَّز البريد لصندوق الشركة المعتمد.',
    'The appropriate company conversation can begin with the right context.': 'تبدأ المحادثة المناسبة مع الشركة بالسياق الصحيح.',
    'Name': 'الاسم',
    'Company': 'الشركة',
    'Email': 'البريد الإلكتروني',
    'Phone number': 'رقم الهاتف',
    'Country': 'الدولة',
    'Enquiry type': 'نوع الاستفسار',
    'Budget range': 'نطاق الميزانية',
    'Timeline': 'الإطار الزمني',
    'How can we help?': 'كيف يمكننا المساعدة؟',
    'Select one': 'اختر واحداً',
    'Talk to an expert': 'التحدث مع خبير',
    'Partner enquiry': 'استفسار شراكة',
    'Vendor enquiry': 'استفسار مورّد',
    'Prequalification': 'التأهيل المسبق',
    'Career application': 'طلب توظيف',
    'General enquiry': 'استفسار عام',
    'Not specified': 'غير محدّد',
    'Under 250k': 'أقل من 250 ألف',
    '250k–1m': '250 ألف–1 مليون',
    'Over 1m': 'أكثر من مليون',
    'Immediate': 'فوري',
    '1–3 months': '1–3 أشهر',
    '3–6 months': '3–6 أشهر',
    'Planning stage': 'مرحلة التخطيط',
    'Prepare enquiry email': 'تجهيز بريد الاستفسار'
  };

  var FONT_HREF = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap';
  function ensureArabicFont() {
    if (document.getElementById('pbg-ar-font')) return;
    var l = document.createElement('link');
    l.id = 'pbg-ar-font'; l.rel = 'stylesheet'; l.href = FONT_HREF;
    document.head.appendChild(l);
  }

  function collectTextNodes() {
    var nodes = [];
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      var parent = n.parentNode;
      if (!parent) continue;
      var tag = parent.nodeName;
      if (tag === 'SCRIPT' || tag === 'STYLE') continue;
      if (parent.classList && parent.classList.contains('lang-toggle')) continue;
      if (!n.textContent.trim()) continue;
      nodes.push(n);
    }
    return nodes;
  }

  function applyLang(lang) {
    var ar = lang === 'ar';
    document.documentElement.setAttribute('lang', ar ? 'ar' : 'en');
    document.documentElement.setAttribute('dir', ar ? 'rtl' : 'ltr');
    if (ar) ensureArabicFont();
    collectTextNodes().forEach(function (node) {
      if (!('_en' in node)) node._en = node.textContent;
      var raw = node._en;
      var key = raw.trim();
      if (ar && AR[key] !== undefined) {
        var lead = raw.match(/^\s*/)[0];
        var trail = raw.match(/\s*$/)[0];
        node.textContent = lead + AR[key] + trail;
      } else {
        node.textContent = raw;
      }
    });
    var toggle = document.querySelector('.lang-toggle');
    if (toggle) {
      toggle.textContent = ar ? 'English' : 'العربية';
      toggle.setAttribute('lang', ar ? 'en' : 'ar');
    }
    try { localStorage.setItem('pbg-lang', lang); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    var saved;
    try { saved = localStorage.getItem('pbg-lang'); } catch (e) {}
    var initial = (saved === 'ar' || saved === 'en')
      ? saved
      : (document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en');
    applyLang(initial);
    var toggle = document.querySelector('.lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('dir') === 'rtl' ? 'ar' : 'en';
        applyLang(cur === 'ar' ? 'en' : 'ar');
      });
    }
  });
})();
