import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import "@fontsource/Poppins/400.css";
import { useNavigate } from "react-router-dom";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const SignUp: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [confirmpasswordVisible, setConfirmPasswordVisible] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmpasswordVisible);
  };
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isSignUp) {
      setFormData({ ...formData, [name]: value });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  const validateSignUpInputs = () => {
    const { fname, lname, email, password, confirmPassword } = formData;
  
    
    if (!fname || !lname || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Error",
        description: "Invalid email format.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  
   
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  
    return true; 
  };
  

  const handleSignUpClick = () => {
    if (!validateSignUpInputs()) return;
  
    axios
      .post("http://localhost:3000/api/user/signup", formData)
      .then((response) => {
        console.log("API Response:", response.data); 
  
        if (response.data.success) {
          toast({
            title: "Success",
            description: response.data.message || "Sign up successful!",
            status: "success", 
            duration: 3000,
            isClosable: true,
          });
          setFormData({
            fname: "",
            lname: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          toast({
            title: "Error",
            description: response.data.message || "Sign up failed. Please try again.",
            status: "error", 
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.error("Error:", err); 
        toast({
          title: "Error",
          description: "An error occurred during sign-up. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  

  const handleLoginClick = () => {
    axios
    .post("http://localhost:3000/api/user/login", loginData)
    .then((response) => {
      console.log("Server Response:", response.data); 

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        toast({
          title: "Success",
          description: "Login successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        
        setLoginData({ email: "", password: "" });

       
        navigate("/dashboard");
      } else {
        console.error("Unexpected Response:", response.data); 
        toast({
          title: "Error",
          description: "Invalid email or password.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    })
    .catch((err) => {
      console.error("Error during login:", err.response ? err.response.data : err.message); 
      toast({
        title: "Error",
        description: "An error occurred during login. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });

  };

  return (
    <>
        <Link
      href="/"
      fontSize="25px"
      fontFamily="Poppins"
      ml="10px"
    >
      Back
    </Link>

      {isSignUp ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          mt="10px"
          gap="4"
          mb="5px"
          width="100vw"
        >
          <Flex
           width={{ base: "90%", sm: "700px" }}  
           height={{ base: "auto", sm: "530px" }}
           bg="#EEEEEE"
            bgGradient="linear(to-r, #6D67E4 50%, transparent 50%)"
            boxShadow="0 4px 6px rgba(0.65, 0.65, 0.65, 0.85)"
            borderRadius="10px"
            justify="start"
            align="end"
            direction="column"
            p={{ base: "20px", sm: "30px" }}
            
          >
            <Box width="50%" textAlign="center">
              <Heading fontSize={{ base: "lg", sm: "xl" }}>Sign Up</Heading>
              <Text fontWeight="bold" color="#A6AEBF" fontFamily="Poppins" mt="5px">
                Enter your information to register
              </Text>
              <Flex  direction={{ base: "column", sm: "row" }} gap={{ base: "20px", sm: "40px" }} mt="30px">
                <Flex direction="column"  mt="30px" width={{ base: "100%", sm: "50%" }}>
                  <Text fontWeight="bold" color="#A6AEBF" fontFamily="Poppins" align="start">
                    First name
                  </Text>
                  <Input
                    name="fname"
                    value={formData.fname}
                    onChange={handleInputChange}
                    mt="5px"
                    width="150px"
                    background="white"
                    placeholder="Selam"
                    fontFamily="Poppins"
                    
                  />
                </Flex>
                <Flex direction="column" ml="10px" mt="30px" width={{ base: "100%", sm: "50%" }}>
                  <Text fontWeight="bold" color="#A6AEBF" fontFamily="Poppins" align="start">
                    Last name
                  </Text>
                  <Input
                    name="lname"
                    value={formData.lname}
                    onChange={handleInputChange}
                    mt="5px"
                    width="150px"
                    background="white"
                    placeholder="Nati"
                    fontFamily="Poppins"
                  />
                </Flex>
              </Flex>
              <Flex direction="column" ml="10px" mt="20px">
                <Text fontWeight="bold" color="#A6AEBF" fontFamily="Poppins" align="start">
                  Email
                </Text>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  mt="3px"
                  width="310px"
                  background="white"
                  placeholder="e61@gmail.com"
                  fontFamily="Poppins"
                  w='100%'
                />
              </Flex>
              <Flex direction="column" ml="10px" mt="20px">
                <Text fontWeight="bold" color="#A6AEBF" fontFamily="Poppins" align="start">
                  Password
                </Text>
                <Flex 
      align="center" 
      position="relative" 
      mt="3px" 
      width="310px" 
      w="100%"
    >
      
      <Input
        name="password"
        type={passwordVisible ? 'text' : 'password'}
        value={formData.password}
        onChange={handleInputChange}
        background="white"
        fontFamily="Poppins"
        pr="40px" 
      />

      
      <span
        onClick={togglePasswordVisibility}
        style={{
          position: 'absolute',
          right: '10px',
          cursor: 'pointer',
          color: '#555',
        }}
      >
        {passwordVisible ? <FaEye />: <FaEyeSlash />}
      </span>
    </Flex>
                
              </Flex>
              <Flex direction="column" ml="10px" mt="20px">
                <Text fontWeight="bold" color="#A6AEBF" fontFamily="Poppins" align="start">
                  Confirmation Password
                </Text>
                <Flex   align="center" 
      position="relative" 
      mt="3px" 
      width="310px" 
      w="100%">
                <Input
                  name="confirmPassword"
                  type={confirmpasswordVisible ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  mt="3px"
                  width="310px"
                  background="white"
                  placeholder="********"
                  fontFamily="Poppins"
                  w='100%'
                />
                  <span
        onClick={toggleConfirmPasswordVisibility}
        style={{
          position: 'absolute',
          right: '10px',
          cursor: 'pointer',
          color: '#555',
        }}
      >
        {confirmpasswordVisible ? <FaEye />: <FaEyeSlash />}
      </span>
                </Flex>
              
              </Flex>
              <Flex align="center" justify="center" direction={{ base: "column", sm: "row" }}>
                <Button
                  mt="12px"
                  width="110px"
                  bg="#6D67E4"
                  mr="17px"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </Button>
                <Text
                  mt={{ base: "10px", sm: "12px" }} 
                  color="#6D67E4"
                  cursor="pointer"
                  onClick={() => setIsSignUp(false)}
                >
                  Login
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Flex
          direction="column"
          align="center"
          justify="center"
          mt="10px"
          gap="4"
          mb="5px"
          width="100vw"
        >
          <Flex
            width={{ base: "90%", sm: "650px" }}  
            height={{ base: "auto", sm: "330px" }}
            bg="#6D67E4"
            bgGradient="linear(to-r, #EEEEEE 50%, transparent 50%)"
            boxShadow="0 4px 6px rgba(0.65, 0.65, 0.65, 0.85)"
            borderRadius="10px"
            justify="start"
            align="start"
            direction="column"
          >
            <Box width="50%" textAlign="center">
              <Heading fontSize={{ base: "lg", sm: "xl" }}>Login</Heading>
              <Text fontWeight="bold" color="#A6AEBF" fontFamily="Poppins" mt="5px" fontSize={{ base: "sm", sm: "md" }}>
                Enter your information to login
              </Text>
              <Flex direction="column" ml="10px" mt="20px">
                <Text fontWeight="bold" color="#A6AEBF" fontFamily="Poppins" align="start">
                  Email
                </Text>
                <Input
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  mt="8px"
                  width="310px"
                  background="white"
                  placeholder="mahihone61@gmail.com"
                  fontFamily="Poppins"
                  w='100%'
                />
              </Flex>
              <Flex direction="column" ml="10px" mt="20px">
                <Text fontWeight="bold" color="#A6AEBF" fontFamily="Poppins" align="start">
                  Password
                </Text>
                <Flex
                   align="center" 
                   position="relative" 
                   mt="3px" 
                   width="310px" 
                   w="100%"
                >
                <Input
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={handleInputChange}
                  mt="8px"
                  width="310px"
                  background="white"
                  placeholder="********"
                  fontFamily="Poppins"
                  w='100%'
                />
                      <span
        onClick={togglePasswordVisibility}
        style={{
          position: 'absolute',
          right: '10px',
          cursor: 'pointer',
          color: '#555',
        }}
      >
        {passwordVisible ? <FaEye />: <FaEyeSlash />}
      </span>
                </Flex>
           
              </Flex>
              <Flex direction={{ base: "column", sm: "row" }} align="center" justify="center">
                <Button
                 width={{ base: "100%", sm: "110px" }}
                  mt="12px"
                  bg="#6D67E4"
                  mr={{ base: "0", sm: "17px" }} 
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Text
                 mt={{ base: "10px", sm: "12px" }}
                  color="#6D67E4"
                  cursor="pointer"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default SignUp;