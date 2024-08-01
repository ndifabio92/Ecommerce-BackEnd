import { Types } from "mongoose";
import IProduct from "../interface/IProduct";

type typeId = string | IProduct | Types.ObjectId;

export default typeId;