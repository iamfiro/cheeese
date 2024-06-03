import { ReactNode } from 'react';
import style from './style.module.scss';

interface ButtonProps {
    children: ReactNode;
    type: 'primary' | 'secondary';
}

function Button({ children, type }: ButtonProps) {
    return (
        <button className={`${style.button} type-${type}`}>{children}</button>
    );
}


export default Button;