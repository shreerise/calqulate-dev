import type { SVGProps } from "react"

/**
 * Recognizable payment brand marks rendered as inline SVG so they stay crisp at
 * any size and need no external image assets. Used in the site footer to show
 * which payment methods we accept.
 */

const badgeWrap =
  "flex h-8 w-[52px] items-center justify-center rounded-md bg-white px-1.5 shadow-sm ring-1 ring-black/5"

function Visa(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 16" role="img" aria-label="Visa" {...props}>
      <text
        x="24"
        y="13"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontStyle="italic"
        fontSize="15"
        fill="#1434CB"
        letterSpacing="0.5"
      >
        VISA
      </text>
    </svg>
  )
}

function Mastercard(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 30" role="img" aria-label="Mastercard" {...props}>
      <circle cx="19" cy="15" r="11" fill="#EB001B" />
      <circle cx="29" cy="15" r="11" fill="#F79E1B" />
      <path
        d="M24 6.2a11 11 0 0 1 0 17.6 11 11 0 0 1 0-17.6Z"
        fill="#FF5F00"
      />
    </svg>
  )
}

function Amex(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 30" role="img" aria-label="American Express" {...props}>
      <rect width="48" height="30" rx="3" fill="#1F72CF" />
      <text
        x="24"
        y="13"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="7"
        fill="#FFFFFF"
      >
        AMERICAN
      </text>
      <text
        x="24"
        y="22"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="7"
        fill="#FFFFFF"
      >
        EXPRESS
      </text>
    </svg>
  )
}

function PayPal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 20" role="img" aria-label="PayPal" {...props}>
      <text
        x="40"
        y="15"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontStyle="italic"
        fontSize="15"
      >
        <tspan fill="#003087">Pay</tspan>
        <tspan fill="#009CDE">Pal</tspan>
      </text>
    </svg>
  )
}

function Razorpay(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 20" role="img" aria-label="Razorpay" {...props}>
      <path d="M5 1 1.6 19h3.3L8.3 1H5Z" fill="#3395FF" />
      <path d="M11.4 1 8 19h3.3l1.6-8.6 4.4 8.6h3.7l-4.3-8.4L23 1h-3.6l-5 5.7L15.6 1h-4.2Z" fill="#072654" />
      <text
        x="58"
        y="15"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="14"
        fill="#072654"
      >
        Razorpay
      </text>
    </svg>
  )
}

const BRANDS = [
  { Logo: Visa, w: "w-9" },
  { Logo: Mastercard, w: "w-7" },
  { Logo: Amex, w: "w-8" },
  { Logo: PayPal, w: "w-11" },
  { Logo: Razorpay, w: "w-12" },
]

export function PaymentBadges() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {BRANDS.map(({ Logo, w }, i) => (
        <span key={i} className={badgeWrap}>
          <Logo className={`${w} h-auto`} />
        </span>
      ))}
    </div>
  )
}
