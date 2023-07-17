import {  Request, Response } from 'express'; 
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status'; 
import pick from '../../../shared/pick';
import { paginationFields } from '../../../conastants/pagination'; 
import { IStudent } from './student.interface';
import { StudentService } from './student.service';
import { studentFilterableFields } from './student.constant';



const getAllStudents = catchAsync(async (req : Request, res: Response) => { 
    
    const filters = pick(req.query, studentFilterableFields);   
    
    const paginationOptions = pick(req.query, paginationFields)

    const result = await StudentService.getAllStudents(filters, paginationOptions)
       

    sendResponse<IStudent[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Student Retrived Successfully",
        meta: result.meta,
        data: result.data,
        
    }) 

})

const getSingleStudent = catchAsync(async (req : Request, res: Response) => { 
    const id = req.params.id;
    const result = await StudentService.getSingleStudent(id);
      
    sendResponse<IStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single Student Retrived Successfully",
        data: result
    }) 
})

const updateStudentController = catchAsync(async (req : Request, res: Response) => { 

    const id = req.params.id;
    const updatedData = req.body;

    const result = await StudentService.updateStudent(id, updatedData);

    sendResponse<IStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update Student Successfully", 
        data: result,
        
    })
})

const deleteStudent = catchAsync(async (req : Request, res: Response) => { 
    const id = req.params.id;
    const result = await StudentService.deleteStudent(id);

    sendResponse<IStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Delete Student Successfully", 
        data: result,
    }) 
})


export const StudentController = {
    getAllStudents,
    getSingleStudent,
    updateStudentController,
    deleteStudent
}