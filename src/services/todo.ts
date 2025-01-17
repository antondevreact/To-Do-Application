import api from "./axios";
import { ITodo } from "@/lib/interface/todo";

const url = {
  todos: "/todo",
};

export const getTodos = async (): Promise<ITodo[]> => {
  try {
    const { data } = await api.get(url.todos);

    return data.todos;
  } catch (error) {
    console.error("Error fetching todos:", error);

    throw error;
  }
};

export const addTodo = async (title: string): Promise<ITodo> => {
  try {
    const { data } = await api.post(url.todos, { title });

    return data.todo;
  } catch (error) {
    console.error("Error adding todo:", error);

    throw error;
  }
};

export const updateTodo = async (
  id: string,
  isCompleted: boolean
): Promise<void> => {
  try {
    await api.patch(url.todos, { id, isCompleted: !isCompleted });
  } catch (error) {
    console.error("Error toggling todo completion:", error);

    throw error;
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await api.delete(url.todos, {
      data: { id },
    });
  } catch (error) {
    console.error("Error deleting todo:", error);

    throw error;
  }
};
