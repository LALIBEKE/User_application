const express = require('express');
const router = express.Router();
const { getUsers, getUserByEmail, createUser, updateUser, deleteUser } = require('../contrallers/userController')

router.get('/', getUsers);
router.get('/:email', getUserByEmail);
router.post('/', createUser);
router.put('/:id', updateUser);
// router.put('/:email', updateUser);
router.delete('/:email', deleteUser);
module.exports = router;