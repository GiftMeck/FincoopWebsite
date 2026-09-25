export default function Edit() {
    return(
        <div>
            <h1>Editar Cliente</h1>
            <form>
                <div>
                    <label>Nombre</label>
                    <input type="text" name="name" />
                </div>
                <div>
                    <label>Apellido</label>
                    <input type="text" name="last_name" />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" />
                </div>
                <div>
                    <label>Telefono</label>
                    <input type="text" name="phone" />
                </div>
                <div>
                    <label>Direccion</label>
                    <input type="text" name="address" />
                </div>
                <div>
                    <label>Fecha de Nacimiento</label>
                    <input type="date" name="birth_date" />
                </div>
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}