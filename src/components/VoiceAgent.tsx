'use client';
import { usePathname } from 'next/navigation';
import { ANANNYA_AGENT_ID } from '@/lib/site';

/** Anannya, the ElevenLabs voice agent. Hidden everywhere under /shopping (browse, product, cart, checkout, order):
 * on phones its floating button sat on top of the cart bar and the pay and form buttons. */
const isShopping = (path: string) => path === '/shopping' || path.startsWith('/shopping/');

export function VoiceAgent() {
  const path = usePathname() ?? '';
  if (isShopping(path)) return null;
  return <elevenlabs-convai agent-id={ANANNYA_AGENT_ID}></elevenlabs-convai>;
}
