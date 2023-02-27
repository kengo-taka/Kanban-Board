import { ActionIcon, Box, Button, Flex, Modal, Text } from '@mantine/core';
import React, { useState } from 'react';
import { useDrag } from "react-dnd";
import { IconTrash } from '@tabler/icons-react';

type ItemType = {
  id: number
  name: string
  column: string
}

type MovableItemType = {
  setItems: (value: React.SetStateAction<ItemType[]>) => void
  items: ItemType[]
  name: string
  id: number
  color: string
}

type MyDropResult = {
  name: string;
}

const MovableItem = ({ setItems, items, name, id, color }: MovableItemType) => {
  const [opened, setOpened] = useState(false);

  const changeItemsInColumn = (currentItem: any, columnName: string) => {
    setItems(prevState => {
      return prevState.map(e => {
        return {
          ...e,
          column: e.id === id ? columnName : e.column
        }
      })
    })
  }

  const [isDragging, drag] = useDrag({
    type: 'Good',
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<MyDropResult>()
      if (dropResult && dropResult.name === 'To Do') {
        changeItemsInColumn(id, 'To Do')
      } else if (dropResult && dropResult.name === 'In Progress') {
        changeItemsInColumn(id, 'In Progress')
      } else if (dropResult && dropResult.name === 'Review') {
        changeItemsInColumn(id, 'Review')
      } else if (dropResult && dropResult.name === 'Complete') {
        changeItemsInColumn(id, 'Complete')
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = !isDragging ? 0.4 : 1;

  const deleteTask = () => {
    let temp = items.slice()
    setItems(
      temp.filter((item) => item.id !== id)
    )
  }

  return (
    <Box ref={drag} className='movableItem' style={{ opacity }} mx={'auto'} sx={{ borderRadius: '5px', boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px', cursor: 'pointer' }} bg={'white'} w={'80%'} my={30}>
      <Box w={'100%'} h={10} bg={color} sx={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}></Box>
      <Box p={10}>
        <Text weight={'bold'} size={'sm'}>{name}</Text>
        <Flex justify={'space-between'} align={'center'}>
          <Text size={'xs'}>ID: {id}</Text>
          <ActionIcon onClick={() => setOpened(true)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Flex>
      </Box>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Delete Task"
      >
        <Flex direction="column" gap={20}>
          <Text weight={'bold'} size={'sm'}>Do you want to delete this task?</Text>
          <Button onClick={deleteTask}>Delete Task</Button>
        </Flex>
      </Modal>
    </Box>
  )
}

export default MovableItem