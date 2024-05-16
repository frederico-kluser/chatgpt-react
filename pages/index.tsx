import type from "next";
import { useEffect, useState } from "react";
import Login, { LOGIN_CK } from "./login";
import Chat from "../components/chat";
import Input from "../components/input";
import { useRouter } from "next/router";

export type ROLE_TYPE = "user" | "assistant" | "system";
export interface Conversation {
  role: ROLE_TYPE;
  content: string;
}

export enum ROLES {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}

export default function Home() {
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      role: ROLES.SYSTEM,
      content:
        "Você é um professor que é exigente e converte o texto que recebe em uma pergunta, o usuário ira na próxima interação responder a pergunta, você avalia a resposta dele dizendo se passou ou se ele reprovou (seja criterioso). Se o usuário não passar você pergunta o que falta na resposta dele. Se ele passar você parabeniza ele. A cada texto grande que ele mandar você converte em uma pergunta.",
    },
  ]);
  const router = useRouter();

  useEffect(() => {
    async function checkLogin() {
      let loginCK = localStorage.getItem(LOGIN_CK);
      if (!loginCK) {
        router.replace("/login");
        return;
      }

      loginCK = window.atob(loginCK);
      try {
        const res = await fetch(
          `${location.origin}/api/login?password=${loginCK}`
        );
        if (!res.ok) {
          throw Error(res.statusText);
        }
        const data = await res.json();
        if (!data || !data?.result) {
          router.replace("/login");
        }
      } catch (error) {
        router.replace("/login");
      }
    }

    checkLogin();
  }, [router]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-16 flex w-full flex-1 flex-col items-center text-center">
        <Chat conversations={conversations} saving={saving} />
        {errMsg ? (
          <div className="mt-6 w-full font-bold text-red-500">{errMsg}</div>
        ) : (
          ""
        )}
      </div>

      <Input
        conversations={conversations}
        updateConversations={setConversations}
        updateErrMsg={setErrMsg}
        updateSavingStatus={setSaving}
      />
    </div>
  );
}
