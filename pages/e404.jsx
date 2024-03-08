import { Back } from "iconsax-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function e404() {
  const duckPuns = [
    "Quack your code, not your head!",
    "Duck typing: When your code quacks like a duck.",
    "Why did the duck become a programmer? Because it loved to debug!",
    "Don't duck the code review!",
    "In duck-typed languages, if it looks like a duck and quacks like a duck, it's probably your code.",
    "Why did the duck use JavaScript? Because it wanted to make its code fly!",
    "Duck and cover: When your code throws exceptions!",
    "A good programmer never ducks responsibility, only bugs.",
    "When in doubt, duck-type it out!",
    "Keep calm and duck-tape your code!",
  ];

  const [pun, setPun] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * duckPuns.length);
    setPun(duckPuns[randomIndex]);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen ">
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          {pun}
        </p>

        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          ERROR 404
        </h1>

        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/9beea042094811.57c019c567886.gif"
          alt="Loading"
        />
        <Link href={`/explore/`}>
          <div className="flex flex-row">
            <Back size="32" color="#2ccce4" />
            <button>Go back</button>
          </div>
        </Link>
      </div>
    </>
  );
}
