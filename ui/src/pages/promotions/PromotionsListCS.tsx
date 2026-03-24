'use client'
import React from 'react';
import { PageProps } from "@/lib/shared/types/config";
import ListView from '@/components/ListView'
import { Promotion } from "../../types";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import cookies from '@/lib/shared/cookies';
import api from '@/lib/network/api';

interface Props extends PageProps {

}
export default async function PromotionsListCS(props: Props) {
    return <>
        <ListView
            {...props}
            rightOptions={
                <ImportPromotionButton />
            }
            createLink="/apps/uscitech_academy/promotions/create"
            breadcrumb={[
                { label: "Administration" },
                { label: "Promotions", link: `/apps/uscitech_academy/promotions` }
            ]}
            renderColumns={() => {
                return <div className="cursor-pointer hidden md:flex md:flex-row flex-col w-full">
                    <p className="text-gray-400 text-[13px] w-[60%]">Promotion / (option)</p>
                    <div className="flex md:flex-row flex-col w-[40%] text-gray-400 text-[13px]">
                        <p className="flex-1">Stats</p>
                        <p className="flex-1">Département</p>
                    </div>
                </div>
            }}
            renderRow={(e: Promotion) => {
                return <div key={e.id} className="cursor-pointer flex md:flex-row flex-col w-full">
                    <p className="text-gray-400 text-[13px] w-full md:w-[60%]">{e.libelle} {(e.option !== undefined && e.option !== null) ? `/ Option : ${e.option}` : ""}</p>
                    <div className="flex md:flex-row flex-col w-full md:w-[40%] text-gray-400 text-[13px]">
                        <p className="flex-1 flex"><span className="md:hidden flex">Étudiants : </span>{e.student_count}</p>
                        <p className="flex-1 flex"><span className="md:hidden flex">Département : </span>{e.grade.libelle}</p>
                    </div>
                </div>
            }}
            subtitle={(e: Promotion[]) => `${e.length} promotions`}
            title="Promotions"
            url="/uscitech_academy/promotions/"
            detailsUrl={(e: Promotion) => `/apps/uscitech_academy/promotions/${e.id}/`}
        />
    </>
}


function ImportPromotionButton() {
    const [open, setOpen] = React.useState(false);
    const [isLoadingDatas, setIsLoadingDatas] = React.useState(false);
    const [academicYears, setAcademicYears] = React.useState([]);
    const [selectedAcademicYear, setSelectedAcademicYear] = React.useState<string|undefined>(undefined);
    const [isImporting, setIsImporting] = React.useState(false);

    const getAcademicYears = async () => {
        try {
            setIsLoadingDatas(true)
            const res = await api(cookies).get(`/uscitech_academy/academicyear/`)
            setAcademicYears(res.data.results)
            setIsLoadingDatas(false)
        } catch (e) {
            setIsLoadingDatas(false)
        }
    }
    const openModal = () => {
        setOpen(true)
        getAcademicYears()
    }

    const closeModal = () => {
        setOpen(false)
    }

    const importPromotions = async () => {
        setIsImporting(true)
        try {
            console.log(selectedAcademicYear)
            const res = await api(cookies).post(`/uscitech_academy/promotions/import/`, { academic_year: selectedAcademicYear })
            setIsImporting(false)
        } catch (e) {
            setIsImporting(false)
        }
    }

    return <>
        <Button color="primary" onClick={openModal} variant="bordered" className="py-[2px]">Importer des promotions</Button>
        <Modal isOpen={open} onClose={closeModal}>
            <ModalContent>
                <ModalHeader>Importer des promotions</ModalHeader>
                <ModalBody>
                    <div>
                        <p>Année académique</p>
                        <select
                            onChange={(e) => setSelectedAcademicYear(e.target.value)}>
                            <option value="none">Sélectionnez une année académique</option>
                            {academicYears.map((e: any) => (
                                <option key={e.id} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={closeModal} variant="bordered" className="py-[2px]">Annuler</Button>
                    <Button color="primary" onClick={importPromotions} variant="bordered" className="py-[2px]">Importer</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}