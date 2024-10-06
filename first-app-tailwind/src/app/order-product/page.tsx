"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {

    
    const param = useSearchParams();
    const navigate = useRouter();
    
    
    const handleClick:React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log('Order placed');
        
        console.log(param);
        
        navigate.push('/')
    }

    useEffect(() => {
        console.log(param.get('id'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
    <div>
      <h1>Order Product</h1>
      <button onClick = {handleClick}>Place Order</button>
    </div>
  )
}

export default Page
