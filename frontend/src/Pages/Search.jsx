import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import BookEntry from '../Components/BookEntry';
import BookPopup from '../Components/BookPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ReadingList from "../Components/ReadingList"


import axios from 'axios';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const { query } = useParams();
    const { count } = useParams();

    const [books, setBooks] = useState([]);
    const [bookAmount, setBookAmount] = useState(0);
    const [currentCount, setCurrentCount] = useState(Number(count) || 0);
    const [displayPopup,setDisplayPopup] = useState(false);
    const [displayedBook,setDisplayedBook] = useState();

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
                book.volumeInfo && book.volumeInfo.imageLinks && Object.keys(book.volumeInfo.imageLinks).length && Object.keys(book.volumeInfo.imageLinks).length > 0 
            );
            setBooks(filteredBooks.slice(0,20) || []);
            setBookAmount(response.data.totalItems);
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
        <div className=' m-auto relative'>
           
            <Navbar />
            <ReadingList displayBook={(book)=>{setDisplayPopup(true);setDisplayedBook(book)}}/>


            {books.length  ? 
            <div className='mt-20 m-auto w-full md:w-5/6  2xl:w-2/3 '>
                {books.length  && (
                    <h1 className='text-center md:text-left'>{Number(currentCount - 20)}-{currentCount} of {bookAmount} results </h1>
                )}
                <div className='flex flex-wrap justify-center gap-10'>
                    {books.length  && books.map((book, index) => (
                        <BookEntry display={()=>{setDisplayPopup(true);setDisplayedBook(book)}} book={book} index={index}/>
                    ))}
                </div>
                {displayPopup ? <BookPopup undisplay={()=>{setDisplayPopup(false);setDisplayedBook()}} book={displayedBook} />: <div> </div>}
                

                {books.length  ?
                 <div className='flex justify-between w-1/6  my-10 m-auto  '>
                    <button onClick={() => updateListings("left")}><FontAwesomeIcon className='text-xl' icon={faArrowLeft} /></button>
                    <h1 className=''>{(currentCount / 20)}</h1>
                    <button onClick={() => updateListings("right")}><FontAwesomeIcon className='text-xl' icon={faArrowRight} /></button>
                </div> : null}
            </div>
            : <div className='w-full h-screen'> </div>}

            <Footer />
           
        </div>
    );
}
