import {useState} from "react";
import {URL_API} from "../const/url.js";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useProfile} from "../api/hook/index.js";
import {axiosEdit} from "../api/request/index.js";

const Profile = () => {
    const [validated, setValidated] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [profile, setProfile] = useProfile({})

    const handleSubmit = async(event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
        } else {
            const error = await axiosEdit(event, URL_API.PROFILE_URL)
            setErrorText(error)
        }
    }

    return (
        <div style={{width: '80%', margin: '0 auto'}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-grid mt-4">
                <h2>Профиль</h2>
                <Form.Group as={Row} className="mt-3">
                    <Form.Label column sm="2">ФИО</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            required
                            type="text"
                            name="fullName"
                            value={profile.fullName}
                            onChange={(e) => {
                                setProfile({...profile, fullName: e.target.value})
                            }}
                        />
                        <Form.Control.Feedback type="invalid">Поле должно быть заполнено</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mt-3" data-ignore>
                    <Form.Label column sm="2">Email</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            required
                            type="email"
                            defaultValue={profile.email}
                            readOnly
                            plaintext/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mt-3">
                    <Form.Label column sm="2">День Рождения</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            required
                            type="date"
                            name="birthDate"
                            value={profile.birthDate ? profile.birthDate.substring(0, profile.birthDate.indexOf("T")) : ""}
                            onChange={(e) => {
                                const selectedDate = e.target.value + "T00:00:00.000Z";
                                setProfile({ ...profile, birthDate: selectedDate });
                            }}
                        />
                        <Form.Control.Feedback type="invalid">Поле должно быть заполнено</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <div className="d-flex justify-content-end mt-3">
                    <Button type="submit">Изменить</Button>
                </div>
            </Form>
            <h6 className="text-danger mt-3">{errorText}</h6>
        </div>
    )
}

export default Profile