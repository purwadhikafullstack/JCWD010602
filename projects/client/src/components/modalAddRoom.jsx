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
  Stack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FcUpload } from "react-icons/fc";
import { axiosInstance } from "../config/config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

export default function ModalAddRoom(props) {
  const [show, setShow] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [property, setProperty] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photosId, setPhotosId] = useState();
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
      productId: Yup.number().required("Tentukan property !!"),
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

      await axiosInstance
        .post("/api/room/addRoom", formData)
        .then((res) => {
          if (res.status === 200) {
          }
          console.log(res.data);
          props.fetchData();
          props.onClose();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  // async function fetchPhotos () {
  //   await axiosInstance
  //   .get("/photos",photosId)
  //   .then((res) =>{
  //     setPhotos(res.data.result)
  //   })
  //   .catch((err) =>{
  //     console.log(err)
  //   })
  // }

  async function deletePhotos(val) {
    await axiosInstance.delete("").then((res) => {});
  }

  useEffect(() => {
    console.log(photos);
  }, [photos]);

  async function handleFile(event) {
    const formData = new FormData();
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append("files", event.target.files[i]);
    }

    await axiosInstance.post("/api/room/addPhotos", formData).then((res) => {
      console.log(res.data.result);
      const arrUrl = [];
      for (let i = 0; i < res.data.result.length; i++) {
        arrUrl.push(res.data.result[i].id);
      }
      setPhotosId(arrUrl);
      setPhotos(res.data.result);
      // fetchPhotos();
    });
  }

  async function fetchProperty() {
    await axiosInstance.get("/api/property/").then((res) => {
      setProperty(res.data.result);
      console.log(res.data.result);
    });
  }

  useEffect(() => {
    fetchProperty();
    setShow(false);
    console.log(property);
  }, []);
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
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Room Type</FormLabel>
              <Input
                placeholder="Room Type"
                onChange={(e) => formik.setFieldValue("name", e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Price"
                onChange={(e) => formik.setFieldValue("price", e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                onChange={(e) =>
                  formik.setFieldValue("description", e.target.value)
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Details</FormLabel>
              <Textarea
                placeholder="Details"
                onChange={(e) =>
                  formik.setFieldValue("details", e.target.value)
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Facility</FormLabel>
              <Textarea
                placeholder="Facility"
                onChange={(e) =>
                  formik.setFieldValue("facility", e.target.value)
                }
              />
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
              {photos?.map((val, idx) => {
                return (
                  <Flex
                    flexDir={"column"}
                    w="150px"
                    justifyContent={"space-between"}
                    key={idx}
                  >
                    <Box
                      h="150px"
                      bgImage={val.pictureUrl}
                      backgroundPosition="center"
                      backgroundRepeat="no-repeat"
                      backgroundSize="cover"
                    ></Box>

                    <Button
                      h="30px"
                      onClick={() => {
                        // setUrlPhotos(val.Picture.pictureUrl);
                        deletePhotos(val.id);
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
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// import { Input, FormControl, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, Code, Icon } from "@chakra-ui/react";
// import { FiFile } from "react-icons/fi";
// import { useController } from "react-hook-form";
// import { useRef } from "react";

// const FileUpload = ({ name, placeholder, acceptedFileTypes, control, children, isRequired=false }) => {
//   const inputRef = useRef();
//   const {
//     field: { ref, value, ...inputProps },
//     meta: { invalid, isTouched, isDirty },
//   } = useController({
//     name,
//     control,
//     rules: { required: isRequired },
//   });

//   return (
//     <FormControl isInvalid={invalid} isRequired>
//       <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
//       <InputGroup>
//         <InputLeftElement
//           pointerEvents="none"
//           children={<Icon as={FiFile} />}
//         />
//         <input type='file' accept={acceptedFileTypes} name={name} ref={inputRef} {...inputProps} inputRef={ref} style={{ display: 'none' }}></input>
//         <Input
//           placeholder={placeholder || "Your file ..."}
//           onClick={() => inputRef.current.click()}
//           value={value}
//         />
//       </InputGroup>
//       <FormErrorMessage>
//         {invalid}
//       </FormErrorMessage>
//     </FormControl>
//   );
// }

// export default FileUpload;
