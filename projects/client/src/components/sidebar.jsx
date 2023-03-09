import { Box, Flex, Link, Text, Menu, MenuButton, MenuList, MenuItem, Button, Divider } from "@chakra-ui/react";

export default function Sidebar(){
    return(
        <>
        <Flex w="390px" bgColor={"#B8D2FC"} h="100vh" alignItems={"center"} flexDir="column">
            <Text marginY={0} paddingY="50px" verticalAlign={"center"} fontSize="24" fontFamily={"Roboto"} fontWeight="bold">SewaMurah.com</Text>
            {/* <Divider size={1} variant="solid" color={"black"}/> */}
            <Link paddingY="50px" fontSize="14" fontFamily={"Roboto"} fontWeight="bold">Main Dashboard</Link>
            <Link paddingBottom={"50px"} fontSize="14" fontFamily={"Roboto"} fontWeight="bold">My Earnings</Link>
            <Link paddingBottom={"50px"} fontSize="14" fontFamily={"Roboto"} fontWeight="bold">My Listings</Link>
            <Link paddingBottom={"50px"} fontSize="14" fontFamily={"Roboto"} fontWeight="bold">Profile</Link>
            <Link paddingBottom={"50px"} fontSize="14" fontFamily={"Roboto"} fontWeight="bold">Log Out</Link>
        </Flex>
        </>
    )
}