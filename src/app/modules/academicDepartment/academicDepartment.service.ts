 
 
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { SortOrder } from 'mongoose';
import { IAcademicDepartment, IAcademicDepartmentFilterRequest } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartmentModel";
import { academicDepartmentSearchableFields } from "./academicDepartment.constants";


 const createAcademicDepartment = async(payload: IAcademicDepartment): Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.create(payload);
    return result;
} 

const getAllDepartments = async (
    filters: IAcademicDepartmentFilterRequest,
    paginationOptions : IPaginationOptions): Promise<IGenericResponse<IAcademicDepartment[]>> => {
        
        const {searchTerm, ...filtersData} = filters; 
         
        const andConditions=[]
        
        if(searchTerm){
            andConditions.push({
                $or: academicDepartmentSearchableFields.map(field => ({
                   [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                   }
                }))
            })
        }
        if(Object.keys(filtersData).length){
            andConditions.push({
                $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: value,
                }))
            })
        }

        
        const {page, limit, skip, sortBy, sortOrder} = paginationHelpers.calculatePagination(paginationOptions)

    const sortConditions:{[key: string]: SortOrder} = {}

    if(sortBy & sortOrder){
        sortConditions[sortBy] = sortOrder;
    }

    const whereConditions = andConditions.length > 0 ? {$and: andConditions} : {}

    const result = await AcademicDepartment.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);

    const total = await AcademicDepartment.countDocuments()

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result 
    }
}
  

const getSingleDepartment = async (id: string) : Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.findById(id)
    return result;  
}

const updateDepartment = async (id: string, payload: Partial<IAcademicDepartment>): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {new: true});
    return result;
};

const deleteDepartment = async (id: string): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};
   
export const AcademicDepartmentService = {
    createAcademicDepartment,
    getAllDepartments,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment
}

 