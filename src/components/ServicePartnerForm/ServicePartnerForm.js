import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function ServicePartnerForm() {
    const dispatch = useDispatch();
    const [newPartner, setNewPartner] = useState({
        firstName: '',
        lastName: '',
        nick_name: '',
        dateOfBirth: '',
        gender: '',
        dateOfPlacement: '',
    });

    const handleChange = (event) => {
        setNewPartner({ ...newPartner, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Dispatch the action to create a new service partner
        dispatch({
            type: 'CREATE_SERVICE_PARTNER',
            payload: newPartner,
        });
        // Reset form
        setNewPartner({
            firstName: '',
            lastName: '',
            nick_name: '',
            dateOfBirth: '',
            gender: '',
            dateOfPlacement: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="firstName"
                value={newPartner.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                name="lastName"
                value={newPartner.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                name="nick_name"
                value={newPartner.nick_name}
                onChange={handleChange}
                placeholder="Nickname"
            />
            <input
                type="date"
                name="dateOfBirth"
                value={newPartner.dateOfBirth}
                onChange={handleChange}
                required
            />
            <select name="gender" value={newPartner.gender} onChange={handleChange} required>
                <option value="" disabled>
                    Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
            </select>
            <input
                type="date"
                name="dateOfPlacement"
                value={newPartner.dateOfPlacement}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Service Partner</button>
        </form>
    );
}

export default ServicePartnerForm;
