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
exports.deleteProductoImagen = exports.updateProductoImagen = exports.createProductoImagen = exports.getProductoImagenById = exports.getAllProductoImagenes = void 0;
const ProductoImagen_1 = __importDefault(require("../models/ProductoImagen"));
const getAllProductoImagenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productoImagenes = yield ProductoImagen_1.default.findAll();
        res.status(200).json(productoImagenes);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener las imágenes de productos", error });
    }
});
exports.getAllProductoImagenes = getAllProductoImagenes;
const getProductoImagenById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productoImagen = yield ProductoImagen_1.default.findByPk(id);
        if (productoImagen) {
            res.status(200).json(productoImagen);
        }
        else {
            res.status(404).json({ message: "Imagen de producto no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener la imagen de producto", error });
    }
});
exports.getProductoImagenById = getProductoImagenById;
const createProductoImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productos_id, nombre, url } = req.body;
    try {
        const nuevaProductoImagen = yield ProductoImagen_1.default.create({
            productos_id,
            nombre,
            url,
        });
        res.status(201).json(nuevaProductoImagen);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al crear la imagen de producto", error });
    }
});
exports.createProductoImagen = createProductoImagen;
const updateProductoImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { productos_id, nombre, url } = req.body;
    try {
        const productoImagen = yield ProductoImagen_1.default.findByPk(id);
        if (productoImagen) {
            yield productoImagen.update({
                productos_id,
                nombre,
                url,
            });
            res.status(200).json(productoImagen);
        }
        else {
            res.status(404).json({ message: "Imagen de producto no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar la imagen de producto", error });
    }
});
exports.updateProductoImagen = updateProductoImagen;
const deleteProductoImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productoImagen = yield ProductoImagen_1.default.findByPk(id);
        if (productoImagen) {
            yield productoImagen.destroy();
            res
                .status(200)
                .json({ message: "Imagen de producto eliminada correctamente" });
        }
        else {
            res.status(404).json({ message: "Imagen de producto no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al eliminar la imagen de producto", error });
    }
});
exports.deleteProductoImagen = deleteProductoImagen;
//# sourceMappingURL=productoImagenes.js.map