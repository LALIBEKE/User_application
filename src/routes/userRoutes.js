const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser } = require('../contrallers/userController')

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
module.exports = router;