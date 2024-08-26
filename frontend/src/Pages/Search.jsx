import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import BookEntry from '../Components/BookEntry';
import BookPopup from '../Components/BookPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ReadingList from "../Components/ReadingList";
import { useQuery} from '@apollo/client';
import { SEARCH_BOOKS } from '../Utility/gql';
import Loading from "../Components/Loading";
import Error from '../Components/Error';




export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const { query } = useParams();
    const { count } = useParams();
    const [currentCount, setCurrentCount] = useState(Number(count) || 0);
    const [displayPopup, setDisplayPopup] = useState(false);
    const [displayedBook, setDisplayedBook] = useState();

    const { loading, error, data } = useQuery(SEARCH_BOOKS, {
        variables: { query, count: currentCount },
        skip: !query || !currentCount,

    });

    // Update currentCount based on URL changes
    useEffect(() => {
        setCurrentCount(Number(count) || 20);
    }, [location]);

    // Handle navigation
    function updateListings(direction) {
        if (direction === "left" && currentCount > 0) {
          const newCount = Math.max(currentCount - 20, 0);
          navigate(`/search/${encodeURIComponent(query)}/${newCount}`);
        } else if (direction === "right" && currentCount + 20 < bookAmount) {
          const newCount = currentCount + 20;
          navigate(`/search/${encodeURIComponent(query)}/${newCount}`);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      

    const books = data?.searchBooks.items || [];
    const bookAmount = data?.searchBooks.totalItems || 0 // Adjust this based on actual API response or requirements

    return (
        <div className='m-auto relative'>
            <Navbar />
            <ReadingList displayBook={(book) => { setDisplayPopup(true); setDisplayedBook(book); }} />
            {loading ? (<Loading />) : null}
            {error ? (<Error message={error.message}/>) : null}
            {books.length ? (
                <div className='mt-20 m-auto w-full md:w-5/6 2xl:w-2/3'>
                    <h1 className='text-center md:text-left'>{Number(currentCount - 20)}-{currentCount} of {bookAmount} results</h1>
                    <div className='flex flex-wrap justify-center gap-10'>
                        {books.map((book, index) => (
                            <BookEntry key={index} display={() => { setDisplayPopup(true); setDisplayedBook(book); }} book={book} index={index} />
                        ))}
                    </div>
                    {displayPopup ? <BookPopup undisplay={() => { setDisplayPopup(false); setDisplayedBook(); }} book={displayedBook} /> : null}
                    {books.length ? (
                        <div className='flex justify-between w-1/6 my-10 m-auto'>
                            <button onClick={() => updateListings("left")}><FontAwesomeIcon className='text-xl' icon={faArrowLeft} /></button>
                            <h1 className=''>{(currentCount / 20)}</h1>
                            <button onClick={() => updateListings("right")}><FontAwesomeIcon className='text-xl' icon={faArrowRight} /></button>
                        </div>
                    ) : null}
                </div>
            ) : <div className='w-full h-screen'></div>}

            <Footer />
        </div>
    );
}
