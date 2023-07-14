import { Model, Types } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFacultyInterface";

export type IAcademicDepartment = {
    title: string;
    academicFaculty: Types.ObjectId | IAcademicFaculty;
}

export type AcademicDepartmentModel = Model<IAcademicDepartment, Record<string, unknown>>;

export type IAcademicDepartmentFilterRequest = {
    searchTerm?: string;
    academicFaculty?: Types.ObjectId;
}