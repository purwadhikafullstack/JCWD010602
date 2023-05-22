import { useEffect, useState } from "react";
import DataProperty from "../components/dataProperty";
import { axiosInstance } from "../config/config";
import { Flex } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
export default function PageDataProperty() {
  const [pageCountDataProperty, setCountDataProperty] = useState();
  function handlePageClickDataProperty(e) {}
  return (
    <>
      <Flex flexDir={"column"} gap={2} w="50vw" margin="auto">
        <DataProperty />
      </Flex>
    </>
  );
}
