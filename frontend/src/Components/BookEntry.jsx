import react,{useState,useContext,useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ReadListContext } from '../Utility/ReadListContext';

export default function BookEntry({book,index,display}){

    const { readList,addBookToReadList,removeBookFromReadList } = useContext(ReadListContext);
    const [isAdded, setIsAdded] = useState(readList.some((e) => e.id === book.id));

    useEffect(() => {
        setIsAdded(readList.some((e) => e.id === book.id));
    }, [readList, book.id]);

    function updateListings(){
        if(isAdded){
            removeBookFromReadList(book)
        }
        else{
            addBookToReadList(book)
        }
    }
   
    return(
        <div onClick={()=>{display()}} key={index} className='flex flex-col justify-between w-1/2 sm:w-1/3 lg:w-1/5 xl:w-1/6 relative cursor-pointer'>
                        <button className='absolute text-lg right-1 bottom-0' onClick={(e)=>{e.stopPropagation();updateListings()}}>
                            <FontAwesomeIcon  className={ isAdded ? "text-blue-300" : "text-slate-300" } icon={faStar} />
                        </button>
                            <img className='w-full ' src={book.volumeInfo?.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                        <div className=''>
                        <h1 className='text-center font-bold text-lg'>{book.volumeInfo.title}</h1>


                            <div className='flex'>
                                <span className='mr-1'>by</span>
                                {book.volumeInfo?.authors ? <h1>{book.volumeInfo?.authors[0]}</h1> : null}
                                {book.volumeInfo?.authors?.length > 1 ? <span> ...</span> : null}
                            </div>
                        </div>
                    </div>
    )
}