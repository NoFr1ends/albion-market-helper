import 'primereact/resources/themes/mdc-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

import {AppProps} from "next/app";
import {Menubar} from "primereact/menubar";
import {MenuItem} from "primereact/menuitem";

export default function App({Component, pageProps}: AppProps) {
    const items: MenuItem[] = [
        {
            label: 'Test'
        }
    ]

    return (
        <>
            <Menubar model={items} />
            <Component {...pageProps} />
        </>
    )
}