/**
 * Global Imports
*/

import { ChatUserstate } from 'tmi.js';

/**
 * Relative Imports
*/

import { User, UserStatus } from './types';
import { isUser } from './guards';

/**
 * Private Functions
*/

/**
 * @param {User | ChatUserstate} user
 * @param {UserStatus} status
 *
 * @return {boolean}
 */
function _hasStatus(
    user: User | ChatUserstate,
    status: UserStatus): boolean
{
    return !!((isUser(user) ? user.status : UserStatusCreate(user)) & status);
}

/**
 * Public Functions
*/

/**
 * @param {ChatUserstate} state
 *
 * @return {User}
 */
export function UserCreate(
    state: ChatUserstate): User
{
    return {
        id: state['user-id'],
        name: state['display-name'],
        login: state.username,
        color: state.color,
        status: UserStatusCreate(state),
    };
}

/**
 * @param {ChatUserstate} state
 *
 * @return {UserStatus}
 */
export function UserStatusCreate(
    state: ChatUserstate): UserStatus
{
    return (
        (state.subscriber ? UserStatus.Subscriber : 0) |
        (state.mod ? UserStatus.Moderator : 0) |
        (state.badges && 'broadcaster' in state.badges ? UserStatus.Broadcaster : 0)
    );
}

/**
 * @param {ChatUserstate} user
 *
 * @return {User}
 */
export function UserIsBroadcaster(
    user: User | ChatUserstate): boolean
{
    return _hasStatus(user, UserStatus.Broadcaster);
}

/**
 * @param {ChatUserstate} user
 *
 * @return {User}
 */
export function UserIsModerator(
    user: User | ChatUserstate): boolean
{
    return _hasStatus(user, UserStatus.Moderator);
}

/**
 * @param {ChatUserstate} user
 *
 * @return {User}
 */
export function UserIsSubscriber(
    user: User | ChatUserstate): boolean
{
    return _hasStatus(user, UserStatus.Subscriber);
}
