import { Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FaMagnifyingGlass} from "react-icons/fa6"

const Search = () => {
  const [phrase, setPhrase] = useState('')
  const [products, setProducts] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // useEffect(() => {
  //   if (phrase.length > 0) {
  //     axios
  //       .get('/api/products?phrase=' + encodeURIComponent(phrase))
  //       .then((response) => {
  //         setProducts(response.data)
  //       })
  //     setIsOpen(true)
  //   } else {
  //     setIsOpen(false)
  //   }
  // }, [phrase])

  return(
    <>
      <div className="relative w-full mr-10 pb-2 md:pb-0">
        <div className="relative flex items-center bg-[#f2f2ee]  ">
          <input
            className="
              w-full 
              m-0 
              bg-[#f2f2ee]  
              focus:ring-none 
              focus:border-[#d5d5d1]
              h-[38px]
              border
              border-[#d5d5d1]
              p-3
              outline-none
            "
            placeholder="Suchen …"
            onChange={(e) => setPhrase(e.target.value)}
            value={phrase}
          />
          <span className="px-2 border-[#505050] border-r border-b border-t p-[6px] text-[#fff] bg-[#505050] ">
            <button className="flex items-center h-[24px] px-1">
             
                <FaMagnifyingGlass size={15} />
             
            </button>
          </span>
        </div>

        {/* <SearchResult
          products={products}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        /> */}
      </div>
    </>
  )
}
export default Search