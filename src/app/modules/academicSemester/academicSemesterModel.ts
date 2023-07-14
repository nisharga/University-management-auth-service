 
import {  Schema, model } from "mongoose";
 import { IAcademicSemester, IAcademicSemesterModel } from "./academicSemester.interface";
import { AcademicSemesterMonths, academicSemisterCode, academicSemisterTitles } from "./academicSemester.contant";
import ApiError from "../../../errors/ApiErorr"; 
import status from "http-status";

const academicSemesterSchema = new Schema<IAcademicSemester>({
    title: {
        type: String,
        required: true,  
        enum: academicSemisterTitles
    },
    year: { 
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: academicSemisterCode
    },
    startMonth: {
        type: String,
        required: true,
        enum: AcademicSemesterMonths,
    },endMonth: {
        type: String,
        required: true,
        enum: AcademicSemesterMonths
    }
},
{
    timestamps: true
}
)

academicSemesterSchema.pre('save', async function (next){
 const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
 })
 if(isExist) {
    throw new ApiError(status.CONFLICT, "Academic semister is already exists")
 }   
 next()
})

export const AcademicSemester = model<IAcademicSemester, IAcademicSemesterModel>('academicSemester', academicSemesterSchema);