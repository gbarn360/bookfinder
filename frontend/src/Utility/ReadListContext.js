import React,{createContext,useState} from "react";

export const ReadListContext = createContext();


export function ReadListProvider({children}){
    const [readList,setReadList] = useState([]);

    const addBookToReadList = (book) => {
        
            let filteredBook = {
                id: book.id,
                volumeInfo: book.volumeInfo
            }
            if(!readList.some(e => e.id === filteredBook.id))
                setReadList((prevBooks)=>[filteredBook,...prevBooks])
        
    }

    const removeBookFromReadList = (book) => {
       let filteredBooks = readList.filter(e => e.id !== book.id);
       setReadList(filteredBooks);
    }

    return (
        <ReadListContext.Provider value={{ readList, addBookToReadList, removeBookFromReadList }}>
            {children}
        </ReadListContext.Provider>
    );
}