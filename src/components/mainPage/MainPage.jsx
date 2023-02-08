import React from 'react'
import { ClockComponent } from '../clock/ClockComponent'
import { NavigationBar } from '../NavigationBar/NavigationBar'

export const MainPage = () => {
  return (
    <>
        <NavigationBar/>
        <ClockComponent/>
    </>
  )
}
