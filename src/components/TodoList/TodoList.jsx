import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ list, onDelete, onEdit }) => {
  return (
    <Grid>
      {list.map(item => (
        <GridItem key={item.id}>
          <TodoListItem onDelete={onDelete} onEdit={onEdit} item={item} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
