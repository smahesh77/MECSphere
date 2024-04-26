import { Avatar, Button, Flex, FormLabel, Input, InputGroup, InputRightAddon, Text } from '@chakra-ui/react';
import Topbar from '../Components/Profile/Topbar';
import { FaSearch } from 'react-icons/fa';
import Friendbox from '../Components/Profile/Friendbox';
import { useEffect, useState, useContext } from 'react';
import apiClient from "../services/api-client";
import io from "socket.io-client";
import AuthContext from "../contexts/AuthContext";

const socket = io.connect("https://mecsphere.onrender.com");
function Profile() {
  
  const [friends, setfriends] = useState([]);
  const [filteredFriends,setFilteredFriends] = useState([])
  const[chatter, setChatter] = useState({name: "", room: ""});
  const { User, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch users data from the API
    const fetchFriends = async () => {
      try {
        const response = await apiClient.post("/user/friends", {id: User.id});
        console.log(response.data);
        setfriends(response.data);
        setFilteredFriends(response.data);
        console.log(filteredFriends);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchFriends();
  }, []);
  
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = friends.filter(
      (friend) =>
        friend.name.toLowerCase().includes(searchTerm) // Update property name to 'name'
    );
    setFilteredFriends(filtered);
  };
    
  return (
    <Flex position="relative" direction={'column'} maxH="100vh" w={'80vw'}>
      <Topbar />
      <Flex m={5} justifyContent={'space-between'}>
        <Flex direction={'column'} w={'50%'} gap={5} mt={-14}>
          <Avatar size={'2xl'} mb={5} ml={25}></Avatar>
          <Flex justifyContent={'space-between'}>
            <Flex direction={'column'}>
              <FormLabel>First Name</FormLabel>
              <Input name="name" placeholder='Mary Ann' />
            </Flex>
            <Flex direction={'column'}>
              <FormLabel>Last Name</FormLabel>
              <Input name="name" placeholder='Jose' />
            </Flex>
          </Flex>
          <Flex direction={'column'}>
            <FormLabel>Email Address</FormLabel>
            <Input placeholder='maryannjose129@gmail.com' />
          </Flex>
          <Button colorScheme='teal' w={'25%'}>Save Changes</Button>
        </Flex>
        <Flex direction={'column'} p={5} w={'40%'} gap={3}>
          <Text fontSize={'20'} fontWeight={'semibold'}>Your Friends</Text>
          <InputGroup >
            <Input placeholder='Search friends'onChange={handleSearch} />
            <InputRightAddon ><FaSearch /></InputRightAddon>
          </InputGroup>
          <Flex direction={'column'} gap={3}  style={{ overflowY: 'auto', maxHeight: '49vh' }} >
            {
              (filteredFriends).map((friend)=>(
                <Friendbox key={friend.id} username={friend.name} email={friend.email} userId = {friend._id}/>
              ))
            }
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Profile;
