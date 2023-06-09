/**
 * Global Imports
*/

import { User } from '@system/User';

/**
 * Types/Interfaces
*/

export interface ChatCommand
{
    user: User;
    name: string;
    contents: string;
}

export type CommandEventHandler = (command: ChatCommand) => void;
