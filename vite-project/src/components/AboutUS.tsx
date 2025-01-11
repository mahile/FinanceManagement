import {Box, Heading, VStack,Text}  from '@chakra-ui/react'

const AboutUs: React.FC = () => {
  return (
    <Box bg="gray.100" p={8} borderRadius="lg" shadow="md" height='100vh'>
      <VStack spacing={4}  align="start">
        <Heading as="h2" size="xl" color="teal.500">
          About Us
        </Heading>
        <Text fontSize="lg" color="gray.700">
          Welcome to <strong>BM</strong>, a comprehensive and
          innovative financial management system designed to empower individuals
          and businesses to take control of their finances. Our platform
          combines cutting-edge technology with user-friendly tools to simplify
          budgeting, expense tracking, and financial planning. Whether you're a
          small business owner seeking to optimize cash flow or an individual
          striving to achieve personal financial goals, our system provides
          tailored solutions to meet your needs.
        </Text>
        <Text fontSize="lg" color="gray.700">
          At <strong>BM</strong>, we believe in transparency,
          security, and efficiency. Our mission is to make financial management
          accessible to everyone by providing real-time insights, automated
          features, and secure data handling. Join us in transforming the way
          you manage your finances and take the first step toward financial
          success today.
        </Text>
      </VStack>
    </Box>
  );
};

export default AboutUs;
