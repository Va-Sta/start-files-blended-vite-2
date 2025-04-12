import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import TodoList from '../components/TodoList/TodoList';
import EditForm from '../components/EditForm/EditForm';
import { useState, useEffect } from 'react';

const todosInit = [
  { id: '1', text: 'Practice more' },
  { id: '2', text: 'Get all tasks done on time' },
];

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = window.localStorage.getItem('saved-todos');
    if (savedTodos !== null) {
      return JSON.parse(savedTodos);
    }
    return todosInit;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    window.localStorage.setItem('saved-todos', JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = id => {
    setTodos(prevTodos => {
      return prevTodos.filter(item => item.id !== id);
    });
  };
  const addNewTodo = inputValue => {
    const newId = (
      Math.max(...todos.map(item => Number(item.id))) + 1
    ).toString();
    const newItem = { id: newId, text: inputValue };
    setTodos(prevTodos => {
      return [...prevTodos, newItem];
    });
  };
  const handleEditTodo = id => {
    setIsEditing(true);
    setCurrentTodo({
      id: id,
      text: todos.filter(item => item.id === id)[0].text,
    });
  };
  const cancelUpdate = () => {
    setIsEditing(false);
  };

  const updateTodo = value => {
    const newItem = { id: currentTodo.id, text: value };
    setTodos(prevTodos =>
      prevTodos.map(item => (item.id === currentTodo.id ? newItem : item))
    );
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <EditForm
          cancelUpdate={cancelUpdate}
          updateTodo={updateTodo}
          defaultValue={currentTodo.text}
        />
      ) : (
        <Form onSubmit={addNewTodo} />
      )}
      {todos.length === 0 ? (
        <Text textAlign="center">There are no any todos ...</Text>
      ) : (
        <TodoList onDelete={deleteTodo} onEdit={handleEditTodo} list={todos} />
      )}
    </>
  );
};

export default Todos;
