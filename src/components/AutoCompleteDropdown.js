import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import TodoItem from './TodoItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import { collegeList } from '../consts/collegeList';
import { fetchCollegeData } from '../helpers/collegeAPI';
import { searchCollegeDatabase } from '../helpers/searchCollegeDatabase';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ReactDOM from 'react-dom'


function AutoCompleteDropdown({ title, style }) {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [collegeNames, setCollegeNames] = useState(null);
  const options = ["Reach", "Target", "Safety"];
  
  useEffect(() => {
    fetchCollegeData()
      .then((data) => {
        console.log(data); // Log to check the structure of the data
        setCollegeNames(data); // Set the fetched data
      })
      .catch((error) => {
        console.error("Error fetching college data:", error);
      });
  }, []);
  const resultsArray = collegeNames && collegeNames.results ? Object.values(collegeNames.results) : [];  // Safely access results

  // const resultsArray = Object.values(collegeNames.results); // Convert to an array 
  const collegeNamesList = resultsArray .map(result => result["latest.school.name"]).filter(name => name); // Removes null/undefined values
  console.log(collegeNamesList);
  console.log(typeof(collegeNamesList));



  function addTask(text) {
    console.log("!!!!", text);
    if (text=== '') return;
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setText('');
  }

  function ProgressBarComponent(){
 
    const checkboxes = document.querySelectorAll('#collegeTable input[type="checkbox"]');
    
    // Count how many checkboxes are checked
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const getTableLength = () => {
      const table = document.getElementById("collegeTable");
      return table ? table.rows.length : 0; // Get the total rows, including dynamically added ones
    };
    
    const totalRows = getTableLength() - 1; // Subtract 1 for the header row
    const progress = totalRows ? (checkedCount / totalRows) * 100 : 0; // Calculate progress percentage
   
    return <ProgressBar now={progress} />;
  }
  
  function addSchool(schoolInfo) {

    if (!(schoolInfo && Object.keys(schoolInfo).length > 0 )){
      console.error("no school found");
      return;
    }
   
    // Get the table body 
    let table = document.getElementById("collegeTable").getElementsByTagName('tbody')[0];
    // Create a new row 
    let newRow = table.insertRow();
    console.log("add school ");
    let cell1 = newRow.insertCell(0); 
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);
    let cell7 = newRow.insertCell(6);
    let cell8 = newRow.insertCell(7);
    let cell9 = newRow.insertCell(8);
    let cell10 = newRow.insertCell(9);
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkedCollege");
    checkbox.addEventListener("change", handleChange);
    checkbox.addEventListener("change", updateProgressBar);
    cell1.appendChild(checkbox);
    updateProgressBar();

    // add function here for tags
    const select = document.createElement('select');

    // Add placeholder option
    const placeholder = document.createElement('option');
    placeholder.textContent = 'Select';
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.value = '';
    select.appendChild(placeholder);
    options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
    cell9.appendChild(select);

    
    //calendar column
    let date = document.createElement("input");
    date.type = "date";
    cell10.appendChild(date);
    

    // Add data to cells 
    cell2.innerHTML = `<pre>${JSON.stringify(schoolInfo["latest.school.school_url"], null, 2).replace(/^"(.*)"$/, '$1')} </pre>`; 
    cell3.innerHTML = `<pre>${JSON.stringify((schoolInfo["latest.admissions.admission_rate.overall"]* 100).toFixed(2) + "%", null, 2).replace(/^"(.*)"$/, '$1') }</pre>`;
    cell4.innerHTML = `<pre>${JSON.stringify(schoolInfo["latest.student.size"], null, 2).replace(/^"(.*)"$/, '$1')} </pre>`;
    cell5.innerHTML = `<pre>${JSON.stringify(schoolInfo["latest.cost.tuition.in_state"], null, 2).replace(/^"(.*)"$/, '$1')} </pre>`; 
    cell6.innerHTML = `<pre>${JSON.stringify(schoolInfo["latest.cost.tuition.out_of_state"], null, 2).replace(/^"(.*)"$/, '$1')} </pre>`; 
    cell7.innerHTML = `<pre>${JSON.stringify(schoolInfo["latest.admissions.sat_scores.average.overall"], null, 2).replace(/^"(.*)"$/, '$1')} </pre>`; 
    cell8.innerHTML = `<pre>${JSON.stringify((schoolInfo["latest.admissions.sat_scores.25th_percentile.math"]) +(schoolInfo["latest.admissions.sat_scores.25th_percentile.critical_reading"]), null, 2).replace(/^"(.*)"$/, '$1')}</pre>`;
  }

  function sortCategory(){
    let table = document.getElementById("collegeTable").tBodies[0];
    const rows = Array.from(table.querySelectorAll("tr"));
    
    
    // Map category to its index in the desired order

    console.log("rows", rows);
    console.log("table", table);
    rows.sort((a, b) => {
      const selectElementA = a.cells[8].querySelector('select');
      const selectElementB = b.cells[8].querySelector('select');

      const catA = a.cells[8].querySelector("select").options[selectElementA.selectedIndex].textContent;
      const catB = b.cells[8].querySelector("select").options[selectElementB.selectedIndex].textContent;
      console.log(catA, "catA");
      console.log(catB, "catB");
      console.log(a.cells[8], "A");
      console.log(b.cells[8], "B");
      

      // Compare alphabetically
      if (catA < catB) {
        return -1;  // catA comes before catB
      } else if (catA > catB) {
          return 1;   // catA comes after catB
      } else {
          return 0;   // catA and catB are equal
      }
      });

      // Re-append sorted rows
      rows.forEach(row => table.appendChild(row));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function updateTask(id, newText) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addTask(text);
    }
  }

  function onDragStart(e, id) {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.effectAllowed = "move";
  }

  function onDrop(e, id) {
    const draggedTaskId = e.dataTransfer.getData('id');
    const newTasks = [...tasks];
    const draggedTaskIndex = newTasks.findIndex(task => task.id === parseInt(draggedTaskId));
    const targetTaskIndex = newTasks.findIndex(task => task.id === id);
    
    const [draggedTask] = newTasks.splice(draggedTaskIndex, 1);
    newTasks.splice(targetTaskIndex, 0, draggedTask);

    setTasks(newTasks);
  }

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  const updateProgressBar = () => {
    const checkboxes = document.querySelectorAll('.checkedCollege');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const totalCollege = checkboxes.length;
    const percentCollege = checkedCount/totalCollege;
    const progressBar = document.getElementById('idProgressBar');
    progressBar.value = percentCollege;
  };

  const filterOptions = (options, { inputValue }) => {
    return options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    ).sort((a, b) => {
      // Sort by proximity of match start
      return a.toLowerCase().indexOf(inputValue.toLowerCase()) - b.toLowerCase().indexOf(inputValue.toLowerCase());
    });
  };

  const [collegeData, setCollegeData] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [schoolInfo, setSchoolInfo] = useState(null);
  
  useEffect(() => {
    fetchCollegeData().then((data) => {
      setCollegeData(data);
    });
  }, []); // Runs once when the component mounts
  
  const handleChange = ({ event, newValue }) => {
    setSelectedSchool(newValue); // Update selected school
  };
  
  // Effect to update schoolInfo when selectedSchool changes
  useEffect(() => {
    if (selectedSchool && collegeData) {
      const fetchSchoolInfo = async () => {
        try {
          const schoolData = await searchCollegeDatabase(selectedSchool, collegeData);
          setSchoolInfo(schoolData);
          console.log("Resolved School Data:", schoolData);
        } catch (error) {
          console.error("Error fetching school info:", error);
        }
      };
  
      fetchSchoolInfo();
    }
  }, [selectedSchool, collegeData]);
  

  return (
    <div className={`auto-completelist ${style}`}>
      <h1>{title}</h1>

      <div className="tasks-container">
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            updateTask={updateTask}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        ))}
      </div>
      

      <div className="add-task-container">
        <Autocomplete
          styleOverrides='autocompletestyling'
          disablePortal
          options={collegeNamesList}
          sx={{ width: 300 }}
          onChange={(event, newValue) => handleChange({event, newValue})}
        
          renderInput={(params) => <TextField {...params} placeholder="Add College" />}
          
        ></Autocomplete>
         <button className="add-college-button" onClick={() => addSchool(schoolInfo)}>Add</button>
      </div>
     
      <div id="updateBar">
        <progress id = "idProgressBar" value='0' />
      </div>
      

      <table id="collegeTable">
        {/* column headings */}
           <thead>
           <tr>
              <th></th>
              <th>URL</th>
              <th>Acceptance Rate</th> 
              <th>Class Size</th>
              <th>Cost in State</th>
              <th>Cost out of State</th>
              <th>SAT Average</th>
              <th>25th percentile</th>
              <th><div>Category <button onClick={() => sortCategory()}>↑↓</button></div></th>
              <th>Date</th>
              
            </tr>
            </thead>

            <tbody>
            
            </tbody>
      </table>
    </div>
  );
}

export default AutoCompleteDropdown;
