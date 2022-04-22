import React from 'react'
import Link from 'next/link'
import Product from '../models/Product'
import connectDB from '../middleware/mongoose'
import mongoose from "mongoose"

const Tshirts = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {products.map((item) => {

              return <Link key={item._id} href={`/product/${item.slug}`} passHref>
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-xl m-2">
                  <a className="block relative rounded overflow-hidden">
                    <img className='m-auto md:mx-0 block' alt="ecommerce" src={item.img} />
                  </a>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">${item.price}</p>
                    <p className='mt-1'>S , M, L, XL , XXL</p>
                  </div>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find()
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }
  }
}

export default Tshirts