# Community Service Hub

A web application I built to make community service opportunities easier for students to discover and join.

## The Problem

At my high school, community service opportunities were distributed through teacher emails and posters. Students could easily miss opportunities, and there was no centralized way to see how many spots remained.

I built Community Service Hub to address this problem.

## Features

- **Opportunity Feed:** Students can browse available community service opportunities.
- **Availability Tracking:** Displays remaining spots for each opportunity.
- **Student Registration:** Students can join opportunities through the application.
- **Teacher Dashboard:** Teachers can create opportunities and view student registrations.
- **Authentication:** Google authentication through Supabase, with separate student and teacher access.

## Tech Stack

- React and TypeScript
- Vite
- Tailwind CSS
- Supabase (PostgreSQL and authentication)
- Framer Motion

## Development and Challenges

After building the initial application, I presented it to my principal and AP Computer Science teacher.

A major obstacle was the NYC Department of Education's privacy and application approval requirements, particularly because the original implementation handled student information.

I explored an alternative token-based system that would reduce the need to collect student information. However, this introduced new challenges involving verification and accountability.

The project is currently on hold pending a suitable approach to these requirements. It has not been approved or deployed as an official school system.

## Repository Structure

- `main` — Original implementation with authentication, opportunity registration, and teacher functionality.
- `token-pivot` — Experimental alternative using claimable tokens.
- `MyUnderstanding.md` — My development journal documenting technical decisions, problems, solutions, and what I learned throughout the project.

## Status

**Prototype / On Hold**

This repository documents an independently developed student project and is not an official school application.
