import { getDocs,addDoc,deleteDoc,doc,updateDoc,} from 'firebase/firestore'
import {config} from './fireStore'

function Reducer(getInitState){
   return async function(action){
    const state = await getInitState()
    switch (action.type) {
        case "ADD_TODO":
            const newState = [...state,action.todo]
            addDoc(config.collectionRef,action.todo)
            return newState

        case "REMOVE_TODO":
            const docRef = doc(config.db,"todos",action.todo_id)
            await deleteDoc(docRef)
            return await setTodos()

        case "COMPLETE_TODO":
            const updateRef = doc(config.db,"todos",action.todo_id)
            await updateDoc(updateRef,{
                completed:true
            })
            return await setTodos()

        case "CLEAR_COMPLETED":
            const active_todos = state
            active_todos.forEach(async (todo)=>{
               if(todo.completed){
                const mydocRef = doc(config.db,"todos",todo.id)
                await deleteDoc(mydocRef)
               }
            })
            return await setTodos()
            
        default:
            return state;
    }
   }
}
export function filterTodos(action,todos){
    switch (action) {
     case "ACTIVE":
         return todos.filter(todo=>!todo.completed)
     case "COMPLETED":
     return todos.filter(todo=>todo.completed)
     default:
         return todos;
    }
 }

 export const setTodos = async ()=>{
    let todos =[]
    try {
        const snapshot = await getDocs(config.collectionRef)
        todos = snapshot.docs.map(doc=>{
            return {...doc.data(),id:doc.id}
        })
    } catch (error) {
        console.log(error)
    }
    return todos
}

export const dispatch = Reducer(setTodos)