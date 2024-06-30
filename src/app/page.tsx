import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-w-screen min-h-screen gap-10">
      <Link className="bg-blue-500 p-2 rounded-lg" href={'/login'}>Login</Link>
      <Link className="bg-blue-500 p-2 rounded-lg" href={'/signup'}>SignUp</Link>
    </div>
  );
}
