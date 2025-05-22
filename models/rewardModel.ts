export interface Reward{
    id: number;
    family_id: string;
    reward: string;
    point: string;
}

let rewards: Reward[] = [];

export const addReward = (reward: Reward) => {
    rewards.push(reward);
};

export const getRewards = () => rewards;