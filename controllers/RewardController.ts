import { Request, Response } from 'express';

let rewards: any[] = [];
let rewardId = 1;

export const createReward = (req: Request, res: Response) => {
    const {reward, point} = req.body;

    if (!reward || !point) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newReward = {
      reward,
      point,
    };

    rewards.push(newReward);
    return res.status(201).json({ message: "Reward created successfully", reward: newReward });
} 

export const updateReward = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { reward, point } = req.body();

        const rewardIndex = rewards.findIndex((r) => r.leaderboard === id);
        if (rewardIndex === -1) {
        return res.status(404).json({ message: "Reward not found" });
        }

        const updatedReward = { ...rewards[rewardIndex], reward, point };
        rewards[rewardIndex] = updatedReward;

        res.status(200).json({ message: "Reward updated successfully", reward: updatedReward });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        res.status(500).json({ message: "Error updating reward", error: errorMessage });
    }
};

    export const deleteReward = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const rewardIndex = rewards.findIndex((r) => r.leaderboard === id);

            if (rewardIndex === -1) {
            return res.status(404).json({ message: "Reward not found" });
            }

            rewards.splice(rewardIndex, 1);
            res.status(200).json({ message: "Reward deleted successfully" });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);      
            res.status(500).json({ message: "Error deleting reward", error: errorMessage });
        }
    };

    
    export const getAllRewards = (_req: Request, res: Response) => {
    res.status(200).json({ rewards });
    };
