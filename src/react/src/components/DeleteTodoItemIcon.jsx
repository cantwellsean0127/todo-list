const DeleteTodoItem = ({ todoItem, deleteTodoItem }) => {

    const handleOnClick = async () => {

        await fetch("/api/todos", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: todoItem.id })
        })
        deleteTodoItem(todoItem.id)
    }

    return <img className="delete-icon" src="/images/delete.png" alt="delete icon" onClick={handleOnClick} />

}

export default DeleteTodoItem