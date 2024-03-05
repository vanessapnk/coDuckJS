import { Badge } from "@/components/ui/badge";
import { CardItem } from "../custom/cardItem";

// UserBody.jsx
export function UserBody({ stacks, hobbies, languagesSpoken }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-base">Stacks</h1>
        <div>
          <div className="flex flex-wrap gap-2">
            {stacks.map((stack, index) => (
              <Badge key={index} variant="profile">
                {stack}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-base">Hobbies</h1>
        <div>
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, index) => (
              <Badge key={index} variant="profile">
                {hobby}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-base">Languages Spoken</h1>
        <div>
          <div className="flex flex-wrap gap-2">
            {languagesSpoken.map((language, index) => (
              <Badge key={index} variant="profile">
                {language}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
