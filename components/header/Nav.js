import Header from './Header'
import Logo from './Logo'
import Cart from './Cart'
import MaxWidthWrapper from '../ui/MaxWidthWrapper'
import TopNavBar from './TopNavBar'
import NavBarLink from './NavBarLink'
import Search from './Search'
import User from './User'
import Bars from './Bars'
import { useRouter } from 'next/navigation'
import BottomMenu from './BottomMenu'

export default function Nav() {
  const router = useRouter()

  const navigation = [
    { 
      name: 'Home', 
      href: '/', 
      current: router.pathname === '/' && true 
    },
    {
      name: 'PRODUKTE',
      href: '',
      current:
        (router.pathname === '/despre-mine' && true) ||
        (router.pathname === '/despre-mine/cine-sunt' && true) ||
        (router.pathname === '/despre-mine/trairile-elei' && true),
      submenu: [
        {
          name: 'Cine sunt eu?',
          href: '/despre-mine/cine-sunt',
          current: router.pathname === '/despre-mine/cine-sunt' && true,
        },
        {
          name: 'TrairileElei',
          href: '/despre-mine/trairile-elei',
          current: router.pathname === '/despre-mine/trairile-elei' && true,
        },
      ],
    },
    {
      name: 'AUSSTELLUNG',
      href: '',
      current:
        (router.pathname === '/numerologie/analiza-numerologica-personalizata' && true) ||
        (router.pathname === '/numerologie/ce-este-numerologia' && true) ||
        (router.pathname === '/numerologie/consultatii-numerologice' && true),
  
      submenu: [
        {
          name: 'Ce este numerologia?',
          href: '/numerologie/ce-este-numerologia',
          current: router.pathname === '/numerologie/ce-este-numerologia' && true,
        },
        {
          name: 'Consultatii numerologice 1:1',
          href: '/numerologie/consultatii-numerologice',
          current: router.pathname === '/numerologie/consultatii-numerologice' && true,
        },
        {
          name: 'Analiza numerologica personalizata (prezentare scrisa)',
          href: '/numerologie/analiza-numerologica-personalizata',
          current: router.pathname === '/numerologie/analiza-numerologica-personalizata' && true,
        },
      ],
    },
    {
      name: 'SOMFY SHOP',
      href: '',
      current:
        (router.pathname === '/calculator-numerologic' && true) ||
        (router.pathname === '/calculator-numerologic/cifra-destinului' && true) ||
        (router.pathname === '/calculator-numerologic/matricea-numerologica' && true) ||
        (router.pathname === '/calculator-numerologic/cifra-numelui' && true),
      submenu: [
        {
          name: 'Cifra destinului',
          href: '/calculator-numerologic/cifra-destinului',
          current: router.pathname === '/calculator-numerologic/cifra-destinului' && true,
        },
        {
          name: 'Matricea Numerologica',
          href: '/calculator-numerologic/matricea-numerologica',
          current: router.pathname === '/calculator-numerologic/matricea-numerologica' && true,
        },
        {
          name: 'Cifra numelui',
          href: '/calculator-numerologic/cifra-numelui',
          current: router.pathname === '/calculator-numerologic/cifra-numelui' && true,
        },
      ],
    },
    {
      name: 'KARRIERE',
      href: '',
      current:
        (router.pathname === '/consiliere' && true) ||
        (router.pathname === '/consiliere/cui-se-adreseaza' && true) ||
        (router.pathname === '/consiliere/consiliere-dezvoltare-personala' && true),
      submenu: [
        {
          name: 'Ce este si cui se adreseaza?',
          href: '/consiliere/cui-se-adreseaza',
          current: router.pathname === '/consiliere/cui-se-adreseaza' && true,
        },
        {
          name: 'Consiliere pentru dezvoltare personala 1:1',
          href: '/consiliere/consiliere-dezvoltare-personala',
          current: router.pathname === '/consiliere/consiliere-dezvoltare-personala' && true,
        },
      ],
    },
    {
      name: 'KONTAKT',
      href: '/kontakt',
      current: router.pathname === '/kontakt' && true,
    },
  ]

  return (
      <Header>
        <TopNavBar />
        <MaxWidthWrapper>
          {/* Mobile */}
          <div className='md:hidden'>
            <div className='flex items-center h-20 justify-between '>
              <Logo />
              <Bars navigation={navigation}/>
            </div>
            <Search />
            <BottomMenu/>
          </div>
          {/* end mobile */}

          {/* tablet */}
          <div className='hidden md:block lg:hidden'>
            <div className='flex items-center h-20 justify-between '>
              <Logo />
              <Search />
              <Bars navigation={navigation}/>
            </div>
          </div>
          {/* end tablet */}

          {/* Desktop */}
          <div className='hidden lg:flex md:h-16 items-center justify-between gap-2'>
            <Logo />
            <Search />
            <User />
            <Cart />
          </div>
        </MaxWidthWrapper>
        <div className='hidden lg:block bg-[#f2f2ee] border-t border-borderColor'>
          <MaxWidthWrapper>
            <NavBarLink navigation={navigation}/>
          </MaxWidthWrapper>
        </div>
        {/* end descktop */}

      </Header>
  )
}
