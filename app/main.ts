/**
 * System Imports
*/

import { ChatAddEventHandler } from '@system/Chat';
import { Config, ConfigInit } from '@system/Config';
import { TmiInit } from '@system/Tmi';

/**
 * Relative Imports
*/

import { GotmHandleChat } from './Gotm';

/**
 * Functions
*/

/**
 * @return {Promise<void>}
 */
async function ApplicationStart(): Promise<void>
{
    await ConfigInit();
    await TmiInit(Config('username'), Config('oauth'), Config('channel'));

    ChatAddEventHandler(GotmHandleChat);
}

/**
 * Main
*/

ApplicationStart();
