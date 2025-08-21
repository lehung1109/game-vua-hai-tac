import Header from "@/components/organisms/global/Header";
import Footer from "@/components/organisms/global/Footer";
import PlayButton from "@/components/atoms/button/PlayButton";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <PlayButton />
      </main>
      <Footer />
    </div>
  );
}
