import React, { useState } from 'react';

// School Component
const School = ({ students, onAddStudent, onUpdateStudent, onDeleteStudent }) => {
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStudent = () => {
    setIsAddingStudent(true);
    setFormData({ name: '', age: '', grade: '', email: '' });
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student.id);
    setFormData({
      name: student.name,
      age: student.age.toString(),
      grade: student.grade,
      email: student.email
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.grade || !formData.email) {
      alert('Please fill in all fields');
      return;
    }

    const studentData = {
      name: formData.name,
      age: parseInt(formData.age),
      grade: formData.grade,
      email: formData.email
    };

    if (editingStudent) {
      onUpdateStudent(editingStudent, studentData);
      setEditingStudent(null);
    } else {
      onAddStudent(studentData);
      setIsAddingStudent(false);
    }

    setFormData({ name: '', age: '', grade: '', email: '' });
  };

  const handleCancel = () => {
    setIsAddingStudent(false);
    setEditingStudent(null);
    setFormData({ name: '', age: '', grade: '', email: '' });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      onDeleteStudent(id);
    }
  };

  // Styles
  const schoolStyles = {
    padding: '20px 0'
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    paddingBottom: '15px',
    borderBottom: '2px solid #e74c3c'
  };

  const addButtonStyles = {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  };

  const formContainerStyles = {
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '8px',
    marginBottom: '25px',
    border: '1px solid #dee2e6'
  };

  const formStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    alignItems: 'end'
  };

  const inputGroupStyles = {
    display: 'flex',
    flexDirection: 'column'
  };

  const labelStyles = {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#495057'
  };

  const inputStyles = {
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px'
  };

  const buttonGroupStyles = {
    display: 'flex',
    gap: '10px'
  };

  const submitButtonStyles = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const cancelButtonStyles = {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  const thStyles = {
    backgroundColor: '#343a40',
    color: 'white',
    padding: '15px',
    textAlign: 'left',
    fontWeight: 'bold'
  };

  const tdStyles = {
    padding: '12px 15px',
    borderBottom: '1px solid #dee2e6'
  };

  const actionButtonStyles = {
    padding: '6px 12px',
    margin: '0 3px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold'
  };

  const editButtonStyles = {
    ...actionButtonStyles,
    backgroundColor: '#ffc107',
    color: '#212529'
  };

  const deleteButtonStyles = {
    ...actionButtonStyles,
    backgroundColor: '#dc3545',
    color: 'white'
  };

  const emptyStateStyles = {
    textAlign: 'center',
    padding: '40px',
    color: '#6c757d',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #dee2e6'
  };

  return (
    <div style={schoolStyles}>
      <div style={headerStyles}>
        <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '1.8rem' }}>
          Student Records ({students.length})
        </h2>
        {!isAddingStudent && !editingStudent && (
          <button
            style={addButtonStyles}
            onClick={handleAddStudent}
            onMouseOver={(e) => e.target.style.backgroundColor = '#229954'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
          >
            + Add New Student
          </button>
        )}
      </div>

      {(isAddingStudent || editingStudent) && (
        <div style={formContainerStyles}>
          <h3 style={{ marginTop: 0, color: '#495057' }}>
            {editingStudent ? 'Edit Student' : 'Add New Student'}
          </h3>
          <form onSubmit={handleSubmit} style={formStyles}>
            <div style={inputGroupStyles}>
              <label style={labelStyles}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={inputStyles}
                placeholder="Enter student name"
              />
            </div>
            <div style={inputGroupStyles}>
              <label style={labelStyles}>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                style={inputStyles}
                placeholder="Enter age"
                min="5"
                max="25"
              />
            </div>
            <div style={inputGroupStyles}>
              <label style={labelStyles}>Grade</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                style={inputStyles}
              >
                <option value="">Select Grade</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
              </select>
            </div>
            <div style={inputGroupStyles}>
              <label style={labelStyles}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={inputStyles}
                placeholder="Enter email address"
              />
            </div>
            <div style={buttonGroupStyles}>
              <button type="submit" style={submitButtonStyles}>
                {editingStudent ? 'Update' : 'Add'} Student
              </button>
              <button type="button" onClick={handleCancel} style={cancelButtonStyles}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {students.length === 0 ? (
        <div style={emptyStateStyles}>
          <h3 style={{ color: '#6c757d' }}>No students found</h3>
          <p>Click "Add New Student" to get started</p>
        </div>
      ) : (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Name</th>
              <th style={thStyles}>Age</th>
              <th style={thStyles}>Grade</th>
              <th style={thStyles}>Email</th>
              <th style={thStyles}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr 
                key={student.id} 
                style={{ 
                  backgroundColor: index % 1 === 0 ? '#000' : '#000' 
                }}
              >
                <td style={tdStyles}>{student.name}</td>
                <td style={tdStyles}>{student.age}</td>
                <td style={tdStyles}>{student.grade}</td>
                <td style={tdStyles}>{student.email}</td>
                <td style={tdStyles}>
                  <button
                    style={editButtonStyles}
                    onClick={() => handleEditStudent(student)}
                    disabled={editingStudent !== null}
                  >
                    Edit
                  </button>
                  <button
                    style={deleteButtonStyles}
                    onClick={() => handleDelete(student.id, student.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const App = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', age: 16, grade: '10th', email: 'john.doe@email.com' },
    { id: 2, name: 'Jane Smith', age: 17, grade: '11th', email: 'jane.smith@email.com' },
    { id: 3, name: 'Mike Johnson', age: 15, grade: '9th', email: 'mike.johnson@email.com' }
  ]);

  const addStudent = (newStudent) => {
    const student = {
      id: Date.now(),
      ...newStudent
    };
    setStudents([...students, student]);
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, ...updatedStudent } : student
    ));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const appStyles = {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px'
  };

  const containerStyles = {
    maxWidth: '700px',
    margin: '0 400px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '30px'
  };

  const headerStyles = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333'
  };

  const titleStyles = {
    fontSize: '2.5rem',
    margin: '0',
    color: '#2c3e50'
  };

  const subtitleStyles = {
    fontSize: '1.1rem',
    margin: '10px 0 0 0',
    color: '#7f8c8d'
  };

  return (
    <div style={appStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h1 style={titleStyles}>Student Management System</h1>
          <p style={subtitleStyles}>Manage your school's student records</p>
        </header>
        <School
          students={students}
          onAddStudent={addStudent}
          onUpdateStudent={updateStudent}
          onDeleteStudent={deleteStudent}
        />
      </div>
    </div>
  );
};

export default App;