import { PageProps } from "@/lib/shared/types/config";
// import StudentList from "../../widgets/StudentList";
import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import StudentList from "../../widgets/student/StudentList";

export default function StudentPage(props: PageProps){
    // return <div className="bg-white rounded-xl p-[20px]">
    //     {/* <StudentList /> */}
    // </div>

    return <div className='flex w-full h-full flex-col bg-white rounded shadow p-[20px]'>
        <Breadcrumb links={[
            {
                label: "Academie"
            },
            {
                label: "Étudiants",
                link: "/apps/uscitech_academy/students"
            }
        ]} />
        <div className='border-t border-inherent mt-[15px] pt-[15px] h-full'>
            <div className="flex items-start">
                <div className='flex flex-col flex-1'>
                    <p className='font-semibold text-[20px] m-0'>Étudiants</p>
                    {/* <p className='text-gray-500 font-light m-0 text-[13px]'>27 employés</p> */}
                </div>
                <div>
                    <Link href="/apps/uscitech_academy/students/create" className='duration-300 flex items-center gap-[2px] text-[13px] text-white font-bold cursor-pointer rounded py-[5px] px-[15px] bg-primary/80 hover:bg-primary'>
                        <PlusIcon size={"12px"} color='white' />
                        <p>Nouveau</p>
                    </Link>
                </div>
            </div>
            <div className="mt-[10px]">
                <StudentList />
            </div>
        </div>

    </div>
}