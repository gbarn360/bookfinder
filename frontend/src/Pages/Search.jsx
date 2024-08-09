import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import BookEntry from '../Components/BookEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


import axios from 'axios';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const { query } = useParams();
    const { count } = useParams();

    const [books, setBooks] = useState([]);
    const [bookAmount, setBookAmount] = useState(0);
    const [currentCount, setCurrentCount] = useState(Number(count) || 0);

    // Update currentCount based on URL changes
    useEffect(() => {
        setCurrentCount(Number(count) || 20);
    }, [location]);

    useEffect(() => {
        if (query) {
            searchBooks();
        }
    }, [query, currentCount]);

    async function searchBooks() {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=25&startIndex=${currentCount - 20}&key=${process.env.REACT_APP_BOOKS_KEY}`);

            let filteredBooks = response.data.items.filter(book => 
                book.volumeInfo && book.volumeInfo.imageLinks && Object.keys(book.volumeInfo.imageLinks).length > 0 && book.volumeInfo.industryIdentifiers[0].type !== "OTHER" 
            );
            setBooks(filteredBooks.slice(0,20) || []);
            setBookAmount(response.data.totalItems);
            console.log(filteredBooks);
        } catch (error) {
            console.log(error);
            setBooks([]);
        }
    }

    function updateListings(direction) {
        if (direction === "left" && currentCount > 0) {
            navigate(`/search/${encodeURIComponent(query)}/${Math.max(currentCount - 20, 0)}`);
           
        } else if (direction === "right" && currentCount + 20 < bookAmount) {
            navigate(`/search/${encodeURIComponent(query)}/${currentCount + 20}`);
            
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

   
    return (
        <div className='w-5/6 m-auto relative'>
           
            <Navbar />
            <div className='mt-20'>
                {books.length > 0 && (
                    <h1>{Number(currentCount - 20)}-{currentCount} of {bookAmount} results</h1>
                )}
                <div className='flex flex-wrap justify-center gap-10'>
                    {books.length > 0 && books.map((book, index) => (
                        <BookEntry book={book} index={index}/>
                    ))}
                </div>
                

                {books.length > 0 ? <div className='flex justify-between w-1/6  my-10 m-auto  '>
                    <button onClick={() => updateListings("left")}><FontAwesomeIcon className='text-xl' icon={faArrowLeft} /></button>
                    <button onClick={() => updateListings("right")}><FontAwesomeIcon className='text-xl' icon={faArrowRight} /></button>
                </div> : null}
            </div>
           
        </div>
    );
}
