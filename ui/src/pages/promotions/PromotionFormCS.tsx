'use client'
import { PageProps } from "@/lib/shared/types/config"
import FormView from "@/components/FormView"
import { Promotion } from "../../types"
import {
    Grade
} from '/addons/uscitech_academy/ui/src/types'


interface Props extends PageProps {
    promotion?: Promotion
}

export default function PromotionFormCS(props: Props) {
    return (
        <FormView

            {...props}
            breadcrumb={[
                {label: "Administration"},
                {label: "Promotions", link: "/apps/uscitech_academy/promotions"}, 
            ]}
            title={(e: Promotion)=>  `${props.promotion !== undefined ? props.promotion.libelle : "Ajouter une promotion"}`}
            postURL="/uscitech_academy/promotions/"
            putURL="/uscitech_academy/promotions/"
            deleteURL="/uscitech_academy/promotions/"
            for={props.promotion !== undefined ? "detail" : "create"}
            defaultValue={props.promotion}
            fields={[
                { 
                    id:"libelle",
                    label: "Libellé",
                    type: "text",
                    required: true,
                    defaultValue: (e: Promotion)=> {
                        return e.libelle
                    }, 
                },
                { 
                    id: "option",
                    label: "Option",
                    type: "text",
                    defaultValue: (e: Promotion)=> {
                        return e.option
                    }, 
                },
                { 
                    id:"grade_id",
                    label: "Département",
                    type: "search-select",
                    required: true,
                    // url: "/uscitech_academy/grades/",
                    options: {
                        url: `/uscitech_academy/gradeclasses/`,
                        id: `id`,
                        render: (e: Grade) => `${e.libelle}`,
                        selectedFirstDefault: false,
                        label:"Département",
                        defaultValue: (e: Grade)=> e.id
                    },
                    defaultValue: (e: Promotion)=> {
                        return e.grade.libelle
                    },
                    onSetValue: (e: Promotion) => {
                        return e.id
                    },
                }
            ]}
        />
    )
}
