import {
  Button,
  Flex,
  Input,
  Spinner,
  NumberInput,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../App";

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const [expiresIn, setExpiresIn] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate: createTodo, isPending } = useMutation({
    mutationFn: async ({ body, expiresIn }: { body: string; expiresIn: number }) => {
      const res = await fetch(`${BASE_URL}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, expiresIn }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create todo");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodo("");
      setExpiresIn(60);
      inputRef.current?.focus();
    },
    onError: (err: any) => alert(err.message || "Error creating todo"),
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    createTodo({ body: newTodo, expiresIn });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap={2} alignItems="center">
        <Input
          type="text"
          placeholder="Enter a task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          ref={inputRef}
          required
        />

        <NumberInput.Root
          value={String(expiresIn)}
          min={1}
          max={1440}
          onValueChange={({ value }) => setExpiresIn(Number(value) || 0)}
          width="120px"
        >
          <NumberInput.Input placeholder="Expiry (min)" />
          <NumberInput.Control />
        </NumberInput.Root>

        <Button
          type="submit"
          aria-label="Add todo"
          disabled={isPending || !newTodo.trim()}
          _active={{ transform: "scale(.97)" }}
        >
          {isPending ? <Spinner size="xs" /> : <IoMdAdd size={24} />}
        </Button>
      </Flex>
    </form>
  );
};

export default TodoForm;
