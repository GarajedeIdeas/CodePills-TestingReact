import { useState } from "react";
import { useForm } from "react-hook-form";

export interface User {
    username: string;
    email: string;
    password: string;
}

type Props = {
    createUser: (newUser: User) => void
}

export default function RegisterForm({ createUser }: Props) {

    const [showInfo, setShowInfo] = useState(false);

    const { register, handleSubmit } = useForm<User>();
    const onSubmit = (value: User) => {
        createUser(value);
    }

    return <div>
        <h1>Formulario de registro</h1>
        <p onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
            Más información
        </p>
        {showInfo &&
            <p>Rellena el siguiente formulario para poder registrarte</p>
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="inputUsername">Nombre de usuario</label>
                <input type="text" id="inputUsername" {...register('username')} />
            </div>
            <div>
                <label htmlFor="inputEmail">Email</label>
                <input type="text" id="inputEmail" {...register('email')} />
            </div>
            <div>
                <label htmlFor="inputPassword">Password</label>
                <input type="text" id="inputPassword" {...register('password')} />
            </div>
            <input type="submit" value="Enviar" />
        </form>
    </div>

}