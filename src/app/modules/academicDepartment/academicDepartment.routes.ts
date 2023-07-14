import express from 'express';
 import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';
 
const router = express.Router();

router.post(
    '/create-department', 
    validateRequest(AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
        ),
        AcademicDepartmentController.createDepartment
)
router.get(
    '/get/:id', 
    AcademicDepartmentController.getSingleDepartment
)
router.get(
    '/getall', 
    AcademicDepartmentController.getAllDepartment
)

router.patch(
    '/update/:id',
    validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentZodSchema), 
    AcademicDepartmentController.updateDepartmentController,

)
router.delete(
    '/delete/:id',
    AcademicDepartmentController.deleteDepartment
)

 



export const DepartmentRoutes = router;