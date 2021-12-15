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
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(body) {
        return __awaiter(this, void 0, void 0, function* () {
            // const user = new UserEntity(userEntityProps);
            const userResponse = yield this.userRepository.findBy({
                email: body.email,
            });
            if (userResponse) {
                const user = userResponse[0];
                const indexCurrency = user.props.favoriteCurrency.indexOf(body.code);
                if (indexCurrency > -1) {
                    user.props.favoriteCurrency.push(body.code);
                }
                else {
                    user.props.favoriteCurrency.splice(indexCurrency, 1);
                }
                const updatedUser = yield this.userRepository.update(user);
                return updatedUser.props;
            }
            return null;
        });
    }
}
exports.default = UpdateUserUseCase;
