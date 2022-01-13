import { useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(){
    console.log(tasks);
    if(!newTaskTitle) return

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
    // vamos usar o spreed-operator(...) para fazer a inclusão dos novos itens no final do array array
    // o spreed-operator referencia os itens que já estão no array anteriormente
    // fanzendo dessa forma é da mesma forma que o push, sempre adicionará ao final do array
    setTasks(tasks => [...tasks, newTask])
    setNewTaskTitle('')
    
    
  }
  

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const TaskComplete = tasks.map(task => task.id === id ?{
      //pode ser feito dessa forma
      // id: task.id,
      // title: task.title,
      // isComplete: !task.isComplete
      // ou usando o spreed-operator
      ...task,// chama todos os dados da task antiga
      isComplete: !task.isComplete // atualiza se é true ou false
      // se o task.id for diferente de id retornaremos o task sem alterações
    }: task)

    setTasks(TaskComplete)
    
    
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const newTasks = tasks.filter((task)=> task.id !== id)
    
    setTasks(newTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}