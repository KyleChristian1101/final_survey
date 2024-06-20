import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>HOMEPAGE</h1>
      <Link href="/survey">Survey</Link>
    </main>
  );
}
