import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { TESTIMONIALS } from './index';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionFlex = motion(Flex);

interface Testimonial {
  id: string | number;
  image: string;
  name: string;
  feedback: string;
  rating: number;
}

function Testominal() {
  return (
    <Box>
      <Flex direction="column" align="center" justify="center" mt="20px">
        <Heading textAlign="center" fontSize={{ base: 'lg', md: 'xl' }}>
          What People Are Saying About Us
        </Heading>
      </Flex>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        align="center"
        mt="4"
        gap="10"
        wrap="wrap"
        mb="70px"
      >
        {TESTIMONIALS.map(({ id, image, name, feedback, rating }: Testimonial) => (
          <MotionFlex
            key={id}
            width={{ base: '80%', md: '200px' }}
            height={{ base: '250px', md: '300px' }}
            bg="#F6F5F5"
            boxShadow="0 4px 6px rgba(0.15, 0.15, 0.15, 0.15)"
            borderRadius="20px"
            mt="30px"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: Number(id) * 0.2, 
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            }}
            align="center"
            justify="center"
            flexDir="column"
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            <Box
              width="100px" 
              height="100px" 
              bgImage={`url(${image})`}
              bgSize="cover"
              bgPosition="center"
              borderRadius="50%" 
              backgroundRepeat="no-repeat"
              objectFit="cover" 
            ></Box>

            <Box flex="1" p="4" display="flex" flexDirection="column" justifyContent="center">
              <Text fontSize="lg" fontWeight="bold" mb="2" color="gray.800">
                {name}
              </Text>
              <Text fontSize="sm" color="gray.600" mb="3">
                "{feedback}"
              </Text>
              <Flex justifyContent="center">
                {Array(rating)
                  .fill(null)
                  .map((_, starIndex) => (
                    <Icon as={FaStar} key={starIndex} boxSize={4} color="yellow.400" />
                  ))}
              </Flex>
            </Box>

            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              height="50%"
              bg="rgba(0, 0, 0, 0.5)"
              color="white"
              opacity="0"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              transition="opacity 0.3s ease-in-out"
              _groupHover={{
                opacity: '1',
              }}
            >
              <Text fontSize="md" fontWeight="bold">
                {name}
              </Text>
              <Text mt="1" fontSize="sm">
                "{feedback}"
              </Text>
            </Box>
          </MotionFlex>
        ))}
      </Flex>
    </Box>
  );
}

export default Testominal;
