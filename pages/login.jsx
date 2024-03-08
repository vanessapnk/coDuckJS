"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FormEntry } from "@/components/forms/formEntry";
import Link from "next/link";
import { useAuth } from "./context/authContext";
import { useUserAuth } from "./_app";

export default function Login() {
  // const { authenticatedUser, setAuthenticatedUser } = useAuth();
  const { user, login } = useUserAuth((state) => state);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStatus, setEmailStatus] = useState("neutral");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Faço um fetch para pegar o ID com base no Email e Password
        const resBody = await response.json();

        //Tambem guardar o resto da info
        login({ userId: resBody.id, userData: resBody.user });
        // Atualize o estado authenticatedUser aqui
        // setAuthenticatedUser({ id: responseId.id });

        router.push(`/profile/${resBody.id}`);
      } else {
        router.push("/e404");
        console.error("Login failed");
        setEmailStatus("failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col gap-4 justify-center h-dvh">
        <div className="container flex flex-col gap-6">
          <div className="flex items-center justify-center">
            {/* <Image
              className="p-2 bg-zinc-700 rounded-2xl"
              src="/images/Saly-38.png"
              alt="Descrição da imagem"
              width={200}
              height={200}
            /> */}
          </div>
          <h1 className="text-start text-[33px] pb-8 font-bold leading-10">
            Be part of the <span className="text-yellow-400">community </span>of
            self-taught <span className="text-blue-400">programmers </span>
          </h1>
          {/* <p className="font-medium">Boost your programming skills or start from scratch! Study independently, vibing with others who share the same goals as you! </p> */}
          <div className="flex flex-col gap-2">
            <FormEntry
              label="Email"
              id="email"
              type="email"
              placeholder="Email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailStatus === "faild" && <p>Email já existente</p>}
          </div>
          <div className="flex flex-col gap-2">
            <FormEntry
              label="Password"
              id="password"
              type="password"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-6  text-center">
            <Button type="submit" className="rounded-xl" onClick={handleLogin}>
              Login
            </Button>
            <Link href="/register">
              <p className="text-base cursor-pointer">Or</p>
              <p className="text-base pt-2 text-opacity-70 cursor-pointer font-semibold">
                Create a new Account
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
