import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import RegisterForm, { User } from "../components/RegisterForm";

describe('RegisterForm', () => {

    let mockFn = vi.fn();
    beforeEach(() => {
        render(<RegisterForm createUser={mockFn} />)
    });

    it('se muestra el título del formulario', () => {
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeInTheDocument();
        expect(h1.textContent).toBe('Formulario de registro');
    });

    it('se envía el formulario correctamente', async () => {
        const userTest: User = { username: 'mariog', email: 'mario@gmail.com', password: '12345' };

        const inputUsername = screen.getByLabelText('Nombre de usuario');
        const inputEmail = screen.getByLabelText('Email');
        const inputPassword = screen.getByLabelText('Password');
        const btnSubmit = screen.getByRole('button', { name: 'Enviar' })

        await userEvent.type(inputUsername, userTest.username);
        await userEvent.type(inputEmail, userTest.email);
        await userEvent.type(inputPassword, userTest.password);

        await userEvent.click(btnSubmit);

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(userTest);

    });

    it('se muestra el texto de información', async () => {
        let paragraph = screen.queryByText(/para poder registrarte/i);
        expect(paragraph).not.toBeInTheDocument();

        const paragraphInfo = screen.getByText(/más información/i);

        await userEvent.hover(paragraphInfo);

        paragraph = screen.queryByText(/para poder registrarte/i);
        expect(paragraph).toBeInTheDocument();

        await userEvent.unhover(paragraphInfo);

        paragraph = screen.queryByText(/para poder registrarte/i);
        expect(paragraph).not.toBeInTheDocument();
    })

});