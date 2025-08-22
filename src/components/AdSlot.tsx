import Script from 'next/script';

interface Props { slot?: string; className?: string }

export default function AdSlot({ slot, className }: Props) {
  const client = process.env.GOOGLE_ADSENSE_CLIENT;
  if (!client) return null;
  return (
    <div className={className}>
      <Script
        id="adsbygoogle-load"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="
        onLoad={() => {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot || 'auto'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}









