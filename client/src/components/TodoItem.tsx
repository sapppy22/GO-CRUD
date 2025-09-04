import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";

export type Todo = {
  id: string;
  body: string;
  completed: boolean;
  expiresAt: string;
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();
  const [timeLeft, setTimeLeft] = useState("");

 
  useEffect(() => {
    const updateTimeLeft = () => {
      if (!todo.expiresAt) return;
      const now = new Date().getTime();
      const expire = new Date(todo.expiresAt).getTime();
      const diff = expire - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const minutes = Math.floor(diff / 1000 / 60) % 60;
      const hours = Math.floor(diff / 1000 / 60 / 60);
      setTimeLeft(`${hours}h ${minutes}m left`);
    };

    updateTimeLeft(); 
    const timer = setInterval(updateTimeLeft, 60 * 1000); 
    return () => clearInterval(timer);
  }, [todo.expiresAt]);

  
  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      if (todo.completed) return;
      const res = await fetch(`${BASE_URL}/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      if (!res.ok) throw new Error("Failed to update todo");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // 🗑️ Delete mutation
  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE_URL}/api/todos/${todo.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete todo");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <Flex gap={2} alignItems="center">
      <Flex
        flex={1}
        alignItems="center"
        border="1px"
        borderColor="gray.600"
        p={3}
        borderRadius="lg"
        justifyContent="space-between"
      >
        <Flex direction="column" flex={1}>
          <Text
            color={todo.completed ? "green.400" : "yellow.300"}
            textDecoration={todo.completed ? "line-through" : "none"}
          >
            {todo.body}
          </Text>
          <Text fontSize="sm" color="gray.400">
            {timeLeft}
          </Text>
        </Flex>

        {todo.completed ? (
          <Badge colorScheme="green">Done</Badge>
        ) : (
          <Badge colorScheme="yellow">In Progress</Badge>
        )}
      </Flex>

      <Flex gap={2} alignItems="center">
        <Box color="green.500" cursor="pointer" onClick={() => updateTodo()}>
          {isUpdating ? <Spinner size="sm" /> : <FaCheckCircle size={20} />}
        </Box>
        <Box color="red.500" cursor="pointer" onClick={() => deleteTodo()}>
          {isDeleting ? <Spinner size="sm" /> : <MdDelete size={25} />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
