import Link from "next/link";

const PlayButton = () => {
  return (
    <Link
      href="/play-game"
      className={`text-2xl px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
    >
      Play Now
    </Link>
  );
};

export default PlayButton;
