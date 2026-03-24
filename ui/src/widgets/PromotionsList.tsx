'use client'
import { Button } from "@/components/ui/button";
import useCrudTable from "@/components/ui/CrudTable";  
import { OnCreateProps } from "@/components/ui/CrudTable/types";

interface Props {
    
}
export default function PromotionsList(props: Props){
    const {
        Table,
        handleCreate
    } = useCrudTable({
        // condition: "grade_id = %s",
        // params: [props.section.id],
        columns:[
            {label:"Promotion", index:"libelle"},
            {label:"Option", index:"option"},
            {
                label:"Faculté", index:"grade_id", type:"relation", relation:{idIndex:"id", model:"uscitech_academy_gradeclasse", depth:2,  
                render: (e)=> <p>{e.libelle} - {e.uscitech_academy_gradesection?.libelle}</p>}, 
                renderColumn: (e)=> <p>{e.uscitech_academy_gradeclasse?.libelle} - {e.uscitech_academy_gradeclasse?.uscitech_academy_gradesection?.libelle} </p>
            }
        ],
        idIndex:"id",
        model:"uscitech_academy_promotion",
        rowClassname:"cursor-pointer",
        modalSize:"3xl",
        crudTableID:"PromotionListCrudTable",
        idMode: "uuid",
        depth: 3
        // onCreate: async (e: OnCreateProps) =>{
        //     if(e.natifOnCreate !== undefined)
        //     e.natifOnCreate({
        //         ...e,
        //         columns: [...e.columns, "grade_id"],
        //         values: [...e.values,  props.section.id ]
        //     })
        // }
    })

    return <div>
        <div className="flex items-end">
            <div className="flex-1">
                <h1 className="font-bold">Promotions</h1>
            </div>
            <Button onClick={handleCreate}>CREER</Button>
        </div>
        {Table()}
    </div>
}