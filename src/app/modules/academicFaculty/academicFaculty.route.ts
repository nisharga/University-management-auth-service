import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFacultyValidation';
import { AcademicFacultyController } from './academicFaculty.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
 
const router = express.Router();

router.post(
    '/', 
    validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN, 
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.STUDENT,
    ),
    AcademicFacultyController.createFaculty
)

router.get(
    '/get/:id', 
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY
      ),
    AcademicFacultyController.getSingleFaculty
)

router.get(
    '/getall', 
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
    ),
    AcademicFacultyController.getAllFaculties
)

router.patch(
    '/update/:id',
    validateRequest(AcademicFacultyValidation.updateFacultyZodSchema), 
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.FACULTY,
    ),
    AcademicFacultyController.updateFacultyController
)

router.delete(
    '/delete/:id',
    auth(
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.ADMIN,
    ),
    AcademicFacultyController.deleteFaculty
)
 
 

export const FacultyRoutes = router;