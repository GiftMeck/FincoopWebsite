export default function Edit() {
    return(
        <div>
            <h1>Edit Advert</h1>
            <form action="/verts" method="post">
                <input type="hidden" name="_method" value="put"/>
                <input type="hidden" name="_token" value="token"/>
                <input type="text" name="title" placeholder="Title"/>
                <input type="text" name="description" placeholder="Description"/>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}