const PlayGameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="play-game-layout h-full w-full overflow-hidden bg-[#000]">
      {children}
    </div>
  );
};

export default PlayGameLayout;
