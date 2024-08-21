import { Request, Response } from 'express';
import { compare, hash } from "bcryptjs";
import { RequestFailed } from '../response/RequestFailedResponse';
import { User } from '../entity/user';
import { InternalServerError } from '../response/InternalServerErrorResponse';
import { RewardHistory } from '../entity/rewardhistory';



export const Register = async (req: Request, res: Response) => {
    try {
        const {
            name
        } = req.body;

  

        if (!name || !name.trim().length) {
            return RequestFailed(res, 400, "Please Enter name");
        }
      


        const olduser = await User.findOne({
            where: { name: name }
        });

        if (olduser) {
            res.status(409).json({
                success: false,
                message: 'Your name is Already Registered with us',
                timestmap: new Date()
            });
        } else {
            const user = new User();
            user.name = name;
            await user.save();

            const reward = new RewardHistory();
            reward.points = 100
            reward.given_to = user
            await reward.save();

            return res.status(200).json(user);
        }

    } catch (error) {
        return InternalServerError(res, error);
    }
}

export const editUser = async (req: Request, res: Response) => {
    try {
        const {
            id,
            name
        } = req.body;

  

        if (!name || !name.trim().length) {
            return RequestFailed(res, 400, "Please Enter name");
        }
      
        const userExist = await User.findOne({
            where: { id: id }
        });

        if (!userExist) {
            res.status(404).json({
                success: false,
                message: 'Your userid is not Registered with us',
                timestmap: new Date()
            });
        } 
        // const user = new User();
        userExist.name = name;
        await userExist.save();



        return res.status(200).json(userExist);

    } catch (error) {
        return InternalServerError(res, error);
    }
}


export const getAllUsers = async (req: Request, res: Response) => {
    try {

        const user = await User.find();
        return res.status(200).json(user);

    } catch (error) {
        return InternalServerError(res, error);
    }

}