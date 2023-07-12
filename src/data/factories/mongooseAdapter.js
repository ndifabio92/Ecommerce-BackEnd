import mongoose from "mongoose";

class MongooseAdapter {

    static #instance;

    constructor() { }

    static getInstance() {
        if (this.#instance === undefined) this.#instance = new MongooseAdapter();
        return this.#instance;
    }

    async connect() {
        try {
            const { DB_URI, DB_NAME } = process.env;
            const url = `${DB_URI}${DB_NAME}`;
            await mongoose.connect(url);
            console.log('Base de datos conectada', DB_NAME);
        } catch (error) {
            console.error(error);
            throw new Error('Error en la conexion de la base de datos');
        }
    }

}

const dbConnection = MongooseAdapter.getInstance();
export default dbConnection;