import Abbsinya from '../assets/Abessinya.png';
import Nib from '../assets/Nib.png';
import WorldB from '../assets/WorldB.png';
import Commercial from '../assets/Commercial.png';
import Dashen from '../assets/Dashen.png';
import Google from '../assets/Google.png';
import { Box, Text, HStack, Image } from '@chakra-ui/react';

const PartnersSection: React.FC = () => {
  return (
    <Box textAlign="center" py={10}  mb="100px">
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        Our partners growing with BM.
      </Text>
      <Box
        display="flex"
        overflow="hidden"
        position="relative"
        width="100%"
      >
        <HStack
          className="scrolling-container"
          spacing={8}
          alignItems="center"
        >
          <Image src={Google} alt="Google" w="110px" />
          <Image src={Abbsinya} alt="Abbsinya" w="110px" />
          <Image src={Nib} alt="Nib" w="110px" />
          <Image src={WorldB} alt="WorldB" w="110px" />
          <Image src={Commercial} alt="Commercial" w="110px" />
          <Image src={Dashen} alt="Dashen" w="110px" />
        </HStack>
      </Box>

      <style>
        {`
          .scrolling-container {
            display: flex;
            animation: scroll 20s linear infinite;
          }

          @keyframes scroll {
            0% {
              transform: translateX(100%); /* Start from the right edge */
            }
            100% {
              transform: translateX(-100%); /* End at the left edge */
            }
          }
        `}
      </style>
    </Box>
  );
};

export default PartnersSection;
