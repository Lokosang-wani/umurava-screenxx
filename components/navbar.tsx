import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 flex items-center justify-between px-8 z-50">
      <Link href="/" className="flex items-center">
        <Image 
          src="/umarava-logo.png" 
          alt="Umarava Logo" 
          width={265} 
          height={60} 
          className="h-[58px] w-auto"
          priority
        />
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2 text-gray-700">
              <span
                aria-hidden="true"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700"
              >
                {user.email?.[0].toUpperCase() ?? "U"}
              </span>
              <span className="text-sm hidden sm:inline">{user.email}</span>
            </div>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-[#2B74F0] transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <span className="text-sm">Sign Out</span>
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-[#2B74F0] transition"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-[#2B74F0] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e57d4] transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
