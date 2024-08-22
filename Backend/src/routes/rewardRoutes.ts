import express from 'express'

import {
    create,
    getReward,
    deleteReward,
    getP5ByUserId,
    getRewardByUserId
} from '../controller/rewardController'


let router = express.Router();

router.post('/', create);
router.get('/', getReward);
router.get('/:id/p5', getP5ByUserId);
router.get('/:id', getRewardByUserId);
router.delete('/:id', deleteReward);


export default router;
