import React from 'react'
import './About.css'

import AtText from '../Images/AtText.png'

function About() {
  return (
    <div className='bgnd'>
    <div className='AboutTop'>
      <div className='AboutBody'>
      <div className='AboutBody1'>
        
        <h2 className='head'>About Property Insurance</h2>

        <p>Property insurance refers to a type of insurance coverage that protects against financial losses resulting from damage or loss of property.
It provides financial protection for residential, commercial, or industrial properties against perils such as fire, theft, vandalism, natural disasters, and other covered events.
Property insurance policies typically cover the physical structure of the property, as well as the contents inside.
This insurance is essential for property owners as it safeguards their valuable investments and provides financial security in the event of unforeseen damage or loss.
Property insurance not only covers repair or replacement costs but also helps protect against liability claims arising from property-related accidents or injuries.
By having property insurance, individuals and businesses can mitigate risks, minimize financial burdens, and have peace of mind knowing that their property is protected</p>
      </div><div className='forPicture'><div>
      <div className='AboutBody2'>
        <h2 className='head'>Key Components of Property Insurance Policies</h2>
        <p>
        Coverage Limits: These represent the maximum amount that an insurance policy will pay out in the event of a claim. Coverage limits should be based on the property's value and potential risks.

Deductibles: The deductible is the amount the policyholder must pay out-of-pocket before the insurance coverage kicks in. Higher deductibles generally result in lower premiums but can increase the policyholder's financial burden in the event of a claim.

Policy Term: This is the duration of the insurance policy, typically ranging from one to several years, with the option to renew at the end of the term
        </p>
      </div>
      <div className='AboutBody2'>
        <h2 className='head'>Property Insurance Types</h2>
        <p>Homeowners Insurance: This is the most common type of property insurance, providing coverage for single-family homes against a wide range of perils, such as fire, theft, and certain natural disasters.

.Renters Insurance: Designed for tenants, renters insurance covers the policyholder's personal property and liability within a rented property.</p>
            </div> 
        </div >
        <img  src={AtText} alt="Ramana Soft Insurance" className="AtText"/>
        </div>
      </div>
    </div>
    
    </div>
  )
}

export default About;
