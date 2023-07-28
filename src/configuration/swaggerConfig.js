const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Ecommerce Api Documentation',
            description: "Api Documentation with Swagger"
        }
    },
    apis: ['src/docs/**/*.yaml']
}

export default swaggerOptions;