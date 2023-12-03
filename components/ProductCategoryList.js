import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCategoryList = ({ title, image }) => {
  return (
    <li className="float-left cardItem">
      <Image
        src={image}
        className="w-full"
        height={300}
        width={800}
        alt={title}
        priority
      />
      <span className="CardItem-Title">{title}</span>
    </li>
  )
}

export default ProductCategoryList
