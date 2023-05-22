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
  Button,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../config/config.js";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import "../css/pagination.css";
import ModalChangeStatus from "./modalChangeStatus.jsx";
import ModalPaymentSlip from "./modalPaymentSlip.jsx";
export default function DataTransaction() {
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
      .get(
        `/api/transactions/menunggupembayaran?page=${pageMenungguPembayaran.current}`
      )
      .then((res) => {
        setDataMenungguPembayaran(res.data.result.result);
        setPageCountMenungguPembayaran(res.data.result.pageCount);
      });
  }

  async function fetchDataMenungguKonfirmasiPembayaran() {
    await axiosInstance
      .get(
        `/api/transactions/menunggukonfirmasipembayaran?page=${pageMenungguKonfirmasiPembayaran.current}`
      )
      .then((res) => {
        setDataMenungguKonfirmasiPembayaran(res.data.result.result);
        setPageCountMenungguKonfirmasiPembayaran(res.data.result.pageCount);
      });
  }

  async function fetchDataDibatalkan() {
    await axiosInstance
      .get(`/api/transactions/dibatalkan?page=${pageDibatalkan.current}`)
      .then((res) => {
        setDataDibatalkan(res.data.result.result);
        setPageCountDibatalkan(res.data.result.pageCount);
      });
  }

  async function fetchDataPembayaranBerhasil() {
    await axiosInstance
      .get(
        `/api/transactions/pembayaranberhasil?page=${pagePembayaranBerhasil.current}`
      )
      .then((res) => {
        setDataPembayaranBerhasil(res.data.result.result);
        setPageCountPembayaranBerhasil(res.data.result.pageCount);
      });
  }

  async function fetchDataBerhasil() {
    await axiosInstance
      .get(`/api/transactions/berhasil?page=${pageBerhasil.current}`)
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
      <Flex
        w="90vw"
        justifyContent={"center"}
        border={"1px solid #000"}
        margin={"auto"}
        marginY="50px"
      >
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
                <TableContainer w="100%" h="400px">
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
                              {totalDays * val.Room.price}
                            </Td>
                            <Td textAlign={"center"}>{val.invoiceNo}</Td>
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
                <TableContainer w="100%" h="400px">
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
                              {totalDays * val.Room.price}
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
                <TableContainer w="100%" h="400px">
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
                                {totalDays * val.Room.price}
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
                                <Flex gap={2}>
                                  <Button
                                    h="30px"
                                    onClick={() => {
                                      setId(val.id);
                                      setStatus("CANCEL");
                                      onToggleChange();
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    h="30px"
                                    onClick={() => {
                                      setId(val.id);
                                      setStatus("REJECT");
                                      onToggleChange();
                                    }}
                                  >
                                    Reject
                                  </Button>
                                  <Button
                                    h="30px"
                                    onClick={() => {
                                      setId(val.id);
                                      setStatus("APPROVE");
                                      onToggleChange();
                                    }}
                                  >
                                    Approve
                                  </Button>
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
                <TableContainer w="100%" h="400px">
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
                                {totalDays * val.Room.price}
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
                <TableContainer w="100%" h="400px">
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
                                {totalDays * val.Room.price}
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
