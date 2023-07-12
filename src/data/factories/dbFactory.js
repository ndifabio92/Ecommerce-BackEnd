import dbConnection from "./mongooseAdapter.js";

class DbFactory {
    static create(dbType = 'MongooseAdapter') {
        const dbs = new Map();
        dbs.set('MongooseAdapter',dbConnection);

        if(!dbs.has(dbType)) throw new Error('DbAdapter not found');

       return dbs.get(dbType);
    }
}

export default DbFactory;