import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
export let currentUser = {
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
        getUserByEmail: async (state, action) => {
            const userEmail = action.payload;
            try {
                const response = await axios.get(`http://localhost:8000/user/${userEmail}`);
                currentUser = response.data;
                state.users = response.data; // Update the state with the fetched users data
            } catch (error) {
                console.error(error);
            }
        },
        addUser: async (state, action) => {
            const userData = action.payload;
            const userInstance = {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                password: userData.password
            };
            try {
                currentUser = userInstance
                const response = await axios.post('http://localhost:8000/user', userInstance);
                state.users.push(response.data); // Update the state with the response data
            } catch (error) {
                console.error(error);
            }
        },
        updateUser: async (state, action) => {
            const updatedUserData = action.payload;
            try {
                currentUser=updatedUserData;
                const response = await axios.put(`http://localhost:8000/user/${updatedUserData.userEmail}`, updatedUserData);
                // Update the user data in the state based on the response
            } catch (error) {
                console.error(error);
            }
        },
        deleteUser: async (state, action) => {
            const userEmail = action.payload;
            try {
                await axios.delete(`http://localhost:8000/user/${userEmail}`);
                signOut();
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
        signOut: async (state, action) => {
            currentUser = {
                name: 'Guest',
                email: 'example@gmail.com',
                phone: '0555555555',
                password: ''
            }
        },
    },
});

export const { getUserByEmail, addUser, updateUser, deleteUser, fetchUsers, signOut } = userSlice.actions;
export const selectUsers = (state) => state.users;
export default userSlice.reducer;