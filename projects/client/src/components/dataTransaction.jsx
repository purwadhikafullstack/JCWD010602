import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  useDisclosure,
  Icon,
  Input,
  Text,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../config/config.js";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { HiOutlineRefresh } from "react-icons/hi";
import { BiSearchAlt2 } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import ReactPaginate from "react-paginate";
import "../css/pagination.css";
import ModalChangeStatus from "./modalChangeStatus.jsx";
import ModalPaymentSlip from "./modalPaymentSlip.jsx";
export default function DataTransaction() {
  const [search, setSearch] = useState({
    search: "",
    searchby: "",
  });

  const [dataSearchDibatalkan, setDataSearchDibatalkan] = useState();
  const [dataSearchMenungguPembayaran, setDataSearchMenungguPembayaran] =
    useState();
  const [
    dataSearchMenungguKonfirmasiPembayaran,
    setDataSearchMenungguKonfirmasiPembayaran,
  ] = useState();
  const [dataSearchPembayaranBerhasil, setDataSearchPembayaranBerhasil] =
    useState();
  const [dataSearchBerhasil, setDataSearchBerhasil] = useState();

  const {
    isOpen: isOpenChange,
    onToggle: onToggleChange,
    onClose: onCloseChange,
  } = useDisclosure();
  const {
    isOpen: isOpenPaymentSlip,
    onToggle: onTogglePaymentSlip,
    onClose: onClosePaymentSlip,
  } = useDisclosure();
  const [dataMenungguPembayaran, setDataMenungguPembayaran] = useState([]);
  const [dataDibatalkan, setDataDibatalkan] = useState([]);
  const [
    dataMenungguKonfirmasiPembayaran,
    setDataMenungguKonfirmasiPembayaran,
  ] = useState([]);
  const [dataPembayaranBerhasil, setDataPembayaranBerhasil] = useState([]);
  const [dataBerhasil, setDataBerhasil] = useState([]);

  const [paymentSlip, setPaymentSlip] = useState();

  const [pageCountMenungguPembayaran, setPageCountMenungguPembayaran] =
    useState();
  const [pageCountDibatalkan, setPageCountDibatalkan] = useState();
  const [
    pageCountMenungguKonfirmasiPembayaran,
    setPageCountMenungguKonfirmasiPembayaran,
  ] = useState();
  const [pageCountPembayaranBerhasil, setPageCountPembayaranBerhasil] =
    useState();
  const [pageCountBerhasil, setPageCountBerhasil] = useState();

  const [id, setId] = useState();
  const [status, setStatus] = useState("");

  const pageMenungguPembayaran = useRef();
  const pageDibatalkan = useRef();
  const pageMenungguKonfirmasiPembayaran = useRef();
  const pagePembayaranBerhasil = useRef();
  const pageBerhasil = useRef();

  function handlePageClickMenungguPembayaran(e) {
    pageMenungguPembayaran.current = e.selected + 1;
    fetchDataMenungguPembayaran();
  }

  function handlePageClickDibatalkan(e) {
    pageDibatalkan.current = e.selected + 1;
    fetchDataDibatalkan();
  }

  function handlePageClickMenungguKonfirmasiPembayaran(e) {
    pageMenungguKonfirmasiPembayaran.current = e.selected + 1;
    fetchDataMenungguKonfirmasiPembayaran();
  }

  function handlePageClickPembayaranBerhasil(e) {
    pagePembayaranBerhasil.current = e.selected + 1;
    fetchDataPembayaranBerhasil();
  }

  function handlePageClickBerhasil(e) {
    pageDibatalkan.current = e.selected + 1;
  }
  async function fetchDataMenungguPembayaran() {
    await axiosInstance
      .post(
        `/api/transactions/menunggupembayaran?page=${pageMenungguPembayaran.current}`,
        dataSearchMenungguPembayaran
      )
      .then((res) => {
        setDataMenungguPembayaran(res.data.result.result);
        setPageCountMenungguPembayaran(res.data.result.pageCount);
      });
  }

  async function fetchDataMenungguKonfirmasiPembayaran() {
    await axiosInstance
      .post(
        `/api/transactions/menunggukonfirmasipembayaran?page=${pageMenungguKonfirmasiPembayaran.current}`,
        dataSearchMenungguKonfirmasiPembayaran
      )
      .then((res) => {
        setDataMenungguKonfirmasiPembayaran(res.data.result.result);
        setPageCountMenungguKonfirmasiPembayaran(res.data.result.pageCount);
      });
  }

  async function fetchDataDibatalkan() {
    await axiosInstance
      .post(
        `/api/transactions/dibatalkan?page=${pageDibatalkan.current}`,
        dataSearchDibatalkan
      )
      .then((res) => {
        setDataDibatalkan(res.data.result.result);
        setPageCountDibatalkan(res.data.result.pageCount);
        console.log(res.data.result);
      });
  }

  async function fetchDataPembayaranBerhasil() {
    await axiosInstance
      .post(
        `/api/transactions/pembayaranberhasil?page=${pagePembayaranBerhasil.current}`,
        dataSearchPembayaranBerhasil
      )
      .then((res) => {
        setDataPembayaranBerhasil(res.data.result.result);
        setPageCountPembayaranBerhasil(res.data.result.pageCount);
      });
  }

  async function fetchDataBerhasil() {
    await axiosInstance
      .post(
        `/api/transactions/berhasil?page=${pageBerhasil.current}`,
        dataSearchBerhasil
      )
      .then((res) => {
        setDataBerhasil(res.data.result.result);
        setPageCountBerhasil(res.data.result.pageCount);
      });
  }

  useEffect(() => {
    pageMenungguPembayaran.current = 1;
    pageMenungguKonfirmasiPembayaran.current = 1;
    pageDibatalkan.current = 1;
    pagePembayaranBerhasil.current = 1;
    pageBerhasil.current = 1;
    fetchDataPembayaranBerhasil();
    fetchDataMenungguPembayaran();
    fetchDataDibatalkan();
    fetchDataMenungguKonfirmasiPembayaran();
    fetchDataBerhasil();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  }
  function btnSearch() {
    setDataSearchDibatalkan(null);
    setDataSearchMenungguKonfirmasiPembayaran(null);
    setDataSearchMenungguPembayaran(null);
    setDataSearchPembayaranBerhasil(null);
    setDataSearchBerhasil(null);
    document.getElementsByName("search").values = "";
    document.getElementsByName("searchby").selectedIndex = -1;
  }
  useEffect(() => {
    fetchDataDibatalkan();
  }, [dataSearchDibatalkan]);

  useEffect(() => {
    fetchDataMenungguPembayaran();
  }, [dataSearchMenungguPembayaran]);

  useEffect(() => {
    fetchDataMenungguKonfirmasiPembayaran();
  }, [dataSearchMenungguKonfirmasiPembayaran]);

  useEffect(() => {
    fetchDataPembayaranBerhasil();
  }, [dataSearchPembayaranBerhasil]);

  useEffect(() => {
    fetchDataBerhasil();
  }, [dataSearchBerhasil]);

  return (
    <>
      <ModalChangeStatus
        isOpen={isOpenChange}
        onClose={onCloseChange}
        status={status}
        id={id}
        fetchData={fetchDataMenungguKonfirmasiPembayaran}
      />
      <ModalPaymentSlip
        isOpen={isOpenPaymentSlip}
        onClose={onClosePaymentSlip}
        paymentSlip={paymentSlip}
      />
      <Flex w="80vw" marginLeft={"230px"} marginY="5px">
        <Tabs isManual variant="enclosed" w={"100%"}>
          <TabList>
            <Tab
              w="15%"
              onClick={() => {
                fetchDataDibatalkan();
              }}
            >
              Dibatalkan
            </Tab>
            <Tab
              w="20%"
              onClick={() => {
                fetchDataMenungguPembayaran();
              }}
            >
              Menunggu Pembayaran
            </Tab>
            <Tab
              w="25%"
              onClick={() => {
                fetchDataMenungguKonfirmasiPembayaran();
              }}
            >
              Menunggu Konfirmasi Pembayaran
            </Tab>
            <Tab w="20%">Pembayaran Berhasil</Tab>
            <Tab w="20%"> Berhasil</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex flexDir={"column"}>
                <Flex
                  w="100%"
                  h={"40px"}
                  mb="5px"
                  justifyContent="space-between"
                >
                  <Flex
                    w="100%"
                    alignItems={"center"}
                    gap={4}
                    justifyContent="space-around"
                  >
                    <Flex
                      alignItems={"center"}
                      gap={1}
                      border="1px solid grey"
                      borderRadius={"5px"}
                      mr="40px"
                      cursor={"pointer"}
                      _hover={{
                        bgColor: "#E6EAED",
                      }}
                      px={"4px"}
                      onClick={btnSearch}
                    >
                      <Icon as={HiOutlineRefresh}></Icon>
                      <Text fontWeight={"400"}>Refresh</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={4} mr={"80px"}>
                      <Text>Search</Text>
                      <Select
                        name="searchby"
                        h={"30px"}
                        w="200px"
                        fontSize={"14px"}
                        onChange={handleChange}
                      >
                        <option value={undefined}>Please Select</option>
                        <option value={"id"}>Transaction ID</option>
                        <option value={"fullname"}>Booking Name</option>
                      </Select>
                      <Flex gap={4}>
                        <InputGroup alignItems={"center"} gap={3}>
                          <Input
                            w={"500px"}
                            fontSize={"14px"}
                            onKeyUp={(e) => {
                              if (e.key === "Enter") {
                                setDataSearchDibatalkan(search);
                              }
                            }}
                            name="search"
                            type={"text"}
                            border="1px solid black"
                            borderTopLeftRadius="5px"
                            borderBottomLeftRadius="5px"
                            h={"30px"}
                            onChange={handleChange}
                          ></Input>
                          <Icon
                            as={BiSearchAlt2}
                            // bgColor="grey"
                            h="30px"
                            w={"30px"}
                            boxSize={"30px"}
                            borderTopRightRadius={"5px"}
                            borderBottomRightRadius={"5px"}
                            mr="15px"
                            onClick={() => {
                              setDataSearchDibatalkan(search);
                            }}
                            cursor={"pointer"}
                          />
                        </InputGroup>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <TableContainer w="100%" h="330px">
                  <Table variant="striped" colorScheme="teal">
                    <Thead bgColor={"#7F96BB"}>
                      <Tr>
                        <Th textAlign={"center"} color={"white"}>
                          Transaction ID
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Transaction Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Booking Name
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Check In Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Check Out Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Duration
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Room
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Total Price
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Invoice Number
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataDibatalkan?.map((val, idx) => {
                        let checkIn = new Date(JSON.stringify(val.checkInDate));
                        let checkOut = new Date(
                          JSON.stringify(val.checkOutDate)
                        );
                        let convDateIn = checkIn.getTime();
                        let convDateOut = checkOut.getTime();
                        let diff = Math.abs(convDateIn - convDateOut);
                        console.log(convDateIn);
                        let totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
                        return (
                          <Tr key={idx}>
                            {console.log(val.checkInDate)}
                            <Td textAlign={"center"} fontSize={13}>
                              {val.id}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.createdAt}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.User.fullname}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.checkInDate}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.checkOutDate}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {totalDays}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.Room.name}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              Rp.{(totalDays * val.Room.price).toLocaleString()}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.invoiceNo}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex h="40px" justifyContent={"center"}>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<GrChapterNext size={15} />}
                    onPageChange={handlePageClickDibatalkan}
                    pageRangeDisplayed={2}
                    pageCount={pageCountDibatalkan}
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
            </TabPanel>
            <TabPanel>
              <Flex flexDir={"column"}>
                <Flex
                  w="100%"
                  h={"40px"}
                  mb="5px"
                  justifyContent="space-between"
                >
                  <Flex
                    w="100%"
                    alignItems={"center"}
                    gap={4}
                    justifyContent="space-around"
                  >
                    <Flex
                      alignItems={"center"}
                      gap={1}
                      border="1px solid grey"
                      borderRadius={"5px"}
                      mr="40px"
                      cursor={"pointer"}
                      _hover={{
                        bgColor: "#E6EAED",
                      }}
                      px={"4px"}
                      onClick={btnSearch}
                    >
                      <Icon as={HiOutlineRefresh}></Icon>
                      <Text fontWeight={"400"}>Refresh</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={4} mr={"80px"}>
                      <Text>Search</Text>
                      <Select
                        name="searchby"
                        h={"30px"}
                        w="200px"
                        fontSize={"14px"}
                        onChange={handleChange}
                      >
                        <option value={undefined}>Please Select</option>
                        <option value={"id"}>Transaction ID</option>
                        <option value={"fullname"}>Booking Name</option>
                      </Select>
                      <Flex gap={4}>
                        <InputGroup alignItems={"center"} gap={3}>
                          <Input
                            w={"500px"}
                            fontSize={"14px"}
                            onKeyUp={(e) => {
                              if (e.key === "Enter") {
                                setDataSearchMenungguPembayaran(search);
                              }
                            }}
                            name="search"
                            type={"text"}
                            border="1px solid black"
                            borderTopLeftRadius="5px"
                            borderBottomLeftRadius="5px"
                            h={"30px"}
                            onChange={handleChange}
                          ></Input>
                          <Icon
                            as={BiSearchAlt2}
                            // bgColor="grey"
                            h="30px"
                            w={"30px"}
                            boxSize={"30px"}
                            borderTopRightRadius={"5px"}
                            borderBottomRightRadius={"5px"}
                            mr="15px"
                            onClick={() => {
                              setDataSearchMenungguPembayaran(search);
                            }}
                            cursor={"pointer"}
                          />
                        </InputGroup>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <TableContainer w="100%" h="330px">
                  <Table variant="striped" colorScheme="teal">
                    <Thead bgColor={"#7F96BB"}>
                      <Tr>
                        <Th textAlign={"center"} color={"white"}>
                          Transaction ID
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Transaction Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Booking Name
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Check In Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Check Out Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Duration
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Room
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Total Price
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Invoice Number
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataMenungguPembayaran?.map((val, idx) => {
                        let checkIn = new Date(JSON.stringify(val.checkInDate));
                        let checkOut = new Date(
                          JSON.stringify(val.checkOutDate)
                        );
                        let convDateIn = checkIn.getTime();
                        let convDateOut = checkOut.getTime();
                        let diff = Math.abs(convDateIn - convDateOut);
                        console.log(convDateIn);
                        let totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
                        return (
                          <Tr key={idx}>
                            {console.log(val.checkInDate)}
                            <Td textAlign={"center"} fontSize={13}>
                              {val.id}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.createdAt}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.User.fullname}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.checkInDate}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.checkOutDate}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {totalDays}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.Room.name}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              Rp.{(totalDays * val.Room.price).toLocaleString()}
                            </Td>
                            <Td textAlign={"center"} fontSize={13}>
                              {val.invoiceNo}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex h="40px" justifyContent={"center"}>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<GrChapterNext size={15} />}
                    onPageChange={handlePageClickMenungguPembayaran}
                    pageRangeDisplayed={2}
                    pageCount={pageCountMenungguPembayaran}
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
            </TabPanel>
            <TabPanel>
              <Flex flexDir={"column"}>
                <Flex
                  w="100%"
                  h={"40px"}
                  mb="5px"
                  justifyContent="space-between"
                >
                  <Flex
                    w="100%"
                    alignItems={"center"}
                    gap={4}
                    justifyContent="space-around"
                  >
                    <Flex
                      alignItems={"center"}
                      gap={1}
                      border="1px solid grey"
                      borderRadius={"5px"}
                      mr="40px"
                      cursor={"pointer"}
                      _hover={{
                        bgColor: "#E6EAED",
                      }}
                      px={"4px"}
                      onClick={btnSearch}
                    >
                      <Icon as={HiOutlineRefresh}></Icon>
                      <Text fontWeight={"400"}>Refresh</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={4} mr={"80px"}>
                      <Text>Search</Text>
                      <Select
                        name="searchby"
                        h={"30px"}
                        w="200px"
                        fontSize={"14px"}
                        onChange={handleChange}
                      >
                        <option value={undefined}>Please Select</option>
                        <option value={"id"}>Transaction ID</option>
                        <option value={"fullname"}>Booking Name</option>
                      </Select>
                      <Flex gap={4}>
                        <InputGroup alignItems={"center"} gap={3}>
                          <Input
                            w={"500px"}
                            fontSize={"14px"}
                            onKeyUp={(e) => {
                              if (e.key === "Enter") {
                                setDataSearchMenungguKonfirmasiPembayaran(
                                  search
                                );
                              }
                            }}
                            name="search"
                            type={"text"}
                            border="1px solid black"
                            borderTopLeftRadius="5px"
                            borderBottomLeftRadius="5px"
                            h={"30px"}
                            onChange={handleChange}
                          ></Input>
                          <Icon
                            as={BiSearchAlt2}
                            // bgColor="grey"
                            h="30px"
                            w={"30px"}
                            boxSize={"30px"}
                            borderTopRightRadius={"5px"}
                            borderBottomRightRadius={"5px"}
                            mr="15px"
                            onClick={() => {
                              setDataSearchMenungguKonfirmasiPembayaran(search);
                            }}
                            cursor={"pointer"}
                          />
                        </InputGroup>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <TableContainer w="100%" h="330px">
                  <Table variant="striped" colorScheme="teal">
                    <Thead bgColor={"#7F96BB"}>
                      <Tr>
                        <Th textAlign={"center"} color={"white"}>
                          Transaction ID
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Transaction Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Booking Name
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Check In Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Check Out Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Duration
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Room
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Total Price
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Invoice Number
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Payment Slip
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Payment Status
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataMenungguKonfirmasiPembayaran?.map((val, idx) => {
                        let checkIn = new Date(JSON.stringify(val.checkInDate));
                        let checkOut = new Date(
                          JSON.stringify(val.checkOutDate)
                        );
                        let convDateIn = checkIn.getTime();
                        let convDateOut = checkOut.getTime();
                        let diff = Math.abs(convDateIn - convDateOut);
                        console.log(convDateIn);
                        let totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
                        if (val.Room === null) {
                          return (
                            <Flex>
                              <Box w="100%" h="100%" bgColor="red">
                                {" "}
                                KOSONG{" "}
                              </Box>
                            </Flex>
                          );
                        } else {
                          return (
                            <Tr key={idx}>
                              {console.log(val.checkInDate)}
                              <Td textAlign={"center"} fontSize={13}>
                                {val.id}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.createdAt}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.User.fullname}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.checkInDate}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.checkOutDate}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {totalDays}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.Room.name}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                Rp.
                                {(totalDays * val.Room.price).toLocaleString()}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.invoiceNo}
                              </Td>
                              {val.paymentSlip === null ||
                              val.paymentSlip === "" ? (
                                <>
                                  <Td textAlign={"center"} fontSize={13}>
                                    Bukti belum di upload
                                  </Td>
                                </>
                              ) : (
                                <>
                                  <Td
                                    textAlign={"center"}
                                    fontSize={13}
                                    color={"blue"}
                                    cursor={"pointer"}
                                    onClick={() => {
                                      setPaymentSlip(val.paymentSlip);
                                      onTogglePaymentSlip();
                                    }}
                                  >
                                    Lihat Bukti Pembayaran
                                  </Td>
                                </>
                              )}
                              <Td textAlign={"center"}>
                                <Flex gap={1}>
                                  <Flex
                                    bgColor="#ECF1F9"
                                    alignItems={"center"}
                                    alignContent={"center"}
                                    h="30px"
                                    borderRadius={"5px"}
                                    padding={"5px"}
                                    _hover={{
                                      bgColor: "white",
                                    }}
                                  >
                                    <Icon as={GiCancel} />
                                    <Box
                                      w={"60px"}
                                      onClick={() => {
                                        setId(val.id);
                                        setStatus("CANCEL");
                                        onToggleChange();
                                      }}
                                    >
                                      Cancel
                                    </Box>
                                  </Flex>

                                  <Flex
                                    bgColor="#ECF1F9"
                                    alignItems={"center"}
                                    alignContent={"center"}
                                    h="30px"
                                    borderRadius={"5px"}
                                    padding={"5px"}
                                    _hover={{
                                      bgColor: "white",
                                    }}
                                  >
                                    <Icon
                                      as={TiCancel}
                                      boxSize={6}
                                      color={"red"}
                                    />
                                    <Box
                                      w={"60px"}
                                      onClick={() => {
                                        setId(val.id);
                                        setStatus("REJECT");
                                        onToggleChange();
                                      }}
                                    >
                                      Reject
                                    </Box>
                                  </Flex>

                                  <Flex
                                    bgColor="#ECF1F9"
                                    alignItems={"center"}
                                    alignContent={"center"}
                                    h="30px"
                                    borderRadius={"5px"}
                                    paddingX={"5px"}
                                    gap={2}
                                    _hover={{
                                      bgColor: "white",
                                    }}
                                  >
                                    <Icon as={GiConfirmed} color={"green"} />
                                    <Box
                                      w={"60px"}
                                      onClick={() => {
                                        setId(val.id);
                                        setStatus("APPROVE");
                                        onToggleChange();
                                      }}
                                    >
                                      Approve
                                    </Box>
                                  </Flex>
                                </Flex>
                              </Td>
                            </Tr>
                          );
                        }
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex h="40px" justifyContent={"center"}>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<GrChapterNext size={15} />}
                    onPageChange={handlePageClickMenungguKonfirmasiPembayaran}
                    pageRangeDisplayed={2}
                    pageCount={pageCountMenungguKonfirmasiPembayaran}
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
            </TabPanel>
            <TabPanel>
              <Flex flexDir={"column"}>
                <Flex
                  w="100%"
                  h={"40px"}
                  mb="5px"
                  justifyContent="space-between"
                >
                  <Flex
                    w="100%"
                    alignItems={"center"}
                    gap={4}
                    justifyContent="space-around"
                  >
                    <Flex
                      alignItems={"center"}
                      gap={1}
                      border="1px solid grey"
                      borderRadius={"5px"}
                      mr="40px"
                      cursor={"pointer"}
                      _hover={{
                        bgColor: "#E6EAED",
                      }}
                      px={"4px"}
                      onClick={btnSearch}
                    >
                      <Icon as={HiOutlineRefresh}></Icon>
                      <Text fontWeight={"400"}>Refresh</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={4} mr={"80px"}>
                      <Text>Search</Text>
                      <Select
                        name="searchby"
                        h={"30px"}
                        w="200px"
                        fontSize={"14px"}
                        onChange={handleChange}
                      >
                        <option value={undefined}>Please Select</option>
                        <option value={"id"}>Transaction ID</option>
                        <option value={"fullname"}>Booking Name</option>
                      </Select>
                      <Flex gap={4}>
                        <InputGroup alignItems={"center"} gap={3}>
                          <Input
                            w={"500px"}
                            fontSize={"14px"}
                            onKeyUp={(e) => {
                              if (e.key === "Enter") {
                                setDataSearchPembayaranBerhasil(search);
                              }
                            }}
                            name="search"
                            type={"text"}
                            border="1px solid black"
                            borderTopLeftRadius="5px"
                            borderBottomLeftRadius="5px"
                            h={"30px"}
                            onChange={handleChange}
                          ></Input>
                          <Icon
                            as={BiSearchAlt2}
                            // bgColor="grey"
                            h="30px"
                            w={"30px"}
                            boxSize={"30px"}
                            borderTopRightRadius={"5px"}
                            borderBottomRightRadius={"5px"}
                            mr="15px"
                            onClick={() => {
                              setDataSearchPembayaranBerhasil(search);
                            }}
                            cursor={"pointer"}
                          />
                        </InputGroup>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <TableContainer w="100%" h="330px">
                  <Table variant="striped" colorScheme="teal">
                    <Thead bgColor={"#7F96BB"}>
                      <Tr>
                        <Th textAlign={"center"} color={"white"}>
                          Transaction ID
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Transaction Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Booking Name
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Check In Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Check Out Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Duration
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Room
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Total Price
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Invoice Number
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Payment Slip
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataPembayaranBerhasil?.map((val, idx) => {
                        let checkIn = new Date(JSON.stringify(val.checkInDate));
                        let checkOut = new Date(
                          JSON.stringify(val.checkOutDate)
                        );
                        let convDateIn = checkIn.getTime();
                        let convDateOut = checkOut.getTime();
                        let diff = Math.abs(convDateIn - convDateOut);
                        console.log(convDateIn);
                        let totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
                        if (val.Room === null) {
                          return (
                            <Flex>
                              <Box w="100%" h="100%" bgColor="red">
                                {" "}
                                KOSONG{" "}
                              </Box>
                            </Flex>
                          );
                        } else {
                          return (
                            <Tr key={idx}>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.id}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.createdAt}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.User.fullname}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.checkInDate}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.checkOutDate}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {totalDays}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.Room.name}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                Rp.
                                {(totalDays * val.Room.price).toLocaleString()}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.invoiceNo}
                              </Td>
                              <Td
                                textAlign={"center"}
                                fontSize={13}
                                color={"blue"}
                                cursor={"pointer"}
                                onClick={() => {
                                  setPaymentSlip(val.paymentSlip);
                                  onTogglePaymentSlip();
                                }}
                              >
                                Lihat Bukti Pembayaran
                              </Td>
                            </Tr>
                          );
                        }
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex h="40px" justifyContent={"center"}>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<GrChapterNext size={15} />}
                    onPageChange={handlePageClickPembayaranBerhasil}
                    pageRangeDisplayed={2}
                    pageCount={pageCountPembayaranBerhasil}
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
            </TabPanel>
            <TabPanel>
              <Flex flexDir={"column"}>
                <Flex
                  w="100%"
                  h={"40px"}
                  mb="5px"
                  justifyContent="space-between"
                >
                  <Flex
                    w="100%"
                    alignItems={"center"}
                    gap={4}
                    justifyContent="space-around"
                  >
                    <Flex
                      alignItems={"center"}
                      gap={1}
                      border="1px solid grey"
                      borderRadius={"5px"}
                      mr="40px"
                      cursor={"pointer"}
                      _hover={{
                        bgColor: "#E6EAED",
                      }}
                      px={"4px"}
                      onClick={btnSearch}
                    >
                      <Icon as={HiOutlineRefresh}></Icon>
                      <Text fontWeight={"400"}>Refresh</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={4} mr={"80px"}>
                      <Text>Search</Text>
                      <Select
                        name="searchby"
                        h={"30px"}
                        w="200px"
                        fontSize={"14px"}
                        onChange={handleChange}
                      >
                        <option value={undefined}>Please Select</option>
                        <option value={"id"}>Transaction ID</option>
                        <option value={"fullname"}>Booking Name</option>
                      </Select>
                      <Flex gap={4}>
                        <InputGroup alignItems={"center"} gap={3}>
                          <Input
                            w={"500px"}
                            fontSize={"14px"}
                            onKeyUp={(e) => {
                              if (e.key === "Enter") {
                                setDataSearchBerhasil(search);
                              }
                            }}
                            name="search"
                            type={"text"}
                            border="1px solid black"
                            borderTopLeftRadius="5px"
                            borderBottomLeftRadius="5px"
                            h={"30px"}
                            onChange={handleChange}
                          ></Input>
                          <Icon
                            as={BiSearchAlt2}
                            // bgColor="grey"
                            h="30px"
                            w={"30px"}
                            boxSize={"30px"}
                            borderTopRightRadius={"5px"}
                            borderBottomRightRadius={"5px"}
                            mr="15px"
                            onClick={() => {
                              setDataSearchBerhasil(search);
                            }}
                            cursor={"pointer"}
                          />
                        </InputGroup>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <TableContainer w="100%" h="330px">
                  <Table variant="striped" colorScheme="teal">
                    <Thead bgColor={"#7F96BB"}>
                      <Tr>
                        <Th textAlign={"center"} color={"white"}>
                          Transaction ID
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Transaction Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Booking Name
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Check In Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Check Out Date
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Duration
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Room
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Total Price
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Invoice Number
                        </Th>
                        <Th textAlign={"center"} color={"white"}>
                          Payment Slip
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataBerhasil?.map((val, idx) => {
                        let checkIn = new Date(JSON.stringify(val.checkInDate));
                        let checkOut = new Date(
                          JSON.stringify(val.checkOutDate)
                        );
                        let convDateIn = checkIn.getTime();
                        let convDateOut = checkOut.getTime();
                        let diff = Math.abs(convDateIn - convDateOut);
                        console.log(convDateIn);
                        let totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
                        if (val.Room === null) {
                          return (
                            <Flex>
                              <Box w="100%" h="100%" bgColor="red">
                                {" "}
                                KOSONG{" "}
                              </Box>
                            </Flex>
                          );
                        } else {
                          return (
                            <Tr key={idx}>
                              {console.log(val.checkInDate)}
                              <Td textAlign={"center"} fontSize={13}>
                                {val.id}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.createdAt}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.User.fullname}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.checkInDate}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.checkOutDate}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {totalDays}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.Room.name}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                Rp.
                                {(totalDays * val.Room.price).toLocaleString()}
                              </Td>
                              <Td textAlign={"center"} fontSize={13}>
                                {val.invoiceNo}
                              </Td>

                              <Td
                                textAlign={"center"}
                                fontSize={13}
                                color={"blue"}
                                cursor={"pointer"}
                                onClick={() => {
                                  setPaymentSlip(val.paymentSlip);
                                  onTogglePaymentSlip();
                                }}
                              >
                                Lihat Bukti Pembayaran
                              </Td>
                            </Tr>
                          );
                        }
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex h="40px" justifyContent={"center"}>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<GrChapterNext size={15} />}
                    onPageChange={handlePageClickBerhasil}
                    pageRangeDisplayed={2}
                    pageCount={pageCountBerhasil}
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
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}

// DEV_USERNAME = root
// DEV_PASSWORD = doni12345
// DEV_DATABASE = db_propertyrent
// DEV_HOST = 127.0.0.1
// DEV_DIALECT = mysql
