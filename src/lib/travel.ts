// Mylopaws Travel sub-services. /travel-intracity/ is a crawled URL; keep it.

export type TravelService = {
  slug: string;
  name: string;
  short: string;
  title: string;
  description: string;
  intro: string;
  points: { h: string; p: string }[];
  forWho: string[];
  faq: { q: string; a: string }[];
  posts: string[];
};

export const TRAVEL: TravelService[] = [
  {
    slug: 'travel-intracity',
    name: 'Intracity pet cabs',
    short: 'Anywhere in Bangalore, with a driver who expects your pet.',
    title: 'Pet Cab in Bangalore: Intracity Pet Travel | Mylopaws',
    description: 'Pet-friendly cabs anywhere in Bangalore. Dedicated vehicles and trained drivers for dogs and cats, 6 am to midnight. Book Mylopaws Travel.',
    intro:
      'Ride-hailing cabs cancel, refuse or charge extra the moment they see a dog. Mylopaws Travel runs dedicated pet cabs across Bangalore, so your pet is the reason for the trip, not a problem with it.',
    points: [
      { h: 'Pets are the brief, not an exception', p: 'Every Mylopaws cab is booked for a pet. No refusals, no cancellations at the gate, no arguments about fur on seats.' },
      { h: 'Prepared vehicles', p: 'Seat covers, ventilation and space for a crate or carrier, so large dogs and nervous cats both travel comfortably.' },
      { h: 'Drivers who understand animals', p: 'Calm handling, gentle driving and stops when your pet needs one.' },
      { h: 'You can ride along', p: 'Travel with your pet, or send them with us for salon, boarding or family pick-ups.' },
    ],
    forWho: ['Grooming and Dermacare appointments', 'Moving house with pets', 'Pick-ups from breeders, shelters and foster homes', 'Pet-friendly cafés, parks and playdates'],
    faq: [
      { q: 'What are your timings?', a: 'We run every day from 6 am to midnight. Book in advance for early-morning or late-night trips.' },
      { q: 'Can large dogs travel?', a: 'Yes. Tell us your dog’s size and breed when booking so we send a vehicle with enough space.' },
      { q: 'Do I need a crate or carrier?', a: 'Cats should always travel in a carrier. For dogs, a leash and harness is usually enough; anxious dogs are often calmer in a crate.' },
    ],
    posts: ['prepare-dog-first-cab-ride-bangalore', 'pet-travel-bangalore-mistake-pet-parents-make'],
  },
  {
    slug: 'travel-outstation',
    name: 'Outstation pet travel',
    short: 'Road trips from Bangalore to anywhere in India, with your pet beside you.',
    title: 'Outstation Pet Travel From Bangalore | Mylopaws Travel',
    description: 'Outstation pet-friendly cabs from Bangalore to Coorg, Ooty, Chikmagalur, Goa and across India. Comfortable, planned road trips with your pet.',
    intro:
      'Weekend in Coorg, a move to Chennai or a family visit in Hyderabad: flying with a pet is stressful and often impossible. A planned road trip in a pet-ready cab is calmer for everyone.',
    points: [
      { h: 'Planned around your pet', p: 'Breaks for water, walks and rest every two to three hours, timed around your pet’s routine.' },
      { h: 'Comfort for long hours', p: 'Space to lie down, good ventilation and a driver used to long drives with animals.' },
      { h: 'All-India routes', p: 'Short getaways near Bangalore and long-distance relocations across states.' },
      { h: 'Help with the paperwork', p: 'We tell you what to carry: vaccination records, medication and anything your destination needs.' },
    ],
    forWho: ['Weekend getaways to pet-friendly resorts', 'Relocating to a new city', 'Festival and family trips', 'Senior or anxious pets who cannot fly'],
    faq: [
      { q: 'How far can you go?', a: 'Anywhere in India by road. Tell us your route and dates and we will plan the trip.' },
      { q: 'How do you quote for outstation trips?', a: 'Every trip is different, so we quote on WhatsApp once we know the route, dates and pet.' },
      { q: 'Can you stay for a return trip?', a: 'Yes, multi-day and round trips can be arranged.' },
    ],
    posts: ['outstation-travel-pet-bangalore-checklist', 'dog-friendly-routes-bangalore-coorg-ooty-chikmagalur', 'travelling-senior-dog-bangalore-guide'],
  },
  {
    slug: 'travel-airport',
    name: 'Airport pet transfers',
    short: 'To and from Kempegowda International Airport, timed to your flight.',
    title: 'Pet Airport Transfer in Bangalore: Kempegowda (BLR)',
    description: 'Pet-friendly airport transfers to and from Bangalore’s Kempegowda International Airport. Timed to your flight, with room for crates. Mylopaws.',
    intro:
      'Getting a pet to the airport means crates, paperwork and tight timing, and most cabs will not take the crate at all. Our airport transfers are planned around your flight and your pet’s travel requirements.',
    points: [
      { h: 'Room for airline crates', p: 'Vehicles chosen for the crate size your airline requires.' },
      { h: 'Timed to check-in', p: 'Pet check-in usually needs extra time. We plan pick-up so you are not rushing.' },
      { h: 'Arrivals too', p: 'Pick-ups after long flights, when your pet needs a calm, quick ride home.' },
      { h: 'Relocation-friendly', p: 'Pair with outstation travel or Homes if you need help before or after the flight.' },
    ],
    forWho: ['Domestic flights with pets', 'International relocations', 'Pets arriving through cargo', 'Families travelling with a crate and luggage'],
    faq: [
      { q: 'Do you handle airline paperwork?', a: 'Airline and pet-relocation paperwork stays with you or your relocation agent. We make sure the ride fits around it.' },
      { q: 'How early should I book?', a: 'As soon as your flight is fixed, especially for early-morning or late-night flights.' },
    ],
    posts: ['outstation-travel-pet-bangalore-checklist', 'pet-travel-bangalore-mistake-pet-parents-make'],
  },
  {
    slug: 'travel-vet-visits',
    name: 'Vet visits & emergencies',
    short: 'Calm rides to the vet, and quick help when it cannot wait.',
    title: 'Pet Cab for Vet Visits in Bangalore | Mylopaws Travel',
    description: 'Pet-friendly cabs for vet appointments, surgeries, vaccinations and urgent visits across Bangalore. Gentle drivers, prepared vehicles. Mylopaws.',
    intro:
      'A vet visit is stressful enough. When your pet is unwell, recovering from surgery or simply too big for a scooter, a pet-ready cab makes the trip calmer and safer.',
    points: [
      { h: 'Gentle, steady driving', p: 'Important for pets in pain, after surgery or with motion sickness.' },
      { h: 'Help loading and unloading', p: 'Drivers who help with large, senior or recovering pets.' },
      { h: 'Wait-and-return trips', p: 'We can wait during the appointment and bring you home.' },
      { h: 'Urgent trips', p: 'For emergencies, call us directly. We will help where we can and tell you honestly if another option is faster.' },
    ],
    forWho: ['Vaccinations and check-ups', 'Surgery drop-offs and pick-ups', 'Senior pets with mobility issues', 'Urgent but stable cases'],
    faq: [
      { q: 'Is this an ambulance service?', a: 'No. We are a pet cab, not a veterinary ambulance. In a life-threatening emergency, call your vet first and take the fastest route available.' },
      { q: 'Can you go to any vet in Bangalore?', a: 'Yes, any clinic or hospital in the city.' },
    ],
    posts: ['travelling-senior-dog-bangalore-guide', 'puppy-vaccination-schedule-india-bangalore'],
  },
];

export const travelBySlug = (slug: string) => TRAVEL.find((t) => t.slug === slug);
