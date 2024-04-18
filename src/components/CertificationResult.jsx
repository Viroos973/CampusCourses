import {Badge} from "react-bootstrap";

export const CertificationResult = (result, type) => {
    return (
        <>
            {type} аттестация - {result === "Passed" ? (
                <Badge bg="success">успешна пройдена</Badge>
            ) : result === "Failed" ? (
                <Badge bg="danger">зафейлина</Badge>
            ) : (
                <Badge bg="secondary">отметки нет</Badge>
            )}
        </>
    )
}