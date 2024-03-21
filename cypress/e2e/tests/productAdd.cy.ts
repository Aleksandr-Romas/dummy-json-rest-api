import {productAdd} from "../helper/methods";
import {randomBody} from "../helper/testData";


describe('ADD PRODUCT', () => {
    let response: any

    const testBody = randomBody

    before(() => {
        productAdd(testBody).then(res => {
            response = res
        })
    })

    it('Verify that status code is 200', () => {
        expect(response.status).equal(200)
    })

    it('Verify that all added properties are exist in the response', () => {
        for(let key in response.body){
            if(key === 'id') expect(response.body[key]).equal(101)
            else expect(response.body[key]).deep.equal(testBody[key])
        }
    })

    it('Verify that empty body returns response with only id', () => {
        productAdd({}).then(res => {
            const keyOfProducts = Object.keys(res.body)

            expect(keyOfProducts).have.length(1)
            expect(keyOfProducts[0]).equal('id')
        })
    })

    it('Verify that added product exists in DB', () => {
        //todo: we would need to check this if it wasn't a test api
    })
})
