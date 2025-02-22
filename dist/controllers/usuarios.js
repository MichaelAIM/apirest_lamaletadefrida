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
exports.createUsuario = exports.deleteUsuario = exports.updateUsuario = exports.getUsarioByUid = exports.getUsuarioById = exports.getAllUsuarios = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Persona_1 = __importDefault(require("../models/Persona"));
const uuid_1 = require("uuid"); //LIBRERIA UUID
const Empleado_1 = __importDefault(require("../models/Empleado"));
const Rol_1 = __importDefault(require("../models/Rol"));
const getAllUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield Usuario_1.default.findAll({
            include: [
                {
                    model: Rol_1.default,
                },
                {
                    model: Empleado_1.default,
                    include: [Persona_1.default],
                },
            ],
        });
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
});
exports.getAllUsuarios = getAllUsuarios;
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield Usuario_1.default.findByPk(id, {
            include: [
                {
                    model: Rol_1.default,
                },
                {
                    model: Empleado_1.default,
                    include: [Persona_1.default],
                },
            ],
        });
        if (usuario) {
            res.status(200).json(usuario);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error });
    }
});
exports.getUsuarioById = getUsuarioById;
const getUsarioByUid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const user = yield Usuario_1.default.findOne({
        where: { uid },
        include: [
            {
                model: Rol_1.default,
            },
            {
                model: Empleado_1.default,
                include: [Persona_1.default],
            },
        ],
    });
    if (user) {
        // if(user.personas.profesionales.habilitado){
        // res.json(user);
        res.json(user);
        // }else{
        //   res.status(404).json({
        //     msg: `El profesional ${user.personas.nombre} se encuentra deshabilitado`,
        //   });
        // }
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario con la id ${uid}`,
        });
    }
});
exports.getUsarioByUid = getUsarioByUid;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, password, uid, isActive, roles_id } = req.body;
    try {
        const usuario = yield Usuario_1.default.findByPk(id);
        if (usuario) {
            yield usuario.update({ username, password, uid, isActive, roles_id });
            res.status(200).json(usuario);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield Usuario_1.default.findByPk(id);
        if (usuario) {
            // await usuario.destroy();
            yield usuario.update({ isActive: false });
            res.status(200).json({ message: "Usuario eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
});
exports.deleteUsuario = deleteUsuario;
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, roles_id } = req.body;
    //hay que validar que el rut, nombre, correo de la persona no exista
    //si existe retornar 400
    // if (persono) {
    //   return res.status(400).json({
    //     msg: "Ya existe un usuario con este nombre " + username,
    //   });
    // }
    const uuid = (0, uuid_1.v4)();
    const shortUuid = uuid.slice(0, 8); // Limitar el UUID a los primeros 8 caracteres
    const salto = bcryptjs_1.default.genSaltSync();
    const psswd = bcryptjs_1.default.hashSync(password, salto);
    try {
        const nuevoUsuario = yield Usuario_1.default.create({
            username,
            password: psswd,
            uid: shortUuid,
            isActive: true,
            roles_id,
        });
        res.status(201).json(nuevoUsuario);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error });
    }
});
exports.createUsuario = createUsuario;
//# sourceMappingURL=usuarios.js.map