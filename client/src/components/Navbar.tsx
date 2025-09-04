import {
  Box,
  Flex,
  Text,
  Container,
} from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";

export default function Navbar() {
  const bg = useColorModeValue("gray.200", "gray.700");

  return (
    <Container maxW="900px">
      <Box
        bg={bg}
        px={4}
        my={4}
        borderRadius="md"
        position="sticky"
        top={0}
        zIndex={10}
        boxShadow="sm"
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* LEFT SIDE (Branding) */}
          <Text fontSize="xl" fontWeight="bold">
            Task Manager
          </Text>

          {/* RIGHT SIDE */}
          <Flex alignItems="center" gap={3}>
            <Text fontSize="lg" fontWeight={500}>
              Daily Tasks
            </Text>
            <ColorModeButton />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
}
 