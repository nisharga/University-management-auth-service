import express from 'express';
 import validateRequest from '../../middlewares/validateRequest';
 
import { AcademicSemesterValidation } from './academicSemesterValidation';
import { AcademicSemesterController } from './academicSemester.controller';
 
const router = express.Router();

router.post(
    '/create-semester', 
    validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
    AcademicSemesterController.createSemester
)
router.get(
    '/all', 
     AcademicSemesterController.getAllSementers
)
router.patch(
    '/update/:id',
     validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema), 
     AcademicSemesterController.updateSemesterController
)
router.delete(
    '/delete/:id',
    AcademicSemesterController.deleteSemesterController
)

router.get(
    '/:id', 
     AcademicSemesterController.getSingleSementers
)



export const SemesterRoutes = router;