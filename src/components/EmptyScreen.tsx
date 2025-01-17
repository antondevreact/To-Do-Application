import { FC } from "react";
import { ListTodo } from "lucide-react";
import { INFO_MESSAGES } from "@/lib/constatns";

export const EmptyScreen: FC = () => (
  <div className="text-white flex flex-col items-center gap-2">
    <ListTodo className="size-2/5" />
    {INFO_MESSAGES.map((message, index) => (
      <div key={index} className="flex items-center gap-2">
        <span className="text-base font-medium">{message.text}</span>
        {message.icon}
      </div>
    ))}
  </div>
);
