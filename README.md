# Hospital Management System REST API

This project implements a simple hospital management system using a REST API with distinct functionalities for doctors, patients, and admins.

## Features:

### User Roles:

- **Doctor:** View patient medical history, prescribe medications, update appointment status.
- **Patient:** View past medical history, request appointments.
- **Admin:** Book appointments, verify appointment status.

### Appointment Management:

- Admins can book and verify appointments.
- Doctors can update appointment status upon completion.

### Medical History Access:

- Doctors can view patients' medical history.
- Patients can view their own medical history.

### Prescription Management:

- Doctors can prescribe medications to patients.

## Running the API:

### Prerequisites:

- Docker and Docker Compose installed.

### Setup:

1. **Clone Repository:** Clone this repository to your local machine.
2. **Build and Run:**
   - Open a terminal in the project directory.
   - Run `docker-compose up` to build the Docker image and start the API.
