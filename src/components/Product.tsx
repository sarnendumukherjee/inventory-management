import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product as ProductModel } from "../service/Service.model";

interface ProductProps {
  product: ProductModel;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { articles } = product;
  console.log(articles);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Product -&gt; {product.name}
          </Typography>

          <List dense={true}>
            {articles.map((article) => (
              <ListItem
                secondaryAction={
                  <>
                    <Typography gutterBottom>
                      {article.amountRequired}
                    </Typography>
                  </>
                }
              >
                <ListItemText primary={article.id} />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions>
          <Button size="small">Register a Sell</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Product;
