import { Box, Flex, Text, Tooltip, Link as ChakraLink } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface SocialMediaLink {
  href: string;
  icon: JSX.Element;
  label: string;
}

const Footer: React.FC = () => {
  const SOCIAL_MEDIA_LINKS: SocialMediaLink[] = [
    {
      href: "https://facebook.com/",
      icon: <FaFacebook fontSize={25} color="white" />,
      label: "Facebook",
    },
    {
      href: "https://instagram.com/",
      icon: <FaInstagram fontSize={25} color="#E1306C" />,
      label: "Instagram",
    },
    {
      href: "https://x.com/",
      icon: <FaXTwitter fontSize={25} color="#1DA1F2" />,
      label: "Twitter",
    },
    {
      href: "https://github.com/",
      icon: <FaGithub fontSize={25} color="#171515" />,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/",
      icon: <FaLinkedin fontSize={25} color="white" />,
      label: "LinkedIn",
    },
  ];

  return (
    <Box bgGradient="linear(to-r, #001F3F, #004080)" color="white" py={6} width="100vw">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="flex-start"
        px={{ base: 6, md: 8 }}
        gap={{ base: 6, md: 0 }}
        width="100%" 
      >
        
        <Flex direction="column" align="flex-start" gap={4} width="100%">
          <ChakraLink
            href="/about"
            fontSize={{ base: 'sm', md: 'md' }}
            _hover={{ textDecoration: "underline", color: "#FFD700" }}
            width="100%"
            textAlign="center" 
            
          >
            About Us
          </ChakraLink>
          
        </Flex>

       
        <Flex
          direction={{ base: 'row', md: 'row' }}
          gap={{ base: 4, md: 6 }}
          justify="center"
          align="center"
          flexWrap="wrap"
          width="100%" 
          justifyContent="center" 
        >
          {SOCIAL_MEDIA_LINKS.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
            >
              <Tooltip label={link.label}  aria-label={`${link.label} tooltip`}
              >
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.2,
                    filter: "brightness(1.5)",
                  }}
                  style={{ display: "inline-block" }}
                >
                  {link.icon}
                </motion.a>
              </Tooltip>
            </motion.div>
          ))}
        </Flex>
      </Flex>

      
      <Box height="1px" bg="gray.300" width="80%" mx="auto" my={4} />

     
      <Text fontSize={{ base: 'sm', md: 'md' }} textAlign="center">
        &copy; {new Date().getFullYear()} BM. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;