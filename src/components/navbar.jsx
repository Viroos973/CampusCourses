import {Container, Nav, Navbar} from "react-bootstrap";
import {useRoles} from "../api/useRoles.js";

const NavbarComponent = () => {
    const roles = useRoles('')

    const handleLogout = () => {
        localStorage.setItem("email", "")
        window.location.reload()
    }

    return (
        <Navbar expand="lg" data-bs-theme="dark" className="bg-secondary">
            <Container>
                <Navbar.Brand href="/">Кампусные курсы</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {roles !== '' ? (
                            <Nav.Link href="/groups">Группы курсов</Nav.Link>
                        ) : null}
                        {roles !== '' && roles.isStudent ? (
                            <Nav.Link href="/courses/my">Мои курсы</Nav.Link>
                        ) : null}
                        {roles !== '' && roles.isTeacher ? (
                            <Nav.Link href="/courses/teaching">Преподаваемые курсы</Nav.Link>
                        ) : null}
                    </Nav>

                    <Nav>
                        {localStorage.getItem("email") !== "" ? (
                            <>
                                <Nav.Link>{localStorage.getItem("email")}</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Выход</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link>Регистрация</Nav.Link>
                                <Nav.Link href="/login">Вход</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent