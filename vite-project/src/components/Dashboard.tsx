import React, { useEffect, useState } from 'react';
import {Box,Text,Flex,Grid,GridItem,Heading,Circle,Icon,VStack,Link,List,ListItem,Button, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,} from '@chakra-ui/react';
import {FiHome,FiShoppingBag,FiDollarSign} from 'react-icons/fi';
import Deposit from './Deposite';
import Transaction from './Transaction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [page, setPage] = useState(1);
  const { isOpen: isDepositOpen, onOpen: onDepositOpen, onClose: onDepositClose } = useDisclosure();
  const { isOpen: isTransactionOpen, onOpen: onTransactionOpen, onClose: onTransactionClose } = useDisclosure();
  const navigate = useNavigate();
  
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


  const fetchBalance = async () => {
    try {
        const userId = getUserIdFromToken(); 
        console.log('User ID:', userId); 

        const response = await axios.get('http://localhost:3000/api/deposite/total-deposits', { params: { userId } });

        console.log('Response:', response);

        if (response.data && response.data.balance !== undefined) {
            const balance = response.data.balance;
            console.log('Balance:', balance); 
            setBalance(balance); 
        } else {
            console.error('Balance not found in response');
            setBalance(0); 
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance(0); 
    }
};
const fetchTransactions = async (additionalFetch = false) => {
  try {
      const userId = getUserIdFromToken();
      const response = await axios.get('http://localhost:3000/api/transaction/get-transactions', {
          params: { userId, page },
      });

      if (response.data && response.data.transactions) {
          const newTransactions = response.data.transactions;

          if (additionalFetch) {
             
              setTransactions((prev) => [...prev, ...newTransactions]);
          } else {
             
              setTransactions(newTransactions);
          }

       
          const newTotal = newTransactions.reduce(
              (sum: number, transaction: any) => sum + (parseFloat(transaction.amount) || 0),
              0
          );

          if (!additionalFetch) {
             
              setTotalTransactions(newTotal);
          } else {
              
              setTotalTransactions((prev) => prev + newTotal);
          }
      }
  } catch (error) {
      console.error('Error fetching transactions:', error);
  }
};

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    navigate('/Signup'); 
  };
 
  return (
    <Flex width="100vw">
     
      <Box
        bg="white"
        w={{ base: "60px", md: "250px" }}
        minH="100vh"
        p={4}
        boxShadow="sm"
        position="fixed"
      >
        <VStack spacing={8} align="stretch">
          
          <Flex align="center" justify="center" mb={8}>
            <Icon as={FiHome} boxSize={6} color="blue.500" />
          </Flex>

          <VStack spacing={6} align="stretch">
            
            <Link
              display="flex"
              alignItems="center"
              fontSize="sm"
              color="gray.600"
              _hover={{ color: "blue.500", textDecoration: "none" }}
            >
              <Icon as={FiHome} mr={4} boxSize={5} />
              <Text display={{ base: "none", md: "inline" }}>Dashboard</Text>
            </Link>

            <Button
              variant="unstyled"
              display="flex"
              alignItems="center"
              fontSize="sm"
              color="white"
              _hover={{ color: "white.200" }}
              onClick={onDepositOpen}
              w="full"
              background='blue.400'
            >
              
              <Text display={{ base: "none", md: "inline" }}>Deposite</Text>
            </Button>
            <Button
              variant="unstyled"
              display="flex"
              alignItems="center"
              fontSize="sm"
              color="white"
              _hover={{ color: "white.200" }}
              onClick={onTransactionOpen}
              w="full"
              background='blue.400'
            >
             
              <Text display={{ base: "none", md: "inline" }}>Transaction</Text>
            </Button>
          </VStack>
        </VStack>
      </Box>
      <Box
        ml={{ base: '60px', md: '250px' }}
        w="full"
        p={6}
        bg="gray.50"
        minH="100vh"
      >
        {/* Header */}
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading  bgGradient="linear(to-r, blue.500, green.500, red.500)"
             bgClip="text">
              Wellcome
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Here's the update from your payment channels.
            </Text>
          </Box>
          <Flex align="center" gap={4}>
            <Button
            background="red"
            onClick={handleLogout}
            >
              <Text
              color='white'
              >
              LogOut
              </Text>
             
            </Button>
          </Flex>
        </Flex>
        <Grid templateColumns="repeat(12, 1fr)" gap={9}>
          
          <GridItem colSpan={{ base: 12, md: 4 }}>
            <Box
              bg="blue.500"
              borderRadius="lg"
              p={4}
              color="white"
              position="relative"
              boxShadow="sm"
            >
              <Flex justify="space-between" align="center" mb={4}>
                <Circle size="40px" bg="blue.300">
                  <Icon as={FiDollarSign} color="white" boxSize={6} />
                </Circle>
              </Flex>
              <Text fontSize="sm" color="white" mb={2}>
                Balance
              </Text>
              <Text fontWeight="bold" fontSize="2xl" mb={4}>
                   ${(balance || 0).toLocaleString()}
              </Text>
              <Flex justify="space-between" align="flex-end" mt={4}>
            {Array.from({ length: 7 }).map((_, index) => (
             <Box
            key={index}
            bg="blue.300"
            borderRadius="full"
            width="8px"
            height={`${10 + index * 10}px`} 
              />
                ))}
            </Flex>

            </Box>
          </GridItem>

          
          <GridItem colSpan={{ base: 12, md: 4 }}>
            <Box
              bg="white"
              borderRadius="lg"
              p={6}
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
            >
              <Flex justify="space-between" align="center" mb={4}>
                
                <Circle size="40px" bg="pink.100">
                  <Icon as={FiShoppingBag} color="pink.500" boxSize={6} />
                </Circle>
              </Flex>
              
              <Text fontSize="sm" color="gray.500" mb={2}>
                Withdraw
              </Text >
              <Text fontWeight="bold" fontSize="2xl" mb={4}>
              ${totalTransactions.toLocaleString()}
              
              </Text>
              <Box
                h="50px"
                bgGradient="linear(to-b, pink.300, pink.100)"
                borderRadius="md"
                position="relative"
                overflow="hidden"
              >
                
                <svg
                  viewBox="0 0 100 40"
                  preserveAspectRatio="none"
                  style={{ width: '100%', height: '100%' }}
                >
                  <path
                    d="M0 25 Q25 10, 50 20 T100 30"
                    stroke="pink"
                    fill="transparent"
                    strokeWidth="2"
                  />
                </svg>
              </Box>
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 8 }}>
            <Box bg="white" borderRadius="lg" p={6} boxShadow="sm">
              <Text fontWeight="bold">Transactions</Text>
              <Text fontSize="sm" color="gray.500">
                Recent Activity
              </Text>
              <List spacing={3} mt={4}>
                {transactions.map((transaction: any) => (
                  <ListItem
                  key={transaction._id}
                  display="flex"
                  justifyContent="space-between"
                  bg="gray.50"
                  p={3}
                  borderRadius="md"
                  _hover={{ bg: 'gray.100' }}
                >
                  <Text fontSize="sm" color="gray.700">
                    {transaction.description}
                  </Text>
                  <Text fontSize="sm" color={String(transaction.amount).startsWith('+') ? 'green.500' : 'red.500'}>
                    {transaction.amount}
                  </Text>
                </ListItem>
                
                ))}
              </List>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Modal isOpen={isDepositOpen} onClose={onDepositClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Depostion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Deposit />
          </ModalBody>
          
        </ModalContent>
      </Modal>
      <Modal isOpen={isTransactionOpen} onClose={onTransactionClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Transaction />
          </ModalBody>
          
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Dashboard;