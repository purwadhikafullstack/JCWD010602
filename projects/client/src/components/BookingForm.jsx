// PROP-12 Transaction - As a user, I can book a room from selected property
// User dapat membuat pesanan baru berdasarkan tempat penginapan yang dipilih, dan berdasarkan ketersediaan room pada tanggal yang dipilih maupun durasi yang ditentukan.
// Pesanan yang baru dibuat, belum bisa diproses oleh tenant sebelum dilakukan upload bukti pembayaran
// Cara pembayaran hanya manual transfer

import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

function BookingForm() {
  const [property, setProperty] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the /book-room endpoint to create a new booking
    fetch("/book-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ property, date, duration }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Reset the form fields after successful booking creation
        setProperty("");
        setDate("");
        setDuration("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box w="400px" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <form onSubmit={handleSubmit}>
        <FormControl id="property" isRequired>
          <FormLabel>Property</FormLabel>
          <Input
            type="text"
            value={property}
            onChange={(e) => setProperty(e.target.value)}
          />
        </FormControl>

        <FormControl id="date" mt={4} isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>

        <FormControl id="duration" mt={4} isRequired>
          <FormLabel>Duration (in days)</FormLabel>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </FormControl>

        <Button mt={4} colorScheme="blue" type="submit">
          Book Room
        </Button>
      </form>
    </Box>
  );
}

export default BookingForm;
