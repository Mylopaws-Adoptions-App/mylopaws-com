import Script from 'next/script';
import { ANALYTICS, ANANNYA_AGENT_ID } from '@/lib/site';

/** GA4 + Google Ads (one gtag), and Anannya, the ElevenLabs voice agent. Both load after the page is interactive. */
export function Scripts() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4}`} strategy="afterInteractive" />
      <Script id="gtag" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ANALYTICS.ga4}');gtag('config','${ANALYTICS.ads}');
document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a');if(!a)return;var h=a.href||'';if(h.indexOf('mylopaws.app')>-1||h.indexOf('wa.me')>-1||h.indexOf('tel:')===0){gtag('event','generate_lead',{link_url:h,page_path:location.pathname});}},{passive:true});`}
      </Script>
      <elevenlabs-convai agent-id={ANANNYA_AGENT_ID}></elevenlabs-convai>
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed@0.21.4" strategy="lazyOnload" />
    </>
  );
}
