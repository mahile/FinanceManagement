import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";


const Transaction = () => {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    description: "",
  });

  const toast = useToast();
  const getToken = () => localStorage.getItem('authToken');
  
  const getUserIdFromToken = (): string | null => {
    const token = getToken();
    if (!token) return null;
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken?.userId || null;
    } catch {
      return null;
    }
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    const { date, amount, description } = formData;
  
    if (!date || !amount) {
      toast({
        title: "Error",
        description: "Date and amount are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    try {
      const userId = getUserIdFromToken(); 
  
      
      const response = await axios.post(
        "http://localhost:3000/api/transaction/add-transaction", 
        { date, amount, description, userId }
      );
  
      
      if (response.data.success) {
          toast({
            title: "Success",
            description: "Transaction added and deposit balance updated successfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

        
          setFormData({
            date: "",
            amount: "",
            description: "",
          });
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
  
      
      toast({
        title: "Error",
        description: "There was an issue adding the transaction or updating the balance.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Box
      maxW="400px"
      mx="auto"
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      mb="20px"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={formData.date} 
              onChange={handleChange} 
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Additional details (optional)"
              value={formData.description} 
              onChange={handleChange} 
            />
          </FormControl>

          <Button colorScheme="blue" type="submit" width="full">
            Add Transaction
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Transaction;