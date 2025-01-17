"use client";

import { useEffect, useState } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import TaskInput from "@/src/components/TaskInput";
import TaskList from "@/src/components/TaskList";
import { addTodo, deleteTodo, getTodos, updateTodo } from "@/services/todo";
import { ITodo } from "@/lib/interface/todo";
import { TOAST_MESSAGES } from "@/src/common";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [todoData, setTodoData] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleClickAddTodo = async (title: string) => {
    try {
      const newTodo = await addTodo(title);

      setTodoData((prev) => [newTodo, ...prev]);

      toast.success(TOAST_MESSAGES.ADD_SUCCESS, {
        icon: <span>🔥</span>,
      });
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error(TOAST_MESSAGES.ADD_ERROR);
    }
  };

  const onToggleCompletion = async (id: string, isCompleted: boolean) => {
    try {
      await updateTodo(id, isCompleted);
      setTodoData((prev) =>
        prev
          .map((todo) =>
            todo._id === id ? { ...todo, isCompleted: !isCompleted } : todo
          )
          .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error(TOAST_MESSAGES.ADD_ERROR);
    }
  };

  const onDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodoData((prev) => prev.filter((todo) => todo._id !== id));

      toast.success(TOAST_MESSAGES.DELETE_SUCCESS);
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error(TOAST_MESSAGES.DELETE_ERROR);
    }
  };

  const loadTodos = async () => {
    setIsLoading(true);

    try {
      const todos = await getTodos();
      setTodoData(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error(TOAST_MESSAGES.FETCH_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <ToastContainer transition={Flip} autoClose={2000} />
      <div className="flex flex-col gap-14 w-[80%] max-w-[600px] my-24 mx-auto">
        <TaskInput onAddTodo={handleClickAddTodo} />
        <div className="flex flex-col gap-4">
          <TaskList
            todos={todoData}
            isLoading={isLoading}
            onToggleCompletion={onToggleCompletion}
            onDeleteTodo={onDeleteTodo}
          />
        </div>
      </div>
    </>
  );
}
