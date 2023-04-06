import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Flex,
  Icon,
  Text,
  Box,
  Stack,
  FormHelperText,
} from "@chakra-ui/react";
import { FcUpload } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../config/config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiErrorCircle } from "react-icons/bi";
import { useToast } from "@chakra-ui/react";
import IsLoading from "./isLoading";

export default function ModalEditRoom(props) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [id, setId] = useState(props?.data?.id);
  const [property, setProperty] = useState([]);
  const inputFileRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRoom, setDataRoom] = useState();

  const formik = useFormik({
    initialValues: {
      name: props?.data?.name,
      price: props?.data?.price,
      description: props?.data?.description,
      details: props?.data?.details,
      roomType: props?.data?.roomType,
      facility: props?.data?.facility,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Room type harus diisi !!"),
      price: Yup.number().required("Price harus diisi!!"),
      description: Yup.string().required("Description harus diisi !!"),
      details: Yup.string().required("Details harus diisi !!"),
      facility: Yup.string().required("Facility harus diisi !!"),
    }),
    enableReinitialize: true,
    onSubmit: async (value) => {
      console.log(formik.values);
      await axiosInstance
        .patch(`/api/room/editRoom/${id}`, formik.values)
        .then(async (res) => {
          if (res.status === 200) {
            toast({
              title: "Edit successfully",
              description: "Data berhasil di ubah",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            if (props?.fetchData) {
              props?.fetchData();
              props?.onClose();
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const closeModal = () => {};

  async function fetchPhotos() {
    await axiosInstance
      .get("/api/room/photos/" + id)
      .then((res) => {
        setPhotos(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function fetchDataRoom() {
    await axiosInstance
      .get(`/api/room/${props?.data?.id}`)
      .then((res) => {
        setDataRoom(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleFile(event) {
    const formData = new FormData();
    formData.append("roomId", id);
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append("files", event.target.files[i]);
    }

    await axiosInstance.post("/api/room/editPhotos", formData).then((res) => {
      console.log(res.data.result);
      fetchPhotos();
    });
  }

  async function deletePhotos(...val) {
    await axiosInstance
      .post("/api/room/removePhotos", {
        roomId: id,
        pictureUrl: val[0].Picture.pictureUrl,
      })
      .then((res) => {
        if (res.status === 200) {
          fetchPhotos();
        }
      });
  }
  async function fetchProperty() {
    await axiosInstance
      .get(`/api/property/${props?.data?.productId}`)
      .then((res) => {
        setProperty(res.data.result);
        console.log(res.data.result);
      });
  }
  useEffect(() => {
    fetchProperty();
    fetchPhotos();
    fetchDataRoom();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  }, [props.data]);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          {isLoading ? (
            <IsLoading />
          ) : (
            <>
              <ModalHeader>EDIT ROOM</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Property</FormLabel>
                  <Input
                    type="text"
                    defaultValue={property?.name}
                    disabled="disabled"
                  />
                  {/* <Select
                options={property}
                ref={initialRef}
                placeholder="Select Property"
                onChange={(e) =>
                  formik.setFieldValue("productId", e.target.value)
                }
              >
                {property.map((val, idx) => {
                  let selected = id == val.id;
                  console.log(val.id);
                  return (
                    <option value={val.id} selected key={idx}>
                      {val.name}
                    </option>
                  );
                })}
              </Select> */}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Room Type</FormLabel>
                  <Input
                    placeholder="Room Type"
                    defaultValue={formik.values.name}
                    onChange={(e) =>
                      formik.setFieldValue("name", e.target.value)
                    }
                  />
                  <FormHelperText color="black">
                    <Flex gap={2}>
                      <Icon
                        as={BiErrorCircle}
                        color="red"
                        boxSize={5}
                        display={formik.errors.name ? null : "none"}
                      />
                      <Text>{formik.errors.name}</Text>
                    </Flex>
                  </FormHelperText>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    placeholder="Price"
                    onChange={(e) =>
                      formik.setFieldValue("price", e.target.value)
                    }
                    defaultValue={formik.values.price}
                  />
                  <FormHelperText color="black">
                    <Flex gap={2}>
                      <Icon
                        as={BiErrorCircle}
                        color="red"
                        boxSize={5}
                        display={formik.errors.price ? null : "none"}
                      />
                      <Text>{formik.errors.price}</Text>
                    </Flex>
                  </FormHelperText>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Description"
                    defaultValue={formik.values.description}
                    onChange={(e) =>
                      formik.setFieldValue("description", e.target.value)
                    }
                  />
                  <FormHelperText color="black">
                    <Flex gap={2}>
                      <Icon
                        as={BiErrorCircle}
                        color="red"
                        boxSize={5}
                        display={formik.errors.description ? null : "none"}
                      />
                      <Text>{formik.errors.description}</Text>
                    </Flex>
                  </FormHelperText>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Details</FormLabel>
                  <Textarea
                    placeholder="Details"
                    defaultValue={formik.values.details}
                    onChange={(e) =>
                      formik.setFieldValue("details", e.target.value)
                    }
                  />
                  <FormHelperText color="black">
                    <Flex gap={2}>
                      <Icon
                        as={BiErrorCircle}
                        color="red"
                        boxSize={5}
                        display={formik.errors.details ? null : "none"}
                      />
                      <Text>{formik.errors.details}</Text>
                    </Flex>
                  </FormHelperText>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Facility</FormLabel>
                  <Textarea
                    placeholder="Facility"
                    defaultValue={formik.values.facility}
                    onChange={(e) =>
                      formik.setFieldValue("facility", e.target.value)
                    }
                  />
                  <FormHelperText color="black">
                    <Flex gap={2}>
                      <Icon
                        as={BiErrorCircle}
                        color="red"
                        boxSize={5}
                        display={formik.errors.facility ? null : "none"}
                      />
                      <Text>{formik.errors.facility}</Text>
                    </Flex>
                  </FormHelperText>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Picture</FormLabel>
                  <Flex
                    alignItems={"center"}
                    gap={3}
                    border="solid 1px #E6EAED"
                    borderRadius={"8px"}
                    padding="4px"
                    _hover={{
                      bgColor: "#77f2a6",
                    }}
                    cursor={"pointer"}
                    onClick={() => {
                      inputFileRef.current.click();
                    }}
                  >
                    <Icon as={FcUpload} color="blue" boxSize={8} />
                    <Text fontSize={18}> Upload File</Text>
                  </Flex>
                  <Input
                    placeholder="Picture"
                    type={"file"}
                    multiple={true}
                    accept="image/png, image/jpeg"
                    onChange={handleFile}
                    ref={inputFileRef}
                    display="none"
                  />
                </FormControl>
                <Stack
                  h="210px"
                  gap={2}
                  border="1px solid #E6EAED"
                  borderRadius={"8px"}
                  wrap="wrap"
                  overflowX={"scroll"}
                  alignItems="center"
                >
                  {photos.map((val, idx) => {
                    return (
                      <Flex
                        flexDir={"column"}
                        w="150px"
                        justifyContent={"space-between"}
                        key={idx}
                      >
                        <Box
                          h="150px"
                          bgImage={val.Picture.pictureUrl}
                          backgroundPosition="center"
                          backgroundRepeat="no-repeat"
                          backgroundSize="cover"
                        ></Box>

                        <Button
                          h="30px"
                          onClick={() => {
                            // setUrlPhotos(val.Picture.pictureUrl);
                            deletePhotos(val);
                          }}
                        >
                          Delete
                        </Button>
                      </Flex>
                    );
                  })}
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
                  Save
                </Button>
                <Button
                  onClick={() => {
                    props.onClose();
                    setId(null);
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
