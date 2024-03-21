import Ajv from 'ajv'
import {productSchema} from "../helper/schemas";
import {productGetAll, randomInt} from "../helper/methods";


describe('GET ALL PRODUCTS', () => {
    let response: any

    const ajv = new Ajv({allErrors: true})
    const validate = ajv.compile(productSchema)

    before(() => {
        productGetAll().then(res => {
            response = res
        })
    })

    it('Verify that Status code is 200', () => {
        expect(response.status).equal(200)
    })

    it('Verify that 30 items load on the page', () => {
        expect(response.body.products.length).equal(30)
    })

    it('Verify that random picked product has correct object schema', () => {
        cy.request('?limit=0').its('body.products').then(products => {
            const randomIndex = randomInt(0, products.length)
            expect(validate(products[randomIndex])).to.be.true
        })
    })
})
