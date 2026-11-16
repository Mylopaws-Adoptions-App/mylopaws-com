'use client';
import { usePathname } from 'next/navigation';
import { ANANNYA_AGENT_ID } from '@/lib/site';

/** Anannya, the ElevenLabs voice agent. Hidden on the cart/checkout and order pages, where its floating button
 * sat on top of the pay and form buttons on phones. */
const HIDE = ['/shopping/cart', '/shopping/order'];

export function VoiceAgent() {
  const path = usePathname() ?? '';
  if (HIDE.some((p) => path.startsWith(p))) return null;
  return <elevenlabs-convai agent-id={ANANNYA_AGENT_ID}></elevenlabs-convai>;
}
