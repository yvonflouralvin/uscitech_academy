import { PageProps } from "@/lib/shared/types/config";
import { Button } from '@/components/ui/button'
import SectionList from "../widgets/SectionList";


export default function GradesPage(props: PageProps) {
    return <div className="bg-white rounded-xl p-[20px]">
        <SectionList />
    </div>
}