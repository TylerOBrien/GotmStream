/**
 * Local Imports
*/

import { Config } from '@system/Config';

/**
 * Config
*/

export const TwitchConfig = {
    get id()       { return Config('twitchid'); },
    get channel()  { return Config('channel'); },
    get username() { return Config('username'); },
    get oauth()    { return Config('oauth'); },
    get bearer()   { return Config('bearer'); },
    get client()   { return Config('client'); },
};
