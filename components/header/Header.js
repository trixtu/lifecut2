const Header = ({children}) => {

  return (
    <div className="border-b shadow-sm border-borderColor sticky top-0 z-50 inset-x-0 h-15 bg-white header">
      <header className="relative bg-white">
        {children}
      </header>
    </div>
  )
}

export default Header;