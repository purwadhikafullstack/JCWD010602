import { useState } from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

function SendResetPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/send_reset_password_email", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Flex direction="column" align="center" justify="center" mt="2rem">
      <Heading size="2xl" mb="1rem">
        Reset Password Email
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt="1rem">
          Send Email
        </Button>
      </form>
    </Flex>
  );
}

export default SendResetPasswordForm;
