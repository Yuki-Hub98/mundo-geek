import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "./logs/error.log" })
  ]
});

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    message: err.message,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      message: "Ocorreu um erro na requisição"
    });
  }

  return res.status(500).json({
    error: "Erro interno do servidor",
    message: "Ocorreu um erro inesperado"
  });
};
