import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {URL_API} from "../const/url.js";
import {axiosLogin} from "../api/request/index.js";

const Register = () => {
    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState("Пароль должен содержать больше 5 символов")
    const [errorConfirm, setErrorConfirm] = useState("Поле должно быть заполнено")
    const [errorText, setErrorText] = useState('')

    const handleSubmit = async(event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false || password !== confirmPassword || password.length < 6 || password.length > 32) {
            event.stopPropagation()
            setValidated(true)
        } else {
            const error = await axiosLogin(event, URL_API.REGISTER_URL)
            setErrorText(error)
        }
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)

        if (password.length > 32) {
            setError("Пароль должен содержать меньше 33 символов")
        }

        if (password.length < 6) {
            setError("Пароль должен содержать больше 5 символов")
        }
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)

        if (password !== confirmPassword) {
            setErrorConfirm("Пароли не совпадают")
        }
    }

    return (
        <div style={{width: '80%', margin: '0 auto'}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-grid mt-4">
                <h2>Регистрация нового пользователя</h2>
                <Form.Group className="mt-3">
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="fullName"/>
                    <Form.Control.Feedback type="invalid">Поле должно быть заполнено</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>День Рождения</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        name="birthDate"/>
                    <Form.Control.Feedback type="invalid">Поле должно быть заполнено</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        name="email"/>
                    <Form.Text className="text-muted">Email будет использоваться для входа в систему</Form.Text>
                    <Form.Control.Feedback type="invalid">Поле должно быть заполнено и соответсвовать формату email</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        name="password"
                        onChange={handlePassword}
                        isInvalid={(password.length < 6 || password.length > 32) && validated}/>
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        name="confirmPassword"
                        onChange={handleConfirmPassword}
                        isInvalid={password !== confirmPassword && validated}/>
                    <Form.Control.Feedback type="invalid">{errorConfirm}</Form.Control.Feedback>
                </Form.Group>
                <div>
                    <Button type="submit">Зарегестрироваться</Button>
                </div>
            </Form>
            <h6 className="text-danger mt-3">{errorText}</h6>
        </div>
    )
}

export default Register