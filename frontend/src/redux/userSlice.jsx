import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
export let currentUser={
    id: '66e8413a4a6f90bbcb6b65ce',
    name: 'Guest',
    email: 'example@gmail.com',
    phone: '0555555555',
    password: ''  
}
const initialUserState = {
    users: [],
};

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        addUser: async (state, action) => {
            const userData = action.payload;
            const userInstance = {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                password: userData.password
            };
            try {
                const response = await axios.post('http://localhost:8000/user', userInstance);
                state.users.push(response.data); // Update the state with the response data
                currentUser=response.data
                console.log(state.users);
                console.log(currentUser);


            } catch (error) {
                console.error(error);
            }
        },
        updateUser: async (state, action) => {
            const updatedUserData = action.payload;
            try {
                const response = await axios.put(`http://localhost:8000/user/${updatedUserData.userId}`, updatedUserData);
                // Update the user data in the state based on the response
            } catch (error) {
                console.error(error);
            }
        },
        deleteUser: async (state, action) => {
            const userId = action.payload;
            try {
                await axios.delete(`http://localhost:8000/user/${userId}`);
                // Remove the user from the state based on the response
            } catch (error) {
                console.error(error);
            }
        },
        fetchUsers: async (state, action) => {
            try {
                const response = await axios.get('http://localhost:8000/user');
                state.users = response.data; // Update the state with the fetched users data
            } catch (error) {
                console.error(error);
            }
        },
    },
});

export const { addUser, updateUser, deleteUser, fetchUsers } = userSlice.actions;
export const selectUsers = (state) => state.users;
export default userSlice.reducer;