import { ReactNode } from "react";
import style from './style.module.scss';
import SampleLogo from '../../assets/react.svg';

function Logo() {
    return (
        <img src={SampleLogo} alt="Logo" height={30} />
    );
}

interface HeaderProps {
    children: ReactNode;
}

function Header({ children }: HeaderProps) {
    return (
        <header className={style.header}>
            {children}
        </header>
    );
}

Header.Logo = Logo;

export default Header;