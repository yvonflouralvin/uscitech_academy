'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from '@/lib/network/api'
import cookies from '@/lib/shared/cookies'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@nextui-org/react'
import React from 'react'

export default function AcademicYearAddCS() {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [onCreating, setOnCreating] = React.useState<boolean>(false)
    const [name, setName] = React.useState<string>('')

    const onCloseModal = () => {
        if (onCreating === false) setModalOpen(false)
    }

    const onAcademicYearCreate = async () => {
        setOnCreating(true)
        try {
            const response = await api(cookies).post('/uscitech_academy/academicyear/', {
                name,
            })
            console.log(response.data)
            setModalOpen(false)
            setName('')
        } catch (error) {
            console.log(error)
        } finally {
            setOnCreating(false)
        }
    }

    return <>
        <Button onClick={() => setModalOpen(true)}>Nouveau</Button>
        <Modal isOpen={modalOpen} onClose={onCloseModal}>
            {
                onCreating === false ? <>
                    <ModalContent>
                        <ModalHeader>
                            <p>Creer une nouvelle année academique</p>
                        </ModalHeader>
                        <ModalBody>
                            <Input placeholder='Libelle' value={name} onChange={(e) => setName(e.target.value)} />
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onCloseModal}>Annuler</Button>
                            <Button onClick={onAcademicYearCreate}>CREER</Button>
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