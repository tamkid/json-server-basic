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

const initBooks = () => {
    const books = [
        {
            id: casual.uuid,
            name: "Learning Angular",
            description: "A no-nonsense beginner's guide to building web applications with Angular 10 and TypeScript, 3rd Edition",
            imageUrl: "https://m.media-amazon.com/images/P/1839210664.01._SCLZZZZZZZ_SX500_.jpg",
            author: "Aristeidis Bampakos and Pablo Deeleman",
            price: 36.99,
            isAvailable: true
        },
        {
          id: casual.uuid,
          name: "ASP.NET Core 5 and Angular",
          description: "Full-stack web development with .NET 5 and Angular 11, 4th Edition",
          imageUrl: "https://m.media-amazon.com/images/P/1800560338.01._SCLZZZZZZZ_SX500_.jpg",
          author: "Valerio De Sanctis",
          price: 37.99,
          isAvailable: true
        },
        {
          id: casual.uuid,
          name: "Angular Development with TypeScript",
          description: "Angular Development with TypeScript, Second Edition is an intermediate-level tutorial that introduces Angular and TypeScript to developers comfortable with building web applications using other frameworks and tools.",
          imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41lozQ0E9ML._SX397_BO1,204,203,200_.jpg",
          author: "Yakov Fain and Anton Moiseev",
          price: 32.49,
          isAvailable: true
        }
    ];
    return books;
}

(() => {
    // random data
    const categoryList = randomCategories(4);
    const productList = randomProducts(categoryList, 5);
    const bookList = initBooks();

    // prepare data object
    const objDb = {
        categories: categoryList,
        products: productList,
        books: bookList,
        profile: {
            name: "Tom Nguyen"
        }
    }

    // push into db.json
    fs.writeFile('db.json', JSON.stringify(objDb), () => {
        console.log("Generate data successfully");
    })
})()