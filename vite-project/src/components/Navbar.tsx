import React, { useState, useEffect } from "react";
import { Button, Flex, Image, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/SignUp");
  };

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      height="70px"
      px={{ base: "20px", md: "50px" }}
      width="100vw"
      justifyContent="space-between"
      align="center"
      bg={isScrolled ? "#001F3F" : "white"}
      color={isScrolled ? "white" : "#001F3F"}
      position="fixed"
      top="0"
      left="0"
      zIndex="999"
      boxShadow={
        isScrolled ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "0 4px 6px rgba(0, 0, 0, 0.15)"
      }
    >
      <Flex align="center">
        <Image src={Logo} width="110px" height="70px" alt="Logo" />
      </Flex>

      <IconButton
        display={{ base: "block", md: "none" }}
        icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label="Toggle Menu"
        onClick={toggleMenu}
        bg="transparent"
        color={isScrolled ? "white" : "#001F3F"}
      />

      <Flex
        direction={{ base: "column", md: "row" }}
        display={{ base: isMenuOpen ? "flex" : "none", md: "flex" }}
        align={{ base: "center", md: "flex-end" }}
        position={{ base: "absolute", md: "static" }}
        top="70px"
        right="20px"
        bg={{ base: isScrolled ? "#001F3F" : "white", md: "transparent" }}
        width={{ base: "90%", md: "auto" }}
        p={{ base: "20px", md: "0" }}
        boxShadow={{ base: "0 4px 6px rgba(0, 0, 0, 0.1)", md: "none" }}
        zIndex="998"
        borderRadius={{ base: "8px", md: "none" }}
      >
        <Button
          border="1px solid"
          borderColor={isScrolled ? "white" : "teal"}
          bg="transparent"
          color={isScrolled ? "white" : "#001F3F"}
          onClick={handleSignUpClick}
        >
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;