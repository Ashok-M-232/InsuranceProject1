import React from 'react'
import './Home.css'
import ListOfPolicies from '../ListOfPolicies/ListOfPolicies'
import LoginHome from './LoginForm'
import About from '../About Property Insurance/About'
import ramanaSoft from '../Images/ramanaSoft.jpg'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
    <div className='background'>
      <div className='top p-2 bg-#38779b text-white d-flex'>
    <img src={ramanaSoft} alt="Ramana Soft Insurance" className="ramanaSoftImage" />
    <h2>Ramana Insurance Policies</h2>
      <Link to={'/admin'} className='forbtn btn btn-inline-primary '>Admin</Link>
      </div>
    <div className='LopLgin'>
      <ListOfPolicies/>
      <LoginHome/>
    </div>
    <div className='lgabout'><About/></div>
    </div>
    
    </>
  )
}

export default Home
