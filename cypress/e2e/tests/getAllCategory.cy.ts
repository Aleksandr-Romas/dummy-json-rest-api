import {getAllCategories} from "../helper/methods";
import {productCategories} from "../helper/testData";


describe('GET ALL CATEGORIES', () => {
    let response: any

    before(() => {
        getAllCategories().then(res => {
            response = res
        })
    })

    it('Verify that status code is 200', () => {
        expect(response.status).equal(200)
    })

    it('Verify that response array has a correct length', () => {
        expect(response.body.length).equal(productCategories.length)
    })

    it('Verify that response includes all categories', () => {
        for(let el of productCategories){
            expect(response.body).to.include(el)
        }
    })
})
