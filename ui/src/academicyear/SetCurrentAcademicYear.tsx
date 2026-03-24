'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from '@/lib/network/api'
import cookies from '@/lib/shared/cookies'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@nextui-org/react'
import React from 'react' 

interface Props {
    for: "admin"|"user"
}
export default function SetCurrentAcademicYear( props: Props) {


    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [onSaving, setOnSaving] = React.useState<boolean>(false)
    const [name, setName] = React.useState<string>('')

    const [academicYears, setAcademicYears] = React.useState<any[]>([])
    const [onLoading, setOnLoading] = React.useState<boolean>(false)
    const [currentAcademicYear, setCurrentAcademicYear] = React.useState<{id: string, name: string} | undefined>(undefined)
    
    React.useEffect(()=>{
        const exec = async ()=>{
            if(props.for === "admin") { 
                try{
                    const result = await api(await cookies).get(`/isp_stage/isp_config/get-default-academic-year/`);
                    setCurrentAcademicYear(result.data)
                }catch(e: any){ 
                } 
            }else {
                try{
                    const result = await api(await cookies).get(`/isp_stage/isp_config/user-config/001/`);
                    setCurrentAcademicYear(result.data)
                }catch(e: any){ 
                } 
            }
        }
        exec()
    }, [])

    const onOpenModal = () => {
        console.log(currentAcademicYear)
        setModalOpen(true)
        setOnLoading(true);

        api(cookies).get('/uscitech_academy/academicyear/').then((response) => {
            setAcademicYears(response.data.results)
            setCurrentAcademicYear(response.data.results[0])
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setOnLoading(false)
        })
    }

    const onCloseModal = () => {
        if (onSaving === false) setModalOpen(false)
    }

    const updateCurrentAcademicYear = async () => {
        if(currentAcademicYear === undefined) return ; 
        setOnSaving(true)
        try{
            if(props.for === "admin") await api(cookies).post(`/isp_stage/isp_config/set-default-academic-year/`, {academic_year: currentAcademicYear.id})
            else  await api(cookies).post(`/isp_stage/isp_config/set-user-config/001/`, {config_value: currentAcademicYear.id})
        }catch(e){
            console.error(e)
        }
        onCloseModal()
        setOnSaving(false)
    }

    return <>
        <Button onClick={onOpenModal}>En cours : {currentAcademicYear !== undefined ? currentAcademicYear?.name : 'Non defini'}</Button>
        <Modal isOpen={modalOpen} onClose={onCloseModal}>
            {
                onSaving === false ? <>
                    <ModalContent>
                        <ModalHeader>
                            <p>Configurer l'annee academique</p>
                        </ModalHeader>
                        <ModalBody>
                            <p>Année Academique en cours : {currentAcademicYear !== undefined ? currentAcademicYear?.name : 'Non defini'}</p>
                            <hr />
                            <p>Selectionner l'annee academique</p>
                            <select         
                                onChange={e => {
                                    setCurrentAcademicYear(academicYears.find((academicYear) => academicYear.id === e.target.value))
                                }}
                                //value={currentAcademicYear?.id}
                               // onChange={(e) => setCurrentAcademicYear({id: Number(e.target.value), name: academicYears.find((academicYear) => academicYear.id === Number(e.target.value))?.name})}
                            >
                                <option value="none">Selectionner</option>
                                {
                                    academicYears.map((academicYear) => (
                                        <option key={academicYear.id} value={academicYear.id} /*selected={currentAcademicYear?.config_key === academicYear.id}*/>
                                            {academicYear.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onCloseModal}>Annuler</Button>
                            <Button onClick={updateCurrentAcademicYear} disabled={onSaving}>Modifier</Button>
                        </ModalFooter>
                    </ModalContent>
                </> : <>
                    <ModalContent>
                        <ModalBody>
                            <div>
                                <Spinner />
                            </div>
                        </ModalBody>
                    </ModalContent>
                </>
            }

        </Modal>
    </>
}