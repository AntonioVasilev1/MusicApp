import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllAlbums() {
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name')
}

export async function getAlbumById(id) {
    return api.get('/data/albums/' + id)
}

export async function deleteAlbum(id) {
    return api.del('/data/albums/' + id)
}

export async function createAlbum(album) {
    return api.post('/data/albums', album)
}

export async function editAlbumById(id, data) {
    return api.put('/data/albums/' + id, data)
}

export async function getAlbumsByName(text) {
    return api.get(`/data/albums?where=name%20LIKE%20%22${text}%22`)
}