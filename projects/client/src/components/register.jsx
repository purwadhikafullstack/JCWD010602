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
    Icon,Alert,AlertIcon,FormHelperText,
    Text,
    useColorModeValue,
    Link,
    Divider,
    IconButton,
  } from '@chakra-ui/react';
  import { createRef, useEffect, useRef, useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import{SlPeople} from "react-icons/sl"
  import {MdOutlineEmail} from "react-icons/md"
  import {BsTelephoneFill,BsCalendarWeek,BsFacebook} from "react-icons/bs"
  import {TbGenderAndrogyne} from "react-icons/tb"
  import {RiLockPasswordLine} from "react-icons/ri"
  import {BiErrorCircle} from "react-icons/bi"
  import { Select } from '@chakra-ui/react'; 
  import {useFormik} from "formik"
  import * as Yup from "yup";
  import YupPassword from "yup-password";
  import { axiosInstance } from '../config/config';
  import {useNavigate} from "react-router-dom"
  import { useToast } from '@chakra-ui/react'
  import {auth,facebook} from "../config/firebase"
  import {LoginSocialFacebook} from "reactjs-social-login"
  import {FacebookLoginButton} from "react-social-login-buttons"
  import { signInWithPopup } from "firebase/auth";
import { async } from '@firebase/util';
  export default function Register() {
    YupPassword(Yup)
    const [showPassword, setShowPassword] = useState(false);
    const [status,setStatus] = useState(false)
    const [msg,setMsg] =useState("")
    const toast = useToast()
    const [enable,setEnable] = useState(false)
    const initialRef = useRef(null)
    const navigate = useNavigate()
    const [userFacebook,setUserFacebook] = useState({
      fullname: "",
      password: "",
      email:"",
      phoneNumber:"",
      gender:"",
      birtdate:"",
      profilePicture:"",
      isVerified:true
    })
    const formik = useFormik({
      initialValues: {
        id: 0,
        fullname: "",
        password: "",
        email:"",
        phoneNumber:"",
        gender:"",
        birtdate:"",
        profilePicture:"",
        isVerified:false
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
        phoneNumber:Yup.string("Disii dengan angka").required("Phone Number wajib diisi!"),        
        gender:Yup.string().required("Gender wajib dipilih!!"),
        birtdate:Yup.string().required("Tentukan tanggal lahir!!")
      }),
      onSubmit: async() =>{
        const res = await axiosInstance
        .post("/api/auth/v2",formik.values)
        .catch((error)=>{
          console.log(error)
          setStatus(true)
          setMsg(error)
        })
        console.log(res.status)
        if (res.status===200){
          setStatus(false)
          const data = res.data.result
          toast({
            title: 'Account created.',
            description: res.data.message,
            status: 'success',
            duration: 4000,
            isClosable: true,
          
          })
          navigate("/verification",{state:{data:data}})
        }else {
          setStatus(true)
          setMsg(res.data.message)
        }
        console.log(res.data.message)

      }
    })


 

    useEffect(() =>{
      let {fullname,email,password,phoneNumber,gender,birtdate} = formik.values
      if (!fullname || !email || !password || !phoneNumber || !gender || !birtdate){
        setEnable(true)
      }else{
        setEnable(false)
      }
    },[formik.values])
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
                  <FormControl id="fullname" isRequired>
                  <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={SlPeople} color='gray.500' boxSize={5} />}
                    />
                    <Input type='text' placeholder='Full Name' ref={initialRef} onChange={(e)=>formik.setFieldValue("fullname",e.target.value)} />
                </InputGroup>
                <FormHelperText color="black">
                  <Flex gap={2}>
                  <Icon as={BiErrorCircle} color="red" boxSize={5} display={formik.errors.fullname ? null:"none"}/>
                  <Text>{formik.errors.fullname}</Text>
                  </Flex>
                </FormHelperText>
                  </FormControl>
            
              <FormControl id="email" isRequired>
              <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={MdOutlineEmail} color='gray.500' boxSize={5}  />}
                    />
                    <Input type='email' placeholder='Email' onChange={(e)=>formik.setFieldValue("email",e.target.value)} />
                </InputGroup>
                <FormHelperText color="black">
                  <Flex gap={2}>
                  <Icon as={BiErrorCircle} color="red" boxSize={5} display={formik.errors.email ? null:"none"}/>
                  <Text>{formik.errors.email}</Text>
                  </Flex>
                </FormHelperText>
              </FormControl>
              <FormControl id="phoneNumber" isRequired>
                  <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={BsTelephoneFill} color='gray.500'  boxSize={5}/>}
                    />
                 <Input type='number' placeholder='Phone Number' onChange={(e)=>formik.setFieldValue("phoneNumber",e.target.value)} />
                </InputGroup>
                <FormHelperText color="black">
                  <Flex gap={2}>
                  <Icon as={BiErrorCircle} color="red" boxSize={5} display={formik.errors.phoneNumber ? null:"none"}/>
                  <Text>{formik.errors.phoneNumber}</Text>
                  </Flex>
                </FormHelperText>
                  </FormControl>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Phone Number" onChange={(e)=>formik.setFieldValue("password",e.target.value)}/>
                  <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={RiLockPasswordLine} color='gray.500' boxSize={5}  />}
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
                <FormHelperText color="black">
                  <Flex gap={2}>
                  <Icon as={BiErrorCircle} color="red" boxSize={5} display={formik.errors.password ? null:"none"}/>
                  <Text>{formik.errors.password}</Text>
                  </Flex>
                </FormHelperText>
              </FormControl>

              <FormControl id="gender" isRequired>
              <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={TbGenderAndrogyne} color='gray.500' boxSize={5}  />}
                    />
                    <Select textIndent="23px" placeholder='Select your gender' onChange={(e)=>formik.setFieldValue("gender",e.target.value)}>
                    <option  value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    </Select>
                </InputGroup>
                <FormHelperText color="black">
                  <Flex gap={2}>
                  <Icon as={BiErrorCircle} color="red" boxSize={5} display={formik.errors.gender ? null:"none"}/>
                  <Text>{formik.errors.gender}</Text>
                  </Flex>
                </FormHelperText>
              </FormControl>

              <FormControl id="birthDate" isRequired>
              <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Icon as={BsCalendarWeek} color='gray.500' boxSize={5}/>}
                    />
                    <Input type='date' placeholder='Birthdate' onChange={(e)=>formik.setFieldValue("birtdate",e.target.value)} />
                </InputGroup>
                <FormHelperText color="black">
                  <Flex gap={2}>
                  <Icon as={BiErrorCircle} color="red" boxSize={5} display={formik.errors.birtdate ? null:"none"}/>
                  <Text>{formik.errors.birtdate}</Text>
                  </Flex>
                </FormHelperText>
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
                  }}
                  onClick={formik.handleSubmit}
                  isDisabled={enable? true : null}
                  >
                  Sign up
                </Button>
                <Flex alignItems={"center"} justifyItems="center" gap={3}>
                  <Divider/>
                  <Text>OR</Text>
                  <Divider/>
                </Flex>
                <Flex justifyContent={'center'}>
                  {/* <IconButton as={BsFacebook} >Continue with Facebook</IconButton> */}
                <LoginSocialFacebook
                appId='179342591522886'
                scope='user_birthday'
                onResolve={async(response) =>{
                  console.log(response)
                  const {name,email,gender} = response.data;
                  const {profilePicture} = response.data.picture.data.url;
                  setUserFacebook({
                    fullname: name,
                    password: "",
                    email:email,
                    phoneNumber:"",
                    gender:gender,
                    birtdate:null,
                    profilePicture:profilePicture,
                    isVerified:true
                  })
                  const addUserFB=await axiosInstance.post("/api/auth/v2",userFacebook)
                  console.log(addUserFB)
                  if(addUserFB.status === 200){
                    toast({
                      title: 'Account created.',
                      description:"Anda berhasil registrasi melalui Facebook Account",
                      status: 'success',
                      duration: 4000,
                      isClosable: true,
                    
                    })
                  }else{    
                    toast({
                    title: 'Error',
                    description: addUserFB.data.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                  
                  })

                  }
                }}
              
                onReject={(error)=>{
                  console.log(error)
                }}
                >
                <FacebookLoginButton/>
                </LoginSocialFacebook>
                {/* <Button
                  size="lg"
                  bg={'#1877f2'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={()=> socialLogin(facebook)}
                 
                  >
                  Continue with Facebook
                </Button> */}
                </Flex>
               
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