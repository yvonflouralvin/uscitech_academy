import { PageProps } from "@/lib/shared/types/config";
import GradesPage from "./GradesPage";
import StudentPage from "./student/StudentPage";
import ClassesPage from "./ClassesPage";
import PromotionsPage from "./PromotionsPage";
import { StudentFormPageProps, TeacherFormPageProps } from "../types";
import StudentFormPage from "./student/StudentFormPage";
import TeacherPage from "./teacher/TeacherPage";
import TeacherFormPage from "./teacher/TeacherFormPage";
import AcademicYearPage from "../AcademicYearPage";


export default {
    GradesPage: (props: PageProps) => GradesPage(props),
    StudentPage: (props: PageProps) => StudentPage(props),
    ClassesPage: (props: PageProps) => ClassesPage(props),
    PromotionPage: (props: PageProps) => PromotionsPage(props),
    StudentFormPage : (props: StudentFormPageProps) => StudentFormPage(props),
    TeacherPage: (props: PageProps) => TeacherPage(props),
    TeacherFormPage : (props: TeacherFormPageProps)=> TeacherFormPage(props),
    AcademicYear: (props: PageProps)=> AcademicYearPage(props)
}