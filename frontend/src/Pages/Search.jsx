import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
        setCurrentCount(Number(count) || 0);
    }, [location]);

    useEffect(() => {
        if (query) {
            searchBooks();
        }
    }, [query, currentCount]);

    async function searchBooks() {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}+intitle&maxResults=20&startIndex=${currentCount}&key=${process.env.REACT_APP_BOOKS_KEY}`);
            setBooks(response.data.items || []);
            setBookAmount(response.data.totalItems || 0);
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
            navigate(`/search/${encodeURIComponent(textInput)}/0`);
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
                <h1>{Number(currentCount)}-{currentCount + 20} of {bookAmount} results</h1>
            )}

            <div className='flex flex-wrap justify-center gap-10'>
                {books.length > 0 && books.map((book, index) => (
                    <div key={index} className='flex flex-col border-2 w-1/5'>
                        {book.volumeInfo?.imageLinks?.thumbnail && (
                            <img className='w-full m-auto' src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                        )}
                        <div className=''>
                            <h1 className='text-center font-bold text-lg'>{book.volumeInfo.title}</h1>
                            <div className='flex'>
                                <span className='mr-1'>by</span>
                                {book.volumeInfo?.authors?.map((author, idx) => (
                                    <h2 key={idx}>{author}</h2>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-center m-10'>
                <button onClick={() => updateListings("left")}>left</button>
                <button onClick={() => updateListings("right")}>right</button>
            </div>
        </div>
    );
}
