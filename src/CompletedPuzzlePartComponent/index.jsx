import Image from "react-bootstrap/Image";
import './index.scss'
import {useDrop} from "react-dnd";

export function CompletedPuzzlePartComponent(props) {
    const [{}, drop] = useDrop(() => ({
        accept: 'picturePuzzlePart',
        drop: () => props.drop(),
        canDrop: ()=> props.canDrop(),
    }), [props.canDrop])
    return (
        <div ref={drop} onClick={props.onClick}
             className='puzzle-part-div'>
            <Image
                width='100%'
                height='100%'
                src={props.completedPuzzlePart}/>
        </div>
    )
}
