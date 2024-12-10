import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [members, setMembers] = useState([
    { id: 24, name: "Qa Nadsoft", email: "qa@nadsoft.com", age: 28, parentId: 1 },
    { id: 23, name: "Qa test", email: "qa@test.com", age: 32, parentId: 2 },
    { id: 15, name: "ts vb", email: "ts@vb.com", age: 36, parentId: 3 },
    { id: 4, name: "John Doe", email: "john@example.com", age: 30, parentId: 4 },
  ]);

  const [searchQuery, setSearchQuery] = useState(""); 
  const [showAddModal, setShowAddModal] = useState(false); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState(null);

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    age: "",
    parentId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.email && newMember.age) {
      const newId = Math.max(...members.map((m) => m.id), 0) + 1;
      setMembers([...members, { id: newId, ...newMember }]);
      setNewMember({ name: "", email: "", age: "", parentId: "" });
      setShowAddModal(false);
    } else {
      alert("Please fill in all required fields!");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteMemberId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setMembers(members.filter((member) => member.id !== deleteMemberId));
    setDeleteMemberId(null);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setDeleteMemberId(null);
    setShowDeleteModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.age.toString().includes(searchQuery)
  );

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Member Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Age", selector: (row) => row.age, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleDeleteClick(row.id)}
        />
      ),
    },
  ];

  return (
    <div className="container mt-5">
    
      <h1 className="border-bottom pb-2 mb-4">All Members</h1>
      <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search any feild"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Add New Member
        </button>
      </div>
  
      {showAddModal && (
        <div
          className="modal d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog" style={{ maxWidth: "500px" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Member</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body" style={{ width: "500px", margin: "0 auto" }}>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Member Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newMember.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={newMember.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      name="age"
                      value={newMember.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Parent ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="parentId"
                      value={newMember.parentId}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  className="btn btn-success"
                  onClick={handleAddMember}
                  style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div
          className="modal d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog" style={{ maxWidth: "400px" }}>
            <div className="modal-content text-center">
              <div className="modal-header d-flex flex-column align-items-center">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  style={{ color: "#ffc107", fontSize: "50px" }}
                />
                <h5 className="modal-title mt-2">Are you sure?</h5>
              </div>
              <div className="modal-body">
                <p>If you delete this member, this action cannot be undone.</p>
              </div>
              <div className="modal-footer justify-content-center">
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Yes, delete it!
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     
      <DataTable
        columns={columns}
        data={filteredMembers}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}

export default App;
