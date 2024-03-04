"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { FormEntry } from "@/components/forms/formEntry"
import Link from "next/link"

export default function Login() {
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
                        />

                    </div>
                    <div className="flex flex-col gap-2">
                        <FormEntry
                            label="Password"
                            id="password"
                            type="password"
                            placeholder="***********"
                        />
                    </div>
                    <div className="flex flex-col gap-6  text-center">
                        <Button type="submit" className="rounded-xl">Login</Button>
                        <Link href="/register">
                            <p className="text-base cursor-pointer">Or Create a new Account</p>
                        </Link>
                    </div>

                </div>
            </div >
        </>
    )
}