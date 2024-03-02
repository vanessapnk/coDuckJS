import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { CheckList } from "@/components/custom/checklist";
import Link from "next/link";


export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [userName, setUserName] = useState("")
    const [age, setAge] = useState(0)
    const [about, setAbout] = useState("")
    const [city, setCity] = useState("")
    const [job, setJob] = useState("")
    const [stacks, setStacks] = useState([]);
    const [hobbies, setHobbies] = useState([]);

    const stacksList = ["HTML & CSS", "CSS", "JavaScript", "TypeScript", "Tailwind", "React", "NextJs", "MongoDB", "UI/UX Design",];

    const hobbiesList = ["Hiking", "Photography", "Reading", "Gardening", "Cooking", "Painting", "Dancing", "Music", "Traveling"];

    async function createEntry() {
        await fetch("api/entry/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, password, passwordConfirm, userName, age, about, city, job, stacks, hobbies
            })
        })
    }

    return (
        <div className="flex items-center justify-center flex-col h-dvh">
            <div>
                register
                {/* <Carousel setApi={setApi} className="w-full pb-10 ">
                    <CarouselContent >
                        <CarouselItem  >
                            <div className="container flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" id="email" placeholder="Email" />
                                </div>
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password" id="password" placeholder="Password" />
                                </div>
                                <div>
                                    <Label htmlFor="password">Confirm Password</Label>
                                    <Input
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        type="password" id="passwordConfirm" placeholder="Password" />
                                </div>
                                <div></div>
                            </div>
                        </CarouselItem>

                        <CarouselItem >
                            <div className="container flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="text">Name</Label>
                                    <Input
                                        onChange={(e) => setUserName(e.target.value)}
                                        type="text" id="name" placeholder="Name" />
                                </div>
                                <div>
                                    <Label htmlFor="number">Age</Label>
                                    <Input
                                        onChange={(e) => setAge(Number(e.target.value))}
                                        type="number" id="age" placeholder="Age" />
                                </div>
                                <div>
                                    <Label htmlFor="text">About</Label>
                                    <Textarea
                                        onChange={(e) => setAbout(e.target.value)}
                                        maxLength={150} placeholder="Fale um cadinho sobre ti :)" id="about" />
                                </div>
                                <div></div>
                            </div>
                        </CarouselItem>

                        <CarouselItem className="">
                            <div className="container flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="text">Location</Label>
                                    <Input
                                        onChange={(e) => setCity(e.target.value)}
                                        type="text" id="city" placeholder="City" />
                                </div>
                                <div>
                                    <Label htmlFor="text">Professional occupation</Label>
                                    <Input
                                        onChange={(e) => setJob(e.target.value)}
                                        type="text" id="occupation" placeholder="Your Job" />
                                </div>
                                <div></div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="flex pl-0 flex-col gap-4">
                            {stacksList.map((stack, index) => (
                                <CheckList
                                    key={index}
                                    stacks={stacks}
                                    setStacks={setStacks}
                                    stackName={stack}
                                />
                            ))}
                            <div></div>
                        </CarouselItem>

                        <CarouselItem className="flex pl-0 flex-col gap-4">
                            {hobbiesList.map((hobbie, index) => (
                                <CheckList
                                    key={index}
                                    stacks={hobbies}
                                    setStacks={setHobbies}
                                    stackName={hobbie}
                                />
                            ))}
                            <div></div>
                        </CarouselItem>
                        <CarouselItem >
                            <div className="container flex flex-col gap-4">
                                <div className="flex flex-col  items-center gap-2">
                                    <p>Prontinho! </p>
                                    <p className="pb-60">Agora vamos finalizar!</p>
                                    <Link href="/">
                                        <Button
                                            onClick={() => createEntry()}
                                            className="w-full">Finish</Button>
                                    </Link>
                                </div>
                            </div>
                            <div></div>
                        </CarouselItem>

                    </CarouselContent>
                </Carousel> */}
                {/* <div className="py-2 text-center text-sm text-muted-foreground">
                    {current + "0"} of {count + "0"}
                </div> */}

            </div>
        </div >
    )
}