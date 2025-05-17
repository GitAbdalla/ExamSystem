import { validationResult } from 'express-validator';

export const validatorMiddleware = (req, res, next) => {

  const errors = validationResult(req);
  
  if (errors.isEmpty()) {
    return next();
  }
  
  const formattedErrors = errors.array().map(error => ({
    field: error.path,
    message: error.msg
  }));

  return res.status(400).json({
    status: 'fail',
    message: 'Validation Error',
    errors: formattedErrors
  });
};