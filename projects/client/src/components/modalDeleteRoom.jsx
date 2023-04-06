import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";

export default function ModalDeleteRoom(props) {
  const location = useLocation();
  const id = props.id;
  async function deleteRoom() {
    await axiosInstance
      .delete("/api/room/removeRoom/" + props.id)
      .then((res) => {
        alert(res.data.message);
      });
  }

  useEffect(() => {
    console.log(id);
  }, [id]);
  return (
    <>
      <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
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
