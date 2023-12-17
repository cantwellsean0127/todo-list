const CreateTodoItem = ({ createTodoItem }) => {

    const handleSubmit = async (event) => {
        event.preventDefault()
        const task = event.target.querySelector("input").value
        const res = await fetch("/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task })
        })
        const data = await res.json()
        createTodoItem(data)
    }

    return (
        <form className="create-todo-item" onSubmit={handleSubmit}>
            <input type="text" />
            <button type="submit">Add</button>
        </form>
    )

}

export default CreateTodoItem