import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

export const ListUsers = ({ listaData, action = null }) => {
  return (
    <List
      sx={{
        backgroundColor: "#bdbdbd",
      }}
    >
      {listaData.map((user) => (
        <ListItem
          key={String(user.id)}
          sx={{
            mb: 2,
          }}
          secondaryAction={
            action && (
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            )
          }
        >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  );
};
