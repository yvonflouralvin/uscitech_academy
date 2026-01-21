import { PageProps } from "@/lib/shared/types/config";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link'
import PromotionsList from "../widgets/PromotionsList";


export default async function PromotionsPage(props: PageProps) {

    try {
        return <div>
            <div className="flex items-center gap-[10px]">
                <Link href={"/apps/uscitech_academy/promotions/"}><ArrowLeft className="cursor-pointer"/></Link>
                <p> / Promotions</p>
                {/* <p> {section.libelle} / Promotions</p> */}
            </div>
            <PromotionsList />
        </div>
    } catch (e) {
        console.log(e)
        return <div className="h-full w-full flex items-center justify-center">
            <p className="text-[40px]">404</p>
        </div>
    }
}