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
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";
import Slider from "react-slick";
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
export default function ModalDetailPhotos(props) {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const [cards, setCards] = useState();
  const id = props.id;
  const side = useBreakpointValue({ base: "30%", md: "10px" });
  // const cards = [
  //   "https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  //   "https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  //   "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  // ];

  async function fetchPhotos() {
    await axiosInstance
      .get("/api/room/photos/" + id)
      .then((res) => {
        setCards(res.data.result);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  useEffect(() => {
    fetchPhotos();
  }, [id]);

  return (
    <>
      <Modal isCentered isOpen={props.isOpen} size="xl" onClose={props.onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalCloseButton zIndex={2} />
          <ModalBody>
            <Box
              position={"relative"}
              height={"600px"}
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
              {/* Left Icon */}
              <IconButton
                aria-label="left-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                left={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={() => slider?.slickPrev()}
              >
                <BiLeftArrowAlt />
              </IconButton>
              {/* Right Icon */}
              <IconButton
                aria-label="right-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                right={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={() => slider?.slickNext()}
              >
                <BiRightArrowAlt />
              </IconButton>
              {/* Slider */}
              <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {cards?.map((val, index) => (
                  <Box
                    key={index}
                    height={"3xl"}
                    mt="35px"
                    position="relative"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="cover"
                    backgroundImage={`url(${val.Picture.pictureUrl})`}
                  />
                ))}
              </Slider>
            </Box>
          </ModalBody>
          <Box h="35px"></Box>
        </ModalContent>
      </Modal>
    </>
  );
}
