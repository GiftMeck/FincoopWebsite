export default function Index({verts}) {
    return(
        <div className="flex flex-col">
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold">Advertisements</h1>
                {verts && (verts.map((vert) =>{
                    return(
                        <div className="flex flex-col">
                            <div>
                                <img src={`Storage/${vert.advert_image}`} alt="Advert Image" width={200} height={200}/>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{vert.advert_title}</h2>
                                <p className="text-gray-500">{vert.advert_description}</p>
                                <p className="text-gray-500">{vert.advert_link}</p>
                            </div>
                        </div>  
                    )
                }))}
            </div>
        </div>
    )
}