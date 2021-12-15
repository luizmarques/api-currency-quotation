"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntityProps = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validation_error_1 = __importDefault(require("../errors/validation.error"));
class UserEntityProps {
}
__decorate([
    (0, class_validator_1.IsOptional)()
], UserEntityProps.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'should_be_string',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'field_required',
    })
], UserEntityProps.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'field_required',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'should_be_a_valid_email' })
], UserEntityProps.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'field_required',
    }),
    (0, class_validator_1.IsString)({
        message: 'should_be_string',
    })
], UserEntityProps.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)()
], UserEntityProps.prototype, "favoriteCurrency", void 0);
exports.UserEntityProps = UserEntityProps;
class UserEntity {
    constructor(userEntityProps) {
        const classObject = (0, class_transformer_1.plainToClass)(UserEntityProps, userEntityProps);
        const errors = (0, class_validator_1.validateSync)(classObject, {
            stopAtFirstError: true,
        });
        if (errors.length) {
            const failures = [];
            errors.forEach((error) => failures.push({
                msg: error.constraints[Object.keys(error.constraints)[0]],
                param: error.property,
            }));
            throw new validation_error_1.default(failures);
        }
        this.props = classObject;
    }
}
exports.default = UserEntity;
