import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 w-full bg-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* navigation */}
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>

        {/* right side include login and sign up button */}
        <div>
          <Link
            href="/login"
            className="px-4 py-2 mr-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
