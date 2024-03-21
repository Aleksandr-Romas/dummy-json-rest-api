import {Product} from "./interfaces";
import {faker} from "@faker-js/faker";

export const productKeys: string[] = [
    'title', 
    'description', 
    'price', 
    'discountPercentage', 
    'rating', 
    'stock', 
    'brand', 
    'category', 
    'thumbnail', 
    'images'
]
export const productCategories: string[] = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting'
]
export const randomBody: Product & { [key: string]: any } = {
    title: faker.animal.cat(),
    description: faker.animal.cow(),
    price: faker.number.int(),
    discountPercentage: faker.number.int(),
    rating: faker.number.int(),
    stock: faker.number.int(),
    brand: faker.animal.dog(),
    category: faker.animal.bear(),
    thumbnail: faker.animal.bird(),
    images: [faker.animal.crocodilia(), faker.animal.fish()]
}
