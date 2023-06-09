/**
 * Local Imports
*/

import { User } from '@system/User';

/**
 * Relative Imports
*/

import { ChatCommand, CommandEventHandler } from './types';

/**
 * Types/Interfaces
*/

interface CommandEvent
{
    channel?: string;
    handler: CommandEventHandler;
}

/**
 * Locals
*/

let events: Array<CommandEvent> = [];
let commands: Record<string, CommandEvent> = {};

/**
 * Public Functions
*/

/**
 * @param {string} name
 * @param {CommandEventHandler} handler
 *
 * @return {void}
 */
export function CommandRegister(
    name: string,
    handler: CommandEventHandler,
    channel?: string): void
{
    commands[name] = { handler, channel };
}

/**
 * @param {CommandEventHandler} handler
 * @param {string?} channel
 *
 * @return {ChatMessage}
 */
export function CommandAddEventHandler(
    handler: CommandEventHandler,
    channel?: string): void
{
    events.push({ handler, channel });
}

/**
 * @param {string} name
 * @param {User} user
 * @param {string?} contents
 * @param {string?} channel
 *
 * @return {void}
 */
export function CommandDispatch(
    name: string,
    user: User,
    contents?: string,
    channel?: string): void
{
    const lower = (name || '').trim().toLowerCase();

    if (!lower || !(lower in commands)) {
        return;
    }

    const payload: ChatCommand = {
        user,
        name,
        contents,
    };

    for (const event of events) {
        if (event.channel === channel) {
            event.handler(payload);
        }
    }

    if (commands[lower].channel === channel) {
        commands[lower].handler(payload);
    }
}
