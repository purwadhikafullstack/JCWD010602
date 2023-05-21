import { useEffect, useState } from "react";
import DataProperty from "../components/dataProperty";
import Sidebar from "../components/sidebarwithHeader";
import Navbar from "../components/navbar";
import { axiosInstance } from "../config/config";
import { Flex, Center } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
export default function PageDataProperty() {
  const [pageCountDataProperty, setCountDataProperty] = useState();
  function handlePageClickDataProperty(e) {}
  return (
    <>
      {/* <Sidebar />
      <Flex>
        <Sidebar />
        <Flex flexDir={"column"} gap={2} w="50vw" margin="auto">
          <DataProperty />
        </Flex>
      </Flex> */}
      <Flex>
        <Sidebar />
        <Flex flexDir={"column"} w="full" gap={2}>
          <Navbar />
          <DataProperty />
        </Flex>
      </Flex>
    </>
  );
}
