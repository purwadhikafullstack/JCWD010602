import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  IconButton,
  useBreakpointValue,
  Center,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";
import Slider from "react-slick";
import nophoto from "../assets/nophoto.jpg";
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
export default function ModalPaymentSlip(props) {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const [cards, setCards] = useState([props?.paymentSlip]);
  const id = props.id;
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  //   async function fetchPhotos() {
  //     await axiosInstance
  //       .get("/api/room/photos/" + id)
  //       .then((res) => {
  //         setCards(res.data.result);
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  useEffect(() => {
    console.log(cards);
    console.log(props?.paymentSlip);
  }, [cards]);

  useEffect(() => {
    console.log(cards);
    // fetchPhotos();
  }, [id]);

  return (
    <>
      <Modal
        isCentered
        isOpen={props.isOpen}
        size="xl"
        onClose={props.onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalCloseButton
            zIndex={2}
            onClick={() => {
              setCards(null);
            }}
          />
          <ModalBody>
            <Box
              position={"relative"}
              height={"400px"}
              width={"full"}
              overflow={"hidden"}
            >
              {/* CSS files for react-slick */}
              <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
              />

              {props?.paymentSlip === null ? (
                <>
                  <Box
                    mt="35px"
                    position="relative"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="cover"
                    backgroundImage={nophoto}
                  />
                </>
              ) : (
                <>
                  <Box
                    height={"3xl"}
                    mt="35px"
                    position="relative"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="cover"
                    backgroundImage={`url(${props?.paymentSlip})`}
                  />
                </>
              )}
            </Box>
          </ModalBody>
          <Box h="60px"></Box>
        </ModalContent>
      </Modal>
    </>
  );
}
