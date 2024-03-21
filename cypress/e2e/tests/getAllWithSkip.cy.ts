import {randomInt, randomNonNumericChar, searchWithLimit, searchWithSkip} from "../helper/methods";


describe('GET ALL PRODUCTS WITH SKIP', () => {
    let maxLength: number

    before(() => {
        searchWithLimit(0).its('body').then(res => {
            maxLength = res.products.length
        })
    })

    it('Verify that 0 returns all products', () => {
        searchWithSkip(0).then(res => {
            expect(res.status).equal(200)
            expect(res.body.total).equal(maxLength)
            expect(res.body.skip).equal(0)
        })
    })

    it('Verify that random number of products gets skipped', () => {
        const num: number = randomInt(1, maxLength - 1)

        searchWithSkip(num).then(res => {
            expect(res.status).equal(200)
            expect(res.body.skip).equal(num)
        })
    })

    it('Verify that any non numeric character returns an error', () => {
        const str: string = randomNonNumericChar()

        searchWithSkip(str).then(res => {
            expect(res.status).equal(400)
            expect(res.body.message).equal('Invalid skip limit')
        })
    })

    it('Verify that negative numeric character does not skip', () => {
        searchWithSkip(-maxLength).then(res => {
            expect(res.status).equal(200)
            expect(res.body.skip).equal(-maxLength)
            expect(res.body.products.length).equal(30)
        })
    })

    it('Verify that products array is empty if all products get skipped', () => {
        searchWithSkip(maxLength).then(res => {
            expect(res.status).equal(200)
            expect(res.body.skip).equal(maxLength)
            expect(res.body.products.length).equal(0)
        })
    })
})
