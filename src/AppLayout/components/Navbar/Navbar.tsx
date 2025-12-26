import { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Drawer, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import UserIcon from "./components/UserIcon";
import CartIcon from "./components/CartIcon";
import Like from "./components/Like";
import Basket from "./components/Basket";
import MessagesIcon from "./components/MessagesIcon";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide Navbar on scroll down — Show on scroll up
  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar with animation */}
      <motion.div
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 999 }}
      >
        <AppBar
          elevation={1}
          sx={{
            background: "white",
            color: "black",
            borderBottom: "1px solid #eee",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left side: Logo */}
            <Box className="flex items-center gap-3">
              <Box className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg rotate-45"></div>
                <div className="absolute inset-1.5 bg-white rounded-lg rotate-45 flex items-center justify-center">
                  <div className="w-5 h-5 text-blue-500 font-bold text-xs">om</div>
                </div>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  display: { xs: "none", sm: "block" },
                  background: "linear-gradient(to right, #2563eb, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontWeight: "bold",
                }}
              >
                openmarket
              </Typography>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
              <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
              <NavLink to="/Contact" className="hover:text-blue-600">Contact</NavLink>
              <NavLink to="/About" className="hover:text-blue-600">About</NavLink>
              {/* <NavLink to="/SignUp" className="hover:text-blue-600">Sign Up</NavLink> */}
            </Box>

            {/* Icons */}
            <Box className="flex  flex-row-reverse  gap-6 items-center">
              <UserIcon />
              <CartIcon />
              <Like />
              {/* <Basket /> */}
              <MessagesIcon />

              {/* Mobile Menu Button */}
              <IconButton
                onClick={() => setIsOpen(true)}
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </motion.div>

      {/* Drawer (Mobile Menu) */}
      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={{ width: 260, p: 3, position: "relative" }}>
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
            <NavLink to="/" className="text-lg" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/Contact" className="text-lg" onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
            <NavLink to="/About" className="text-lg" onClick={() => setIsOpen(false)}>
              About
            </NavLink>
           
          </Box>
        </Box>
      </Drawer>

      {/* Spacer */}
      <div style={{ height: "70px" }}></div>
    </>
  );
}
