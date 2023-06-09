/**
 * Relative Imports
*/

import { User } from '@system/User';

/**
 * Types/Interfaces
*/

export type ChatEventHandler = (object: ChatMessage) => void;

export interface ChatCommand
{
    user: User;
    name: string;
    args: Array<string>;
    contents: string;
    sentAt: Date;
}

export interface ChatMessage
{
    user: User;
    channel: string;
    contents: string;
    emotes: { [emoteid: string]: string[] } | undefined;
    sentAt: Date;
    isBot: boolean;
    isFirst: boolean;
}
