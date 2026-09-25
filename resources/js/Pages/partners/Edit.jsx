export default function Edit() {
    return(
        <div>
            <h1>Edit Partner</h1>
            <form action="" method="post">
                <div>
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email" />
                </div>
                <div>
                    <label for="phone">Phone</label>
                    <input type="text" name="phone" id="phone" />
                </div>
                <div>
                    <label for="address">Address</label>
                    <input type="text" name="address" id="address" />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}