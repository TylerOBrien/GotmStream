/**
 * Types/Interfaces
*/

export enum UserStatus
{
    Follower    = 0b00001,
    Subscriber  = 0b00010,
    VIP         = 0b00100,
    Moderator   = 0b01000,
    Broadcaster = 0b10000,
}

export interface User
{
    id: string;
    name: string;
    login: string;
    status: UserStatus;
    color?: string;
}
