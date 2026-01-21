import { PageProps } from "@/lib/shared/types/config";
import PromotionsListSSR from "./PromotionsListSSR";
import PromotionFormSSR from "./PromotionFormSSR";


export default function promotions(props: PageProps){
    if (props.params.app[2] === "promotions" && props.params.app.length === 3){
        return {
            dashboardLayouting: true,
            render: async () => {
                return <PromotionsListSSR {...props} />
            }
        } 
    }else if (props.params.app[2] === "promotions" && props.params.app.length === 4){
        return {
            dashboardLayouting: true,
            render: async () => {
                return <PromotionFormSSR {...props} />
            }
        } 
    }
    else{
        return {
            dashboardLayouting: true,
            render: async () => {
                return <></>
            }
        } 
    }    
}