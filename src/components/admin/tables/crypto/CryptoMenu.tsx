"use client"
import { ICrypto } from '@/app/dashboard/page';
import ButtonBase from '@/components/common/buttons/ButtonBase';
import { useRouter } from 'next/navigation';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import React, { useRef } from 'react'

interface CryptoMenuProps {
    crypto: ICrypto;

}

export const CryptoMenu: React.FC<CryptoMenuProps> = ({ crypto
}) => {
    const menuLeft = useRef<any>(null);
    const toast = useRef<any>(null);
    const router = useRouter();

    const items: MenuItem[] = [
        {
            label: 'Acciones',
            items: [
                {
                    label: 'Comprar',
                    icon: 'pi pi-sync',
                    command: () => {
                        console.log('swap')
                        router.push('/dashboard/swap');
                    }
                },
                {
                    label: 'Sent',
                    icon: 'pi pi-send',
                    command: () => {
                        console.log("sent")
                        router.push('/dashboard/swap/send-and-recive');
                        // toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                    }
                }
            ]
        },
        {
            label: 'Opciones',
            items: [
                {
                    label: 'Copy Token Address',
                    icon: 'pi pi-copy',
                    command: () => {
                        console.log('copy')
                        window.navigator.clipboard.writeText('0x0')
                    }
                },
                // {
                //     label: 'View on block explorer',
                //     icon: 'pi pi-external-link',
                //     command: () => {
                //         console.log('view')
                //     }
                // }
            ]
        }
    ];
    return (
        <>
            <ButtonBase
                variant="info"
                size="small"
                onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup
                className='bg-transparent hover:bg-transparent'
            >
                <i className="pi pi-ellipsis-v"></i>
            </ButtonBase>
            <Menu model={items} popup ref={menuLeft} id="popup_menu_left" className='mt-2' />
        </>
    )
}
