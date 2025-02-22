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
exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getClienteById = exports.getAllClientes = void 0;
const Cliente_1 = __importDefault(require("../models/Cliente"));
const getAllClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield Cliente_1.default.findAll();
        res.status(200).json(clientes);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los clientes", error });
    }
});
exports.getAllClientes = getAllClientes;
const getClienteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield Cliente_1.default.findByPk(id);
        if (cliente) {
            res.status(200).json(cliente);
        }
        else {
            res.status(404).json({ message: "Cliente no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente", error });
    }
});
exports.getClienteById = getClienteById;
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { personas_id, cta_instagram } = req.body;
    try {
        const nuevoCliente = yield Cliente_1.default.create({
            personas_id,
            cta_instagram,
        });
        res.status(201).json(nuevoCliente);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el cliente", error });
    }
});
exports.createCliente = createCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { personas_id, cta_instagram } = req.body;
    try {
        const cliente = yield Cliente_1.default.findByPk(id);
        if (cliente) {
            yield cliente.update({ personas_id, cta_instagram });
            res.status(200).json(cliente);
        }
        else {
            res.status(404).json({ message: "Cliente no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el cliente", error });
    }
});
exports.updateCliente = updateCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield Cliente_1.default.findByPk(id);
        if (cliente) {
            yield cliente.destroy();
            res.status(200).json({ message: "Cliente eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Cliente no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el cliente", error });
    }
});
exports.deleteCliente = deleteCliente;
//# sourceMappingURL=clientes.js.map