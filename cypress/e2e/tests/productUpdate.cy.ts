import {productUpdate, randomInt, searchWithLimit} from "../helper/methods";
import {randomBody} from "../helper/testData";


describe('PRODUCT UPDATE', () => {
    let response: any
    let randomIndex: number

    const getRandomObject = (obj: any) => {
        const arrOfKeys: string[] = Object.keys(obj)
        const result: any = {}

        for(let i = 0; i < arrOfKeys.length; i++){
            const index = randomInt(0, arrOfKeys.length - 1)

            if(!result.hasOwnProperty(arrOfKeys[index])) result[arrOfKeys[index]] = obj[arrOfKeys[index]]
        }

        return result
    }

    const testObject = getRandomObject(randomBody)

    before(() => {
        searchWithLimit(0).its('body.products').then(products => {
            randomIndex = randomInt(0, products.length - 1)
        })

        cy.then(() => {
            productUpdate(randomIndex, testObject).then(res => {
                response = res
            })
        })
    })

    it('Verify that with correct body status code is 200', () => {
        expect(response.status).equal(200)
    })

    it('Verify that passed properties were updated', () => {
        for(let key in testObject){
            expect(response.body[key]).deep.equal(testObject[key])
        }
    })
})
