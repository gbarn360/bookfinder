import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import ReadingList from '../Components/ReadingList';
import BookEntry from '../Components/BookEntry';
import axios from 'axios';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const { query } = useParams();
    const { count } = useParams();

    const [textInput, setTextInput] = useState(query || '');
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

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && textInput.trim()) {
            navigate(`/search/${encodeURIComponent(textInput)}/20`);
        }
    };

    return (
        <div className='w-5/6 m-auto'>
            <div className='w-1/2 m-auto mb-10'>
                <input
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className='py-1 border-2 w-full rounded-xl mt-10 text-sm pl-2'
                    placeholder='Search now'
                />
            </div>

            {books.length > 0 && (
                <h1>{Number(currentCount - 20)}-{currentCount} of {bookAmount} results</h1>
            )}
            <div className='flex'>
            <div className='flex flex-wrap justify-center gap-10'>
                {books.length > 0 && books.map((book, index) => (
                    <BookEntry book={book} index={index}/>
                ))}
            </div>
            <ReadingList />
            </div>
            

            <div className='flex justify-center m-10'>
                <button onClick={() => updateListings("left")}>left</button>
                <button onClick={() => updateListings("right")}>right</button>
            </div>
        </div>
    );
}
