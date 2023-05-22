import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  TableContainer,
  Flex,
  Td,
  Th,
  Tr,
  Thead,
  Tbody,
  Tfoot,
} from "@chakra-ui/react";
import { axiosInstance } from "../config/config";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";
import "../css/pagination.css";
export default function ModalAllRooms(props) {
  const [dataRoom, setDataRoom] = useState([]);
  const [pageCount, setPageCount] = useState();
  const id = props?.id;
  const currentPage = useRef();

  useEffect(() => {
    fetchRoom();
    currentPage.current = 1;
  }, [id]);

  async function handlePageClick(e) {
    console.log(e);
    currentPage.current = eval(e.selected + 1);
    fetchRoom();
  }

  async function fetchRoom() {
    await axiosInstance
      .get(
        `/api/room/roombyproperty?productId=${id}&page=${currentPage.current}&limit=1`
      )
      .then((res) => {
        setDataRoom(res.data.result.result);
        console.log(res.data.result.result);
        setPageCount(res.data.result.pageCount);
        console.log(res.data.result.pageCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        closeOnOverlayClick={false}
        size={"6xl"}
        h="400px"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props?.nama}</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              props?.setId(null);
            }}
          />
          <ModalBody>
            <Flex
              h={"400px"}
              flexDir={"column"}
              justifyContent={"space-between"}
              gap={3}
            >
              <TableContainer h="360px">
                <Table variant="striped" colorScheme="teal" w={"90vw"}>
                  <Thead>
                    <Tr>
                      <Th>ID Room</Th>
                      <Th>Room Type</Th>
                      <Th>Description</Th>
                      <Th>Details</Th>
                      <Th>Facility</Th>
                      <Th>Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dataRoom.map((val, idx) => {
                      return (
                        <Tr key={idx}>
                          <Td>{val.id}</Td>
                          <Td>{val.name}</Td>
                          {console.log(val.name)}
                          <Td>{val.description}</Td>
                          <Td>{val.details}</Td>
                          <Td>{val.facility}</Td>
                          <Td>{val.price}</Td>
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
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  pageCount={pageCount}
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
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
