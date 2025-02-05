import { PageProps } from "@/lib/shared/types/config";
import StudentList from "../widgets/StudentList";

export default function StudentPage(props: PageProps){
    return <div className="bg-white rounded-xl p-[20px]">
        <StudentList />
    </div>
}