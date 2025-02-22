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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const generarJWT_1 = require("../helpers/generarJWT");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield Usuario_1.default.findOne({
            where: { username },
        });
        if (!user || !user.username) {
            return res.status(400).json({
                msg: `El usuario con el username ${username} no existe`,
            });
        }
        if (!user.estado_id) {
            return res.status(400).json({
                msg: `El usuario se encuentra deshabilitado`,
            });
        }
        // Comparación de la contraseña ingresada con la encriptada en la BD
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        console.log(password, "Contraseña ingresada");
        console.log(user.password, "Contraseña usuario (hash)");
        if (!validPassword) {
            return res.status(400).json({
                msg: `La contraseña no es válida para este usuario`,
            });
        }
        // Generar token y responder al cliente
        const { id } = user;
        const name = user.username;
        const payload = { name, id };
        const token = yield (0, generarJWT_1.generarjwt)(payload);
        res.json({
            msg: "login Ok",
            user,
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Algo salió mal, hable con el administrador",
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map