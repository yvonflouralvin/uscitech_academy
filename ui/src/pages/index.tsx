import { PageProps } from "@/lib/shared/types/config";
import GradesPage from "./GradesPage";
import StudentPage from "./StudentPage";
import ClassesPage from "./ClassesPage";
import PromotionsPage from "./PromotionsPage";


export default {
    GradesPage: (props: PageProps) => GradesPage(props),
    StudentPage: (props: PageProps) => StudentPage(props),
    ClassesPage: (props: PageProps) => ClassesPage(props),
    PromotionPage: (props: PageProps) => PromotionsPage(props)
}