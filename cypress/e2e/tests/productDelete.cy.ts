import {productDelete, randomInt, randomNonNumericChar, searchWithLimit} from "../helper/methods";


describe('PRODUCT DELETE', () => {
    let total: number
    let response: any
    let timeDeletedOn: string

    before(() => {
        searchWithLimit(0).then(searchRes => {
            total = searchRes.body.total - 1

            const randomId = randomInt(0, total)

            productDelete(randomId).then(res => {
                response = res

                const now = new Date();
                timeDeletedOn = now.toISOString().substring(0, 16);
            })

        })
    })

    it('Verify that with existing id status code is 200', () => {
        expect(response.status).equal(200)
    })

    it('Verify that with existing id isDeleted key has value true', () => {
        expect(response.body.isDeleted).to.be.true
    })

    it('Verify that time stamp is correct', () => {
        expect(response.body.deletedOn).to.include(timeDeletedOn)
    })

    it('Verify that negative id returns an error', () => {
        const negativeId = randomInt(-100, -1)

        productDelete(negativeId).then(res => {
            expect(res.status).equal(404)
            expect(res.statusText).equal('Not Found')
            expect(res.body.message).equal(`Product with id '${negativeId}' not found`)
        })
    })

    it('Verify that any non numeric character passed as id returns an error', () => {
        const str: string = randomNonNumericChar()

        productDelete(str).then(res => {
            expect(res.status).equal(404)
            expect(res.statusText).equal('Not Found')
            expect(res.body.message).equal(`Product with id '${str}' not found`)
        })
    })

    it('Verify that deleted product does not exist in DB', () => {
        //todo: we would need to check this if it wasn't a test api
    })
})
