export default function Edit() {
    return(
        <div>
            <h1>Edit Gallery</h1>
            <form action="/gallery" method="post">
                <input type="hidden" name="_method" value="put"/>
                <input type="hidden" name="_token" value="token"/>
                <input type="text" name="title" placeholder="Title"/><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}