import React,{useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Navbar(){
    const navigate = useNavigate();
    const { query } = useParams();
    const [textInput, setTextInput] = useState(query);

    useEffect(()=>{
        setTextInput(query)
    },[query])

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && textInput.trim()) {
            navigate(`/search/${encodeURIComponent(textInput)}/20`);
        }
    };
    return(
        <div className='fixed top-0 left-0 bg-white z-10 w-full h-14 shadow-md flex justify-center '>
            <a href='/' className='font-bold text-xl text-blue-500 absolute  left-3 top-4 '>BookFind</a>
            <div className='w-1/2 m-auto'>
                <input
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className='py-1 border-2 w-full rounded-xl  text-sm pl-2'
                    placeholder='Search now'
                />
                
            </div>
            
        </div>
    )
}