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
  Select,
  Textarea,
  Flex,
  Text,
  Box,
  Icon,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FcUpload } from "react-icons/fc";
import { axiosInstance } from "../config/config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { ImUpload } from "react-icons/im";
import { BiErrorCircle } from "react-icons/bi";

export default function ModalAddRoom(props) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [property, setProperty] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [files, setFiles] = useState([]);
  const inputFileRef = useRef(null);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      productId: 0,
      name: "",
      price: 0,
      description: "",
      details: "",
      roomType: "",
      facility: "",
    },
    validationSchema: Yup.object().shape({
      productId: Yup.string().required("Tentukan property !!"),
      name: Yup.string().required("Room type harus diisi !!"),
      price: Yup.number().required("Price harus diisi!!"),
      description: Yup.string().required("Description harus diisi !!"),
      details: Yup.string().required("Details harus diisi !!"),
      facility: Yup.string().required("Facility harus diisi !!"),
    }),
    onSubmit: async (value) => {
      const {
        productId,
        name,
        price,
        description,
        details,
        roomType,
        facility,
      } = value;

      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("details", details);
      formData.append("roomType", roomType);
      formData.append("facility", facility);
      console.log(formData);

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      await axiosInstance
        .post("/api/room/addRoom", formData)
        .then((res) => {
          if (res.status === 200) {
            toast({
              title: "Room Created",
              description: res.data.message,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            props.fetchData();
            props.onClose();
            onCloseModal();
          } else {
            toast({
              title: "Info",
              description: res.data.message,
              status: "info",
              duration: 2000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    if (files) {
      if (files.length === 1) {
        setSelectedFile(`${files.length} file selected`);
      } else if (files.length > 1) {
        setSelectedFile(`${files.length} files selected`);
      } else {
        setSelectedFile("No selected file");
      }
    }
  }, [files]);

  const onCloseModal = () => {
    formik.setFieldValue("productId", 0);
    formik.setFieldValue("name", "");
    formik.setFieldValue("price", 0);
    formik.setFieldValue("description", "");
    formik.setFieldValue("details", "");
    formik.setFieldValue("roomType", "");
    formik.setFieldValue("facility", "");
    setFiles([]);
  };

  async function handleFile(event) {
    setFiles(event.target.files);
  }

  async function fetchProperty() {
    await axiosInstance.get("/api/property/").then((res) => {
      setProperty(res.data.result);
      console.log(res.data.result);
    });
  }

  useEffect(() => {
    fetchProperty();
  }, []);
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
        scrollBehavior={"inside"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADD NEW ROOM</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Property</FormLabel>
              <Select
                options={property}
                ref={initialRef}
                placeholder="Select Property"
                onChange={(e) =>
                  formik.setFieldValue("productId", e.target.value)
                }
              >
                {property.map((val, idx) => {
                  return (
                    <option value={val.id} key={idx}>
                      {val.name}
                    </option>
                  );
                })}
              </Select>
              <FormHelperText color="black">
                <Flex gap={2}>
                  <Icon
                    as={BiErrorCircle}
                    color="red"
                    boxSize={5}
                    display={formik.errors.productId ? null : "none"}
                  />
                  <Text>{formik.errors.productId}</Text>
                </Flex>
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Room Type</FormLabel>
              <Input
                placeholder="Room Type"
                onChange={(e) => formik.setFieldValue("name", e.target.value)}
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
                onChange={(e) => formik.setFieldValue("price", e.target.value)}
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
                border={"2px solid #264F8F "}
                _hover={{
                  borderColor: "#5B6D8A",
                }}
                cursor={"pointer"}
                onClick={() => {
                  inputFileRef.current.click();
                }}
              >
                <Flex
                  gap={2}
                  bgColor={"#264F8F"}
                  alignItems={"center"}
                  w={"180px"}
                  justifyContent={"center"}
                  _hover={{
                    bgColor: "#5B6D8A",
                  }}
                >
                  <Icon as={ImUpload} color="#fff" boxSize={5} />
                  <Text fontSize={20} color={"#fff"}>
                    Select a file
                  </Text>
                </Flex>
                <Text w="220px" fontSize={15} textAlign={"center"}>
                  {selectedFile}
                </Text>
              </Flex>
              <Input
                // w={"120px"}
                color={"#7F96BB"}
                bgColor={"#264F8F"}
                border={"none"}
                placeholder="Picture"
                type={"file"}
                multiple={true}
                accept="image/png, image/jpeg"
                onChange={handleFile}
                ref={inputFileRef}
                display="none"
              />
              {/* </InputGroup> */}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
              Save
            </Button>
            <Button
              onClick={() => {
                props.onClose();
                onCloseModal();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
