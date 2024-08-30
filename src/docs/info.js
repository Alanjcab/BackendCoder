
export const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API ecommerce coder",
            version: "1.0.0",
            description: "API Ecommerce bkCoder",
        },
        servers: [
         {
             url: "http://localhost:8080/api"
         }
        ]
    },
    apis: ["./src/docs/*.yml"],
}