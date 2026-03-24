'use client'
import { Button } from '@/components/ui/button'
import useCrudTable from '@/components/ui/CrudTable' 
// import Link from 'next/link'

export default function SectionList(){
    // return <CrudTable school_gradesection
    // return <CrudTable />
    const {
        Table,
        handleCreate
    } = useCrudTable({
        columns:[{label:"Section", index:"libelle"}],
        idIndex:"id",
        model:"uscitech_academy_gradesection",
        rowClassname:"cursor-pointer",
        modalSize:"3xl",
        crudTableID:"SectionListCrudTable",
        idMode: "uuid",
        // detailsFormExtra : (item) =>  {
        //    return <div  className="mt-[20px] text-blue">
        //     <Link href={`/apps/uscitech_academy/promotions/${item.id}`}>Consulter les promotions</Link>
        //    </div>
        // }
    })

    return <div>
        <div className="flex items-end">
            <div className="flex-1">
                <h1 className="font-bold">Sections</h1>
            </div>
            <Button onClick={handleCreate}>CREER</Button>
        </div>
        {Table()}
    </div>
}