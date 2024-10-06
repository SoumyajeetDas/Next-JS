import React from 'react'
import IProductType from '../../../types/IProductType'
// type productIdType =  {
//     params:{
//         productId:string
//     }
// }
const page:React.FC<IProductType> = ({params}) => {
  return (
    <h1>
      The productId is {params.productId}
    </h1>
  )
}

export default page
