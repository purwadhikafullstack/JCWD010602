import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Stack,
    Button,
    Icon,
    Alert,
    AlertIcon,
    FormHelperText,
    Text,
    useColorModeValue,
    Link,
    Divider,
    IconButton,
  } from "@chakra-ui/react";
  import { useEffect, useRef, useState } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { SlPeople } from "react-icons/sl";
  import { MdOutlineEmail } from "react-icons/md";
  import { BsTelephoneFill, BsCalendarWeek, BsFacebook } from "react-icons/bs";
  import { TbGenderAndrogyne } from "react-icons/tb";
  import { RiLockPasswordLine } from "react-icons/ri";
  import { BiErrorCircle } from "react-icons/bi";
  import { Select } from "@chakra-ui/react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import YupPassword from "yup-password";
  import { axiosInstance } from "../config/config";
  import { useNavigate } from "react-router-dom";
  import { useToast } from "@chakra-ui/react";
  import axios from 'axios';

  export default function TenantRegister() {
    YupPassword(Yup);
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState(false);
    const [msg, setMsg] = useState("");
    const toast = useToast();
    const [enable, setEnable] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('Choose file');
    const [uploadedFile, setUploadedFile] = useState({});
    const initialRef = useRef(null);
    const navigate = useNavigate();
    const [userFacebook, setUserFacebook] = useState({
      fullname: "",
      email: "",
      phoneNumber: "",
      gender: "",
      profilePicture: "",
      isVerified: true,
    });
    const formik = useFormik({
      initialValues: {
        id: 0,
        fullname: "",
        password: "",
        email: "",
        phoneNumber: "",
        gender: "",
        birtdate: "",
        profilePicture: "",
        isVerified: false,
      },
      validationSchema: Yup.object().shape({
        fullname: Yup.string().required("Fullname wajib diisi!!"),
        email: Yup.string()
          .required("Email harus diisi!!")
          .email("Email tidak sesuai!!"),
        password: Yup.string()
          .required("Password wajib diisi!!")
          .minUppercase(1, "Minimal 1 huruf besar")
          .min(8, "Minimal 8 digit"),
        phoneNumber: Yup.string("Disii dengan angka").required(
          "Phone Number wajib diisi!"
        ),
        gender: Yup.string().required("Gender wajib dipilih!!"),
        birtdate: Yup.string().required("Tentukan tanggal lahir!!"),
      }),
      onSubmit: async () => {
        const res = await axiosInstance
          .post("/api/auth/v2", formik.values)
          .catch((error) => {
            console.log(error);
            setStatus(true);
            setMsg(error);
          });
        console.log(res.status);
        if (res.status === 200) {
          setStatus(false);
          const data = res.data.result;
          toast({
            title: "Account created.",
            description: res.data.message,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          navigate("/verification", { state: { data: data } });
        } else {
          setStatus(true);
          setMsg(res.data.message);
        }
        console.log(res.data.message);
      },
    });

    const onChange = (event) => {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    };
  
    const onSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const { fileName, filePath } = res.data;
        setUploadedFile({ fileName, filePath });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          console.log('There was a problem with the server');
        } else {
          console.log(error.response.data.msg);
        }
      }
    };
  
    useEffect(() => {
      let { fullname, email, password, phoneNumber } =
        formik.values;
      if (
        !fullname ||
        !email ||
        !password ||
        !phoneNumber
      ) {
        setEnable(true);
      } else {
        setEnable(false);
      }
    }, [formik.values]);
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            w="365px"
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="fullname" isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={SlPeople} color="gray.500" boxSize={5} />}
                  />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    ref={initialRef}
                    onChange={(e) =>
                      formik.setFieldValue("fullname", e.target.value)
                    }
                  />
                </InputGroup>
                <FormHelperText color="black">
                  <Flex gap={2}>
                    <Icon
                      as={BiErrorCircle}
                      color="red"
                      boxSize={5}
                      display={formik.errors.fullname ? null : "none"}
                    />
                    <Text>{formik.errors.fullname}</Text>
                  </Flex>
                </FormHelperText>
              </FormControl>
  
              <FormControl id="email" isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon as={MdOutlineEmail} color="gray.500" boxSize={5} />
                    }
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      formik.setFieldValue("email", e.target.value)
                    }
                  />
                </InputGroup>
                <FormHelperText color="black">
                  <Flex gap={2}>
                    <Icon
                      as={BiErrorCircle}
                      color="red"
                      boxSize={5}
                      display={formik.errors.email ? null : "none"}
                    />
                    <Text>{formik.errors.email}</Text>
                  </Flex>
                </FormHelperText>
              </FormControl>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) =>
                      formik.setFieldValue("password", e.target.value)
                    }
                  />
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon
                        as={RiLockPasswordLine}
                        color="gray.500"
                        boxSize={5}
                      />
                    }
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText color="black">
                  <Flex gap={2}>
                    <Icon
                      as={BiErrorCircle}
                      color="red"
                      boxSize={5}
                      display={formik.errors.password ? null : "none"}
                    />
                    <Text>{formik.errors.password}</Text>
                  </Flex>
                </FormHelperText>
              </FormControl>
              <FormControl id="phoneNumber" isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon as={BsTelephoneFill} color="gray.500" boxSize={5} />
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Phone Number"
                    onChange={(e) =>
                      formik.setFieldValue("phoneNumber", e.target.value)
                    }
                  />
                </InputGroup>
                <FormHelperText color="black">
                  <Flex gap={2}>
                    <Icon
                      as={BiErrorCircle}
                      color="red"
                      boxSize={5}
                      display={formik.errors.phoneNumber ? null : "none"}
                    />
                    <Text>{formik.errors.phoneNumber}</Text>
                  </Flex>
                </FormHelperText>
              </FormControl>
              
  
              <FormControl id="gender" isRequired>
                {/* <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon as={TbGenderAndrogyne} color="gray.500" boxSize={5} />
                    }
                  />
                  <Select
                    textIndent="23px"
                    placeholder="Select your gender"
                    onChange={(e) =>
                      formik.setFieldValue("gender", e.target.value)
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </InputGroup>
                <FormHelperText color="black">
                  <Flex gap={2}>
                    <Icon
                      as={BiErrorCircle}
                      color="red"
                      boxSize={5}
                      display={formik.errors.gender ? null : "none"}
                    />
                    <Text>{formik.errors.gender}</Text>
                  </Flex>
                </FormHelperText> */}
                <form onSubmit={onSubmit}>
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {fileName}
                  </label>

                  <input
                    type="submit"
                    value="Upload"
                    className="btn btn-primary btn-block mt-4"
                  />
                  </form>

                  {uploadedFile ? (
                    <div className="row mt-5">
                      <div className="col-md-6 m-auto">
                        <h3 className="text-center">{uploadedFile.fileName}</h3>
                        <img
                          style={{ width: '100%' }}
                          src={uploadedFile.filePath}
                          alt=""
                        />
                      </div>
                    </div>
                  ) : null}
              </FormControl>
  
              {status ? (
                <Alert status="error" zIndex={2} variant="top-accent">
                  <AlertIcon />
                  {msg}
                </Alert>
              ) : null}

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={formik.handleSubmit}
                  isDisabled={enable ? true : null}
                >
                  Sign up as tenant
                </Button>
              </Stack>
  
              
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }