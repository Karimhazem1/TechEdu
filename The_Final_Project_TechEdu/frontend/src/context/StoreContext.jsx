import { createContext } from "react";
import { Top_Watched, Lesson, cart } from "../assets/assets";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const contextValue = {
        Top_Watched,Lesson,cart
    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;