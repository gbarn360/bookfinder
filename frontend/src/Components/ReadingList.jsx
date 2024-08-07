import React,{useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import "../index.css"
export default function ReadingList(){

    const[display,setDisplay] = useState(false);
    const[readingList,setReadingList] = useState([{img:"http://books.google.com/books/content?id=VIkrAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"},{img:"http://books.google.com/books/content?id=VIkrAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"},{img:"http://books.google.com/books/content?id=VIkrAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"},{img:"http://books.google.com/books/content?id=VIkrAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"},{img:"http://books.google.com/books/content?id=VIkrAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"},{img:"http://books.google.com/books/content?id=VIkrAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"},{img:"http://books.google.com/books/content?id=VIkrAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"},{img:"http://books.google.com/books/content?id=VIkrAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"},{img:"http://books.google.com/books/content?id=VIkrAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"},{img:"http://books.google.com/books/content?id=VIkrAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"}]);

    const scroll ={
        overflow: "auto",
        backgroundcolor:"red"
    }
    return(
        <div onClick={()=>setDisplay(!display)} className="fixed right-0 top-11 overflow-y-scroll h-screen scrollable " >

            <FontAwesomeIcon className="text-lg  w-full" icon={faBookmark} />


            <div className="flex flex-col gap-10 mx-1 items-center mt-5">
                {display && readingList.map((book,index)=>(
                    <div id={index} className="">
                        <img src={book.img} className="" />
                    </div>
                ))}
            </div>
            
        </div>
    )
}