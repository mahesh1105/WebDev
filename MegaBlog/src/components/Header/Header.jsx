import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // Navigation Bar Items
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer'
                  >
                    {item.name}
                  </button>
                </li>
              ) : (null)
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header;

/*
  Note:
  -----
  Link: User is clicking on something in the UI to navigate
  useNavigate: You want to navigate based on the logic, not a visible link

  🔗 Link — for Declarative Navigation
  🔍 What it is:
  - Link is a component you use in your JSX. It’s like an <a> tag, but without the page refresh. 
  - It's used when you want the user to click something to navigate.

  ✅ When to use:
  - When you're rendering something clickable in the UI
  - Like buttons, menus, nav bars, cards, etc.

  🧭 useNavigate — for Programmatic Navigation
  🔍 What it is:
  - useNavigate is a hook. You use it in your component logic (like after a form submission or an event) 
    to navigate in response to something happening, not a user click.

  ✅ When to use:
  - After a user submits a form
  - After login/signup
  - Based on a condition (e.g., auth redirect)
  - On button click handlers, etc.
*/