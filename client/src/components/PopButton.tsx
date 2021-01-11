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
            <Button bg="#FEB2B2" onClick={onOpenPop}>
                Pop!
            </Button>
            <PopModal open={isPopModalOpen} closeModal={() => setPopModalOpen(false)} />
        </>


    )

}

export default PopButton;
