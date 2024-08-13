

import React from 'react';

export default function BookPopup({book,undisplay}){
    return(
        <div onClick={()=>undisplay()} className = {" fixed top-0 left-0 w-full h-screen bg-black bg-opacity-45 flex justify-center items-center"}>

            <div onClick={(e)=>{e.stopPropagation()}} className='w-1/2  bg-white  p-5 '>
                <div className='flex  gap-2'>
                    <img className=' ' src={book.volumeInfo?.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                    <div className='flex flex-col justify-around'>
                        <div>
                            <h1 className=' text-xl'>{book?.volumeInfo?.title}</h1>
                            <span className='mr-1 font-bold'>by</span>
                            <span>{book.volumeInfo?.authors.join(', ')}</span>
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
                </div>
                <p className='font-bold mt-2 text-sm'>{book.volumeInfo.subtitle}</p>

                <p className='mt-4'>{book?.volumeInfo?.description}</p>

            

            </div>

        </div>
    )
}