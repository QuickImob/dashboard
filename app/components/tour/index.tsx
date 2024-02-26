import { ReactNode } from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTourClass } from '@/app/server/redux/actions';
import { ProfileMenu } from '../profileMenu';
import { Button } from 'reactstrap';
import { MdNextPlan } from 'react-icons/md';
import { IoArrowRedoCircleSharp, IoArrowUndoCircle, IoClose } from 'react-icons/io5';
import { useI18n } from '@/locales/client';

export const Tour = ({children}: { children: ReactNode }) => {
    const t = useI18n()
    const dispatch = useDispatch();
    const tour = useSelector((state: any) => state.local);

    const handleToggleTourClass = (local: string, event: React.MouseEvent<HTMLSpanElement>) => {
        dispatch(toggleTourClass(local));
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
    };

    return(
        <div id="tour">
            {(tour || tour !== '') &&
            <div className='tour-container'>
                <div className="end-tour" onClick={(event) => handleToggleTourClass('', event)}>
                    <IoClose />{t('Close help')}
                </div>
                {tour === 'home' && 
                    <span className="start-tour-button">
                        <Button color="primary" onClick={(event) => handleToggleTourClass('profile-menu', event)}>Iniciar Tour</Button>
                    </span>
                }
                {tour === 'new-property-page' &&
                    <span className="start-tour-button">
                        <Button color="primary" onClick={(event) => handleToggleTourClass('new-property-title', event)}>Iniciar Tour</Button>
                    </span>
                }
                {tour === 'profile-menu' &&
                <>
                    <span className="active-container" onClick={(event) => handleToggleTourClass('profile-menu-open', event)}>
                        <span className="mask-action"></span>
                        <ProfileMenu/>
                    </span>
                    <div className={`tourMessage ${tour}`}>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                </>
                }
                {tour === 'profile-menu-open' &&
                <>
                    <span className="active-container" onClick={(event) => handleToggleTourClass('profile-menu-open', event)}>
                        <span className="mask-action"></span>
                        <ProfileMenu/>
                    </span>
                    <div className={`tourMessage ${tour}`}>
                        <p>Aqui você escolhe o idioma.</p>
                    </div>
                </>
                }
                {tour === 'new-property-title' &&
                <>
                    <span className="active-container">
                        {/* <span className="mask-action"></span> */}
                    </span>
                    <div className={`tourMessage reverse ${tour}`}>
                        <span
                            onClick={(event) => handleToggleTourClass('new-property-ref', event)}
                            className="next-tour"
                        ><MdNextPlan /></span>
                        <p>Dê um título para o imóvel. ex.: Apartamento 2 quartos em Umuarama-PR</p>
                    </div>
                </>
                }
                {tour === 'new-property-ref' &&
                <>
                    <span className="active-container">
                        {/* <span className="mask-action"></span> */}
                    </span>
                    <div className={`tourMessage reverse ${tour}`}>
                        <span
                            onClick={(event) => handleToggleTourClass('new-property-title', event)}
                            className="prev-tour"
                        ><IoArrowUndoCircle /></span>
                        <span
                            onClick={(event) => handleToggleTourClass('new-property-owner', event)}
                            className="next-tour"
                        ><IoArrowRedoCircleSharp /></span>
                        <p>Código de identificação do imóvel. ex.: AP1345</p>
                    </div>
                </>
                }
                {tour === 'new-property-owner' &&
                <>
                    <span className="active-container new-owner-modal"  onClick={(event) => handleToggleTourClass('new-owner-modal', event)}>
                        {/* <span className="mask-action"></span> */}
                    </span>
                    <div className={`tourMessage reverse ${tour}`}>
                        <span
                            onClick={(event) => handleToggleTourClass('new-property-ref', event)}
                            className="prev-tour"
                        ><IoArrowUndoCircle /></span>
                        <span
                            onClick={(event) => handleToggleTourClass('new-owner-modal', event)}
                            className="next-tour"
                        ><IoArrowRedoCircleSharp /></span>
                        <p>Selecione um proprietário cadastrado, caso ainda não tenha cadastrado, clique em Novo proprietário.</p>
                    </div>
                </>
                }
                {tour === 'new-owner-modal' &&
                <>
                    <span className="active-container">
                        {/* <span className="mask-action"></span> */}
                    </span>
                    <div className={`tourMessage ${tour}`}>
                        <span
                            onClick={(event) => handleToggleTourClass('new-property-owner', event)}
                            className="prev-tour"
                        ><IoArrowUndoCircle /></span>
                        <span
                            onClick={(event) => handleToggleTourClass('new-owner-modal', event)}
                            className="next-tour"
                        ><IoArrowRedoCircleSharp /></span>
                        <p>Preencha o nome do proprietário.</p>
                    </div>
                </>
                }
            </div>
            }
            {children}
        </div>
    )
}