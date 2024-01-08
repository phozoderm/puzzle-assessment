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
import {useState} from "react";

const puzzleParts = [row1Col1, row1Col2, row1Col3, row2Col1, row2Col2, row2Col3, row3Col1, row3Col2, row3Col3,]
const puzzlePartsShuffled = puzzleParts
    .map(value => ({ value, sort:Math.random()}))
    .sort((a,b) => a.sort-b.sort)
    .map(({value}) => value)
function App() {
    const [chosenPuzzlePart, setChosenPuzzlePart]=useState(null)

    const completedPuzzleParts = []

    function onPuzzlePartClick (i){

    }
    return (
        <Container fluid className='p-0'>
            <Navbar expand='lg' className='puzzle-game-navbar'>
                <Container fluid className='d-flex justify-content-around'>
                    <Navbar.Brand className='navbar-brand'>
                        <i className="bi bi-puzzle-fill"></i>
                        Puzzle
                    </Navbar.Brand>
                    <div className='navbar-timer-div'>
                        <i className="bi bi-hourglass-split"></i>
                        <span>20</span>
                    </div>
                </Container>
            </Navbar>
            <Container fluid className='d-flex justify-content-center flex-column vh-100'>
                <div className='label-container'>
                    <label>Drag the tiles to form the picture</label>
                </div>
                <Row className='d-flex'>
                    <Col className='d-flex justify-content-center'>
                        <div className='result-picture-game'>
                            <Image width='100%' height='100%' src={result}/>
                        </div>
                    </Col>
                    <Col className='d-flex justify-content-center'>
                        <div className='puzzle-parts-container'>
                            <Row xs={3}>
                                {
                                    completedPuzzleParts.map((completedPuzzlePart, i)=>
                                        <Col key={`completed_${i}`}>
                                            <div className='puzzle-part-div'>
                                                <Image src={ }/>
                                            </div>
                                        </Col>
                                    )
                                }

                                <Col>
                                    <div className='puzzle-part-div'>

                                    </div>
                                </Col>
                                <Col>
                                    <div className='puzzle-part-div'>

                                    </div>
                                </Col>
                                <Col>
                                    <div className='puzzle-part-div'>

                                    </div>
                                </Col>
                                <Col>
                                    <div className='puzzle-part-div'>

                                    </div>
                                </Col>
                                <Col>
                                    <div className='puzzle-part-div'>

                                    </div>
                                </Col>
                                <Col>
                                    <div className='puzzle-part-div'>

                                    </div>
                                </Col>
                                <Col>
                                    <div className='puzzle-part-div'>

                                    </div>
                                </Col>
                                <Col>
                                    <div className='puzzle-part-div'>

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-5'>
                        <Row>
                            <div className='puzzle-parts-shuffled-container'>
                            {puzzlePartsShuffled.map((puzzlePart, i) =>
                                (
                                    <Col key={`shuffled_${i}`}>
                                        <div className='puzzle-part-div'>
                                            <Image onClick={() => onPuzzlePartClick(i)} width='100%' height='100%' src={puzzlePart}/>
                                        </div>
                                    </Col>
                                )
                            )
                            }
                            </div>
                        </Row>
                </Row>
            </Container>

        </Container>
    )
}

export default App
