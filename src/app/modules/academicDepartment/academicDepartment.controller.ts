import {   Request,   Response } from 'express'; 
 import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
 import pick from '../../../shared/pick';
import { paginationFields } from '../../../conastants/pagination';
import { AcademicDepartmentService } from './academicDepartment.service';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';
import { IAcademicDepartment } from './academicDepartment.interface';
 

const createDepartment = catchAsync(async (req : Request, res: Response) => { 
        const { ...academicFacultyData } = req.body; 
        const result = await AcademicDepartmentService.createAcademicDepartment(academicFacultyData); 

        sendResponse<IAcademicDepartment>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Department created successfully",
            data: result
        }) 
})

const getAllDepartment = catchAsync(async (req : Request, res: Response) => { 
    
    const filters = pick(req.query, academicDepartmentFilterableFields);   
    
    const paginationOptions = pick(req.query, paginationFields)

    const result = await AcademicDepartmentService.getAllDepartments(filters, paginationOptions)
       

    sendResponse<IAcademicDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty Department Retrived Successfully",
        meta: result.meta,
        data: result.data,
        
    })

})

const getSingleDepartment = catchAsync(async (req : Request, res: Response,) => { 
    const id = req.params.id;
    const result = await AcademicDepartmentService.getSingleDepartment(id);
      
    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single  Academic Department Retrived Successfully",
        data: result
    })  
})

const updateDepartmentController = catchAsync(async (req : Request, res: Response) => { 
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicDepartmentService.updateDepartment(id, updatedData);

    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update Academic Department Successfully", 
        data: result, 
    })
})

const deleteDepartment = catchAsync(async (req : Request, res: Response) => { 
    const id = req.params.id;
    const result = await AcademicDepartmentService.deleteDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Delete Department Faculty Successfully", 
        data: result,
    })
})


export const AcademicDepartmentController = {
    createDepartment,
    getAllDepartment,
    getSingleDepartment,
    updateDepartmentController,
    deleteDepartment
}