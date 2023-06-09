/**
 * Global Imports
*/

import { Client, ChatUserstate, Options } from 'tmi.js';

/**
 * Config
*/

import { AppConfig } from '@config/App';
import { TwitchConfig } from '@config/Twitch';

/**
 * System
*/

import { ChatDispatch, ChatMessageCreate } from '@system/Chat';
import { Endpoint } from '@system/Network';
import { UserCreate } from '@system/User';

/**
 * Locals
*/

let client: Client;

/**
 * Private Functions
*/

/**
 * @param {string} channel The channel the message was sent to.
 * @param {ChatUserstate} state The user state object.
 * @param {string} contents The message contents.
 * @param {boolean} self The flag that determines if the message is from this bot.
 *
 * @return {void}
 */
function _handleTmiChatMessage(
    channel: string,
    state: ChatUserstate,
    contents: string,
    self: boolean): void
{
    ChatDispatch(
        ChatMessageCreate(UserCreate(state), state, contents, self, channel)
    );
}

/**
 * Public Functions
*/

/**
 * Writes a message to Twitch chat.
 *
 * @param {string} contents
 * @param {string?} channel
 *
 * @return {void}
 */
export function TmiSend(
    contents: string,
    channel?: string): void
{
    client.say(channel || TwitchConfig.channel, contents);
}

/**
 * @param {string} username
 * @param {string} password
 * @param {string | Array<string>} channel
 *
 * @return {Promise<Endpoint>}
 */
export function TmiInit(
    username: string,
    password: string,
    channel: string | Array<string>): Promise<Endpoint>
{
    return new Promise((resolve, reject): void => {
        const options: Options = {
            options: { debug: AppConfig.debug },
            connection: { secure: true },
            identity: { username, password },
            channels: Array.isArray(channel) ? channel : [ channel ],
        };

        try {
            client = new Client(options);
        } catch (error) {
            return reject(error);
        }

        client.on('message', _handleTmiChatMessage);
        client.on('connected', (address: string, port: number): void => {
            resolve({ address, port });
        });

        client.connect();
    });
}
