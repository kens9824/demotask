import { Request, Response } from 'express';
import { compare, hash } from "bcryptjs";
import { RequestFailed } from '../response/RequestFailedResponse';
import { User } from '../entity/user';
import { getConnection, getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { InternalServerError } from '../response/InternalServerErrorResponse';
import { RewardHistory } from '../entity/rewardhistory';



export const create = async (req: Request, res: Response) => {
    try {
        const {
        points,givenby,givento
        } = req.body;

        if (!points || points <= 0) {
            return RequestFailed(res, 400, "Please Enter points");
        }
        if (!givenby) {
            return RequestFailed(res, 400, "Please Enter givenby");
        }        
        if (!givento) {
            return RequestFailed(res, 400, "Please Enter givento");
        }

        const giventouser = await User.findOne({
            where: { id: givento }
        });
        const givenbyuser = await User.findOne({
            where: { id: givenby }
        });

        if(!giventouser || !givenbyuser){
            return RequestFailed(res, 404, "givento or givenby not found");
        }

        const reward = new RewardHistory();
        reward.points = points
        reward.given_by = givenby
        reward.given_to = givento
        await reward.save();

        return res.status(200).json(reward);

    } catch (error) {
        return InternalServerError(res, error);
    }
}

export const getReward = async (req: Request, res: Response) => {
    try {
        const rewardRepository = getRepository(RewardHistory);
        
        const rewards = await rewardRepository.createQueryBuilder('reward')
        .select([
            'user.name AS userName',
            'SUM(CASE WHEN reward.givenById IS NULL THEN reward.points ELSE 0 END) - SUM(CASE WHEN reward.givenById IS NOT NULL THEN reward.points ELSE 0 END) AS p5',
            'SUM(CASE WHEN reward.givenToId = user.id AND reward.givenById IS NOT NULL THEN reward.points ELSE 0 END) AS reward' // Rewards received from other users
        ])
        .leftJoin(User, 'user', 'reward.givenToId = user.id')
        .groupBy('user.name')
        .getRawMany();


        // const rewards = await RewardHistory.find();
        return res.status(200).json(rewards);

    } catch (error) {
        return InternalServerError(res, error);
    }
}


export const deleteReward = async (req: Request, res: Response) => {
    try {

    const { id } = req.body;
    const repository = getRepository(RewardHistory);
    const recordToDelete = await repository.findOne(id);
    if (recordToDelete) {
        await repository.remove(recordToDelete);
    }
        return res.status(200).json({message: "Reward record deleted"});

    } catch (error) {
        return InternalServerError(res, error);
    }
}