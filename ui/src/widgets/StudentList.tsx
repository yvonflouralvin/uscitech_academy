'use client'
import { Button } from "@/components/ui/button"
import useCrudTable from "@/components/ui/CrudTable"
import { GradeClasse, Student } from "../types"
import { OnCreateProps } from "@/components/ui/CrudTable/types"
import cookies from "@/lib/shared/cookies"
import api from "@/lib/network/api"


export default function StudentList() {
    const {
        Table,
        handleCreate
    } = useCrudTable({
        depth: 3,
        // condition: "grade_id = %s",
        // params: [props.section.id],
        columns: [
            { label: "Prenom", index: "first_name" }, 
            { label: "Nom", index: "name" }, 
            { label: "Postnom", index: "last_name" }, 
            { label: "Classe", index: "grade_id", renderColumn: (row: Student) => { 
                return <p>{row.school_gradeclasse?.libelle} {row.school_gradeclasse?.uscitech_academy_gradesection?.libelle}</p>},
                type:"relation",
                relation: {
                    model: "uscitech_academy_gradeclasse",
                    idIndex: "id",
                    depth: 1,
                    render: (e: GradeClasse) => {
                        return <p>{e.libelle} {e.uscitech_academy_gradesection?.libelle}</p>
                    }
                } 
            }
        ],
        idIndex: "id",
        model: "uscitech_academy_student",
        rowClassname: "cursor-pointer",
        modalSize: "3xl",
        crudTableID: "StudentListCrudTable",
        idMode: "uuid",
        onCreate: async (arg: OnCreateProps) => {
            try{
                const username = String(`${arg.values[0]}.${arg.values[1]}`).toLocaleLowerCase().replaceAll(" ", "");
                const user: {user_id: number} = (await api(cookies).post(`/auth/register/`, {
                    username: username, 
                    email: username,
                    password: username
                })).data
                arg.values.push(user.user_id);
                arg.columns.push("user_id");
                if(arg.natifOnCreate !== undefined) arg.natifOnCreate(arg);
            }catch(e){

            }
        }
    })

    return <div>
        <div className="flex items-end">
            <div className="flex-1">
                <h1 className="font-bold">Étudiants</h1>
            </div>
            <Button onClick={handleCreate}>CREER</Button>
        </div>
        {Table()}
    </div>
}