import { Schema, model } from "mongoose";
import { bloodGroup, gender } from "./student.constant";
import { IStudent, StudentModel } from "./student.interface";

export const studentSchema = new Schema<IStudent, StudentModel>({
    id: {
        type: 'String',
        required: true,
        unique: true,
    },
    name:{
        type: {
            firstName: {
                type: 'String',
                required: true,
            },
            middleName: {
                type: 'String',
            },
            lastName: {
                type: 'String',
                required: true,
            }
        },
        requred: true
    },
    dateOfBirth: {
        type: String, 
    },
    gender: {
        type: String,
        enum: gender
    },
    bloodGroup: {
        type: String,
        enum: bloodGroup
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contactNo: {
        type: String,
        unique: true,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    
    guardian: {
        required: true,
        type: {
            fatherName: {
                type: String,
                required: true,
            },
            fatherOccupation: {
                type: String,
                required: true,
            },
            fatherContactNo: {
                type: String,
                requred: true,
            },
            motherName: {
                type: String,
                required: true,
            },
            motherOccupation: {
                type: String,
                required: true,
            },
            motherContactNo: {
                type: String,
                requred: true,
            },
            address: {
                type: "String",
                required: true,
            }
        }
    },
    localGuardian: {
        requred: true,
        type: {
            name: {
                type: String,
                required: true,
            },
            occupation: {
                type: String,
                required: true,
            },
            contactNo: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            }
        }
    },
    profileImage: {
        type: String, 
    },
    academicFaculty:{
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
    },
    academicDepartment:{
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
    },    
    academicSemester:{
        type: Schema.Types.ObjectId,
        ref: 'academicSemester',
    },

}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
}
);

export const Student = model<IStudent, StudentModel>('Student', studentSchema);