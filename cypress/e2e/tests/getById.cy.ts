import Ajv from 'ajv'
import {productSchema} from "../helper/schemas";
import {Product} from "../helper/interfaces";
import {productGetById, randomInt, searchWithLimit} from "../helper/methods";


describe('GET SINGLE PRODUCT BY ID', () => {
    let randomIndex: number
    let randomItem: Product & { [key: string]: any }
    let response: any

    const ajv = new Ajv({allErrors: true})
    const validate = ajv.compile(productSchema)

    before(() => {
        searchWithLimit(0).its('body.products').then(products => {
            randomIndex = randomInt(0, products.length - 1)
            randomItem = products[randomIndex]

            productGetById(randomIndex).then(res => {
                response = res
            })
        })
    })

    it('Verify that Status code is 200', () => {
        expect(response.status).equal(200)
    })

    it('Verify that product has correct object schema', () => {
        expect(validate(response.body)).to.be.true
    })

    it('Verify that product objects match', () => {
        for(let key in randomItem){
            expect(randomItem[key]).deep.equal(response.body[key])
        }
    })

    it('Verify that product id matches endpoint', () => {
        expect(response.body.id).equal(randomIndex + 1)
    })

    it('Verify that with negative id returns an error', () => {
        const index: number = randomInt(-100, -1)

        productGetById(index).then(res => {
            expect(res.status).equal(404)
            expect(res.statusText).equal('Not Found')
        })
    })

    it('Verify that with non existing id returns an error', () => {
        const index: number = randomInt(100, 200)

        productGetById(index).then(res => {
            expect(res.status).equal(404)
            expect(res.statusText).equal('Not Found')
        })
    })

    it('Verify that id with letters and symbols returns an error', () => {
        const index: string = String.fromCharCode(randomInt(58, 126))

        productGetById(index).then(res => {
            expect(res.status).equal(404)
            expect(res.statusText).equal('Not Found')
        })
    })
})
