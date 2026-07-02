"use client";

const CARDS = [
  { src: "/cards/visa.svg", alt: "Visa" },
  { src: "/cards/mastercard.svg", alt: "Mastercard" },
  { src: "/cards/amex.svg", alt: "Amex" },
  { src: "/cards/discover.svg", alt: "Discover" },
];

export function GatewayPicker() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {CARDS.map((c) => (
        <img key={c.alt} src={c.src} alt={c.alt} className="h-5 w-8 rounded object-cover shadow-sm" />
      ))}
    </div>
  );
}
