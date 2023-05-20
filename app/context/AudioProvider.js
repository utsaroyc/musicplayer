import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({children}) => {

const [favList, setFavList] = useState([]);

const addFav = (fav) => {
    setFavList([...favList, fav])
}

console.log(JSON.stringify(favList))

return <AppContext.Provider value={{addFav, favList}}>{children}</AppContext.Provider>
}