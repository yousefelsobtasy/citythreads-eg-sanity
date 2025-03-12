'use client'
import { useEffect, useState } from 'react'

const Collections = () => {
    const [count, setCount] = useState(0)

    // useEffect(() => {
    //     const cart = localStorage.getItem('cart')
    //     if (cart) {
    //         setCount(JSON.parse(cart).count)
    //     }
    // }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify({ count }))
        const cartCount = document.querySelector('#cartCount')
        if (count && cartCount) {
            cartCount.style.display = 'flex'
            cartCount.textContent = count
        } else if (cartCount) {
            cartCount.style.display = 'none'
        }
    }, [count])

    return (
        <>
            <div>Collections</div>
            <div onClick={_ => setCount(prev => prev + 1)}>+</div>
            <div onClick={_ => setCount(prev => prev > 0 ? prev - 1 : 0)}>-</div>
        </>
    )
}

export default Collections