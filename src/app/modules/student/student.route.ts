import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './studentValidation';
 
const router = express.Router();

router.get('/get/:id', StudentController.getSingleStudent)
router.get('/getall', StudentController.getAllStudents)
router.delete('/delete/:id', StudentController.deleteStudent)

router.patch('/update/:id', 
 validateRequest(StudentValidation.updateStudentZodSchema),
StudentController.updateStudentController)

export const StudentRoutes = router;