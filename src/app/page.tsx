import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bold">
        <Link href="/ivantorriani">Click to Go to Counter </Link>
      </div>
    </div>
  );
}
