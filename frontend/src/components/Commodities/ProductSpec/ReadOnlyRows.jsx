import React from 'react'

const ReadOnlyRows =({data})=>{
    return(
<tr>


<td>{data.feedstock}</td>
            <td>{data.unit}</td>
            <td>{data["2019-09-01"]}</td>
            <td>{data["2019-10-01"]}</td>
            <td>{data["2019-11-01"]}</td>
            <td>{data["2019-12-01"]}</td>
            <td>{data["2020-01-01"]}</td>
            <td>{data["2020-02-01"]}</td>
            <td>{data["2020-03-01"]}</td>
            <td>{data["2020-04-01"]}</td>
            <td>{data["2020-06-01"]}</td>
            <td>{data["2020-07-01"]}</td>
            <td>{data["2020-08-01"]}</td>
            <td>{data["2020-09-01"]}</td>
            <td>{data["2020-10-01"]}</td>
            <td>{data["2020-11-01"]}</td>
            <td>{data["2020-12-01"]}</td>
            <td>{data["2021-01-01"]}</td>
            <td>{data["2021-02-01"]}</td>
            <td>{data["2021-03-01"]}</td>
            <td>{data["2021-04-01"]}</td>
            <td>{data["2021-05-01"]}</td>
            <td>{data["2021-06-01"]}</td>
            <td>{data["2021-07-01"]}</td>
            <td>{data["2021-08-01"]}</td>
            <td>{data["2021-09-01"]}</td>
            <td>{data["2021-10-01"]}</td>
            <td>{data["2021-11-01"]}</td>
            <td>{data["2021-12-01"]}</td>
           

</tr>
    )
}

export default ReadOnlyRows;