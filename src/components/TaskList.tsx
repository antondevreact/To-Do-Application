import { FC } from "react";
import { Trash, Loader } from "lucide-react";
import { EmptyScreen } from "./EmptyScreen";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ITodo } from "@/lib/interface/todo";

interface IProps {
  todos: ITodo[];
  isLoading: boolean;
  onToggleCompletion: (id: string, isCompleted: boolean) => void;
  onDeleteTodo: (id: string) => void;
}

const TaskList: FC<IProps> = ({
  todos,
  isLoading,
  onToggleCompletion,
  onDeleteTodo,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader className="animate-spin mt-[25%] text-primary h-8 w-8" />
      </div>
    );
  }

  if (!todos.length) {
    return <EmptyScreen />;
  }

  const inProgressTasks = todos.filter((todo) => !todo.isCompleted);

  return (
    <>
      <p className="text-white text-base font-normal">
        Tasks to do - {inProgressTasks.length}
      </p>
      <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto scrollable">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className={`bg-[#15101C] rounded-[10px] justify-between flex items-center p-5 transition-all duration-300 ${
              todo?.isCompleted ? "opacity-50 scale-95" : "scale-100"
            }`}
          >
            <div className="flex items-center gap-4">
              <Checkbox
                checked={todo?.isCompleted}
                onCheckedChange={() =>
                  onToggleCompletion(todo._id, todo?.isCompleted)
                }
                className="accent-primary border-primary"
              />
              <span
                className={`text-primary text-base font-normal ${
                  todo?.isCompleted ? "line-through" : ""
                } overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]`}
                title={todo?.title}
              >
                {todo?.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                className="bg-transparent group transform transition-transform duration-300 hover:translate-y-[-4px]"
                onClick={() => onDeleteTodo(todo?._id)}
                size="icon"
              >
                <Trash className="text-primary size-6 group-hover:text-white" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskList;
