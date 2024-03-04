import { Badge } from "@/components/ui/badge"
import { CardItem } from "../custom/cardItem"

export function UserBody() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-base">
                    Skills
                </h1>
                <div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="profile">HTML</Badge>
                        <Badge variant="profile">CSS</Badge>
                        <Badge variant="profile">JavaScript</Badge>
                        <Badge variant="profile">ES6+</Badge>
                        <Badge variant="profile">Git</Badge>
                        <Badge variant="profile">Node.js</Badge>
                        <Badge variant="profile">Express.js</Badge>
                        <Badge variant="profile">RESTful APIs</Badge>
                        <Badge variant="profile">MongoDB</Badge>
                        <Badge variant="profile">React</Badge>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-base">
                    Hobbies
                </h1>
                <div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="profile">Series</Badge>
                        <Badge variant="profile">Sair</Badge>
                        <Badge variant="profile">Musica</Badge>
                        <Badge variant="profile">Viajar</Badge>
                        <Badge variant="profile">Esportes</Badge>
                        <Badge variant="profile">Leitura</Badge>
                        <Badge variant="profile">Arte</Badge>
                        <Badge variant="profile">Fotografia</Badge>
                        <Badge variant="profile">Cozinhar</Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}