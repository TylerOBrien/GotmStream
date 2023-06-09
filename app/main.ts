/**
 * System Imports
*/

import { CommandRegister } from '@system/Command';
import { Config, ConfigInit } from '@system/Config';
import { TmiInit } from '@system/Tmi';

/**
 * Relative Imports
*/

import { GotmCommandExec } from './Gotm';

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

    CommandRegister('gotm', GotmCommandExec);
}

/**
 * Main
*/

ApplicationStart();
