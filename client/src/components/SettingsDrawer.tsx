import React, {useState} from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button
  } from "@chakra-ui/react" 
import JoinGroupModal from './JoinGroupModal';


type Props = {
    name: string;

};
const SettingsDrawer: React.FC<Props> = (props : Props) => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isJoinGroupOpen, setJoinGroup] = useState<boolean>(false);


  const onOpenJoinGroup = () => {
    setJoinGroup(true);
  };


  const onOpenDrawer = () => {
    setDrawerOpen(true);
  };
  return (
    <>
    <Button
        height="2rem"
        borderRadius="100%"
        onClick={onOpenDrawer}
       >{props.name}</Button>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() =>  setDrawerOpen(false) }
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Welcome, {props.name}</DrawerHeader>

            <DrawerBody>
              <Button textAlign="left" width="100%" paddingLeft="0rem" color="black" borderBottom="1px solid #cecece" bg="white" onClick={onOpenJoinGroup}>
                Join Another Group

                
              </Button>
              <JoinGroupModal open={isJoinGroupOpen} closeModal={() => setJoinGroup(false)} />

            </DrawerBody>

            <DrawerFooter>
              
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default SettingsDrawer;