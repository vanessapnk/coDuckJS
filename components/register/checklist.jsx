import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";

export function CheckList({ setStacks, stackName, initialCheckedState }) {
    // const [isChecked, setIsChecked] = useState(false);

    // useEffect(() => {
    //     setIsChecked(initialCheckedState);
    // }, []);

    // const handleClick = () => {
    //     const newValue = !isChecked;
    //     setIsChecked(newValue);

    //     setStacks((prevStacks) =>
    //         newValue
    //             ? [...prevStacks, stackName]
    //             : prevStacks.filter((stack) => stack !== stackName)
    //     );
    // };

    return (
        <div>
            dsdd
        </div>
        // <div
        //     className="container flex flex-col gap-4 cursor-pointer"
        //     onClick={handleClick}
        // >
        //     <div className="flex flex-col items-center gap-2">
        //         <div
        //             className={`w-full border dark:border-zinc-800 flex content-center flex-row items-center justify-between p-4 py-6 rounded-3xl 
        //   ${isChecked
        //                     ? "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-10 "
        //                     : "bg-slate-50 dark:bg-zinc-950"
        //                 } `}
        //         >
        //             <p className="flex font-semibold text-xl">{stackName}</p>
        //             <Switch checked={isChecked} />
        //         </div>
        //     </div>
        // </div>
    );
}
