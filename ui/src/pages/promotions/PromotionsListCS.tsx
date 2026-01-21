'use client'
import { PageProps } from "@/lib/shared/types/config";
import ListView from '@/components/ListView'
import { Promotion } from "../../types";


interface Props extends PageProps {
    
}
export default async function PromotionsListCS(props: Props){
    return <>
        <ListView 
            {...props}
            createLink="/apps/uscitech_academy/promotions/create"
            breadcrumb={[
                {label:"Administration"},
                {label:"Promotions", link:`/apps/uscitech_academy/promotions`}
            ]}
            renderColumns={()=>{
                return <div className="cursor-pointer hidden md:flex md:flex-row flex-col w-full">
                <p className="text-gray-400 text-[13px] w-[60%]">Promotion / (option)</p>
                <div className="flex md:flex-row flex-col w-[40%] text-gray-400 text-[13px]">
                    <p className="flex-1">Stats</p>
                    <p className="flex-1">Département</p>
                </div>
            </div>
            }}
            renderRow={(e: Promotion)=> {
                return <div key={e.id} className="cursor-pointer flex md:flex-row flex-col w-full">
                    <p className="text-gray-400 text-[13px] w-full md:w-[60%]">{e.libelle} { (e.option !== undefined && e.option !== null) ?  `/ Option : ${e.option}` : ""}</p>
                    <div className="flex md:flex-row flex-col w-full md:w-[40%] text-gray-400 text-[13px]">
                        <p className="flex-1 flex"><span className="md:hidden flex">Étudiants : </span>{e.student_count}</p>
                        <p className="flex-1 flex"><span className="md:hidden flex">Département : </span>{e.grade.libelle}</p>
                    </div>
                </div>
            }}
            subtitle={(e: Promotion[])=> `${e.length} promotions` }
            title="Promotions"
            url="/uscitech_academy/promotions/"
            detailsUrl={(e: Promotion)=> `/apps/uscitech_academy/promotions/${e.id}/`}
        />
    </>
}