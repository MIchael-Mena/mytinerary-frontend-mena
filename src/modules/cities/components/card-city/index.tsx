import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone';
import { CityBasic } from '../../../../models/CityBasic';
import { Link as Anchor } from 'react-router-dom';
import { getSubstringAfterHyphen } from '../../../../utils/util';
import { LazyLoadImageWithSkeleton } from '../../../shared/components/lazy-load-image-with-skeleton';

interface CardCityProps {
  city: CityBasic;
}

const CardCity = ({ city }: CardCityProps) => {
  const pathCityDetail = `/city-detail/${city['_id']}`;
  const imgStyle = {
    height: 140,
    border: '1px solid #ccc',
    borderRadius: '15px 15px 0 0',
  };

  return (
    <>
      <Card
        elevation={1}
        sx={{
          display: 'flex',
          minHeight: 330,
          maxWidth: 300,
          borderRadius: '15px',
          boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.3)',
          ':hover': {
            boxShadow: (theme) => '0 0 3px 1px ' + theme.palette.success.main,
          },
          transition: 'box-shadow 0.3s ease-in-out',
          flexDirection: 'column',
        }}
      >
        <LazyLoadImageWithSkeleton
          src={city.images[0]}
          alt={city.name}
          skeletonStyle={imgStyle}
        >
          <CardMedia
            component="img"
            loading="lazy"
            image={city.images[0]}
            sx={imgStyle}
            alt={city.name}
          />
        </LazyLoadImageWithSkeleton>
        <CardContent sx={{ pb: 0 }}>
          <Paper
            variant="outlined"
            sx={{
              width: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              px: 2,
              borderRadius: 15,
              mb: 1,
            }}
          >
            <Typography variant="h6" color={'primary'}>
              <strong>{city.country}</strong>
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <IconButton
              size="small"
              aria-label="link to info"
              sx={{ p: 0, mr: 1 }}
            >
              <PlaceTwoToneIcon />
            </IconButton>
            <Typography variant="h6" color={'secondary'}>
              {getSubstringAfterHyphen(city.name)}
            </Typography>
          </Paper>
          <Typography variant="body2" color="textSecondary">
            {city.description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing sx={{ justifyContent: 'end', mt: 'auto' }}>
          <Anchor to={pathCityDetail} preventScrollReset={false}>
            <Button variant="outlined" color="success">
              Explore
            </Button>
          </Anchor>
        </CardActions>
      </Card>
    </>
  );
};

export default CardCity;
