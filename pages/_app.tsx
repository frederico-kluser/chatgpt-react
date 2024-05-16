import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { DarkContext } from "../utils/darkContext";
import useLocalStorage from "@/hooks/useLocalStorage";
// import * as Sentry from "@sentry/nextjs";

// GO: https://sentry.io/
// Sentry.init({
//   dsn: "your_own_sentry_dsn",
//   tracesSampleRate: 1.0,
// });

const DARK_MODE = "DARK";

export default function App({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(false);
  const user = useLocalStorage("user");
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );

  const isMyLove = () => user === "claudia";

  useEffect(() => {
    const darkMode = localStorage.getItem(DARK_MODE);
    if (darkMode) {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(DARK_MODE, dark ? "dark" : "");
  }, [dark]);

  const playAudio = (path: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reseta o tempo do áudio anterior
    }

    const newAudio = new Audio(path);
    newAudio.play();
    setCurrentAudio(newAudio);
  };

  useEffect(() => {
    if (isMyLove()) {
      playAudio(
        "/John Paul Young - Love Is In The Air (John Junior & Oscar Edit).mp3"
      );
    }
  }, [user]);

  return (
    <>
      <div className={`${dark ? "dark" : ""}`}>
        <DarkContext.Provider value={dark}>
          <div
            className={`${
              isMyLove() ? "love-background" : ""
            } min-h-screen text-slate-900 dark:bg-slate-900 dark:text-slate-100`}
          >
            <Header dark={dark} setDark={setDark} />
            <main className="mx-auto flex flex-col items-center">
              <Component {...pageProps} />
            </main>
          </div>
        </DarkContext.Provider>
      </div>
      <Analytics />
    </>
  );
}
