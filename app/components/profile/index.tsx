'use client';

import './styles.css'
import { LuUser2 } from "react-icons/lu";
import { HiOutlineKey, HiOutlineMapPin } from "react-icons/hi2";
import { PiUsersFourLight } from 'react-icons/pi';
import { RxActivityLog } from 'react-icons/rx';
import {useState} from 'react';
import ProfileEdit from './components/profileEdit';
import AddressEdit from './components/addressEdit';
import { useSession } from "next-auth/react";

interface ProfilePageProps {
    data:any;
}

export default function ProfilePage({data}: ProfilePageProps) {
    const { data: session, status } = useSession()
    const [tabSelected, setTabSelected] = useState(1)

  return (
    <div className="profile-container">
        <div className="profile-header">
            <div className="container-tabs">
                <div
                    className={`tab ${tabSelected === 1 && 'active'}`}
                    onClick={() => setTabSelected(1)}
                ><LuUser2 />Perfil</div>
                <div
                    className={`tab ${tabSelected === 2 && 'active'}`}
                    onClick={() => setTabSelected(2)}
                ><HiOutlineMapPin />Endereço</div>
                <div
                    className={`tab ${tabSelected === 3 && 'active'}`}
                    onClick={() => setTabSelected(3)}
                ><HiOutlineKey />Senha</div>
                <div
                    className={`tab ${tabSelected === 4 && 'active'}`}
                    onClick={() => setTabSelected(4)}
                ><PiUsersFourLight />Time</div>
                <div
                    className={`tab ${tabSelected === 5 && 'active'}`}
                    onClick={() => setTabSelected(5)}
                ><RxActivityLog />Log</div>
            </div>
        </div>
        <div className="profile-content">
            {tabSelected === 1 &&
                <ProfileEdit user={session}/>
            }
            {tabSelected === 2 &&
                <AddressEdit user={session}/>
            }
        </div>
    </div>
  )
}