
export interface GradeSection { id: string, libelle: string }
export interface GradeClasse { id: string, libelle: string, grade_id: string, uscitech_academy_gradesection?: GradeSection }
export interface Student {
    id: string
    first_name: string
    last_name: string
    name: string
    grade_id: string
    school_gradeclasse?: GradeClasse
}