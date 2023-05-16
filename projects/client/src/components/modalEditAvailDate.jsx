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
  FormHelperText,
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
import { BiErrorCircle } from "react-icons/bi";

export default function ModalEditSpecialRoom(props) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [room, setRoom] = useState([]);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      startDate: props?.data?.startDate,
      endDate: props?.data?.endDate,
      roomId: props?.data?.roomId,
    },
    validationSchema: Yup.object().shape({
      roomId: Yup.number().required("Tentukan Room!!"),
      startDate: Yup.date().required("Tentukan tanggal awal !!"),
      endDate: Yup.date().required("Tentukan tanggal akhir !!"),
      specialPrice: Yup.number().required("Tentukan special price !!"),
    }),
    enableReinitialize: true,
    onSubmit: async (value) => {
      const { roomId, startDate, endDate } = value;

      const formData = new FormData();
      formData.append("roomId", roomId);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);

      await axiosInstance
        .patch(`/api/avail/editAvail/${props?.data?.id}`, formik.values)
        .then((res) => {
          if (res.status === 200) {
            toast({
              title: "Data Edited",
              description: res.data.message,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            props.fetchData();
            props.onClose();
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

  async function fetchRoom() {
    await axiosInstance.get("/api/room/").then((res) => {
      setRoom(res.data.result);
      console.log(res.data.result);
    });
  }

  useEffect(() => {
    fetchRoom();
    console.log(props.data);
    console.log(formik.values.endDate);
  }, [props.data]);
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
          <ModalHeader>EDIT AVAILABILITY DATA</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              props?.setData(null);
            }}
          />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Room Type</FormLabel>
              <Input
                type="text"
                defaultValue={props?.data?.Room.name}
                disabled="disabled"
              />
              {/* <Select
                ref={initialRef}
                placeholder="Select Room"
                onChange={(e) => formik.setFieldValue("roomId", e.target.value)}
              >
                {room?.map((val, idx) => {
                  if (props?.data?.id === val.id) {
                    return (
                      <option value={val.id} key={idx} selected>
                        {val.name}
                      </option>
                    );
                  } else {
                    return (
                      <option value={val.id} key={idx}>
                        {val.name}
                      </option>
                    );
                  }
                })}
              </Select> */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                placeholder="Start Date"
                defaultValue={formik.values.startDate}
                onChange={(e) =>
                  formik.setFieldValue("startDate", e.target.value)
                }
              />
              <FormHelperText color="black">
                <Flex gap={2}>
                  <Icon
                    as={BiErrorCircle}
                    color="red"
                    boxSize={5}
                    display={formik.errors.startDate ? null : "none"}
                  />
                  <Text>{formik.errors.startDate}</Text>
                </Flex>
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                placeholder="End Date"
                defaultValue={formik.values.endDate}
                onChange={(e) =>
                  formik.setFieldValue("endDate", e.target.value)
                }
              />
              <FormHelperText color="black">
                <Flex gap={2}>
                  <Icon
                    as={BiErrorCircle}
                    color="red"
                    boxSize={5}
                    display={formik.errors.endDate ? null : "none"}
                  />
                  <Text>{formik.errors.endDate}</Text>
                </Flex>
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
              Save
            </Button>
            <Button
              onClick={() => {
                props?.setData(null);
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
