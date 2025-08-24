import Footer from "@/components/organisms/global/Footer";
import Header from "@/components/organisms/global/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[url('/images/body-bg.jpg')] bg-cover bg-center min-h-screen relative">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow-1 flex justify-center items-center text-center">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SiteLayout;
