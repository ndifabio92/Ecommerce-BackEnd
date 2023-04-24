import mongoose from "mongoose";

class DbConnection {

    static #instance;

    constructor() { }

    static getInstance() {
        if (this.#instance === undefined) this.#instance = new DbConnection();
        return this.#instance;
    }

    async connect() {
        try {
            const { MONGO_DB_URI, MONGO_DB_NAME } = process.env;
            const url = `${MONGO_DB_URI}${MONGO_DB_NAME}`;
            await mongoose.connect(url);
            console.log('Base de datos conectada', MONGO_DB_NAME);
        } catch (error) {
            console.error(error);
            throw new Error('Error en la conexion de la base de datos');
        }
    }
}

const dbConnection = DbConnection.getInstance();
export default dbConnection;