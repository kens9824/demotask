import express from 'express'

import {
    create,
    getReward,
    deleteReward
} from '../controller/rewardController'


let router = express.Router();

router.post('/', create);
router.get('/', getReward);
router.delete('/', deleteReward);


export default router;
