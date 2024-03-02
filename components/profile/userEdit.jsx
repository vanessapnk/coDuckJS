import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function UserEdit() {
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-start gap-2">
                    <Label htmlFor="text">Name</Label>
                    <Input className="py-6" type="text" placeholder="John Due" />
                </div>

                <div className="flex flex-col items-start gap-2">
                    <Label htmlFor="githubid">GitHub ID</Label>
                    <Input className="py-6" type="text" placeholder="/githubname" />
                </div>

                <div className="flex flex-col items-start gap-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input className="py-6" type="text" placeholder="Pegar do banco de dados o dado atual" />
                </div>

                <div className="flex flex-col items-start gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input className="py-6" type="text" placeholder="Porto-PT" />
                </div>

                <div className="flex flex-col items-start gap-2">
                    <Label htmlFor="about">Location</Label>
                    <Textarea placeholder="about" />
                </div>
            </div>
        </>
    )
}