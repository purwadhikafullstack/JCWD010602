import DataRoom from "../components/dataRoom";
import Sidebar from "../components/sidebarwithHeader";
import Navbar from "../components/navbar";
import { Flex } from "@chakra-ui/react";

export default function PageDataRoom() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Flex flexDir={"column"} w="full" gap={2}>
          <Navbar />
          <DataRoom />
        </Flex>
      </Flex>
    </>
  );
}
