// PROP-13 Transaction - As a user, I want to upload my payment proof, so that I can confirm my order
// User dapat mengupload bukti bayar untuk dapat melanjutkan proses
// Terdapat batasan waktu untuk melakukan upload bukti pembayaran sekitar 2 jam. Jika user belum upload bukti pembayaran, maka proses booking akan secara otomatis dibatalkan.
// Validasi terhadap gambar yang diupload, ekstensi yang diperbolehkan hanya .jpg atau .png
// Validasi max size 1MB

import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";

const UploadProof = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!["image/png", "image/jpeg"].includes(selectedFile.type)) {
      setMessage("Only .png and .jpeg files are allowed.");
    } else if (selectedFile.size > 1000000) {
      setMessage("File size cannot exceed 1MB.");
    } else {
      setFile(selectedFile);
      setMessage(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/upload", formData);
      setMessage("File uploaded successfully.");
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" p="6">
      <FormControl isRequired>
        <FormLabel>Upload payment proof:</FormLabel>
        <Input type="file" accept=".png,.jpeg" onChange={handleFileChange} />
        {message && <Box color="red">{message}</Box>}
      </FormControl>
      <Button
        mt="4"
        colorScheme="blue"
        onClick={handleSubmit}
        isDisabled={!file}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UploadProof;
