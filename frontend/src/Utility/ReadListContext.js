import React,{createContext,useState} from "react";

export const ReadListContext = createContext();


export function ReadListProvider({children}){
    const [readList,setReadList] = useState([]);

    const addBookToReadList = (book) => {
        if(!readList.includes(book)){
            setReadList((prevBooks)=>[...prevBooks,book])
        }
        
    }

    return (
        <ReadListContext.Provider value={{ readList, addBookToReadList }}>
            {children}
        </ReadListContext.Provider>
    );
}