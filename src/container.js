import {asClass, createContainer, Lifetime} from "awilix";
import dotenv from "dotenv";
import CartRepository from "./data/repositories/CartRepository.js";
import ProductRepository from "./data/repositories/ProductRepository.js";
import UserRepository from "./data/repositories/UserRepository.js";

dotenv.config();

const container = createContainer();

container.register('ProductRepository', asClass(ProductRepository), {Lifetime: Lifetime.SINGLETON});
container.register('CartRepository', asClass(CartRepository), {Lifetime: Lifetime.SINGLETON});
container.register('UserRepository', asClass(UserRepository), {Lifetime: Lifetime.SINGLETON});

export default container;