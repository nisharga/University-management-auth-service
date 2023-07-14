 
import { z } from "zod"; 
//         we need req-validation thats why we use zod
//         we need body object
//         we need data object

        const createUserZodSchema = z.object({
            body: z.object({
                user: z.object({
                    role: z.string({
                    required_error: 'Role is Required'
                    }),

                    password: z.string().optional(),
                })
                
            }),
            
          });
        
export const UserValidation = {
    createUserZodSchema
}