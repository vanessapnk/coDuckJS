"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export function DarkModeSwitch() {
    const { setTheme } = useTheme()

    const [isChecked, setIsChecked] = useState(false)
    const handleClick = () => {
        setTheme(isChecked ? "light" : "dark")
        setIsChecked(!isChecked)
    }
    return (
        <>
            <Switch id="dark-mode"
                checked={isChecked}
                onClick={handleClick}
            />
        </>
    )
}