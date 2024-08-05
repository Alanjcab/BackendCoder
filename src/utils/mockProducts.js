import { faker } from '@faker-js/faker';

export const generateProducts = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        stock: faker.number.int()
    }
}