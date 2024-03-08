import {Container, Nav, Navbar} from "react-bootstrap";
import {useRoles} from "../api/useRoles.js";
import {ROUTES} from "../const/route.js";
import {fetchLogOut} from "../api/fetchLogOut.js";

const NavbarComponent = () => {
    const roles = useRoles({})

    return (
        <Navbar expand="lg" data-bs-theme="dark" className="bg-secondary">
            <Container>
                <Navbar.Brand href="/">Кампусные курсы</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {localStorage.getItem("email") !== "" ? (
                            <Nav.Link href="/groups">Группы курсов</Nav.Link>
                        ) : null}
                        {roles !== {} && roles.isStudent ? (
                            <Nav.Link href="/courses/my">Мои курсы</Nav.Link>
                        ) : null}
                        {roles !== {} && roles.isTeacher ? (
                            <Nav.Link href="/courses/teaching">Преподаваемые курсы</Nav.Link>
                        ) : null}
                    </Nav>

                    <Nav>
                        {localStorage.getItem("email") !== "" ? (
                            <>
                                <Nav.Link href={ROUTES.PROFILE}>{localStorage.getItem("email")}</Nav.Link>
                                <Nav.Link onClick={fetchLogOut}>Выход</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href={ROUTES.REGISTER}>Регистрация</Nav.Link>
                                <Nav.Link href={ROUTES.LOGIN}>Вход</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent