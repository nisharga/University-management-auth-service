 
import {  Request,  Response } from 'express'; 
 import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
 import pick from '../../../shared/pick';
import { paginationFields } from '../../../conastants/pagination';
 import { AcademicFacultyService } from './academicFaculty.service';
import { IAcademicFaculty } from './academicFacultyInterface';

import { academicFacultyFilterableFields } from './academicFaculty.constants';


const createFaculty = catchAsync(async (req : Request, res: Response ) => { 
        const { ...academicFacultyData } = req.body; 
        const result = await AcademicFacultyService.createFaculty(academicFacultyData); 
        sendResponse<IAcademicFaculty>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Faculty created successfully",
            data: result
        }) 
})

const getAllFaculties = catchAsync(async (req : Request, res: Response,  ) => { 

    const filters = pick(req.query, academicFacultyFilterableFields);   
    
    const paginationOptions = pick(req.query, paginationFields)

    const result = await AcademicFacultyService.getAllFaculties(filters, paginationOptions)
       

    sendResponse<IAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty Retrived Successfully",
        meta: result.meta,
        data: result.data,
        
    }) 

})

const getSingleFaculty = catchAsync(async (req : Request, res: Response ) => { 
    const id = req.params.id;
    const result = await AcademicFacultyService.getSingleFaculty(id);
      
    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single AcademicFaculty Retrived Successfully",
        data: result
    })  
})

const updateFacultyController = catchAsync(async (req : Request, res: Response ) => { 
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updateFaculty(id, updatedData);

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update Academic Faculty Successfully", 
        data: result, 
    }) 
})

const deleteFaculty = catchAsync(async (req : Request, res: Response ) => { 
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Delete Faculty Successfully", 
        data: result,
    }) 
})


export const AcademicFacultyController = {
    createFaculty,
    getAllFaculties,
    getSingleFaculty,
    updateFacultyController,
    deleteFaculty
}