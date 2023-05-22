import { Box, Flex, Link, Text, Menu, MenuButton, MenuList, MenuItem, Button, Divider, Image, useDisclosure, Modal, ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton } from "@chakra-ui/react";
import AddEditItem from "./addedititem";
import { useNavigate } from "react-router-dom";

export default function ItemCard(props){
    const navigate = useNavigate();

    function handleClick() {
      navigate("/rooms");
    }
    return(
        <>
        <Flex w="300px" bgColor={"#B8D2FC"} h="350px" alignItems={"center"} flexDir="column" border="1px solid #1A3A6C" borderRadius="10px" margin="10px" padding="10px">
            <Image borderRadius="10px" paddingBottom="10px" src={props.imgsrc} />
            <Text fontSize="24" fontFamily={"Roboto"} fontWeight="bold">{props.name}</Text>
            <Button onClick={handleClick} marginY="10px" padding="10px" w="226px">View Property</Button>
        </Flex>
        </>
    )
}