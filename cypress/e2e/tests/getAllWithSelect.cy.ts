import {productGetAll, randomInt, searchWithSelect} from "../helper/methods";
import {productKeys} from "../helper/testData";
import {faker} from '@faker-js/faker'


describe('GET ALL PRODUCTS WITH SELECT', () => {
    let pageLimit: number

    const randomProdKey = () => {
        const maxLength = productKeys.length - 1
        const randomNum = randomInt(0, maxLength)

        return productKeys[randomNum]
    }

    before(() => {
        productGetAll().its('body').then(res => {
            pageLimit = res.limit - 1
        })
    })

    it('Verify that passed key returns in the products object', () => {
        const prodKey = randomProdKey()

        searchWithSelect(prodKey).then(res => {
            const randomIndex = randomInt(0, pageLimit)
            const randomPickedProduct = Object.keys(res.body.products[randomIndex])

            expect(res.status).equal(200)
            expect(randomPickedProduct).to.include(prodKey)
            expect(randomPickedProduct).to.have.length(2)
        })
    })

    it('Verify that non existing key is not in the products object', () => {
        const nonExistingProdKey = faker.animal.type()

        searchWithSelect(nonExistingProdKey).then(res => {
            const randomIndex = randomInt(0, pageLimit)
            const randomPickedProduct = Object.keys(res.body.products[randomIndex])

            expect(res.status).equal(200)
            expect(randomPickedProduct).to.not.include(nonExistingProdKey)
            expect(randomPickedProduct).to.have.length(1)
        })
    })

    it('Verify that passed multiple keys included in the products object', () => {
        let multiProdKeys: string = ''
        const randomLoopIteration = randomInt(1, productKeys.length - 1)

        for(let i = 0; i < randomLoopIteration; i++){
            const prodKey = randomProdKey()

            if(multiProdKeys && !multiProdKeys.includes(prodKey)) multiProdKeys += ',' + prodKey
            else if(!multiProdKeys) multiProdKeys += prodKey
        }

        const arrOfKeys = multiProdKeys.split(',')

        searchWithSelect(multiProdKeys).then(res => {
            const randomIndex = randomInt(0, pageLimit)
            const randomPickedProduct = Object.keys(res.body.products[randomIndex])

            expect(res.status).equal(200)
            expect(randomPickedProduct).to.have.length(arrOfKeys.length + 1)

            for(let el of arrOfKeys){
                expect(randomPickedProduct).to.include(el)
            }
        })
    })
})
