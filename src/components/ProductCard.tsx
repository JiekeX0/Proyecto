import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "./TableProducts";

export const ProductCard = ({product}:{product: Product}) => {

    const{ title, price, description, image } = product

    return (
        <Card sx={{maxWidth: 400, height: '100%', display: 'flex', flexDirection: 'column', justifyContent:'space-between'}}>
          <CardMedia
            sx={{height: 200, objectFit: 'contain'}}
            image={image}
          />
          <CardContent sx={{minHeight: 400,display: 'flex', flexDirection: 'column', justifyContent: "flex-start", gap: 2}}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Price: {price} €
            </Typography>
          </CardContent>
          <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
            <Button size="small" >Buy</Button>
          </CardActions>
        </Card>
      );
}