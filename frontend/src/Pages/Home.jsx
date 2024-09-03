import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import ReadingList from '../Components/ReadingList';
export default function Home(){

    const[textInput,setTextInput] = useState("");
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() =>{
        const timer = setTimeout(() => {
            setIsVisible(true);
        },100);
        return () => clearTimeout(timer);

    },[]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && textInput.trim()) {
            navigate(`/search/${encodeURIComponent(textInput.trim())}/20`);
        }
    };

    const classes = {
        base: 'transition-opacity duration-1000 ease-in-out',
        visible: 'opacity-100',
        hidden: 'opacity-0',
      };
      const combinedClassName = `${classes.base} ${isVisible ? classes.visible : classes.hidden}`;

    
    return(
        <div className='w-full h-screen'>
            <ReadingList />
            <div className='w-2/3 mt-40  m-auto flex flex-col items-center gap-y-6 '>
                <h1  className={`${combinedClassName} text-6xl text-center`}>Find your Next <span className='bg-blue-300 rounded-xl px-2'>Read</span></h1>
                <h2 className={`${combinedClassName} w-full md:w-1/2 text-lg  text-center`}>Search through thousands of books to find exactly what you're looking for...</h2>
                <input value={textInput} onChange={(e)=>setTextInput(e.target.value)} onKeyDown={handleKeyDown} className='w-full md:w-2/3 2xl:w-1/3 py-2 shadow-md  rounded-xl mt-10 text-sm pl-2 border-2 border-blue-300 outline-none placeholder-black' placeholder='Search now'/>
            </div>
            <div className='w-2/3 2xl:w-1/2 m-auto my-40 '>
                <h1 className={`${combinedClassName} text-4xl mb-20 text-center`}><span className='bg-blue-300 rounded-xl px-2 '>Fun Facts</span> about Reading</h1>
                <h3 className={`${combinedClassName} text-base text-left border-b- border-blue-50 w-fit`}>Reading for just <span className="text-blue-300 font-bold">six minutes</span> can reduce stress levels by <span className='text-blue-300 font-bold'>68%</span>.</h3>
                <div className={`${combinedClassName} w-5/6 h-40 border-b-4 border-l-4 my-4 m-auto border-blue-50`}></div>

                <h3 className={`${combinedClassName} text-base text-right `}>Reading can <span className='text-blue-300 font-bold'>reduce the risk</span> of developing Alzheimer's disease</h3>
                <div className={`${combinedClassName} w-5/6 h-40 border-r-4  border-b-4 my-4 m-auto border-blue-50`}></div>
                <h3 className={`${combinedClassName} text-base  w-fit`}>Reading can <span className='text-blue-300 font-bold'>improve sleep</span>.</h3>
                <div className={`${combinedClassName} w-5/6 h-40 border-b-4 border-l-4 my-4 m-auto border-blue-50`}></div>
                <h3 className={`${combinedClassName} text-base  text-right`} >Reading fiction has been shown to  <span className='text-blue-300 font-bold'>improve empathy</span>.</h3>
                <div className={`${combinedClassName} w-5/6 h-40 border-r-4  border-b-4 my-4 m-auto border-blue-50`}></div>
                <h3 className={`${combinedClassName} text-base  w-fit`}>Regular reading has been shown to <span className='text-blue-300 font-bold'>increase focus and concentration</span>.</h3>
            </div>
            <Footer />
        </div>
    )
}