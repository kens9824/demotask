import express from 'express'

import {
    getAllUsers,
    editUser,
    Register,
    getUserById,getAllUserWithoutSelf
} from '../controller/userController'


let router = express.Router();

router.post('/', Register);
router.patch('/', editUser);

router.get('/', getAllUsers);
router.get('/self/:id', getAllUserWithoutSelf);
router.get('/:id', getUserById);


export default router;
