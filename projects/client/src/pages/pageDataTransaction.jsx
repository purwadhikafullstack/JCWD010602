import { Flex } from "@chakra-ui/react";
import DataTransaction from "../components/dataTransaction";
import Sidebar from "../components/sidebarwithHeader";
import Navbar from "../components/navbar";
export default function PageDataTransaction() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Flex flexDir={"column"} w="full" gap={2}>
          <Navbar />
          <DataTransaction />
        </Flex>
      </Flex>
    </>
  );
}
