import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
export default function Home(){

    const[textInput,setTextInput] = useState("");
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && textInput.trim()) {
            navigate(`/search/${encodeURIComponent(textInput.trim())}/20`);
        }
    };
    return(
        <div className='w-full h-screen'>
            <div className='w-2/3 mt-40  m-auto flex flex-col items-center gap-y-6'>
                <h1 className='text-6xl text-center'>Find your Next <span className='text-blue-500'>Read</span></h1>
                <h2 className='text-lg w-1/2 text-center'>Search for books based on a title, author, or by subject</h2>
                <input value={textInput} onChange={(e)=>setTextInput(e.target.value)} onKeyDown={handleKeyDown} className='py-1 border-2 w-1/2 rounded-xl mt-10 text-sm pl-2' placeholder='Search now'/>
            </div>
            <div className='w-2/3 m-auto flex-col items-center mt-40'>
                <h1 className='text-4xl flex flex-col items-center'>Fun Facts about Reading</h1>
                <h3>Reading for just six minutes can reduce stress levels by 68%</h3>
                <h3>Reading can reduce the risk of developing Alzheimer's disease</h3>
                <h3>Reading can improve sleep</h3>
            </div>
        </div>
    )
}