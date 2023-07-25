// <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>name</th>
//                 <th>price</th>
//                 <th>category</th>
//               </tr>
//             </thead>

//             <tbody>
//               {data.length > 0 &&
//                 data.map((dataObj, index) => (
//                   <tr>
//                     <td>{dataObj.productName}</td>
//                     <td>{dataObj.productPrice}</td>
//                     <td> {dataObj.category}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </Table>