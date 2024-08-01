import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from "axios"

export default function Search(){
    const navigate = useNavigate();

    const{query} = useParams();
    const [textInput,setTextInput] = useState(query || '');
    const [books,setBooks] = useState([]);


    async function searchBooks(){
        try{
            let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}+subject&key=${process.env.REACT_APP_BOOKS_KEY}`)
            console.log(response)
            setBooks(response.data.items || []);
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
        <div>
            <input value={textInput} onKeyDown={handleKeyDown} onChange={(e)=>setTextInput(e.target.value)} type='text' placeholder='search...' />
            <div className=' flex flex-wrap justify-center'>
            {books.length > 0 && <h1>Results found {books.length}</h1>}
            {books.length > 0 && books.map((book, index) =>(
                
                <div index={index} className='flex border-2 w-1/4 m-2'>

                    {book.volumeInfo?.imageLinks?.thumbnail &&<img src={book.volumeInfo.imageLinks.thumbnail} />}
                    <div>
                        <h1>{book.volumeInfo.title}</h1>
                        <span>Authors:</span> {book.volumeInfo?.authors?.map((author, idx) => (
                                <h2 key={idx}>{author}</h2>
                            )) || 'No Authors'}
                        <h1><span>Published: </span>{book.volumeInfo.publishedDate}</h1>
                    </div>

                </div>
            ))
            }
            </div>
            
        </div>
    )
}