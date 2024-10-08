import React,{useState,useContext,useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import "../index.css"
import { ReadListContext } from "../Utility/ReadListContext";
export default function ReadingList({displayBook}){

    const[display,setDisplay] = useState(false);
    const {readList, removeBookFromReadList} = useContext(ReadListContext)
    
    useEffect(()=>{
        setDisplay(true);
    },[readList])
    return(
        <div  className={ `fixed right-1 top-5 overflow-y-scroll h-screen scrollable z-40  ${display && readList.length > 0 ? "shadow-lg bg-white" : ""}`} >

            <div className=" flex justify-end">
                <FontAwesomeIcon onClick={()=>{setDisplay(!display);}} className={`text-lg  ${display && readList.length > 0 ? " text-blue-300" : "text-slate-300"}  cursor-pointer`} icon={faBookmark} />
            </div>


            <div className={`flex flex-col gap-10 mx-1   mt-5 -right-4 ${display && readList.length > 0 ? "display -translate-x-0" : "display translate-x-40"}  `}>
                {display && readList.map((book,index)=>(
                    <div   id={index} className=" cursor-pointer">
                        <img onClick={()=>{setDisplay(false);displayBook(book)}} src={book.volumeInfo.imageLinks.thumbnail} className="" />
                        <div className="flex justify-end">
                            <button onClick={(e)=>{removeBookFromReadList(book)}}> remove</button>
                        </div>
                    </div>
                
                ))}
            </div>
            
        </div>
    )
}