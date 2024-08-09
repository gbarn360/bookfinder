import react,{useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function BookEntry({book,index}){

    const[added,setAdded] = useState(false);

    function addBookToReadList(){
        setAdded(!added)
        //add book to read list
    }
    return(
        <div key={index} className='flex flex-col justify-between w-1/5 relative '>
                        <button className='absolute text-lg right-1 bottom-0' onClick={()=>{addBookToReadList()}}>
                            <FontAwesomeIcon  className={added ? "text-red-600" : "text-slate-300" } icon={faStar} />
                        </button>
                            <img className='w-full ' src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
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
    )
}