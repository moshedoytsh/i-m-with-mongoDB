"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteProduct = exports.appendProduct = exports.updateQuantity = exports.updateProduct = exports.getProductById = exports.getAllProducts = void 0;
const accessProducts = __importStar(require("../DAL/products-data-access"));
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = (yield accessProducts.getAllProducts());
        return Promise.resolve(all);
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.getAllProducts = getAllProducts;
const createNewId = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield (0, exports.getAllProducts)();
        for (let i = 0; i < 10000; i++) {
            if (allProducts.find(el => el.id === i))
                return i;
        }
        throw new Error("no id found");
    }
    catch (error) {
        return Promise.reject(error);
    }
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield accessProducts.getProductById(id);
        return Promise.resolve(product);
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.getProductById = getProductById;
const updateProduct = (id, properties) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield accessProducts.updateProduct(id, properties);
        return Promise.resolve(product);
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.updateProduct = updateProduct;
const updateQuantity = (id, n) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield accessProducts.updateQuantity(id, n);
        return Promise.resolve(product);
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.updateQuantity = updateQuantity;
const appendProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productAppended = yield accessProducts.appendProduct(product);
        return Promise.resolve(productAppended);
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.appendProduct = appendProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield accessProducts.deleteProduct(id);
        return Promise.resolve();
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.deleteProduct = deleteProduct;
