/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { jsx } from '@emotion/react';
import '@reach/dialog/styles.css';
import { Logo } from '@FE/components/logo';
import { Modal, ModalContents, ModalOpenButton } from '@FE/components/modal';
import { Button, Input, FormGroup } from '@FE/components/lib';

function LoginForm({ onSubmit, submitButton }) {
    function handleSubmit(event) {
        event.preventDefault();
        const { username, password } = event.target.elements;
        onSubmit({
            username: username.value,
            password: password.value,
        });
    }

    return (
        <form
            css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                '> div': {
                    margin: '10px auto',
                    width: '100%',
                    maxWidth: '300px',
                },
            }}
            onSubmit={handleSubmit}
        >
            <FormGroup>
                <label htmlFor="username">Username</label>
                <Input id="username" />
            </FormGroup>
            <FormGroup>
                <label htmlFor="password">Password</label>
                <Input id="password" type="password" />
            </FormGroup>
            <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
        </form>
    );
}

function UnauthenticatedApp({ login, register }) {
    return (
        <div
            css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <Logo width="80" height="80" />
            <h1>Bookshelf</h1>
            <div
                css={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gridGap: '0.75rem',
                }}
            >
                <Modal>
                    <ModalOpenButton>
                        <Button variant="primary">Login</Button>
                    </ModalOpenButton>
                    <ModalContents aria-label="Login form" title="Login">
                        <LoginForm
                            onSubmit={login}
                            submitButton={
                                <Button variant="primary">Login</Button>
                            }
                        />
                    </ModalContents>
                </Modal>
                <Modal>
                    <ModalOpenButton>
                        <Button variant="secondary">Register</Button>
                    </ModalOpenButton>
                    <ModalContents
                        aria-label="Registration form"
                        title="Register"
                    >
                        <LoginForm
                            onSubmit={register}
                            submitButton={
                                <Button variant="secondary">Register</Button>
                            }
                        />
                    </ModalContents>
                </Modal>
            </div>
        </div>
    );
}
export { UnauthenticatedApp };