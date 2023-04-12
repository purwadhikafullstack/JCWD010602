import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

const ProfilePictureForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Only JPG, PNG and GIF file types are allowed!");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      axios
        .post("/profile-picture", formData)
        .then((res) => {
          console.log(res.data);
          setFile(null);
          setError(null);
        })
        .catch((err) => {
          console.log(err.response.data);
          setError(err.response.data.message);
        });
    }
  };

  return (
    <Box p="6">
      <VStack spacing="6">
        <FormControl>
          <FormLabel>Upload Profile Picture</FormLabel>
          <Input
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={handleFileChange}
          />
        </FormControl>
        {error && <Box color="red">{error}</Box>}
        <Button colorScheme="blue" disabled={!file} onClick={handleFormSubmit}>
          Upload
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfilePictureForm;
