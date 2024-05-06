import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import '../scss/app.scss'

export const Root: React.FC = () => <div className='wrapper'><Header /><Outlet /><Footer /></div>