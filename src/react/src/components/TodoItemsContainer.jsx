import TodoItem from "./TodoItem.jsx"

const TodoItemsContainer = ({ todoItems, updateTodoItem, deleteTodoItem }) => {

    return todoItems.map((todoItem) => {
        return <TodoItem todoItem={todoItem} key={todoItem.id} updateTodoItem={updateTodoItem} deleteTodoItem={deleteTodoItem} />
    })

}

export default TodoItemsContainer