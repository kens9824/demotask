import express from 'express'

import {
    getAllUsers,
    editUser,
    Register
} from '../controller/userController'


let router = express.Router();

router.post('/', Register);
router.patch('/', editUser);

router.get('/', getAllUsers);


export default router;
