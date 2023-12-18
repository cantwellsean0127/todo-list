import { useState, useEffect } from "react"

import Loading from "./Loading.jsx"
import CreateTodoItem from "./CreateTodoItem.jsx"
import TodoItemsContainer from "./TodoItemsContainer.jsx"

const App = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [todoItems, setTodoItems] = useState([])
    const [triggerReload, setTriggerReload] = useState(false)

    useEffect(() => {

        const fetchTodoItems = async () => {
            const res = await fetch("/api/todos")
            const data = await res.json()
            setTodoItems(data)
            setIsLoading(false)
        }

        fetchTodoItems()

    }, [])

    if (isLoading) {
        return <Loading />
    }

    else {

        const performReload = () => {
            setTriggerReload(!triggerReload)
        }

        const createTodoItem = (todoItem) => {
            setTodoItems([todoItem].concat(todoItems))
            performReload()
        }

        const updateTodoItem = (id, newTodoItem) => {
            const todoItem = todoItems.filter(todoItem => todoItem.id === id)[0]
            const todoItemIndex = todoItems.indexOf(todoItem)
            todoItems[todoItemIndex] = newTodoItem
            setTodoItems(todoItems)
            performReload()
        }

        const deleteTodoItem = (id) => {
            const todoItem = todoItems.filter(todoItem => todoItem.id === id)[0]
            const todoItemIndex = todoItems.indexOf(todoItem)
            const leftSide = todoItems.slice(0, todoItemIndex)
            const rightSide = todoItems.slice(todoItemIndex + 1)
            setTodoItems(leftSide.concat(rightSide))
            performReload()
        }

        return (
            <>
                < CreateTodoItem createTodoItem={createTodoItem} />
                < TodoItemsContainer todoItems={todoItems} updateTodoItem={updateTodoItem} deleteTodoItem={deleteTodoItem} />
            </>
        )
    }

}

export default App