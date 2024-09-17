import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
export let currentUser = {
    name: '',
    email: '',
    phone: '',
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
                state.users = response.data; 
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
                state.users.push(response.data); 
            } catch (error) {
                console.error(error);
            }
        },
        updateUser: async (state, action) => {
            const updatedUserData = action.payload;

            try {
                currentUser=updatedUserData;
                const response = await axios.put(`http://localhost:8000/user/${updatedUserData.email}`, updatedUserData);
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
                state.users = response.data; 
            } catch (error) {
                console.error(error);
            }
        },
        signOut: async (state, action) => {
            currentUser = {
                name: '',
                email: '',
                phone: '',
                password: ''
            }
        },
    },
});

export const { getUserByEmail, addUser, updateUser, deleteUser, fetchUsers, signOut } = userSlice.actions;
export const selectUsers = (state) => state.users;
export default userSlice.reducer;










