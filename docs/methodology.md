Delta Health Information & Appointment Booking System Documentation
Chapter 1: Introduction
1.1 Background

Healthcare delivery in rural areas of Delta State is often hindered by manual appointment systems, poor communication, and lack of access to reliable health information. The Delta Health Information and Appointment Booking System (MHAC) was developed to improve efficiency, accessibility, and patient engagement using digital technologies.

1.2 Aim and Objectives

Automate patient appointment scheduling.

Provide real-time reminders and notifications.

Deliver localized health education content.

Enable data-driven healthcare management for administrators.

1.3 Significance

Reduces missed appointments and overcrowding.

Improves healthcare accessibility in underserved areas.

Strengthens patient-provider communication.

1.4 Scope

Supports SMS, USSD, and smartphone apps.

Includes patient registration, appointment scheduling, notifications, health education, and administrative dashboards.

Scalable for future telemedicine and EMR integration.

Chapter 2: Literature Review

Summary: Various studies highlight challenges in rural healthcare, including manual scheduling inefficiencies, communication gaps, and limited health education. Digital systems with multi-channel communication and automated scheduling improve patient flow, reduce defaulters, and increase operational efficiency.

Chapter 3: Methodology
3.1 Investigation & Analysis

Mixed-method approach: SSADM, Prototyping, Expert System Methodology.

Addressed inefficiencies in rural healthcare delivery.

Iterative development with real-world feedback.

3.2 Input & Output Documents

Input Documents:

Appointment records and patient registers.

Interviews with healthcare staff.

Health policy documents.

System requirement specifications (SRS).

Output Documents:

System design diagrams (DFD, ERD, UML).

Prototype applications.

User manuals and training materials.

Testing reports and implementation plans.

3.3 System Analysis

SSADM: Feasibility study → requirements → system specification → logical design.

Prototyping: MVP development → test deployment → feedback → iteration.

Expert System Methodology: Rule-based scheduling and notifications.

Testing: Field trials, usability assessments, performance, and multi-channel reliability.

3.4 Overview of Proposed System

Multi-channel access: SMS, USSD, mobile app.

Automated scheduling and reminders.

Localized health education content.

Administrative dashboards for clinic management.

Scalable, offline-capable, future-ready for EMR integration.

3.5 Information & Product Flow

Patients register → system allocates slots → notifications sent → feedback collected → analytics dashboard updated.

3.6 Database Structure

Key Tables:

Users

Clinics

Appointments

Notifications

Health Articles

3.7 Limitations

Infrastructure: unreliable network/power.

Digital literacy: limited user experience.

Funding: setup and maintenance costs.

Data privacy and security: requires strict standards.

3.8 High-Level Model

Layers:

User Interface Layer: SMS, USSD, app.

Business Logic Layer: scheduling, reminders, rules engine.

Data Layer: secure cloud-based storage.

Communication Layer: APIs for SMS, WhatsApp, IVR.

Analytics Layer: dashboards and reporting.

Chapter 4: System Design & Implementation
4.1 Objective

Digitally transform manual healthcare processes in rural clinics, enhancing appointment management, communication, and patient health literacy.

4.2 Main Menu / Control Centre

Modules:

Appointment Booking

Automated Reminders

Health Education

Administrative Dashboard

4.3 Database Specification

Relational database (MySQL).

Tables: Patient, Appointment, Feedback, Notification.

Security: AES encryption, SSL, RBAC.

Backup and disaster recovery implemented.

4.4 Program Module Specification

Appointment Booking Module

Reminder System Module

Health Education Module

Administrative Dashboard Module

4.5 Input/Output Screens

Input: Appointment forms, educational interface, admin login.
Output: Confirmation messages, analytics dashboards, feedback interface.

4.6 Data Flow Algorithm

User interaction → 2. Processing → 3. Notification → 4. Education delivery → 5. Admin monitoring → loop.

4.7 Output Specification

Automated notifications

Performance reports

Data visualizations

Engagement logs

4.8–4.9 Flowcharts

System flowchart: end-to-end workflow.

Program flowchart: module-level logic and decision points.

4.10 Implementation

Frontend: React.js

Backend: Node.js + Express.js

Database: MySQL

Hosting: AWS, containerized with Docker

Version control: GitHub

Testing: Jest (unit), Postman (API)

Documentation: JSDoc

4.11 Language Justification

JavaScript chosen for full-stack development due to cross-platform compatibility, event-driven architecture, and large ecosystem.

4.12 Hardware & OS Requirements

Clients: basic phones (SMS/USSD) and Android smartphones ≥2GB RAM.

Server: 4-core CPU, 8GB RAM, 50GB SSD.

OS: Ubuntu server; clients: Android, Windows, macOS, Linux.

4.13 Software Testing

Functional, usability, integration, performance, and security testing.

Demonstrated reliability, reduced missed appointments, and user satisfaction.

4.14 User Manual

Step-by-step guidance for patients and administrators.

Troubleshooting, FAQs, and operational instructions included.

Chapter 5: Summary, Conclusion & Recommendations
5.1 Conclusion

MHAC system improved healthcare accessibility, appointment management, and patient engagement.

Digital transformation reduced operational inefficiencies in rural clinics.

5.2 Recommendations

Integrate EMR and additional local languages.

Provide robust training for staff.

Expand to other rural areas with government/NGO support.

Improve infrastructure reliability (network/power).
