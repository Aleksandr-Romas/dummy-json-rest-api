export const productSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        discountPercentage: { type: 'number' },
        rating: { type: 'number' },
        stock: { type: 'number' },
        brand: { type: 'string' },
        category: { type: 'string' },
        thumbnail: { type: 'string' },
        images: { type: 'array' },
    },
    required: ['id', 'title', 'description', 'price', 'discountPercentage', 'rating', 'stock', 'brand', 'category', 'thumbnail', 'images'],
    additionalProperties: false
};