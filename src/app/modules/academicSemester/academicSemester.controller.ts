import {  Request, Response } from 'express'; 
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../conastants/pagination';
import { academicSemesterFilterableFields } from './academicSemester.contant';


const createSemester = catchAsync(async (req : Request, res: Response) => { 
        const { ...academicSemesterData } = req.body; 
        const result = await AcademicSemesterService.createSemester(academicSemesterData); 

        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic semester created successfully",
            data: result
        })

         
})

const getAllSementers = catchAsync(async (req : Request, res: Response) => { 
    
    const filters = pick(req.query, academicSemesterFilterableFields);   
    
    const paginationOptions = pick(req.query, paginationFields)

    const result = await AcademicSemesterService.getAllSemesters(filters, paginationOptions)
       

    sendResponse<IAcademicSemester[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semesters Retrived Successfully",
        meta: result.meta,
        data: result.data,
        
    }) 

})

const getSingleSementers = catchAsync(async (req : Request, res: Response) => { 
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleSemester(id);
      
    sendResponse<IAcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single Semesters Retrived Successfully",
        data: result
    }) 
})

const updateSemesterController = catchAsync(async (req : Request, res: Response) => { 
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicSemesterService.updateSemester(id, updatedData);

    sendResponse<IAcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update Semesters Successfully", 
        data: result,
        
    })
})
const deleteSemesterController = catchAsync(async (req : Request, res: Response) => { 
    const id = req.params.id;
    const result = await AcademicSemesterService.deleteSemester(id);

    sendResponse<IAcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Delete Semesters Successfully", 
        data: result,
    }) 
})


export const AcademicSemesterController = {
    createSemester,
    getAllSementers,
    getSingleSementers,
    updateSemesterController,
    deleteSemesterController
}