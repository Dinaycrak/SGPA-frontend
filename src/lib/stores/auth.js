import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedUser = browser ? JSON.parse(localStorage.getItem('user') || 'null') : null;

export const currentUser = writable(storedUser);
export const isAuthenticated = writable(!!storedUser);

export function login(user) {
    currentUser.set(user);
    isAuthenticated.set(true);
    if (browser) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export function logout() {
    currentUser.set(null);
    isAuthenticated.set(false);
    if (browser) {
        localStorage.removeItem('user');
    }
}

export function getUser() {
    if (browser) {
        return JSON.parse(localStorage.getItem('user') || 'null');
    }
    return null;
}