import { useState } from 'react'
import { Destination } from '../../models/Destination'
import { Box, Button, Typography, useTheme } from '@mui/material'
import './CardDestination.css'

const CardDestination = (destination: Destination) => {
  const [isHovered, setIsHovered] = useState(false)
  const myTheme = useTheme()

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Box
      className="card-destination"
      mt={{ xs: 3, sm: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        position={'absolute'}
        borderRadius={'5px'}
        border={'1px solid #fff'}
        px={1}
        left={15}
        top={0 - 20}
        width={'auto'}
        minHeight={40}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ backgroundColor: myTheme.palette.background.paper, zIndex: 3 }}
      >
        <Typography variant="h5" className="title-container">
          {destination.city}
        </Typography>
      </Box>

      <Box
        overflow={'hidden'}
        borderRadius={'15px'}
        width={'100%'}
        height={'100%'}
        position={'relative'}
      >
        <img
          src={destination.image}
          alt="Imagen"
          className={`image-container ${isHovered ? 'image-hovered' : ''}`}
        />
        <Box
          className={`description-container ${
            isHovered ? 'description-hovered' : ''
          }`}
        >
          <Typography variant="body1">{destination.description}</Typography>
          <Button variant="outlined" color="success" sx={{ mt: 4 }}>
            Explore
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CardDestination
