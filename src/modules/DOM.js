import {dispatch} from './actions'

export function createElement({el,idname="",className=[],children=[],events=[],attr=[]}){
    
    const element = document.createElement(el)
    element.id = idname
   
     className.forEach(cls=>{
       if(cls !== ""){
        element.classList.add(cls)
       }
     })

    events.forEach(event=>{
       element.addEventListener(event.type,event.callBack)
    })
    attr.forEach(att=>{
       element[att.name] = att.value
    })
    children.forEach(child=>{
       element.appendChild(child)
    })

    return element
}

export function createTextNode(text){
 return document.createTextNode(text)
}
export function setTheme(theme){
    const components = document.querySelectorAll('.component')
    const header = document.querySelector('.header')
    const body = document.querySelector('body')
    const image = document.querySelector('.toggleThemeImage')
 
    const removedClass = theme==="dark"?"light":"dark"

    components.forEach(component =>{
        component.classList.add(theme)
        component.classList.remove(removedClass)
    })
    header.classList.add(theme)
    header.classList.remove(removedClass)

    body.classList.add(theme)
    body.classList.remove(removedClass)
    image.src= theme==="light"?"./images/icon-moon.svg":"./images/icon-sun.svg"
}
export async function renderDOM(setInitState,render){
    const newState = await setInitState()
    render(newState)
}
export async function updateEffect({getInitialState,getUpdatedState,render}){
   renderDOM(getInitialState,render)
   if((typeof getUpdatedState === "function")){
     const updatedState = await getUpdatedState()
     if(updatedState !== null || (typeof updatedState !== "undefined")){
        renderDOM(getUpdatedState,render)
     }
      
   }
}

export function injectTodos(state){
    const todoList = document.querySelector('#todo-list')
    const total = document.querySelector('.total-text')
    const todos = state
    const mainContainer = createElement({
    el:"div",
    children:todos.map((value)=> createElement({
          el:'li',
          children:[
              createElement({
                  el:"div",
                  className:[
                      "checkbox",
                      (value.completed?"checked":"")
                  ],
                  children:value.completed?[
                      createElement({
                          el:"i",
                          className:[
                              "bi",
                              "bi-check"
                          ]
                      })
                  ]:[],
                  events:[
                  {
                      type:"click",
                      callBack(){
                      console.log(value.id)
                      const deleteTodo =()=>dispatch({
                          type:"COMPLETE_TODO",
                          todo_id:value.id
                      })
                      renderDOM(deleteTodo,injectTodos)
                      }
                  }
                  ]
              }),
              createElement({
                  el:"p",
                  children:[
                      createTextNode(value.name)
                  ],
                  className:[
                      value.completed ? "completed":""
                  ],
              }),
              createElement({
                  el:"span",
                  className:[
                      "close"
                  ],
                  events:[
                      {
                       type:"click",
                       callBack(){
                          const deleteTodo =()=>dispatch({
                              type:"REMOVE_TODO",
                              todo_id:value.id
                          })
                          renderDOM(deleteTodo,injectTodos)
                       }
                      }
                  ],
                  children:[
                      createTextNode("x")
                  ]
              })
          ]
      
      
      })
      )
    })
    todoList.replaceChildren(mainContainer)
    total.innerHTML = state.filter(value=>!value.completed).length
  }
