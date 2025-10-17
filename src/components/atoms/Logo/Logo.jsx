import React from 'react'
import './Logo.css'

export default function Logo({onClick}) {
  return (
    <div id='logo' onClick={onClick}></div>
  )
}
