const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[url('/images/body-bg.jpg')] bg-cover bg-center min-h-screen relative">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SiteLayout;
