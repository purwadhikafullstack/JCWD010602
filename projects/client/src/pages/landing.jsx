import { Box, Button, Image, Stack } from "@chakra-ui/react";

export default function LandingPage(props){
    return(
        <>
        <Box h="50vh" w="100%">
            <Image></Image>
        </Box>
        <Box h="50vh" w="100%">
            <Stack spacing={4} direction='row' align='center'>
                <Button colorScheme='teal' size='md' w="70vw">
                    Login
                </Button>
                <Button colorScheme='teal' size='md' w="70vw">
                    Register
                </Button>
            </Stack>
        </Box>
        </>
    )
}