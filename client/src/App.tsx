import { Container, Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useColorModeValue } from "./components/ui/color-mode";

export const BASE_URL =  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/api"

function App() {
  const bg = useColorModeValue("white", "gray.900");
  const text = useColorModeValue("black", "whiteAlpha.900");

  return (
    <Stack h="100vh" bg={bg} color={text} p={4}>
      <Navbar />
      <Container>
        <TodoForm />
        <TodoList />
      </Container>
    </Stack>
  );
}

export default App;
