import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
  useToast,
  Text,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../config/config";
import ModalDeleteRoom from "./modalDeleteRoom";
import ModalEditRoom from "./modalEditRoom";
import ModalAddRoom from "./modalAddRoom";
import ModalDetailPhotos from "./modalDetailPhotos";
import ModalDeleteSpecialRoom from "./modalDeleteSpecialRoom";
import ModalAddSpecialRoom from "./modalAddSpecialRoom";
import ModalEditSpecialRoom from "./modalEditSpecialRoom";
import ModalAddAvailabilityDate from "./modalAddAvailDate";
import ModalEditAvailabilityDate from "./modalEditAvailDate";
import ModalDeleteAvail from "./modalDeleteAvail";
import { MdAddBox } from "react-icons/md";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import "../css/pagination.css";
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";

export default function DataRoom() {
  const [data, setData] = useState([]);
  const [dataSpecialPrice, setDataSpecialPrice] = useState([]);
  const [dataEditAvailDate, setDataEditAvailDate] = useState();
  const [idDelete, setIdDelete] = useState();
  const [idDeleteSpecialRoom, setIdDeleteSpecialRoom] = useState();
  const [idPhotos, setIdPhotos] = useState();
  const [idAvail, setIdAvail] = useState();
  const [dataEdit, setDataEdit] = useState();
  const [dataEditSpecialPrice, setDataEditSpecialPrice] = useState();
  const [dataAvailDate, setDataAvailDate] = useState([]);
  const [pageCountRoom, setPageCountRoom] = useState();
  const [pageCountSpecialPrice, setPageCountSpecialPrice] = useState();
  const [pageCountAvail, setPageCountAvail] = useState();
  const pageRoom = useRef();
  const pageSpecial = useRef();
  const pageAvail = useRef();

  const {
    isOpen: isOpenDelete,
    onToggle: onToggleDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onToggle: onToggleEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenPhotos,
    onToggle: onTogglePhotos,
    onClose: onClosePhotos,
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onToggle: onToggleAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteSpecialRoom,
    onToggle: onToggleDeleteSpecialRoom,
    onClose: onCloseDeleteSpecialRoom,
  } = useDisclosure();
  const {
    isOpen: isOpenAddSpecialRoom,
    onToggle: onToggleAddSpecialRoom,
    onClose: onCloseAddSpecialRoom,
  } = useDisclosure();
  const {
    isOpen: isOpenEditSpecialRoom,
    onToggle: onToggleEditSpecialRoom,
    onClose: onCloseEditSpecialRoom,
  } = useDisclosure();
  const {
    isOpen: isOpenAddAvail,
    onToggle: onToggleAddAvail,
    onClose: onCloseAddAvail,
  } = useDisclosure();
  const {
    isOpen: isOpenEditAvail,
    onToggle: onToggleEditAvail,
    onClose: onCloseEditAvail,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteAvail,
    onToggle: onToggleDeleteAvail,
    onClose: onCloseDeleteAvail,
  } = useDisclosure();
  const toast = useToast();

  async function fetchData() {
    await axiosInstance
      .get(`/api/room?page=${pageRoom.current}`)
      .then((res) => {
        setData(res.data.result.result);
        setPageCountRoom(res.data.result.pageCount);
        console.log(res.data.result.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function fetchDataSpecialPrice() {
    await axiosInstance
      .get(`/api/room/specialprice?page=${pageSpecial.current}`)
      .then((res) => {
        setDataSpecialPrice(res.data.result.result);
        setPageCountSpecialPrice(res.data.result.pageCount);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function fetchDataAvailDate() {
    await axiosInstance
      .get(`/api/avail?page=${pageAvail.current}`)
      .then((res) => {
        setDataAvailDate(res.data.result.result);
        setPageCountAvail(res.data.result.pageCount);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (dataEdit) {
      onToggleEdit();
    } else {
      onCloseEdit();
    }
  }, [dataEdit]);

  useEffect(() => {
    if (dataEditSpecialPrice) {
      onToggleEditSpecialRoom();
    } else {
      onCloseEditSpecialRoom();
    }
  }, [dataEditSpecialPrice]);

  useEffect(() => {
    if (dataEditAvailDate) {
      onToggleEditAvail();
    } else {
      onCloseEditAvail();
    }
  }, [dataEditAvailDate]);

  useEffect(() => {
    if (idPhotos) {
      onTogglePhotos();
    } else {
      onClosePhotos();
    }
  }, [idPhotos]);

  useEffect(() => {
    pageRoom.current = 1;
    pageSpecial.current = 1;
    pageAvail.current = 1;
    fetchData();
    fetchDataSpecialPrice();
    fetchDataAvailDate();
  }, []);

  function handlePageClickRoom(e) {
    console.log(e.selected);
    pageRoom.current = e.selected + 1;
    fetchData();
  }

  function handlePageClickSpecialPrice(e) {
    console.log(e.selected);
    pageSpecial.current = e.selected + 1;
    fetchDataSpecialPrice();
  }

  function handlePageClickAvail(e) {
    console.log(e.selected);
    pageAvail.current = e.selected + 1;
    fetchDataAvailDate();
  }
  return (
    <>
      <ModalDeleteAvail
        isOpen={isOpenDeleteAvail}
        onClose={onCloseDeleteAvail}
        id={idAvail}
        fetchData={fetchDataAvailDate}
      />
      <ModalEditSpecialRoom
        isOpen={isOpenEditSpecialRoom}
        onClose={onCloseEditSpecialRoom}
        fetchData={fetchDataSpecialPrice}
        data={dataEditSpecialPrice}
        setData={setDataEditSpecialPrice}
      />

      <ModalAddAvailabilityDate
        isOpen={isOpenAddAvail}
        onClose={onCloseAddAvail}
        fetchData={fetchDataAvailDate}
      />

      <ModalEditAvailabilityDate
        isOpen={isOpenEditAvail}
        onClose={onCloseEditAvail}
        fetchData={fetchDataAvailDate}
        data={dataEditAvailDate}
        setData={setDataEditAvailDate}
      />

      <ModalAddSpecialRoom
        isOpen={isOpenAddSpecialRoom}
        onClose={onCloseAddSpecialRoom}
        fetchData={fetchDataSpecialPrice}
      />

      <ModalDeleteSpecialRoom
        isOpen={isOpenDeleteSpecialRoom}
        onClose={onCloseDeleteSpecialRoom}
        id={idDeleteSpecialRoom}
        fetchData={fetchDataSpecialPrice}
      />

      <ModalEditRoom
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        data={dataEdit}
        fetchData={fetchData}
        setData={setDataEdit}
      />
      <ModalDeleteRoom
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        id={idDelete}
        fetchData={fetchData}
      />
      <ModalDetailPhotos
        isOpen={isOpenPhotos}
        onClose={onClosePhotos}
        id={idPhotos}
        setId={setIdPhotos}
      />
      <ModalAddRoom
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        fetchData={fetchData}
      />
      <Flex
        // w="92vw"
        gap={5}
        flexDir={"column"}
        justifyContent={"center"}
        alignContent={"center"}
        marginLeft={"200px"}
      >
        <Flex
          w="80vw"
          flexDir={"column"}
          wrap={"wrap"}
          border={"2px solid #5B6D8A"}
          borderRadius={"8px"}
          marginLeft="30px"
          // marginTop={"40px"}
        >
          {/* <Text textAlign={"center"} fontSize={30}>
            DATA ROOM
          </Text> */}

          <TableContainer
            flexWrap={"wrap"}
            border={"1px solid grey"}
            h={"400px"}
          >
            <Table variant="striped" colorScheme="teal">
              <Thead bgColor={"#7F96BB"}>
                <Tr>
                  <Th textAlign={"center"} color="white">
                    Room ID
                  </Th>
                  <Th textAlign={"center"} color="white">
                    Room Type
                  </Th>
                  <Th textAlign={"center"} color="white">
                    Normal Price
                  </Th>
                  <Th textAlign={"center"} color="white">
                    Description
                  </Th>
                  <Th textAlign={"center"} color="white">
                    Details
                  </Th>
                  <Th textAlign={"center"} color="white">
                    Facility
                  </Th>
                  <Th textAlign={"center"} color="white">
                    Photos
                  </Th>
                  <Th textAlign={"left"}>
                    <Button onClick={onToggleAdd} w="120px">
                      New Room
                    </Button>
                  </Th>
                </Tr>
              </Thead>
              <Tbody h={"10px"}>
                {data?.map((val, idx) => {
                  let num = 0;
                  return (
                    <Tr key={idx}>
                      <Td fontSize={13} textAlign={"center"}>
                        {val.id}
                      </Td>
                      <Td fontSize={13} textAlign={"center"}>
                        {val.name}
                      </Td>
                      <Td fontSize={13} textAlign={"left"}>
                        Rp.{val?.price?.toLocaleString()}
                      </Td>
                      <Td fontSize={13} textAlign={"center"}>
                        {val.description}
                      </Td>
                      <Td fontSize={13} textAlign={"center"}>
                        {val.details}
                      </Td>
                      <Td fontSize={13} textAlign={"center"}>
                        {val.facility}
                      </Td>
                      <Td
                        cursor={"pointer"}
                        color={"blue"}
                        onClick={() => {
                          setIdPhotos(val.id);
                        }}
                        fontSize={12}
                        textAlign={"center"}
                      >
                        see all photos
                      </Td>
                      <Td>
                        <Flex gap={2}>
                          <IconButton
                            icon={<AiFillEdit size={20} />}
                            bgColor={"green.500"}
                            onClick={() => {
                              setDataEdit(val);
                            }}
                            h={"35px"}
                            w="55px"
                          />
                          <IconButton
                            icon={<AiFillDelete size={20} />}
                            bgColor={"red.500"}
                            onClick={() => {
                              setIdDelete(val.id);
                              onToggleDelete();
                            }}
                            h={"35px"}
                            w="55px"
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th isNumeric></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Flex h="40px" justifyContent={"center"}>
            <ReactPaginate
              breakLabel="..."
              nextLabel={<GrChapterNext size={15} />}
              onPageChange={handlePageClickRoom}
              pageRangeDisplayed={2}
              pageCount={pageCountRoom}
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

        <Flex w="80vw" gap={3} marginLeft={"28px"} marginBottom={"20px"}>
          <Flex
            w="50%"
            border={"2px solid #5B6D8A"}
            borderRadius={"8px"}
            flexDirection={"column"}
          >
            {/* <Text textAlign={"center"}> DATA SPECIAL PRICE ROOM</Text> */}
            <TableContainer h="400px" borderRadius={"7px"}>
              <Table variant="striped" colorScheme="teal" size="sm">
                <Thead bgColor={"#7F96BB"}>
                  <Tr>
                    <Th textAlign={"center"} color="white">
                      Special Room ID
                    </Th>
                    <Th textAlign={"center"} color="white">
                      Room Type
                    </Th>
                    <Th textAlign={"center"} color="white">
                      Special Price
                    </Th>
                    <Th textAlign={"center"} color="white">
                      Start Date
                    </Th>
                    <Th textAlign={"center"} color="white">
                      End Date
                    </Th>
                    <Th textAlign={"left"}>
                      <Button onClick={onToggleAddSpecialRoom} w="120px">
                        New Room
                      </Button>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataSpecialPrice?.map((val, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td textAlign={"center"} fontSize={13}>
                          {val.id}
                        </Td>
                        <Td textAlign={"center"} fontSize={13}>
                          {val.Room.name}
                        </Td>
                        <Td textAlign={"left"} fontSize={13}>
                          Rp.{" "}
                          {(
                            val.Room.price +
                            val.Room.price * (val.specialPrice / 100)
                          ).toLocaleString()}
                        </Td>
                        <Td textAlign={"center"} fontSize={13}>
                          {val.startDate}
                        </Td>
                        <Td textAlign={"center"} fontSize={13}>
                          {val.endDate}
                        </Td>
                        <Td textAlign={"center"} fontSize={13}>
                          <Flex gap={2}>
                            <IconButton
                              icon={<AiFillEdit size={20} />}
                              bgColor={"green.500"}
                              onClick={() => {
                                setDataEditSpecialPrice(val);
                              }}
                              h={"35px"}
                              w="55px"
                            />
                            <IconButton
                              icon={<AiFillDelete size={20} />}
                              bgColor={"red.500"}
                              onClick={() => {
                                setIdDeleteSpecialRoom(val.id);
                                onToggleDeleteSpecialRoom();
                              }}
                              h={"35px"}
                              w="55px"
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
            <Flex h="40px" justifyContent={"center"}>
              <ReactPaginate
                breakLabel="..."
                nextLabel={<GrChapterNext size={15} />}
                onPageChange={handlePageClickSpecialPrice}
                pageRangeDisplayed={2}
                pageCount={pageCountSpecialPrice}
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

          <Flex
            w="50%"
            border={"2px solid #5B6D8A"}
            borderRadius={"8px"}
            flexDir={"column"}
          >
            {/* <Text textAlign={"center"}> DATA SPECIAL PRICE ROOM</Text> */}
            <TableContainer h="400px" borderRadius={"6px"}>
              <Table variant="striped" colorScheme="teal" size={"sm"}>
                <Thead bgColor={"#7F96BB"}>
                  <Tr>
                    <Th textAlign={"center"} color="white">
                      Availability ID
                    </Th>
                    <Th textAlign={"center"} color="white">
                      Room Type
                    </Th>
                    <Th textAlign={"center"} color="white">
                      Start Date
                    </Th>
                    <Th textAlign={"center"} color="white">
                      End Date
                    </Th>
                    <Th textAlign={"left"}>
                      <Button onClick={onToggleAddAvail} w="120px">
                        New Room
                      </Button>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataAvailDate?.map((val, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td textAlign={"center"} fontSize={13}>
                          {val.id}
                        </Td>
                        <Td textAlign={"center"} fontSize={13}>
                          {val.Room.name}
                        </Td>
                        <Td textAlign={"center"} fontSize={13}>
                          {val.startDate}
                        </Td>
                        <Td textAlign={"center"} fontSize={13}>
                          {val.endDate}
                        </Td>
                        <Td textAlign={"center"} fontSize={13}>
                          <Flex gap={2}>
                            <IconButton
                              icon={<AiFillEdit size={20} />}
                              bgColor={"green.500"}
                              onClick={() => {
                                setDataEditAvailDate(val);
                              }}
                              h={"35px"}
                              w="55px"
                            />
                            <IconButton
                              icon={<AiFillDelete size={20} />}
                              bgColor={"red.500"}
                              onClick={() => {
                                setIdAvail(val.id);
                                onToggleDeleteAvail();
                              }}
                              h={"35px"}
                              w="55px"
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
            <Flex h="40px" justifyContent={"center"}>
              <ReactPaginate
                breakLabel="..."
                nextLabel={<GrChapterNext size={15} />}
                onPageChange={handlePageClickAvail}
                pageRangeDisplayed={2}
                pageCount={pageCountAvail}
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
        </Flex>
      </Flex>
    </>
  );
}
