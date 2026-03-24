'use client'
import React from 'react'
import { SaveIcon } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SearchSelected from "@/components/ui/SearchSelected";
import { Promotion, Student, StudentFormPageProps, Teacher, TeacherFormPageProps } from "../../types";
import api from "@/lib/network/api";
import cookies from "@/lib/shared/cookies";
import { Spinner } from '@nextui-org/react';

interface TeacherFormProps extends TeacherFormPageProps {
    teacher?: Teacher
}
export default function TeacherForm(props: TeacherFormProps) {

    const [fullname, setFullname] = React.useState(`${props.teacher?.employee.user?.name} ${props.teacher?.employee.user?.last_name} ${props.teacher?.employee.user?.first_name}`);
    const [selectedEmployee, setSelectedEmployee] = React.useState<string | undefined>();
    const [isSaving, setIsSaving] = React.useState<boolean>(false);

    React.useEffect(() => {
        console.log(selectedEmployee)
    }, [selectedEmployee]);

    const breadcrumb = [{
        label: "Academie"
    },
    {
        label: "Professeurs",
        link: "/apps/uscitech_academy/teachers"
    }]
    if (props.for === "create") breadcrumb.push({
        label: "Nouveau"
    })
    if (props.teacher?.employee.user !== undefined) breadcrumb.push({
        label: fullname ? fullname : ""
    })

    const save = async () => {
        if (isSaving === true) return;
        try {

            setIsSaving(true)
            const datas: any = {
            }

            if (selectedEmployee !== undefined && selectedEmployee !== null) datas['employee_id'] = selectedEmployee;


            if (props.for === "create") {
                const result = await api(cookies).post(`/uscitech_academy/teachers/`, datas);
                window.location.href = `/apps/uscitech_academy/teachers/${result.data.id}`;
                setFullname(result.data.fullname)
            } else if (props.for === "detail") {
                const result = await api(cookies).put(`/uscitech_academy/teachers/${props.teacher?.id}/`, datas);
                setFullname(result.data.fullname);
            }

        } catch (e) {
            console.error(e)
        }
        setIsSaving(false)
    }

    return <>
        <Breadcrumb links={breadcrumb} />
        <div>
            <div className='border-t border-inherent mt-[15px] pt-[15px] h-full'>
                <div className="flex items-start">
                    <div className='flex flex-col flex-1'>
                        <p className='font-semibold text-[20px] m-0'>{(props.for === "detail") ? `${fullname !== undefined ? fullname : ""}` : `Nouveau`}</p>
                    </div>
                    <div>
                        <button onClick={save} className='duration-300 text-white flex items-center gap-[10px] text-[13px] cursor-pointer py-[5px] px-[15px] rounded bg-primary/60 hover:bg-primary'>
                            {isSaving === false ? <><SaveIcon size={"13px"} color="white" /> Enregistrer</> : <Spinner size='sm' />}
                        </button>
                    </div>
                </div>
                <div className="mt-[10px]"></div>
                <div className="mt-[15px]">
                    {
                        props.teacher === undefined ?
                            <SearchSelected onChange={(e: Teacher) => setSelectedEmployee(e.id)} label='Enseignant' render={(e: any) => (`${e.user?.name} ${e.user?.last_name} ${e.user?.first_name}`)} index='id' url='/hr/employees/' />
                            :
                            <div className='border-b border-inherent'>
                                <p className='text-gray-400 text-[13px]'>Enseignant</p>
                                <p className='text-[13px]'>{`${props.teacher?.employee.user.name} ${props.teacher?.employee.user.last_name} ${props.teacher?.employee.user.first_name}`}</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    </>
}