import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Flex, Text, HStack } from "@chakra-ui/react";
import io from "socket.io-client";
import "./chat.css";
import AuthContext from "../contexts/AuthContext";

const socket = io.connect("http://localhost:3001");

function Chats() {
  const [requests, setRequests] = useState([]);
  const { User, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch users data from the API
    axios
      .post("http://localhost:4000/user/chatrequests", { id: User.id })
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const accept = async(requestId) => {
    
  };


  return (
    <Flex
      position="relative"
      h="100vh"
      w={"80vw"}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {requests.map((request) => (
        <HStack justify="space-evenly">
          <Text>{request.name}</Text>
          <Flex>
            <Button onClick={() =>accept(request.id)} colorScheme="blue" size="sm">
              accept
            </Button>
            
          </Flex>
        </HStack>
      ))}
    </Flex>
  );
}

export default Chats;