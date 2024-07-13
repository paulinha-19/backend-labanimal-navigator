import { HTTP_ERRORS } from "../../models/model";
import createError from "http-errors";
import { UserLogin } from "../../database/users";
import { Application, NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { comparePasswords } from "../../utils/bcrypt";
require("dotenv").config();

export = (app: Application) => {
  app.post(
    "/login",
    body("email").notEmpty(),
    body("password").exists(),
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      
      if (errors.isEmpty()) {
        const email: string = req.body.email;
        const password: string = req.body.password;

        if (email) {
          await UserLogin.loginUser(email, password)
            .then((usuario) => {
              if (usuario) {
                if (comparePasswords(password, usuario.password)) {
                  const token = jwt.sign(
                    {
                      email: usuario.email,
                      id: usuario.id,
                    },
                    `${process.env.JW_TOKEN}`,
                    {
                      expiresIn: "1h",
                    }
                  );

                  res.json({
                    message: "Usuário logado com sucesso",
                    token: token,
                  });
                } else {
                  res.status(401).json({ message: "Credenciais inválidas" });
                }
              } else {
                res.status(401).json({ message: "Credenciais inválidas" });
              }
            })
            .catch((erro) => {
              console.error(erro);
              next(createError(HTTP_ERRORS.ROTA_NAO_ENCONTRADA, erro));
            });
        } else {
          next(createError(HTTP_ERRORS.BAD_REQUEST, "O email não pode ser nulo"));
        }
      } else {
        const message = errors.array().map( erro => erro.msg)
        next(
          createError(HTTP_ERRORS.SUCESSO, message[0])
        );
      }
    }
  );
};
