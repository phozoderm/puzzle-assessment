import Image from "react-bootstrap/Image";
import {useDrag} from "react-dnd";
import './index.scss'


export function ShuffledPuzzlePartComponent(props) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'picturePuzzlePart',
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    console.log({isDragging})

    if (isDragging){
        props.isDragging()
    }

    return (
        <Image
            ref={drag}
            onClick={props.onClick}
            width='100%'
            height='100%'
            src={props.puzzlePart}/>
    )
}
