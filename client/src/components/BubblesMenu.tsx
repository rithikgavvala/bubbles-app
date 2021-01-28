import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Heading,
    HStack,
    // MenuItemOption,
    // MenuGroup,
    // MenuOptionGroup,
    // MenuIcon,
    // MenuCommand,
    // MenuDivider,
    Button,
  } from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'

import { Bubble } from './ParentContainer';

type Props = {
    bubbleName: string;
    bubbles: Bubble[];

};

const BubblesMenu: React.FC<Props> = (props: Props) => {
    {console.log("PROPS BUBS", props.bubbles)}
    const usersBubbles = props.bubbles

    const bubblesArr : any[] =  []
    if(usersBubbles){
        usersBubbles.map((bub, index) => {
            bubblesArr.push(<MenuItem key={index}>
                {bub.name}
    
            </MenuItem>)
    
        })
    }else{
        bubblesArr.push(<MenuItem>NARD</MenuItem>)
    }


    console.log("arr", usersBubbles)

    return(
      <Menu>
  <MenuButton padding="0" bg="white" as={Button} >
      <HStack spacing={4}>
      <Heading as="h1" letterSpacing={'-.05rem'}>
          {props.bubbleName}
        </Heading>
    <ChevronDownIcon w={8} h={8}/>


      </HStack>

  </MenuButton>

              

  <MenuList>
      {bubblesArr}
      
 
      
    

  </MenuList>
</Menu>

    );


}

export default BubblesMenu;
