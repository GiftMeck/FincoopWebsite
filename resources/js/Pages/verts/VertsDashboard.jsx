import Create from "./Create";
import Edit from "./Edit";
import Index from "./Index";
export default function VertsDashboard({verts}) {
  return(
    <>
      <Index verts={verts} />
      <Create />
      <Edit />
    </>
  )
}