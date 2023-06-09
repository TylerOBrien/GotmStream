/**
 * System Imports
*/

import { ChatCommand } from '@system/Chat';
import { TmiSend } from '@system/Tmi';

/**
 * Public Functions
*/

/**
 * The handler for the GOTM chat command.
 *
 * @param {ChatCommand} command The command instance.
 *
 * @return {void}
 */
export function GotmCommandExec(
    command: ChatCommand): void
{
    TmiSend('This is the GOTM message.');
}
