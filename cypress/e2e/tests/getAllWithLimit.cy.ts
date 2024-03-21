import {randomInt, randomNonNumericChar, searchWithLimit} from "../helper/methods";


describe('GET ALL PRODUCTS WITH LIMIT', () => {
    let maxLength: number
    let response: any

    before(() => {
        searchWithLimit(0).its('body').then(res => {
            maxLength = res.products.length - 1
            response = res
        })
    })

    it('Verify that 0 returns all products', () => {
        expect(response.total).equal(response.limit)
        expect(response.total).equal(response.products.length)
    })

    it('Verify that random number of products matches with products in response', () => {
        const num: number = randomInt(1, maxLength)

        searchWithLimit(num).then(res => {
            expect(res.status).equal(200)
            expect(res.body.limit).equal(num)
            expect(res.body.products.length).equal(num)
        })
    })

    it('Verify that any non numeric character returns an error', () => {
        const str: string = randomNonNumericChar()

        searchWithLimit(str).then(res => {
            expect(res.status).equal(400)
            expect(res.body.message).equal('Invalid limit')
        })
    })

    it('Verify that negative numeric character returns correct result', () => {
        const num: number = randomInt(1, maxLength)
        const expectedResult = maxLength + 1 - num

        searchWithLimit(-num).then(res => {
            expect(res.status).equal(200)
            expect(res.body.limit).equal(expectedResult)
            expect(res.body.products.length).equal(expectedResult)
        })
    })
})
