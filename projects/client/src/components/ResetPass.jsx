// PROP-6 Authorization / Authentication - As a user, I want to be able to reset my password
// Pada saat di-submit, akan dikirimkan email untuk memproses reset password
// Send reset password form :
//   Email
// Reset password form :
//   New password
//   Confirm new password
// Validasi user input pada kedua form
// Jika user login menggunakan login dengan firebase tidak dapat mengakses fitur ini.

import { useState } from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/update_password", {
      method: "POST",
      body: JSON.stringify({
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }),
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
        Reset Password
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="new-password" isRequired>
          <FormLabel>New password</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm new password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt="1rem">
          Reset Password
        </Button>
      </form>
    </Flex>
  );
}

export default ResetPasswordForm;
