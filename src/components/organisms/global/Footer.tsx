const Footer = () => {
  return (
    <footer className="flex justify-between items-center p-4 w-full bg-white">
      <div className="container mx-auto">
        <span className="text-sm text-gray-400">
          © {new Date().getFullYear()} Phasre. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
