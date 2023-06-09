/**
 * Config
*/

import { GotmConfig } from '@config/Gotm';

/**
 * System Imports
*/

import { ChatMessage } from '@system/Chat';
import { TmiSend } from '@system/Tmi';

/**
 * Private Functions
*/

/**
 * Public Functions
*/

/**
 * The handler for the GOTM chat message.
 *
 * @param {ChatCommand} message The message instance.
 *
 * @return {Promise<void>}
 */
export async function GotmHandleChat(
    message: ChatMessage): Promise<void>
{
    if (message.contents[0] !== '!') {
        return;
    }

    const command = message.contents.slice(1);
    const response = await fetch(`https://${ GotmConfig.host }/commands/${ command }`);

    if (response.status === 404) {
        return;
    }

    TmiSend(await response.text());
}
