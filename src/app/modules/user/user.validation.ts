 
import { z } from "zod"; 
import { bloodGroup, gender } from "../student/student.constant";
 

        const createStudentZodSchema = z.object({
            body: z.object({ 
                password: z.string().optional(),
                student: z.object({
                    name: z.object({
                        firstName: z.string({
                            required_error: "FirstName is Required"
                        }),
                        middleName: z.string({
                            required_error: "MiddleName is Required"
                        }).optional(),
                        lastName: z.string({
                            required_error: "LastName is Required"
                        })

                    }),
                    dateOfBirth: z.string({
                      required_error: "Date of Birth is Required"
                    }),
                    gender: z.enum([...gender] as [string, ...string[]], {
                      required_error: "Gender is Required"
                    }),
                    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
                    email: z.string({
                        required_error: "Email is Required"
                    }).email(),
                    contactNo: z.string({
                        required_error: "Contact No is Required"
                    }),
                    emergencyContactNo: z.string({
                        required_error: "Emmergency Contact No is Required"
                    }),
                   
                    presentAddress: z.string({
                        required_error: "presenetAddress is Required"
                    }),
                    permanentAddress: z.string({
                        required_error: "permanentAddress is Required"
                    }), 
                    academicSemester: z.string({
                        required_error: "academicSemester is Required"
                    }),
                    academicDepartment: z.string({
                        required_error: "academicDepartment is Required"
                    }),
                    academicFaculty: z.string({
                        required_error: "academicFaculty is Required"
                    }),
                    guardian: z.object({
                        fatherName: z.string({
                            required_error: "fatherName is Required"
                        }),
                        fatherOccupation: z.string({
                            required_error: "fatherOccupation is Required"
                        }),
                        fatherContactNo: z.string({
                            required_error: "fatherContactNo is Required"
                        }),
                        motherName: z.string({
                            required_error: "motherName is Required"
                        }),
                        motherOccupation: z.string({
                            required_error: "motherOccupation is Required"
                        }),
                        motherContactNo: z.string({
                            required_error: "motherContactNo is Required"
                        }),
                        address: z.string({
                            required_error: "Guardian address is Required"
                        }),
                    }),
                    localGuardian: z.object({
                        name: z.string({
                            required_error: "local Guardian is Required"
                        }),  
                        occupation: z.string({
                            required_error: "local Guardian occupation is Required"
                        }), 
                        contactNo: z.string({
                            required_error: "local Guardian contactNo is Required"
                        }), 
                        address: z.string({
                            required_error: "local Guardian address is Required"
                        }), 
                    }),
                    profileImage: z.string().optional(),
                })
            }), 
            
          });

          const createFacultyZodSchema = z.object({
            body: z.object({
              password: z.string().optional(),
          
              faculty: z.object({
                name: z.object({
                  firstName: z.string({
                    required_error: 'First name is required',
                  }),
                  lastName: z.string({
                    required_error: 'Last name is required',
                  }),
                  middleName: z.string().optional(),
                }),
                gender: z.string({
                  required_error: 'Gender is required',
                }),
                dateOfBirth: z.string({
                  required_error: 'Date of birth is required',
                }),
                email: z
                  .string({
                    required_error: 'Email is required',
                  })
                  .email(),
                contactNo: z.string({
                  required_error: 'Contact number is required',
                }),
                emergencyContactNo: z.string({
                  required_error: 'Emergency contact number is required',
                }),
                bloodGroup: z
                  .string({
                    required_error: 'Blood group is required',
                  })
                  .optional(),
                presentAddress: z.string({
                  required_error: 'Present address is required',
                }),
                permanentAddress: z.string({
                  required_error: 'Permanent address is required',
                }),
                academicDepartment: z.string({
                  required_error: 'Academic department is required',
                }),
          
                academicFaculty: z.string({
                  required_error: 'Academic faculty is required',
                }),
                designation: z.string({
                  required_error: 'Designation is required',
                }),
                profileImage: z
                  .string({
                    required_error: 'Profile Image is required',
                  })
                  .optional(),
              }),
            }),
          });

          
export const UserValidation = {
    createStudentZodSchema,
    createFacultyZodSchema
}