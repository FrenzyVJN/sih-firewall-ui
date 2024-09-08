import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-row justify-center mt-10">
        <div className="border px-8 py-1 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer rounded-l-lg">Home</div>
        <div className="border px-8 py-1 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer ">Services</div>
        <div className="border px-8 py-1 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer ">IPSets</div>
        <div className="border px-8 py-1 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer ">ICMP Types</div>
        <div className="border px-8 py-1 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer ">Helper</div>
        <div className="border px-8 py-1 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer ">Direct config</div>
        <div className="border px-8 py-1 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer ">Whitelist & Blacklist</div>
        <div className="border px-8 py-1 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer ">Logs</div>
        <Link href="/ai-mode" className="border px-8 py-1 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer ">AI Mode</Link>
        <div className="border px-8 py-1 hover:bg-white hover:bg-opacity-25 hover:cursor-pointer rounded-r-lg">Settings</div>
      </div>
    </main>
  );
}
