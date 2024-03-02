import React, { useState } from "react";
import Switch from "@/components/ui/switch";

function CheckList({ stacks, setStacks, stackName }) {
    const [isChecked, setIsChecked] = useState(false);
    const handleClick = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        setStacks((prevStacks) =>
            newValue
                ? [...prevStacks, stackName]
                : prevStacks.filter((stack) => stack !== stackName)
        );
    };
    return (
        React.createElement("div", {
            className: "container flex flex-col gap-4 cursor-pointer",
            onClick: handleClick
        },
            React.createElement("div", {
                className: `w-full border dark:border-zinc-800 flex content-center flex-row items-center justify-between p-4 py-6 rounded-3xl 
              ${isChecked ? 'bg-blue-100 dark:bg-blue-900 dark:bg-opacity-10 ' : 'bg-slate-50 dark:bg-zinc-950'} `
            },
                React.createElement("p", {
                    className: "flex font-semibold text-xl"
                }, stackName),
                React.createElement(Switch, { checked: isChecked })
            )
        )
    );
}

