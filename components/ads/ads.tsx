// "use client"

// import { useEffect, useState } from "react"

// interface AdProps {
//   className?: string
// }

// export function BannerAd({ className = "" }: AdProps) {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     // Simulate ad loading delay
//     const timer = setTimeout(() => setIsVisible(true), 100)
//     return () => clearTimeout(timer)
//   }, [])

//   if (!isVisible) {
//     return (
//       <div className={`bg-muted/30 border rounded-lg p-4 animate-pulse ${className}`}>
//         <div className="h-24 bg-muted rounded"></div>
//       </div>
//     )
//   }

//   return (
//     <div className={`bg-muted/30 border rounded-lg p-4 text-center transition-opacity duration-300 ${className}`}>
//       <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Advertisement</div>
//       <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-8 min-h-[90px] flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-muted-foreground font-medium">Premium Ad Space Available</p>
//           <p className="text-sm text-muted-foreground/70 mt-1">728 x 90 Banner</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export function InContentAd({ className = "" }: AdProps) {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), 200)
//     return () => clearTimeout(timer)
//   }, [])

//   if (!isVisible) {
//     return (
//       <div className={`bg-muted/30 border rounded-lg p-4 my-8 animate-pulse ${className}`}>
//         <div className="h-64 bg-muted rounded"></div>
//       </div>
//     )
//   }

//   return (
//     <div className={`bg-muted/30 border rounded-lg p-4 text-center my-8 transition-opacity duration-300 ${className}`}>
//       <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Advertisement</div>
//       <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-lg p-8 min-h-[250px] flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-muted-foreground font-medium">In-Content Ad Space</p>
//           <p className="text-sm text-muted-foreground/70 mt-1">300 x 250 Rectangle</p>
//           <p className="text-xs text-muted-foreground/50 mt-2">High engagement placement</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export function SidebarAd({ className = "" }: AdProps) {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), 300)
//     return () => clearTimeout(timer)
//   }, [])

//   if (!isVisible) {
//     return (
//       <div className={`bg-muted/30 border rounded-lg p-4 animate-pulse ${className}`}>
//         <div className="h-96 bg-muted rounded"></div>
//       </div>
//     )
//   }

//   return (
//     <div className={`bg-muted/30 border rounded-lg p-4 text-center transition-opacity duration-300 ${className}`}>
//       <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Advertisement</div>
//       <div className="bg-gradient-to-b from-primary/10 via-accent/5 to-primary/10 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-muted-foreground font-medium text-sm">Sidebar Ad</p>
//           <p className="text-xs text-muted-foreground/70 mt-1">160 x 600</p>
//           <p className="text-xs text-muted-foreground/50 mt-2">Skyscraper format</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Export as namespace for easy usage
// const Ads = {
//   BannerAd,
//   InContentAd,
//   SidebarAd,
// }

// export default Ads
