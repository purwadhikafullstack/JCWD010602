import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // ;;;
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <form onSubmit={handleSubmit}>
        <Text fontSize="lg">Login</Text>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="text" value={username} onChange={handleUsernameChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Continue
        </Button>
      </form>
      {/* <HStack>
        <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
          Facebook
        </Button>
        <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
          Twitter
        </Button>
      </HStack> */}
    </Flex>
  );
};

export default Login;
