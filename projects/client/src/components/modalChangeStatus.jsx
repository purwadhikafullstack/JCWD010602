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
export default function ModalChangeStatus(props) {
  const location = useLocation();
  const id = props.id;
  const toast = useToast();

  async function cancelTrans() {
    await axiosInstance
      .post("/api/transactions/cancelTrans", { id: props.id })
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Transactions Canceled",
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
  }

  async function rejectTrans() {
    console.log(id);
    await axiosInstance
      .post("/api/transactions/rejectTrans", { id: props.id })
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Transactions Rejected",
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
  }

  async function approvedTrans() {
    await axiosInstance
      .post("/api/transactions/approvedTrans", { id: props.id })
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Transactions Approved",
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
  }

  function confirm() {
    if (props.status === "CANCEL") {
      cancelTrans();
    } else if (props.status === "REJECT") {
      rejectTrans();
    } else if (props.status === "APPROVE") {
      approvedTrans();
      console.log("test");
    }
  }

  useEffect(() => {
    console.log(props.id);
  }, []);
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
          <ModalHeader>{props.status}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {props.status === "CANCEL"
                ? "Anda yakin membatalkan transaksi ini ?"
                : null}
              {props.status === "REJECT"
                ? "Anda yakin menolak transaksi ini ?"
                : null}
              {props.status === "APPROVE"
                ? "Anda yakin mekonfirmasi transaksi ini ?"
                : null}
            </Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              onClick={() => {
                confirm();
              }}
            >
              Confirm
            </Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
