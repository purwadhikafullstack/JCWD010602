import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";
export default function ModalDeleteRoom(props) {
  const location = useLocation();
  const id = props.id;
  const toast = useToast();
  async function deleteRoom() {
    await axiosInstance
      .delete("/api/room/removeRoom/" + props.id)
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
        }
      });
  }

  useEffect(() => {
    console.log(id);
  }, [id]);
  return (
    <>
      <Modal
        isCentered
        isOpen={props.isOpen}
        onClose={props.onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>DELETE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Anda yakin menghapus data ini?</Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button onClick={deleteRoom}>Confirm</Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
