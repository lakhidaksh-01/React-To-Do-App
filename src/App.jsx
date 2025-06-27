import { useState,useEffect } from 'react'

function App() {
  const [currtsk, settsk] = useState('')
  const [list, setlist] = useState([])
  const [init,setinit]=useState(true) // <-- flag to skip saving on first load

  //load the list from local storage
  useEffect(()=>{
    const savedlist=JSON.parse(localStorage.getItem('list')) //parse the string to an array
    if(savedlist){
      setlist(savedlist)
    }
  },[]);


  useEffect(()=>{
    if(!init){
    localStorage.setItem('list',JSON.stringify(list)) //stringify the array to a string
    }else{
      setinit(false) // <-- set the flag to false to save on subsequent loads
    }
  },[list]);



//add a task to the list
  const add=()=>{
    if(currtsk){
      setlist([...list,currtsk])
      settsk('')
    }
  }

//remove a task from the list
  const remove=(index)=>{
    setlist(
      list.filter((_,i)=>index!=i)
    )
  }


  return (
    <>
     <h1>To-Do List React App</h1>
     <h5>Made by <a href="https://www.linkedin.com/in/daksh-lakhi" target="_blank" rel="noopener noreferrer">Daksh Lakhi</a></h5>
     <div className="input-section"><input type="text" value={currtsk} onChange={(e)=>settsk(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && add()} /><button onClick={add} className="add-btn">Add</button></div>
     <ul className="task-list">
      {
        list.map((item,index)=>{
          return <li key={index} className="task-item">{item}<button onClick={()=>remove(index)} className="remove-btn">remove</button></li>
        })
      }
     </ul>
     
    </>
  )
}

export default App