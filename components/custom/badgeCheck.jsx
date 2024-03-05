import React, { useState, useEffect } from "react";
import { Badge } from "../ui/badge";

export function BadgeCheck({ label, onStateChange }) {
    const [checkBox, setCheckBox] = useState(false);
    const [secondaryState, setSecondaryState] = useState("");

    useEffect(() => {
        setSecondaryState(checkBox ? label : "");

        onStateChange(label, checkBox);
    }, [checkBox, label, onStateChange]);

    const handleBadgeClick = () => {
        setCheckBox(!checkBox);
    };

    return (
        <>
            <Badge
                className="cursor-pointer select-none text-xl"
                variant={`${checkBox ? "secondary" : "outline"}`}
                onClick={handleBadgeClick}
            >
                {label}
            </Badge>
        </>
    );
}