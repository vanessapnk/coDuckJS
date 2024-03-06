import * as React from "react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link";
import { FormEntry } from "@/components/forms/formEntry"
import { FormEntryBox } from "@/components/forms/formEntryBox"
import Image from "next/image"
import { BadgeCheck } from "@/components/custom/badgeCheck"


export default function Register() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [about, setAbout] = useState("")
    const [city, setCity] = useState("")
    const [job, setJob] = useState("")
    const [githubUsername, setGithubUsername] = useState("")

    const [hobbies, setHobbies] = useState([]);
    const [languagesSpoken, setLanguagesSpoken] = useState([]);
    const [stacks, setStacks] = useState([]);

    const hobbiesList = ["Hiking", "Photography", "Reading", "Gardening", "Cooking", "Painting", "Dancing", "Music", "Traveling"];
    const stacksList = ["HTML & CSS", "CSS", "JavaScript", "TypeScript", "Tailwind", "React", "NextJs", "MongoDB", "UI/UX Design",];
    const languageList = ["Inglês", "Mandarim", "Espanhol", "Hindi", "Árabe", "Português", "Bengali", "Russo", "Francês"];


    const handleSendStacks = (label, newState) => {
        setStacks((prevStacks) => {
            const updatedStacks = prevStacks.filter(stack => stack.label !== label);
            if (newState) {
                updatedStacks.push({ label: label, state: newState });
            }
            return updatedStacks;
        });
    };

    const handleSendHobbies = (label, newState) => {
        setHobbies((prevHobbies) => {
            const updatedHobbies = prevHobbies.filter(hobbie => hobbie.label !== label);
            if (newState) {
                updatedHobbies.push({ label: label, state: newState });
            }
            return updatedHobbies;
        });
    };

    const handleSendLanguagesSpoken = (label, newState) => {
        setLanguagesSpoken((prevLanguagesSpoken) => {
            const updatedLanguagesSpoken = prevLanguagesSpoken.filter(languagesSpoken => languagesSpoken.label !== label);
            if (newState) {
                updatedLanguagesSpoken.push({ label: label, state: newState });
            }
            return updatedLanguagesSpoken;
        });
    };



    async function createEntry() {
        const filteredStacks = stacks.filter(stack => stack.state);
        const trueStacks = filteredStacks.map(stack => stack.label);

        const filteredHobbies = hobbies.filter(hobbie => hobbie.state);
        const trueHobbies = filteredHobbies.map(hobbie => hobbie.label);

        const filteredLanguages = languagesSpoken.filter(language => language.state);
        const trueLanguages = filteredLanguages.map(language => language.label);

        await fetch("api/signup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, password, passwordConfirmation, name, githubUsername, age, about, city, job, stacks: trueStacks, hobbies: trueHobbies, languagesSpoken: trueLanguages
            })
        });
    }

    const nextStep = () => {
        setStep(step + 1);

    };

    const backStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="flex items-center justify-center flex-col h-dvh">
            <form className="container">
                {step == 1 && (
                    <div className="w-full flex flex-col items-center justify-center gap-8">
                        <Image
                            className="pb-8"
                            src="/images/Saly-38.png"
                            alt="Descrição da imagem"
                            width={500}
                            height={500}
                        />
                        <h1 className="text-start text-[33px] font-bold leading-10">
                            Be part of the <span className="text-yellow-400">community </span>of self-taught <span className="text-blue-400">programmers </span></h1>
                        <p className="font-medium">Boost your programming skills or start from scratch! Study independently, vibing with others who share the same goals as you! </p>
                        <Button className="w-full" onClick={nextStep}>Register</Button>
                    </div>
                )}
                {step === 2 && (
                    <div className="flex flex-col gap-4">
                        <FormEntry
                            label="email"
                            id="email"
                            type="email"
                            placeholder="email@email.com"
                            required="required"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <FormEntry
                            label="password"
                            id="password"
                            type="password"
                            placeholder="**********"
                            required="required"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormEntry
                            label="confirm Password"
                            id="passwordConfirmation"
                            type="passwordConfirmation"
                            placeholder="**********"
                            required="required"
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        {/* {statusCode} */}
                        <Button onClick={nextStep}>Next</Button>
                    </div>
                )}
                {step === 3 && (
                    <div div className="flex flex-col gap-4">
                        <FormEntry
                            label="name"
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            required="required"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <FormEntry
                            label="age"
                            id="age"
                            type="number"
                            placeholder="21"
                            onChange={(e) => setAge(Number(e.target.value))}
                        />
                        <FormEntryBox
                            label="about"
                            id="about"
                            type="text"
                            placeholder="Little Things about you :)"
                            onChange={(e) => setAbout(e.target.value)}
                        />
                        <Button onClick={nextStep}>Next</Button>
                        <Button onClick={backStep}>Back * </Button>
                    </div>
                )}
                {step === 4 && (
                    <div div className="flex flex-col gap-4">
                        <FormEntry
                            label="city"
                            id="city"
                            type="text"
                            placeholder="City where you live"
                            required="required"
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <FormEntry
                            label="occupation"
                            id="occupation"
                            type="text"
                            placeholder="FrontEnd Developer"
                            onChange={(e) => setJob(e.target.value)}
                        />

                        <FormEntry
                            label="gitHub ID"
                            id="github"
                            type="text"
                            placeholder="YourGithubId"
                            onChange={(e) => setGithubUsername(e.target.value)}
                        />
                        <Button onClick={nextStep}>Next</Button>
                        <Button onClick={backStep}>Back * </Button>
                    </div>
                )}
                {step === 5 && (
                    <div div className="flex flex-col gap-4">
                        <p>Stacks</p>
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            {stacksList.map((item, index) =>
                                <BadgeCheck key={index} label={item}
                                    onStateChange={handleSendStacks}
                                />
                            )}
                        </div>
                        <Button onClick={nextStep}>Next</Button>
                        <Button onClick={backStep}>Back * </Button>
                    </div>
                )}
                {step === 6 && (
                    <div div className="flex flex-col gap-4">
                        <p>Hobbies</p>
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            <div className="flex items-center gap-2 flex-wrap justify-center">
                                {hobbiesList.map((item, index) =>
                                    <BadgeCheck key={index} label={item}
                                        onStateChange={handleSendHobbies}
                                    />
                                )}
                            </div>
                        </div>
                        <Button onClick={nextStep}>Next</Button>
                        <Button onClick={backStep}>Back * </Button>
                    </div>
                )}
                {step === 7 && (
                    <div div className="flex flex-col gap-4">
                        <p>Langueges Spoken / finish</p>
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            {languageList.map((item, index) =>
                                <BadgeCheck key={index} label={item}
                                    onStateChange={handleSendLanguagesSpoken}
                                />
                            )}
                        </div>
                        <Link href={"/explore"}>
                            <Button type="submit" onClick={() => createEntry()}>Finish</Button>
                        </Link>
                        <Button onClick={backStep}>Back * </Button>
                    </div>
                )}
            </form >
        </div >
    )
}