import React,{createContext,useState,useEffect} from "react";

export const ReadListContext = createContext();


export function ReadListProvider({children}){
    const [readList,setReadList] = useState([]);

    useEffect(()=>{
        if(localStorage.getItem("readList")){
            setReadList(JSON.parse(localStorage.getItem("readList")));
        }
       
    },[])
    const addBookToReadList = (book) => {
        
            let filteredBook = {
                id: book.id,
                volumeInfo: book.volumeInfo
            }
            if(!readList.some(e => e.id === filteredBook.id)){
                let updatedList = [filteredBook, ...readList];
                localStorage.setItem("readList",JSON.stringify(updatedList));
                setReadList(updatedList)
            }
        
    }

    const removeBookFromReadList = (book) => {
       let filteredBooks = readList.filter(e => e.id !== book.id);
       localStorage.setItem("readList",JSON.stringify(filteredBooks));
       setReadList(filteredBooks);
    }

    return (
        <ReadListContext.Provider value={{ readList, addBookToReadList, removeBookFromReadList }}>
            {children}
        </ReadListContext.Provider>
    );
}