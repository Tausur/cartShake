import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }
  const ref = useRef()
  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 sticky top-0 z-10 shadow-md bg-white'>
      <div className="logo mx-5">
        <Link className='cursor-pointer' href={'/'}><a><Image src='/logo-ecommerce.png' alt='' height={50} width={50} /></a></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-10 font-bold md:text-xl'>
          <Link href={'/tshirts'} className='cursor-pointer'><a><li>Tshirts</li></a></Link>
          <Link href={'/hoodies'} className='cursor-pointer'><a><li>Hoodies</li></a></Link>
          <Link href={'/stickers'} className='cursor-pointer'><a><li>Stickers</li></a></Link>
          <Link href={'/mugs'} className='cursor-pointer'><a><li>Mugs</li></a></Link>
        </ul>
      </div>
      <div className='cart absolute right-0 top-4 mx-5 cursor-pointer flex'>
        <Link href={'/login'} passHref><a><MdAccountCircle className='md:text-2xl'/></a></Link>
        <FaShoppingCart onClick={toggleCart} className='md:text-2xl mx-2' />
      </div>
      <div ref={ref} className={`h-[100vh] w-60 sideCart absolute top-0 right-0 bg-blue-100 px-8 py-10 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-3 cursor-pointer text-xl text-blue-500"><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 &&
            <div className='my-4'>No items in the cart. Please add a few items to checkout.</div>
          }
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <span className='w-2/3 font-semibold'>{cart[k].name}</span>
                <span className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-blue-500 cursor-pointer' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-blue-500 cursor-pointer' /></span>
              </div>
            </li>
          })}

        </ol>
        <div className="flex">
          <button className="flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />
            <Link href={'/checkout'}>Checkout</Link></button>
          <button onClick={clearCart} className="flex text-white bg-indigo-500 border-0 py-2 px-1 focus:outline-none hover:bg-indigo-600 rounded text-sm">Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar