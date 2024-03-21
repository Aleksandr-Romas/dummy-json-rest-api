import {Product} from "./interfaces";

export const randomInt = (from: number, to: number) => Math.floor(Math.random() * (to - from + 1)) + from;
export const randomNonNumericChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+[{]};:\'",<.>/?`~';
    return chars.charAt(Math.floor(Math.random() * chars.length));
}
export const productGetAll = () => cy.request({url: '/', failOnStatusCode: false});
export const productGetById = (index: number | string) => cy.request({url: `/${typeof index === 'number' ?  index + 1 : index}`, failOnStatusCode: false});
export const productSearch = (text: string) => cy.request(`/search?q=${text}`)
export const searchWithLimit = (int: number | string) => cy.request({url: `?limit=${int}`, failOnStatusCode: false})
export const searchWithSkip = (int: number | string) => cy.request({url: `?skip=${int}`, failOnStatusCode: false})
export const searchWithSelect = (str: string | number) => cy.request({url: `?select=${str}`, failOnStatusCode: false})
export const getAllCategories = () => cy.request('/categories')
export const getProdByCategory = (str: string) => cy.request(`/category/${str}`)
export const productAdd = (body: Product) => cy.request({method: 'POST', url: '/add', body})
export const productUpdate = (id: number| string, body: Product) => cy.request({method: 'PUT', url: `/${id}`, body})
export const productDelete = (id: number | string) => cy.request({method: 'DELETE', url: `/${id}`, failOnStatusCode: false})
