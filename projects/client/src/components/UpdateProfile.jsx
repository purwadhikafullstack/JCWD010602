// PROP-8 Profiling - As a user, I want to update my personal data such as name, gender, email and birthdate
// Update profile form : Name / Email / Gender / Birthdate
// Validasi data pada update profile form

import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";

const UpdateProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const toast = useToast();

  const handleUpdate = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || gender === "" || birthdate === "") {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Gender:", gender);
    console.log("Birthdate:", birthdate);

    toast({
      title: "Profile updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="gender">
        <FormLabel>Gender</FormLabel>
        <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)}>
          <Stack direction="row">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl id="birthdate">
        <FormLabel>Birthdate</FormLabel>
        <Input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </FormControl>
      <Button type="submit" mt={4} colorScheme="blue">
        Update Profile
      </Button>
    </form>
  );
};

export default UpdateProfileForm;
