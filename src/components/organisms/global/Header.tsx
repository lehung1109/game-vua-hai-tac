import Link from "next/link";
import { checkServerSideAuth } from "@/utils/auth";
import { LoginPayload } from "@/app/api/auth/login/route";
import LogoutButton from "@/components/atoms/button/LogoutButton";

const Header = async () => {
  let me: LoginPayload | undefined | "";

  try {
    me = await checkServerSideAuth<LoginPayload>();
  } catch (error) {
    // do nothing
  }

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
          {!!me ? (
            <div className="flex items-center">
              <div className="text-md inline-block mr-2 ">Hi {me.email}</div>
              <LogoutButton />
            </div>
          ) : (
            <>
              <a
                href="/login"
                className="px-4 py-2 mr-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
