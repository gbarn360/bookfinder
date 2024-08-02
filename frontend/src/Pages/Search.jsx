import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from "axios"

export default function Search(){
    const navigate = useNavigate();

    const{query} = useParams();
    const [textInput,setTextInput] = useState(query || '');
    const [books,setBooks] = useState([]);
    const [bookAmount,setBookAmount] = useState(0);

    async function searchBooks(){
        try{
            let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}+subject&maxResults=20&startIndex=0&key=${process.env.REACT_APP_BOOKS_KEY}`)
            console.log(response)
            setBooks(response.data.items || []);
            setBookAmount(response.data.totalItems || [])
            setTextInput("");
        }
        catch(error){
            console.log(error)
            setBooks([]);
        }
       
    }
    useEffect(()=>{
        if(query)
        searchBooks();
    },[query])

    

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && textInput.trim()) {
            navigate(`/search/${encodeURIComponent(textInput.trim())}`);
        }
    };
    return(
        <div className='w-5/6 m-auto '>
            <div className='w-1/2 m-auto mb-10 '>
            <input value={textInput} onChange={(e)=>setTextInput(e.target.value)} onKeyDown={handleKeyDown} className=' py-1 border-2 w-full rounded-xl mt-10 text-sm pl-2' placeholder='Search now'/>   
            </div>

            {books.length > 0 && <h1 className=''>Found {bookAmount}</h1>}

         <div className=' flex flex-wrap justify-center gap-10'>
    
            {books.length > 0 && books.map((book, index) =>(
                
                <div index={index} className='flex flex-col   bg-red-50 border-2 w-1/4'>

            
                    {book.volumeInfo?.imageLinks?.thumbnail &&<img className='w-full object-contain ' src={book.volumeInfo.imageLinks.thumbnail} />}
                    <div className=''>
                        <h1 className='text-center font-bold text-lg'>{book.volumeInfo.title}</h1>
                        <span className='font-bold'>Authors:</span> {book.volumeInfo?.authors?.map((author, idx) => (
                                <h2 key={idx}>{author}</h2>
                            )) || 'No Authors'}
                        <h1><span className='font-bold'>Published: </span>{book.volumeInfo.publishedDate}</h1>
                    </div>

                    <button className='bg-blue-500 w-fit rounded-xl px-2 py-1 text-white '>Learn more</button>

                </div>
            ))
            }
            </div>
            
        </div>
    )
}