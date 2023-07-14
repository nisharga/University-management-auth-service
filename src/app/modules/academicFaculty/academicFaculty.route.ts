import express from 'express';
 import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFacultyValidation';
import { AcademicFacultyController } from './academicFaculty.controller';
 
const router = express.Router();

router.post(
    '/', 
    validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
    AcademicFacultyController.createFaculty
)
router.get(
    '/get/:id', 
    AcademicFacultyController.getSingleFaculty
)
router.get(
    '/getall', 
    AcademicFacultyController.getAllFaculties
)

router.patch(
    '/update/:id',
    validateRequest(AcademicFacultyValidation.updateFacultyZodSchema), 
    AcademicFacultyController.updateFacultyController
)
router.delete(
    '/delete/:id',
    AcademicFacultyController.deleteFaculty
)

 



export const FacultyRoutes = router;