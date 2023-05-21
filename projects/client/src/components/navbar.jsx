import {
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  Box,
  List,
  Input,
  Menu,
  Link,
  Button,
  Divider,
  Icon,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  ListItem,
  Avatar,
  Center,
} from "@chakra-ui/react";
//   import Register2 from "./register2";
import Avatar1 from "../assets/avatar.png";
import Logo from "../assets/logosewamurah.png";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { RiAccountCircleFill, RiDashboard2Line } from "react-icons/ri";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";

import { Link as ReachLink } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiBox,
  FiWatch,
} from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Navbar(props) {
  //   const data = props.data;
  //   const userSelector = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  //   function inputHandler(event) {
  //     const { value, name } = event.target;

  //     name === "search"
  //       ? setSearch(value)
  //       : setProduct({
  //           ...product,
  //           [name]: value,
  //         });
  //   }

  // useEffect(
  //   ()=>{
  //     console.log(search)
  //   }, [search]
  // )

  return (
    <>
      <Flex
        zIndex={50}
        h={"80px"}
        fontFamily={"Tw Cen MT"}
        backgroundColor="#B8D2FC"
        // justifyContent="end"
        alignItems={"center"}
        w="full"
        pos="sticky"
        top="0"
        paddingY="20px"
        paddingRight={"20px"}
        paddingLeft={"0px"}
        display={"flex"}
        justifyContent={"space-between"}
        // borderBottom={"1px solid #E2E8F0"}
      >
        <Flex w="150px" h={"80px"} mb={"5px"} ml={"30px"}>
          <Image height={"80px"} w={"100%"} src={Logo} />
        </Flex>
        <Flex px={3} gap={5}>
          <Flex alignItems={"center"} justifyContent={"end"}>
            <Icon
              boxSize={"7"}
              as={FiBell}
              color="black"
              bgColor={"#B8D2FC"}
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
            ></Icon>
          </Flex>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Flex
                flexDir={"rows"}
                px={2}
                // w="320px"
                h="58px"
                justifyContent={"right"}
                alignContent={"center"}
                // bgColor="red"
                alignItems={"center"}
              >
                <Center>
                  <Avatar
                    boxSize={"12"}
                    src={Avatar1}
                    sx={{
                      _hover: {
                        cursor: "pointer",
                      },
                    }}
                  />
                </Center>
                <Flex flexDir={"column"} px="10px" justifyContent={"center"}>
                  <Flex fontSize={"16px"} color="black">
                    Doni
                  </Flex>
                  <Flex fontSize={"12px"} color="#264F8F" fontWeight={"bold"}>
                    Admin
                  </Flex>
                </Flex>
              </Flex>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              {/* <PopoverCloseButton /> */}

              <PopoverBody>
                <List fontSize={"14px"} fontFamily="Bebas" gap={2}>
                  <ListItem>Profile</ListItem>
                  <ListItem>Settings</ListItem>

                  <Divider orientation="horizontal" py={2} />
                  <ListItem>
                    <Link to="/login" as={ReachLink}>
                      Logout{" "}
                    </Link>{" "}
                  </ListItem>
                </List>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
    </>
  );
}
