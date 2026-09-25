export default function Edit() {
    return(
        <div>
            <h1>Edit Contact</h1>
            <form>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="text" name="phone" />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}