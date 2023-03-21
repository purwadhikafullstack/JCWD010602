import { Box, Flex, Link, Text, Menu, MenuButton, MenuList, Select, Button, Input, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormErrorMessage, FormHelperText,} from "@chakra-ui/react";
import { useState } from "react";

export default function AddEditItem(){
    const [input, setInput] = useState('')
    const handleInputChange = (e) => setInput(e.target.value)
    const isError = input === ''

    return(
        <>
        <ModalOverlay />
            <ModalContent>
            <ModalHeader>Edit Room</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl isInvalid={isError}>
                    <FormLabel>Name</FormLabel>
                    <Input type='name' value={input} onChange={handleInputChange} />
                    {!isError ? (
                        <FormHelperText>
                        Please enter the name of the property
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Name is required.</FormErrorMessage>
                    )}
                </FormControl>

                <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select placeholder='Select location'>
                        <option>Batam</option>
                        <option>Jakarta</option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input type='description' />
                    <FormHelperText>Enter details about the property</FormHelperText>
                </FormControl>
                Picture
                Room
            </ModalBody>

            <ModalFooter>
                {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button> */}
                <Button variant='ghost'>Save Changes</Button>
            </ModalFooter>
            </ModalContent>
        </>
    )
}