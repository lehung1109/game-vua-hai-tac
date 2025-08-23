import Header from "@/components/organisms/global/Header";
import Footer from "@/components/organisms/global/Footer";
import PlayButton from "@/components/atoms/button/PlayButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow-1 flex justify-center items-center text-center">
        <div className="container">
          <PlayButton />
        </div>
      </main>
      <Footer />
    </div>
  );
}
