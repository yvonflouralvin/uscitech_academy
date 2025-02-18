'use client'
import React from 'react';

import { Pagination, Spinner } from '@nextui-org/react'
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/network/api';
import cookies from '@/lib/shared/cookies';
import useEvent from '@/lib/hooks/useEvent';
import { Student } from '../../types';

// export default function StudentList() {
//     const {
//         Table,
//         handleCreate
//     } = useCrudTable({
//         depth: 3,
//         // condition: "grade_id = %s",
//         // params: [props.section.id],
//         columns: [
//             { label: "Prenom", index: "first_name" }, 
//             { label: "Nom", index: "name" }, 
//             { label: "Postnom", index: "last_name" }, 
//             { label: "Classe", index: "grade_id", renderColumn: (row: Student) => { 
//                 return <p>{row.school_gradeclasse?.libelle} {row.school_gradeclasse?.uscitech_academy_gradesection?.libelle}</p>},
//                 type:"relation",
//                 relation: {
//                     model: "uscitech_academy_gradeclasse",
//                     idIndex: "id",
//                     depth: 1,
//                     render: (e: GradeClasse) => {
//                         return <p>{e.libelle} {e.uscitech_academy_gradesection?.libelle}</p>
//                     }
//                 } 
//             }
//         ],
//         idIndex: "id",
//         model: "uscitech_academy_student",
//         rowClassname: "cursor-pointer",
//         modalSize: "3xl",
//         crudTableID: "StudentListCrudTable",
//         idMode: "uuid",
//         onCreate: async (arg: OnCreateProps) => {
//             try{
//                 const username = String(`${arg.values[0]}.${arg.values[1]}`).toLocaleLowerCase().replaceAll(" ", "");
//                 const user: {user_id: number} = (await api(cookies).post(`/auth/register/`, {
//                     username: username, 
//                     email: username,
//                     password: username
//                 })).data
//                 arg.values.push(user.user_id);
//                 arg.columns.push("user_id");
//                 if(arg.natifOnCreate !== undefined) arg.natifOnCreate(arg);
//             }catch(e){

//             }
//         }
//     })

//     return <div>
//         <div className="flex items-end">
//             <div className="flex-1">
//                 <h1 className="font-bold">Étudiants</h1>
//             </div>
//             <Button onClick={handleCreate}>CREER</Button>
//         </div>
//         {Table()}
//     </div>
// }


export default function StudentList () {

    const [total_pages, setTotal_pages] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [results, setResults] = React.useState<any[]>([]);
    const [current_page, setCurrent_page] = React.useState(1);
    const [isSearching, setIsSearching] = React.useState(false)



    const load = async (page: number, search?: string) => {
        const url = `/uscitech_academy/students/?page=${page}${search !== undefined ? `&search=${search}` : ""}`
        try {
            const tmp = await api(cookies).get(url);
            setResults(tmp.data.results);
            setCount(tmp.data.count);
            setTotal_pages(tmp.data.total_pages)
        } catch (e) {

        }
    }

    const handleSearch = async () => {
        const input_value: any = document.getElementById("search-input")
        setIsSearching(true)
        await load(1, input_value.value)
        setIsSearching(false)
    }

    const { } = useEvent((eventId, { }) => {
        if (eventId === "list-department-creation") load(total_pages)
    }, ["list-department-creation"]);

    React.useEffect(() => {
        load(current_page);
    }, [current_page])


    return <div>
    <div className="flex items-center w-full bg-[rgba(0,0,0,0.03)]  px-[20px] py-[10px] rounded mb-[10px]">
        <input id="search-input" onKeyUp={e => { if (e.key === "Enter") handleSearch() }} placeholder='Search' className='outline-none border-0 text-[13px] bg-transparent text-gray-500 flex-1' />
        {
            isSearching === true ? <Spinner size='sm' /> : <SearchIcon size="13px" onClick={handleSearch} className="cursor-pointer" />
        }

    </div>
    <div>
        <div className="flex gap-[2px] px-[20px] py-[10px] bg-[rgba(0,0,0,0.03)] font-light  my-[3px] rounded ">
            <p className="w-[50%]">Nom complet</p>
            <p className="w-[25%]">Classe</p>
        </div>
        {
            results.map((item: Student, index) => {
                return <Link href={`/apps/uscitech_academy/students/${item.id}`} key={item.id} className="duration-300 flex gap-[2px] text-[13px] text-gray-500 px-[20px] py-[6px] my-[3px] cursor-pointer hover:bg-[rgba(0,0,0,0.02)] border-b border-inherent">
                    <p className="w-[50%]">{item.user?.name} {item.user?.last_name}</p>
                    <p className="w-[25%]">{item.promotion.libelle} {item.promotion.grade.libelle}</p>
                </Link>
            })
        }
    </div>
    <div className="mt-[10px]">
        {(total_pages > 1) && <Pagination total={total_pages} page={current_page} onChange={setCurrent_page} />}
    </div>
</div>
}