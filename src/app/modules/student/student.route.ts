import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
 
const router = express.Router();

// router.get('/:id')

export const StudentRoutes = router;