 
import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { DepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.route';
import { FacultyRoutes } from './../modules/academicFaculty/academicFaculty.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
 
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
    },
    {
        path: '/academic-department',
        route: DepartmentRoutes,
    },
    {
        path: '/student',
        route: StudentRoutes,
    },
    {
        path: '/faculties',
        route: FacultyRoutes,
      },
      {
        path: '/admins',
        route: AdminRoutes,
      },
      {
        path: '/auth',
        route: AuthRoutes,
      },

]
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;