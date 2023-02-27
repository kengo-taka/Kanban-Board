import { Box, Text } from '@mantine/core';
import {  ReactNode } from 'react';
import {  useDrop } from "react-dnd";

type ColumnType = {
  children: ReactNode
  name: string
  color: string
}

const Column = ({ children, name, color }: ColumnType) => {
  const [,drop] = useDrop({
    accept: 'Good',
    drop: () => ({ name: name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  return (
    <Box className='column' ref={drop} my={30} sx={{borderRadius: '5px'}} bg={'white'} w={'100%'}>
      <Box bg={color} sx={{borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}>
        <Text align='center' weight={'bold'} size={'sm'}>{name}</Text>
      </Box>
      {children}
    </Box>
  )
}

export default Column