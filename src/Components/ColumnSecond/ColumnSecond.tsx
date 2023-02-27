import React, { useEffect, useRef, useState, Dispatch } from 'react';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MovableItem from '../MovableItem/MovableItem';
import './ColumnSecond.css'

type ColumnType = {
  isFirst: boolean
  setFirst: Dispatch<boolean>
}

const ColumnSecond = ({isFirst, setFirst} : ColumnType) => {
  const [{canDrop, isOver}, drop] = useDrop({
    accept: 'Good',
    drop: () => ({name: 'Second'}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  console.log('options', { canDrop, isOver})

  return (
    <div className='columnSecond' ref={drop}>
      {/* {!isFirst &&  <MovableItem setIsFirst={setFirst}/>} */}
     
    </div>
  )
}

export default ColumnSecond