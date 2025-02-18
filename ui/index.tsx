import { AppConfig, PageProps } from '@/lib/shared/types/config';
import pages from './src/pages';
const config: AppConfig = {
    label: "Etudiants",
    showInMainMenu: true,
    icon: "https://www.flaticon.com/svg/static/icons/svg/2933/2933715.svg",
    dashboardLayouting: true,
    permissions: [
        "uscitech_manager.view_faculties"
    ],
    menu: async (props: PageProps) => {
        return [
            {
                label: "Administrations",
                permissions: [
                    "uscitech_manager.view_faculties",
                    "isp_departement_officier"
                ],
                subItems: [
                    {
                        label: "Sections",
                        link: "/apps/uscitech_academy/sections",
                        permissions: [
                            "uscitech_manager.view_faculties",
                        ]
                    },
                    {
                        label: "Départements",
                        link: "/apps/uscitech_academy/departements",
                        permissions: [
                            "uscitech_manager.view_faculties",
                        ]
                    },
                    {
                        label: "Promotions",
                        link: "/apps/uscitech_academy/promotions",
                        permissions: [
                            "uscitech_manager.view_faculties",
                        ]
                    },
                    {
                        label: "Etudiants",
                        link: "/apps/uscitech_academy/students",
                        permissions: [
                            "uscitech_manager.view_faculties",
                            "isp_departement_officier"
                        ]
                    },
                    {
                        label: "Professeurs",
                        link: "/apps/uscitech_academy/teachers",
                        permissions: [
                            "uscitech_manager.view_faculties",
                        ]
                    }
                ]
            }
        ]
    },
    page: (props: PageProps) => {
        if (props.params.app.length === 3 && props.params.app[2] === "sections")
            return {
                dashboardLayouting: true,
                render: () => {
                    return pages.GradesPage(props);
                }
            }
        else if (props.params.app.length === 3 && props.params.app[2] === "departements")
            return {
                dashboardLayouting: true,
                render: async () => {
                    return await pages.ClassesPage(props);
                }
            }
        else if (props.params.app.length === 3 && props.params.app[2] === "promotions")
            return {
                dashboardLayouting: true,
                render: async () => {
                    return await pages.PromotionPage(props);
                }
            }
        else if (props.params.app.length === 3 && props.params.app[2] === "students")
            return {
                dashboardLayouting: true,
                render: () => {
                    return pages.StudentPage(props)
                }
            }
        else if (props.params.app.length === 4 && props.params.app[2] === "students" && props.params.app[3] !== "create")
            return {
                dashboardLayouting: true,
                render: () => {
                    return pages.StudentFormPage({...props, for:"detail"})
                }
            }
        else if (props.params.app.length === 4 && props.params.app[2] === "students" && props.params.app[3] === "create")
            return {
                dashboardLayouting: true,
                render: () => {
                    return pages.StudentFormPage({...props, for:"create"})
                }
            }
        else if (props.params.app.length === 3 && props.params.app[2] === "teachers")
            return {
                dashboardLayouting: true,
                render: () => {
                    return pages.TeacherPage(props)
                }
            }
        else if (props.params.app.length === 4 && props.params.app[2] === "teachers" && props.params.app[3] !== "create")
            return {
                dashboardLayouting: true,
                render: () => {
                    return pages.TeacherFormPage({...props, for:"detail"})
                }
            }
        else if (props.params.app.length === 4 && props.params.app[2] === "teachers" && props.params.app[3] === "create")
            return {
                dashboardLayouting: true,
                render: () => {
                    return pages.TeacherFormPage({...props, for:"create"})
                }
            }
        else
            return {
                dashboardLayouting: true,
                render: () => {
                    return <></>
                }
            }
    },
}


export default config;