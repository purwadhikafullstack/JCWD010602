import { Box, Flex, Link, Text, Menu, MenuButton, MenuList, MenuItem, Button, Divider, Center } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import ItemCard from "../components/itemcard";
import RoomItemCard from "../components/roomcard";

export default function Rooms(){
    return(
        <>
        <Flex flexDir={"row"}>
            <Flex position="sticky">
                <Sidebar/>
            </Flex>
            
            <Flex flexDir="column">
                <Center>
                    <Text fontSize="24" fontFamily={"Roboto"} fontWeight="bold" paddingY="50px">Rooms</Text>
                </Center>
                <Flex justifyContent={"flex-end"} paddingX="20px">
                    <Button>Add Room</Button>
                </Flex>
                <Flex flexWrap={"wrap"} paddingX={0}>
                    <RoomItemCard name="Formosa Residence" roomname="Studio Room" imgsrc="https://cf.bstatic.com/xdata/images/hotel/max500/402139045.jpg?k=5adeaa62dd406f5743e6dd0746c4597fef8a282a6f7a36c1c94c560bfef928ac&o=&hp=1"/>
                    <RoomItemCard name="Formosa Residence" roomname="Studio Room" imgsrc="https://cf.bstatic.com/xdata/images/hotel/max500/402139045.jpg?k=5adeaa62dd406f5743e6dd0746c4597fef8a282a6f7a36c1c94c560bfef928ac&o=&hp=1"/>
                    <RoomItemCard name="Formosa Residence" roomname="Studio Room" imgsrc="https://cf.bstatic.com/xdata/images/hotel/max500/402139045.jpg?k=5adeaa62dd406f5743e6dd0746c4597fef8a282a6f7a36c1c94c560bfef928ac&o=&hp=1"/>
                    <RoomItemCard name="Formosa Residence" roomname="Studio Room" imgsrc="https://cf.bstatic.com/xdata/images/hotel/max500/402139045.jpg?k=5adeaa62dd406f5743e6dd0746c4597fef8a282a6f7a36c1c94c560bfef928ac&o=&hp=1"/>
                    <RoomItemCard name="Formosa Residence" roomname="Studio Room" imgsrc="https://cf.bstatic.com/xdata/images/hotel/max500/402139045.jpg?k=5adeaa62dd406f5743e6dd0746c4597fef8a282a6f7a36c1c94c560bfef928ac&o=&hp=1"/>
                </Flex>
            </Flex>
        </Flex>
        </>
    )
}