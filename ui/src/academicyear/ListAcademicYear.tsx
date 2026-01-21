import api from "@/lib/network/api";
import { PageProps } from "@/lib/shared/types/config";
import { cookies } from "next/headers";
import AcademicYearAddCS from "./AcademicYearAddCS";
import { Input } from "@/components/ui/input";
import SetCurrentAcademicYear from "./SetCurrentAcademicYear";

export default async function ListAcademicYear(props: PageProps){
    
    

    try{
        const result = await api(await cookies()).get(`/uscitech_academy/academicyear/`);
        return <>
            <div>
                <div className="flex items-center">
                    <p className="flex-1">List of Academic Year</p>
                    {/* <p>{JSON.stringify(currentAcademicYear)}</p> */}
                    <SetCurrentAcademicYear for="admin" />
                    <AcademicYearAddCS />
                </div>
                <div>
                    <div className="mt-[10px] mt-[10px]">
                        <Input placeholder="Search" />
                    </div>
                    <div className="divide-y px-[20px]">
                        {
                            result.data.results.map((item: any) => (
                                <div key={item.id} className="py-[5px] "><p>{item.name}</p></div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    }catch(e){
        console.log(e)
    }
    
    return <>
        <div>
            <p>No data</p>
        </div>
    </>
}