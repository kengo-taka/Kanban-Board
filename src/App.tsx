import { useState } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import './App.css';
import Column from './Components/Column/Column';
import MovableItem from './Components/MovableItem/MovableItem';
import { Box, Flex, MantineProvider } from '@mantine/core';
import Header from './Components/Header/Header';
import AddTask from './Components/AddTask/AddTask';

type ItemType = {
  id: number
  name: string
  column: string
}

function App() {
  const [items, setItems] = useState<ItemType[]>([
    { id: 1, name: 'Make Button Component', column: 'To Do' },
    { id: 2, name: 'Make Header Design', column: 'In Progress' },
    { id: 3, name: 'Make the document', column: 'To Do' },
    { id: 4, name: 'Change css file', column: 'Complete' },
    { id: 5, name: 'Hire Kengo', column: 'To Do' },
    { id: 6, name: 'Transfer a data', column: 'In Progress' },
    { id: 7, name: 'Make the report', column: 'To Do' },
    { id: 8, name: 'Change python file', column: 'Complete' },
    { id: 9, name: 'Make js file', column: 'To Do' },
    { id: 10, name: 'Transfer money', column: 'In Progress' },
    { id: 11, name: 'Make ts file', column: 'To Do' },
    { id: 12, name: 'Change html file', column: 'Review' },
  ])

  const returnItems = (columnName: string, color: string) => {
    return items.
      filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem name={item.name} setItems={setItems} items={items} id={item.id} key={item.name + index} color={color}/>
      ))
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Header />
      <Box bg={'lightgray'} w={'100%'} h={'100%'} sx={{position: 'fixed', overflowY: 'scroll'}}>
        <Box w={'95%'} mx={'auto'} py={20}>
          <AddTask setItems={setItems}/>
          <DndProvider backend={HTML5Backend}>
            <Flex justify={'space-between'} gap={10} h={'100%'} w={'100%'}>
              <Column name={'To Do'} color={'red'}>
                {returnItems('To Do', 'red')}
              </Column>
              <Column name={'In Progress'} color={'blue'}>
                {returnItems('In Progress', 'blue')}
              </Column>
              <Column name={'Review'} color={'green'}>
                {returnItems('Review', 'green')}
              </Column>
              <Column name={'Complete'} color={'yellow'}>
                {returnItems('Complete', 'yellow')}
              </Column>
            </Flex>
          </DndProvider>
        </Box>
      </Box>
    </MantineProvider>
  );
}

export default App;
