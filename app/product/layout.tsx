import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
