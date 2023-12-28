import { Image } from "@chakra-ui/react";
import Link from "next/link";

const logo='/images/logo.png'

export default function Logo (){
  return (
    <Link href="/" passHref className="cursor-pointer w-[250px] mr-10">
      {logo ? <Image src={logo} alt="logo" objectFit={'cover'} /> : <span className="text-lg pt-1 font-bold">Shopify + Next.js</span>}
    </Link>
  )
}