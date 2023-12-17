const IsFinishedIcon = ({ todoItem, updateTodoItem }) => {

    const handleOnClick = async () => {

        const res = await fetch("/api/todos", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: todoItem.id, task: todoItem.task, is_finished: !todoItem.is_finished })
        })
        const data = await res.json()
        updateTodoItem(todoItem.id, data)
    }

    if (todoItem.is_finished) {
        return <img className="is-finished-icon" alt="checked box" src="/images/finished.png" onClick={handleOnClick} />
    } else {
        return <img className="is-finished-icon" alt="uncheck box" src="/images/unfinished.png" onClick={handleOnClick} />
    }

}

export default IsFinishedIcon