# Permissions Matrix — Players App

## Roles

| Role    | Description                            |
| ------- | -------------------------------------- |
| ADMIN   | Full access to all entities            |
| COACH   | Manages training sessions and squad    |
| PLAYER  | Read-only access, can edit own profile |

---

## ADMIN

Full access to all operations across the system.

| Module             | Create | Read | Update | Delete |
| ------------------ | :----: | :--: | :----: | :----: |
| Users              |   ✓   |  ✓   |   ✓    |   ✓    |
| Players            |   ✓   |  ✓   |   ✓    |   ✓    |
| Technical Staff    |   ✓   |  ✓   |   ✓    |   ✓    |
| Teams              |   ✓   |  ✓   |   ✓    |   ✓    |
| Tournaments        |   ✓   |  ✓   |   ✓    |   ✓    |
| Trainings          |       |  ✓   |        |        |
| Competition Stages |   ✓   |  ✓   |   ✓    |   ✓    |
| Match Days         |   ✓   |  ✓   |   ✓    |   ✓    |
| Matches            |   ✓   |  ✓   |   ✓    |   ✓    |

> **Note:** ADMIN cannot create/update/delete trainings — those operations are exclusive to COACH.

---

## COACH

| Module             | Create | Read | Update               | Delete |
| ------------------ | :----: | :--: | :------------------: | :----: |
| Players            |       |  ✓   | Own profile only¹    |        |
| Technical Staff    |   ✓   |  ✓   | Own profile only¹    |   ✓    |
| Teams              |       |  ✓   |                      |        |
| Tournaments        |       |  ✓   |                      |        |
| Trainings          |   ✓   |  ✓   |          ✓           |   ✓    |
| Competition Stages |       |  ✓   |                      |        |
| Match Days         |   ✓   |  ✓   |          ✓           |        |
| Matches            |   ✓   |  ✓   |          ✓           |        |

> ¹ COACH can only edit their own technical staff profile (verifies `user_id` matches the authenticated user).

---

## PLAYER

| Module             | Create | Read | Update               | Delete |
| ------------------ | :----: | :--: | :------------------: | :----: |
| Players            |       |  ✓   | Own profile only¹    |        |
| Technical Staff    |       |  ✓   |                      |        |
| Teams              |       |  ✓   |                      |        |
| Tournaments        |       |  ✓   |                      |        |
| Trainings          |       |  ✓   |                      |        |
| Competition Stages |       |  ✓   |                      |        |
| Match Days         |       |  ✓   |                      |        |
| Matches            |       |  ✓   |                      |        |

> ¹ PLAYER can only edit their own player profile (verifies `user_id` matches the authenticated user).

---

## Public Routes (no authentication required)

| Endpoint          | Method |
| ----------------- | :----: |
| `/auth/login`     |  POST  |
| `/health`         |  GET   |
