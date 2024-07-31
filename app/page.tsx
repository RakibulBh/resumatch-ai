import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const InfoPage = () => {
  return (
    <div className="flex min-h-screen flex-col pt-44 pl-24 gap-y-8">
      <h1 className="text-3xl font-bold tracking-wide space-y-6">
        ResuMatch’s AI Tailor makes <br /> sure you:
      </h1>
      <div className="flex flex-col gap-4">
        {/* {infoPageBullets.map((bullet) => (
          <div key={bullet.description} className="flex gap-x-3 items-center">
            <div className="w-10 h-10 rounded-full bg-blue-400" />
            <p>{bullet.description}</p>
          </div>
        ))} */}
      </div>
      <Link href="/dashboard">
        <Button className="w-48">Tailor your resume for free</Button>
      </Link>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex min-h-screen flex-col pt-32 pl-24">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-wide space-y-6">
            Want to increase your <br />
            chances of getting that <br /> <strong>DREAM</strong> job?
          </h1>
          <p className="text-gray-400">
            Unlock your full potential with a tailored resume for that certain
            job application,
            <br /> tailor your resume now and start receiving interviews and
            offers <br />
            immeditaley!
          </p>
        </div>
        <div className="flex gap-8 pt-6">
          <Link href="/dashboard">
            <Button>Try for free</Button>
          </Link>
          <Button>Watch Demo</Button>
        </div>
      </div>
      <InfoPage />
    </main>
  );
}
