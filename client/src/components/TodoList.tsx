import { Stack, Spinner, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import TodoItem, { type Todo } from "./TodoItem";
import { BASE_URL } from "../App";

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${BASE_URL}/api/todos`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  const data = await res.json();

  return data.map((t: any) => ({
    id: t._id || t.id,
    body: t.body,
    completed: t.completed,
    expiresAt: t.expiresAt || new Date().toISOString(),
  }));
};

const TodoList = () => {
  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading)
    return (
      <Flex justifyContent="center" my={4}>
        <Spinner size="xl" />
      </Flex>
    );

  if (isError)
    return (
      <Text textAlign="center" color="red.400">
        Failed to load todos.
      </Text>
    );

  if (todos.length === 0)
    return (
      <Text textAlign="center" color="gray.500">
        No todos yet!
      </Text>
    );

  return (
    <Stack gap={3}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Stack>
  );
};

export default TodoList;
