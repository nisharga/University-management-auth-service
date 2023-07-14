import { z } from "zod";


const createAcademicDepartmentZodSchema = z.object({
    body: z.object({ 
        title: z.string({
            required_error: 'Title is Required'
        }),
        academicFaculty: z.string({
            required_error: 'Academic Department is Required'
        })
    }),
  });
  
  const updateAcademicDepartmentZodSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        AcademicFaculty: z.string().optional(),
    }),
  })

export const AcademicDepartmentValidation = {
    createAcademicDepartmentZodSchema,
    updateAcademicDepartmentZodSchema
}