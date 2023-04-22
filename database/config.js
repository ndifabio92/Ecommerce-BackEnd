import mongoose from "mongoose";

export const dbConnection = async () => {
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