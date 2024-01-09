import './App.scss'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import result from './assests/result.jpeg'
import row1Col1 from './assests/row-1-column-1.jpg'
import row1Col2 from './assests/row-1-column-2.jpg'
import row1Col3 from './assests/row-1-column-3.jpg'
import row2Col1 from './assests/row-2-column-1.jpg'
import row2Col2 from './assests/row-2-column-2.jpg'
import row2Col3 from './assests/row-2-column-3.jpg'
import row3Col1 from './assests/row-3-column-1.jpg'
import row3Col2 from './assests/row-3-column-2.jpg'
import row3Col3 from './assests/row-3-column-3.jpg'
import {useEffect, useState} from "react";
import {ShuffledPuzzlePartComponent} from "./ShuffledPuzzlePartComponent/index.jsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {CompletedPuzzlePartComponent} from "./CompletedPuzzlePartComponent/index.jsx";
import {movePicturePuzzlePart} from "./logic.js";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const puzzleParts = [row1Col1, row1Col2, row1Col3, row2Col1, row2Col2, row2Col3, row3Col1, row3Col2, row3Col3,]
const puzzlePartsShuffled = puzzleParts
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value)

function App({pictureIndex}) {
    const [chosenPuzzlePartIndex, setChosenPuzzlePartIndex] = useState(null);
    const [shuffledPuzzleParts, setShuffledPuzzleParts] = useState(puzzlePartsShuffled);
    const [completedPuzzleParts, setCompletedPuzzleParts] = useState([null, null, null, null, null, null, null, null, null]);
    const [show, setShow] = useState(false);
    const [score, setScore] = useState(0);
    const [username, setUsername] = useState('');
    const [remainingSeconds, setRemainingSeconds] = useState(60);
    const [timerIntervalId, setTimerIntervalId] = useState(-1);
    const [isTryAgainButtonVisible, setTryAgainButtonVisible] = useState(false)

    useEffect(() => {
        const id = setInterval(() => {
            setRemainingSeconds(prevValue => prevValue - 1)
        }, 1000)
        setTimerIntervalId(id)
    }, []);

    useEffect(() => {
        if (remainingSeconds <= 0) {
            clearInterval(timerIntervalId)
            setShow(true)
        }
    }, [remainingSeconds, timerIntervalId])

    function callSaveScorePostAPI() {
        fetch('https://puzzlegame.free.beeceptor.com/highscores', {
            method: 'POST',
            body: JSON.stringify({
                score: score,
                username: username
            }),
            headers: {
                'content-type': "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                handleClose()
                setTryAgainButtonVisible(true)
            }
        }).catch(() => {
            //todo
        })
    }

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function canDrop(i) {
        return shuffledPuzzleParts[chosenPuzzlePartIndex] === puzzleParts[i];
    }

    function onCompletedPuzzlePartClick(i) {
        if (chosenPuzzlePartIndex == null) {
            return;
        }
        if (completedPuzzleParts[i] != null) {
            return;
        }
        if (shuffledPuzzleParts[chosenPuzzlePartIndex] === puzzleParts[i]) {
            const newCompleted = completedPuzzleParts.map((e, j) => j === i ? shuffledPuzzleParts[chosenPuzzlePartIndex] : e)
            setCompletedPuzzleParts(newCompleted)

            const newShuffled = shuffledPuzzleParts.map((e, j) => j === chosenPuzzlePartIndex ? null : e)
            setShuffledPuzzleParts(newShuffled)

            setChosenPuzzlePartIndex(null)

            const emptyParts = newCompleted.filter(e => e == null)
            if (emptyParts.length === 0) {
                clearInterval(timerIntervalId)
                handleShow()
                setScore(remainingSeconds)
            }
        }
    }

    function pictureStartedDragging(i) {
        setChosenPuzzlePartIndex(i)
    }

    if (pictureIndex != null) {
        onCompletedPuzzlePartClick(pictureIndex)
    }

    function tryAgainButton() {
        window.location.reload()
    }

    const isCompleted = completedPuzzleParts.filter(e => e == null).length === 0

    return (
        <DndProvider backend={HTML5Backend}>
            <Container fluid className='p-0'>
                <Navbar expand='lg' className='puzzle-game-navbar d-flex justify-content-around'>
                    <Navbar.Brand className='navbar-brand'>
                        <i className="bi bi-puzzle-fill"></i>
                        Puzzle
                    </Navbar.Brand>
                    <div className='navbar-timer-try-again-button-div'>
                        <div className='navbar-timer-div'>
                            <i className="bi bi-hourglass-split"></i>
                            <span>{remainingSeconds}</span>
                        </div>
                        {isTryAgainButtonVisible ?
                            <div className='try-again-button-div'>
                                <Button onClick={tryAgainButton}>Try Again!</Button>
                            </div> : null
                        }
                    </div>
                </Navbar>
                <Container fluid className='vh-100'>
                    <Row className='m-5'>
                        <Col className='d-flex align-items-center justify-content-center'>
                            <div className='label-container'>
                                <label>Drag the tiles to form the picture</label>
                            </div>
                        </Col>
                    </Row>
                    <Row className='m-5'>
                        <Col className='d-flex justify-content-center'>
                            <div className={`result-picture-game ${isCompleted ? 'result-completed-picture' : ''}`}>
                                <Image width='100%' height='100%' src={result}/>
                            </div>
                        </Col>

                        <Col className='d-flex justify-content-center'>
                            <div className='puzzle-parts-container'>
                                <Row xs={3}>
                                    {
                                        completedPuzzleParts.map((completedPuzzlePart, i) =>
                                            <Col key={`completed_${i}`}>
                                                <CompletedPuzzlePartComponent
                                                    completedPuzzlePart={completedPuzzlePart}
                                                    drop={() => movePicturePuzzlePart(i)}
                                                    canDrop={() => canDrop(i)}
                                                />
                                            </Col>
                                        )
                                    }
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-5 mb-5'>
                        <div className='puzzle-parts-shuffled-container'>
                            {shuffledPuzzleParts.map((puzzlePart, i) =>
                                (
                                    <Col key={`shuffled_${i}`}>
                                        <div className='puzzle-part-div'>
                                            {
                                                !puzzlePart ? null :
                                                    <ShuffledPuzzlePartComponent
                                                        isDragging={() => pictureStartedDragging(i)}
                                                        puzzlePart={puzzlePart}/>
                                            }
                                        </div>
                                    </Col>
                                )
                            )
                            }
                        </div>
                    </Row>
                </Container>
            </Container>


            <Modal keyboard={false} backdrop='static' size='sm' centered show={show} onHide={handleClose}>
                <Modal.Header className='modal-header-footer'>
                    <Modal.Title>{isCompleted ? "You Won! 🎉" : "You Lost!"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className='d-flex justify-content-center'>
                            <div
                                className={`mb-3 modal-score-form-div ${isCompleted ? 'modal-score-form-completed-div' : ''}`}>
                                <span>{score}</span>
                            </div>
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                className='username-form-control'
                                onChange={onChangeUsername}
                                type="text"
                                placeholder="Username"
                                autoFocus
                                value={username}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modal-header-footer'>
                    <Button onClick={callSaveScorePostAPI}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </DndProvider>
    )
}

export default App
