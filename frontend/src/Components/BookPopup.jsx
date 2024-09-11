

import React,{useState,useContext,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {ReadListContext } from '../Utility/ReadListContext';
import { useNavigate } from 'react-router-dom';

export default function BookPopup({book,undisplay}){

    const{readList,addBookToReadList,removeBookFromReadList} = useContext(ReadListContext);
    const[isadded,setisadded] = useState(readList.some((e) => e.id === book.id));
    const navigate = useNavigate();

    useEffect(() => {
        setisadded(readList.some((e) => e.id === book.id));
        console.log(book.volumeInfo.publishedDate)
    }, [readList, book.id]);

    function updateListings(){
        if(isadded){
            removeBookFromReadList(book)
        }
        else{
            addBookToReadList(book)
        }
    }

    
    return(
        <div onClick={()=>undisplay()} className = {" fixed z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-45 flex justify-center items-center"}>

            <div onClick={(e)=>{e.stopPropagation()}} className='h-2/3 md:h-auto w-2/3 xl:w-1/3 md:w-1/2 bg-white  p-5 '>
                <div className='flex  gap-2 relative'>
                    <img className=' ' src={book.volumeInfo?.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                    <div className='flex flex-col justify-around'>
                        <div>
                            <h1 className=' text-xl'>{book?.volumeInfo?.title}</h1>
                            <span className='mr-1 font-bold'>by</span>
                            {book.volumeInfo?.authors.map((author,index)=>
                                (<span className='cursor-pointer hover:underline'  key={index} onClick={()=>{undisplay();navigate(`/search/${encodeURIComponent(author)}/20`)}}>{author}{index < book.volumeInfo?.authors.length - 1  && ", "}</span>))}

                            <br />
                            <span className='font-bold'>Published </span>
                            <span>{book.volumeInfo?.publishedDate}</span>
                            <br />
                            <span className='font-bold'>Published by </span>
                            <span>{book.volumeInfo?.publisher}</span>
                            <br />
                            <span className='font-bold'>Page-count </span>
                            <span>{book.volumeInfo?.pageCount}</span>
                        </div>

                        <div className=''>
                            <button onClick={()=>window.open(book.volumeInfo?.previewLink, '_blank')} className='bg-blue-500 py-1 px-2 rounded-xl text-white shadow-lg'>Preview</button>

                        </div>
                    </div>
                    <button className='absolute top-0 right-0 text-lg' onClick={(e)=>{e.stopPropagation();updateListings()}}>
                    <FontAwesomeIcon  className={isadded ? "text-blue-300" : "text-slate-300" } icon={faStar} />                    </button>
                </div>
                <p className='font-bold mt-2 text-sm'>{book.volumeInfo.subtitle}</p>
                <div className='h-1/2 overflow-y-auto '>
                    <p className='mt-4  md:overflow-auto'>{book?.volumeInfo?.description}</p>
                </div>

            

            </div>

        </div>
    )
}