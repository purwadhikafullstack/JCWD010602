import {
  Flex,
  Image,
  Box,
  Link,
  Divider,
  Icon,
  useDisclosure,
  Center,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
// import Logo from "../assets/logo.svg.png";
import { Link as ReachLink } from "react-router-dom";
import { useRef } from "react";
import { FiHome, FiBox, FiWatch } from "react-icons/fi";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { RiDashboard2Line } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
export default function Sidebar() {
  return (
    <>
      <Flex
        className="sidebar"
        zIndex={90}
        w={"209px"}
        fontFamily={"Tw Cen MT"}
        justifyContent="center"
        h={"100vh"}
        top={"70"}
        paddingY="15px"
        mt={"10px"}
        borderRight={"2px solid #E2E8F0"}
        bgColor={"#B8D2FC"}
        pos={"fixed"}
      >
        <Flex gap={5} flexDir={"column"} w={"209px"}>
          <Flex flexDir={"column"} alignItems={"center"}>
            <Divider orientation="horizontal" />
            <Flex
              w="207px"
              h="56px"
              alignItems={"center"}
              _hover={{
                bg: "orange",
                color: "black",
              }}
            >
              <Icon as={RiDashboard2Line} color="black" ml={"15px"} />
              <Link
                to="/adminpage"
                mx={3}
                as={ReachLink}
                fontSize="15px"
                fontWeight="bold"
                color="black"
              >
                DASHBOARD
              </Link>
            </Flex>
            <Divider orientation="horizontal" />
            <Flex
              w="207px"
              h="56px"
              alignItems={"center"}
              _hover={{
                bg: "orange",
                color: "black",
              }}
              py={2}
            >
              <Icon as={FiHome} color="black" ml={"15px"} />
              <Link
                to="/data-property"
                mx={3}
                as={ReachLink}
                fontSize="15px"
                fontWeight="bold"
                color="black"
              >
                {" "}
                PROPERTY
              </Link>
            </Flex>
            <Divider orientation="horizontal" />
            <Flex
              w="207px"
              h="56px"
              alignItems={"center"}
              _hover={{
                bg: "orange",
                color: "black",
              }}
              py={2}
            >
              <Icon as={FiHome} color="black" ml={"15px"} />
              <Link
                to="/data-room"
                mx={3}
                as={ReachLink}
                fontSize="15px"
                fontWeight="bold"
                color="black"
              >
                ROOM
              </Link>
            </Flex>

            <Divider orientation="horizontal" />

            <Flex
              w="207px"
              h="56px"
              alignItems={"center"}
              _hover={{
                bg: "orange",
                color: "black",
              }}
              py={2}
            >
              <Icon as={GrTransaction} color="black" ml={"15px"} />
              <Link
                to="/data-transaction"
                mx={3}
                as={ReachLink}
                fontWeight="bold"
                fontSize="15px"
                color="black"
              >
                {" "}
                TRANSACTION
              </Link>
            </Flex>
            <Divider orientation="horizontal" />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
