import React, { useEffect } from "react";
import Head from "next/head";
import Sun from "../public/sun.svg";
import Moon from "../public/moon.svg";
import useLocalStorage from "@/hooks/useLocalStorage";

interface Props {
  dark: boolean;
  setDark: (mode: boolean) => void;
}

export default function Header(props: Props) {
  const { dark, setDark } = props;
  const [showLogout, setShowLogout] = React.useState(true);
  const user = useLocalStorage("user");

  return (
    <div>
      <Head>
        <title>Fred é foda</title>
        <meta name="description" content="This app is just for CK's friends." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="shdow-2xl fixed z-10 flex h-16 w-screen items-center justify-between bg-white px-4 text-slate-800 shadow dark:bg-black dark:text-slate-100">
        <h1 className="text-2xl font-bold">ChatGPT</h1>
        <div
          className="cursor-pointer text-slate-100"
          onClick={() => {
            setDark(!dark);
          }}
        >
          {dark ? (
            <Sun width={30} height={30} fill={dark ? "#ddd" : "#222"} />
          ) : (
            <Moon width={30} height={30} fill={dark ? "#ddd" : "#222"} />
          )}
        </div>
        {!!user && (
          <div
            className={
              dark
                ? "cursor-pointer rounded-md bg-gray-100 px-2 py-1 text-slate-100 dark:bg-slate-700 dark:text-slate-100"
                : "cursor-pointer rounded-md bg-gray-800 px-2 py-1 text-slate-100 dark:bg-slate-700 dark:text-slate-100"
            }
            onClick={() => {
              localStorage.removeItem("loginCK");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            Logout
          </div>
        )}
      </header>
    </div>
  );
}
