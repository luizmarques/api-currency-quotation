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
const user_entity_1 = __importDefault(require("../entities/user.entity"));
class RegisterNewUserUserCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(userEntityProps) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_entity_1.default(userEntityProps);
            const emailAlreadyInUse = yield this.userRepository.findBy({
                email: user.props.email,
            });
            if (emailAlreadyInUse === null || emailAlreadyInUse === void 0 ? void 0 : emailAlreadyInUse.length) {
                throw ('email_already_in_use');
            }
            const registeredUser = yield this.userRepository.insert(user);
            const { props } = registeredUser;
            return {
                _id: props._id,
                name: props.name,
                email: props.email,
                password: props.password,
                favoriteCurrency: props.favoriteCurrency
            };
        });
    }
}
exports.default = RegisterNewUserUserCase;
