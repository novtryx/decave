import React from 'react'
import SectionHeader from '../layout/sectionHeader'
import { PiShootingStarBold } from 'react-icons/pi'
import Button from '../layout/Button'
import PartnerLogos from '../layout/PartnerLogos'

const OurPartners = () => {
  return (
    <div className='bg-white py-8 flex flex-col items-center'>
        <SectionHeader
            icon={PiShootingStarBold}
            iconColor='#7B3FE4'
            label='TRUSTED BY'
            title='Our Partners'
            description='Collaborating with leading brands to deliver world-class experiences'
            labelColor='#CCA33A'
            titleColor='#001D3D'
            descriptionColor='#6F6F6F'
        />

        <PartnerLogos/>
        <Button variant='outline'>
            Become a Partner
        </Button>
    </div>
  )
}

export default OurPartners