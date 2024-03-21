import {getProdByCategory, randomInt} from "../helper/methods";
import {productCategories} from "../helper/testData";
import {faker} from "@faker-js/faker";


describe('GET PRODUCT BY CATEGORY', () => {
    let response: any
    let randomCategory: string

    before(() => {
        const randomIndex: number = randomInt(0, productCategories.length - 1)
        randomCategory = productCategories[randomIndex]

        getProdByCategory(randomCategory).then(res => {
            response = res
        })
    })

    it('Verify that with existing category status code is 200', () => {
        expect(response.status).equal(200)
    })

    it('Verify that with existing category response has all correct products', () => {
        for(let el of response.body.products){
            expect(el.category).equal(randomCategory)
        }
    })

    it('Verify that with non existing category response has empty array', () => {
        const randomNonExistingCategory = faker.string.alpha()

        getProdByCategory(randomNonExistingCategory).then(res => {
            expect(res.status).equal(200)
            expect(res.body.products.length).equal(0)
            expect(res.body.total).equal(0)
        })
    })
})
