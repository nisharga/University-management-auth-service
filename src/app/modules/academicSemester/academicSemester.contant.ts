
import { IAcademicSemesterCode, IAcademicSemesterMonth, IAcademicSemesterTitle, } from './academicSemester.interface';

export const AcademicSemesterMonths: IAcademicSemesterMonth[] = [
    "January", "February",  "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

export const academicSemisterTitles: IAcademicSemesterTitle[] = [
    'Autum', 'Summer', 'Fall'
]

export const academicSemisterCode: IAcademicSemesterCode[] = [
    '01', '02', '03'
]

export const academicSemesterTitleCodeMapper:{
    [key: string] : string;
} = {
    Autum: '01',
    Summer: '02',
    Fall: '03',
}

export const academicSemesterFilterableFields = [
    'searchTerm', 'title', 'code', 'year'
]