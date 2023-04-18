import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const MONGODB_URI = `${process.env.MONGO_DB_URI}${process.env.MONGO_DB_NAME}`;
        await mongoose.connect(MONGODB_URI);
        console.log('Base de datos conectada', MONGODB_URI);
    } catch (error) {
        console.error(error);
        throw new Error('Error en la conexion de la base de datos');
    }
}