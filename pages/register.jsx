import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { CheckList } from "@/components/register/checklist"
import Link from "next/link";
import { FormEntry } from "@/components/forms/formEntry"
import { FormEntryBox } from "@/components/forms/formEntryBox"

export default function Register() {
    const [step, setStep] = useState(1);
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

    const nextStep = () => {
        setStep(step + 1);
    };

    const backStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar os dados do formulário, se necessário
    };

    return (
        <div className="flex items-center justify-center flex-col h-dvh">
            <form className="container">
                {step === 1 && (
                    <div className="flex flex-col gap-4">
                        <FormEntry
                            label="Email"
                            id="email"
                            type="email"
                            placeholder="email@email.com"
                            required="required"
                        />

                        <FormEntry
                            label="Password"
                            id="password"
                            type="password"
                            placeholder="**********"
                            required="required"
                        />
                        <FormEntry
                            label="Confirm Password"
                            id="password"
                            type="password"
                            placeholder="**********"
                            required="required"
                        />
                        <Button onClick={nextStep}>Next</Button>
                    </div>
                )}

                {step === 2 && (
                    <div div className="flex flex-col gap-4">
                        <FormEntry
                            label="Name"
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            required="required"
                        />

                        <FormEntry
                            label="Age"
                            id="age"
                            type="number"
                            placeholder="21"
                        />
                        <FormEntryBox
                            label="About"
                            id="about"
                            type="text"
                            placeholder="Little Things about you :)"
                        />
                        <Button onClick={nextStep}>Next</Button>
                        <Button onClick={backStep}>Back * </Button>
                    </div>
                )}


                {step === 3 && (
                    <div div className="flex flex-col gap-4">
                        <FormEntry
                            label="City"
                            id="city"
                            type="text"
                            placeholder="City where you live"
                            required="required"
                        />

                        <FormEntry
                            label="Occupation"
                            id="occupation"
                            type="text"
                            placeholder="FrontEnd Developer"
                        />
                        <Button onClick={nextStep}>Next</Button>
                        <Button onClick={backStep}>Back * </Button>
                    </div>
                )}

                {step === 4 && (
                    <div div className="flex flex-col gap-4">
                        <p>Hard Skils</p>
                        <Button onClick={nextStep}>Next</Button>
                        <Button onClick={backStep}>Back * </Button>
                    </div>
                )}

                {step === 5 && (
                    <div div className="flex flex-col gap-4">
                        <p>Hobbies</p>
                        <Button type="submit">Finish</Button>
                        <Button onClick={backStep}>Back * </Button>
                    </div>
                )}
            </form >

        </div >
    )
}