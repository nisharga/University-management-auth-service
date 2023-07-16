import { IUser } from "./user.interface";
import { User } from "./user.model";
import config from "../../../config/index"; 
import { generateFacultyId, generateStudentId } from "./user.utlis";
import ApiError from "../../../errors/ApiErorr";
import { IStudent } from "../student/student.interface";
import { AcademicSemester } from './../academicSemester/academicSemesterModel';
import mongoose from "mongoose";
import { Student } from "../student/student.model"; 
import httpStatus from "http-status";


const createStudent = async(student:IStudent, user: IUser): Promise<IUser | null> => {
     
    const id = await generateFacultyId();
    user.id = id;

    // default password
   if(!user.password){
    user.password = config.default_student_pass as string
   }
   
    // set role 
   user.role = 'student' 
   const academicsemester = await AcademicSemester.findById(student.academicSemester);
 
   // generate an student id
   let newUserAllData = null;
   const session = await mongoose.startSession()
   try{
    session.startTransaction()
    const id = await generateStudentId(academicsemester);
    user.id = id;
    student.id = id;

    // array
    const newStudent = await Student.create([student], {session})

    if(!newStudent.length){
        throw new ApiError(httpStatus.BAD_REQUEST, "Faild to create student")
    }

    user.student = newStudent[0]._id;
    const newUser = await User.create([user], {session})

    if(!newUser.length){
        throw new ApiError(httpStatus.BAD_REQUEST, "Faild to create user")
    }
    
    newUserAllData = newUser[0];  

    await session.commitTransaction()
    await session.endSession()
   }catch(err){
    await session.abortTransaction()
    await session.endSession()
    throw err;
   }
   // transition AND roleBack

   // user ==> studetn ==> academicSemester, academicDepartment, academicFaculty
   if(newUserAllData){
    newUserAllData = await User.findOne({id: newUserAllData.id}).populate({
        path: 'student',
        populate: [
            {path: 'academicSemester'},
            {path: 'academicDepartment'},
            {path: 'academicFaculty'},
        ]
    })
   }
   return newUserAllData;

}

export const UserService = {
    createStudent
}

 