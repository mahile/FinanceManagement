import { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Deposit: React.FC = () => {
  const [depositAmount, setDepositAmount] = useState<string>('');
  const toast = useToast();
  const getToken = (): string | null => localStorage.getItem('authToken');
  
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

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    const userId = getUserIdFromToken();
    if (!depositAmount || isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid Deposit Amount',
        description: 'Please enter a valid amount.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:3000/api/deposite/${userId}/add-deposit`, { amount });
     console.log('userid :',amount)
      if (response.status === 201) {
        toast({
          title: 'Deposit Successful',
          description: `You have deposited $${amount}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
  
        setDepositAmount('');
      }
    } catch (error: any) {
      console.error('Error while making deposit:', error.response || error.message || error);
      toast({
        title: 'Deposit Failed',
        description: 'There was an error processing your deposit. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} maxWidth="400px" mx="auto" borderWidth={1} borderRadius="md">
      <FormControl isRequired>
        <FormLabel>Deposit Amount</FormLabel>
        <Input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          placeholder="Enter amount to deposit"
        />
      </FormControl>
      <Button mt={4} colorScheme="blue" onClick={handleDeposit}>
        Deposit
      </Button>
    </Box>
  );
};

export default Deposit;
