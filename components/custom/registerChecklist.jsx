import React, { useState } from "react";
import { Label } from "../ui/label";

export function RegisterChecklist({ id, label }) {
    const [checkBox, setCheckBox] = useState(false);
    const labels = "Davi"
    const handleCheckboxChange = () => {
        setCheckBox(!checkBox);
    };

    return (
        <div className="flex items-center gap-2">
            <input
                id="default-checkbox"
                type="checkbox"
                value=""
                checked={checkBox}
                onChange={handleCheckboxChange}
                className="w-4 h-4  bg-zinc-100 border-zinc-300 rounded focus:ring-blue-500   focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"

            >
            </input>
            <Label htmlFor={id}>{labels}</Label>
        </div>
    );
}
