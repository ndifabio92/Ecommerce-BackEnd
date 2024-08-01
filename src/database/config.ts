import mongoose from "mongoose";

class DbConnection {

    private static instance: DbConnection;

    private constructor() {
        DbConnection.instance = this;
    }

    public static getInstance(): DbConnection {
        if (!this.instance) this.instance = new DbConnection();
        return this.instance;
    }

    async connect(): Promise<void> {
        try {
            const { MONGO_DB_URI, MONGO_DB_NAME } = process.env;
            const url: string = `${MONGO_DB_URI}${MONGO_DB_NAME}`;
            await mongoose.connect(url);
            console.log('Base de datos conectada', MONGO_DB_NAME);
        } catch (error) {
            console.error(error);
            throw new Error('Error en la conexion de la base de datos');
        }
    }
}

const dbConnection: DbConnection = DbConnection.getInstance();
export default dbConnection;