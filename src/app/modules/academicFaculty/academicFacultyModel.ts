import { Schema, model } from "mongoose";
import { IAcademicFaculty, IAcademicFacultyModel } from "./academicFacultyInterface";

const AcademicFacultySchema = new Schema<IAcademicFaculty, IAcademicFacultyModel>(
    {
        title: {
            type: "string",
            required: true,
            unique: true,
        }
    },
    {
       timestamps: true,
       toJSON: {
        virtuals: true
       } 
    }
)
export const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModel>('AcademicFaculty', AcademicFacultySchema)