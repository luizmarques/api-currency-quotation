"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const user_entity_1 = __importDefault(require("../../../domain/entities/user.entity"));
const persistence_error_1 = __importDefault(require("../../../domain/errors/persistence.error"));
const user_schema_1 = __importDefault(require("../models/user.schema"));
class UserRespositoryImpl {
    constructor(conn) {
        this.conn = conn || (0, connection_1.default)();
        this.UserModel = this.conn.model('users', user_schema_1.default);
    }
    findBy(userEntityProps) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersProps = yield this.UserModel.find(userEntityProps);
                if (!usersProps.length)
                    return null;
                const users = [];
                usersProps.forEach((userProps) => users.push(new user_entity_1.default(userProps.toObject())));
                return users;
            }
            catch (e) {
                throw new persistence_error_1.default(`Error on UserRepository.findby: ${JSON.stringify(e, null, 4)}`);
            }
        });
    }
    insert(userEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new this.UserModel(userEntity.props);
                yield user.save();
                return new user_entity_1.default(user.toObject());
            }
            catch (e) {
                throw new persistence_error_1.default(`Error on UserRepository.insert: ${JSON.stringify(e, null, 4)}`);
            }
        });
    }
    update(userEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { props } = userEntity;
                const updatedUser = yield this.UserModel.findOneAndUpdate({ _id: props._id }, { $set: props }, { new: true });
                if (!updatedUser)
                    throw new persistence_error_1.default(`User with id ${props._id} not found`);
                return new user_entity_1.default(updatedUser.toObject());
            }
            catch (e) {
                throw new persistence_error_1.default(`Error on UserRepository.update: ${JSON.stringify(e, null, 4)}`);
            }
        });
    }
}
exports.default = UserRespositoryImpl;
