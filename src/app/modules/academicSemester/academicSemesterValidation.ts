 

import { z } from "zod";
import { AcademicSemesterMonths, academicSemisterTitles, academicSemisterCode } from "./academicSemester.contant";

//         we need req-validation thats why we use zod
//         we need body object
//         we need data object

        const createAcademicSemesterZodSchema = z.object({
            body: z.object({
                title: z.enum([...academicSemisterTitles] as [string, ...string[]] , {
                    required_error: 'Title is Required'
                }),
                year: z.string({
                    required_error: 'Year is Required'
                }),
                code: z.enum([...academicSemisterCode] as [string, ...string[]], {
                    required_error: 'Code is Required'
                }),
                startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
                    required_error: "Start Month is Required"
                }),              
                endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
                    required_error: "End Month is Required"
                }),
            }),
          });
          
          const updateAcademicSemesterZodSchema = z.object({
            body: z.object({
                title: z.enum([...academicSemisterTitles] as [string, ...string[]] , {
                    required_error: 'Title is Required'
                }).optional(),
                year: z.string({
                    required_error: 'Year is Required'
                }).optional(),
                code: z.enum([...academicSemisterCode] as [string, ...string[]], {
                    required_error: 'Code is Required'
                }).optional(),
                startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
                    required_error: "Start Month is Required"
                }).optional(),              
                endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
                    required_error: "End Month is Required"
                }).optional(),
            }),
          }).refine( data => (data.body.title && data.body.code) || (!data.body.title && !data.body.code), {
            message: 'Either both title code should be provided or neither'
          })
        
export const AcademicSemesterValidation = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema
}