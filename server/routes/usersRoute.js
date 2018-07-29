import express from 'express';
import userController from '../controllers/userController';
import validation from '../helpers/validation';

const usersRouter = express.Router();

usersRouter.post('v1/api/auth/signup', validation.userSignupValidation, userController.createUser);
export default usersRouter;
