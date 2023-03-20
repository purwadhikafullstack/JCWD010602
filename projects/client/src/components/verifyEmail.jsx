import { Center, Heading } from '@chakra-ui/react';
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,Text
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { axiosInstance } from '../config/config';
import { useToast } from '@chakra-ui/react';

export default function VerifyEmail() {
    const [pin,setPin] = useState()
    const location =  useLocation()
    const toast = useToast()
    const data = {
      userId : location.state.data.id,
      fullname : location.state.data.fullname,
      email : location.state.data.email
    }
   const verif = {
    userId : Number(location.state.data.id),
    otpCode : Number(pin)
   }

    useEffect (()=>{
        console.log(pin)
    },[pin])

  async function resendVerif () {
     const resendVerif = await axiosInstance
     .post("/api/auth/resendVerif",data)
     .catch((err)=>{
      console.log(err)
      toast({
        title: 'Error',
        description: err,
        status: 'error',
        duration: 4000,
        isClosable: true,
      
    })
  })
    console.log(resendVerif)
     if(resendVerif?.status === 200){
      toast({
        title: 'Resend Verification Code',
        description: resendVerif.data.message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      
      })
    }else{
      toast({
        title: 'Error',
        description: resendVerif.data.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      
      })
    
    }
    }

    function handleChange (e) {
      setPin(e)
      console.log(pin)
      console.log(verif)
    }
    async function userVerification (){
      const res = await axiosInstance
      .post("/api/auth/verifyCode",verif)
      .catch((err) => {
        console.log(err)
      })
      if(res?.status === 200){
        toast({
          title: 'Verification Success',
          description: res.data.message,
          status: 'success',
          duration: 4000,
          isClosable: true,
        
        })
      }else{
        toast({
          title: 'Error',
          description: res.data.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        
        })
      
      }
    }
    
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        
        my={10}>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Kami baru saja mengirimkan kode OTP ke email
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'gray.400')}>
          {location.state.data.email}
        </Center>
        <FormControl>
          <Center>
            <Flex flexDir={'column'} gap={3}>
            <HStack>
              <PinInput onChange={handleChange} value={pin}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <Text textAlign={"center"} cursor="pointer" color="#4299E1" 
            _hover={{
              color: 'blue.200',
            }}
            onClick={resendVerif}
            > Kirim ulang kode OTP</Text>
            </Flex>
            
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={userVerification}
            >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}