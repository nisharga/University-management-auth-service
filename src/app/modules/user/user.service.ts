import { IUser } from "./user.interface";
import { User } from "./user.model";
import config from "../../../config/index"; 
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utlis";
import ApiError from "../../../errors/ApiErorr";
import { IStudent } from "../student/student.interface";
import { AcademicSemester } from './../academicSemester/academicSemesterModel';
import mongoose from "mongoose";
import { Student } from "../student/student.model"; 
import httpStatus from "http-status";
import { IFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";

import { IAdmin } from "../admin/admin.interface";

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
   }
   
   catch(err){
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

const createFaculty = async (
    faculty: IFaculty,
    user: IUser
  ): Promise<IUser | null> => {
    // default password
    if (!user.password) {
      user.password = config.default_faculty_pass as string;
    }
    // set role
    user.role = 'faculty';
  
    // generate faculty id
    let newUserAllData = null;
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
  
      const id = await generateFacultyId();
      user.id = id;
      faculty.id = id;
  
      const newFaculty = await Faculty.create([faculty], { session });
  
      if (!newFaculty.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
      }
  
      user.faculty = newFaculty[0]._id;
  
      const newUser = await User.create([user], { session });
  
      if (!newUser.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
      newUserAllData = newUser[0];
  
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  
    if (newUserAllData) {
      newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
        path: 'faculty',
        populate: [
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      });
    }
  
    return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  
  // set role
  user.role = 'admin';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};
export const UserService = {
    createStudent,
    createFaculty,
    createAdmin
}

 