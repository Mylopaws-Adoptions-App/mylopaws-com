// The 12 Dermacare therapies. Protocol steps are protected IP: pages describe outcomes and the
// experience in phases, never step-by-step. Slugs are the crawled WordPress URLs; never change them.

export type Therapy = {
  slug: string;
  name: string;
  short: string;
  title: string; // <title>, 30–65 chars
  description: string; // meta, ≤155 chars
  intro: string;
  signs: string[];
  phases: { name: string; text: string }[]; // high level only
  expect: string[];
  duration: string;
  rhythm: string;
  suitsWith?: string[]; // other therapy slugs
  posts?: string[]; // related Pawprints slugs
  faq: { q: string; a: string }[];
};

export const THERAPIES: Therapy[] = [
  {
    slug: 'therapy-skin-infection-recovery',
    name: 'Skin Infection Recovery Therapy',
    short: 'For red patches, itching and the smell that comes with skin infections.',
    title: 'Skin Infection Recovery Therapy for Dogs in Bangalore',
    description: 'Dual-action anti-fungal and anti-bacterial skin therapy for dogs and cats at Mylopaws Dermacare, HSR Layout. Clears infection-led itching and odour.',
    intro:
      'Fungal and bacterial skin infections thrive in Bangalore’s humidity, especially in skin folds, paws and under thick fur. A regular bath washes the surface; it does not reach what is driving the infection. This therapy is built to.',
    signs: ['Red or raised patches, often with crusting', 'Persistent itching and licking at the same spots', 'A musty or sour smell even after a bath', 'Hair thinning around the affected areas'],
    phases: [
      { name: 'Assess', text: 'Our specialist maps where the infection sits and how far it has spread before anything touches the skin.' },
      { name: 'Treat', text: 'A medicated, dual-action wash works on both fungal and bacterial causes, followed by a calming botanical layer.' },
      { name: 'Protect', text: 'Hygiene-focused finishing keeps the treated areas clean and dry so the skin can recover.' },
    ],
    expect: ['Less itching within days, not weeks', 'A clear plan for follow-up sessions', 'Home-care advice written for your pet'],
    duration: 'About 90 minutes',
    rhythm: 'Usually two to four sessions, a week or two apart, depending on how established the infection is.',
    suitsWith: ['therapy-neem-therapy', 'therapy-odour-control'],
    posts: ['dog-scratching-ticks-fleas-skin-infections-bangalore-2', 'how-to-read-dog-skin-guide-bangalore'],
    faq: [
      { q: 'Do I need a vet visit first?', a: 'If there are open wounds, bleeding or your pet seems unwell, see a vet first. For typical itchy, smelly or patchy skin, our specialists assess and tell you honestly if a vet should look at it.' },
      { q: 'Is the medicated wash safe for cats?', a: 'We adjust products and contact time for cats and for sensitive pets. Tell us about any allergies or medication when you book.' },
    ],
  },
  {
    slug: 'therapy-deep-hydration',
    name: 'Deep Hydration Skin Therapy',
    short: 'For dandruff, dry flakes and skin that feels tight and itchy.',
    title: 'Deep Hydration Skin Therapy for Dry Skin & Dandruff',
    description: 'Dry skin and dandruff therapy for dogs and cats in Bangalore. Restores the skin’s moisture barrier at Mylopaws Dermacare, HSR Layout.',
    intro:
      'White flakes on a dark coat, scratching that never quite stops, skin that looks dull and tight. Dry skin is common in air-conditioned homes and after harsh shampoos. This therapy rebuilds moisture from the skin outward.',
    signs: ['White flakes, especially along the back', 'Dry, rough patches you can feel', 'Itching without visible redness', 'A dull, brittle feel to the fur'],
    phases: [
      { name: 'Loosen', text: 'A gentle hydrating bath lifts flakes without stripping the skin’s natural oils.' },
      { name: 'Restore', text: 'Moisture-rich treatment works into the skin to rebuild its protective barrier.' },
      { name: 'Seal', text: 'A nourishing finish locks hydration in, so the effect lasts beyond the session.' },
    ],
    expect: ['Visibly fewer flakes', 'Softer skin and fur to the touch', 'Advice on shampoos and bathing frequency at home'],
    duration: 'About 90 minutes',
    rhythm: 'Monthly for maintenance, or a short course for stubborn dandruff.',
    suitsWith: ['therapy-oatmeal-skin-relief', 'therapy-fur-revival-shine'],
    posts: ['how-to-read-dog-skin-guide-bangalore', 'monsoon-pet-care-bangalore-dog-skin'],
    faq: [
      { q: 'Is dandruff a sign of something serious?', a: 'Usually it is dryness, diet or the wrong shampoo. If flaking comes with hair loss, sores or weight change, a vet check is worth it.' },
      { q: 'How often should I bathe at home after this?', a: 'Less often than most people think. We give you a bathing rhythm and product guide matched to your pet’s skin.' },
    ],
  },
  {
    slug: 'therapy-fur-revival-shine',
    name: 'Fur Revival & Shine Therapy',
    short: 'For dull, rough or lifeless fur that has lost its natural shine.',
    title: 'Fur Revival & Shine Therapy for Dogs | Mylopaws Dermacare',
    description: 'Bring back a dull, rough fur coat. Skin-first fur revival therapy for dogs and cats in Bangalore at Mylopaws Dermacare, HSR Layout.',
    intro:
      'Dull fur is usually a skin story: oil imbalance, build-up or dryness underneath. This therapy treats skin and fur together, so the shine comes from health rather than a spray.',
    signs: ['Fur that feels rough or straw-like', 'A coat that looks flat and lifeless', 'Greasy roots with dry ends', 'Shine that disappears a day after a bath'],
    phases: [
      { name: 'Clear', text: 'A deep pre-clean lifts build-up and excess oil from skin and fur.' },
      { name: 'Treat', text: 'Skin-level therapy rebalances the conditions underneath the fur.' },
      { name: 'Finish', text: 'Conditioning and a professional blow-dry finish bring the shine forward.' },
    ],
    expect: ['A visibly glossier, softer coat', 'Better-balanced skin underneath', 'A maintenance rhythm that keeps it that way'],
    duration: 'About 90 minutes',
    rhythm: 'Every four to six weeks as a maintenance therapy.',
    suitsWith: ['therapy-deep-hydration', 'therapy-herbal-detox'],
    posts: ['dog-hair-fall-bangalore-causes-solutions', 'how-to-choose-groomer-bangalore-questions'],
    faq: [
      { q: 'Is this just a grooming session?', a: 'No. Grooming tidies the coat; this therapy works on the skin conditions that make fur dull in the first place.' },
      { q: 'Will diet help too?', a: 'Often, yes. We will tell you if what we see on the skin suggests a diet or supplement conversation with your vet.' },
    ],
  },
  {
    slug: 'therapy-tick-flea-elimination',
    name: 'Complete Tick & Flea Elimination Therapy',
    short: 'For visible ticks, flea dirt and the scratching that keeps you up at night.',
    title: 'Tick & Flea Elimination Therapy for Dogs in Bangalore',
    description: 'Complete tick and flea removal therapy for dogs in Bangalore, with follow-up protection. Mylopaws Dermacare, HSR Layout.',
    intro:
      'Ticks in Bangalore are not a one-season problem. A single bath kills some of what is on the surface; eggs, nymphs and ticks hidden in ears and between toes survive. This therapy is designed to clear them thoroughly and keep your pet protected after.',
    signs: ['Ticks you can see or feel, often around ears, neck and paws', 'Dark specks of flea dirt in the fur', 'Sudden, intense scratching or biting', 'Restlessness, especially at night'],
    phases: [
      { name: 'Inspect', text: 'A full-body inspection, including ears, armpits and between toes, to see how heavy the infestation is.' },
      { name: 'Eliminate', text: 'Medicated treatment and careful manual removal, so nothing is left attached.' },
      { name: 'Protect', text: 'A natural protective layer and clear guidance on preventives keep re-infestation away.' },
    ],
    expect: ['Ticks and fleas removed, not just stunned', 'Calmer, more comfortable skin', 'A protection plan for your home and walks'],
    duration: 'About 90 minutes',
    rhythm: 'One session for most pets, with a follow-up if the infestation was heavy.',
    suitsWith: ['therapy-neem-therapy', 'therapy-skin-infection-recovery'],
    posts: ['tick-season-bangalore-protect-your-dog', 'dog-scratching-ticks-fleas-skin-infections-bangalore-2'],
    faq: [
      { q: 'Do I still need a tick preventive?', a: 'Yes. The therapy clears the current problem; a vet-recommended preventive stops the next one. We will explain the options.' },
      { q: 'What about ticks in my home?', a: 'We give you a simple plan for bedding, sofas and corners where ticks lay eggs, because treating only the pet rarely works.' },
    ],
  },
  {
    slug: 'therapy-sensitive-skin-relief',
    name: 'Sensitive Skin Relief Therapy',
    short: 'For allergy-prone skin that itches without a visible cause.',
    title: 'Sensitive Skin & Allergy Relief Therapy for Pets',
    description: 'Hypoallergenic relief therapy for allergy-prone dogs and cats in Bangalore. Calm itching gently at Mylopaws Dermacare, HSR Layout.',
    intro:
      'Some pets scratch constantly with no ticks, no infection and no obvious reason. Often it is allergy: food, dust, pollen or products. Sensitive skin needs a gentler hand and the right products, not stronger ones.',
    signs: ['Constant itching with no visible infection', 'Redness on the belly, paws or armpits', 'Reactions after new food, shampoos or seasons', 'Licking or chewing at the paws'],
    phases: [
      { name: 'Calm', text: 'A hypoallergenic wash removes irritants without triggering new reactions.' },
      { name: 'Relieve', text: 'Targeted soothing for the areas that flare the most.' },
      { name: 'Support', text: 'Barrier support helps the skin defend itself between sessions.' },
    ],
    expect: ['Gentle handling at every step', 'Less scratching and redness', 'Notes on likely triggers to discuss with your vet'],
    duration: 'About 90 minutes',
    rhythm: 'Every two to four weeks during flare-up seasons.',
    suitsWith: ['therapy-oatmeal-skin-relief', 'therapy-aloe-cooling'],
    posts: ['how-to-read-dog-skin-guide-bangalore', 'monsoon-pet-care-bangalore-dog-skin'],
    faq: [
      { q: 'Can a therapy cure allergies?', a: 'No therapy cures an allergy. It relieves the skin and reduces flare-ups while you and your vet manage the trigger.' },
      { q: 'My dog reacts to most shampoos. Is this safe?', a: 'This protocol is built for exactly that. Tell us what has caused reactions before so we avoid it.' },
    ],
  },
  {
    slug: 'therapy-de-shedding',
    name: 'Hair Fall Control & De-Shed Therapy',
    short: 'For heavy shedding, loose undercoat and fur on every surface at home.',
    title: 'De-Shedding & Hair Fall Control Therapy for Dogs',
    description: 'Cut heavy shedding at home. Undercoat release and hair fall control therapy for dogs in Bangalore at Mylopaws Dermacare, HSR Layout.',
    intro:
      'Double-coated breeds like Labradors, Golden Retrievers, Huskies and Shih Tzus can shed far more than you expect in Bangalore’s climate. Brushing at home only removes the top layer. This therapy releases the dead undercoat and strengthens what remains.',
    signs: ['Clumps of fur on floors, sofas and clothes', 'A thick, matted undercoat', 'Hair fall that suddenly increases', 'Fur coming away easily when stroked'],
    phases: [
      { name: 'Release', text: 'Specialist tools release dead undercoat without pulling healthy fur.' },
      { name: 'Treat', text: 'A de-shed bath loosens what remains and conditions the skin.' },
      { name: 'Strengthen', text: 'A fur-health finish helps reduce shedding in the weeks that follow.' },
    ],
    expect: ['A noticeable drop in fur around the home', 'A lighter, cooler coat for your pet', 'A brushing routine that actually works'],
    duration: 'About 90 minutes',
    rhythm: 'Every four to eight weeks, more often in heavy shedding seasons.',
    suitsWith: ['therapy-fur-revival-shine', 'therapy-deep-hydration'],
    posts: ['dog-hair-fall-bangalore-causes-solutions', 'how-to-choose-groomer-bangalore-questions'],
    faq: [
      { q: 'Should I shave my double-coated dog to stop shedding?', a: 'Please don’t. Shaving damages how a double coat regulates temperature. Undercoat release does the job without the harm.' },
      { q: 'Is sudden hair loss normal?', a: 'Seasonal shedding is. Bald patches, sores or thinning in one area are not, and are worth a skin assessment or a vet visit.' },
    ],
  },
  {
    slug: 'therapy-odour-control',
    name: 'Deep Odour Control Therapy',
    short: 'For the smell that comes back a day after every bath.',
    title: 'Deep Odour Control Therapy for Smelly Dogs in Bangalore',
    description: 'Dog still smells after a bath? Deep odour control therapy treats bacteria and oil imbalance at the source. Mylopaws Dermacare, HSR Layout.',
    intro:
      'If your dog smells again a day after a bath, perfume is not the answer. Persistent odour usually comes from bacteria and oil imbalance on the skin, often in folds, ears and paws. This therapy removes the cause rather than masking it.',
    signs: ['Smell returns within a day or two of bathing', 'Greasy-feeling skin or fur', 'Odour strongest around ears, paws or skin folds', 'A sour or yeasty smell'],
    phases: [
      { name: 'Deep clean', text: 'A thorough cleanse reaches the skin, folds and paw pads where odour starts.' },
      { name: 'Rebalance', text: 'Treatment targets the bacteria and oil imbalance behind the smell.' },
      { name: 'Freshen', text: 'A clean, natural finish, with no heavy perfumes covering up the result.' },
    ],
    expect: ['Odour gone at the source, not masked', 'Results that last well beyond a regular bath', 'Tips to keep folds, ears and paws fresh'],
    duration: 'About 90 minutes',
    rhythm: 'Monthly works well for most dogs.',
    suitsWith: ['therapy-skin-infection-recovery', 'therapy-herbal-detox'],
    posts: ['monsoon-pet-care-bangalore-dog-skin', 'how-to-read-dog-skin-guide-bangalore'],
    faq: [
      { q: 'Could the smell be from the mouth or ears?', a: 'Yes. Bad breath and ear infections cause strong odours too. We check, and tell you if a vet should look at teeth or ears.' },
      { q: 'Will you use strong perfume?', a: 'No. If the smell needs perfume to hide it, the problem has not been solved.' },
    ],
  },
  {
    slug: 'therapy-aloe-cooling',
    name: 'Skin Relief & Cooling Therapy',
    short: 'Aloe vera cooling for itchy, red, heat-stressed skin.',
    title: 'Aloe Vera Cooling Therapy for Pets: Summer Skin Care',
    description: 'Aloe vera cooling therapy for heat-stressed, itchy and red pet skin in Bangalore summers. Mylopaws Dermacare, HSR Layout.',
    intro:
      'Bangalore’s summer months, roughly March to June, bring heat rash, sun irritation and itchy, inflamed skin. Aloe vera cools, calms and lightly hydrates. This therapy uses it the way it works best: as a soothing treatment, not a fragrance.',
    signs: ['Skin that feels warm or looks inflamed', 'Redness and mild irritation in summer', 'Seeking out cool floors and tiles', 'Licking at the belly or inner legs'],
    phases: [
      { name: 'Cool', text: 'A cool rinse brings skin temperature down straight away.' },
      { name: 'Soothe', text: 'Aloe-based treatment calms redness and inflammation.' },
      { name: 'Hydrate', text: 'A light finish restores moisture without blocking the skin.' },
    ],
    expect: ['Immediately calmer, cooler skin', 'Less redness and licking', 'Summer care tips for walks and home'],
    duration: 'About 90 minutes',
    rhythm: 'Every few weeks through summer as maintenance.',
    suitsWith: ['therapy-sensitive-skin-relief', 'therapy-oatmeal-skin-relief'],
    posts: ['how-to-read-dog-skin-guide-bangalore', 'neem-therapy-dogs-bangalore'],
    faq: [
      { q: 'Can I use aloe vera from my garden?', a: 'Plant aloe contains compounds that can upset a pet’s stomach if licked. We use pet-safe aloe formulations.' },
      { q: 'Is it only for summer?', a: 'It is most popular in summer, but it helps any time skin is hot, red and irritated.' },
    ],
  },
  {
    slug: 'therapy-oatmeal-skin-relief',
    name: 'Oatmeal Skin Relief Therapy',
    short: 'Gentle colloidal-oatmeal relief for chronically itchy, atopic skin.',
    title: 'Oatmeal Skin Relief Therapy for Itchy Dogs & Cats',
    description: 'Gentle colloidal oatmeal therapy for chronically itchy, allergic and atopic skin in dogs and cats. Mylopaws Dermacare, HSR Layout, Bangalore.',
    intro:
      'For pets with long-term itching, allergies or atopic skin, the kindest treatment is often the gentlest. Colloidal oatmeal soothes and protects without harsh chemicals, which makes this therapy suitable for repeated use.',
    signs: ['Itching that has gone on for months', 'Diagnosed or suspected atopic dermatitis', 'Skin that reacts to stronger products', 'Dry, irritated patches that keep returning'],
    phases: [
      { name: 'Soothe', text: 'A colloidal-oatmeal soak calms itching from the first minutes.' },
      { name: 'Protect', text: 'The treatment leaves a light protective layer over irritated skin.' },
      { name: 'Comfort', text: 'A gentle, low-stress finish suited to sensitive and anxious pets.' },
    ],
    expect: ['Relief without harsh chemicals', 'Safe for regular sessions', 'A calmer, more comfortable pet'],
    duration: 'About 90 minutes',
    rhythm: 'Every two to four weeks for chronic itching.',
    suitsWith: ['therapy-sensitive-skin-relief', 'therapy-deep-hydration'],
    posts: ['how-to-read-dog-skin-guide-bangalore', 'dog-scratching-ticks-fleas-skin-infections-bangalore-2'],
    faq: [
      { q: 'Does it work alongside my vet’s treatment?', a: 'Yes, it is designed to complement vet care. Tell us about any medicated shampoos or medicines your pet is on.' },
      { q: 'Is it safe for puppies and kittens?', a: 'It is one of our gentlest therapies. We adjust handling and time for young pets.' },
    ],
  },
  {
    slug: 'therapy-herbal-detox',
    name: 'Herbal Detox & Maintenance Therapy',
    short: 'Natural, recurring care that keeps healthy skin healthy.',
    title: 'Herbal Detox & Maintenance Skin Therapy for Pets',
    description: 'A natural herbal skin and fur maintenance therapy for dogs and cats in Bangalore. Ideal monthly care at Mylopaws Dermacare, HSR Layout.',
    intro:
      'Not every visit needs to fix a problem. This is our recurring-care therapy: a natural herbal detox that clears build-up, refreshes the skin and catches small issues before they become big ones.',
    signs: ['Generally healthy skin that needs regular care', 'Mild, occasional itching', 'A coat that feels heavy or coated with build-up', 'Pets recovering from a past skin issue'],
    phases: [
      { name: 'Detox', text: 'Herbal cleansing lifts build-up from skin and fur.' },
      { name: 'Refresh', text: 'Natural botanicals revive tired, stressed skin.' },
      { name: 'Check', text: 'A specialist check flags anything that needs attention early.' },
    ],
    expect: ['Clean, refreshed skin and fur', 'Early warning on developing issues', 'A simple monthly rhythm'],
    duration: 'About 90 minutes',
    rhythm: 'Monthly.',
    suitsWith: ['therapy-neem-therapy', 'therapy-fur-revival-shine'],
    posts: ['neem-therapy-dogs-bangalore', 'how-to-choose-groomer-bangalore-questions'],
    faq: [
      { q: 'My pet has no skin problems. Is this worth it?', a: 'That is exactly who it is for. Regular care keeps healthy skin healthy and spots small problems early.' },
      { q: 'Is it 100% herbal?', a: 'It is built around herbal and botanical ingredients. Ask our team about specific ingredients if your pet has sensitivities.' },
    ],
  },
  {
    slug: 'therapy-puppy-grooming',
    name: 'Stress-Free Puppy Grooming Therapy',
    short: 'Short, positive first sessions that make grooming easy for life.',
    title: 'Stress-Free Puppy Grooming Therapy in Bangalore',
    description: 'Short, positive grooming sessions that teach puppies to enjoy being handled. Stress-free puppy grooming at Mylopaws Dermacare, HSR Layout.',
    intro:
      'How a puppy experiences its first grooming sessions shapes every visit for the rest of its life. This therapy keeps active handling short and builds positive associations, so grooming becomes something your puppy accepts, even enjoys.',
    signs: ['A puppy who struggles, nips or freezes when handled', 'First-time grooming for a young pet', 'A rescue who is nervous of baths and dryers', 'Puppies starting a skin-care routine'],
    phases: [
      { name: 'Meet', text: 'Time to settle, sniff and get comfortable before any grooming begins.' },
      { name: 'Introduce', text: 'Short, gentle handling, with breaks, rewards and plenty of patience.' },
      { name: 'Celebrate', text: 'We stop while it is still a good experience, so the next visit starts well.' },
    ],
    expect: ['15 to 20 minutes of active handling, never more', 'A calmer puppy at every visit after', 'Tips to practise handling at home'],
    duration: 'About 60 minutes',
    rhythm: 'Every two to four weeks while your puppy is young.',
    suitsWith: ['therapy-oatmeal-skin-relief', 'therapy-herbal-detox'],
    posts: ['bathing-puppy-bangalore-guide', 'socialize-puppy-bangalore-parks-playdates'],
    faq: [
      { q: 'When can my puppy have a first session?', a: 'Once their core vaccinations are done and your vet is happy. Bring the vaccination card.' },
      { q: 'What if my puppy gets scared?', a: 'We stop, comfort and try again later. Forcing it now creates a fearful adult dog.' },
    ],
  },
  {
    slug: 'therapy-neem-therapy',
    name: 'Neem Therapy Solution',
    short: 'Neem’s natural power to soothe, protect and nourish.',
    title: 'Neem Therapy for Dogs: Natural Skin Relief in Bangalore',
    description: 'Natural neem therapy that soothes itching, protects against parasites and nourishes skin. For dogs and cats at Mylopaws Dermacare, HSR Layout.',
    intro:
      'Neem has been used for skin care in India for generations, for good reason: it is naturally antibacterial, antifungal and helps deter parasites. Our neem therapy uses it in pet-safe concentrations to calm and protect stressed skin.',
    signs: ['Itching and redness without a clear cause', 'Skin stress after ticks or infection', 'Pet parents who prefer natural care', 'Mild inflammation that keeps returning'],
    phases: [
      { name: 'Cleanse', text: 'A gentle cleanse prepares the skin to absorb the treatment.' },
      { name: 'Neem treatment', text: 'Neem-based therapy works on the skin to soothe and protect.' },
      { name: 'Nourish', text: 'A nourishing finish leaves skin calm and fur soft.' },
    ],
    expect: ['Soothed, calmer skin', 'A natural layer of protection', 'Soft, healthy-feeling fur'],
    duration: 'About 75 minutes',
    rhythm: 'Every three to four weeks, or as a follow-up to tick and infection therapies.',
    suitsWith: ['therapy-tick-flea-elimination', 'therapy-herbal-detox'],
    posts: ['neem-therapy-dogs-bangalore', 'tick-season-bangalore-protect-your-dog'],
    faq: [
      { q: 'Can I just use neem oil at home?', a: 'Undiluted neem oil can irritate skin and is unpleasant if licked. Concentration and preparation matter, which is why we use pet-safe formulations.' },
      { q: 'Does neem replace tick medicine?', a: 'No. It helps deter parasites and soothes skin, but a vet-recommended preventive is still the main protection.' },
    ],
  },
];

export const therapyBySlug = (slug: string) => THERAPIES.find((t) => t.slug === slug);
