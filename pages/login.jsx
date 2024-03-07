"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FormEntry } from "@/components/forms/formEntry";
import Link from "next/link";
import { useAuth } from "./context/authContext";

export default function Login() {
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
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
        const responseId = await response.json();

        // Atualize o estado authenticatedUser aqui
        setAuthenticatedUser({ id: responseId.id });

        router.push(`/profile/${responseId.id}`);
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
        <Image
          className="pb-8 rounded-3xl "
          src="/images/Saly-38.png"
          alt="Descrição da imagem"
          width={300}
          height={300}
        />
        <div className="container flex flex-col gap-6">
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
              <p className="text-base cursor-pointer">
                Or Create a new Account
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
