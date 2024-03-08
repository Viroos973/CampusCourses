import {Container, Nav, Navbar, Button} from "react-bootstrap";

const NavbarComponent = () => {
    const data = {
        "isTeacher": true,
        "isStudent": true,
        "isAdmin": false
    }

    const handleLogin = () => {
        localStorage.setItem("email", "yurij.eliseev.2004@mail.ru")
        window.location.reload()
    }

    const handleLogout = () => {
        localStorage.setItem("email", null)
        window.location.reload()
    }

    return (
        <Navbar expand="lg" data-bs-theme="dark" className="bg-secondary">
            <Container>
                <Navbar.Brand href="#">Кампусные курсы</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {localStorage.getItem("email") !== "null" ? (
                            <Nav.Link href="/groups">Группы курсов</Nav.Link>
                        ) : null}
                        {localStorage.getItem("email") !== "null" && data.isStudent ? (
                            <Nav.Link href="/courses/my">Мои курсы</Nav.Link>
                        ) : null}
                        {localStorage.getItem("email") !== "null" && data.isTeacher ? (
                            <Nav.Link href="/courses/teaching">Преподаваемые курсы</Nav.Link>
                        ) : null}
                    </Nav>

                    <Nav>
                        {localStorage.getItem("email") !== "null" ? (
                            <>
                                <Nav.Link>{localStorage.getItem("email")}</Nav.Link>
                                <Button variant="link" onClick={handleLogout}>Выход</Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link>Регистрация</Nav.Link>
                                <Nav.Link onClick={handleLogin}>Вход</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent