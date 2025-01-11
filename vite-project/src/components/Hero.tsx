import React, { useRef, useEffect, useState } from "react";
import { Heading, Text, Box, Flex, Image, Icon } from "@chakra-ui/react";
import Pn from "../assets/pn2.png";
import { FaCreditCard, FaDollarSign, FaStar, FaWallet } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import Footer from "./Footer";
import ProfileSection from "./ProfileSection";
import PartnersSection from "./PartnersSection";
import Testominal from "./Testominal";

const MotionText = motion(Text);
const MotionImage = motion(Image);
const MotionFlex = motion(Flex);

const Hero: React.FC = () => {
  const [whyVisible, setWhyVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);

  const whySectionRef = useRef<HTMLDivElement | null>(null);
  const testimonialsSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.2,
    };

    const whyObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setWhyVisible(true);
      }
    }, observerOptions);

    const testimonialsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTestimonialsVisible(true);
      }
    }, observerOptions);

    if (whySectionRef.current) {
      whyObserver.observe(whySectionRef.current);
    }

    if (testimonialsSectionRef.current) {
      testimonialsObserver.observe(testimonialsSectionRef.current);
    }

    return () => {
      whyObserver.disconnect();
      testimonialsObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Box mt="190px" ml={{ base: "20px", md: "40px" }}
      
      >
       
        <Flex 
          direction={{ base: "column", md: "row" }} 
          flexWrap="wrap" 
          justify="center" 
          mt="10px"
          align="center"
          
        >
          <Box 
            mb={{ base: "20px", md: "0" }} 
            maxW="600px" 
            textAlign={{ base: "center", md: "left" }}
          >
             <Heading
      fontSize={{ base: "2xl", md: "4xl" }}
      mb="4"
      bgGradient="linear(to-r, blue.500, green.500, red.500)"
      bgClip="text"
    >
      Empower Your Financial <br /> Future
    </Heading>
            <MotionText
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              fontSize={{ base: "md", md: "lg" }}
              color="gray.700"
              maxW="600px"
              lineHeight="1.6"
            >
              Welcome to finance management! It involves planning, budgeting,
              saving, and investing to achieve financial goals. For businesses,
              it ensures profitability and growth, while for individuals, it
              helps secure financial stability. Effective finance management is
              key to a secure and successful future.
            </MotionText>
          </Box>
          <MotionFlex
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <MotionImage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              src={Pn}
              alt="Finance Image"
              boxSize={{ base: "250px", md: "400px" }}
              objectFit="cover"
              borderRadius="md"
              mt="20px"
            />
          </MotionFlex>
        </Flex>

        
        <Flex
          direction="column"
          align="center"
          justify="center"
          mt="10px"
          ref={whySectionRef}
        >
          <Heading textAlign="center" fontSize={{ base: "lg", md: "xl" }}>
            Why Should You Use Financial Management
          </Heading>
        </Flex>

        <MotionFlex
          direction={{ base: "column", md: "row" }}
          justify="center"
          align="center"
          mt="4"
          gap={{ base: "30px", md: "75px" }}
          mb="20"
          wrap="wrap"
          initial="hidden"
          animate={whyVisible ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {[
            { icon: FaCreditCard, title: "Easy Payment" },
            { icon: FaDollarSign, title: "Wire money as you wish" },
            { icon: FaMoneyBill1Wave, title: "Track your money" },
            { icon: FaWallet, title: "Low Cost" },
          ].map((item, index) => (
            <MotionFlex
              key={index}
              direction="column"
              align="center"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.1 }}
              p="4"
              w={{ base: "80%", md: "200px" }}
              textAlign="center"
            >
              <Flex
                p="12px"
                bg="#E9E8E8"
                borderRadius="50%"
                justify="center"
                align="center"
                mb="4"
                w="80px"
                h="80px"
              >
                <Icon as={item.icon} boxSize={12} color="teal.500" />
              </Flex>
              <Text fontWeight="bold" fontSize="xl" mb="2">
                {item.title}
              </Text>
              <Text fontSize="md" px="2">
                A short description of {item.title}
              </Text>
            </MotionFlex>
          ))}
        </MotionFlex>
        <ProfileSection/>
        <PartnersSection/>

      <Testominal/> 
      </Box>
      <Footer/>
    </>
  );
};

export default Hero;