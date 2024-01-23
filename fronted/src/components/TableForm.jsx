import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Button, Form, FormGroup, Label, Input, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';

const TableForm = () => {
    const [entries, setEntries] = useState([]);
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        hobbies: '',
    });
    // 
    useEffect(() => {
        // Fetch data from the backend API to populate the table
        axios.get('/api/entries').then((response) => setEntries(response.data));
    }, []);

    const toggleModal = () => setModal(!modal);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddEntry = () => {
        axios.post('/api/entries', formData).then((response) => {
            setEntries([...entries, response.data]);
            toggleModal();
        });
    };

    // const handleSendEmail = () => {
    //     // Implement logic to send selected entries to email
    //     // ...
    // };

    const handleDeleteEntry = (id) => {
        axios.delete(`/api/entries/${id}`).then(() => {
            setEntries(entries.filter((entry) => entry._id !== id));
        });
    };


    return (
        <div className="App">
            <h1>MERN Stack CRUDS Application</h1>
            <Button color="primary" onClick={toggleModal}>
                Add New Data
            </Button>

            <Table>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Hobbies</th>
                        <th>Update/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr key={entry._id}>
                            <td>
                                <Input type="checkbox" />
                            </td>
                            <td>{entry._id}</td>
                            <td>{entry.name}</td>
                            <td>{entry.phoneNumber}</td>
                            <td>{entry.email}</td>
                            <td>{entry.hobbies}</td>
                            <td>

                                <Button color="danger" onClick={() => handleDeleteEntry(entry._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add New Data</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phoneNumber">Phone Number</Label>
                            <Input type="text" name="phoneNumber" id="phoneNumber" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="hobbies">Hobbies</Label>
                            <Input type="text" name="hobbies" id="hobbies" onChange={handleChange} />
                        </FormGroup>
                        <Button color="primary" onClick={handleAddEntry}>
                            Save
                        </Button>{' '}
                        <Button color="secondary" onClick={toggleModal}>
                            Cancel
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default TableForm