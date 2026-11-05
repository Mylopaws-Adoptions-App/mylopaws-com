import { Arrow, Clock } from '@/components/Icons';
import { Photo, photo } from '@/components/Blocks';
import { CONTACT, waLink } from '@/lib/site';

const VET = {
  name: CONTACT.vet.label,
  short: 'Dr Amrita',
  role: 'Consulting veterinarian · dogs & cats',
  photo: '/photos/dr-amrita.webp',
  wa: waLink(CONTACT.vet.wa, 'Hi Dr Amrita, I found you on mylopaws.com. I would like a video consult for my pet.'),
};

const AREAS: { h: string; p: string }[] = [
  { h: 'Skin & coat issues', p: 'Itching, redness, rashes, hot spots, hair loss and a dull coat' },
  { h: 'Ticks & fleas', p: 'Treating infestations, safe products and prevention schedules' },
  { h: 'Dandruff & flaky skin', p: 'Dry or greasy scaling, bathing routines and diet for a healthy coat' },
  { h: 'Fungal infections', p: 'Ringworm and yeast infections of the skin, paws and ears' },
  { h: 'Chronic skin conditions', p: 'Food and environmental allergies, recurring infections, long-term care plans' },
  { h: 'General health', p: 'Vaccination and deworming guidance, digestive issues, diet advice, second opinions' },
];

/** Full profile for the Dermacare page: who she is, what she treats, how to reach her. */
export function VetSpotlight() {
  return (
    <section className="section alt" id="vet" data-sol="dermacare" aria-labelledby="vet-h">
      <div className="wrap vet">
        <figure className="vet-photo">
          <Photo src={photo(VET.photo)} alt={`${VET.name}, consulting veterinarian at Mylopaws Dermacare`} />
          <figcaption><b>{VET.name}</b><span>{VET.role}</span></figcaption>
        </figure>
        <div className="vet-body">
          <div className="eyebrow">Consult our vet</div>
          <h2 id="vet-h">Not sure what it is? <em>Ask {VET.short}.</em></h2>
          <p className="lead">{VET.short} is a veterinarian with an M.V.Sc and 9 years of clinical experience in Bengaluru. For over 2 years she has helped pet parents manage skin, coat and general health concerns by video and audio consult, from home.</p>
          <div className="vet-stats">
            <div><b>9 yrs</b><span>clinical experience</span></div>
            <div><b>2+ yrs</b><span>teleconsultation</span></div>
            <div><b>M.V.Sc</b><span>Master of Veterinary Science</span></div>
          </div>
          <ul className="vet-areas">
            {AREAS.map((a) => <li key={a.h}><b>{a.h}</b><span>{a.p}</span></li>)}
          </ul>
          <div className="vet-cta">
            <a className="btn btn-primary" href={VET.wa}>Book a consult on WhatsApp <Arrow /></a>
            <div className="vet-meta">
              <span><Clock size={16} /> {CONTACT.vet.hours}</span>
              <span>Video and audio consults for dogs and cats · {CONTACT.vet.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Compact card for the side of health articles. Not a medical review of the article. */
export function VetNote() {
  return (
    <div className="card vet-note">
      <div className="vet-note-top">
        <span className="vet-note-av"><Photo src={photo(VET.photo)} alt="" /></span>
        <div><b>Ask our vet</b><span>{VET.name}, M.V.Sc</span></div>
      </div>
      <p>Questions about your pet&rsquo;s skin, coat or health? Video and audio consults, every day, 9:30 am to 8:30 pm.</p>
      <a className="btn btn-primary" href={VET.wa}>Chat with {VET.short}</a>
    </div>
  );
}

export const vetPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: VET.name,
  jobTitle: 'Consulting Veterinarian',
  honorificPrefix: 'Dr',
  description: 'Veterinarian with an M.V.Sc and 9 years of clinical experience in Bengaluru, offering video and audio consults for skin, coat and general health in dogs and cats.',
  knowsAbout: ['Dog skin conditions', 'Cat skin conditions', 'Ticks and fleas', 'Fungal infections in pets', 'Pet allergies', 'Veterinary teleconsultation'],
  hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'Master of Veterinary Science (M.V.Sc)' },
  worksFor: { '@id': 'https://mylopaws.com/dermacare/#business' },
};
