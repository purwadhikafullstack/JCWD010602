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
    Icon,Alert,AlertIcon,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import{SlPeople} from "react-icons/sl"
  import {MdOutlineEmail} from "react-icons/md"
  import {BsTelephoneFill,BsCalendarWeek} from "react-icons/bs"
  import {TbGenderAndrogyne} from "react-icons/tb"
  import { Select } from '@chakra-ui/react'; 
  import {useFormik} from "formik"
  import * as Yup from "yup";
  import YupPassword from "yup-password";
  import { axiosInstance } from '../config/config';
  import {useNavigate} from "react-router-dom"
  export default function Register() {
    YupPassword(Yup)
    const [showPassword, setShowPassword] = useState(false);
    const [status,setStatus] = useState(false)
    const [msg,setMsg] =useState("")
    
    const formik = useFormik({
      initialValues: {
        id: 0,
        fullname: "",
        password: "",
        email:"",
        phoneNumber:"",
        isVerified : false,
        gender:"",
        birtdate:"",
        profilePicture:"",
        isTenant:false,

      },
      validationSchema:Yup.object().shape({
        fullname:Yup.string()
        .required("Fullname wajib diisi!!"),
        email:Yup.string()
        .required("Email harus diisi!!")
        .email("Email tidak sesuai!!"),
        password: Yup.string()
        .required("Password wajib diisi!!")
        .minUppercase(1, "Minimal 1 huruf besar")
        .min(8, "Minimal 8 digit"),
        phoneNumber:Yup.number("Disii dengan angka"),        
        gender:Yup.string().required("Gender wajib dipilih!!"),
        birtdate:Yup.date().required("Tentukan tanggal lahir!!")
      }),
      onSubmit: async() =>{
        const response = await axiosInstance
        .post("/api/auth/v1",formik.values)
        .catch((error)=>{
          console.log(error)
          setStatus(true)
          setMsg(error.response.data.message)
        })

        if (response.status==201){

        }
      }
    })
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            w="365px"
            p={8}>
            <Stack spacing={4}>
                  <FormControl id="fullName" isRequired>
                  <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={SlPeople} color='gray.300' />}
                    />
                    <Input type='text' placeholder='Full Name' onChange={(e)=>formik.setFieldValue("fullname",e.target.value)} />
                </InputGroup>
                  </FormControl>
            
              <FormControl id="email" isRequired>
              <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={MdOutlineEmail} color='gray.300' size="2xl" />}
                    />
                    <Input type='email' placeholder='Email' onChange={(e)=>formik.setFieldValue("email",e.target.value)} />
                </InputGroup>
              </FormControl>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Phone Number" onChange={(e)=>formik.setFieldValue("password",e.target.value)}/>
                  <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={BsTelephoneFill} color='gray.300' size="2xl" />}
                    />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="gender" isRequired>
              <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={TbGenderAndrogyne} color='gray.300' size="3xl" />}
                    />
                    <Select textIndent="23px" placeholder='Select your gender'>
                    <option  value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    </Select>
                </InputGroup>
              </FormControl>

              <FormControl id="birthDate" isRequired>
              <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={BsCalendarWeek} color='gray.300' size="2xl" />}
                    />
                    <Input type='date' placeholder='Birthdate' onChange={(e)=>formik.setFieldValue("birtdate",e.target.value)} />
                </InputGroup>
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
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }