import IsFinishedIcon from "./IsFinishedIcon.jsx"
import DeleteTodoItemIcon from "./DeleteTodoItemIcon.jsx"

const TodoItem = ({ todoItem, updateTodoItem, deleteTodoItem }) => {

    return (
        <div className="todo-item">
            <IsFinishedIcon todoItem={todoItem} updateTodoItem={updateTodoItem} />
            <h1 className="todo-task">{todoItem.task}</h1>
            <DeleteTodoItemIcon todoItem={todoItem} deleteTodoItem={deleteTodoItem} />
        </div>
    )

}

export default TodoItem