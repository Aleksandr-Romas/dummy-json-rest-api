import {productSearch, randomInt, searchWithLimit} from "../helper/methods";
import {faker} from '@faker-js/faker'


describe('PRODUCT SEARCH', () => {
    let maxLength: number
    let prodTitles: string[] = []
    let prodDescription: string[] = []

    before(() => {
        searchWithLimit(0).its('body.products').then(products => {
            maxLength = products.length - 1

            for(let el of products){
                prodTitles.push(el.title)
                prodDescription.push(el.description)
            }
        })
    })

    it('Verify that search works with one symbol from title', () => {
        const randomIndex = randomInt(0, maxLength)
        const titleSymbol = prodTitles[randomIndex][Math.floor(prodTitles[randomIndex].length / 2)]

        productSearch(titleSymbol).then(res => {
            expect(res.status).equal(200)
            expect(res.body.total).not.equal(0)
            expect(
                ((res.body.products[0].title).includes(titleSymbol) ||
                (res.body.products[0].description.includes(titleSymbol))))
                .to.be.true
        })
    })

    it('Verify that search works with one symbol from description', () => {
        const randomIndex = randomInt(0, maxLength)
        const descriptionSymbol = prodDescription[randomIndex][Math.floor(prodDescription[randomIndex].length / 2)]

        productSearch(descriptionSymbol).then(res => {
            expect(res.status).equal(200)
            expect(res.body.total).not.equal(0)
            expect(
                ((res.body.products[0].title).includes(descriptionSymbol) ||
                (res.body.products[0].description.includes(descriptionSymbol))))
                .to.be.true
        })
    })

    it('Verify that search works with full string from title', () => {
        const randomIndex = randomInt(0, maxLength)
        const fullTitle = prodTitles[randomIndex]

        productSearch(fullTitle).then(res => {
            expect(res.status).equal(200)
            expect(res.body.total).not.equal(0)
            expect(
                ((res.body.products[0].title).includes(fullTitle) ||
                (res.body.products[0].description.includes(fullTitle))))
                .to.be.true
        })
    })

    it('Verify that search works with full string from description', () => {
        const randomIndex = randomInt(0, maxLength)
        const fullDescription = prodDescription[randomIndex]

        productSearch(fullDescription).then(res => {
            expect(res.status).equal(200)
            expect(res.body.total).not.equal(0)
            expect(
                ((res.body.products[0].title).includes(fullDescription) ||
                (res.body.products[0].description.includes(fullDescription))))
                .to.be.true
        })
    })

    it('Verify that search returns empty object for non existing string', () => {
        const randomString = faker.string.alpha(5)

        productSearch(randomString).then(res => {
            expect(res.status).equal(200)
            expect(res.body.total).equal(0)
            expect(res.body.products.length).equal(0)
        })
    })
})
