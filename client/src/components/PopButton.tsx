import React, { useState } from 'react';
import PopModal from './PopModal';
import { Button } from '@chakra-ui/react';


const PopButton: React.FC = () => {
    const [isPopModalOpen, setPopModalOpen] = useState<boolean>(false);

    const onOpenPop = () => {
      setPopModalOpen(true);
    };

    return (
        <>
            <Button 
                bg="#2E5E79" 
        
                height="4rem"

                onClick={onOpenPop}
                borderRadius="100%"
                color="white"    
            >
                Pop!
            </Button>
            <PopModal open={isPopModalOpen} closeModal={() => setPopModalOpen(false)} />
        </>


    )

}

export default PopButton;
