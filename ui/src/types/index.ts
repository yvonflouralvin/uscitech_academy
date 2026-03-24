import { User } from "@/lib/shared/types";
import { PageProps } from "@/lib/shared/types/config";
import {
     Employee
} from '/addons/hr/ui/src/types'


export interface Grade {
    id: string
    libelle: string
    grade?: Grade
}
export interface Promotion {
    id: string
    libelle: string
    grade: Grade
    option?: string
    student_count: number
}
export interface Student {
    id: string,
    promotion : Promotion,
    user:  User
    promotion_id: string
}

export interface StudentFormPageProps extends PageProps{
    for: "create"|"detail"
}

export interface TeacherFormPageProps extends PageProps {
    for: "create"|"detail"
}


export interface Teacher {
    id: string 
    employee: Employee
    employee_id: string
}