import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSnackbar } from "notistack";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import _ from "lodash";
import Loader from "../../../components/loader/Loader";
import {
  Product,
  ProductArticle,
  ServiceResponse,
} from "../../../service/Service.model";
import {
  ProductsAddProduct,
  ProductsListProducts,
} from "../../../service/Services";

const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [adding, setAdding] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>({ name: "", articles: [] });
  const [productArticleToAdd, setProductArticleToAdd] =
    useState<ProductArticle>({ id: "", amountRequired: 0 });
  const [productArticles, setProductArticles] = useState<ProductArticle[]>([]);

  const [response, setResponse] = useState<ServiceResponse<Product[]>>({
    loading: true,
  });
  const { data: products, loading, error } = response;

  const getAndSetProducts = () => {
    setResponse({ loading: true });
    ProductsListProducts()
      .then(({ data }) => {
        setResponse({ data });
      })
      .catch((error) => {
        setResponse({ error });
      });
  };

  useEffect(() => {
    getAndSetProducts();
  }, []);

  const cleanupStates = () => {
    setProductArticleToAdd({ id: "", amountRequired: 0 });
    setProductArticles([]);
    setProduct({ name: "", articles: [] });
  };

  const handleDeleteProductArticle = (productArticle: ProductArticle) => {
    const updatedProductArticles = [...productArticles]
    _.remove(updatedProductArticles, (item) => {
      return item.id === productArticle.id;
    });
    setProductArticles(updatedProductArticles);
  };

  //Add product helpers
  const openAddProductPopup = () => {
    setAdding(true);
  };
  const handleAddProductClose = () => {
    setAdding(false);
    cleanupStates();
  };
  const handleProductArticleToAddChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const currentProperty = {
      [event.target.name]: event.target.value,
    };
    setProductArticleToAdd({
      ...productArticleToAdd,
      ...currentProperty,
    } as ProductArticle);
  };
  const handleAddProductArticle = () => {
    if (productArticleToAdd) {
      setProductArticles([...productArticles, productArticleToAdd]);
      setProductArticleToAdd({ id: "", amountRequired: 0 });
    }
  };
  const handleProductFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newProduct = { [event.target.name]: event.target.value };
    setProduct({ ...newProduct } as unknown as Product);
  };
  const handleAddProduct = () => {
    const productToAdd = {
      ...product,
      article: productArticles,
    };
    ProductsAddProduct(productToAdd as Product)
      .then(() => {
        enqueueSnackbar("Added product successfully", { variant: "success" });
        getAndSetProducts();
        setAdding(false);
      })
      .catch((error) => {
        enqueueSnackbar(
          "There was an issue adding your Product. Please try again (later)",
          { variant: "error" }
        );
      });
  };

  if (error) return <div>Error</div>;

  if (loading) return <Loader />;

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10} md={6} sm={8}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Products
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={openAddProductPopup}
            >
              Add product
            </Button>
          </Grid>

          <List>
            {products &&
              products.map((product, index) => (
                <Fragment key={index}>
                  <ListItem
                    key={index}
                    secondaryAction={
                      <>
                        <IconButton color="primary" aria-label="view">
                          <Visibility />
                        </IconButton>
                        <IconButton color="secondary" aria-label="edit">
                          <Edit />
                        </IconButton>
                        <IconButton
                          edge="end"
                          color="error"
                          aria-label="delete"
                        >
                          <Delete />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText primary={product.name} />
                  </ListItem>
                  <Divider />
                </Fragment>
              ))}
          </List>
        </Grid>
      </Grid>
      <Dialog
        id="add-product-dialog"
        open={adding}
        onClose={handleAddProductClose}
      >
        <DialogTitle>Adding Product</DialogTitle>
        <DialogContent sx={{ minWidth: "600px" }}>
          <DialogContentText>Add the product below</DialogContentText>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={product.name}
            onChange={handleProductFormChange}
          />
          <Paper elevation={3} sx={{ marginTop: "1rem" }}>
            <Typography variant="h6" padding={"1rem"}>
              Add/Delete Article
            </Typography>
            <Divider />
            <List>
              {productArticles &&
                productArticles.map((article, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          color="error"
                          aria-label="delete"
                          onClick={() => handleDeleteProductArticle(article)}
                        >
                          <Delete />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary={`ID: ${article.id}`}
                      secondary={`Amount required: ${article.amountRequired}`}
                    />
                  </ListItem>
                ))}
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                paddingX={"1rem"}
              >
                <TextField
                  margin="dense"
                  id="articleId"
                  name="id"
                  label="Article Id"
                  type="text"
                  variant="standard"
                  onChange={handleProductArticleToAddChange}
                  value={productArticleToAdd?.id}
                ></TextField>
                <TextField
                  margin="dense"
                  id="amountRequired"
                  name="amountRequired"
                  label="Amount Required"
                  type="number"
                  variant="standard"
                  onChange={handleProductArticleToAddChange}
                  value={productArticleToAdd?.amountRequired}
                ></TextField>
                <IconButton
                  color="primary"
                  aria-label="Add article"
                  component="label"
                  onClick={handleAddProductArticle}
                >
                  <Add />
                </IconButton>
              </Grid>
            </List>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddProductClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddProduct}>
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Products;
