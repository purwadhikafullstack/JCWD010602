import {
  Flex,
  Box,
  Center,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Image,
  Container,
  Icon,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { HiOutlineLocationMarker } from "react-icons/hi";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import ModalAllRooms from "./modalAllRooms";
import { axiosInstance } from "../config/config";
import ReactPaginate from "react-paginate";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
export default function DataProperty(props) {
  const [id, setId] = useState();
  const {
    onToggle: onToggleModal,
    onClose: onCloseModal,
    isOpen: isOpenModal,
  } = useDisclosure();
  const [property, setProperty] = useState([]);
  const [nameProperty, setNameProperty] = useState();
  const [pageCountDataProperty, setPageCountDataProperty] = useState();
  const pageDataProperty = useRef();

  function handlePageClickDataProperty(e) {
    pageDataProperty.current = e.selected + 1;
  }

  async function fetchProperty() {
    await axiosInstance
      .get(`/api/property/all?page=${pageDataProperty.current}`)
      .then((res) => {
        setProperty(res.data.result.result);
        setPageCountDataProperty(res.data.result.pageCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    pageDataProperty.current = 1;
    fetchProperty();
  }, []);

  useEffect(() => {
    if (id) {
      onToggleModal();
    } else {
      onCloseModal();
    }
    console.log(nameProperty);
  }, [id]);
  return (
    <>
      <ModalAllRooms
        onClose={onCloseModal}
        isOpen={isOpenModal}
        nama={nameProperty}
        id={id}
        setId={setId}
      />
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        gap={3}
        marginLeft={"150px"}
      >
        <Flex flexDir={"column"} justifyContent={"center"} gap={4}>
          {property?.map((val, idx) => {
            return (
              <Center key={idx}>
                <Flex
                  w="50vw"
                  h="270px"
                  border={"1px solid grey"}
                  borderBottomLeftRadius={"10px"}
                  borderTopLeftRadius={"10px"}
                  borderBottomRightRadius={"10px"}
                  borderTopRightRadius={"10px"}
                >
                  <Flex w="50%">
                    <Box
                      w={"100%"}
                      position={"relative"}
                      height={"100%"}
                      overflow={"hidden"}
                      borderRight={"1px solid grey"}
                    >
                      <Box
                        height="270px"
                        w="100%"
                        position="relative"
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        backgroundImage={`url(${val.pictureUrl})`}
                        borderBottomLeftRadius={"10px"}
                        borderTopLeftRadius={"10px"}
                      ></Box>
                    </Box>
                  </Flex>
                  <Flex
                    w="50%"
                    flexDir={"column"}
                    pl={"15px"}
                    justifyContent={"space-between"}
                  >
                    <Box w={"100%"} fontSize={23} fontWeight={"500"}>
                      {val.name}
                    </Box>
                    <Flex alignItems={"center"} gap={1}>
                      <Icon as={HiOutlineLocationMarker} />
                      <Box>{val.location} </Box>
                    </Flex>
                    <Box>
                      {val.total_reviews}{" "}
                      {val.total_reviews > 1 ? "reviews" : "review"}{" "}
                    </Box>
                    <Flex flexDir={"column"}>
                      <Box fontWeight={"400px"}>Description</Box>
                      <Box fontSize={13}>{val.description}</Box>
                    </Flex>
                    <Flex flexDir={"column"}>
                      <Box>Facility</Box>
                      <Box fontSize={13}>{val.facility}</Box>
                    </Flex>
                    <Flex w="100%" justifyContent={"end"} marginTop={"15px"}>
                      <Button
                        marginRight={"20px"}
                        marginBottom={"10px"}
                        bgColor="#264F8F"
                        color="white"
                        _hover={{ bgColor: "#7F96BB" }}
                        onClick={() => {
                          setId(val.id);
                          setNameProperty(val.name);
                        }}
                      >
                        View All Rooms
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Center>
            );
          })}
        </Flex>
        <Flex h="40px" justifyContent={"center"} w="50vw">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<GrChapterNext size={15} />}
            onPageChange={handlePageClickDataProperty}
            pageRangeDisplayed={2}
            pageCount={pageCountDataProperty}
            previousLabel={<GrChapterPrevious size={15} />}
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            containerClassName={"pagination"}
            pageClassName={"item pagination-page "}
            // pageLinkClassName="page-link"
            previousClassName={"item previous"}
            // previousLinkClassName="page-link"
            nextClassName={"item next "}
            // nextLinkClassName="page-link"
            activeClassName={"item active "}
            breakClassName={"item break-me "}
            disabledClassName={"disabled-page"}
          />
        </Flex>
      </Flex>
    </>
  );
}
