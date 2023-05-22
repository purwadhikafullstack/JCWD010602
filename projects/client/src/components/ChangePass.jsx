import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const { currentUser, updatePassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        await updatePassword(newPassword);
        toast({
          title: "Password updated",
          description: "Your password has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        setErrors({ submit: error.message });
      }
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = {};

    if (!oldPassword) {
      errors.oldPassword = "Old password is required";
    }

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      errors.newPassword = "New password must be at least 6 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm new password is required";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <Box p="6">
      <form onSubmit={handleSubmit}>
        <VStack spacing="6">
          <FormControl isRequired isInvalid={!!errors.oldPassword}>
            <FormLabel>Old Password</FormLabel>
            <Input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
            />
            <FormErrorMessage>{errors.oldPassword}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.newPassword}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
            <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.confirmPassword}>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>
          {errors.submit && (
            <Box color="red.500" textAlign="center">
              {errors.submit}
            </Box>
          )}
          {!currentUser.providerData[0].providerId.includes("password") && (
            <Box color="gray.500" textAlign="center">
              You logged in with {currentUser.providerData[0].providerId}.
              Change password is not supported for this login method.
            </Box>
          )}
          {currentUser.providerData[0].providerId.includes("password") && (
            <Button type="submit" colorScheme="blue" isLoading="">
              Change Password
            </Button>
          )}
        </VStack>
      </form>
    </Box>
  );
};

export default ChangePasswordForm;
