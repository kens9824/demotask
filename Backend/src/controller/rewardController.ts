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
            'user.id AS id',
            'user.name AS name',
            // p5: points given initially (where givenById IS NULL) minus points transferred out (where givenById = user.id)
            'SUM(CASE WHEN reward.givenById IS NULL THEN reward.points ELSE 0 END) AS totalPointsGiven',
            'SUM(CASE WHEN reward.givenById = user.id THEN reward.points ELSE 0 END) AS pointsTransferredOut',
            // reward: points received from other users
            'SUM(CASE WHEN reward.givenToId = user.id AND reward.givenById IS NOT NULL THEN reward.points ELSE 0 END) AS reward'
        ])
        .leftJoin(User, 'user', 'reward.givenToId = user.id OR reward.givenById = user.id')
        .groupBy('user.id')
        .getRawMany();


        const formattedRewards = rewards.map((reward) => ({
            id: reward.id,
            name: reward.name,
            p5: reward.totalPointsGiven - reward.pointsTransferredOut,
            reward: reward.reward
        }));


        // const rewards = await RewardHistory.find();
        return res.status(200).json(formattedRewards);

    } catch (error) {
        return InternalServerError(res, error);
    }
}


export const deleteReward = async (req: Request, res: Response) => {
    try {

    const { id } = req.params;
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

export const getP5ByUserId = async (req: Request, res: Response) => {
    try {

    const { id } = req.params;
    const rewardRepository = getRepository(RewardHistory);
    
    const transactionHistory = await rewardRepository.createQueryBuilder('reward')

        .select([
            'reward.id as id',
            'reward.points as points',
            'reward.datetime as datetime',
            'giver.name AS sender',
            'receiver.name AS receiver'
        ])
        .leftJoin(User, 'giver', 'reward.givenById = giver.id')
        .leftJoin(User, 'receiver', 'reward.givenToId = receiver.id')
        .where('reward.givenById = :userId OR (reward.givenById IS NULL AND reward.givenToId = :userId)', { userId:id })
        .orderBy('reward.datetime', 'ASC')  // Order by datetime to get the transaction history in sequence
        .getRawMany();
    return res.status(200).json(transactionHistory);


    } catch (error) {
        return InternalServerError(res, error);
    }
}

export const getRewardByUserId = async (req: Request, res: Response) => {
    try {

    const { id } = req.params;
    const rewardRepository = getRepository(RewardHistory);
    
    const transactionHistory = await rewardRepository.createQueryBuilder('reward')

        .select([
            'reward.id as id',
            'reward.points as points',
            'reward.datetime as datetime',
            'giver.name AS sender',
            'receiver.name AS receiver'
        ])
        .leftJoin(User, 'giver', 'reward.givenById = giver.id')
        .leftJoin(User, 'receiver', 'reward.givenToId = receiver.id')
        .where('reward.givenToId = :userId AND (reward.givenById IS Not NULL)', { userId:id })
        .orderBy('reward.datetime', 'ASC')  // Order by datetime to get the transaction history in sequence
        .getRawMany();
    return res.status(200).json(transactionHistory);


    } catch (error) {
        return InternalServerError(res, error);
    }
}