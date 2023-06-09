/**
 * Global Imports
*/

import { ChatUserstate } from 'tmi.js';

/**
 * Local Imports
*/

import { User } from '@system/User';

/**
 * Relative Imports
*/

import { ChatMessage, ChatEventHandler } from './types';

/**
 * Locals
*/

const events: Array<ChatEventHandler> = [];

/**
 * Public Functions
*/

/**
 * Creates a new chat message object instance.
 *
 * @param {User} user The user who sent the chat message.
 * @param {ChatUserstate} state The Twitch TMI state.
 * @param {string} contents The message contents.
 * @param {boolean} isBot Whether the message was sent by this bot.
 * @param {string} channel The channel the message was sent to.
 *
 * @return {ChatMessage}
 */
export function ChatMessageCreate(
    user: User,
    state: ChatUserstate,
    contents: string,
    isBot: boolean,
    channel?: string): ChatMessage
{
    return {
        user,
        contents,
        channel,
        isBot,
        emotes: state.emotes || {},
        sentAt: new Date(parseInt(state['tmi-sent-ts'])),
        isFirst: !!state['first-msg'],
    };
}

/**
 * @param {ChatEventHandler} handler
 *
 * @return {ChatMessage}
 */
export function ChatAddEventHandler(
    handler: ChatEventHandler): void
{
    events.push(handler);
}

/**
 * Passes the given message to all available event handlers.
 *
 * @param {ChatMessage} message The message to dispatch.
 *
 * @return {void}
 */
export function ChatDispatch(
    message: ChatMessage): void
{
    for (const event of events) {
        event(message);
    }
}
