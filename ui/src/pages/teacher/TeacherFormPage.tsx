import { PageProps } from '@/lib/shared/types/config' 
import api from '@/lib/network/api'
import { cookies } from 'next/headers'
import { StudentFormPageProps, TeacherFormPageProps } from '../../types'
import StudentForm from '../../widgets/student/StudentForm'
import TeacherForm from '../../widgets/teacher/TeacherForm'


export default async function TeacherFormPage(props: TeacherFormPageProps) {
    const id = props.params.app[3]
    if(props.for === "detail")
        try {
            const student = await api(await cookies()).get(`/uscitech_academy/teachers/${id}/`)
            return <div className='flex w-full h-full flex-col bg-white rounded shadow p-[20px]'>
                <TeacherForm {...props} teacher={student.data} />
            </div>
        } catch (e) {
            console.log(e)
            return <div><p>404</p></div>
        }
    else
        try { 
            return <div className='flex w-full h-full flex-col bg-white rounded shadow p-[20px]'>
                <TeacherForm {...props} />
            </div>
        } catch (e) {
            console.log(e)
            return <div><p>404</p></div>
        }
}