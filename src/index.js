import { onSnapshot } from "firebase/firestore"
import {
    injectTodos,
    setTodos,
    renderDOM,
    dispatch,
    setTheme,
    filterTodos,
    config,
} from "./modules/"


let isLight = true

const form  = (document.querySelector('.add-todo-form'))
const input = document.querySelector('.todo-content')
const clearBtn = document.querySelector('.clear')
const allFilter = document.querySelectorAll('.all')
const activeFilter = document.querySelectorAll('.active')
const completedFilter = document.querySelectorAll('.completed')

const toggleThemeBtn = document.querySelector(".toggleTheme")

toggleThemeBtn.addEventListener('click',()=>{
renderDOM(toggleTheme,setTheme)
})



clearBtn.addEventListener('click',function(){
    renderDOM(()=>dispatch({type:"CLEAR_COMPLETED"}),injectTodos)
})

completedFilter.forEach(com=>{
    com.addEventListener('click',()=>{
        const getFilters =async ()=>filterTodos("COMPLETED",await setTodos())
        renderDOM(getFilters,injectTodos)
    })
})
activeFilter.forEach(active=>{
    active.addEventListener('click',()=>{
        const getFilters = async()=>filterTodos("ACTIVE",await setTodos())
        renderDOM(getFilters,injectTodos)
    })
})
allFilter.forEach(all=>{
    all.addEventListener('click',()=>{
        const getFilters = async()=>filterTodos("ALL",await setTodos())
        renderDOM(getFilters,injectTodos)
    })
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(input.value === "" || input.value.startsWith(" ") || input.value.endsWith(" ") ){
        form.style.border = "1px solid red"
    }else{
        form.style.border = null
        const setTodoState = async() => dispatch({
             type:"ADD_TODO",
             todo:{
                name:input.value,
                completed:false,
            }
        })
        renderDOM(setTodoState,injectTodos)
    }
})



function toggleTheme(){
   isLight = !isLight
   return isLight?"light":"dark"
   
}

window.addEventListener("load",async()=>{ 
    const initState = ()=>{
        return{
            theme:"light",
            todos:[]      
        }
    }
    renderDOM(initState,(state)=>{
      setTheme(state.theme)
      injectTodos(state.todos)
    })
})

onSnapshot(config.collectionRef,(snapshot)=>{
  const getUpdatedState = () => snapshot.docs.map(doc=>{
    return {...doc.data(),id:doc.id}
  })
  renderDOM(getUpdatedState,injectTodos)
})

console.log(document.getElementsByTagName("p"))

