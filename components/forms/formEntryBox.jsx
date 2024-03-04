import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea";

export function FormEntryBox({ label, id, type, placeholder, onChange, required }) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Textarea
                className="focus-visible:ring-1 active:outline-0 focus-visible:ring-offset-0 rounded-xl"
                onChange={onChange}
                type={type}
                id={id}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};
