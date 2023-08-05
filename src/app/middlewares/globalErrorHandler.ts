
import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { IGenericErrorMessage } from "../../interfaces/error";
import config from "../../config";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/ApiErorr";
import { errorlogger } from "../../shared/looger";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";
import handleCastError from "../../errors/handleCastError";


const globalErrorHandler: ErrorRequestHandler
    = (error, req: Request, res: Response, next: NextFunction) => {

        // eslint-disable-next-line no-unused-expressions
        config.env === 'development' ?
            // eslint-disable-next-line no-console
            console.log('globalErrorHandler', error)
            : errorlogger.error("globalErrorHandler", error)

        let statusCode = 500
        let message = 'Something went wrong!'
        let errorMessage: IGenericErrorMessage[] = []

        if (error?.name === 'ValidationError') {
            const simplifiedError = handleValidationError(error)
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorMessage = simplifiedError.errorMessage;
        }

        else if (error?.name === 'CastError') {
            const simplifiedError = handleCastError(error)
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorMessage = simplifiedError.errorMessage;
        }

        else if (error instanceof ZodError) {
            const simplifiedError = handleZodError(error)
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorMessage = simplifiedError.errorMessage;
        }

        else if (error instanceof ApiError) {
            statusCode = error?.statusCode;
            message = error.message;
            errorMessage = error?.message ?
                [
                    {
                        path: '',
                        message: error?.message
                    }
                ] : []
        }

        else if (error instanceof Error) {
            message = error?.message
            errorMessage = error?.message ?
                [
                    {
                        path: '',
                        message: error?.message
                    }
                ] : []

        }
 
        res.status(statusCode).json({
            sucess: false,
            message,
            errorMessage,
            stack: config.env !== 'production' ? error?.stack : undefined
        })
        // next()
    }

export default globalErrorHandler; 