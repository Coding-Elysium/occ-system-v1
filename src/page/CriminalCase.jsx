import React from 'react'
import DashboardHeader from '../components/DashboardHeader/DashboardHeader'
import CriminalCaseTable from '../components/Table/CriminalCaseTable'

const CriminalCase = () => {
  return (
    <section className='flex flex-col gap-6'>
      <DashboardHeader/>
      <CriminalCaseTable/>
    </section>
  )
}

export default CriminalCase