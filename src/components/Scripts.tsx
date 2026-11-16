import Script from 'next/script';
import { ANALYTICS, ANANNYA_AGENT_ID } from '@/lib/site';

/** GA4 + Google Ads (one gtag), and Anannya, the ElevenLabs voice agent. Both load after the page is interactive. */
export function Scripts() {
  return (
    <>
      {/* Define gtag + consent defaults before React hydrates, so shop events fired on first render are queued, not dropped. */}
      <Script id="mp-gtag-init" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments);};gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});try{if(localStorage.getItem('mp_consent')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});}}catch(e){}gtag('js',new Date());gtag('config','${ANALYTICS.ga4}');gtag('config','${ANALYTICS.ads}');`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4}`} strategy="afterInteractive" />
      <Script id="mp-lead-clicks" strategy="afterInteractive">
        {`document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a');if(!a)return;var h=a.href||'';if(h.indexOf('mylopaws.app')>-1||h.indexOf('wa.me')>-1||h.indexOf('tel:')===0){gtag('event','generate_lead',{link_url:h,page_path:location.pathname});}if(h.indexOf('wa.me/')>-1){var vet=h.indexOf('wa.me/918971500296')>-1;gtag('event',vet?'vet_consult_click':'whatsapp_click',{link_url:h.split('?')[0],page_path:location.pathname});try{if(typeof window.fbq==='function')fbq('track','Contact');}catch(x){}}},{passive:true});`}
      </Script>
      <Script id="mp-header-scroll" strategy="afterInteractive">
        {`(function(){var h=document.querySelector('.site-header');if(!h)return;var c='scrolled';function u(){if(window.scrollY>10){h.classList.add(c)}else{h.classList.remove(c)}}window.addEventListener('scroll',u,{passive:true});u();document.addEventListener('contextmenu',function(e){if(e.target&&e.target.tagName==='IMG')e.preventDefault()})})();`}
      </Script>
      <Script id="mp-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","y8zd9qyelj");`}
      </Script>
      <elevenlabs-convai agent-id={ANANNYA_AGENT_ID}></elevenlabs-convai>
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed@0.21.4" strategy="lazyOnload" />
    </>
  );
}
