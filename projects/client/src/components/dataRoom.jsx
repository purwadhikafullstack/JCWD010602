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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";
import ModalDeleteRoom from "./modalDeleteRoom";
import ModalEditRoom from "./modalEditRoom";
import ModalAddRoom from "./modalAddRoom";
import ModalDetailPhotos from "./modalDetailPhotos";
import { MdAddBox } from "react-icons/md";

export default function DataRoom() {
  const [data, setData] = useState([]);
  const [dataSpecialPrice, setDataSpecialPrice] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [idPhotos, setIdPhotos] = useState();
  const [dataEdit, setDataEdit] = useState();
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
  const toast = useToast();

  async function fetchData() {
    await axiosInstance
      .get("/api/room/")
      .then((res) => {
        setData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // async function fetchDataSpecialPrice() {
  //   await axiosInstance
  //     .get("/api/room/specialprice")
  //     .then((res) => {
  //       setDataSpecialPrice(res.data.result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  useEffect(() => {
    fetchData();
    // fetchDataSpecialPrice();
  }, []);

  return (
    <>
      <ModalEditRoom
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        data={dataEdit}
        fetchData={fetchData}
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
      />
      <ModalAddRoom
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        fetchData={fetchData}
      />
      <Flex w="100%" gap={5}>
        <Flex
          w="50%"
          h="500px"
          justifyContent="center"
          flexDir={"column"}
          wrap={"wrap"}
          border={"2px solid #1b1c1b"}
          borderRadius={"8px"}
          marginLeft={"30px"}
          marginTop={"40px"}
        >
          <Text textAlign={"center"} fontSize={30}>
            DATA ROOM
          </Text>

          <Flex
            flexDir={"row"}
            alignItems={"center"}
            gap={1}
            border={"1px solid #83fcae"}
            w={"120px"}
            h={"30px"}
            borderRadius={"8px"}
            cursor={"pointer"}
            _hover={{
              bgColor: "#bdffd4",
            }}
            mt={"40px"}
            onClick={onToggleAdd}
          >
            <Icon as={MdAddBox} boxSize={6} color="#83fcae" />
            <Text>New Room</Text>
          </Flex>
          <TableContainer
            h={"300px"}
            flexWrap={"wrap"}
            overflowY={"scroll"}
            border={"1px solid grey"}
          >
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Room Type</Th>
                  <Th>Price</Th>
                  <Th>Description</Th>
                  <Th>Details</Th>
                  <Th>Facility</Th>
                  <Th>Photos</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((val, idx) => {
                  let num = 0;
                  return (
                    <Tr key={idx}>
                      <Td>{idx + 1}</Td>
                      <Td>{val.name}</Td>
                      <Td isNumeric>{val.price}</Td>
                      <Td>{val.description}</Td>
                      <Td>{val.details}</Td>
                      <Td>{val.facility}</Td>
                      <Td
                        cursor={"pointer"}
                        color={"blue"}
                        onClick={() => {
                          setIdPhotos(val.id);
                          onTogglePhotos();
                        }}
                      >
                        see all photos
                      </Td>
                      <Td>
                        <Flex gap={2}>
                          <Button
                            bgColor={"green.500"}
                            onClick={() => {
                              setDataEdit(val);
                              onToggleEdit();
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            bgColor={"red.500"}
                            onClick={() => {
                              setIdDelete(val.id);
                              onToggleDelete();
                            }}
                          >
                            Delete
                          </Button>
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
        </Flex>

        <Flex w="50%" flexDir={"column"}>
          <Text textAlign={"center"}> DATA SPECIAL PRICE ROOM</Text>
          <Flex
            flexDir={"row"}
            alignItems={"center"}
            gap={1}
            border={"1px solid #83fcae"}
            w={"120px"}
            h={"30px"}
            borderRadius={"8px"}
            cursor={"pointer"}
            _hover={{
              bgColor: "#bdffd4",
            }}
          >
            <Icon as={MdAddBox} boxSize={6} color={"#83fcae"} />
            <Text>New Room</Text>
          </Flex>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Room Type</Th>
                  <Th>Special Price</Th>
                  <Th>Start Date</Th>
                  <Th>End Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataSpecialPrice.map((val, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>{val.id}</Td>
                      <Td>{val.Room.name}</Td>
                      <Td isNumeric>
                        {val.Room.price +
                          val.Room.price * (val.specialPrice / 100)}
                      </Td>
                      <Td>{val.startDate}</Td>
                      <Td>{val.endDate}</Td>
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
        </Flex>
      </Flex>
    </>
  );
}
