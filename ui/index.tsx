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
    menu: (props: PageProps) => {
        return [
            {
                label: "Administrations",
                permissions: [
                    "uscitech_manager.view_faculties"
                ],
                subItems: [
                    {
                        label: "Sections",
                        link: "/apps/uscitech_academy/sections"
                    },
                    {
                        label: "Départements",
                        link: "/apps/uscitech_academy/departements"
                    },
                    {
                        label: "Promotions",
                        link: "/apps/uscitech_academy/promotions"
                    },
                    {
                        label: "Etudiants",
                        link: "/apps/uscitech_academy/students"
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