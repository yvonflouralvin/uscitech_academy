import api from "@/lib/network/api";
import { PageProps } from "@/lib/shared/types/config";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link' 
import GradeList from "../widgets/GradeList";

export default async function ClassesPage(props: PageProps) {

    try {
        return <div>
            <div className="flex items-center gap-[10px]">
                <Link href={"/apps/uscitech_academy/promotions/"}><ArrowLeft className="cursor-pointer"/></Link>
                <p> / Départements</p>
                {/* <p> {section.libelle} / Promotions</p> */}
            </div>
            <GradeList />
        </div>
    } catch (e) {
        console.log(e)
        return <div className="h-full w-full flex items-center justify-center">
            <p className="text-[40px]">404</p>
        </div>
    }


}