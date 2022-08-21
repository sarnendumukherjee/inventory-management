import { Edit, Add, Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import Loader from "../../../components/loader/Loader";
import { Article, ServiceResponse } from "../../../service/Service.model";
import {
  ArticlesAddArticle,
  ArticlesAddArticleRequestBody,
  ArticlesDeleteArticle,
  ArticlesListArticles,
  ArticlesPatchArticle,
} from "../../../service/Services";

enum FormUpdateActionKind {
  WHOLE_OBJECT = "WHOLE_OBJECT",
  OBJECT_PROPERTY = "OBJECT_PROPERTY",
}

interface FormInputChangePayload {
  name: string;
  value: string;
}
// An interface for our actions
interface FormUpdateAction {
  type: FormUpdateActionKind;
  payload: FormInputChangePayload | Article;
}

const formReducer = (state: Partial<Article>, action: FormUpdateAction) => {
  const { type, payload } = action;
  switch (type) {
    case FormUpdateActionKind.OBJECT_PROPERTY:
      return {
        ...state,
        [payload.name]: (payload as FormInputChangePayload).value,
      };
    case FormUpdateActionKind.WHOLE_OBJECT:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

const Articles = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [response, setResponse] = useState<ServiceResponse<Article[]>>({
    loading: true,
  });
  const { data: articles, loading, error } = response;

  const [editing, setEditing] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    getAndSetArticles();
  }, []);

  const getAndSetArticles = () => {
    setResponse({ loading: true });
    ArticlesListArticles()
      .then(({ data }) => {
        setResponse({ data });
      })
      .catch((error) => {
        setResponse({ error });
      });
  };

  // Edit Article helpers
  const openEditingPopup = (article: Article) => {
    setEditing(true);
    setFormData({
      type: FormUpdateActionKind.WHOLE_OBJECT,
      payload: article,
    });
  };
  const handleEditArticleClose = () => {
    setEditing(false);
  };
  const handleEditArticleSave = () => {
    ArticlesPatchArticle(formData as Article)
      .then(() => {
        enqueueSnackbar("Updated article successfully", { variant: "success" });
        getAndSetArticles();
        setEditing(false);
      })
      .catch((error) => {
        enqueueSnackbar(
          "There was an issue updating your Article. Please try again (later)",
          { variant: "error" }
        );
      });
  };

  const [formData, setFormData] = useReducer(formReducer, {
    id: undefined,
    name: undefined,
    amountInStock: undefined,
  });

  const handleArticleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      type: FormUpdateActionKind.OBJECT_PROPERTY,
      payload: {
        name: event.target.name,
        value: event.target.value,
      },
    });
  };

  //Add article helpers

  const openAddArticlePopup = () => {
    setAdding(true);
  };
  const handleAddArticleClose = () => {
    setAdding(false);
  };
  const handleAddArticle = () => {
    const { id, ...addArticleRequestBody } = formData;
    ArticlesAddArticle(addArticleRequestBody as ArticlesAddArticleRequestBody)
      .then(() => {
        enqueueSnackbar("Added article successfully", { variant: "success" });
        getAndSetArticles();
        setAdding(false);
      })
      .catch((error) => {
        enqueueSnackbar(
          "There was an issue adding your Article. Please try again (later)",
          { variant: "error" }
        );
      });
  };

  // Delete article helpers

  const openDeletePopup = (article: Article) => {
    setDeleting(true);
    setFormData({
      type: FormUpdateActionKind.WHOLE_OBJECT,
      payload: article,
    });
  };

  const handleDeleteArticleClose = () => {
    setDeleting(false);
  };

  const handleDeleteArticleConfirmation = () => {
    ArticlesDeleteArticle(formData.id as string)
      .then(() => {
        enqueueSnackbar("Deleted article successfully", { variant: "success" });
        getAndSetArticles();
        setDeleting(false);
      })
      .catch((error) => {
        enqueueSnackbar(
          "There was an issue deleting your Article. Please try again (later)",
          { variant: "error" }
        );
      });
  };

  // Rendering
  if (error) return <div>Error</div>;

  if (loading) return <Loader />;

  return (
    <Grid container>
      <Grid
        sx={{ padding: "2rem" }}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={openAddArticlePopup}
        >
          Add article
        </Button>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={3}>
          <TableContainer component={Paper}>
            <Table aria-label="Article table">
              <TableHead>
                <TableRow>
                  <TableCell>Article Id</TableCell>
                  <TableCell>Article Name</TableCell>
                  <TableCell align="right">Stock count</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articles &&
                  articles.map((article) => (
                    <TableRow
                      key={article.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{article.id}</TableCell>
                      <TableCell component="th" scope="row">
                        {article.name}
                      </TableCell>
                      <TableCell align="right">
                        {article.amountInStock}
                      </TableCell>
                      <TableCell align="right">
                        <Edit
                          color="secondary"
                          onClick={() => openEditingPopup(article)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Delete
                          color="error"
                          onClick={() => openDeletePopup(article)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Dialog
        id="edit-article-dialog"
        open={editing}
        onClose={handleEditArticleClose}
      >
        <DialogTitle>Updating Article: {formData.id}</DialogTitle>
        <DialogContent>
          <DialogContentText>Update the article below</DialogContentText>
          <TextField
            margin="dense"
            id="id"
            name="id"
            label="Id"
            type="text"
            fullWidth
            variant="standard"
            disabled
            value={formData.id}
            onChange={handleArticleFormChange}
          />
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={handleArticleFormChange}
          />
          <TextField
            margin="dense"
            id="amountInStock"
            name="amountInStock"
            label="Amount in stock"
            type="number"
            fullWidth
            variant="standard"
            value={formData.amountInStock}
            onChange={handleArticleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditArticleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEditArticleSave}>
            Update and close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        id="add-article-dialog"
        open={adding}
        onClose={handleAddArticleClose}
      >
        <DialogTitle>Adding Article</DialogTitle>
        <DialogContent>
          <DialogContentText>Add the article below</DialogContentText>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={handleArticleFormChange}
          />
          <TextField
            margin="dense"
            id="amountInStock"
            name="amountInStock"
            label="Amount in stock"
            type="number"
            fullWidth
            variant="standard"
            value={formData.amountInStock}
            onChange={handleArticleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddArticleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddArticle}>
            Add Article
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleting}
        onClose={handleDeleteArticleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the article:
            {formData.name} &lt;{formData.id}&gt;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteArticleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleDeleteArticleConfirmation}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Articles;
