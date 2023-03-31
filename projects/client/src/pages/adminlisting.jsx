import { Box, Flex, Link, Text, Menu, MenuButton, MenuList, MenuItem, Button, Divider, Center } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import ItemCard from "../components/itemcard";
import { axiosInstance } from '../config/config';
import { useEffect, useState } from 'react';

export default function AdminListing(){
    const [datas, setDatas] = useState([]);

    async function fetchData() {
        await axiosInstance.get("/products").then((res) => {
            setDatas([...res.data.result])
        })
    };

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <>
        <Flex flexDir={"row"}>
            <Flex position="sticky">
                <Sidebar/>
            </Flex>
            
            <Flex flexDir="column">
                <Center>
                    <Text fontSize="24" fontFamily={"Roboto"} fontWeight="bold" paddingY="50px">My Listings</Text>
                </Center>
                <Flex justifyContent={"flex-end"} paddingX="20px">
                    <Button>Add Room</Button>
                </Flex>
                <Flex flexWrap={"wrap"} paddingX={0}>
                    {   
                        datas?.map((val) => {
                            return <ItemCard data={val} />

                        })
                    }
                </Flex>
            </Flex>
        </Flex>
        </>
    )
}