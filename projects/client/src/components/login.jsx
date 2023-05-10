// PROP-4 Authorization / Authentication - As a user, I want to input my username/email and password, so that I can login to the web app
// Validasi user input pada login form
// User dapat login menggunakan metode dari firebase atau pun lainnya (login dengan facebook, phone number, etc)
// Login form :
//   Email / phone number
//   Password

import React, { useState } from "react";
import {
  FormControl,
  Input,
  Button,
  Flex,
  Text,
  Divider,
  Center,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// import { AiFillFacebook } from "react-icons/ai";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const customTheme = extendTheme({
    colors: {
      myColor: "#1A3A6C",
    },
  });

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <form onSubmit={handleSubmit}>
        <Text
          fontSize="lg"
          color="#1A3A6C"
          textAlign="center"
          fontWeight="semibold"
        >
          Login
        </Text>

        <Divider orientation="horizontal" />
        <FormControl isRequired mt="4">
          <Input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Email"
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </FormControl>
        <Center>
          <Button
            mt="3"
            backgroundColor="#1A3A6C"
            color="#FFFFFF"
            type="submit"
            size="md"
          >
            Continue
          </Button>
        </Center>
        <Center>
          <Text>Forgot Password ?</Text>
        </Center>
      </form>
      <Flex w={"258px"} h="36px" alignItems={"center"} gap="4">
        <Divider orientation="horizontal" />
        <Text color={"GrayText"} fontWeight={"light"}>
          OR
        </Text>
        <Divider orientation="horizontal" />
      </Flex>
      <Flex
        color={"facebook.500"}
        my={2}
        justifyContent="center"
        flexDir="column"
        alignContent={"center"}
        gap="1"
      >
        {/* <Icon boxSize={6} as={AiFillFacebook} /> */}

        <Center p={8}>
          <Button
            w={"full"}
            maxW={"md"}
            colorScheme={"facebook"}
            leftIcon={<FaFacebook />}
          >
            <Center>
              <Text>Continue with Facebook</Text>
            </Center>
          </Button>
        </Center>
        <Center p={8} mt="-14">
          <Button
            w={"full"}
            maxW={"md"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </Center>
      </Flex>
    </Flex>
  );
};

export default Login;
