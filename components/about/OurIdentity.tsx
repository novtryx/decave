import React from 'react'
import SectionHeader from '../layout/sectionHeader'
import { BsStars } from 'react-icons/bs'

const OurIdentity = () => {
  return (
    <div>
        <div>
            <SectionHeader
            title="Creators of Culture"
            label='OUR IDENTITY'
            icon={BsStars}
            iconColor='#AD46FF'
            align='left'
            />
        </div>
    </div>
  )
}

export default OurIdentity