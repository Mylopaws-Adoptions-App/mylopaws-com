'use client';

import { useState } from 'react';

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  if (!images.length) return <div className="gal-main empty-img" aria-hidden="true" />;
  return (
    <div className="gal">
      <div className="gal-main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[i]} alt={alt} width={640} height={640} fetchPriority="high" draggable={false} />
      </div>
      {images.length > 1 && (
        <div className="gal-thumbs">
          {images.map((src, n) => (
            <button key={src} type="button" aria-label={`Image ${n + 1}`} aria-pressed={n === i} onClick={() => setI(n)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" width={72} height={72} loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
