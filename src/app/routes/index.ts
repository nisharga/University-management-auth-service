 
import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { FacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { DepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.route';
 
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
    },{
        path: '/student',
        route: StudentRoutes,
    }
]
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;