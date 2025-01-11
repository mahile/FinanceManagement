import { Flex, Box, Image, Text, VStack, HStack, Avatar, Button } from "@chakra-ui/react";
import { motion } from "framer-motion"; 
import P from '../assets/p.png'
import P1 from '../assets/p2.png'
import P2 from '../assets/p3.png'
import Grlie from '../assets/grile.png'
import {  BsStars } from "react-icons/bs";
import { Link } from "react-router-dom";

const MotionFlex = motion(Flex);
const MotionImage = motion(Image);

function ProfileSection() {
  return (
    <Flex align="center" minH="100vh" p={6} direction="column" justify="center" w="100%">
      <MotionFlex
        p={8}
        rounded="lg"
        maxW="900px"
        w="full"
        align="center"
        gap={10}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        direction={{ base: "column", sm: "row" }} 
      >
        
        <Box position="relative" w={{ base: "100%", sm: "50%" }} mb={{ base: 6, sm: 0 }}>
          <Box
            position="absolute"
            top="0"
            left="0"
            zIndex="1"
            h="120px"
            w="120px"
            rounded="full"
            transform="translate(-20px, -20px)"
            filter="blur(10px)"
          />
          <MotionImage
            src={Grlie}
            alt="Profile Image"
            borderRadius="lg"
            boxShadow="md"
            width={{ base: "90%", sm: "400px" }}
            height={{ base: "250px", sm: "350px" }}
            background="gray.50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            mx="auto" 
          />
              <Box
  position={{ base: "static", sm: "absolute" }} 
  bottom={{ base: "auto", sm: "-20px" }} 
  right={{ base: "auto", sm: "10px" }}
  transform={{ base: "none", sm: "none" }}
  bg="white"
  borderRadius="lg"
  boxShadow="md"
  p={6}
  w="220px"
  mt={{ base: 4, sm: 0 }} 
>
  <Text fontSize="md" fontWeight="bold" mb={3}>
    100k+ Verified Users
  </Text>
  <VStack align="start" spacing={4}>
    <HStack spacing={4}>
      <Avatar size="sm" src={P} />
      <Box>
        <Text fontSize="sm" fontWeight="semibold">
          Nahom
        </Text>
        <Text fontSize="xs" color="gray.500">
          Mentor of Web Design
        </Text>
      </Box>
    </HStack>
    <HStack spacing={4}>
      <Avatar size="sm" src={P1} />
      <Box>
        <Text fontSize="sm" fontWeight="semibold">
          Albert Flores
        </Text>
        <Text fontSize="xs" color="gray.500">
          Mentor of Web Design
        </Text>
      </Box>
    </HStack>
    <HStack spacing={4}>
      <Avatar size="sm" src={P2} />
      <Box>
        <Text fontSize="sm" fontWeight="semibold">
          Wade Warren
        </Text>
        <Text fontSize="xs" color="gray.500">
          Mentor of UI/UX
        </Text>
      </Box>
    </HStack>
  </VStack>
</Box>

        </Box>

       
        <Box
          w={{ base: "100%", sm: "50%" }}
          textAlign={{ base: "center", sm: "left" }}
          display="flex"
          flexDirection="column"
          alignItems={{ base: "center", sm: "flex-start" }}
          px={{ base: 4, sm: 0 }}
        >
          <Text fontSize={{ base: "lg", sm: "2xl" }} fontWeight="bold" mb={4}>
            Transform Your Financial Goals Today.
          </Text>
          <Text fontSize={{ base: "sm", sm: "md" }} color="gray.600" mb={6}>
            Just like we said before, we have tons of features that will help you
            to manage your wallet. From income, outcome, monthly usage, and etc.
          </Text>
          
          <Button colorScheme="teal" size="lg" rightIcon={<BsStars />} as={Link} to='/signup'>
               Get Started
          </Button>
        </Box>
      </MotionFlex>
    </Flex>
  );
}

export default ProfileSection;
