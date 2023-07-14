 
import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { FacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { DepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
 
const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/academic-semesters',
        route: SemesterRoutes,
    },
    {
        path: '/academic-faculty',
        route: FacultyRoutes,
    },{
        path: '/academic-department',
        route: DepartmentRoutes,
    }
]
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;