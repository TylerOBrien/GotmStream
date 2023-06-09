/**
 * Relative Imports
*/

import { ConfigKey } from './types';

/**
 * Locals
*/

const config: Record<string, string> = {};

/**
 * Public Functions
*/

/**
 * @return {Promise<void>}
 */
export function ConfigInit(): Promise<void>
{
    return new Promise((resolve) => {
        const keys: Array<ConfigKey> = ['channel', 'oauth', 'username'];
        const wait = (): void => {
            for (const key of keys) {
                if (!Config(key)) {
                    setTimeout(wait, 100);
                    return;
                }
            }

            resolve();
        };

        wait();
    });
}

/**
 * Retrieves the config value stored in the specified CSS psuedo-element.
 *
 * @param {ConfigKey} key
 *
 * @return {string}
 */
export function Config(
    key: ConfigKey): string
{
    if (key in config) {
        return config[key];
    }

    const element = document.getElementById(key);

    if (!element) {
        return null;
    }

    const content = window.getComputedStyle(element, '::before').content;

    switch (content) {
    case 'none':
        return null;
    default:
        config[key] = content.slice(1, -1);  // Remove quotation marks added by CSS.
    }

    return config[key];
}
