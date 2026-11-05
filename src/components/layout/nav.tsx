import Link from "next/link";

const links = [
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export default function nav() {
  return (
    <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur border-b border-neutral-800">
      <Link href="/" className="font-bold text-lg">eldom</Link>
      <nav className="flex gap-6 text-sm text-neutral-400">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
