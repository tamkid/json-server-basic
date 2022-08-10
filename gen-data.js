const casual = require('casual');
const fs = require('fs');

const randomCategories = (n) => {
    if(n <= 0) return [];

    const categoryList = [];

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: casual.uuid,
            name: casual.word,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        categoryList.push(category);
    })

    return categoryList;
}

const randomProducts = (categories, n) => {
    if(n <= 0) return [];

    const productList = [];

    for (const category of categories) {
        Array.from(new Array(n)).forEach(() => {
            const product = {
                id: casual.uuid,
                categoryId: category.id,
                title: casual.title,
                description: casual.description,
                price: casual.integer(from = 10, to = 500),
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            productList.push(product);
        })
    }

    return productList;
}

(() => {
    // random data
    const categoryList = randomCategories(4);
    const productList = randomProducts(categoryList, 5);

    // prepare data object
    const objDb = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Tom Nguyen"
        }
    }

    // push into db.json
    fs.writeFile('db.json', JSON.stringify(objDb), () => {
        console.log("Generate data successfully");
    })
})()