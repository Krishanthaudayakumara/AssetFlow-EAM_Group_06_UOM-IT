import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import Table from 'react-bootstrap/Table';
import "../../css/Facilitycss/workstationcard.css"; // import background image CSS file
import { FaMouse } from "react-icons/fa"
import { FaKeyboard } from "react-icons/fa"
import { FaStar } from "react-icons/fa"


type workstationprop = {
    workstationno: string;


}

export default function WorkstationCard(props: workstationprop) {
    return (


        <div className='ws-card'>
            <h6 className='workstation'> {props.workstationno} </h6>
            <div className='card1'>
                <FaMouse size={45} style={{ paddingTop: '20px' }} />

                <div className='sp1'>
                    <FaStar size={15} style={{ color: '#ff615a' }} />
                    <FaStar size={15} style={{ color: '#ff615a' }} />
                    <FaStar size={15} style={{ color: '#ff615a' }} />
                </div>

            </div>
            <div className='card2'>
                < FaKeyboard size={45} style={{ paddingTop: '20px' }} />
                <div className='sp1'>
                    <FaStar size={15} style={{ color: '#ff615a' }} />
                    <FaStar size={15} style={{ color: '#ff615a' }} />

                </div>

            </div>

            <div className='card3'>
                    <FaMouse size={45} style={{ paddingTop: '20px' }} />

                    <div className='sp1'>
                        <FaStar size={15} style={{ color: '#ff615a' }} />
                        <FaStar size={15} style={{ color: '#ff615a' }} />
                        <FaStar size={15} style={{ color: '#ff615a' }} />
                    </div>

                </div>

        </div>


    )
}



