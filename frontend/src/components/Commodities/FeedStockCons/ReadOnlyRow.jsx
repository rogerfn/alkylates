import React from 'react'

const ReadOnlyRow =({data})=>{
    return(
<tr>

<td>{data.site}</td>
<td>{data.feedstock}</td>
<td>{data.c10}</td>
<td>{data.c11}</td>
<td>{data.c12}</td>
<td>{data.c13}</td>
<td>{data.c14}</td>
<td>{data.c15}</td>
<td>{data.c16}</td>
<td>{data.c17}</td>
<td>{data["c18+"]}</td>
<td>{data["c9-"]}</td>
<td>{data.TNP}</td>

</tr>
    )
}

export default ReadOnlyRow;