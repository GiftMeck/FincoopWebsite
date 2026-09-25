export default function Edit() {
    return(
        <div>
            <h1>Edit Branch</h1>
            <form action="/branches" method="post">
                <input type="hidden" name="_method" value="put"/>
                <input type="hidden" name="_token" value="token"/>
                <input type="text" name="name" placeholder="Branch Name"/>
                <input type="text" name="address" placeholder="Branch Address"/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}