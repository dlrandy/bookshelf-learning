/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { jsx } from '@emotion/react';

import React, { useState, useContext } from 'react';

import VisuallyHidden from '@reach/visually-hidden';

import { Dialog, CircleButton } from '@FE/components/lib';

const callAll = (...fns) => (...args) => fns.forEach((fn) => fn && fn(...args));

const ModalContext = React.createContext();

function Modal(props) {
    const [isOpen, setIsOpen] = useState(false);
    return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({ children: child }) {
    const [, setIsOpen] = useContext(ModalContext);

    return React.cloneElement(child, {
        onClick: callAll(() => setIsOpen(false), child.props.onClick),
    });
}
function ModalOpenButton({ children: child }) {
    const [, setIsOpen] = useContext(ModalContext);

    return React.cloneElement(child, {
        onClick: callAll(() => setIsOpen(true), child.props.onClick),
    });
}

function ModalContentsBase(props) {
    const [isOpen, setIsOpen] = useContext(ModalContext);
    return (
        <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
    );
}

function ModalContents({ title, children, ...props }) {
    return (
        <ModalContentsBase {...props}>
            <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ModalDismissButton>
                    <CircleButton>
                        <VisuallyHidden>Close</VisuallyHidden>
                        <span aria-hidden>*</span>
                    </CircleButton>
                </ModalDismissButton>
            </div>
            <h3 css={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
            {children}
        </ModalContentsBase>
    );
}
export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
