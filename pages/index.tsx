import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MyLayout from '@/components/myLayout'
import DataContextProvider from '@/components/DataContext'

export default function Home() {
  return (
    <MyLayout>
      <DataContextProvider></DataContextProvider>
    </MyLayout>
  )
}
