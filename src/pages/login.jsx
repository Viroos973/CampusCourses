import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {URL_API} from "../const/url.js";
import {axiosLogin} from "../api/request/index.js";

const Login = () => {
    const [validated, setValidated] = useState(false)
    const [errorText, setErrorText] = useState('')

    const handleSubmit = async(event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
        } else {
            const error = await axiosLogin(event, URL_API.LOGIN_URL)
            setErrorText(error)
        }
    }

    return (
        <div style={{width: '80%', margin: '0 auto'}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-grid mt-4">
                <h2>Авторизация</h2>
                <Form.Group className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        name="email"/>
                    <Form.Control.Feedback type="invalid">Поле должно быть заполнено и соответсвовать формату email</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        name="password"/>
                    <Form.Control.Feedback type="invalid">Поле должно быть заполнено</Form.Control.Feedback>
                </Form.Group>
                <div>
                    <Button type="submit">Войти</Button>
                </div>
            </Form>
            <h6 className="text-danger mt-3">{errorText}</h6>
        </div>
    )
}

export default Login