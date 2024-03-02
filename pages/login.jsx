"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


export default function Login() {
    return (
        <>
            <div className="flex items-center justify-center h-dvh">
                <div className="container flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Password</Label>
                        <Input type="email" id="email" placeholder="Password" />
                    </div>
                    <div className="mt-4">
                        <Button type="submit">Login</Button>
                    </div>
                </div>
            </div >
        </>
    )
}